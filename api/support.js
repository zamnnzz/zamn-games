const crypto = require('crypto');
const admin = require('firebase-admin');
const OWNER_PHONE = '+966591216299';
const BASE = 'supportInboxV1';
const COOKIE = 'zamn_support_session';
const NOTIFICATION_EMAIL = 'm.o.a.t1427@gmail.com';

function escapeHTML(value) {
  return String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
function notificationContent(ticket) {
  const whatsapp = 'https://wa.me/' + ticket.phone + '?text=' + encodeURIComponent('أهلًا ' + ticket.name + '، معك دعم ألعاب زامن بخصوص رسالتك.');
  const when = new Date(ticket.createdAt).toLocaleString('ar-SA', { timeZone: 'Asia/Riyadh' });
  return {
    subject: 'رسالة دعم جديدة في ألعاب زامن',
    text: ['وصلتك رسالة دعم جديدة في ألعاب زامن', '', 'الاسم: ' + ticket.name, 'رقم التواصل: +' + ticket.phone, 'وقت الرسالة: ' + when, '', ticket.message, '', 'الرد عبر واتساب: ' + whatsapp, 'فتح رسائل الدعم: https://zamn.games/', 'رقم الرسالة: ' + ticket.id].join('\n'),
    html: `<!doctype html><html lang="ar" dir="rtl"><body style="margin:0;background:#f4f0fa;color:#32124e;font-family:Tahoma,Arial,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:28px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;margin:auto;background:#fff;border:1px solid #e5d7f1;border-radius:18px;overflow:hidden"><tr><td style="background:#40166b;padding:25px;color:#fff"><p style="margin:0 0 9px;color:#ffe1a0;font-size:13px">ألعاب زامن</p><h1 style="font-size:23px;line-height:1.5;margin:0">وصلتك رسالة دعم جديدة</h1></td></tr><tr><td style="padding:25px;line-height:1.9"><p style="margin-top:0"><strong>${escapeHTML(ticket.name)}</strong><br><span dir="ltr">+${escapeHTML(ticket.phone)}</span><br><span style="font-size:12px;color:#7c688b">${escapeHTML(when)}</span></p><div style="white-space:pre-wrap;overflow-wrap:anywhere;background:#faf6ff;border:1px solid #e7dbf2;border-radius:12px;padding:16px">${escapeHTML(ticket.message)}</div><p style="margin:24px 0 16px"><a href="${escapeHTML(whatsapp)}" style="display:inline-block;background:#197344;color:#fff;text-decoration:none;font-weight:bold;border-radius:10px;padding:11px 20px">رد عبر واتساب</a></p><p style="margin:0"><a href="https://zamn.games/" style="color:#65319c;font-weight:bold">افتح رسائل الدعم في الموقع</a></p><p style="font-size:11px;color:#96859e;margin-bottom:0">رقم الرسالة: <span dir="ltr">${escapeHTML(ticket.id)}</span></p></td></tr></table></td></tr></table></body></html>`
  };
}
async function sendNotification(ref, ticket) {
  const existing = (await ref.get()).val();
  if (existing?.notification?.status === 'accepted') return existing.notification;
  let notification;
  const apiKey = String(process.env.RESEND_API_KEY || '').trim();
  const from = String(process.env.SUPPORT_EMAIL_FROM || '').trim();
  if (!apiKey || !from || /[\r\n]/.test(from)) notification = { status: 'not_configured', updatedAt: Date.now() };
  else {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json', 'Idempotency-Key': 'zamn-support/' + ticket.id },
        body: JSON.stringify({ from, to: [NOTIFICATION_EMAIL], ...notificationContent(ticket) }),
        signal: AbortSignal.timeout(5000)
      });
      const data = await response.json().catch(() => ({}));
      notification = response.ok && typeof data.id === 'string'
        ? { status: 'accepted', providerId: data.id, updatedAt: Date.now() }
        : { status: 'failed', reason: 'provider_rejected', updatedAt: Date.now() };
    } catch {
      notification = { status: 'failed', reason: 'provider_unavailable', updatedAt: Date.now() };
    }
  }
  try { await ref.update({ notification }); } catch { console.error('support notification status: write_failed'); }
  return notification;
}

