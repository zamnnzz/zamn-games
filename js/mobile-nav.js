(()=>{
 function init(){
  const nav=document.getElementById('homeBottomNav');if(!nav)return;
  const links=[...nav.querySelectorAll('a')],ids=['homeHero','games-list','packages'];
  let scheduled=false;
  function update(){scheduled=false;if(document.body.classList.contains('game-mode'))return;let current='homeHero';for(const id of ids.slice(1)){const target=document.getElementById(id);if(target&&target.getBoundingClientRect().top<=150)current=id;}for(const link of links){if(link.getAttribute('href')==='#'+current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}}
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
  for(const link of links)link.addEventListener('click',event=>{const id=link.getAttribute('href').slice(1),target=document.getElementById(id);if(!target)return;event.preventDefault();if(id==='homeHero')window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});else target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});});
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});window.addEventListener('zamn-page-view',schedule);update();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
