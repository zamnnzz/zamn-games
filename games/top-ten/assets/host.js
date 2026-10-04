import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";
const app=initializeApp(firebaseConfig),db=getDatabase(app),$=id=>document.getElementById(id);
const session=new URLSearchParams(location.hash.slice(1)).get("session");
let gameRef=null,state=null;
function applyTheme(theme){
  const t=theme||"night";
  document.body.dataset.theme=t;
}
const bank={"سيارات":[{"question":"اذكر أشهر شركات السيارات اليابانية","answers":[["تويوتا",1],["نيسان",2],["هوندا",3],["مازدا",4],["سوبارو",5],["ميتسوبيشي",6],["سوزوكي",7],["لكزس",8],["إنفينيتي",9],["أكيورا",10]]},{"question":"اذكر أشهر شركات السيارات الألمانية","answers":[["مرسيدس",1],["BMW",2],["أودي",3],["فولكس واجن",4],["بورش",5],["أوبل",6],["مايباخ",7],["سمارت",8],["مان",9],["ألبينا",10]]},{"question":"اذكر سيارات مشهورة من تويوتا","answers":[["كامري",1],["كورولا",2],["لاندكروزر",3],["هايلكس",4],["يارس",5],["برادو",6],["أفالون",7],["راف فور",8],["فورتشنر",9],["سوبرا",10]]},{"question":"اذكر أشهر السيارات الفاخرة","answers":[["مرسيدس S-Class",1],["BMW الفئة السابعة",2],["رولز رويس فانتوم",3],["بنتلي كونتيننتال",4],["رنج روفر",5],["لكزس LS",6],["أودي A8",7],["بورش باناميرا",8],["مايباخ",9],["كاديلاك إسكاليد",10]]},{"question":"اذكر أشهر سيارات الدفع الرباعي","answers":[["تويوتا لاندكروزر",1],["نيسان باترول",2],["جيب رانجلر",3],["رنج روفر",4],["تويوتا برادو",5],["فورد إكسبلورر",6],["شفروليه تاهو",7],["جي إم سي يوكن",8],["مرسيدس G-Class",9],["لكزس LX",10]]}],"السعودية":[{"question":"اذكر أشياء تشتهر بها السعودية","answers":[["الحرمين الشريفين",1],["النفط",2],["التمور",3],["الصحراء",4],["الحج",5],["العمرة",6],["الدرعية",7],["العلا",8],["القهوة السعودية",9],["الصقور",10]]},{"question":"اذكر أشهر مدن السعودية","answers":[["الرياض",1],["جدة",2],["مكة",3],["المدينة المنورة",4],["الدمام",5],["الطائف",6],["أبها",7],["الخبر",8],["تبوك",9],["حائل",10]]},{"question":"اذكر أماكن سياحية مشهورة في السعودية","answers":[["العلا",1],["الدرعية",2],["أبها",3],["جدة التاريخية",4],["حافة العالم",5],["الطائف",6],["جبل السودة",7],["البحر الأحمر",8],["رجال ألمع",9],["وادي الديسة",10]]},{"question":"اذكر أكلات سعودية مشهورة","answers":[["الكبسة",1],["الجريش",2],["القرصان",3],["المرقوق",4],["المطازيز",5],["الحنيذ",6],["السليق",7],["العصيدة",8],["المعصوب",9],["المراصيع",10]]},{"question":"اذكر أندية كرة قدم سعودية مشهورة","answers":[["الهلال",1],["النصر",2],["الاتحاد",3],["الأهلي",4],["الشباب",5],["الاتفاق",6],["التعاون",7],["الفتح",8],["القادسية",9],["الرائد",10]]}],"كرة قدم":[{"question":"اذكر أندية كرة قدم مشهورة","answers":[["ريال مدريد",1],["برشلونة",2],["مانشستر يونايتد",3],["ليفربول",4],["مانشستر سيتي",5],["بايرن ميونخ",6],["أرسنال",7],["ميلان",8],["باريس سان جيرمان",9],["يوفنتوس",10]]},{"question":"اذكر لاعبين كرة قدم مشهورين","answers":[["كريستيانو رونالدو",1],["ميسي",2],["نيمار",3],["مبابي",4],["محمد صلاح",5],["بنزيما",6],["هالاند",7],["مودريتش",8],["فينيسيوس",9],["ليفاندوفسكي",10]]},{"question":"اذكر منتخبات قوية في كرة القدم","answers":[["البرازيل",1],["الأرجنتين",2],["فرنسا",3],["ألمانيا",4],["إسبانيا",5],["إنجلترا",6],["إيطاليا",7],["البرتغال",8],["هولندا",9],["كرواتيا",10]]},{"question":"اذكر مراكز لاعبي كرة القدم","answers":[["حارس مرمى",1],["مهاجم",2],["قلب دفاع",3],["ظهير أيمن",4],["ظهير أيسر",5],["وسط دفاعي",6],["وسط مركزي",7],["صانع ألعاب",8],["جناح أيمن",9],["جناح أيسر",10]]},{"question":"اذكر أشياء موجودة في مباراة كرة قدم","answers":[["كرة",1],["مرمى",2],["حكم",3],["لاعبين",4],["جمهور",5],["بطاقات",6],["صافرة",7],["ركلات ركنية",8],["احتياط",9],["تقنية VAR",10]]}],"جغرافيا":[{"question":"اذكر دول عربية مشهورة","answers":[["السعودية",1],["مصر",2],["الإمارات",3],["المغرب",4],["العراق",5],["الأردن",6],["الكويت",7],["قطر",8],["عُمان",9],["البحرين",10]]},{"question":"اذكر دول أوروبية مشهورة","answers":[["فرنسا",1],["إسبانيا",2],["إيطاليا",3],["ألمانيا",4],["بريطانيا",5],["سويسرا",6],["هولندا",7],["البرتغال",8],["اليونان",9],["بلجيكا",10]]},{"question":"اذكر عواصم مشهورة حول العالم","answers":[["الرياض",1],["لندن",2],["باريس",3],["القاهرة",4],["أبوظبي",5],["طوكيو",6],["روما",7],["مدريد",8],["أنقرة",9],["موسكو",10]]},{"question":"اذكر دول مشهورة في آسيا","answers":[["السعودية",1],["الصين",2],["اليابان",3],["الهند",4],["كوريا الجنوبية",5],["الإمارات",6],["تايلاند",7],["إندونيسيا",8],["ماليزيا",9],["سنغافورة",10]]},{"question":"اذكر أماكن طبيعية مشهورة","answers":[["الصحراء",1],["الجبال",2],["البحر",3],["الشلالات",4],["الأنهار",5],["الغابات",6],["الجزر",7],["البحيرات",8],["الوديان",9],["الكهوف",10]]}],"أديان وإسلاميات":[{"question":"اذكر أسماء أنبياء معروفين","answers":[["محمد ﷺ",1],["موسى عليه السلام",2],["عيسى عليه السلام",3],["إبراهيم عليه السلام",4],["نوح عليه السلام",5],["يوسف عليه السلام",6],["آدم عليه السلام",7],["يونس عليه السلام",8],["سليمان عليه السلام",9],["داود عليه السلام",10]]},{"question":"اذكر سورًا مشهورة من القرآن","answers":[["الفاتحة",1],["البقرة",2],["الإخلاص",3],["الناس",4],["الفلق",5],["الكهف",6],["يس",7],["الملك",8],["الرحمن",9],["مريم",10]]},{"question":"اذكر عبادات معروفة في الإسلام","answers":[["الصلاة",1],["الصيام",2],["الزكاة",3],["الحج",4],["العمرة",5],["الدعاء",6],["قراءة القرآن",7],["الصدقة",8],["الذكر",9],["الاستغفار",10]]},{"question":"اذكر أماكن دينية مشهورة في الإسلام","answers":[["المسجد الحرام",1],["المسجد النبوي",2],["المسجد الأقصى",3],["عرفات",4],["منى",5],["مزدلفة",6],["غار حراء",7],["مسجد قباء",8],["مسجد القبلتين",9],["جبل أحد",10]]},{"question":"اذكر أشياء مرتبطة بشهر رمضان","answers":[["الصيام",1],["الإفطار",2],["السحور",3],["التراويح",4],["القرآن",5],["التمر",6],["الدعاء",7],["الصدقة",8],["ليلة القدر",9],["العيد",10]]}],"أفلام ومسلسلات":[{"question":"اذكر أفلام مشهورة جدًا","answers":[["تايتانيك",1],["أفاتار",2],["هاري بوتر",3],["سبايدرمان",4],["الأسد الملك",5],["باتمان",6],["فروزن",7],["جومانجي",8],["باربي",9],["توب غن",10]]},{"question":"اذكر شخصيات مشهورة من الأفلام والمسلسلات","answers":[["هاري بوتر",1],["سبايدرمان",2],["باتمان",3],["مستر بين",4],["جوكر",5],["جاك سبارو",6],["شيرلوك هولمز",7],["روكي",8],["جون ويك",9],["وولفرين",10]]},{"question":"اذكر شخصيات كرتونية مشهورة","answers":[["سبونج بوب",1],["توم",2],["جيري",3],["ميكي ماوس",4],["بطوط",5],["باغز باني",6],["سيمبا",7],["شريك",8],["غارفيلد",9],["دورا",10]]},{"question":"اذكر أبطال خارقين مشهورين","answers":[["سبايدرمان",1],["باتمان",2],["سوبرمان",3],["آيرون مان",4],["كابتن أمريكا",5],["هالك",6],["ثور",7],["وندر وومان",8],["فلاش",9],["بلاك بانثر",10]]},{"question":"اذكر أفلام ديزني مشهورة","answers":[["الأسد الملك",1],["فروزن",2],["علاء الدين",3],["الجميلة والوحش",4],["مولان",5],["موانا",6],["طرزان",7],["رابونزل",8],["سندريلا",9],["هرقل",10]]}],"أكل وطبخ":[{"question":"اذكر أكلات شعبية مشهورة","answers":[["كبسة",1],["مندي",2],["شاورما",3],["فلافل",4],["مقلوبة",5],["كبة",6],["محشي",7],["كشري",8],["مسخن",9],["فتة",10]]},{"question":"اذكر أكلات سريعة مشهورة","answers":[["برجر",1],["بيتزا",2],["شاورما",3],["بطاطس مقلية",4],["هوت دوغ",5],["بروست",6],["ناجتس",7],["ساندويتش دجاج",8],["تاكو",9],["فلافل",10]]},{"question":"اذكر حلويات مشهورة","answers":[["كنافة",1],["بقلاوة",2],["تشيز كيك",3],["دونات",4],["براونيز",5],["آيس كريم",6],["كيكة شوكولاتة",7],["أم علي",8],["لقيمات",9],["كريم كراميل",10]]},{"question":"اذكر مشروبات مشهورة","answers":[["ماء",1],["قهوة",2],["شاي",3],["عصير برتقال",4],["مشروبات غازية",5],["حليب",6],["موهيتو",7],["عصير مانجو",8],["قهوة مثلجة",9],["شوكولاتة ساخنة",10]]},{"question":"اذكر أشياء تلقاها في المطبخ","answers":[["ثلاجة",1],["فرن",2],["قدر",3],["سكين",4],["ملعقة",5],["صحن",6],["كوب",7],["مقلاة",8],["خلاط",9],["لوح تقطيع",10]]}],"تقنية":[{"question":"اذكر شركات تقنية مشهورة","answers":[["أبل",1],["سامسونج",2],["جوجل",3],["مايكروسوفت",4],["سوني",5],["هواوي",6],["شاومي",7],["إل جي",8],["لينوفو",9],["ديل",10]]},{"question":"اذكر تطبيقات جوال مشهورة","answers":[["واتساب",1],["يوتيوب",2],["إنستغرام",3],["تيك توك",4],["سناب شات",5],["إكس",6],["تيليجرام",7],["فيسبوك",8],["خرائط جوجل",9],["سبوتيفاي",10]]},{"question":"اذكر أجهزة إلكترونية نستخدمها كثير","answers":[["جوال",1],["تلفزيون",2],["لابتوب",3],["كمبيوتر",4],["سماعات",5],["ساعة ذكية",6],["جهاز لوحي",7],["بلايستيشن",8],["راوتر",9],["كاميرا",10]]},{"question":"اذكر أشياء تستخدم الإنترنت","answers":[["الجوال",1],["الكمبيوتر",2],["التلفزيون الذكي",3],["اللابتوب",4],["البلايستيشن",5],["الجهاز اللوحي",6],["الساعة الذكية",7],["الكاميرا",8],["الطابعة",9],["السيارة",10]]},{"question":"اذكر أشياء تشحنها بالكهرباء","answers":[["الجوال",1],["اللابتوب",2],["السماعات",3],["الساعة الذكية",4],["الجهاز اللوحي",5],["يد البلايستيشن",6],["الباور بانك",7],["الكاميرا",8],["المكنسة اللاسلكية",9],["الدراجة الكهربائية",10]]}],"ألعاب فيديو":[{"question":"اذكر ألعاب فيديو مشهورة","answers":[["ماينكرافت",1],["فورتنايت",2],["قراند",3],["فيفا",4],["كول أوف ديوتي",5],["ببجي",6],["روبلوكس",7],["روكت ليق",8],["فالورانت",9],["أوفرواتش",10]]},{"question":"اذكر أجهزة ألعاب مشهورة","answers":[["بلايستيشن",1],["إكس بوكس",2],["نينتندو سويتش",3],["كمبيوتر",4],["بلايستيشن 5",5],["بلايستيشن 4",6],["إكس بوكس سيريس إكس",7],["نينتندو وي",8],["ستيم ديك",9],["بلايستيشن 3",10]]},{"question":"اذكر شخصيات ألعاب مشهورة","answers":[["ماريو",1],["سونيك",2],["كريتوس",3],["سبايدرمان",4],["لارا كروفت",5],["ناثان دريك",6],["ستيف",7],["بيكاتشو",8],["ليون",9],["جيرالت",10]]},{"question":"اذكر أنواع ألعاب فيديو مشهورة","answers":[["أكشن",1],["كرة قدم",2],["سباقات",3],["إطلاق نار",4],["رعب",5],["مغامرات",6],["عالم مفتوح",7],["قتال",8],["ألغاز",9],["محاكاة",10]]},{"question":"اذكر أشياء يحتاجها القيمر","answers":[["شاشة",1],["يد تحكم",2],["سماعة",3],["جهاز ألعاب",4],["إنترنت",5],["كرسي",6],["كيبورد",7],["ماوس",8],["مايكروفون",9],["طاولة",10]]}],"مشاهير سعوديين":[{"question":"اذكر مشاهير سعوديين في الغناء","answers":[["محمد عبده",1],["عبدالمجيد عبدالله",2],["راشد الماجد",3],["رابح صقر",4],["خالد عبدالرحمن",5],["عبادي الجوهر",6],["طلال سلامة",7],["داليا مبارك",8],["عايض",9],["زينة عماد",10]]},{"question":"اذكر لاعبين كرة قدم سعوديين مشهورين","answers":[["سالم الدوسري",1],["ياسر القحطاني",2],["محمد الدعيع",3],["سامي الجابر",4],["ماجد عبدالله",5],["محمد نور",6],["تيسير الجاسم",7],["فهد المولد",8],["سعود عبدالحميد",9],["صالح الشهري",10]]},{"question":"اذكر ممثلين سعوديين مشهورين","answers":[["ناصر القصبي",1],["عبدالله السدحان",2],["حبيب الحبيب",3],["فايز المالكي",4],["إبراهيم الحساوي",5],["أسعد الزهراني",6],["يوسف الجراح",7],["عبدالإله السناني",8],["محمد الطويان",9],["راشد الشمراني",10]]},{"question":"اذكر مشاهير سعوديين في السوشيال ميديا","answers":[["أحمد الشقيري",1],["يزيد الراجحي",2],["نايف حمدان",3],["صالح الزهراني",4],["عبدالرحمن المطيري",5],["فهد سال",6],["مشعل خلف",7],["منصور الرقيبة",8],["سعود القحطاني",9],["عبدالله الودعاني",10]]},{"question":"اذكر شخصيات سعودية معروفة في الرياضة","answers":[["يزيد الراجحي",1],["ماجد عبدالله",2],["سامي الجابر",3],["ياسر القحطاني",4],["سالم الدوسري",5],["محمد الدعيع",6],["محمد نور",7],["هتان السيف",8],["طارق حامدي",9],["دنيا أبوطالب",10]]}],"ثقافة عامة":[{"question":"اذكر أشياء تستخدمها يوميًا","answers":[["الجوال",1],["الماء",2],["السيارة",3],["الإنترنت",4],["المفتاح",5],["الساعة",6],["القلم",7],["الكوب",8],["الشاحن",9],["النظارة",10]]},{"question":"اذكر أشياء تلقاها في البيت","answers":[["تلفزيون",1],["ثلاجة",2],["سرير",3],["كنبة",4],["طاولة",5],["كرسي",6],["مكيف",7],["غسالة",8],["مرآة",9],["سجادة",10]]},{"question":"اذكر أشياء تأخذها معك إذا طلعت من البيت","answers":[["الجوال",1],["المحفظة",2],["المفاتيح",3],["بطاقة البنك",4],["النظارة",5],["الساعة",6],["الشاحن",7],["سماعات",8],["مناديل",9],["عطر",10]]},{"question":"اذكر أشياء لونها غالبًا أبيض","answers":[["الحليب",1],["الثلج",2],["السكر",3],["الملح",4],["الورق",5],["القطن",6],["الأرز",7],["الأسنان",8],["السحاب",9],["الدقيق",10]]},{"question":"اذكر أشياء ممكن تلقاها في السيارة","answers":[["مقود",1],["مقاعد",2],["حزام أمان",3],["مرآة",4],["مكيف",5],["شاشة",6],["شاحن",7],["مناديل",8],["نظارة شمسية",9],["ماء",10]]}],"حيوانات":[{"question":"اذكر حيوانات تعيش في البر","answers":[["أسد",1],["فيل",2],["زرافة",3],["نمر",4],["ذئب",5],["غزال",6],["دب",7],["قرد",8],["ضبع",9],["وحيد القرن",10]]},{"question":"اذكر حيوانات تعيش في البحر","answers":[["سمك",1],["قرش",2],["حوت",3],["دولفين",4],["أخطبوط",5],["سلحفاة بحرية",6],["سرطان البحر",7],["قنديل البحر",8],["فرس البحر",9],["نجم البحر",10]]},{"question":"اذكر حيوانات يمكن تربيتها في البيت","answers":[["قط",1],["كلب",2],["طيور",3],["سمك",4],["أرنب",5],["هامستر",6],["سلحفاة",7],["ببغاء",8],["دجاج",9],["بط",10]]},{"question":"اذكر حيوانات سريعة","answers":[["فهد",1],["حصان",2],["غزال",3],["نمر",4],["أسد",5],["ذئب",6],["نعامة",7],["أرنب",8],["كلب",9],["ظبي",10]]},{"question":"اذكر حيوانات يخاف منها الناس","answers":[["أسد",1],["ثعبان",2],["قرش",3],["تمساح",4],["نمر",5],["عقرب",6],["ذئب",7],["دب",8],["ضبع",9],["عنكبوت",10]]}]};
const hostCategoryList=[
"سيارات","السعودية","كرة قدم","جغرافيا","أديان وإسلاميات","أفلام ومسلسلات",
"أكل وطبخ","تقنية","ألعاب فيديو","مشاهير سعوديين","ثقافة عامة","حيوانات"
];