function reply(res, status, body) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(status).end(JSON.stringify(body));
}
function digits(value) {
  return String(value || '').replace(/[٠-٩]/g, d => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])
    .replace(/[۰-۹]/g, d => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]).replace(/\D/g, '');
}
function phone(value) {
  let n = digits(value);
  if (n.startsWith('00')) n = n.slice(2);
  if (/^05\d{8}$/.test(n)) n = '966' + n.slice(1);
  if (/^5\d{8}$/.test(n)) n = '966' + n;
  return n;
}
function services() {
  const credential = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}');
  if (!credential.private_key || !credential.project_id || !credential.client_email) throw Error('support_not_configured');
  if (!admin.apps.length) admin.initializeApp({
    credential: admin.credential.cert(credential),
    databaseURL: 'https://zamn-games-default-rtdb.europe-west1.firebasedatabase.app'
  });
  // Keep message bodies/numbers private even if legacy database rules permit reads.
  // An explicit stable key can be supplied when rotating the service account.
  const secret = process.env.ZAMN_SUPPORT_ENCRYPTION_KEY || credential.private_key;
  const key = crypto.createHash('sha256').update('zamn-support-v1\0').update(secret).digest();
  return { db: admin.database(), key };
}
function seal(message, key) {
  const iv = crypto.randomBytes(12), cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(message), 'utf8'), cipher.final()]);
  return { iv: iv.toString('base64'), data: data.toString('base64'), tag: cipher.getAuthTag().toString('base64') };
}
function unseal(value, key) {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(value.iv, 'base64'));
  decipher.setAuthTag(Buffer.from(value.tag, 'base64'));
  return JSON.parse(Buffer.concat([decipher.update(Buffer.from(value.data, 'base64')), decipher.final()]).toString('utf8'));
}
function cookieOptions(req) {
  return '; Path=/api/support; HttpOnly; SameSite=Strict' + (req.headers.host?.startsWith('localhost') || req.headers.host?.startsWith('127.0.0.1') ? '' : '; Secure');
}
function requireOwner(req, key) {
  const cookies = String(req.headers.cookie || '').split(';').map(v => v.trim());
  const token = cookies.find(v => v.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1) || '';
  const [payload, signature] = token.split('.');
  const expected = crypto.createHmac('sha256', key).update('session:' + (payload || '')).digest('base64url');
  if (!signature || signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) throw Error('unauthorized');
  let data;
  try { data = JSON.parse(Buffer.from(payload, 'base64url').toString()); } catch { throw Error('unauthorized'); }
  if (data.phone !== OWNER_PHONE || !Number.isFinite(data.expires) || data.expires < Date.now()) throw Error('unauthorized');
}
const ADMIN_GAMES = [{"id":1,"slug":"horof-bell","name":"لعبة حروف","path":"/hrof","code":"1950"},{"id":3,"slug":"photos-1","name":"تحدي الصور","path":"/thdi","code":"116677"},{"id":7,"slug":"fawazeer","name":"فوازير","path":"/fwzr","code":"20026"},{"id":8,"slug":"guess-link","name":"خمن الرابط","path":"/link","code":"20066"},{"id":6,"slug":"family-feud","name":"فاميلي فيود","path":"/family","code":"19009"},{"id":9,"slug":"alatrash","name":"مين الأطرش في الزفة","path":"/atrsh","code":"140004"},{"id":10,"slug":"top-ten","name":"لعبة توب تن","path":"/top10","code":"119900"},{"id":11,"slug":"mn-ana","name":"لعبة من أنا؟","path":"/mnana","code":"191909"},{"id":12,"slug":"aljawab-almajhool","name":"لعبة الجواب المجهول","path":"/aljawab","code":"109010"},{"id":13,"slug":"guess-person","name":"خمن الشخصية","path":"/guess-person","code":"203040"},{"id":14,"slug":"million","name":"من سيربح المليون","path":"/million","code":"506070"},{"id":15,"slug":"zoom","name":"لعبة زوم","path":"/zoom","code":"224433"}];
function buildAdminStats(data, now=Date.now()) {
 const dayFormatter=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Riyadh',year:'numeric',month:'2-digit',day:'2-digit'});
 const dayKey=at=>dayFormatter.format(new Date(at));
 const todayKey=dayKey(now),today=Date.parse(todayKey+'T00:00:00+03:00'),week=today-6*86400000,month=Date.parse(todayKey.slice(0,7)+'-01T00:00:00+03:00');
 const metric=()=>({total:0,today:0,week:0,month:0,lastAt:null});
 const increment=(m,at)=>{if(!Number.isFinite(at)||at<=0||at>now+300000)return;m.total++;if(at>=today)m.today++;if(at>=week)m.week++;if(at>=month)m.month++;m.lastAt=Math.max(m.lastAt||0,at);};
 const views=metric(),plays=metric(),visitors={today:new Set(),week:new Set(),month:new Set()};
 const gameRows=ADMIN_GAMES.map(g=>({id:g.id,slug:g.slug,name:g.name,path:g.path,views:metric(),plays:metric(),owners:0}));
 const byId=new Map(gameRows.map(g=>[String(g.id),g])),byPath=new Map(gameRows.map(g=>[g.path,g]));
 const customers=new Map();
 for(const [number,v]of Object.entries(data.customers||{})){
  if(!/^\d{10,15}$/.test(number)||!v||typeof v!=='object')continue;
  const keys=v.games||{},owned=ADMIN_GAMES.filter(g=>keys[g.code]===true);
  if((keys['1850']||keys['17007'])&&!owned.some(g=>g.slug==='photos-1'))owned.push(ADMIN_GAMES.find(g=>g.slug==='photos-1'));
  const isAdmin='+'+number===OWNER_PHONE;
  if(!isAdmin)owned.forEach(g=>{byId.get(String(g.id)).owners++});
  customers.set(number,{phone:number,name:String(v.name||'لاعب').slice(0,100),isAdmin,ownedGames:owned.map(g=>({slug:g.slug,name:g.name})),ownedCount:owned.length,views:metric(),plays:metric(),lastVisit:Number(v.lastLogin)||null,gameActivity:{}});
 }
 const days=Array.from({length:14},(_,i)=>({day:dayKey(today-(13-i)*86400000),views:0,plays:0}));const dayMap=new Map(days.map(d=>[d.day,d]));
 for(const session of Object.values(data.sessions||{}))for(const event of Object.values(session||{})){
  if(!event||!['pageview','navigation'].includes(event.type))continue;
  const at=Number(event.at);if(!Number.isFinite(at)||at<=0||at>now+300000)continue;
  const p=String(event.phone||'');if('+'+p===OWNER_PHONE)continue;
  increment(views,at);const visitor=String(event.visitorId||event.sessionId||'');if(visitor){if(at>=today)visitors.today.add(visitor);if(at>=week)visitors.week.add(visitor);if(at>=month)visitors.month.add(visitor);}
  const day=dayMap.get(dayKey(at));if(day)day.views++;
  const path=String(event.path||'').split('?')[0].replace(/\/$/,'')||'/';const game=byPath.get(path)||gameRows.find(g=>path==='/game/'+g.slug);if(game)increment(game.views,at);
  const customer=customers.get(p);if(customer){increment(customer.views,at);customer.lastVisit=Math.max(customer.lastVisit||0,at);}
 }
 for(const entry of Object.values(data.entries||{})){
  if(!entry||'+'+String(entry.phone||'')===OWNER_PHONE)continue;
  const at=Number(entry.enteredAt);if(!Number.isFinite(at)||at<=0||at>now+300000)continue;
  increment(plays,at);const game=byId.get(String(entry.gameId));if(game)increment(game.plays,at);
  const day=dayMap.get(dayKey(at));if(day)day.plays++;
  const customer=customers.get(String(entry.phone||''));if(customer){increment(customer.plays,at);customer.lastVisit=Math.max(customer.lastVisit||0,at);if(game){const v=customer.gameActivity[game.slug]||={name:game.name,count:0,lastAt:null};v.count++;v.lastAt=Math.max(v.lastAt||0,at);}}
 }
 // Legacy counters can include older entries than the bounded detailed log.
 for(const g of gameRows){const legacy=data.totals?.[String(g.id)];g.recordedPlayCount=Math.max(g.plays.total,Number(legacy?.count)||0);}
 const online=Object.values(data.online||{}).filter(v=>v&&'+'+String(v.phone||'')!==OWNER_PHONE&&Number(v.lastActivity)>=now-300000).length;
 const list=[...customers.values()].sort((a,b)=>(b.lastVisit||0)-(a.lastVisit||0));
 return {generatedAt:now,timeZone:'Asia/Riyadh',periods:{today,week,month},views,plays,uniqueVisitors:Object.fromEntries(Object.entries(visitors).map(([k,v])=>[k,v.size])),online,customerCount:list.filter(c=>!c.isAdmin).length,totalOwnerships:list.filter(c=>!c.isAdmin).reduce((n,c)=>n+c.ownedCount,0),customers:list,games:gameRows,days,coverage:{sessions:Object.keys(data.sessions||{}).length,playEntries:Object.keys(data.entries||{}).length,limited:Object.keys(data.sessions||{}).length>=5000||Object.keys(data.entries||{}).length>=50000,customerViewsFrom:'إحصاءات زيارات العميل مرتبطة برقمه تبدأ بعد هذا التحديث؛ آخر دخول وتشغيل سابق متاحان حسب السجل.'}};
}
async function adminStats(db){
 const [customers,sessions,entries,totals,online]=await Promise.all([db.ref('customers').get(),db.ref('analytics/sessionEvents').orderByKey().limitToLast(5000).get(),db.ref('analytics/gameEntryLogs').orderByKey().limitToLast(50000).get(),db.ref('analytics/gameEntries').get(),db.ref('analytics/online').get()]);
 return buildAdminStats({customers:customers.val(),sessions:sessions.val(),entries:entries.val(),totals:totals.val(),online:online.val()});
}

