import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
import { getDatabase, ref, set, get, update, onValue, remove, runTransaction, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js';


// التوب 36: احسب الارتفاع المرئي الحقيقي للجوال من أول فتح.
// visualViewport يتعامل مع أشرطة Safari/Chrome المتحركة أفضل من 100vh وحده.
function syncVisibleViewportHeight(){
  const vv = window.visualViewport;
  const h = Math.round(vv && vv.height ? vv.height : window.innerHeight);
  if(h > 0) document.documentElement.style.setProperty('--app-height', `${h}px`);
}
syncVisibleViewportHeight();
requestAnimationFrame(syncVisibleViewportHeight);
setTimeout(syncVisibleViewportHeight, 80);
setTimeout(syncVisibleViewportHeight, 300);
setTimeout(syncVisibleViewportHeight, 800);
window.addEventListener('resize', syncVisibleViewportHeight, {passive:true});
window.addEventListener('orientationchange', ()=>{
  syncVisibleViewportHeight();
  setTimeout(syncVisibleViewportHeight, 120);
  setTimeout(syncVisibleViewportHeight, 450);
}, {passive:true});
window.addEventListener('pageshow', syncVisibleViewportHeight, {passive:true});
if(window.visualViewport){
  window.visualViewport.addEventListener('resize', syncVisibleViewportHeight, {passive:true});
  window.visualViewport.addEventListener('scroll', syncVisibleViewportHeight, {passive:true});
}

const firebaseConfig={apiKey:'AIzaSyDOZNZp5F-t9AouL9xsthU3OiAyO_HQBBI',authDomain:'jawab-majhoo1.firebaseapp.com',databaseURL:'https://jawab-majhoo1-default-rtdb.europe-west1.firebasedatabase.app',projectId:'jawab-majhoo1',storageBucket:'jawab-majhoo1.firebasestorage.app',messagingSenderId:'314192717840',appId:'1:314192717840:web:688b94bbb5a8915098c295'};
const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getDatabase(app);
const $=id=>document.getElementById(id); const screens=['home','howToScreen','nameScreen','lobby','game','finalScreen'];
let uid=null,roomCode=null,isHost=false,unsubRoom=null,joinMode='join',lastRoom=null,phaseTimer=null,selectedVoteKey=null,votePhaseKey='',voteUIReadyAt=0,answerPhaseKey='',interactionGuardUntil=0,selectedEmojiIndex=null,emojiRoomCode=null,unsubEmojiRoom=null;
const SESSION_KEY='jawabMajhoolSessionV1';
const AVATARS=[
  {name:'المحقق',body:'#ff684d',accent:'#ffd24a',face:'detective'},
  {name:'المقنّع',body:'#65d7ce',accent:'#171636',face:'mask'},
  {name:'العبقري',body:'#ffd24a',accent:'#ff684d',face:'glasses'},
  {name:'المشاغب',body:'#9d7bff',accent:'#ffd24a',face:'horns'},
  {name:'الهادئ',body:'#7ddc8a',accent:'#171636',face:'calm'},
  {name:'الفضولي',body:'#62a8ff',accent:'#fff4db',face:'wide'},
  {name:'المخادع',body:'#ff8bc2',accent:'#171636',face:'wink'},
  {name:'الشبح',body:'#fff4db',accent:'#ff684d',face:'ghost'},
  {name:'الروبوت',body:'#a7b0c0',accent:'#65d7ce',face:'robot'},
  {name:'المجهول',body:'#171636',accent:'#ff684d',face:'mystery'}
];
function avatarSvg(i,extra=''){
  const a=AVATARS[(Number(i)||0)%AVATARS.length];
  const skin=['#f2b58f','#d99368','#b86f4f','#f0bf9a','#cc8966'][i%5];
  const dark='#171636',cream='#fff4db';
  let hair='',face='',gear='';
  if(a.face==='detective'){
    hair=`<path d="M20 25c3-10 24-12 29 1-8-3-20-3-29-1z" fill="${dark}"/>`;
    gear=`<path d="M17 25h34l-5-8H25z" fill="${a.accent}" stroke="${dark}" stroke-width="2.4"/><path d="M13 25h42" stroke="${dark}" stroke-width="3.2" stroke-linecap="round"/>`;
    face=`<circle cx="28" cy="38" r="2.1"/><circle cx="40" cy="38" r="2.1"/><path d="M29 47c3 2 7 2 10 0" fill="none" stroke="${dark}" stroke-width="2.7" stroke-linecap="round"/><circle cx="28" cy="38" r="6" fill="none" stroke="${dark}" stroke-width="2.4"/><path d="M34 38h7" stroke="${dark}" stroke-width="2.4"/>`;
  }else if(a.face==='mask'){
    hair=`<path d="M20 28c2-12 25-13 29 0l-7-4-7 3-8-3z" fill="${dark}"/>`;
    gear=`<path d="M20 33c8-7 20-7 28 0l-4 11c-7 5-14 5-21 0z" fill="${a.accent}" stroke="${dark}" stroke-width="2.5"/>`;
    face=`<path d="M26 37h5M38 37h5" stroke="${cream}" stroke-width="3" stroke-linecap="round"/><path d="M31 49h7" stroke="${dark}" stroke-width="2.5" stroke-linecap="round"/>`;
  }else if(a.face==='glasses'){
    hair=`<path d="M19 28c4-14 28-14 31 0-9-5-21-5-31 0z" fill="${a.accent}" stroke="${dark}" stroke-width="2"/>`;
    gear=`<circle cx="27" cy="38" r="6.2" fill="none" stroke="${dark}" stroke-width="2.7"/><circle cx="41" cy="38" r="6.2" fill="none" stroke="${dark}" stroke-width="2.7"/><path d="M33 38h2" stroke="${dark}" stroke-width="2.7"/>`;
    face=`<circle cx="27" cy="38" r="1.6"/><circle cx="41" cy="38" r="1.6"/><path d="M30 48c3 2 6 2 9 0" fill="none" stroke="${dark}" stroke-width="2.6" stroke-linecap="round"/>`;
  }else if(a.face==='horns'){
    hair=`<path d="M20 28c2-11 26-13 29 1l-8-5-7 4-7-4z" fill="${dark}"/>`;
    gear=`<path d="M23 23l-7-10 12 5M45 23l7-10-12 5" fill="${a.accent}" stroke="${dark}" stroke-width="2.4"/>`;
    face=`<path d="M24 37l7 2M44 37l-7 2" stroke="${dark}" stroke-width="2.8" stroke-linecap="round"/><path d="M29 48c4 3 7 3 11 0" fill="none" stroke="${dark}" stroke-width="2.8" stroke-linecap="round"/>`;
  }else if(a.face==='calm'){
    hair=`<path d="M20 28c5-12 25-13 29 0-8-3-20-3-29 0z" fill="${dark}"/>`;
    face=`<path d="M24 39c2-2 5-2 7 0M37 39c2-2 5-2 7 0" fill="none" stroke="${dark}" stroke-width="2.8" stroke-linecap="round"/><path d="M30 48c3 1 6 1 9 0" fill="none" stroke="${dark}" stroke-width="2.6" stroke-linecap="round"/>`;
    gear=`<path d="M48 28c4 1 5 6 2 9" fill="none" stroke="${a.accent}" stroke-width="3" stroke-linecap="round"/>`;
  }else if(a.face==='wide'){
    hair=`<path d="M18 29c3-15 29-15 33 0l-9-6-8 4-8-4z" fill="${dark}"/>`;
    face=`<circle cx="27" cy="39" r="4.4" fill="#fff" stroke="${dark}" stroke-width="2.2"/><circle cx="41" cy="39" r="4.4" fill="#fff" stroke="${dark}" stroke-width="2.2"/><circle cx="28" cy="39" r="1.5"/><circle cx="40" cy="39" r="1.5"/><ellipse cx="34" cy="49" rx="3.7" ry="4.8" fill="${a.accent}" stroke="${dark}" stroke-width="2"/>`;
  }else if(a.face==='wink'){
    hair=`<path d="M19 29c5-13 27-13 31 0-10-5-20-3-31 0z" fill="${dark}"/>`;
    gear=`<path d="M47 26l5-4M48 31h5" stroke="${a.accent}" stroke-width="2.8" stroke-linecap="round"/>`;
    face=`<circle cx="27" cy="39" r="2.2"/><path d="M38 39c2-2 5-2 7 0" fill="none" stroke="${dark}" stroke-width="2.8" stroke-linecap="round"/><path d="M29 48c4 4 8 4 12 0" fill="none" stroke="${dark}" stroke-width="2.8" stroke-linecap="round"/>`;
  }else if(a.face==='ghost'){
    return `<span class="gameAvatar ${extra}" title="${a.name}"><svg viewBox="0 0 68 68" aria-hidden="true"><path d="M14 58V34c0-14 8-23 20-23s20 9 20 23v24l-7-5-6 5-7-5-7 5-6-5z" fill="${a.body}" stroke="${dark}" stroke-width="3" stroke-linejoin="round"/><circle cx="27" cy="35" r="2.5"/><circle cx="41" cy="35" r="2.5"/><ellipse cx="34" cy="46" rx="4" ry="5.5" fill="${a.accent}" stroke="${dark}" stroke-width="2"/></svg></span>`;
  }else if(a.face==='robot'){
    return `<span class="gameAvatar ${extra}" title="${a.name}"><svg viewBox="0 0 68 68" aria-hidden="true"><path d="M34 13v8" stroke="${dark}" stroke-width="3"/><circle cx="34" cy="11" r="3.5" fill="${a.accent}" stroke="${dark}" stroke-width="2"/><rect x="15" y="20" width="38" height="38" rx="11" fill="${a.body}" stroke="${dark}" stroke-width="3"/><path d="M20 31h28v18H20z" fill="#eef2f6" stroke="${dark}" stroke-width="2"/><circle cx="28" cy="39" r="3" fill="${a.accent}"/><circle cx="40" cy="39" r="3" fill="${a.accent}"/><path d="M28 46h12" stroke="${dark}" stroke-width="2.5" stroke-linecap="round"/><path d="M15 32h-5v13h5M53 32h5v13h-5" fill="${a.accent}" stroke="${dark}" stroke-width="2"/></svg></span>`;
  }else{
    hair=`<path d="M19 28c3-13 27-14 31 0l-8-5-8 4-8-4z" fill="#0d0c22"/>`;
    gear=`<path d="M18 33c10-8 23-8 32 0v17c-10 7-22 7-32 0z" fill="${dark}" opacity=".96"/><text x="34" y="47" text-anchor="middle" font-size="18" font-weight="900" fill="${a.accent}">?</text>`;
    face='';
  }
  return `<span class="gameAvatar ${extra}" title="${a.name}"><svg viewBox="0 0 68 68" aria-hidden="true"><path d="M15 58c1-11 8-17 19-17s18 6 19 17" fill="${a.body}" stroke="${dark}" stroke-width="3" stroke-linecap="round"/><circle cx="34" cy="36" r="18" fill="${skin}" stroke="${dark}" stroke-width="3"/>${hair}${gear}${face}<path d="M23 57c3-7 19-7 22 0" fill="${a.body}" stroke="${dark}" stroke-width="3" stroke-linecap="round"/></svg></span>`;
}
let pendingSession=null,booted=false;
const QUESTIONS=[
 {"text":"ما اسم هذه الدولة؟","answer":"دومينيكا","accepted":["dominica"]},
 {"text":"كم عدد أجزاء رزدنت إيفل، شامل الأجزاء الفرعية والأساسية والريميك؟","answer":"31","accepted":["٣١"]},
 {"text":"الدماغ البشري يستهلك حوالي ٪---- من طاقة الجسم.","answer":"20٪","accepted":["20%","20","٢٠٪","٢٠%","٢٠"]},
 {"text":"هذا غلاف فيفا كم؟","answer":"فيفا 20","accepted":["فيفا20","FIFA 20","20","٢٠"]},
 {"text":"كم موديل السيارة؟","answer":"2018","accepted":["٢٠١٨"]},
 {"text":"ما اسم هذه الشخصية؟","answer":"بايدن","accepted":["جو بايدن","جوزيف بايدن"]},
 {"text":"ما أكبر عضو في جسم الإنسان؟","answer":"الجلد","accepted":[]},
 {"text":"ما معنى كلمة قشعم؟","answer":"كبير السن","accepted":["كبير بالسن"]},
 {"text":"ما هي لعبة السنة 2019؟","answer":"سيكيرو","accepted":["Sekiro","سيكرو"]},
 {"text":"ما هي أكبر بحيرة في العالم؟","answer":"قزوين","accepted":["بحر قزوين"]},
 {"text":"متى كان أول بث لقناة سبيستون؟","answer":"1996","accepted":["١٩٩٦"]},
 {"text":"متى صُنع أول آيفون؟","answer":"2007","accepted":["٢٠٠٧"]},
 {"text":"ما اسم البحر الذي يقع بين الأردن وفلسطين؟","answer":"الميت","accepted":["البحر الميت"]},
 {"text":"ما هي أول دولة عربية شاركت في كأس العالم؟","answer":"مصر","accepted":[]},
 {"text":"متى أُقيمت أول مباراة في تاريخ كأس العالم؟","answer":"1930","accepted":["١٩٣٠"]},
 {"text":"متى صُنع أول موديل من تويوتا كامري؟","answer":"1982","accepted":["١٩٨٢"]},
 {"text":"ما الاسم الأول لمخترع الهاتف المحمول؟","answer":"مارتن","accepted":["مارتن كوبر"]},
 {"text":"ما هي جنسية الرسام العالمي بيكاسو؟","answer":"أسباني","accepted":["اسباني","إسباني","اسبانيا","إسبانيا"]},
 {"text":"ما الدولة الأكثر إنتاجًا للزهور في العالم؟","answer":"هولندا","accepted":["هولندا"]},
 {"text":"ما الدولة التي تمتلك أكبر عدد من الجزر في العالم؟","answer":"السويد","accepted":[]},
 {"text":"كم عدد محافظات دولة الكويت؟","answer":"6","accepted":["٦","6 محافظات","٦ محافظات"]},
 {"text":"ما الاسم الأول لمؤسس شركة أديداس؟","answer":"أدولف","accepted":["ادولف"]},
 {"text":"ما الدولة التي اخترعت لعبة البلياردو؟","answer":"فرنسا","accepted":[]},
 {"text":"كم قلبًا يمتلك الأخطبوط؟","answer":"3","accepted":["٣","3 قلوب","٣ قلوب"]},
 {"text":"ما الحيوان الذي يمتلك بصمات تشبه بصمات الإنسان؟","answer":"الكوالا","accepted":["كوالا"]},
 {"text":"ما أول دولة استخدمت النقود الورقية؟","answer":"الصين","accepted":[]},
 {"text":"ما اسم أكبر صحراء في العالم؟","answer":"القارة القطبية الجنوبية","accepted":["انتاركتيكا","أنتاركتيكا"]},
 {"text":"ما الدولة التي يوجد بها أكبر عدد من البراكين النشطة؟","answer":"إندونيسيا","accepted":["اندونيسيا"]},
 {"text":"ما الاسم الأول لمخترع شبكة الويب العالمية؟","answer":"تيم","accepted":["تيم بيرنرز لي"]},
 {"text":"كم عدد عظام جسم الإنسان البالغ؟","answer":"206","accepted":["٢٠٦","206 عظمة","٢٠٦ عظمة"]},
 {"text":"ما أول دولة فازت بكأس العالم؟","answer":"الأوروغواي","accepted":["اوروجواي","الأوروجواي","اوروغواي"]},
 {"text":"ما الحيوان الذي يُعرف بأن دمه أزرق؟","answer":"الأخطبوط","accepted":["اخطبوط","الأخطبوط"]},
 {"text":"ما الاسم الأول لمؤسس شركة فيراري؟","answer":"إنزو","accepted":["انزو"]},
 {"text":"ما الدولة التي صنعت أول سيارة تويوتا؟","answer":"اليابان","accepted":[]},
 {"text":"كم عدد مفاتيح البيانو القياسي؟","answer":"88","accepted":["٨٨"]},
 {"text":"ما الدولة التي اخترعت فيها لعبة تنس الطاولة؟","answer":"إنجلترا","accepted":["انجلترا","إنكلترا","بريطانيا"]},
 {"text":"متى صدر بلايستيشن 2 لأول مرة؟","answer":"2000","accepted":["٢٠٠٠"]},
 {"text":"ما أكثر لغة تحتوي على متحدثين أصليين في العالم؟","answer":"الصينية","accepted":["الصينيه","الصينية المندرينية","المندرينية"]},
 {"text":"ما اسم الدولة الوحيدة التي علمها ليس مستطيلًا؟","answer":"نيبال","accepted":[]},
 {"text":"متى تأسست شركة مايكروسوفت؟","answer":"1975","accepted":["١٩٧٥"]},
 {"text":"ما هي العملة الرسمية للبرازيل؟","answer":"الريال","accepted":["ريال","الريال البرازيلي"]},
 {"text":"ما اسم شركة السيارات التي تمتلك هذا الشعار؟","answer":"بولستار","accepted":["Polestar"]},
 {"text":"كم ساعة ينام الأسد في اليوم تقريبًا؟","answer":"20 ساعة","accepted":["20","٢٠","٢٠ ساعة"]},
 {"text":"كم يومًا يستطيع الجمل البقاء تقريبًا دون شرب الماء؟","answer":"7 أيام","accepted":["7","٧","٧ أيام"]},
 {"text":"أكمل البيت: ومن لا يحب صعود الجبال يعش أبد الدهر بين ______","answer":"الحفر","accepted":[]},
 {"text":"ما أول جامعة تأسست في المملكة العربية السعودية؟","answer":"جامعة الملك سعود","accepted":["الملك سعود"]},
 {"text":"من هو ثالث ملوك المملكة العربية السعودية؟","answer":"الملك فيصل بن عبدالعزيز","accepted":["فيصل","الملك فيصل","فيصل بن عبدالعزيز"]},
 {"text":"متى تأسست شركة يوتيوب؟","answer":"2005","accepted":["٢٠٠٥"]},
 {"text":"أكمل البيت: وإذا أتتك مذمتي من ناقص فهي الشهادة لي بأني ______","answer":"كامل","accepted":[]},
 {"text":"متى أُطلق ChatGPT لأول مرة؟","answer":"2022","accepted":["٢٠٢٢"]},
 {"text":"ما أكبر كوكب في المجموعة الشمسية؟","answer":"المشتري","accepted":[]},
 {"text":"كم عدد أضلاع الشكل السداسي؟","answer":"6","accepted":["٦"]},
 {"text":"ما العنصر الكيميائي الذي رمزه Au؟","answer":"الذهب","accepted":["ذهب"]},
 {"text":"ما عاصمة أستراليا؟","answer":"كانبرا","accepted":["كانبيرا","Canberra"]},
 {"text":"في أي سنة صدر أول جهاز PlayStation؟","answer":"1994","accepted":["١٩٩٤"]},
 {"text":"ما أسرع حيوان بري في العالم؟","answer":"الفهد","accepted":["الفهد الصياد","الشيتا","Cheetah"]},
 {"text":"كم عدد اللاعبين الأساسيين في فريق كرة القدم داخل الملعب؟","answer":"11","accepted":["١١"]},
 {"text":"ما أكبر محيط في العالم؟","answer":"المحيط الهادئ","accepted":["الهادئ","محيط الهادئ"]},
 {"text":"ما اسم الشركة التي طورت لعبة Minecraft في الأصل؟","answer":"Mojang","accepted":["موجانغ","موجانج"]},
 {"text":"ما الغاز الأكثر وجودًا في الغلاف الجوي للأرض؟","answer":"النيتروجين","accepted":["نيتروجين"]},
 {"text":"في أي سنة نزلت لعبة GTA V لأول مرة؟","answer":"2013","accepted":["٢٠١٣"]},
 {"text":"ما الدولة التي يوجد فيها أطول برج في العالم؟","answer":"الإمارات العربية المتحدة","accepted":["الإمارات","الامارات","الامارات العربية المتحدة","الإمارات العربية المتحده"]},
 {"text":"ما الحيوان الذي لا يستطيع القفز؟","answer":"الفيل","accepted":["فيل","الفيلة","الفيله"]},
 {"text":"ما اسم هذه الشخصية في مسلسل باب الحارة؟","answer":"أبو مرزوق","accepted":["ابو مرزوق","أبومرزوق","ابومرزوق"]},
 {"text":"كم عدد القطع التي يبدأ بها كل لاعب في الشطرنج؟","answer":"16","accepted":["١٦","16 قطعة","١٦ قطعة"]},
 {"text":"ما اسم العملة الرسمية في اليابان؟","answer":"الين","accepted":["ين","الين الياباني","ين ياباني","Yen"]},
 {"text":"ما اسم المدينة السعودية التي كانت تُعرف تاريخيًا باسم يثرب؟","answer":"المدينة المنورة","accepted":["المدينة","المدينه المنوره","المدينه"]},
 {"text":"كم عدد اللاعبين الأساسيين في فريق كرة الطائرة داخل الملعب؟","answer":"6","accepted":["٦","6 لاعبين","٦ لاعبين"]},
 {"text":"ما الدولة التي يوجد فيها أكبر عدد من الأهرامات في العالم؟","answer":"السودان","accepted":["سودان"]},
 {"text":"ما العنصر الأكثر وفرة في الكون؟","answer":"الهيدروجين","accepted":["هيدروجين"]},
 {"text":"ما الدولة التي تقع فيها مدينة إسطنبول الممتدة بين قارتي آسيا وأوروبا؟","answer":"تركيا","accepted":["تركيا"]},
 {"text":"علم أي دولة هذا؟","answer":"تشاد","accepted":["جمهورية تشاد"]},
 {"text":"ما اسم أكبر جزيرة في العالم؟","answer":"غرينلاند","accepted":["جرينلاند","غرينلند","جرينلند","Greenland"]},
 {"text":"كم عدد حجرات قلب الإنسان؟","answer":"4","accepted":["٤","4 حجرات","٤ حجرات"]},
 {"text":"ما الدولة التي عاصمتها بوينس آيرس؟","answer":"الأرجنتين","accepted":["الارجنتين","أرجنتين","ارجنتين"]},
 {"text":"ما اسم الجزء الوحيد في جسم الإنسان الذي لا تصله أوعية دموية؟","answer":"القرنية","accepted":["قرنية العين","قرنيه","قرنيه العين"]},
 {"text":"أي كوكب في المجموعة الشمسية يومه أطول من سنته؟","answer":"الزهرة","accepted":["كوكب الزهرة"]},
 {"text":"ما اسم المضيق الذي يفصل بين المغرب وإسبانيا؟","answer":"مضيق جبل طارق","accepted":["جبل طارق"]},
 {"text":"ما البحر الذي لا توجد له سواحل؟","answer":"بحر سارجاسو","accepted":["سارجاسو","بحر سارغاسو","سارغاسو","Sargasso"]},
 {"text":"ما اسم أول هاتف آيفون احتوى على بصمة الإصبع؟","answer":"آيفون 5s","accepted":["ايفون 5s","آيفون 5S","ايفون 5S","iPhone 5s","iPhone 5S","5s","5S"]},
 {"text":"كم موديل هذه السيارة؟","answer":"2008","accepted":["٢٠٠٨"]},
 {"text":"كم عدد الأصفار في المليار؟","answer":"9","accepted":["٩","9 أصفار","٩ أصفار"]},
 {"text":"ما اسم أول متصفح ويب في التاريخ؟","answer":"وورلد وايد ويب","accepted":["ورلد وايد ويب","WorldWideWeb","World Wide Web","worldwideweb"]},
 {"text":"ما اسم المدينة التي يوجد فيها برج بيزا المائل؟","answer":"بيزا","accepted":["Pisa"]},
 {"text":"متى صدر هذا الجوال لأول مرة؟","answer":"2013","accepted":["٢٠١٣"]},
 {"text":"في أي سنة افتُتح برج خليفة رسميًا؟","answer":"2010","accepted":["٢٠١٠"]},
 {"text":"كم عدد النجوم الموجودة على علم الصين؟","answer":"5","accepted":["٥","5 نجوم","٥ نجوم"]},
 {"text":"ما اسم السيارة الأكثر مبيعًا في التاريخ؟","answer":"تويوتا كورولا","accepted":["كورولا","Toyota Corolla","Corolla"]},
 {"text":"ما اسم أول دولة عربية وصل منتخبها إلى نصف نهائي كأس العالم؟","answer":"المغرب","accepted":["مملكة المغرب"]},
 {"text":"كم ثانية يستغرق الضوء تقريبًا للوصول من الشمس إلى الأرض؟","answer":"500 ثانية","accepted":["500","٥٠٠","٥٠٠ ثانية","8 دقائق و20 ثانية","8 دقائق و 20 ثانية","٨ دقائق و٢٠ ثانية","8:20"]},
 {"text":"كم سنة تقريبًا استغرق بناء برج خليفة من بدء الحفر حتى الافتتاح الرسمي؟","answer":"6 سنوات","accepted":["6","٦","ست سنوات","٦ سنوات","حوالي 6 سنوات","حوالي ست سنوات"]},
 {"text":"في أي عمر تقريبًا تصل العين إلى حجمها الكامل؟","answer":"سنتين","accepted":["سنتان","سنتين تقريبًا","2","٢","عامين","عامان","عمر سنتين"]},
 {"text":"كم مرة فاز ليونيل ميسي بالكرة الذهبية؟","answer":"8 مرات","accepted":["8","٨","ثمان مرات","ثمانية","٨ مرات"]},
 {"text":"ما اسم اللعبة التي تجاوزت مبيعاتها 100 مليون نسخة في عام 2016؟","answer":"ماينكرافت","accepted":["Minecraft","مينكرافت","ماين كرافت"]},
 {"text":"في أي سنة أُضيفت خاصية إرسال الرسائل إلى واتساب لأول مرة؟","answer":"2009","accepted":["٢٠٠٩","عام 2009","عام ٢٠٠٩"]},
 {"text":"كم تبلغ سرعة الصوت في الهواء تقريبًا بالكيلومتر في الساعة عند درجة حرارة الغرفة؟","answer":"1235 كم/س","accepted":["1235","١٢٣٥","1236","١٢٣٦","حوالي 1235","حوالي 1236","1235 كم","1236 كم"]},
 {"text":"ما اسم أول هاتف محمول مزود بكاميرا طُرح تجاريًا عام 1999؟","answer":"كيوسيرا VP-210","accepted":["VP-210","VP210","كيوسيرا VP210","Kyocera VP-210","Kyocera VP210","كيوسيرا"]},
 {"text":"ما الحيوان الذي يستطيع النوم واقفًا ويستلقي أيضًا للنوم العميق؟","answer":"الحصان","accepted":["حصان","الخيل","الخيل والاحصنة","الأحصنة"]},
 {"text":"كم سنة تقريبًا تستغرق عبوة بلاستيكية للمشروبات حتى تتحلل في البيئة؟","answer":"450 سنة","accepted":["450","٤٥٠","٤٥٠ سنة","حوالي 450 سنة","حوالي ٤٥٠ سنة"]},
 {"text":"بحسب المراجع الطبية، كم أسبوعًا تقريبًا قد يمر من الصيام الكامل مع شرب الماء قبل أن يرتفع خطر الوفاة بوضوح لدى شخص سليم؟","answer":"6 أسابيع","accepted":["6","٦","ستة أسابيع","ست اسابيع","٦ أسابيع","حوالي 6 أسابيع","42 يوم","42 يومًا","٤٢ يوم"]},
 {"text":"كم تبلغ درجة حرارة البرق تقريبًا؟","answer":"30 ألف درجة مئوية","accepted":["30000","٣٠٠٠٠","30 ألف","٣٠ ألف","30000 درجة","٣٠٠٠٠ درجة","30 الف درجة"]},
 {"text":"كم يبلغ عدد الإطارات في الثانية في معدل العرض السينمائي التقليدي؟","answer":"24 إطارًا","accepted":["24","٢٤","24 إطار","٢٤ إطار","24 فريم","٢٤ فريم"]},
 {"text":"كم مرة ينبض قلب الإنسان تقريبًا في اليوم الواحد؟","answer":"100 ألف مرة","accepted":["100000","١٠٠٠٠٠","100 ألف","١٠٠ ألف","مئة ألف","حوالي 100 ألف"]},
 {"text":"ما أول جهاز منزلي حاول مؤسس سوني تطويره بعد الحرب وكان نموذجًا أوليًا فاشلًا؟","answer":"طباخ أرز كهربائي","accepted":["طباخ الارز الكهربائي","طباخ أرز","طباخ ارز","قدر أرز كهربائي","قدر الارز الكهربائي","electric rice cooker"]},
 {"text":"كم بلغت سرعة أسرع قطار مغناطيسي في الرقم القياسي العالمي؟","answer":"603 كم/س","accepted":["603","٦٠٣","603 كم","٦٠٣ كم","603 كيلومتر","٦٠٣ كيلومتر"]}
];

function renderQuestionMedia(room){
  const box=$('questionMedia');
  if(!box)return;

  // رقم الصورة يساوي رقم السؤال تلقائياً: السؤال 1 => 1.webp / 1.png ...
  // لا نعتمد على questionImage داخل Firebase حتى تعمل أيضاً الغرف القديمة.
  const bankIndex=Number(room.questionBankIndex);
  const imageId=Number.isFinite(bankIndex)?String(bankIndex+1):String(room.questionImage||'').trim();
  if(!imageId){box.innerHTML='';box.classList.add('hidden');delete box.dataset.imageId;return}

  // إذا الصورة الحالية محملة فعلاً لا نعيد تحميلها مع كل تحديث Firebase.
  const oldImg=box.querySelector('img');
  if(box.dataset.imageId===imageId && oldImg && oldImg.complete && oldImg.naturalWidth>0){
    box.classList.remove('hidden');
    return;
  }

  box.dataset.imageId=imageId;
  box.innerHTML='';
  box.classList.add('hidden');

  const img=document.createElement('img');
  img.alt=`صورة السؤال ${imageId}`;
  img.className='questionImage';
  img.loading='eager';
  img.decoding='async';
  box.appendChild(img);

  // نجرب الامتدادات تلقائياً. query لمنع بقاء نتيجة فشل قديمة في كاش الجوال.
  const candidates=['webp','png','jpg','jpeg','svg'];
  let i=0;
  const tryNext=()=>{
    if(i>=candidates.length){
      box.innerHTML='';
      box.classList.add('hidden');
      delete box.dataset.imageId;
      return;
    }
    const ext=candidates[i++];
    img.onload=()=>{
      if(img.naturalWidth>0){box.classList.remove('hidden')}
      else{tryNext()}
    };
    img.onerror=tryNext;
    img.src=`./assets/questions/${encodeURIComponent(imageId)}.${ext}?v=19`;
  };
  tryNext();
}


/* التوب 12 — مؤثرات صوتية خفيفة مولدة داخل المتصفح (بدون ملفات خارجية) */
let audioCtx=null,lastFxPhaseKey='',lastFxPlayerCount=null,currentScreenId='';
function ensureAudio(){
  try{if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume()}catch{}
}
function tone(freq=440,duration=.08,type='sine',gain=.035,delay=0){
  ensureAudio();if(!audioCtx)return;
  const t=audioCtx.currentTime+delay,o=audioCtx.createOscillator(),g=audioCtx.createGain();
  o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
  o.connect(g);g.connect(audioCtx.destination);o.start(t);o.stop(t+duration+.02);
}
function sfx(kind='tap'){
  if(kind==='tap'){tone(520,.055,'sine',.022);tone(700,.045,'sine',.012,.025)}
  else if(kind==='join'){tone(420,.08,'triangle',.028);tone(620,.09,'triangle',.025,.065)}
  else if(kind==='start'){tone(330,.08,'triangle',.03);tone(495,.09,'triangle',.03,.07);tone(660,.12,'triangle',.035,.14)}
  else if(kind==='send'){tone(640,.06,'sine',.025);tone(820,.08,'sine',.02,.045)}
  else if(kind==='select'){tone(760,.055,'triangle',.022)}
  else if(kind==='phase'){tone(300,.07,'sine',.018);tone(520,.09,'sine',.025,.055)}
  else if(kind==='result'){tone(523,.1,'triangle',.03);tone(659,.11,'triangle',.03,.08);tone(784,.16,'triangle',.035,.16)}
  else if(kind==='win'){tone(392,.12,'triangle',.035);tone(523,.14,'triangle',.04,.10);tone(659,.16,'triangle',.045,.22);tone(784,.28,'triangle',.05,.36)}
  else if(kind==='error'){tone(180,.09,'sawtooth',.018);tone(145,.13,'sawtooth',.014,.07)}
}
function visualPop(el){if(!el)return;el.classList.remove('fx-pop');void el.offsetWidth;el.classList.add('fx-pop');setTimeout(()=>el.classList.remove('fx-pop'),320)}
window.addEventListener('pointerdown',ensureAudio,{once:true});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;sfx('tap')});