function getRound(cat,usedQuestions={}){
 const list=bank[cat];
 if(!list||!list.length){
   return {question:`اذكر 10 أشياء مرتبطة بفئة ${cat}`,answers:Array.from({length:10},(_,i)=>[`إجابة ${i+1}`,10-i])};
 }

 const usedRaw=Array.isArray(usedQuestions?.[cat])?usedQuestions[cat]:[];
 const used=[...new Set(usedRaw.filter(Boolean))];
 let available=list.filter(q=>!used.includes(q.question));

 // لا يتكرر أي سؤال حتى تنتهي أسئلة الفئة كلها.
 // وعند بدء دورة جديدة لا نعيد آخر سؤال ظهر مباشرة.
 if(!available.length){
   const lastQuestion=usedRaw.length?usedRaw[usedRaw.length-1]:null;
   available=lastQuestion?list.filter(q=>q.question!==lastQuestion):list;
   if(!available.length)available=list;
 }

 return structuredClone(available[Math.floor(Math.random()*available.length)]);
}
if(!session){$("badSession").classList.remove("hidden")}else{
 gameRef=ref(db,`top10/sessions/${session}`);
 onValue(gameRef,async snap=>{
  const g=snap.val();
  if(!g){$("badSession").classList.remove("hidden");return}
  state=g;applyTheme(g.theme);$("connectionBadge").textContent=`متصل — ${session}`;$("connectionBadge").classList.add("ok");
  if(!g.hostConnected)await update(gameRef,{hostConnected:true,hostConnectedAt:Date.now()});
  render(g);
 });
}
function renderHostRedraft(g){
 const picks=g.picks||[];
 const turn=g.pickTurn||1;
 const who=turn===1?g.team1:g.team2;
 const used=picks.map(p=>p.category);

 $("hostRedraftTurn").textContent=`الدور على ${who}`;
 $("hostRedraftProgress").textContent=`اختيار ${picks.length+1} من ${g.roundCount}`;

 $("hostRedraftCategories").innerHTML=hostCategoryList.map(cat=>`
   <button class="host-redraft-category ${used.includes(cat)?"used":""}" data-cat="${cat}" ${used.includes(cat)?"disabled":""}>
     <b>${cat}</b>
   </button>
 `).join("");

 document.querySelectorAll(".host-redraft-category:not(:disabled)").forEach(btn=>{
   btn.onclick=async()=>{
     if(!state||state.status!=="redraft")return;
     const currentPicks=state.picks||[];
     if(currentPicks.some(p=>p.category===btn.dataset.cat))return;

     const owner=state.pickTurn||1;
     const nextPicks=[...currentPicks,{category:btn.dataset.cat,owner}];

     if(nextPicks.length>=state.roundCount){
       await update(gameRef,{
         picks:nextPicks,
         pickTurn:owner,
         status:"pairing",
         score1:0,score2:0,
         hints1:0,hints2:0,
         streak1:0,streak2:0,
         wrong1:0,wrong2:0,
         locked1:false,locked2:false,
         roundClosed:false,
         winner:null,
         updatedAt:Date.now()
       });
     }else{
       await update(gameRef,{
         picks:nextPicks,
         pickTurn:owner===1?2:1,
         updatedAt:Date.now()
       });
     }
   };
 });
}

