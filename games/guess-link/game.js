const isHost = document.body.dataset.role === 'host';
const params = new URLSearchParams(location.search);
session = params.get('session') || (!isHost && localStorage.getItem('cardSession')) || ('R' + Math.random().toString(36).slice(2,9).toUpperCase());
if (!isHost) {
  localStorage.setItem('cardSession', session);
  const url = new URL(location.href); url.searchParams.set('session', session);
  history.replaceState(null, '', url);
}
const gameRef = db.ref('games/' + session);
const categories = ['الفصل الأول','الفصل الثاني','الفصل الثالث','الفصل الرابع'];
const values = [100,200,300,400,500];
const cards = Array.from(document.querySelectorAll('.card'));
const images = Array.from(document.querySelectorAll('.card > img:not(.cover-logo)'));
const gameBox = document.querySelector('.game-box');
const startScreen = document.getElementById('startScreen');
const waitingScreen = document.getElementById('waitingScreen');
const resumeScreen = document.getElementById('resumeScreen');
const hostReadyScreen = document.getElementById('hostReadyScreen');
const hostStartBtn = document.getElementById('hostStartBtn');
const boardScreen = document.getElementById('boardScreen');
const startBtn = document.getElementById('startBtn');
const openBtn = document.getElementById('openBtn');
const note = document.getElementById('connectionNote');
let state = null;
let stateLoaded = false;
let resumePending = false;
let formMessage = "";
let selectedTeam = 0;
let editing = false;
let draftTheme = 'theme-classic';
let serverOffset = 0;
let buzzTimeout = null;
let buzzClaiming = false;
let awardPending = false;

function applyTheme(theme) {
  document.body.className = (theme || 'theme-classic') + (isHost ? ' host-mode' : ' display-mode');
  document.querySelectorAll('.theme-color').forEach(b=>b.classList.toggle('active',b.dataset.theme===theme));
}
applyTheme(draftTheme);
function connectionLinks() {
  const host = new URL('host.html?session=' + encodeURIComponent(session),location.href).href;
  const player = new URL('buzzer.html?session=' + encodeURIComponent(session),location.href).href;
  for (const [canvasId,linkId,url] of [['hostQR','hostLink',host],['playerQR','playerLink',player]]) {
    const button = document.getElementById(linkId);
    button.dataset.url=url;
    const label=button.textContent;
    button.onclick=async()=>{
      try {
        await navigator.clipboard.writeText(url);
        button.textContent='تم النسخ ✓';
        setTimeout(()=>button.textContent=label,1500);
      } catch (_) {
        const input=document.createElement('textarea');input.value=url;
        input.style.position='fixed';input.style.opacity='0';document.body.appendChild(input);
        input.select();const copied=document.execCommand('copy');input.remove();
        button.textContent=copied?'تم النسخ ✓':'تعذر النسخ';
        setTimeout(()=>button.textContent=label,1500);
      }
    };
    if(window.QRCode) QRCode.toCanvas(document.getElementById(canvasId),url,{width:120,margin:2}).catch(()=>{});
  }
}
connectionLinks();
function names() { return state?.settings?.teamNames || {c1:'فريق 1',c2:'فريق 2'}; }
function scores() { return state?.scores || {c1:0,c2:0}; }
function fillSettings() {
  const n=names();
  document.getElementById('team1Input').value=n.c1;
  document.getElementById('team2Input').value=n.c2;
  document.getElementById('timerInput').value=state?.settings?.questionTime || 100;
  draftTheme=state?.settings?.theme || draftTheme;
  applyTheme(draftTheme);
}
function updateTimer() {
  let remaining=state?.settings?.questionTime || 100;
  if(state?.phase==='question' || state?.phase==='answer') {
    const end=state.round?.endsAt;
    remaining=end ? Math.max(0,Math.ceil((end-Date.now()-serverOffset)/1000)) : remaining;
  }
  const timer=document.getElementById('timerBox'); timer.textContent=remaining;
  timer.style.setProperty('--fill',Math.min(100,remaining/(state?.settings?.questionTime||100)*100)+'%');
}
setInterval(updateTimer,250);
db.ref('.info/serverTimeOffset').on('value',snap=>{serverOffset=snap.val()||0;});

