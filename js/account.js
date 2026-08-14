
(() => {

  // Stable mobile/PWA viewport:
  // - keyboard resize must NOT shrink the game player and reveal the site behind it
  // - orientation/fullscreen changes DO refresh the stable screen size after settling
  let zamnViewportTimers=[];
  let zamnStableH=0;
  let zamnStableW=0;
  let zamnOrientationKey="";

  function currentViewport(){
    const vv=window.visualViewport;
    return {
      w:Math.round((vv && vv.width) || window.innerWidth || document.documentElement.clientWidth || 0),
      h:Math.round((vv && vv.height) || window.innerHeight || document.documentElement.clientHeight || 0)
    };
  }

  function orientationKey(){
    const v=currentViewport();
    return v.w>=v.h ? "landscape" : "portrait";
  }

  function applyStableViewport(force){
    const v=currentViewport();
    const key=orientationKey();

    if(force || !zamnStableH || key!==zamnOrientationKey){
      zamnOrientationKey=key;
      zamnStableW=v.w;
      zamnStableH=v.h;
    }else{
      // Width changes normally mean a real rotation/layout change.
      // A large height-only drop is usually the on-screen keyboard: ignore it.
      const widthChanged=Math.abs(v.w-zamnStableW)>40;
      const heightGrew=v.h>zamnStableH;
      if(widthChanged || heightGrew){
        zamnStableW=v.w;
        zamnStableH=v.h;
      }
    }

    if(zamnStableH>0){
      document.documentElement.style.setProperty("--zamn-viewport-height",zamnStableH+"px");
    }
  }

  function settleZamnViewport(force){
    zamnViewportTimers.forEach(clearTimeout);
    zamnViewportTimers=[];
    [0,70,180,360,700].forEach(ms=>{
      zamnViewportTimers.push(setTimeout(()=>applyStableViewport(!!force),ms));
    });
  }

  applyStableViewport(true);

  // Ordinary resize includes keyboard opening, so do not force a smaller height.
  window.addEventListener("resize",()=>settleZamnViewport(false),{passive:true});

  // Real orientation/fullscreen changes need a new stable baseline.
  window.addEventListener("orientationchange",()=>settleZamnViewport(true),{passive:true});
  document.addEventListener("fullscreenchange",()=>settleZamnViewport(true));

  if(window.visualViewport){
    window.visualViewport.addEventListener("resize",()=>settleZamnViewport(false),{passive:true});
    window.visualViewport.addEventListener("scroll",()=>applyStableViewport(false),{passive:true});
  }

  const GAMES = window.ZAMN_GAMES || [];
  const CFG = window.ZAMN_FIREBASE_CONFIG || {};
  const countries = [
    {name:"السعودية",flag:"🇸🇦",code:"966",length:9},{name:"الإمارات",flag:"🇦🇪",code:"971",length:9},
    {name:"البحرين",flag:"🇧🇭",code:"973",length:8},{name:"الكويت",flag:"🇰🇼",code:"965",length:8},
    {name:"عمان",flag:"🇴🇲",code:"968",length:8},{name:"قطر",flag:"🇶🇦",code:"974",length:8},
    {name:"اليمن",flag:"🇾🇪",code:"967",length:9},{name:"الأردن",flag:"🇯🇴",code:"962",length:9},
    {name:"لبنان",flag:"🇱🇧",code:"961",length:8},{name:"سوريا",flag:"🇸🇾",code:"963",length:9},
    {name:"العراق",flag:"🇮🇶",code:"964",length:10},{name:"فلسطين",flag:"🇵🇸",code:"970",length:9},
    {name:"مصر",flag:"🇪🇬",code:"20",length:10},{name:"ليبيا",flag:"🇱🇾",code:"218",length:9},
    {name:"تونس",flag:"🇹🇳",code:"216",length:8},{name:"الجزائر",flag:"🇩🇿",code:"213",length:9},
    {name:"المغرب",flag:"🇲🇦",code:"212",length:9},{name:"موريتانيا",flag:"🇲🇷",code:"222",length:8},
    {name:"السودان",flag:"🇸🇩",code:"249",length:9},{name:"الصومال",flag:"🇸🇴",code:"252",length:8},
    {name:"جيبوتي",flag:"🇩🇯",code:"253",length:8},{name:"جزر القمر",flag:"🇰🇲",code:"269",length:7}
  ];

  let db=null, firebasePromise=null, phone="", playerName="", pendingPhone="", ownedCodes=[], pendingGame=null, trialTimer=null, playerTopTimer=null;
  const $ = id => document.getElementById(id);

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const old=[...document.scripts].find(s=>s.src===src);
      if(old){ if(window.firebase) resolve(); else old.addEventListener("load",resolve,{once:true}); return; }
      const s=document.createElement("script"); s.src=src; s.onload=resolve; s.onerror=reject; document.head.appendChild(s);
    });
  }
  async function ensureFirebase(){
    if(db) return db;
    if(firebasePromise) return firebasePromise;
    firebasePromise=(async()=>{
      await loadScript("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
      await loadScript("https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js");
      if(!firebase.apps.length) firebase.initializeApp(CFG);
      db=firebase.database();
      return db;
    })();
    return firebasePromise;
  }

  function modal(id,show=true){ const el=$(id); if(el) el.hidden=!show; }
  function message(text,type="info"){
    const el=$("siteMessage"); if(!el)return;
    el.textContent=text; el.className="z-message "+(type==="error"?"error":"ok"); el.hidden=false;
    clearTimeout(message._t); message._t=setTimeout(()=>el.hidden=true,3500);
  }
  function normalizeDigits(v){
    return String(v||"")
      .replace(/[٠-٩]/g,d=>"0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)])
      .replace(/[۰-۹]/g,d=>"0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)])
      .replace(/[^0-9]/g,"");
  }

  function normalizeCode(v){ return normalizeDigits(v); }
  async function loadOwnedGames(p){
    await ensureFirebase();
    const snap=await db.ref("customers/"+p+"/games").get();
    ownedCodes=Object.keys(snap.val()||{});
    renderLibrary();
    return ownedCodes;
  }
  function isOwned(game){ return ownedCodes.includes(String(game.code)); }

  async function updatePresence(game=null,entryType=null){
    try{
      await ensureFirebase();
      let visitorId=localStorage.getItem("zamnVisitorId");
      if(!visitorId){ visitorId="v_"+Date.now()+"_"+Math.random().toString(36).slice(2); localStorage.setItem("zamnVisitorId",visitorId); }
      const ref=db.ref("analytics/online/"+visitorId);
      await ref.onDisconnect().remove();
      await ref.set({
        visitorId, phone:phone||null, playerName:playerName||null,
        currentGameId:game?.id||null,currentGameName:game?.name||null,
        entryType:entryType||null,lastActivity:firebase.database.ServerValue.TIMESTAMP
      });
    }catch(e){ console.warn("presence",e); }
  }
  async function registerGameEntry(game,entryType){
    try{
      await ensureFirebase();
      const log=db.ref("analytics/gameEntryLogs").push();
      const u={};
      u[`analytics/gameEntries/${game.id}/name`]=game.name;
      u[`analytics/gameEntries/${game.id}/count`]=firebase.database.ServerValue.increment(1);
      u[`analytics/gameEntries/${game.id}/lastEntryAt`]=firebase.database.ServerValue.TIMESTAMP;
      u[`analytics/gameEntryLogs/${log.key}`]={
        gameId:game.id,gameName:game.name,phone:phone||null,playerName:playerName||null,
        entryType,enteredAt:firebase.database.ServerValue.TIMESTAMP
      };
      await db.ref().update(u);
      await updatePresence(game,entryType);
    }catch(e){ console.warn("analytics",e); }
  }

  function showLogin(){
    modal("accountModal",true);
    $("loginStage").hidden=!!phone;
    $("nameStage").hidden=true;
    $("accountStage").hidden=!phone;
    if($("logoutBtn")) $("logoutBtn").hidden=!phone;
    if(phone){
      $("accountName").textContent=playerName||"لاعب";
      $("accountPhone").textContent="+"+phone;
      renderLibrary();
    }
  }

  async function login(){
    const c=countries[+$("countrySelect").value||0];
    const local=normalizeDigits($("phoneInput").value);
    if(local.length!==c.length){ message(`رقم ${c.name} يجب أن يكون ${c.length} أرقام ❌`,"error"); return; }
    const full=c.code+local;
    try{
      await ensureFirebase();
      const snap=await db.ref("customers/"+full+"/name").get();
      if(snap.exists() && String(snap.val()).trim()){
        phone=full; playerName=String(snap.val()).trim();
        localStorage.setItem("playerPhone",phone);
        await db.ref("customers/"+phone+"/lastLogin").set(Date.now());
        await loadOwnedGames(phone); await updatePresence();
        showLogin(); message("تم تسجيل الدخول ✅");
      }else{
        pendingPhone=full;
        $("loginStage").hidden=true; $("nameStage").hidden=false; $("accountStage").hidden=true;
      }
    }catch(e){ message(e.message||"تعذر تسجيل الدخول","error"); }
  }

  async function saveName(){
    const name=$("playerNameInput").value.trim();
    if(!name){ message("اكتب اسم اللاعب","error"); return; }
    if(!$("termsAgree").checked){ message("يجب الموافقة على التعهد أولاً","error"); return; }
    try{
      await ensureFirebase();
      await db.ref("customers/"+pendingPhone+"/name").set(name);
      await db.ref("customers/"+pendingPhone+"/agreeTerms").set(true);
      await db.ref("customers/"+pendingPhone+"/agreeTermsAt").set(Date.now());
      await db.ref("customers/"+pendingPhone+"/lastLogin").set(Date.now());
      phone=pendingPhone; playerName=name; pendingPhone="";
      localStorage.setItem("playerPhone",phone);
      await loadOwnedGames(phone); await updatePresence();
      showLogin(); message("تم إنشاء الحساب ✅");
    }catch(e){ message(e.message||"تعذر الحفظ","error"); }
  }

  async function restoreLogin(){
    const saved=localStorage.getItem("playerPhone");
    if(!saved)return;
    try{
      await ensureFirebase();
      const snap=await db.ref("customers/"+saved+"/name").get();
      if(snap.exists() && String(snap.val()).trim()){
        phone=saved; playerName=String(snap.val()).trim();
        await loadOwnedGames(phone); await updatePresence();
      }else localStorage.removeItem("playerPhone");
    }catch(e){ console.warn(e); }
  }

  async function logout(){
    try{ await updatePresence(); }catch{}
    localStorage.removeItem("playerPhone");
    phone="";playerName="";ownedCodes=[];
    modal("accountModal",false); renderLibrary(); message("تم تسجيل الخروج");
  }

  function renderLibrary(){
    const box=$("ownedGamesList");
    const inline=$("ownedGamesInline");
    const owned=GAMES.filter(isOwned);

    const renderInto=(target,oldStyle=false)=>{
      if(!target)return;
      target.innerHTML="";
      if(!owned.length){
        target.innerHTML='<div class="z-empty">لا توجد العاب محفوظة في حسابك حتى الآن.</div>';
        return;
      }
      owned.forEach(g=>{
        const a=document.createElement("a");
        a.href="/game/"+g.slug;
        if(oldStyle){
          a.className="player-library-game";
          a.innerHTML=`<div class="player-library-image-wrap"><img class="player-library-image" src="${g.image}" alt=""></div><div class="player-library-game-info"><h4>${g.name}</h4><p>لعبة محفوظة في حسابك</p></div><span class="player-library-open">فتح</span>`;
        }else{
          a.className="owned-game-card";
          a.innerHTML=`<img src="${g.image}" alt=""><div><strong>${g.name}</strong><span>فتح صفحة اللعبة ←</span></div>`;
        }
        target.appendChild(a);
      });
    };

    renderInto(box,false);
    renderInto(inline,true);
  }

  function currentGame(){ return window.ZAMN_CURRENT_GAME || null; }

  async function requestPlay(game){
    if(!game)return;
    if(!phone){
      pendingGame=game; showLogin(); message("سجل دخولك أولاً","error"); return;
    }
    if(!ownedCodes.length) await loadOwnedGames(phone);
    if(isOwned(game)){ openPlayer(game,"owned"); return; }
    pendingGame=game; $("codeGameName").textContent=game.name; $("gameCodeInput").value="";
    modal("codeModal",true);
  }

  async function verifyCode(){
    const game=pendingGame||currentGame(); if(!game)return;
    if(!phone){ modal("codeModal",false);showLogin();return; }
    const entered=normalizeCode($("gameCodeInput").value);
    const real=normalizeCode(game.code);
    if(entered!==real){ message("الرمز غير صحيح ❌","error"); return; }
    try{
      await ensureFirebase();
      await db.ref("customers/"+phone+"/games/"+String(game.code)).set(true);
      await loadOwnedGames(phone);
      modal("codeModal",false); message("تم حفظ اللعبة في حسابك ✅");
      openPlayer(game,"owned");
    }catch(e){ message(e.message||"تعذر حفظ الرمز","error"); }
  }

  function openPlayer(game,entryType){
    modal("codeModal",false);
    const overlay=$("gamePlayerOverlay"), iframe=$("gameIframe");
    $("playingGameName").textContent=game.name;
    $("trialCounter").textContent="";
    overlay.hidden=false; document.body.classList.add("player-open"); document.documentElement.classList.add("player-open"); settleZamnViewport(true);
    const playerTop = document.querySelector(".game-player-top");
    if(playerTop){
      playerTop.classList.remove("player-top-hidden");
      clearTimeout(playerTopTimer);
      playerTopTimer=setTimeout(()=>playerTop.classList.add("player-top-hidden"),5000);
    }
    iframe.src=game.playLink;
    registerGameEntry(game,entryType);
    if(Number(game.id)===9 && entryType==="owned"){
      iframe.onload=()=>{
        const origin="https://alatrash.oneapp.dev";
        const msg={type:"ZAMN_GAME_ACCESS",gameId:"deaf_party",role:"host"};
        [0,500,1500].forEach(ms=>setTimeout(()=>iframe.contentWindow?.postMessage(msg,origin),ms));
      };
    }else iframe.onload=null;
  }

  function closePlayer(){
    clearInterval(trialTimer); trialTimer=null;
    clearTimeout(playerTopTimer); playerTopTimer=null;
    const playerTop=document.querySelector(".game-player-top");
    if(playerTop) playerTop.classList.remove("player-top-hidden");
    $("gameIframe").src="about:blank"; $("gamePlayerOverlay").hidden=true;
    $("trialCounter").textContent=""; document.body.classList.remove("player-open"); document.documentElement.classList.remove("player-open"); settleZamnViewport(true);
    updatePresence();
  }

  function startTrial(game){
    if(!game)return;
    if(localStorage.getItem(game.trialKey)){ message("انتهت التجربة المجانية لهذه اللعبة 🛑","error"); return; }
    localStorage.setItem(game.trialKey,"used");
    openPlayer(game,"trial");
    let t=45; $("trialCounter").textContent=`تجربة: ${t}ث`;
    clearInterval(trialTimer);
    trialTimer=setInterval(()=>{
      t--; $("trialCounter").textContent=`تجربة: ${t}ث`;
      if(t<=0){ closePlayer(); message("انتهت التجربة المجانية ⏳","error"); }
    },1000);
  }

  function init(){
    const select=$("countrySelect");
    countries.forEach((c,i)=>{
      const o=document.createElement("option");o.value=i;o.textContent=`${c.flag} ${c.name} +${c.code}`;select.appendChild(o);
    });

    $("homeLogin")?.addEventListener("click",()=>{
      renderLibrary();
      showLogin();
    });
    $("phoneInput")?.addEventListener("input",(e)=>{
      const raw=e.target.value;
      // Keep Arabic/English numerals accepted; strip letters/symbols only.
      e.target.value=raw.replace(/[^0-9٠-٩۰-۹]/g,"");
    });
    $("gameCodeInput")?.addEventListener("input",(e)=>{
      e.target.value=e.target.value.replace(/[^0-9٠-٩۰-۹]/g,"");
    });
        $("loginBtn")?.addEventListener("click",login);
    $("saveNameBtn")?.addEventListener("click",saveName);
    $("logoutBtn")?.addEventListener("click",logout);
    $("openLibraryBtn")?.addEventListener("click",()=>{
      renderLibrary();
      const list=$("ownedGamesInline");
      if(list) list.scrollIntoView({behavior:"smooth",block:"start"});
    });

    $("ownedGamesInline")?.addEventListener("click",(e)=>{
      const link=e.target.closest("a[href^='/game/']");
      if(!link)return;
      e.preventDefault();
      modal("accountModal",false);
      history.pushState({},"",link.getAttribute("href"));
      const slug=link.getAttribute("href").replace(/^\/game\//,"").replace(/\/$/,"");
      const game=GAMES.find(g=>g.slug===slug);
      if(game && typeof window.openGame==="function"){
        window.openGame(game,false);
      }else{
        window.location.href=link.getAttribute("href");
      }
    });
    $("verifyCodeBtn")?.addEventListener("click",verifyCode);
    $("codeBuyBtn")?.addEventListener("click",()=>{ const g=pendingGame||currentGame(); if(g) window.open(g.buyLink,"_blank","noopener"); });
    $("closeGamePlayer")?.addEventListener("click",closePlayer);

    document.querySelectorAll("[data-close-modal]").forEach(b=>b.addEventListener("click",()=>modal(b.dataset.closeModal,false)));
    document.querySelectorAll(".z-modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.hidden=true;}));

    $("gamePlayBtn")?.addEventListener("click",e=>{e.preventDefault();requestPlay(currentGame());},true);
    $("gameTrialBtn")?.addEventListener("click",e=>{e.preventDefault();startTrial(currentGame());},true);

    restoreLogin();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
})();