function render(g){
 ["readyHost","controlHost","finishHost","badSession"].forEach(id=>$(id).classList.add("hidden"));
 $("hostRedraftPicker").classList.add("hidden");
 if(g.status==="pairing"){
  $("readyHost").classList.remove("hidden");
  $("startGameBtn").classList.remove("hidden");
  $("readyTitle").textContent=`${g.team1} ضد ${g.team2}`;
  const p1=(g.picks||[]).filter(p=>p.owner===1),p2=(g.picks||[]).filter(p=>p.owner===2);
  $("readyPicks").innerHTML=`<div><b>${g.team1}</b><div>${chips(p1)}</div></div><div><b>${g.team2}</b><div>${chips(p2)}</div></div>`;
 }else if(g.status==="redraft"){
  $("readyHost").classList.remove("hidden");
  $("startGameBtn").classList.add("hidden");
  $("hostRedraftPicker").classList.remove("hidden");
  $("readyTitle").textContent="اختر فئات الجولة الجديدة";
  $("readyPicks").innerHTML="";
  renderHostRedraft(g);
 }else if(g.status==="game"){
  $("controlHost").classList.remove("hidden");renderControl(g);
 }else if(g.status==="finished"){
  $("finishHost").classList.remove("hidden");
  const draw=g.winner==="تعادل";
  $("hostWinner").textContent=draw?"تعادل!":`${g.winner} فاز!`;
  $("hostWinnerSubtitle").textContent=draw?"مباراة قوية وانتهت بالتعادل":"مبروك للفريق الفائز!";
  $("hostFinalTeam1Name").textContent=g.team1;
  $("hostFinalTeam2Name").textContent=g.team2;
  $("hostFinalTeam1Score").textContent=g.score1||0;
  $("hostFinalTeam2Score").textContent=g.score2||0;
  $("hostFinalScore").textContent=`${g.team1} ${g.score1||0} — ${g.score2||0} ${g.team2}`;
  $("hostFinalTeam1Card").classList.toggle("winner",!draw&&g.winner===g.team1);
  $("hostFinalTeam2Card").classList.toggle("winner",!draw&&g.winner===g.team2);
  $("finishHost").classList.toggle("is-draw",draw);
 }
}
function chips(a){return a.length?a.map(x=>`<span>${x.category}</span>`).join(""):"—"}
$("startGameBtn").onclick=async()=>{await startRound({...state,currentRoundIndex:0,score1:0,score2:0})};
async function startRound(g){
 const pick=g.picks[g.currentRoundIndex];
 const usedQuestions={...(g.usedQuestions||{})};
 const before=Array.isArray(usedQuestions[pick.category])?[...usedQuestions[pick.category]]:[];
 const rd=getRound(pick.category,usedQuestions);

 // بعد استهلاك الخمسة، نبدأ دورة جديدة بدون تكرار داخل الدورة الجديدة.
 const categoryBank=bank[pick.category]||[];
 const cycleWasFull=categoryBank.length>0 && before.length>=categoryBank.length;
 usedQuestions[pick.category]=cycleWasFull?[rd.question]:[...before,rd.question];

 await update(gameRef,{status:"game",currentRoundIndex:g.currentRoundIndex,currentCategory:pick.category,currentOwner:pick.owner,currentQuestion:rd.question,usedQuestions,currentHint:"",activeHint:null,activeHints:[],hintUseCount:0,currentAnswers:rd.answers.map(([text,points],i)=>({text,points,index:i,revealed:false,claimedBy:null})),score1:g.score1||0,score2:g.score2||0,hints1:0,hints2:0,streak1:0,streak2:0,wrong1:0,wrong2:0,locked1:false,locked2:false,roundClosed:false,answerTurn:pick.owner,revealEvent:null,wrongEvent:null,hintEarnedEvent:null,hintUsedEvent:null,updatedAt:Date.now()});
}

