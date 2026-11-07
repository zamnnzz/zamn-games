(()=>{
 'use strict';
 const nf=new Intl.NumberFormat('ar-SA'),df=new Intl.DateTimeFormat('ar-SA',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Riyadh'});
 let active=false,data=null,revision=0,loading=false,selected='overview',query='',gameMetric='views';
 const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
 const num=v=>nf.format(Number(v)||0),when=v=>v?df.format(new Date(v)):'غير مسجّل';
 function init(){
  const target=document.getElementById('homeMain');if(!target)return;
  const panel=el('section',undefined,'admin-stats');panel.id='zamnAdminStats';panel.hidden=true;panel.setAttribute('aria-labelledby','zamnStatsTitle');
  const head=el('div',undefined,'admin-stats-head');const intro=el('div');intro.append(el('span','إدارة زامن','admin-stats-eyebrow'));const title=el('h2','إحصائيات الموقع');title.id='zamnStatsTitle';intro.append(title,el('p','بيانات خاصة بالإدارة • التوقيت: الرياض'));const refresh=el('button','تحديث الإحصائيات','admin-stats-refresh');refresh.type='button';refresh.onclick=()=>refreshStats();head.append(intro,refresh);
  const notice=el('p','','admin-stats-notice');notice.id='zamnStatsNotice';notice.setAttribute('role','status');
  const tabs=el('div',undefined,'admin-stats-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','أقسام إحصائيات الموقع');
  const body=el('div');body.id='zamnStatsBody';body.setAttribute('role','tabpanel');
  const buttons=[];for(const [key,label]of [['overview','الملخص'],['customers','العملاء ومشترياتهم'],['games','الألعاب']]){const b=el('button',label);b.type='button';b.id='zamn-stats-tab-'+key;b.setAttribute('role','tab');b.setAttribute('aria-controls','zamnStatsBody');b.onclick=()=>{selected=key;render();};buttons.push(b);tabs.append(b);}
  tabs.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const keys=['overview','customers','games'];let index=keys.indexOf(selected);index=e.key==='Home'?0:e.key==='End'?2:(index+(e.key==='ArrowLeft'?1:-1)+3)%3;selected=keys[index];render();buttons[index].focus();};
  panel.append(head,notice,tabs,body);target.prepend(panel);
  function setNotice(text,error=false){notice.textContent=text;notice.classList.toggle('is-error',error);}
  async function refreshStats(){
   if(!active||loading)return;loading=true;refresh.disabled=true;const rev=revision;setNotice('جاري قراءة الإحصائيات…');
   try{const response=await fetch('/api/support?action=stats',{credentials:'same-origin',cache:'no-store'});if(response.status===401){clear();return;}const result=await response.json();if(!response.ok||!result.stats)throw Error('تعذر تحميل الإحصائيات، حاول مجددًا.');if(!active||rev!==revision)return;data=result.stats;render();setNotice('آخر تحديث: '+when(data.generatedAt));}
   catch(e){if(active&&rev===revision)setNotice(e.message||'تعذر الاتصال بالخادم.',true);}
   finally{loading=false;refresh.disabled=false;}
  }
  function clear(){active=false;revision++;data=null;query='';panel.hidden=true;body.replaceChildren();setNotice('');}
  function metricCard(label,value,detail){const card=el('article',undefined,'admin-stat-card');card.append(el('span',label),el('strong',num(value)),el('small',detail));return card;}
  function table(headers,rows){const wrap=el('div',undefined,'admin-stats-table-wrap');wrap.tabIndex=0;wrap.setAttribute('aria-label','جدول الإحصائيات، يمكن تمريره أفقيًا');const t=el('table');const thd=el('thead'),tr=el('tr');headers.forEach(h=>{const th=el('th',h);th.scope='col';tr.append(th)});thd.append(tr);const tbody=el('tbody');for(const row of rows){const tr=el('tr');row.forEach(v=>{const td=el('td');if(v instanceof Node)td.append(v);else td.textContent=String(v);tr.append(td)});tbody.append(tr)}t.append(thd,tbody);wrap.append(t);return wrap;}
  function overview(){
   const grid=el('div',undefined,'admin-stats-kpis');for(const values of [['زيارات اليوم',data.views.today,'مشاهدات صفحات الموقع'],['آخر ٧ أيام',data.views.week,'بما فيها اليوم'],['زيارات هذا الشهر',data.views.month,'من بداية الشهر الميلادي'],['العملاء المسجّلون',data.customerCount,'بدون حساب الإدارة'],['الألعاب المملوكة',data.totalOwnerships,'مجموع ألعاب حسابات العملاء'],['تشغيل الألعاب اليوم',data.plays.today,'يشمل التجربة والتشغيل المملوك']])grid.append(metricCard(...values));body.append(grid);
   const chart=el('div',undefined,'admin-stats-chart');chart.append(el('h3','الزيارات والتشغيل خلال آخر ١٤ يومًا'),el('p','البنفسجي: مشاهدة صفحة • الذهبي: تشغيل لعبة','admin-stats-muted'));const bars=el('div',undefined,'admin-stats-bars');const max=Math.max(1,...data.days.map(d=>Math.max(d.views,d.plays)));for(const d of data.days){const col=el('div',undefined,'admin-stats-day');const pair=el('div',undefined,'admin-stats-bar-pair');pair.setAttribute('aria-label',d.day+': '+num(d.views)+' زيارة، '+num(d.plays)+' تشغيل');pair.title=d.day+' — '+num(d.views)+' زيارة / '+num(d.plays)+' تشغيل';for(const [key,cls]of [['views','views'],['plays','plays']]){const bar=el('div',undefined,'admin-stats-bar '+cls);bar.style.height=(d[key]/max*100)+'%';pair.append(bar)}col.append(pair,el('span',d.day.slice(5)));bars.append(col)}chart.append(bars);body.append(chart);
   const note=el('div',undefined,'admin-stats-explainer');note.append(el('h3','كيف تُحسب الأرقام؟'),el('p','الزيارة = فتح صفحة أو الانتقال إلى صفحة لعبة. التشغيل = فتح واجهة اللعبة، ويشمل التجربة المجانية. الأرقام ليست عدد مبيعات ولا عدد أشخاص مؤكدين. تستثني السجلات المرتبطة برقم الإدارة.'),el('p','الزوار بحسب الجهاز المسجّل: اليوم '+num(data.uniqueVisitors.today)+'، آخر ٧ أيام '+num(data.uniqueVisitors.week)+'، هذا الشهر '+num(data.uniqueVisitors.month)+'.'),el('p',data.coverage.customerViewsFrom));body.append(note);
  }
  function customers(){
   const filter=el('div',undefined,'admin-stats-toolbar');const label=el('label','ابحث بالاسم أو رقم الجوال');label.htmlFor='zamnStatsSearch';const input=el('input');input.id='zamnStatsSearch';input.type='search';input.placeholder='اسم العميل أو رقمه';input.value=query;filter.append(label,input);const result=el('div');body.append(filter,result);
   function draw(){result.replaceChildren();const list=data.customers.filter(c=>(c.name+' '+c.phone).includes(query.trim().replace(/[٠-٩]/g,d=>'0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])));result.append(el('p',num(list.length)+' حساب','admin-stats-muted'));if(!list.length){result.append(el('p','لا توجد حسابات مطابقة.'));return;}
    const rows=list.map(c=>{const phone=el('span','+'+c.phone,'admin-stats-phone');phone.dir='ltr';const name=el('div',c.name);if(c.isAdmin)name.append(el('small','حساب الإدارة','admin-stats-muted'));const detail=el('details');const summary=el('summary','عرض التفاصيل ('+num(c.ownedCount)+')');detail.append(summary);const owned=el('ul');c.ownedGames.forEach(g=>owned.append(el('li',g.name)));if(!c.ownedGames.length)owned.append(el('li','لا توجد ألعاب محفوظة'));detail.append(el('strong','الألعاب المملوكة'),owned);const activity=Object.values(c.gameActivity);if(activity.length){detail.append(el('strong','سجل التشغيل'));const ul=el('ul');activity.forEach(g=>ul.append(el('li',g.name+' — '+num(g.count)+' مرة — '+when(g.lastAt))));detail.append(ul);}return [name,phone,num(c.ownedCount),num(c.views.today),num(c.views.week),num(c.views.month),num(c.views.total),num(c.plays.total),when(c.lastVisit),detail]});result.append(table(['العميل','رقم الجوال','يملك','زيارات اليوم','آخر ٧ أيام','هذا الشهر','إجمالي الزيارات','مرات التشغيل','آخر زيارة / دخول','تفاصيل الألعاب'],rows));}
   input.oninput=()=>{query=input.value;draw()};draw();body.append(el('p',data.coverage.customerViewsFrom,'admin-stats-muted'));
  }
  function games(){
   const toolbar=el('div',undefined,'admin-stats-toolbar');const label=el('label','نوع الإحصائية');label.htmlFor='zamnStatsMetric';const select=el('select');select.id='zamnStatsMetric';for(const [value,text]of [['views','زيارة صفحة اللعبة'],['plays','تشغيل اللعبة']]){const option=el('option',text);option.value=value;option.selected=value===gameMetric;select.append(option)}select.onchange=()=>{gameMetric=select.value;render()};toolbar.append(label,select);body.append(toolbar);
   const rows=data.games.map(g=>{const metric=g[gameMetric];return [g.name,num(metric.today),num(metric.week),num(metric.month),num(metric.total),when(metric.lastAt),num(g.owners)]});body.append(table(['اللعبة','اليوم','آخر ٧ أيام','هذا الشهر','المجموع المسجّل','آخر زيارة / تشغيل','مالكو اللعبة'],rows));
   body.append(el('p','الإجماليات والفترات في الجدول من السجل التفصيلي المتاح. عدّادات التشغيل القديمة محفوظة للمراجعة: '+data.games.map(g=>g.name+' '+num(g.recordedPlayCount)).join(' • '),'admin-stats-muted'));
  }
  function render(){if(!data||!active)return;body.replaceChildren();for(let i=0;i<buttons.length;i++){const chosen=['overview','customers','games'][i]===selected;buttons[i].setAttribute('aria-selected',String(chosen));buttons[i].tabIndex=chosen?0:-1;}body.setAttribute('aria-labelledby','zamn-stats-tab-'+selected);if(data.coverage.limited)body.append(el('p','تنبيه: تجاوز السجل حد القراءة؛ الفترات والمجاميع التفصيلية قد تكون غير مكتملة.','admin-stats-warning'));if(selected==='overview')overview();else if(selected==='customers')customers();else games();}
  window.addEventListener('zamn-admin-games-changed',()=>{if(active)refreshStats();});
  document.addEventListener('visibilitychange',()=>{if(active&&!document.hidden)refreshStats();});
  window.addEventListener('zamn-admin-session',event=>{if(!event.detail?.active){clear();return;}active=true;panel.hidden=false;refreshStats();});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