function buildBoard() {
  const grid=document.getElementById('boardGrid'); grid.replaceChildren();
  categories.forEach((category,c)=>{
    const col=document.createElement('div');
    const title=document.createElement('div');title.className='category-title';title.textContent=category;col.appendChild(title);
    values.forEach((value,v)=>{
      const index=c*5+v;
      const button=document.createElement('button');button.className='point-btn';button.textContent=value;
      button.dataset.question=index;
      const used=!!state?.usedQuestions?.[index];button.classList.toggle('used',used);
      button.disabled=!isHost||used||!groups[index];
      button.onclick=()=>chooseQuestion(index);
      col.appendChild(button);
    });grid.appendChild(col);
  });
  const n=names(),s=scores();
  document.getElementById('boardTeam1').textContent=n.c1+': '+(s.c1||0);
  document.getElementById('boardTeam2').textContent=n.c2+': '+(s.c2||0);
}
function render() {
  const phase=state?.phase;
  applyTheme(editing?draftTheme:(state?.settings?.theme||draftTheme));
  const showSetup=(!phase&&!isHost) || editing;
  hostReadyScreen.style.display=isHost&&!editing&&(!phase||phase==='waiting')?'flex':'none';
  hostStartBtn.disabled=!stateLoaded || phase!=='waiting' || !!validateNames(state?.settings?.teamNames);
  startScreen.style.display=showSetup?'flex':'none';
  waitingScreen.style.display=!isHost&&phase==='waiting'?'flex':'none';
  boardScreen.style.display=!editing&&phase==='board'?'flex':'none';
  gameBox.style.display=!editing&&(phase==='question'||phase==='answer')?'block':'none';
  resumeScreen.style.display=resumePending?'flex':'none';
  if(resumePending) {
    startScreen.style.display='none';waitingScreen.style.display='none';
    boardScreen.style.display='none';gameBox.style.display='none';
    const teamNames=names();
    document.getElementById('resumeTeams').textContent=teamNames.c1+' ضد '+teamNames.c2;
  }
  startBtn.disabled=!stateLoaded || resumePending || (isHost&&!phase);
  startBtn.textContent=editing?'حفظ':(isHost?'ابدأ اللعبة':'ابدأ اللعبة');
  note.textContent=formMessage;
  const n=names(),s=scores();
  document.getElementById('team1').textContent=n.c1+' : '+(s.c1||0);
  document.getElementById('team2').textContent=n.c2+' : '+(s.c2||0);
  buildBoard();
  if(phase==='question'||phase==='answer') {
    const round=state.round;
    images.forEach((img,i)=>{const url=groups[round.index][i];if(img.getAttribute('src')!==url)img.src=url;});
    cards.forEach((card,i)=>card.classList.toggle('opened',isHost || i<round.opened));
    document.getElementById('presenterAnswer').textContent=answers[round.index]||'الجواب';
    const answered=phase==='answer';
    document.getElementById('team1').style.display=answered?'none':'block';
    document.getElementById('team2').style.display=answered?'none':'block';
    const q=document.getElementById('questionNumber');
    q.textContent=answered?(answers[round.index]||'الجواب'):('السؤال '+(round.index+1));
    q.style.margin=answered?'0 auto':'';q.style.display='block';q.style.width=answered?'fit-content':'';
    openBtn.style.display=answered?'none':'block';
    openBtn.textContent=round.opened===4?'إظهار الجواب':(round.opened===0?'افتح الصورة الأولى':'افتح الصورة '+(round.opened+1));
    document.getElementById('winnerArea').style.display=answered?'block':'none';
    document.querySelector('.winner-title').style.display=selectedTeam?'none':'block';
    document.querySelector('.winner-buttons').style.display=selectedTeam?'none':'grid';
    document.getElementById('answerChoices').style.display=selectedTeam?'block':'none';
    const winners=document.querySelectorAll('.winner-buttons button');
    winners[0].textContent=n.c1+' جاوب';winners[1].textContent=n.c2+' جاوب';
    const buzzer=document.getElementById('buzzerBox');
    buzzer.style.display=state.firstBuzzer?'block':'none';
    buzzer.textContent=state.firstBuzzer?'أول ضغطة: '+state.firstBuzzer.name:'';
  } else selectedTeam=0;
  updateTimer();
}
function failure(error) { note.textContent='تعذر الاتصال، حاول مرة أخرى';console.error(error); }
function change(update) {
  if(!isHost)return Promise.resolve();
  return gameRef.transaction(data=>data?update(data):undefined,undefined,false).catch(failure);
}
function chooseQuestion(index) {
  if(!isHost || state?.phase!=='board' || state.usedQuestions?.[index] || !groups[index])return;
  selectedTeam=0;
  change(data=>{
    if(data.phase!=='board'||data.usedQuestions?.[index])return;
    data.phase='question';data.buzzers=null;data.firstBuzzer=null;data.status={locked:false};
    data.round={id:'q'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),index,opened:0,endsAt:Date.now()+serverOffset+(data.settings.questionTime||100)*1000};
    return data;
  });
}
openBtn.onclick=()=>{
  if(!isHost||state?.phase!=='question')return;
  const id=state.round.id,opened=state.round.opened;
  change(data=>{
    if(data.phase!=='question'||data.round.id!==id||data.round.opened!==opened)return;
    if(opened<4)data.round.opened++;else {data.phase='answer';data.status={locked:true};}
    return data;
  });
};
function showAnswerChoices(team) {
  if(!isHost||state?.phase!=='answer')return;
  selectedTeam=team;render();
}
async function givePoint(team,discount) {
  if(!isHost||state?.phase!=='answer'||awardPending||![0,1,2].includes(team)||![0,25,50,75].includes(discount))return;
  awardPending=true;
  const id=state.round.id;
  const value=values[state.round.index%5];
  await change(data=>{
    if(data.phase!=='answer'||data.round.id!==id||data.usedQuestions?.[data.round.index])return;
    const points=Math.max(0,value-discount);
    if(team)data.scores['c'+team]=(Number(data.scores['c'+team])||0)+points;
    data.usedQuestions=data.usedQuestions||{};data.usedQuestions[data.round.index]=true;
    data.completedRounds=data.completedRounds||{};
    data.completedRounds[id]={index:data.round.index,team,discount,points:team?points:0};
    data.phase='board';data.round=null;data.firstBuzzer=null;data.buzzers=null;data.status={locked:true};
    return data;
  });
  selectedTeam=0;awardPending=false;render();
}
function cleanName(value) { return String(value||'').normalize('NFKC').trim().replace(/\s+/g,' '); }
function validateNames(teamNames) {
  const a=cleanName(teamNames?.c1),b=cleanName(teamNames?.c2);
  if(!a||!b)return 'اكتب اسم الفريقين قبل البداية';
  if(a.toLocaleLowerCase('ar')===b.toLocaleLowerCase('ar'))return 'اسم الفريقين لازم يكون مختلف';
  return '';
}
for(const id of ['team1Input','team2Input'])document.getElementById(id).addEventListener('input',()=>{
  if(formMessage){formMessage='';note.textContent='';}
});
startBtn.onclick=async()=>{
  const settings={teamNames:{c1:cleanName(document.getElementById('team1Input').value),c2:cleanName(document.getElementById('team2Input').value)},questionTime:Math.max(1,Number(document.getElementById('timerInput').value)||100),theme:draftTheme};
  formMessage=validateNames(settings.teamNames);
  if(formMessage){render();return;}
  startBtn.disabled=true;
  try {
    if(!state?.phase&&!isHost) {
      await gameRef.transaction(data=>data?.phase ? undefined : {kind:'picture-link',phase:'waiting',settings,scores:{c1:0,c2:0},status:{locked:true}},undefined,false);
    } else if(isHost&&editing) {
      await change(data=>{data.settings=settings;return data;});
    }
    editing=false;render();
  } catch(error){failure(error);startBtn.disabled=false;}
};
hostStartBtn.onclick=async()=>{
  if(!isHost||state?.phase!=='waiting'||validateNames(state.settings?.teamNames))return;
  hostStartBtn.disabled=true;
  await change(data=>{
    if(data.phase!=='waiting'||validateNames(data.settings?.teamNames))return;
    data.phase='board';return data;
  });
  render();
};
document.getElementById('settingsBtn').onclick=()=>{if(!isHost)return;editing=true;fillSettings();render();};
document.querySelectorAll('.theme-color').forEach(button=>{
  button.onclick=()=>{draftTheme=button.dataset.theme;applyTheme(draftTheme);};
});
function openRules(){document.getElementById('rulesOverlay').style.display='flex';}
function closeRules(){document.getElementById('rulesOverlay').style.display='none';}