let localActionLockUntil=0;
let actionUnlockTimer=null;

function actionLockRemaining(g){
 const eventTime=Math.max(
   Number(g?.revealEvent?.id)||0,
   Number(g?.wrongEvent?.id)||0,
   localActionLockUntil-5000
 );
 return Math.max(0,eventTime+5000-Date.now(),localActionLockUntil-Date.now());
}

function beginActionLock(){
 localActionLockUntil=Date.now()+5000;
 clearTimeout(actionUnlockTimer);
 actionUnlockTimer=setTimeout(()=>{
   localActionLockUntil=0;
   if(state?.status==="game")renderControl(state);
 },5050);
}

function scheduleActionUnlock(g){
 const remaining=actionLockRemaining(g);
 clearTimeout(actionUnlockTimer);
 if(remaining>0){
   actionUnlockTimer=setTimeout(()=>{
     if(state?.status==="game")renderControl(state);
   },remaining+60);
 }
 return remaining>0;
}

function renderControl(g){
 $("hostRoundLabel").textContent=`الجولة ${g.currentRoundIndex+1} من ${g.roundCount}`;$("hostCategory").textContent=g.currentCategory;$("hostQuestion").textContent=g.currentQuestion;
 $("hostName1").textContent=g.team1;$("hostName2").textContent=g.team2;$("hostScore1").textContent=g.score1||0;$("hostScore2").textContent=g.score2||0;$("hostTurnName").textContent=g.roundClosed?"انتهت المحاولات":(g.answerTurn===1?g.team1:g.team2);
 $("hostWrong1").textContent=`${g.wrong1||0}/3`;
 $("hostWrong2").textContent=`${g.wrong2||0}/3`;
 $("hostTeamCard1").classList.toggle("locked-team",!!g.locked1);
 $("hostTeamCard2").classList.toggle("locked-team",!!g.locked2);

 $("controlHost").dataset.turn=String(g.answerTurn||1);
 $("hintTeam1Name").textContent=g.team1;$("hintTeam2Name").textContent=g.team2;
 $("hintCount1").textContent="0";$("hintCount2").textContent="0";
 $("useHint1").disabled=true;
 $("useHint2").disabled=true;
 $("hostAnswers").innerHTML=(g.currentAnswers||[]).map((a,i)=>{
   const ownerClass=a.claimedBy===1?"claimed-team1":a.claimedBy===2?"claimed-team2":a.revealed?"claimed-none":"";
   return `<button class="host-answer ${a.revealed?"used":""} ${ownerClass}" data-i="${i}"><span class="n">${i+1}</span><b>${a.text}</b><span class="p">${a.points}</span></button>`;
 }).join("");
 const interactionLocked=scheduleActionUnlock(g);
 document.querySelectorAll(".host-answer:not(.used)").forEach(b=>{
   b.disabled=interactionLocked;
   b.onclick=()=>reveal(+b.dataset.i);
 });
 const allOpened=(g.currentAnswers||[]).every(a=>a.revealed);
 const noTeamCanAnswer=!!g.locked1&&!!g.locked2;
 $("nextRoundBtn").classList.toggle("hidden",!(allOpened||noTeamCanAnswer));
 $("wrongBtn").disabled=interactionLocked||allOpened||(g.answerTurn===1?!!g.locked1:!!g.locked2)||noTeamCanAnswer;
}
function nextAvailableTurn(current,g){
 const other=current===1?2:1;
 const otherLocked=other===1?g.locked1:g.locked2;
 const currentLocked=current===1?g.locked1:g.locked2;
 if(!otherLocked)return other;
 if(!currentLocked)return current;
 return current;
}

