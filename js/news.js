(()=>{
 const root=document.getElementById('zamnNews');if(!root)return;
 const icons={family:'<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21v-3a6 6 0 0 1 12 0v3m2-7a5 5 0 0 1 6 5v2"/>',million:'<path d="M8 3h8v5a4 4 0 0 1-8 0V3Zm0 2H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 12v7m-5 2h10m-8-2h6"/>'};
 const text=(tag,cls,value)=>{const el=document.createElement(tag);el.className=cls;el.textContent=value||'';return el};
 function render(data){
  if(!Array.isArray(data.items)||!data.items.length)return;
  const cards=document.createDocumentFragment();
  data.items.forEach((item,i)=>{
   const theme=['horof','family','million'].includes(item.theme)?item.theme:'family';const article=document.createElement('article');article.className='zamn-news-card zamn-news-card--'+theme;
   const meta=text('div','zamn-news-meta','');meta.append(text('span','zamn-news-label',item.label),text('span','zamn-news-index',String(i+1).padStart(2,'0')));
   const visual=text('div','zamn-news-visual','');visual.setAttribute('aria-hidden','true');
   if(icons[theme]){const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('viewBox','0 0 24 24');icon.setAttribute('fill','none');icon.setAttribute('stroke','currentColor');icon.setAttribute('stroke-width','1.5');icon.classList.add('zamn-news-icon');icon.innerHTML=icons[theme];visual.append(icon)}
   const stat=text('div','zamn-news-stat',item.stat);stat.append(text('span','zamn-news-stat-label',item.statLabel));visual.append(stat);
   article.append(meta,visual,text('h3','',item.title),text('p','',item.text));cards.append(article);
  });
  document.querySelector('.zamn-news-grid').replaceChildren(cards);
  if(data.heading)document.querySelector('#zamnNewsTitle').textContent=data.heading;
  if(data.intro)document.querySelector('.zamn-news-intro').textContent=data.intro;
 }
 fetch('/data/news.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(render).catch(()=>{/* Keep the server-rendered news visible when loading fails. */});
})();
