(()=>{
 const root=document.documentElement,installed=matchMedia('(display-mode:standalone)'),full=matchMedia('(display-mode:fullscreen)');let queued=false;
 function update(){queued=false;root.classList.toggle('zamn-installed',installed.matches||full.matches||navigator.standalone===true);const theme=document.querySelector('meta[name="theme-color"]');if(root.classList.contains('zamn-installed')&&theme){theme.content='#56249c';}const vv=window.visualViewport;const height=Math.round(vv?.height||innerHeight);if(height>0)root.style.setProperty('--zamn-ui-height',height+'px');const focused=document.activeElement;root.classList.toggle('zamn-keyboard-open',!!focused?.matches('input,textarea,select')&&!!vv&&vv.height<innerHeight-120);}
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update);}}
 window.addEventListener('resize',schedule,{passive:true});window.addEventListener('orientationchange',schedule,{passive:true});window.visualViewport?.addEventListener('resize',schedule,{passive:true});document.addEventListener('focusin',schedule);document.addEventListener('focusout',schedule);for(const media of [installed,full]){if(media.addEventListener)media.addEventListener('change',schedule);else media.addListener(schedule);}update();
})();

/* Keep account/code forms isolated while the mobile keyboard pans the viewport. */
(()=>{
 const root=document.documentElement,body=document.body;
 const dialogs=[...document.querySelectorAll('#accountModal,#codeModal')];
 if(!dialogs.length)return;
 let locked=false,savedY=0,savedX=0,savedStyle=[],frame=0;
 const properties=['position','top','left','width','height','min-height','overflow'];
 function update(){
  frame=0;
  const open=dialogs.some(dialog=>!dialog.hidden);
  if(open&&!locked){
   savedY=window.scrollY;savedX=window.scrollX;
   savedStyle=properties.map(name=>[name,body.style.getPropertyValue(name),body.style.getPropertyPriority(name)]);
   locked=true;root.classList.add('zamn-form-open');
   const values=['fixed',-savedY+'px','0','100%','100%','0','hidden'];
   properties.forEach((name,i)=>body.style.setProperty(name,values[i],'important'));
  }
  if(!open&&locked){
   const focused=document.activeElement;
   if(dialogs.some(dialog=>dialog.contains(focused)))focused.blur();
   locked=false;root.classList.remove('zamn-form-open');
   savedStyle.forEach(([name,value,priority])=>value?body.style.setProperty(name,value,priority):body.style.removeProperty(name));
   // Override the site's smooth scrolling for an exact return to the previous position.
   const behavior=root.style.getPropertyValue('scroll-behavior'),priority=root.style.getPropertyPriority('scroll-behavior');
   root.style.setProperty('scroll-behavior','auto','important');
   window.scrollTo(savedX,savedY);
   if(behavior)root.style.setProperty('scroll-behavior',behavior,priority);else root.style.removeProperty('scroll-behavior');
  }
  const viewport=window.visualViewport;
  root.style.setProperty('--zamn-form-top',(viewport?.offsetTop||0)+'px');
  root.style.setProperty('--zamn-form-height',(viewport?.height||window.innerHeight)+'px');
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(update);}
 const observer=new MutationObserver(update);
 dialogs.forEach(dialog=>observer.observe(dialog,{attributes:true,attributeFilter:['hidden']}));
 window.visualViewport?.addEventListener('resize',schedule,{passive:true});
 window.visualViewport?.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',schedule,{passive:true});
 document.addEventListener('focusin',schedule);
 document.addEventListener('focusout',schedule);
 update();
})();