async function reveal(i){
 if(actionLockRemaining(state)>0)return;
 const a=[...(state.currentAnswers||[])];
 if(!a[i]||a[i].revealed)return;

 const team=state.answerTurn;
 if((team===1&&state.locked1)||(team===2&&state.locked2))return;

 a[i]={...a[i],revealed:true,claimedBy:team};
 const pts=a[i].points;

 const patch={
   currentAnswers:a,
   score1:(state.score1||0)+(team===1?pts:0),
   score2:(state.score2||0)+(team===2?pts:0),
   revealEvent:{id:Date.now(),text:a[i].text,points:pts},
   wrongEvent:null,
   activeHint:null,
   activeHints:[],
   hintUseCount:0,
   updatedAt:Date.now()
 };

 patch.streak1=0;
 patch.streak2=0;
 patch.hints1=0;
 patch.hints2=0;
 patch.hintEarnedEvent=null;
 patch.hintUsedEvent=null;

 const merged={...state,...patch};
 patch.answerTurn=nextAvailableTurn(team,merged);
 beginActionLock();
 renderControl(state);
 await update(gameRef,patch);
}
$("wrongBtn").onclick=async()=>{
 if(actionLockRemaining(state)>0)return;
 if((state.currentAnswers||[]).every(a=>a.revealed))return;
 const team=state.answerTurn;
 if((team===1&&state.locked1)||(team===2&&state.locked2))return;

 const patch={
   wrongEvent:{id:Date.now()},
   revealEvent:null,
   updatedAt:Date.now()
 };

 if(team===1){
   const wrong=Math.min(3,(state.wrong1||0)+1);
   patch.wrong1=wrong;
   patch.locked1=wrong>=3;
   patch.streak1=0;
 }else{
   const wrong=Math.min(3,(state.wrong2||0)+1);
   patch.wrong2=wrong;
   patch.locked2=wrong>=3;
   patch.streak2=0;
 }

 const merged={...state,...patch};

 if(merged.locked1&&merged.locked2){
   patch.currentAnswers=(state.currentAnswers||[]).map(a=>a.revealed?a:{...a,revealed:true,claimedBy:0});
   patch.activeHint=null;
   patch.activeHints=[];
   patch.hintUseCount=0;
   patch.autoRevealEvent={id:Date.now()};
   patch.roundClosed=true;
 }else{
   patch.answerTurn=nextAvailableTurn(team,merged);
 }

 beginActionLock();
 renderControl(state);
 await update(gameRef,patch);
};
let pendingHintTeam=null;