async function manageCustomerGames(db, body) {
 const number=phone(body.phone);
 if(!/^[1-9]\d{9,14}$/.test(number))return {status:422,error:'invalid_phone'};
 const ref=db.ref('customers/'+number),customer=(await ref.get()).val();
 if(!customer)return {status:404,error:'customer_not_found'};
 const games=ADMIN_GAMES.map(g=>({slug:g.slug,name:g.name,owned:customer.games?.[g.code]===true||(g.slug==='photos-1'&&(customer.games?.['1850']===true||customer.games?.['17007']===true))}));
 if(body.action==='customer-games')return {status:200,ok:true,customer:{phone:number,name:String(customer.name||'لاعب').slice(0,100)},games};
 const game=ADMIN_GAMES.find(g=>g.slug===body.slug);
 if(!game||typeof body.enabled!=='boolean')return {status:422,error:'invalid_game'};
 const updates={};updates['customers/'+number+'/games/'+game.code]=body.enabled?true:null;
 if(!body.enabled&&game.slug==='photos-1')for(const legacy of ['1850','17007'])updates['customers/'+number+'/games/'+legacy]=null;
 const audit=db.ref('adminGameChangesV1').push().key;
 updates['adminGameChangesV1/'+audit]={admin:OWNER_PHONE,phone:number,slug:game.slug,enabled:body.enabled,at:Date.now()};
 await db.ref().update(updates);
 games.find(g=>g.slug===game.slug).owned=body.enabled;
 return {status:200,ok:true,customer:{phone:number,name:String(customer.name||'لاعب').slice(0,100)},games};
}

