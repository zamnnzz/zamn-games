import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";
const app=initializeApp(firebaseConfig),db=getDatabase(app),$=id=>document.getElementById(id);

const cats=[
["سيارات","🚗"],
["السعودية","💚"],
["كرة قدم","⚽"],
["جغرافيا","🌍"],
["أديان وإسلاميات","☪️"],
["أفلام ومسلسلات","🎬"],
["أكل وطبخ","🍕"],
["تقنية","💻"],
["ألعاب فيديو","🎮"],
["مشاهير سعوديين","🌟"],
["ثقافة عامة","🧠"],
["حيوانات","🐾"]
];
let s={team1:"",team2:"",roundCount:4,picks:[],pickTurn:1,theme:"night"};
let sessionId=null,gameRef=null,lastReveal=null,lastWrong=null,lastHintEarned=null,lastHintUsed=null,reuseExistingSession=false;
const screens=["setupScreen","categoryScreen","pairScreen","gameScreen","finishScreen"];

let suspenseInterval=null;
let suspenseStageTimer=null;
let suspenseHideTimer=null;

function playSuspenseResult(result){
 const fx=$("suspenseFx");
 if(!fx)return;

 clearInterval(suspenseInterval);
 clearTimeout(suspenseStageTimer);
 clearTimeout(suspenseHideTimer);

 $("revealFx")?.classList.add("hidden");
 $("wrongFx")?.classList.add("hidden");

 fx.classList.remove("hidden","is-correct","is-wrong");
 $("suspenseStage").classList.remove("hidden");
 $("suspenseResult").classList.add("hidden");

 let current=0;
 const spin=()=>{
   let next=current;
   while(next===current) next=1+Math.floor(Math.random()*10);
   current=next;
   $("suspenseNumber").textContent=String(next);
 };
 spin();
 suspenseInterval=setInterval(spin,105);

 suspenseStageTimer=setTimeout(()=>{
   clearInterval(suspenseInterval);
   suspenseInterval=null;

   $("suspenseStage").classList.add("hidden");
   $("suspenseResult").classList.remove("hidden");

   if(result.type==="correct"){
     fx.classList.add("is-correct");
     $("suspenseResultIcon").textContent="✓";
     $("suspenseResultText").textContent=result.text;
     $("suspenseResultPoints").textContent=`+${result.points} نقاط`;
   }else{
     fx.classList.add("is-wrong");
     $("suspenseResultIcon").textContent="✕";
     $("suspenseResultText").textContent="إجابة خطأ!";
     $("suspenseResultPoints").textContent="";
   }

   suspenseHideTimer=setTimeout(()=>{
     fx.classList.add("hidden");
     fx.classList.remove("is-correct","is-wrong");
   },2000);
 },3000);
}