document.getElementById('resumeSessionBtn').onclick=()=>{resumePending=false;render();};
document.getElementById('newSessionBtn').onclick=()=>{
  const url=new URL(location.href);
  url.searchParams.set('session','R'+Math.random().toString(36).slice(2,9).toUpperCase());
  location.assign(url.href);
};

gameRef.on('value',snap=>{
  if(!stateLoaded)resumePending=!isHost && !!snap.val()?.phase;
  stateLoaded=true;
  const previous=state;state=snap.val();
  if(previous?.round?.id!==state?.round?.id)selectedTeam=0;
  if(isHost&&state?.phase==='waiting'&&previous?.phase!=='waiting')fillSettings();
  if(!editing)draftTheme=state?.settings?.theme||draftTheme;
  render();
  if(isHost)claimBuzzer();
},failure);
async function claimBuzzer() {
  if(buzzClaiming||state?.phase!=='question'||state.firstBuzzer||!state.buzzers)return;
  buzzClaiming=true;
  const id=state.round.id;
  await change(data=>{
    if(data.phase!=='question'||data.round.id!==id||data.firstBuzzer||!data.buzzers)return;
    const list=Object.values(data.buzzers).sort((a,b)=>a.time-b.time);
    data.firstBuzzer=list[0];data.status={locked:true};data.buzzResetAt=Date.now()+serverOffset+3000;
    return data;
  });
  buzzClaiming=false;
  scheduleBuzzerReset();
}
function scheduleBuzzerReset() {
  clearTimeout(buzzTimeout);
  if(!isHost||!state?.firstBuzzer||state.phase!=='question')return;
  const id=state.round.id,pressedAt=state.firstBuzzer.time;
  buzzTimeout=setTimeout(()=>change(data=>{
    if(data.phase!=='question'||data.round.id!==id||data.firstBuzzer?.time!==pressedAt)return;
    data.firstBuzzer=null;data.buzzers=null;data.buzzResetAt=null;data.status={locked:false};return data;
  }),Math.max(0,(state.buzzResetAt||Date.now()+serverOffset)-Date.now()-serverOffset));
}
gameRef.on('value',()=>scheduleBuzzerReset());
render();
