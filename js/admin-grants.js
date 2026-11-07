(()=>{
 'use strict';
 function init(){
  const anchor=document.getElementById('zamnAdminStats')||document.getElementById('supportInbox');if(!anchor)return;
  const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n};
  const panel=el('section');panel.id='zamnAdminGrants';panel.className='admin-grants';panel.hidden=true;
  const title=el('h2','إدارة ألعاب العملاء'),form=el('form'),label=el('label','رقم جوال العميل'),input=el('input'),search=el('button','بحث');
  input.type='tel';input.inputMode='tel';input.autocomplete='off';input.id='adminGrantPhone';input.placeholder='05xxxxxxxx';input.required=true;label.htmlFor=input.id;
  search.type='submit';form.append(label,input,search);
  const notice=el('p');notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');
  const result=el('div');panel.append(title,el('p','ابحث برقم العميل، ثم اختر اللعبة وفعّلها أو أزلها من حسابه.'),form,notice,result);anchor.before(panel);
  let active=false,version=0,current=null,busy=false,timer;
  const normalize=v=>{let n=String(v).replace(/[٠-٩]/g,d=>'0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]).replace(/[۰-۹]/g,d=>'0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]).replace(/\D/g,'');if(n.startsWith('00'))n=n.slice(2);if(/^05\d{8}$/.test(n))n='966'+n.slice(1);if(/^5\d{8}$/.test(n))n='966'+n;return n};
  async function api(body){
   const response=await fetch('/api/support',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
   const data=await response.json();if(!response.ok||!data.ok)throw Error(({unauthorized:'انتهت جلسة الإدارة، سجّل الدخول مجددًا.',customer_not_found:'هذا الرقم غير مسجل في الموقع.',invalid_phone:'أدخل رقم جوال صحيحًا.',invalid_game:'اختر لعبة صحيحة.'})[data.error]||'تعذر إتمام الطلب، حاول مجددًا.');return data;
  }
  function render(data){
   current=data;result.replaceChildren();
   result.append(el('h3',data.customer.name));const number=el('p','+'+data.customer.phone);number.dir='ltr';result.append(number);
   const gameLabel=el('label','اللعبة'),select=el('select');select.id='adminGrantGame';gameLabel.htmlFor=select.id;
   data.games.forEach(g=>{const option=el('option',g.name+(g.owned?' — مفعّلة':' — غير مفعّلة'));option.value=g.slug;select.append(option)});
   const state=el('p'),actions=el('div'),grant=el('button','تفعيل اللعبة'),revoke=el('button','إزالة اللعبة');revoke.className='admin-grants-remove';grant.type=revoke.type='button';
   const sync=()=>{const g=data.games.find(g=>g.slug===select.value);state.textContent=g.owned?'اللعبة مفعّلة لهذا العميل':'اللعبة غير مفعّلة لهذا العميل';grant.disabled=busy||g.owned;revoke.disabled=busy||!g.owned};select.onchange=sync;
   async function change(enabled){
    if(busy||!active||!current)return;
    const g=data.games.find(g=>g.slug===select.value),v=++version;busy=true;input.disabled=search.disabled=select.disabled=true;sync();notice.textContent='جارٍ حفظ التعديل…';
    try{const updated=await api({action:'set-customer-game',phone:data.customer.phone,slug:g.slug,enabled});if(v!==version||!active)return;busy=false;render(updated);result.querySelector('select').value=g.slug;result.querySelector('select').dispatchEvent(new Event('change'));notice.textContent=(enabled?'تم تفعيل ':'تم إزالة ')+g.name+(enabled?' لـ ':' من حساب ')+data.customer.name;window.dispatchEvent(new CustomEvent('zamn-admin-games-changed'));}
    catch(error){if(v===version&&active)notice.textContent=error.message;}
    finally{busy=false;input.disabled=search.disabled=select.disabled=false;sync();}
   }
   grant.onclick=()=>change(true);revoke.onclick=()=>change(false);actions.append(grant,revoke);result.append(gameLabel,select,state,actions);sync();
  }
  async function lookup(){
   clearTimeout(timer);if(!active||busy)return;
   const number=normalize(input.value),v=++version;current=null;result.replaceChildren();
   if(!/^[1-9]\d{9,14}$/.test(number)){notice.textContent='أدخل رقم جوال صحيحًا.';return;}
   notice.textContent='جارٍ البحث…';
   try{const data=await api({action:'customer-games',phone:number});if(v!==version||!active)return;notice.textContent='';render(data)}catch(error){if(v===version&&active)notice.textContent=error.message}
  }
  form.onsubmit=e=>{e.preventDefault();lookup()};
  input.oninput=()=>{++version;current=null;result.replaceChildren();notice.textContent='';clearTimeout(timer);if(/^[1-9]\d{9,14}$/.test(normalize(input.value)))timer=setTimeout(lookup,500)};
  window.addEventListener('zamn-admin-session',e=>{active=!!e.detail?.active;panel.hidden=!active;++version;clearTimeout(timer);current=null;result.replaceChildren();notice.textContent='';if(!active)input.value=''});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