function show(id){
  const changed=currentScreenId!==id;
  screens.forEach(s=>$(s).classList.toggle('hidden',s!==id));
  $('leaveBtn').classList.toggle('hidden',id==='home'||id==='nameScreen'||id==='howToScreen');
  if(changed){
    const el=$(id);
    document.querySelectorAll('.screen.entering').forEach(x=>x.classList.remove('entering'));
    if(el){void el.offsetWidth;el.classList.add('entering');setTimeout(()=>el.classList.remove('entering'),1150)}
    currentScreenId=id;
  }
}
function toast(t){$('toast').textContent=t;$('toast').classList.remove('hidden');setTimeout(()=>$('toast').classList.add('hidden'),2200)}
function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':'&quot;',"'":"&#39;"}[m]))}
function norm(s=''){return String(s).trim().toLowerCase().normalize('NFD').replace(/[\u064B-\u065F\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/[^\p{L}\p{N}\s]/gu,'').replace(/\s+/g,' ')}
function correct(q,t){return [q.answer,...q.accepted].some(a=>norm(a)===norm(t))}
function code(){const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';return Array.from({length:5},()=>c[Math.floor(Math.random()*c.length)]).join('')}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
async function ensureAuth(){if(auth.currentUser){uid=auth.currentUser.uid;return} await signInAnonymously(auth);uid=auth.currentUser.uid}
function saveSession(name=''){localStorage.setItem(SESSION_KEY,JSON.stringify({roomCode,isHost,name,uid,savedAt:Date.now()}))}
function clearSession(){localStorage.removeItem(SESSION_KEY);pendingSession=null}
function readSession(){try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch{return null}}
function renderEmojiPicker(room=null){
  const claims=room?.emojiClaims||{};
  const playerCount=Object.keys(room?.players||{}).length;
  // أول 10 لاعبين: كل شخصية تكون حصرية. من اللاعب 11 وما بعده نسمح بتكرار الشخصيات.
  const repeatsAllowed=playerCount>=AVATARS.length;
  $('emojiPicker').innerHTML=AVATARS.map((avatar,i)=>{
    const owner=claims[i];
    const mine=selectedEmojiIndex===i;
    const locked=!repeatsAllowed&&!!owner&&owner!==uid;
    return `<button type="button" class="emojiChoice ${mine?'selected':''} ${locked?'taken':''}" data-emoji-index="${i}" ${locked?'disabled':''} aria-label="${locked?'الشخصية محجوزة':`اختيار شخصية ${avatar.name}`}">${avatarSvg(i)}<span class="avatarName">${avatar.name}</span></button>`;
  }).join('');
  $('emojiHint').textContent=selectedEmojiIndex===null?(repeatsAllowed?'اختر شخصيتك — التكرار متاح الآن':'اختر شخصية واحدة'):`اختيارك: ${AVATARS[selectedEmojiIndex].name}`;
  document.querySelectorAll('.emojiChoice:not(.taken)').forEach(btn=>btn.onclick=()=>selectEmoji(Number(btn.dataset.emojiIndex)));
}
function stopEmojiWatch(){if(unsubEmojiRoom){unsubEmojiRoom();unsubEmojiRoom=null}emojiRoomCode=null}
async function releaseEmojiClaim(){
  if(joinMode!=='join'||selectedEmojiIndex===null||!emojiRoomCode||!uid)return;
  const claimRef=ref(db,`rooms/${emojiRoomCode}/emojiClaims/${selectedEmojiIndex}`);
  const snap=await get(claimRef);if(snap.val()===uid)await remove(claimRef);
}
async function watchEmojiRoom(c){
  c=(c||'').trim().toUpperCase();if(c.length!==5){stopEmojiWatch();renderEmojiPicker();return}
  if(emojiRoomCode===c&&unsubEmojiRoom)return;
  if(emojiRoomCode&&emojiRoomCode!==c){await releaseEmojiClaim();selectedEmojiIndex=null;stopEmojiWatch()}
  emojiRoomCode=c;
  unsubEmojiRoom=onValue(ref(db,`rooms/${c}`),snap=>renderEmojiPicker(snap.exists()?snap.val():null));
}
async function selectEmoji(i){
  await ensureAuth();
  if(joinMode==='create'){selectedEmojiIndex=i;renderEmojiPicker();return}
  const c=$('codeInput').value.trim().toUpperCase();
  if(c.length!==5)return toast('اكتب رقم الجلسة أول');
  const roomSnap=await get(ref(db,`rooms/${c}`));
  if(!roomSnap.exists())return toast('الغرفة غير موجودة');
  const room=roomSnap.val();
  if(room.phase!=='lobby')return toast('اللعبة بدأت بالفعل');
  const repeatsAllowed=Object.keys(room.players||{}).length>=AVATARS.length;
  const old=selectedEmojiIndex;
  if(repeatsAllowed){
    // بعد امتلاء الشخصيات العشر لا نحجز الشخصية حصريًا؛ يسمح بتكرارها.
    selectedEmojiIndex=i;emojiRoomCode=c;
    if(old!==null&&old!==i){const oldRef=ref(db,`rooms/${c}/emojiClaims/${old}`);const oldSnap=await get(oldRef);if(oldSnap.val()===uid)await remove(oldRef)}
  }else{
    const claimRef=ref(db,`rooms/${c}/emojiClaims/${i}`);
    const tx=await runTransaction(claimRef,current=>(!current||current===uid)?uid:undefined);
    if(!tx.committed)return toast('هذه الشخصية اختارها لاعب قبلك');
    selectedEmojiIndex=i;emojiRoomCode=c;
    if(old!==null&&old!==i){const oldRef=ref(db,`rooms/${c}/emojiClaims/${old}`);const oldSnap=await get(oldRef);if(oldSnap.val()===uid)await remove(oldRef)}
  }
  await watchEmojiRoom(c);renderEmojiPicker((await get(ref(db,`rooms/${c}`))).val());
}

async function openCreate(){await releaseEmojiClaim();stopEmojiWatch();joinMode='create';selectedEmojiIndex=null;$('nameTitle').textContent='اسم المضيف';$('codeInput').classList.add('hidden');$('codeInput').readOnly=false;$('codeInput').disabled=false;$('codeInput').classList.remove('lockedCode');$('confirmJoinBtn').textContent='إنشاء الغرفة';$('nameInput').value='';renderEmojiPicker();show('nameScreen')}
async function openJoin(){await releaseEmojiClaim();stopEmojiWatch();joinMode='join';selectedEmojiIndex=null;$('nameTitle').textContent='دخول الجلسة';$('codeInput').classList.remove('hidden');$('confirmJoinBtn').textContent='دخول';$('nameInput').value='';const linkedRoom=(new URL(location.href).searchParams.get('room')||'').toUpperCase();$('codeInput').value=linkedRoom;$('codeInput').readOnly=!!linkedRoom;$('codeInput').disabled=!!linkedRoom;$('codeInput').classList.toggle('lockedCode',!!linkedRoom);$('codeInput').placeholder='رقم الجلسة';$('codeInput').setAttribute('aria-label','رقم الجلسة');renderEmojiPicker();show('nameScreen');if(linkedRoom)await watchEmojiRoom(linkedRoom)}
async function offerExistingSession(){
  const session=readSession(); if(!session?.roomCode||session.uid!==uid)return false;
  const snap=await get(ref(db,`rooms/${session.roomCode}`));
  if(!snap.exists()||!snap.val().players?.[uid]){clearSession();return false}
  pendingSession={session,room:snap.val()};
  const role=snap.val().hostId===uid?'المضيف':'لاعب';
  $('sessionModalText').textContent=`عندك جلسة ${role} في الغرفة ${session.roomCode}. هل تريد الرجوع لها؟`;
  $('sessionModal').classList.remove('hidden'); return true;
}
function watchRoom(c){if(unsubRoom)unsubRoom();unsubRoom=onValue(ref(db,`rooms/${c}`),s=>{if(!s.exists()){toast('الغرفة أغلقت');setTimeout(()=>location.href=location.pathname,900);return} renderRoom(s.val())})}

$('createBtn').onclick=openCreate;
$('joinOpenBtn').onclick=openJoin;
let howStep=0;
function renderHowTo(){
  document.querySelectorAll('.howCard').forEach((card,i)=>card.classList.toggle('active',i===howStep));
  document.querySelectorAll('.howDot').forEach((dot,i)=>dot.classList.toggle('active',i===howStep));
  $('howPrevBtn').classList.toggle('hidden',howStep===0);
  $('howNextBtn').classList.toggle('hidden',howStep===3);
  $('howPlayBtn').classList.toggle('hidden',howStep!==3);
}
$('howToBtn').onclick=()=>{howStep=0;renderHowTo();show('howToScreen')};
$('howToBackBtn').onclick=()=>show('home');
$('howPrevBtn').onclick=()=>{if(howStep>0){howStep--;renderHowTo()}};
$('howNextBtn').onclick=()=>{if(howStep<3){howStep++;renderHowTo()}};
$('howPlayBtn').onclick=()=>show('home');
$('homeExitBtn').onclick=()=>{$('homeExitModal').classList.remove('hidden')};
$('cancelHomeExitBtn').onclick=()=>{$('homeExitModal').classList.add('hidden')};
$('confirmHomeExitBtn').onclick=()=>{location.href='https://zamn.games/'};
$('homeExitModal').addEventListener('click',e=>{if(e.target===$('homeExitModal'))$('homeExitModal').classList.add('hidden')});
$('nameBackBtn').onclick=async()=>{await releaseEmojiClaim();stopEmojiWatch();selectedEmojiIndex=null;show('home')};
$('codeInput').addEventListener('input',async()=>{if(joinMode!=='join'||$('codeInput').readOnly)return;const c=$('codeInput').value.trim().toUpperCase();$('codeInput').value=c;if(c.length===5)await watchEmojiRoom(c);else{await releaseEmojiClaim();selectedEmojiIndex=null;stopEmojiWatch();renderEmojiPicker()}});
$('confirmJoinBtn').onclick=async()=>{try{await ensureAuth();const name=$('nameInput').value.trim().slice(0,20);if(!name)return toast('اكتب اسمك');if(selectedEmojiIndex===null)return toast('اختر شخصيتك');if(joinMode==='create'){let c=code();while((await get(ref(db,`rooms/${c}`))).exists())c=code();roomCode=c;isHost=true;await set(ref(db,`rooms/${c}`),{code:c,hostId:uid,phase:'lobby',questionIndex:0,selectedDoor:1,roundQuestionOrder:null,emojiClaims:{[selectedEmojiIndex]:uid},players:{[uid]:{name,avatarIndex:selectedEmojiIndex,emojiIndex:selectedEmojiIndex,score:0,host:true,submitted:false}}});saveSession(name);stopEmojiWatch();setQR();watchRoom(c);show('lobby')}else{const c=$('codeInput').value.trim().toUpperCase();const snap=await get(ref(db,`rooms/${c}`));if(!snap.exists())return toast('الغرفة غير موجودة');if(snap.val().phase!=='lobby')return toast('اللعبة بدأت بالفعل');const joiningRoom=snap.val();const repeatsAllowed=Object.keys(joiningRoom.players||{}).length>=AVATARS.length;if(!repeatsAllowed){const claimSnap=await get(ref(db,`rooms/${c}/emojiClaims/${selectedEmojiIndex}`));if(claimSnap.val()!==uid){selectedEmojiIndex=null;renderEmojiPicker(joiningRoom);return toast('اختر شخصية متاحة')}}roomCode=c;isHost=false;await set(ref(db,`rooms/${c}/players/${uid}`),{name,avatarIndex:selectedEmojiIndex,emojiIndex:selectedEmojiIndex,score:0,host:false,submitted:false});saveSession(name);stopEmojiWatch();watchRoom(c);show('lobby')}}catch(e){console.error(e);toast('تعذر الاتصال بـ Firebase — راجع Rules')}};
function setQR(){const url=`${location.origin}${location.pathname}?room=${roomCode}`;$('qrImg').innerHTML='';new QRCode($('qrImg'),{text:url,width:240,height:240,correctLevel:QRCode.CorrectLevel.M})}
$('copyBtn').onclick=async()=>{const url=`${location.origin}${location.pathname}?room=${roomCode}`;const text=`قاعدين نلعب الجواب المجهول حياك\n${url}`;try{if(navigator.share){await navigator.share({title:'الجواب المجهول',text:'قاعدين نلعب الجواب المجهول حياك',url});toast('تم فتح المشاركة')}else{await navigator.clipboard.writeText(text);toast('تم نسخ الدعوة')}}catch(e){if(e?.name==='AbortError')return;try{await navigator.clipboard.writeText(text);toast('تم نسخ الدعوة')}catch{toast('تعذر مشاركة الرابط')}}};
document.querySelectorAll('.doorBtn').forEach(btn=>{
  btn.onclick=async()=>{
    if(!isHost||!roomCode)return;
    const door=Number(btn.dataset.door);
    if(![1,2,3,4,5,6,7].includes(door))return;
    await update(ref(db,`rooms/${roomCode}`),{selectedDoor:door});
  };
});

$('startBtn').onclick=async()=>{
  if(!isHost)return;
  sfx('start');
  const players=lastRoom?.players||{};
  if(Object.keys(players).length<3)return toast('الحد الأدنى 3 لاعبين');
  const door=[1,2,3,4,5,6,7].includes(Number(lastRoom?.selectedDoor))?Number(lastRoom.selectedDoor):1;
  const first=(door-1)*15;
  const order=Array.from({length:15},(_,i)=>first+i);
  if(order.some(i=>!QUESTIONS[i]))return toast('هذا الباب غير مكتمل');
  await update(ref(db,`rooms/${roomCode}`),{selectedDoor:door,roundQuestionOrder:order,questionIndex:0});
  await startRound(0,order);
};
async function startRound(i,providedOrder=null){
  const order=providedOrder||lastRoom?.roundQuestionOrder||QUESTIONS.map((_,idx)=>idx);
  const bankIndex=Number(order[i]);
  const safeBankIndex=Number.isInteger(bankIndex)&&QUESTIONS[bankIndex]?bankIndex:(i%QUESTIONS.length);
  const q=QUESTIONS[safeBankIndex];
  const p=lastRoom.players||{};
  const changes={phase:'answer',phaseStartedAt:Date.now(),questionIndex:i,questionBankIndex:safeBankIndex,questionText:q.text,questionImage:String(safeBankIndex+1),answerKey:q.answer,accepted:q.accepted,answers:null,options:null,votes:null,results:null};
  Object.keys(p).forEach(id=>changes[`players/${id}/submitted`]=false);
  await update(ref(db,`rooms/${roomCode}`),changes);
}
$('submitAnswerBtn').onclick=async(e)=>{e?.preventDefault();interactionGuardUntil=Date.now()+1200;$('submitAnswerBtn').blur();$('answerInput').blur();const text=$('answerInput').value.trim().slice(0,60);if(!text)return toast('اكتب إجابة');const q={answer:lastRoom.answerKey,accepted:lastRoom.accepted||[]};const isRight=correct(q,text);await set(ref(db,`rooms/${roomCode}/answers/${uid}`),{text,correct:isRight});await update(ref(db,`rooms/${roomCode}/players/${uid}`),{submitted:true});sfx('send');visualPop($('waiting'));toast(isRight?'الإجابة الصحيحة لا تُحسب كفخ — ستدخل التصويت مع الجميع':'تم تثبيت إجابتك');await maybeBuildOptions()};
async function maybeBuildOptions(force=false){if(!isHost)return;const s=(await get(ref(db,`rooms/${roomCode}`))).val();if(!s||s.phase!=='answer')return;const ids=Object.keys(s.players||{}),ans=s.answers||{};if(!force&&ids.some(id=>!ans[id]))return;
  // الإجابة الصحيحة خيار واحد ثابت. الفخاخ الخاطئة المتطابقة تُعرض مرة واحدة،
  // لكن نحفظ كل أصحابها لكي يحصل كل واحد منهم على نقطة عند وقوع لاعب فيها.
  const grouped=new Map();
  for(const [id,a] of Object.entries(ans)){
    if(a.correct)continue;
    const n=norm(a.text);if(!n)continue;
    if(!grouped.has(n))grouped.set(n,{id:`trap_${grouped.size}`,text:a.text,ownerIds:[],correct:false});
    grouped.get(n).ownerIds.push(id);
  }
  const opts=[{id:'correct',text:s.answerKey,ownerIds:[],correct:true},...grouped.values()];
  const options={};shuffle(opts).forEach((o,i)=>options[`o${i}`]=o);
  const changes={phase:'vote',phaseStartedAt:Date.now(),options,votes:null};ids.forEach(id=>changes[`players/${id}/submitted`]=false);await update(ref(db,`rooms/${roomCode}`),changes)}
async function submitVote(optionKey){sfx('send');const o=lastRoom.options?.[optionKey];if(!o||(o.ownerIds||[]).includes(uid))return;selectedVoteKey=null;$('confirmVoteBtn').disabled=true;await set(ref(db,`rooms/${roomCode}/votes/${uid}`),optionKey);await update(ref(db,`rooms/${roomCode}/players/${uid}`),{submitted:true});await maybeFinish()}
async function maybeFinish(force=false){if(!isHost)return;const s=(await get(ref(db,`rooms/${roomCode}`))).val();if(!s||s.phase!=='vote')return;const eligible=Object.keys(s.players||{});if(!force&&eligible.some(id=>!s.votes?.[id]))return;const gain={};Object.keys(s.players).forEach(id=>gain[id]=0);
  // كتابة الإجابة الصحيحة في مرحلة الفخ لا تمنح أي نقطة، وتُخفى من الفخاخ فقط. الجميع يشارك في التصويت.
  for(const [voter,k] of Object.entries(s.votes||{})){
    const o=s.options?.[k];if(!o)continue;
    if(o.correct){gain[voter]++;continue}
    for(const ownerId of (o.ownerIds||[]))if(ownerId!==voter)gain[ownerId]=(gain[ownerId]||0)+1;
  }
  const changes={phase:'results',phaseStartedAt:Date.now(),results:{answer:s.answerKey,roundGain:gain}};for(const id of Object.keys(s.players))changes[`players/${id}/score`]=(s.players[id].score||0)+(gain[id]||0);await update(ref(db,`rooms/${roomCode}`),changes)}
$('nextBtn').onclick=async()=>{if(!isHost)return;const current=Number(lastRoom?.questionIndex||0);const roundTotal=Array.isArray(lastRoom?.roundQuestionOrder)?lastRoom.roundQuestionOrder.length:QUESTIONS.length;if(current<roundTotal-1){await startRound(current+1)}else{await update(ref(db,`rooms/${roomCode}`),{phase:'final',phaseStartedAt:Date.now()})}};
$('leaveBtn').onclick=async()=>{if(roomCode&&uid){if(isHost)await remove(ref(db,`rooms/${roomCode}`));else{const idx=lastRoom?.players?.[uid]?.emojiIndex;await remove(ref(db,`rooms/${roomCode}/players/${uid}`));if(idx!==undefined&&idx!==null){const cr=ref(db,`rooms/${roomCode}/emojiClaims/${idx}`);const cs=await get(cr);if(cs.val()===uid)await remove(cr)}}}clearSession();location.href=location.pathname};
function stopPhaseTimer(){if(phaseTimer){clearInterval(phaseTimer);phaseTimer=null}$('timer').classList.add('hidden')}
function startPhaseTimer(room){
  if(!['answer','vote'].includes(room.phase)||!room.phaseStartedAt){stopPhaseTimer();return}
  if(phaseTimer)clearInterval(phaseTimer);
  $('timer').classList.remove('hidden');
  const duration=15000;
  const tick=async()=>{
    const left=Math.max(0,duration-(Date.now()-Number(room.phaseStartedAt)));
    const sec=Math.ceil(left/1000);
    $('timerNum').textContent=sec;
    $('timerFill').style.width=`${Math.max(0,left/duration*100)}%`;
    if(left<=0){
      clearInterval(phaseTimer);phaseTimer=null;
      if(isHost){
        if(room.phase==='answer')await maybeBuildOptions(true);
        else if(room.phase==='vote')await maybeFinish(true);
      }
    }
  };
  tick();phaseTimer=setInterval(tick,200);
}
$('confirmVoteBtn').onclick=()=>{if(selectedVoteKey)submitVote(selectedVoteKey)};

let lastFinalFxKey='';
function renderFinal(room,players){
  const ranked=[...players].sort((a,b)=>(b.score||0)-(a.score||0)||a.name.localeCompare(b.name,'ar'));
  const winner=ranked[0]||{name:'الفائز',score:0,avatarIndex:0};
  const top3=ranked.slice(0,3);
  const order=[top3[1],top3[0],top3[2]].filter(Boolean);
  const places={};top3.forEach((p,i)=>places[p.id]=i+1);
  $('championName').textContent=winner.name;
  $('championScore').textContent=`${winner.score||0} نقطة`;
  $('championAvatar').innerHTML=avatarSvg(winner.avatarIndex??winner.emojiIndex??0,'championAvatarSvg');
  $('podium').innerHTML=order.map(p=>{const place=places[p.id];return `<div class="podiumPlayer place${place}"><div class="podiumAvatar">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'podiumAvatarSvg')}</div><div class="podiumName">${esc(p.name)}</div><div class="podiumScore">${p.score||0} نقطة</div><div class="podiumBlock"><span>${place}</span></div></div>`}).join('');
  $('finalAllScores').innerHTML=ranked.map((p,i)=>`<div class="finalScoreRow ${i===0?'winnerRow':''}"><span>${i+1}</span><span class="finalScoreIdentity">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'finalMiniAvatar')}${esc(p.name)}</span><b>${p.score||0}</b></div>`).join('');
  const fxKey=`${room.code}:${room.phaseStartedAt||0}`;
  if(lastFinalFxKey!==fxKey){lastFinalFxKey=fxKey;runFinalCelebration()}
}
function runFinalCelebration(){
  const layer=$('confettiLayer');
  layer.innerHTML='';
  const colors=['#ff684d','#ffd24a','#65d7ce','#9d7bff','#fff4db'];
  for(let i=0;i<46;i++){
    const bit=document.createElement('i');
    bit.style.left=`${Math.random()*100}%`;
    bit.style.background=colors[i%colors.length];
    bit.style.animationDelay=`${Math.random()*.7}s`;
    bit.style.animationDuration=`${2.2+Math.random()*1.4}s`;
    bit.style.transform=`rotate(${Math.random()*180}deg)`;
    layer.appendChild(bit);
  }
  setTimeout(()=>{layer.innerHTML=''},4200);
}

function renderRoom(room){const fxPhaseKey=`${room.questionIndex??0}:${room.phase}:${room.phaseStartedAt??0}`;if(lastFxPhaseKey&&fxPhaseKey!==lastFxPhaseKey){sfx(room.phase==='final'?'win':room.phase==='results'?'result':room.phase==='answer'?'start':'phase')}lastFxPhaseKey=fxPhaseKey;lastRoom=room;startPhaseTimer(room);isHost=room.hostId===uid;const players=Object.entries(room.players||{}).map(([id,p])=>({id,...p}));if(lastFxPlayerCount!==null&&room.phase==='lobby'&&players.length>lastFxPlayerCount)sfx('join');lastFxPlayerCount=players.length;$('roomCode').textContent=room.code;$('countBadge').textContent=players.length;$('players').innerHTML=players.map(p=>`<div class="player"><span class="playerIdentity">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'playerAvatar')}<span>${esc(p.name)}${p.host?' 👑':''}</span></span><b>${p.score||0}</b></div>`).join('');document.querySelectorAll('.hostOnlyInvite').forEach(el=>el.classList.toggle('hidden',!isHost));$('startBtn').classList.toggle('hidden',!(isHost&&room.phase==='lobby'));const selectedDoor=[1,2,3,4,5,6,7].includes(Number(room.selectedDoor))?Number(room.selectedDoor):1;document.querySelectorAll('.doorBtn').forEach(btn=>btn.classList.toggle('selected',Number(btn.dataset.door)===selectedDoor));if(isHost&&room.phase==='lobby')setQR();if(room.phase==='lobby'){show('lobby');return}if(room.phase==='final'){show('finalScreen');renderFinal(room,players);return}show('game');renderGame(room,players);if(isHost&&room.phase==='answer')maybeBuildOptions();if(isHost&&room.phase==='vote')maybeFinish()}
function renderGame(room,players){$('scoreStrip').innerHTML=[...players].sort((a,b)=>(b.score||0)-(a.score||0)).map(p=>`<div class="score">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'scoreAvatar')}${esc(p.name)} · ${p.score||0}</div>`).join('');$('questionText').textContent=room.questionText||'';renderQuestionMedia(room);['answerArea','voteArea','waiting','resultsArea'].forEach(x=>$(x).classList.add('hidden'));$('nextBtn').classList.add('hidden');const me=room.players?.[uid];const myAnswer=room.answers?.[uid]||null;const myVote=room.votes?.[uid]||null;if(room.phase==='answer'){votePhaseKey='';selectedVoteKey=null;const currentAnswerPhase=`${room.questionIndex}:${room.phaseStartedAt}`;if(answerPhaseKey!==currentAnswerPhase){answerPhaseKey=currentAnswerPhase;$('answerInput').value='';interactionGuardUntil=Date.now()+500}$('phaseLabel').textContent='اكتب إجابة مقنعة';if(myAnswer){$('waiting').textContent='تم إرسال إجابتك… ننتظر البقية';$('waiting').classList.remove('hidden')}else{$('answerArea').classList.remove('hidden')}}if(room.phase==='vote'){$('phaseLabel').textContent='اختر الإجابة الصحيحة';if(myVote){$('waiting').textContent='تم تأكيد اختيارك… ننتظر البقية';$('waiting').classList.remove('hidden')}else{$('voteArea').classList.remove('hidden');const currentVotePhase=`${room.questionIndex}:${room.phaseStartedAt}`;if(votePhaseKey!==currentVotePhase){votePhaseKey=currentVotePhase;selectedVoteKey=null;voteUIReadyAt=Math.max(Date.now()+1000,interactionGuardUntil)}$('options').innerHTML=Object.entries(room.options||{}).map(([k,o])=>`<button class="option ${(o.ownerIds||[]).includes(uid)?'mine':''} ${selectedVoteKey===k?'selected':''}" data-k="${k}" ${(o.ownerIds||[]).includes(uid)?'disabled':''}>${esc(o.text)}</button>`).join('');$('confirmVoteBtn').disabled=!selectedVoteKey;document.querySelectorAll('.option:not(.mine)').forEach(b=>{let armed=false;b.onpointerdown=(e)=>{if(Date.now()<voteUIReadyAt){armed=false;return}armed=true};b.onpointerup=(e)=>{e.preventDefault();if(!armed||Date.now()<voteUIReadyAt)return;armed=false;selectedVoteKey=b.dataset.k;sfx('select');visualPop(b);document.querySelectorAll('.option').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');$('confirmVoteBtn').disabled=false};b.onpointercancel=()=>{armed=false};b.onclick=(e)=>e.preventDefault()})}}if(room.phase==='results'){votePhaseKey='';selectedVoteKey=null;$('phaseLabel').textContent='نتائج الجولة';$('resultsArea').classList.remove('hidden');const g=room.results?.roundGain||{};const names=Object.fromEntries(players.map(p=>[p.id,p.name]));const options=room.options||{};const votes=room.votes||{};const answers=room.answers||{};const playerCards=[...players].sort((a,b)=>(g[b.id]||0)-(g[a.id]||0)).map(p=>{const a=answers[p.id];const wroteCorrect=!!a?.correct;const voteKey=votes[p.id];const picked=voteKey?options[voteKey]:null;const voteCorrect=!!picked?.correct;const fooled=Object.entries(votes).filter(([voter,k])=>voter!==p.id&&(options[k]?.ownerIds||[]).includes(p.id)).map(([voter])=>names[voter]).filter(Boolean);let answerLine;if(picked){answerLine=voteCorrect?`<div class="resultLine good"><span class="resultIcon">✓</span><div><b>اختار الإجابة الصحيحة</b><small>${esc(picked.text||room.results?.answer||'')}</small></div></div>`:`<div class="resultLine bad"><span class="resultIcon">✕</span><div><b>جاوب غلط</b><small>اختار: ${esc(picked.text||'')}</small></div></div>`}else{answerLine=`<div class="resultLine neutral"><span class="resultIcon">—</span><div><b>ما اختار إجابة</b><small>انتهى الوقت قبل التصويت</small></div></div>`}const trapLine=wroteCorrect?`<div class="trapLine mutedResult">كتب الإجابة الصحيحة كفخ، لذلك لم تُعرض ولم يحصل عليها كنقطة</div>`:`<div class="trapBox"><div><b>إجابته للفخ:</b> ${esc(a?.text||'—')}</div><div>${fooled.length?`🎭 وقع في فخه: <b>${fooled.map(esc).join('، ')}</b>`:'لم يقع أحد في فخه'}</div></div>`;return `<div class="playerResultCard"><div class="playerResultHead"><div class="playerResultName">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'resultAvatar')}${esc(p.name)}</div><div class="roundPoints">+${g[p.id]||0} نقطة</div></div>${answerLine}${trapLine}<div class="playerTotal">المجموع: <b>${p.score||0}</b></div></div>`}).join('');$('resultsArea').innerHTML=`<div class="resultBox playerResultsBox"><div class="correctAnswer">الإجابة الصحيحة: ${esc(room.results?.answer||'')}</div><div class="playerResultsGrid">${playerCards}</div></div>`;const roundTotal=Array.isArray(room.roundQuestionOrder)?room.roundQuestionOrder.length:QUESTIONS.length;$('nextBtn').textContent=Number(room.questionIndex||0)<roundTotal-1?'السؤال التالي':'عرض الفائز';$('nextBtn').classList.toggle('hidden',!isHost)}}
$('resumeSessionBtn').onclick=()=>{if(!pendingSession)return;const {session,room}=pendingSession;roomCode=session.roomCode;isHost=room.hostId===uid;$('sessionModal').classList.add('hidden');selectedEmojiIndex=room.players?.[uid]?.emojiIndex??null;if(isHost)setQR();watchRoom(roomCode)};
$('discardSessionBtn').onclick=async()=>{if(!pendingSession)return;$('sessionModal').classList.add('hidden');const {session,room}=pendingSession;try{if(room.hostId===uid)await remove(ref(db,`rooms/${session.roomCode}`));else{const idx=room.players?.[uid]?.emojiIndex;await remove(ref(db,`rooms/${session.roomCode}/players/${uid}`));if(idx!==undefined&&idx!==null){const cr=ref(db,`rooms/${session.roomCode}/emojiClaims/${idx}`);const cs=await get(cr);if(cs.val()===uid)await remove(cr)}}}catch(e){console.error(e)}clearSession();roomCode=null;isHost=false;lastRoom=null;show('home');};
onAuthStateChanged(auth,async u=>{if(!u)return;uid=u.uid;if(booted)return;booted=true;try{const offered=await offerExistingSession();if(!offered&&new URL(location.href).searchParams.get('room'))openJoin()}catch(e){console.error(e);if(new URL(location.href).searchParams.get('room'))openJoin()}});
signInAnonymously(auth).catch(console.error);
