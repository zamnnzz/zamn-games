const crypto = require('crypto');
const admin = require('firebase-admin');
const OWNER_PHONE = '+966591216299';
const BASE = 'supportInboxV1';
const COOKIE = 'zamn_support_session';

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
module.exports = async function support(req, res) {
  try {
    const origin = req.headers.origin;
    if (origin && !['https://zamn.games', 'https://www.zamn.games', 'http://localhost:8765', 'http://127.0.0.1:8765'].includes(origin)) return reply(res, 403, { error: 'forbidden_origin' });
    if (!['GET', 'POST', 'PATCH'].includes(req.method)) { res.setHeader('Allow', 'GET, POST, PATCH'); return reply(res, 405, { error: 'method_not_allowed' }); }
    const { db, key } = services();
    if (req.method === 'GET') {
      requireOwner(req, key);
      if (req.query?.action === 'session') return reply(res, 200, { ok: true });
      const before = String(req.query?.before || '');
      if (before && !/^[-\w]{20}$/.test(before)) return reply(res, 400, { error: 'invalid_cursor' });
      let query = db.ref(BASE + '/messages').orderByKey();
      if (before) query = query.endAt(before);
      const snap = await query.limitToLast(before ? 101 : 100).get();
      const entries = Object.entries(snap.val() || {}).filter(([id]) => id !== before).slice(-100);
      const messages = entries.map(([id, value]) => {
        try { return { id, ...unseal(value.sealed, key), createdAt: value.createdAt, status: value.status === 'done' ? 'done' : 'new' }; }
        catch { return { id, unavailable: true, createdAt: value.createdAt, status: value.status, message: 'تعذر قراءة هذه الرسالة. راجع مفتاح تشفير الدعم.' }; }
      }).reverse();
      return reply(res, 200, { messages, nextCursor: entries.length === 100 ? entries[0][0] : null });
    }
    if (!String(req.headers['content-type'] || '').startsWith('application/json')) return reply(res, 415, { error: 'json_required' });
    let body;
    try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; } catch { return reply(res, 400, { error: 'invalid_json' }); }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(res, 400, { error: 'invalid_json' });
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
    await ref.transaction(old => old || { createdAt: reservation.at, status: 'new', sealed: seal({ name, phone: number, message, page: String(body.page || '').slice(0,300) }, key) });
    return reply(res, 201, { ok: true, id: reservation.id });
  } catch (error) {
    const code = error.message;
    if (code === 'unauthorized') return reply(res, 401, { error: code });
    if (code === 'forbidden') return reply(res, 403, { error: code });
    console.error('support endpoint:', code === 'support_not_configured' ? code : 'service_unavailable');
    return reply(res, 503, { error: code === 'support_not_configured' ? code : 'service_unavailable' });
  }
};