function applyTheme(theme){
  const t=theme||"night";
  document.body.dataset.theme=t;
  document.querySelectorAll("#themeChoices .theme-choice").forEach(b=>b.classList.toggle("active",b.dataset.theme===t));
}
applyTheme(s.theme);
document.querySelectorAll("#themeChoices .theme-choice").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("#themeChoices .theme-choice").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");s.theme=b.dataset.theme;applyTheme(s.theme);
});
function show(id){screens.forEach(x=>$(x).classList.remove("active"));$(id).classList.add("active")}
document.querySelectorAll("#roundBtns button").forEach(b=>b.onclick=()=>{document.querySelectorAll("#roundBtns button").forEach(x=>x.classList.remove("active"));b.classList.add("active");s.roundCount=+b.dataset.n});
$("toCategories").onclick=()=>{s.team1=$("team1").value.trim();s.team2=$("team2").value.trim();if(!s.team1||!s.team2)return alert("اكتب اسم الفريقين");s.picks=[];s.pickTurn=1;$("p1Title").textContent=s.team1;$("p2Title").textContent=s.team2;renderDraft();show("categoryScreen")};
function renderDraft(){
 const who=s.pickTurn===1?s.team1:s.team2;
 $("pickTitle").textContent=s.picks.length>=s.roundCount?"المواضيع جاهزة!":`الدور على ${who}`;
 $("pickHint").textContent=s.picks.length>=s.roundCount?"كل شيء جاهز، الآن اربط جهاز الهوست.":`اختر فئة للجولة ${s.picks.length+1} من ${s.roundCount}`;
 $("pickProgress").style.width=`${s.picks.length/s.roundCount*100}%`;
 const used=s.picks.map(p=>p.category);
 $("categories").innerHTML=cats.map(([n,i])=>`<button class="category ${used.includes(n)?"used":""}" data-cat="${n}"><i>${i}</i><b>${n}</b></button>`).join("");
 document.querySelectorAll(".category:not(.used)").forEach(b=>b.onclick=()=>{if(s.picks.length>=s.roundCount)return;s.picks.push({category:b.dataset.cat,owner:s.pickTurn});if(s.picks.length<s.roundCount)s.pickTurn=s.pickTurn===1?2:1;renderDraft()});
 $("p1Picks").innerHTML=chips(s.picks.filter(p=>p.owner===1));$("p2Picks").innerHTML=chips(s.picks.filter(p=>p.owner===2));
 $("finishSetup").classList.toggle("hidden",s.picks.length<s.roundCount);
}
function chips(a){return a.length?a.map(p=>`<span>${p.category}</span>`).join(""):"<span>—</span>"}
function makeCode(){return Math.random().toString(36).slice(2,8).toUpperCase()}
$("finishSetup").onclick=async()=>{
 if(reuseExistingSession&&gameRef&&sessionId){
   await update(gameRef,{
     ...s,
     status:"pairing",
     hostConnected:true,
     currentRoundIndex:0,
     score1:0,score2:0,
     hints1:0,hints2:0,
     streak1:0,streak2:0,
     wrong1:0,wrong2:0,
     locked1:false,locked2:false,
     roundClosed:false,
     activeHint:null,activeHints:[],
     winner:null,
     updatedAt:Date.now()
   });
   reuseExistingSession=false;
   $("pairStatus").textContent="✓ تم اختيار الفئات — الهوست متصل وجاهز";
   $("pairStatus").classList.add("connected");
   show("pairScreen");
   return;
 }

 sessionId=makeCode();
 gameRef=ref(db,`top10/sessions/${sessionId}`);
 await set(gameRef,{...s,status:"pairing",hostConnected:false,currentRoundIndex:0,score1:0,score2:0,hints1:0,hints2:0,streak1:0,streak2:0,wrong1:0,wrong2:0,locked1:false,locked2:false,activeHint:null,createdAt:Date.now()});
 const hostUrl=`${location.origin}/host/#session=${sessionId}`;
 $("sessionCode").textContent=sessionId;$("hostLink").textContent=hostUrl;
 $("qr").innerHTML="";
 new QRCode($("qr"),{text:hostUrl,width:260,height:260,colorDark:"#111111",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M});
 $("copyHostLink").onclick=async()=>{await navigator.clipboard.writeText(hostUrl);$("copyHostLink").textContent="✓ تم نسخ الرابط";setTimeout(()=>$("copyHostLink").textContent="📋 نسخ رابط الهوست",1500)};
 show("pairScreen");listen();
};
function listen(){
 onValue(gameRef,snap=>{
  const g=snap.val();if(!g)return;applyTheme(g.theme);
  if(g.hostConnected&&g.status==="pairing"){
   $("liveRedraftView").classList.add("hidden");
   $("pairStatus").textContent="✓ تم ربط الهوست — جاهز للبدء";
   $("pairStatus").classList.add("connected");
  }
  if(g.status==="redraft"){
   reuseExistingSession=true;
   s.team1=g.team1;s.team2=g.team2;s.roundCount=g.roundCount||4;s.theme=g.theme||s.theme;

   const picks=g.picks||[];
   const turn=g.pickTurn||1;
   const who=turn===1?g.team1:g.team2;
   const p1=picks.filter(p=>p.owner===1);
   const p2=picks.filter(p=>p.owner===2);
   const latest=picks[picks.length-1];

   $("pairStatus").textContent="الهوست يختار الفئات للجولة الجديدة…";
   $("pairStatus").classList.remove("connected");
   $("sessionCode").textContent=sessionId||"";

   $("liveRedraftView").classList.remove("hidden");
   $("liveRedraftTurn").textContent=`${who} يختار الآن`;
   $("liveRedraftProgress").textContent=`تم اختيار ${picks.length} من ${g.roundCount}`;
   $("liveRedraftTeam1Name").textContent=g.team1;
   $("liveRedraftTeam2Name").textContent=g.team2;
   $("liveRedraftTeam1Picks").innerHTML=p1.length?p1.map(p=>`<span>${p.category}</span>`).join(""):"<small>ما اختار شيء إلى الآن</small>";
   $("liveRedraftTeam2Picks").innerHTML=p2.length?p2.map(p=>`<span>${p.category}</span>`).join(""):"<small>ما اختار شيء إلى الآن</small>";

   if(latest){
     $("liveLatestPick").classList.remove("hidden");
     $("liveLatestPickText").textContent=`${latest.owner===1?g.team1:g.team2}: ${latest.category}`;
   }else{
     $("liveLatestPick").classList.add("hidden");
   }

   show("pairScreen");
  }
  if(g.status==="game"){show("gameScreen");renderGame(g)}
  if(g.status==="finished"){
   show("finishScreen");
   const draw=g.winner==="تعادل";
   $("winnerText").textContent=draw?"تعادل!":`${g.winner} يفوز!`;
   $("winnerSubtitle").textContent=draw?"مباراة قوية وانتهت بالتعادل":"مبروك للفريق الفائز!";
   $("winnerCrown").classList.toggle("hidden",draw);
   $("finalTeam1Name").textContent=g.team1;
   $("finalTeam2Name").textContent=g.team2;
   $("finalTeam1Score").textContent=g.score1||0;
   $("finalTeam2Score").textContent=g.score2||0;
   $("finalScore").textContent=`${g.team1} ${g.score1||0} — ${g.score2||0} ${g.team2}`;
   $("finalTeam1Card").classList.toggle("winner",!draw&&g.winner===g.team1);
   $("finalTeam2Card").classList.toggle("winner",!draw&&g.winner===g.team2);
   $("finishScreen").classList.toggle("is-draw",draw);
 }
 });
}
function renderGame(g){
 $("name1").textContent=g.team1;$("name2").textContent=g.team2;$("score1").textContent=g.score1||0;$("score2").textContent=g.score2||0;
 $("roundCountText").textContent=`الجولة ${g.currentRoundIndex+1} من ${g.roundCount}`;$("categoryName").textContent=g.currentCategory;
 $("ownerLabel").textContent=`اختيار ${g.currentOwner===1?g.team1:g.team2}`;$("questionText").textContent=g.currentQuestion;
 const activeHints=g.activeHints||[];
 if(activeHints.length){
   $("activeHintsList").innerHTML=activeHints.map(h=>`<b>${h.clue||h}</b>`).join("");
   $("activeHintBox").classList.remove("hidden");
 }else{
   $("activeHintBox").classList.add("hidden");
 }
 $("turnName").textContent=g.roundClosed?"انتهت المحاولات":(g.answerTurn===1?g.team1:g.team2);
 if($("strikes1")) $("strikes1").textContent=`${g.wrong1||0}/3`;
 if($("strikes2")) $("strikes2").textContent=`${g.wrong2||0}/3`;
 $("scoreCard1").classList.toggle("team-locked",!!g.locked1);
 $("scoreCard2").classList.toggle("team-locked",!!g.locked2);$("scoreCard1").classList.toggle("active",g.answerTurn===1);$("scoreCard2").classList.toggle("active",g.answerTurn===2);
 $("answerBoard").innerHTML=(g.currentAnswers||[]).map((a,i)=>{
   const ownerClass=a.claimedBy===1?"claimed-team1":a.claimedBy===2?"claimed-team2":a.revealed?"claimed-none":"";
   return `<div class="answer ${a.revealed?"revealed":""} ${ownerClass}"><span class="n">${i+1}</span><span class="lock">${a.revealed?a.text:""}</span><span class="pts">${a.revealed?a.points:"?"}</span></div>`;
 }).join("");
 if(g.revealEvent?.id&&g.revealEvent.id!==lastReveal){lastReveal=g.revealEvent.id;playSuspenseResult({type:"correct",text:g.revealEvent.text,points:g.revealEvent.points})}
 if(g.wrongEvent?.id&&g.wrongEvent.id!==lastWrong){lastWrong=g.wrongEvent.id;playSuspenseResult({type:"wrong"})}
 if(g.hintEarnedEvent?.id&&g.hintEarnedEvent.id!==lastHintEarned){
   lastHintEarned=g.hintEarnedEvent.id;
   $("hintEarnedTeam").textContent=g.hintEarnedEvent.team;
   $("hintEarnedFx").classList.remove("hidden");
   setTimeout(()=>$("hintEarnedFx").classList.add("hidden"),1800);
 }
 if(g.hintUsedEvent?.id&&g.hintUsedEvent.id!==lastHintUsed){
   lastHintUsed=g.hintUsedEvent.id;
   $("hintUsedText").textContent=g.hintUsedEvent.hint;
   $("hintUsedFx").classList.remove("hidden");
   setTimeout(()=>$("hintUsedFx").classList.add("hidden"),2600);
 }
}
