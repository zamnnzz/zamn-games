(() => {
  'use strict';
  const OWNER = '966591216299';
  const $ = id => document.getElementById(id);
  const normalize = value => {
    let n=String(value||'').replace(/[٠-٩]/g,d=>'0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]).replace(/[۰-۹]/g,d=>'0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]).replace(/\D/g,'');
    if(n.startsWith('00'))n=n.slice(2);if(/^05\d{8}$/.test(n))n='966'+n.slice(1);if(/^5\d{8}$/.test(n))n='966'+n;return n;
  };
  let authenticated=false,loginResolve=null,lastFocus=null,pollTimer=null,cursor=null,loading=false,customer=null,identityPending=false,identityVersion=0;
  const errors={invalid_fields:'تأكد من الاسم ورقم الواتساب، واكتب رسالة من 5 إلى 2000 حرف.',rate_limited:'انتظر نصف دقيقة قبل إرسال رسالة أخرى.',invalid_pin:'رمز الإدارة غير صحيح.',login_limited:'تجاوزت عدد المحاولات. حاول بعد 15 دقيقة.',support_not_configured:'الدعم داخل الموقع غير متاح حاليًا. تواصل معنا عبر واتساب.',service_unavailable:'تعذر الاتصال بالدعم الآن. حاول لاحقًا أو استخدم واتساب.',unauthorized:'انتهت جلسة الإدارة. أدخل رمزك مجددًا.'};
  async function api(method='GET',body=null,query=''){
    const response=await fetch('/api/support'+query,{method,credentials:'same-origin',cache:'no-store',headers:body?{'Content-Type':'application/json'}:{},...(body?{body:JSON.stringify(body)}:{})});
    let data;try{data=await response.json()}catch{throw Error('تعذر إرسال الرسالة الآن. اضغط «تواصل مع الدعم عبر واتساب» بالأسفل.')}
    if(!response.ok){const error=Error(errors[data.error]||'تعذر تنفيذ الطلب، حاول مجددًا.');error.code=data.error;throw error}return data;
  }
  function notice(id,message,error=false){$(id).textContent=message;$(id).dataset.error=String(error)}
  function showDialog(id){lastFocus=document.activeElement;$(id).hidden=false;requestAnimationFrame(()=>$(id).querySelector('input:not([tabindex="-1"]),button')?.focus())}
  function closeDialog(id){$(id).hidden=true;lastFocus?.focus();if(id==='supportPinModal'&&loginResolve){loginResolve(false);loginResolve=null}}
  const scripts=new Map();
  function loadScript(src){
    if(scripts.has(src))return scripts.get(src);
    const promise=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=()=>reject(Error('تعذر تحميل بيانات حسابك. حاول فتح الدعم مجددًا.'));document.head.append(script)});
    scripts.set(src,promise);promise.catch(()=>scripts.delete(src));return promise;
  }
  async function currentCustomer(){
    const saved=normalize(localStorage.getItem('playerPhone'));
    if(!saved)return null;
    if(window.ZamnAccount){const live=await window.ZamnAccount.getCustomer();if(live?.name&&normalize(live.phone)===saved)return {name:live.name,phone:saved};}
    // Shared with pages such as Contact, which do not mount the account form.
    try{const cached=JSON.parse(localStorage.getItem('zamnPlayerProfile')||'null');if(cached?.name&&normalize(cached.phone)===saved)return {name:cached.name,phone:saved}}catch{}
    // Restore the name for sessions created before the profile cache was added.
    if(!window.ZAMN_FIREBASE_CONFIG)await loadScript('/js/games.js?v=20261101-horof');
    if(!window.firebase?.apps)await loadScript('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
    if(!window.firebase?.database)await loadScript('https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js');
    if(!window.firebase.apps.length)window.firebase.initializeApp(window.ZAMN_FIREBASE_CONFIG);
    const snap=await window.firebase.database().ref('customers/'+saved+'/name').get();
    const name=snap.exists()?String(snap.val()||'').trim():'';
    if(!name||normalize(localStorage.getItem('playerPhone'))!==saved)return null;
    const profile={name,phone:saved};localStorage.setItem('zamnPlayerProfile',JSON.stringify(profile));return profile;
  }
  async function syncCustomerIdentity(){
    const version=++identityVersion;identityPending=true;customer=null;$('supportSend').disabled=true;$('supportIdentityFields').hidden=true;$('supportAccountSummary').hidden=true;
    notice('supportSendNotice','جاري تجهيز الرسالة…');
    try{
      const profile=await currentCustomer();if(version!==identityVersion)return;
      if(profile&&normalize(localStorage.getItem('playerPhone'))!==profile.phone)return syncCustomerIdentity();
      customer=profile;
      $('supportIdentityFields').hidden=!!customer;
      for(const id of ['supportSenderName','supportSenderPhone']){$(id).disabled=!!customer;$(id).required=!customer;}
      if(customer){$('supportAccountSummary').textContent='بنرسل رسالتك باسم '+customer.name+' ورقم حسابك، وبنرد عليك على واتساب.';$('supportAccountSummary').hidden=false;notice('supportSendNotice','اكتب رسالتك، بيانات حسابك تنرفق تلقائيًا.');}
      else{notice('supportSendNotice','اكتب اسمك ورقم الواتساب عشان نقدر نرد عليك.');}
      identityPending=false;$('supportSend').disabled=false;
      if(!$('supportModal').hidden)(customer?$('supportMessage'):$('supportSenderName')).focus();
    }catch(error){if(version!==identityVersion)return;notice('supportSendNotice','تعذر تحميل بيانات حسابك. أغلق الدعم وافتحه للمحاولة مجددًا، أو تواصل معنا عبر واتساب.',true);}
  }
  function openCustomer(){
    showDialog('supportModal');syncCustomerIdentity();
  }
  function openInbox(){
    authenticated=true;$('supportInbox').hidden=false;$('supportLaunch').textContent='رسائل العملاء';
    refreshInbox().then(()=>{if(!document.body.classList.contains('player-open'))$('supportInbox').scrollIntoView({behavior:'smooth',block:'start'})});clearInterval(pollTimer);pollTimer=setInterval(()=>{if(!document.hidden&&!document.body.classList.contains('player-open'))refreshInbox()},30000);
  }
  async function authenticateOwner(){
    if(authenticated)return true;
    try{await api('GET',null,'?action=session');openInbox();return true}catch(error){if(error.code!=='unauthorized'){notice('supportPinNotice',error.message,true)}else notice('supportPinNotice','أدخل رمز الإدارة لعرض رسائل العملاء.')}
    if(loginResolve)return false;
    $('supportAdminPin').value='';showDialog('supportPinModal');
    return new Promise(resolve=>{loginResolve=resolve});
  }
  function element(tag,text,className){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(className)e.className=className;return e}
  function ticket(message){
    const card=element('article',undefined,'support-ticket');card.dataset.status=message.status;
    if(message.unavailable){card.append(element('p',message.message));return card}
    const top=element('div',undefined,'support-ticket-top');top.append(element('strong',message.name));const date=element('time',new Date(message.createdAt).toLocaleString('ar-SA'));date.dateTime=new Date(message.createdAt).toISOString();top.append(date);card.append(top);
    card.append(element('span','+'+message.phone,'support-phone'),element('small','رقم التواصل مع صاحب الرسالة'),element('p',message.message));
    if(message.page)card.append(element('small','أرسل من: '+message.page));
    const actions=element('div',undefined,'support-ticket-actions');const wa=element('a','رد عبر واتساب','support-action support-whatsapp');wa.href='https://wa.me/'+message.phone+'?text='+encodeURIComponent('أهلًا '+message.name+'، معك دعم ألعاب زامن بخصوص رسالتك: '+message.message.slice(0,180));wa.target='_blank';wa.rel='noopener noreferrer';actions.append(wa);
    const done=element('button',message.status==='done'?'إعادة للرسائل الجديدة':'تم التعامل معها','support-action support-secondary');done.type='button';done.onclick=async()=>{done.disabled=true;try{await api('PATCH',{id:message.id,status:message.status==='done'?'new':'done'});await refreshInbox()}catch(e){notice('supportInboxNotice',e.message,true)}finally{done.disabled=false}};actions.append(done);card.append(actions);return card;
  }
  async function refreshInbox(older=false){
    if(loading||!authenticated)return;loading=true;
    try{
      const data=await api('GET',null,older&&cursor?'?before='+encodeURIComponent(cursor):'');
      if(!older)$('supportMessageList').replaceChildren();
      data.messages.forEach(m=>$('supportMessageList').append(ticket(m)));cursor=data.nextCursor;$('supportOlder').hidden=!cursor;
      notice('supportInboxNotice',$('supportMessageList').children.length?'يتم تحديث الرسائل كل 30 ثانية. الرد يفتح واتساب ولا يُرسل تلقائيًا.':'ما وصلت رسائل حتى الآن.');
    }catch(e){notice('supportInboxNotice',e.message,true);if(e.code==='unauthorized'){authenticated=false;clearInterval(pollTimer);$('supportInbox').hidden=true;$('supportLaunch').textContent='رسائل العملاء — دخول'}}finally{loading=false}
  }
  function init(){
    const shell=document.createElement('div');shell.innerHTML=`
      <button type="button" class="support-launch" id="supportLaunch">الدعم داخل الموقع</button>
      <div class="support-overlay" id="supportModal" hidden><section class="support-dialog" role="dialog" aria-modal="true" aria-labelledby="supportTitle"><button type="button" class="support-close" data-support-close="supportModal" aria-label="إغلاق">×</button><h2 id="supportTitle">حنا معك</h2><p>عندك سؤال أو واجهتك مشكلة؟ اكتب لنا وبنتواصل معك على واتساب.</p><form id="supportForm"><p id="supportAccountSummary" class="support-note" hidden></p><div id="supportIdentityFields"><label>اسمك<input id="supportSenderName" name="name" autocomplete="name" maxlength="80" required></label><label>رقم الواتساب<input id="supportSenderPhone" name="phone" autocomplete="tel" inputmode="tel" dir="ltr" placeholder="05xxxxxxxx أو رقمك مع مفتاح الدولة" maxlength="20" required></label></div><label>رسالتك<textarea id="supportMessage" name="message" minlength="5" maxlength="2000" required placeholder="اذكر اسم اللعبة ووصف المشكلة"></textarea></label><div class="support-honeypot" aria-hidden="true"><label>الموقع<input name="website" id="supportWebsite" tabindex="-1" autocomplete="off"></label></div><p class="support-note">بإرسال الرسالة توافق على حفظ اسمك ورقمك ورسالتك لدى دعم زامن للرد على استفسارك. لا ترسل كلمات مرور أو بيانات دفع.</p><button type="submit" id="supportSend">إرسال للدعم</button><p class="support-notice" id="supportSendNotice" role="status" aria-live="polite"></p></form><a class="support-alternative" href="https://wa.me/message/ZDFHGX5MVYMOF1" target="_blank" rel="noopener noreferrer">تواصل مع الدعم عبر واتساب ↗</a><p class="support-note support-whatsapp-note">يفتح تطبيق واتساب أو واتساب ويب للتواصل معنا مباشرة.</p></section></div>
      <div class="support-overlay" id="supportPinModal" hidden><section class="support-dialog" role="dialog" aria-modal="true" aria-labelledby="supportPinTitle"><button type="button" class="support-close" data-support-close="supportPinModal" aria-label="إغلاق">×</button><h2 id="supportPinTitle">أهلًا بك في إدارة زامن</h2><p>أدخل رمز الإدارة لعرض رسائل العملاء.</p><form id="supportPinForm"><label>رمز الإدارة<input id="supportAdminPin" type="password" inputmode="numeric" autocomplete="off" maxlength="12" required></label><button type="submit" id="supportPinSubmit">دخول الرسائل</button><p id="supportPinNotice" class="support-notice" role="status" aria-live="polite"></p></form></section></div>`;
    document.body.append(shell);
    const inbox=document.createElement('section');inbox.className='support-inbox';inbox.id='supportInbox';inbox.hidden=true;inbox.setAttribute('aria-labelledby','supportInboxTitle');inbox.innerHTML=`<div class="support-inbox-head"><h2 id="supportInboxTitle">رسائل العملاء</h2><div class="support-inbox-actions"><button class="support-action support-secondary" id="supportRefresh" type="button">تحديث الرسائل</button><button class="support-action support-secondary" id="supportAdminLogout" type="button">خروج الإدارة</button></div></div><p class="support-live" id="supportInboxNotice" role="status" aria-live="polite"></p><div class="support-list" id="supportMessageList"></div><button class="support-action support-secondary" id="supportOlder" type="button" hidden>رسائل أقدم</button>`;
    const target=$('homeMain')||document.querySelector('main')||document.body;target.prepend(inbox);
    document.querySelectorAll('[data-support-open]').forEach(e=>e.addEventListener('click',openCustomer));
    $('supportLaunch').onclick=async()=>{if(normalize(localStorage.getItem('playerPhone'))===OWNER||authenticated){if(await authenticateOwner()){$('supportInbox').scrollIntoView({behavior:'smooth',block:'start'});}}else openCustomer()};
    document.querySelectorAll('[data-support-close]').forEach(b=>b.onclick=()=>closeDialog(b.dataset.supportClose));
    ['supportModal','supportPinModal'].forEach(id=>$(id).addEventListener('click',e=>{if(e.target===$(id))closeDialog(id)}));
    document.addEventListener('keydown',e=>{const dialog=['supportPinModal','supportModal'].map($).find(el=>!el.hidden);if(!dialog)return;if(e.key==='Escape'){e.preventDefault();closeDialog(dialog.id)}if(e.key==='Tab'){const focusable=[...dialog.querySelectorAll('button,input,textarea,a[href]')].filter(e=>!e.disabled&&e.tabIndex!==-1&&e.getClientRects().length);const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
    $('supportForm').onsubmit=async e=>{e.preventDefault();if(identityPending)return;if(customer&&normalize(localStorage.getItem('playerPhone'))!==customer.phone){await syncCustomerIdentity();return;}const button=$('supportSend');button.disabled=true;notice('supportSendNotice','جاري الإرسال…');try{await api('POST',{name:customer?customer.name:$('supportSenderName').value,phone:customer?customer.phone:$('supportSenderPhone').value,message:$('supportMessage').value,website:$('supportWebsite').value,page:location.pathname});$('supportMessage').value='';notice('supportSendNotice','وصلتنا رسالتك ✓ بنرد عليك على واتساب.')}catch(error){notice('supportSendNotice',error.message,true)}finally{button.disabled=false}};
    $('supportPinForm').onsubmit=async e=>{e.preventDefault();$('supportPinSubmit').disabled=true;try{await api('POST',{action:'admin-login',phone:OWNER,pin:$('supportAdminPin').value});$('supportAdminPin').value='';const resolve=loginResolve;loginResolve=null;closeDialog('supportPinModal');openInbox();resolve?.(true);setTimeout(()=>$('supportInbox').scrollIntoView({behavior:'smooth',block:'start'}),150)}catch(error){notice('supportPinNotice',error.message,true)}finally{$('supportPinSubmit').disabled=false}};
    $('supportRefresh').onclick=()=>refreshInbox();$('supportOlder').onclick=()=>refreshInbox(true);
    $('supportAdminLogout').onclick=async()=>{try{await api('POST',{action:'admin-logout'});authenticated=false;clearInterval(pollTimer);$('supportInbox').hidden=true;$('supportMessageList').replaceChildren();$('supportLaunch').textContent='رسائل العملاء — دخول'}catch(e){notice('supportInboxNotice',e.message,true)}};
    window.ZamnSupport={authenticateOwner,open:openCustomer};
    const checkOwner=()=>{if(normalize(localStorage.getItem('playerPhone'))===OWNER)authenticateOwner();else if(authenticated){authenticated=false;clearInterval(pollTimer);$('supportInbox').hidden=true;$('supportMessageList').replaceChildren();api('POST',{action:'admin-logout'}).catch(()=>{});$('supportLaunch').textContent='الدعم داخل الموقع'}};
    const accountChanged=()=>{checkOwner();if(!$('supportModal').hidden)syncCustomerIdentity();};window.addEventListener('zamn-account-change',accountChanged);window.addEventListener('storage',accountChanged);if(!$('accountModal'))checkOwner();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