module.exports = async function support(req, res) {
  try {
    const origin = req.headers.origin;
    if (origin && !['https://zamn.games', 'https://www.zamn.games', 'http://localhost:8765', 'http://127.0.0.1:8765'].includes(origin)) return reply(res, 403, { error: 'forbidden_origin' });
    if (!['GET', 'POST', 'PATCH'].includes(req.method)) { res.setHeader('Allow', 'GET, POST, PATCH'); return reply(res, 405, { error: 'method_not_allowed' }); }
    const { db, key } = services();
    if (req.method === 'GET') {
      requireOwner(req, key);
      if (req.query?.action === 'session') return reply(res, 200, { ok: true });
      if (req.query?.action === 'stats') return reply(res, 200, { ok: true, stats: await adminStats(db) });
      const before = String(req.query?.before || '');
      if (before && !/^[-\w]{20}$/.test(before)) return reply(res, 400, { error: 'invalid_cursor' });
      let query = db.ref(BASE + '/messages').orderByKey();
      if (before) query = query.endAt(before);
      const snap = await query.limitToLast(before ? 101 : 100).get();
      const entries = Object.entries(snap.val() || {}).filter(([id]) => id !== before).slice(-100);
      const messages = entries.map(([id, value]) => {
        try { return { id, ...unseal(value.sealed, key), createdAt: value.createdAt, status: value.status === 'done' ? 'done' : 'new', notification: { status: ['accepted', 'failed', 'not_configured', 'pending'].includes(value.notification?.status) ? value.notification.status : 'not_sent' } }; }
        catch { return { id, unavailable: true, createdAt: value.createdAt, status: value.status, message: 'تعذر قراءة هذه الرسالة. راجع مفتاح تشفير الدعم.' }; }
      }).reverse();
      return reply(res, 200, { messages, nextCursor: entries.length === 100 ? entries[0][0] : null });
    }
    if (!String(req.headers['content-type'] || '').startsWith('application/json')) return reply(res, 415, { error: 'json_required' });
    let body;
    try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; } catch { return reply(res, 400, { error: 'invalid_json' }); }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(res, 400, { error: 'invalid_json' });
    if(req.method==='POST'&&['customer-games','set-customer-game'].includes(body.action)){
      requireOwner(req,key);
      const result=await manageCustomerGames(db,body);const {status,...data}=result;
      return reply(res,status,data);
    }
    if (req.method === 'POST' && body.action === 'admin-login') {
      const ip = String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
      const hash = crypto.createHmac('sha256', key).update('admin:' + ip).digest('hex');
      const now = Date.now();
      const attempt = await db.ref(BASE + '/loginLimits/' + hash).transaction(old => {
        if (!old || now - Number(old.since) >= 15 * 60 * 1000) return { since: now, count: 1 };
        if (Number(old.count) >= 5) return;
        return { since: old.since, count: Number(old.count) + 1 };
      });
      if (!attempt.committed) { res.setHeader('Retry-After', '900'); return reply(res, 429, { error: 'login_limited' }); }
      const supplied = crypto.createHash('sha256').update(digits(body.pin)).digest();
      const expected = crypto.createHash('sha256').update(process.env.ZAMN_SUPPORT_ADMIN_PIN || '1940').digest();
      if ('+' + phone(body.phone) !== OWNER_PHONE || !crypto.timingSafeEqual(supplied, expected)) return reply(res, 401, { error: 'invalid_pin' });
      const payload = Buffer.from(JSON.stringify({ phone: OWNER_PHONE, expires: now + 12 * 60 * 60 * 1000 })).toString('base64url');
      const signature = crypto.createHmac('sha256', key).update('session:' + payload).digest('base64url');
      res.setHeader('Set-Cookie', COOKIE + '=' + payload + '.' + signature + '; Max-Age=43200' + cookieOptions(req));
      return reply(res, 200, { ok: true });
    }
    if (req.method === 'POST' && body.action === 'admin-logout') {
      res.setHeader('Set-Cookie', COOKIE + '=; Max-Age=0' + cookieOptions(req));
      return reply(res, 200, { ok: true });
    }
    if (req.method === 'PATCH') {
      requireOwner(req, key);
      if (body.action === 'retry-notification') {
        if (!/^[-\w]{20}$/.test(String(body.id || ''))) return reply(res, 400, { error: 'invalid_message' });
        const ref = db.ref(BASE + '/messages/' + body.id);
        const snap = await ref.get();
        if (!snap.exists()) return reply(res, 404, { error: 'not_found' });
        const value = snap.val();
        const notification = await sendNotification(ref, { ...unseal(value.sealed, key), id: body.id, createdAt: value.createdAt });
        return reply(res, 200, { ok: true, notification: { status: notification.status } });
      }
      const ids = [...new Set(Array.isArray(body.ids) ? body.ids : [body.id])];
      if (!ids.length || ids.length > 100 || ids.some(id => typeof id !== 'string' || !/^[-\w]{20}$/.test(id)) || !['new', 'done'].includes(body.status)) return reply(res, 400, { error: 'invalid_message' });
      const snapshots = await Promise.all(ids.map(id => db.ref(BASE + '/messages/' + id).get()));
      if (snapshots.some(snap => !snap.exists())) return reply(res, 404, { error: 'not_found' });
      const updates = Object.fromEntries(ids.map(id => [id + '/status', body.status]));
      await db.ref(BASE + '/messages').update(updates);
      return reply(res, 200, { ok: true });
    }
    if (body.website) return reply(res, 200, { ok: true });
    const name = String(body.name || '').trim(), number = phone(body.phone), message = String(body.message || '').trim();
    if (!name || name.length > 80 || !/^[1-9]\d{9,14}$/.test(number) || message.length < 5 || message.length > 2000) return reply(res, 422, { error: 'invalid_fields' });
    const now = Date.now();
    const fingerprint = crypto.createHmac('sha256', key).update(number + '\0' + message.normalize('NFC').replace(/\s+/g, ' ')).digest('hex');
    const phoneHash = crypto.createHmac('sha256', key).update('phone:' + number).digest('hex');
    const phoneLimit = db.ref(BASE + '/limits/' + phoneHash);
    const previous = (await phoneLimit.get()).val();
    // Return the already-saved ticket when a double click or retry repeats a message.
    if (previous?.fingerprint === fingerprint && previous.id && now - Number(previous.at) < 120000) {
      if ((await db.ref(BASE + '/messages/' + previous.id).get()).exists()) return reply(res, 201, { ok: true, id: previous.id });
      if (now - Number(previous.leaseAt || previous.at) < 10000) return reply(res, 409, { error: 'message_processing' });
    }
    const ip = String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
    const ipHash = crypto.createHmac('sha256', key).update('ip:' + ip).digest('hex');
    const ipLimit = await db.ref(BASE + '/limits/' + ipHash).transaction(old => {
        if (old && now - Number(old.at) < 30000) return;
        return { at: now };
    });
    if (!ipLimit.committed) { res.setHeader('Retry-After', '30'); return reply(res, 429, { error: 'rate_limited' }); }
    const candidate = db.ref(BASE + '/messages').push().key;
    const lease = crypto.randomBytes(16).toString('hex');
    const claim = await phoneLimit.transaction(old => {
      if (old?.fingerprint === fingerprint && old.id && now - Number(old.at) < 120000) {
        if (now - Number(old.leaseAt || old.at) < 10000) return old;
        return { ...old, leaseAt: now, lease };
      }
      if (old && now - Number(old.at) < 30000) return;
      return { at: now, id: candidate, fingerprint, leaseAt: now, lease };
    });
    if (!claim.committed) { res.setHeader('Retry-After', '30'); return reply(res, 429, { error: 'rate_limited' }); }
    const reservation = claim.snapshot.val();
    const ref = db.ref(BASE + '/messages/' + reservation.id);
    if (reservation.lease !== lease) {
      if ((await ref.get()).exists()) return reply(res, 201, { ok: true, id: reservation.id });
      return reply(res, 409, { error: 'message_processing' });
    }
    await ref.transaction(old => old || { createdAt: reservation.at, status: 'new', notification: { status: 'pending' }, sealed: seal({ name, phone: number, message, page: String(body.page || '').slice(0,300) }, key) });
    // Email failure must never turn a saved support message into a failed submission.
    try { await sendNotification(ref, { id: reservation.id, name, phone: number, message, createdAt: reservation.at }); }
    catch { console.error('support notification: dispatch_failed'); }
    return reply(res, 201, { ok: true, id: reservation.id });
  } catch (error) {
    const code = error.message;
    if (code === 'unauthorized') return reply(res, 401, { error: code });
    if (code === 'forbidden') return reply(res, 403, { error: code });
    console.error('support endpoint:', code === 'support_not_configured' ? code : 'service_unavailable');
    return reply(res, 503, { error: code === 'support_not_configured' ? code : 'service_unavailable' });
  }
};

module.exports.buildAdminStats = buildAdminStats;
