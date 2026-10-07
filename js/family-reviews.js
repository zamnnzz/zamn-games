window.setupFamilyReviews = function(grid, reviews) {
  const section=grid.closest('.reviews-panel');
  if(!section || !reviews.length) return;
  section.classList.add('family-reviews-slider');
  grid.setAttribute('aria-label','تقييمات اللاعبين');
  [...grid.children].forEach((card,i)=>{
    const review=reviews[i];
    const head=card.querySelector('.review-head');
    const name=head.querySelector('strong');
    const stars=head.querySelector('span');
    const count=[...review.stars].length;
    stars.textContent='★'.repeat(count)+'☆'.repeat(5-count);
    stars.setAttribute('aria-label',`${count} من 5`);
    const avatar=document.createElement('span');avatar.className='family-review-avatar';avatar.textContent=review.name.trim().slice(0,1);avatar.setAttribute('aria-hidden','true');
    const info=document.createElement('div');info.className='family-review-user';
    const verified=document.createElement('span');verified.className='family-review-verified';verified.textContent=review.verified?'✓ مشتري موثّق':'';verified.hidden=!review.verified;
    const date=document.createElement('span');date.className='family-review-date';date.textContent=review.date||'';
    info.append(name,verified,date);head.replaceChildren(avatar,info);head.after(stars);
  });
  if(reviews.length===1)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const duplicate=document.createElement('div');duplicate.className='family-review-track';
  const originals=[...grid.children]; originals.forEach(card=>duplicate.append(card));
  originals.forEach(card=>{const clone=card.cloneNode(true);clone.setAttribute('aria-hidden','true');duplicate.append(clone);});
  grid.append(duplicate);
  let frame=0,previous=0,offset=0,visible=false;
  const stop=()=>{if(frame)cancelAnimationFrame(frame);frame=0;previous=0;};
  const tick=time=>{
    if(!visible||document.hidden||reduced.matches){stop();return;}
    if(previous)offset+=(Math.min(time-previous,64)/1000)*18;
    previous=time;
    const gap=16,loop=(duplicate.scrollWidth+gap)/2;
    if(loop>0)offset%=loop;
    duplicate.style.transform=`translate3d(${offset}px,0,0)`;
    frame=requestAnimationFrame(tick);
  };
  const update=()=>{if(visible&&!document.hidden&&!reduced.matches){if(!frame)frame=requestAnimationFrame(tick);}else stop();};
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{threshold:.05});observer.observe(grid);
  document.addEventListener('visibilitychange',update);reduced.addEventListener('change',update);
  grid.reviewCleanup=()=>{stop();observer.disconnect();document.removeEventListener('visibilitychange',update);reduced.removeEventListener('change',update);section.classList.remove('family-reviews-slider');delete grid.reviewCleanup;};
};