function buildAnswerClue(answer,index){
 const text=String(answer||"").trim();
 const first=text.charAt(0)||"؟";
 const len=text.replace(/\s/g,"").length;
 const words=text.split(/\s+/).filter(Boolean).length;
 if(words>1){
   return `الإجابة رقم ${index+1}: تتكون من ${words} كلمات، وأول حرف هو «${first}».`;
 }
 return `الإجابة رقم ${index+1}: تبدأ بحرف «${first}» وعدد حروفها ${len}.`;
}

function openHintAnswerPicker(team){
 return;
}

async function useHintOnAnswer(team,index){
 return;
}

async function useHint(team){
 openHintAnswerPicker(team);
}
$("useHint1").onclick=()=>useHint(1);
$("useHint2").onclick=()=>useHint(2);
$("closeHintAnswer").onclick=()=>$("hintAnswerModal").classList.add("hidden");
$("hintAnswerModal").addEventListener("click",e=>{
 if(e.target===$("hintAnswerModal"))$("hintAnswerModal").classList.add("hidden");
});
$("newGameBtn").onclick=async()=>{
 if(!state)return;
 await update(gameRef,{
   status:"redraft",
   picks:[],
   pickTurn:1,
   currentRoundIndex:0,
   score1:0,score2:0,
   hints1:0,hints2:0,
   streak1:0,streak2:0,
   wrong1:0,wrong2:0,
   locked1:false,locked2:false,
   roundClosed:false,
   activeHint:null,activeHints:[],
   revealEvent:null,wrongEvent:null,
   hintEarnedEvent:null,hintUsedEvent:null,
   winner:null,
   updatedAt:Date.now()
 });
};

$("nextRoundBtn").onclick=async()=>{
 const next=state.currentRoundIndex+1;
 if(next>=state.roundCount){const w=state.score1>state.score2?state.team1:state.score2>state.score1?state.team2:"تعادل";await update(gameRef,{status:"finished",winner:w,updatedAt:Date.now()});return}
 await startRound({...state,currentRoundIndex:next});
};
