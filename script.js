

const firebaseConfig = {
  apiKey: "AIzaSyCzvg6chpSyNPGm_rS8F83Ig8WLhD3pxr8",
  authDomain: "zamn-games.firebaseapp.com",
  databaseURL: "https://zamn-games-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zamn-games",
  storageBucket: "zamn-games.firebasestorage.app",
  messagingSenderId: "171536871956",
  appId: "1:171536871956:web:4a1a8c1986bf4ecd63ed01"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const games = [

{











  id:1,
  slug:"horof-bell",
  code:"1950",
  name:"حروف والوف مع جرس مدمج",
  image:"https://i.postimg.cc/HxwQWmFr/image-(1).jpg",


screenshots: [
    "/screenshots/horof/1.webp",
  "/screenshots/horof/2.webp",

  "/screenshots/horof/3.webp",
  "/screenshots/horof/4.webp",
  "/screenshots/horof/5.webp",
],

  rating:"5",
  description:"لعبة حروف تفاعلية للمتصفح بدون تحميل. تنافس مع أصدقائك في تكوين الكلمات وتحقيق أعلى النقاط في جو مليء بالحماس والتحدي.",
  reviews:[
    { name:" علي الكاف ",stars:"⭐⭐⭐⭐⭐", comment:" " },
    { name:" عمار يحيى  ",stars:"⭐⭐⭐⭐⭐", comment:" " },
    { name:"  Lory Az ",stars:"⭐⭐⭐⭐⭐", comment:" " },

    { name:" salem bandr  ",stars:"⭐⭐⭐⭐⭐", comment:" " }

  ],
   players:"تدعم الجوال",

  category:"لعبة جماعية",
questions:"أكثر من 2000 سؤال",
    badge:"جرس مدمج  ",
  status:"متاحة الآن",
price:"12.99 ريال",
priceValue:12.99,
priceCurrency:"SAR",
  buyLink:"https://zamn1.com/%D8%B3%D8%A8%D8%A7%D9%82-%D8%A7%D9%84%D8%AD%D8%B1%D9%88%D9%81-%D8%AD%D8%B1%D9%88%D9%81-%D9%85%D8%B9-%D8%B9%D8%B2%D9%8A%D8%B2-%D8%A7%D9%84%D9%86%D8%B3%D8%AE%D8%A9-%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9/p769912795",
  playLink:"https://asdfrrrr444.oneapp.dev/",
  trialKey:"trial_letters_1"

 
},



{
  id:2,
  slug:"horof",
  code:"19050",
  name:"حروف والوف ",
  image:"https://i.postimg.cc/kgRSbkTC/2222222.webp",

screenshots: [
  "/screenshots/horof-bell/1.webp",
  "/screenshots/horof-bell/2.webp",
  "/screenshots/horof-bell/3.webp",
  "/screenshots/horof-bell/4.webp"
],
  rating:"5",
  description:"الجزء الثاني من لعبة حروف والوف بتحديات جديدة وجو جماعي ممتع.",
  reviews:[
        { name:"R لمياء", stars:"⭐⭐⭐⭐⭐", comment:"تعاملهم جدا جميل وسرعين بالرد 👍🏻" },
        { name:" yomn Abodalkarem", stars:"⭐⭐⭐⭐⭐", comment:"لعبة رائعة ممتعة" },
        { name:"عبدالعزيز خلف خلف", stars:"⭐⭐⭐⭐⭐", comment:"جامد " },
        { name:"نسرين القحطاني", stars:"⭐⭐⭐⭐⭐", comment:"" },
        { name:"J***** A*****", stars:"⭐⭐⭐⭐⭐", comment:"" },

  ],
  category:"لعبة جماعية",
 players:"٢+ لاعبين",
questions:"أكثر من 2000 سؤال",
  status:"متاحة الآن",
price:"4.99 ريال",
priceValue:4.99,
priceCurrency:"SAR",
  buyLink:"https://zamn1.com/%D8%AD%D8%B1%D9%88%D9%81-%D9%85%D8%B9-%D8%B9%D8%B2%D9%8A%D8%B2-%D8%A7%D9%88-%D8%AD%D8%B1%D9%88%D9%81-%D9%88-%D8%A7%D9%84%D9%88%D9%81/p967171060",
  playLink: "https://5rof.oneapp.dev/",
    trialKey:"trial_letters_2"
},

{
  id:3,
  slug:"photos-1",
  code:"1950",
  name:"تحدي الصور الجزء الاول ",
image:"https://i.postimg.cc/wMkRQmr5/alawl-bʿd-alatar.webp",
 
  rating:"4.6",
  description:"تقدر تجيب الحل بسرعة؟  تعرّف على الصور الغامضة وتحدَّ أصدقاءك في لعبة بصرية ممتعة. متعة ومنافسة تعتمد على دقة الملاحظة وسرعة البديهة.",

  reviews:[
    { name:"ابراهيم اليامي", stars:"⭐⭐⭐⭐⭐", comment:"امانه توي شريت والرجال جدا محترم و الالعاب جميله" },
    { name:"ابو سلطان", stars:"⭐⭐⭐⭐⭐", comment:"" },
        { name:" Basma Ahmed", stars:"⭐⭐⭐⭐⭐", comment:"" },
   { name:"احمد القحطاني ", stars:"⭐⭐⭐⭐⭐", comment:"" }

     ],   


  category:"تحديات",
  players:"٢+ لاعبين",
    badge:"الغاز بصريه",
  status:"متاحة الآن",
price:"4.99 ريال",
priceValue:4.99,
priceCurrency:"SAR",
  buyLink:"https://zamn1.com/%D8%AA%D8%AD%D8%AF%D9%8A-%D8%AE%D9%85%D9%86-%D8%A7%D9%84%D8%B5%D9%88%D8%B1%D9%87-%D8%A7%D8%A8%D9%88-%D8%B9%D9%85%D8%B1/p1919105503",
  playLink:"https://tpvdhgwmn.oneapp.dev/",
  trialKey:"trial_photos_1"
},

{
  id:4,
  slug:"photos-2",
  code:"1850",
  name:"تحدي الصور الجزء الثاني",
image:"https://i.postimg.cc/rF8rFfdZ/althany-bʿd-alatar.webp",
 
  rating:"4.8",
description:"تحدي الصور الجزء الثاني لعبة جماعية تحتوي على صور وألغاز جديدة لاختبار سرعة الملاحظة والتخمين، مناسبة للعائلة والأصدقاء وتعمل مباشرة من المتصفح.",
  reviews:[
    { name:"عمار يحيى", stars:"⭐⭐⭐⭐⭐", comment:"" },
    { name:" راكان عسيري", stars:"⭐⭐⭐⭐⭐", comment:"" }
  ],
  category:"تحديات",
  players:"2 - 15",
    badge:"الغاز بصريه",
  status:"متاحة الآن",
price:"7.5 ريال",
priceValue:7.5,
priceCurrency:"SAR",
  buyLink:"https://zamn1.com/%D8%AA%D8%AD%D8%AF%D9%8A-%D8%A7%D9%84%D8%B5%D9%88%D8%B1-%D8%A7%D9%84%D8%AC%D8%B2%D8%A1-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A/p893537775",
   playLink:  "https://191919jsjs.oneapp.dev/",
  trialKey:"trial_photos_2"
},

{
  id:5,
  slug:"photos-3",
  code:"17007",
  name:"تحدي الصور الجزء الثالث",
image:"https://i.postimg.cc/5NxCNsH7/althalth-bʿd-azalh-alatar.webp",
  
  rating:"4.9",
  description:"الجزء الثالث من تحدي الصور بتحديات أكثر وحماس أعلى.",
  reviews:[
    
  ],
  category:"تحديات",
  players:"2 - 15",
    badge:"الغاز بصريه",
  status:"متاحة الآن",
price:"9.99 ريال",
priceValue:9.99,
priceCurrency:"SAR",
  buyLink:"https://zamn1.com/%D8%AA%D8%AD%D8%AF%D9%8A-%D8%A7%D9%84%D8%B5%D9%88%D8%B1-%D8%A7%D9%84%D8%AC%D8%B2%D8%A1-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB/p130244934",
   playLink: "https://asddsafg.oneapp.dev/",
  trialKey:"trial_photos_3"
},

{
  id:6,
  slug:"family-feud",
  code:"19009",
  name:"فاميلي فيود",
image:"https://i.postimg.cc/PxsWkJVD/famyly.jpg",
 screenshots: [
  "/screenshots/family-feud/1.webp",
  "/screenshots/family-feud/2.webp"
],
  rating:"5.0",
  description:"لعبة فاميلي فيود التفاعلية للمتصفح بدون تحميل. تنافس مع عائلتك وأصدقائك في تخمين الإجابات الأكثر شيوعاً في جو مليء بالحماس والضحك.",
  reviews:[
    { name:"محمد", stars:"⭐⭐⭐⭐⭐", comment:"" },
    { name:"عبدالوهاب الوادعي", stars:"⭐⭐⭐⭐⭐", comment:"" },
    { name:"راكان عسيري", stars:"⭐⭐⭐⭐⭐", comment:"" },
    { name:"فارس البرغش", stars:"⭐⭐⭐⭐⭐", comment:"" },

  ],
  category:"عائلية",
  players:"٢+ لاعبين",
    badge:"تحدي التخمين",
  status:"متاحة الآن",
price:"4.99 ريال",
priceValue:4.99,
priceCurrency:"SAR",
  buyLink:"https://zamn1.com/%D9%81%D8%A7%D9%85%D9%8A%D9%84%D9%8A-%D9%81%D9%8A%D9%88%D8%AF/p1311241515",
  playLink:"https://familyfeud0.oneapp.dev/",
  trialKey:"trial_family_1"
},

{
  id:7,
  slug:"fawazeer",
  code:"20026",
  name:"فوازير ",
image:"https://i.postimg.cc/7PBx09tP/dwn-ʿnwan-(1280-x-960-byksl).webp",
  screenshots: [
  
   "/screenshots/fawazeer/1.webp",
  "/screenshots/fawazeer/2.webp",
      "/screenshots/fawazeer/3.webp"

  ],
  rating:"4.7",
  description:"لعبة فوازير تفاعلية للمتصفح بدون تحميل. تنافس مع أصدقائك في حل الفوازير والأسئلة الممتعة مع بطاقات خاصة وجو مليء بالحماس.",
  reviews:[
    { name:"مشاري التويم", stars:"⭐⭐⭐⭐⭐", comment:"اسئلة حلوة وخفيفه" },
        { name:"عبدالهادي الوادعي", stars:"⭐⭐⭐⭐⭐", comment:" "},
    { name:"عمار يحيى", stars:"⭐⭐⭐⭐⭐", comment:"" }
  ],
  category:"ثقافية",
  players:"فوازير وأسئلة",
    badge:"٢+ لاعبين",
  status:"متاحة الآن",
price:"7.99 ريال",
priceValue:7.99,
priceCurrency:"SAR",
  buyLink:"https://zamn1.com/%D9%81%D9%88%D8%A7%D8%B2%D9%8A%D8%B1-%D8%A7%D8%A8%D9%88-%D8%B9%D9%85%D8%B1/p1743830549",
  playLink:"https://fwazer.oneapp.dev/",
  trialKey:"trial_questions_1"
},

{
  id:8,
  slug:"guess-link",
  code:"20066",
  name:"خمن الرابط",
image:"https://i.postimg.cc/zBZC1v2v/rbt.jpg",




screenshots: [
  "/screenshots/guess-link/1.webp",
  "/screenshots/guess-link/2.webp",
  "/screenshots/guess-link/3.webp",
  "/screenshots/guess-link/4.webp"
],

  rating:"4.9",
description:"لعبة جماعية تعتمد على ربط الصور وتخمين الإجابة الصحيحة بأسرع وقت قبل الفريق المنافس.",
  reviews:[
    { name:"سلمان", stars:"⭐⭐⭐⭐⭐", comment:"فكرة اللعبة رهيبة وممتعة." },
    { name:"نورة", stars:"⭐⭐⭐⭐⭐", comment:"مناسبة للجلسات والتحديات." }
  ],
  category:"تحديات",
  players:"٢+ لاعبين",
    badge:"تجميع الصور",
status:"متاحة الآن",
price:"4.99 ريال",
priceValue:4.99,
priceCurrency:"SAR",
  buyLink:"https://zamn1.com/%D8%AA%D8%AD%D8%AF%D9%8A-%D8%AE%D9%85%D9%86-%D8%A7%D9%84%D8%B1%D8%A7%D8%A8%D8%B7/p1190070368",
  playLink:"https://rb60.oneapp.dev/",
  trialKey:"trial_guess_link_1"
}




,
{
  id: 9,
  slug: "alatrash",
  code: "140004",
name: "مين الأطرش في الزفة",
  image: "https://i.postimg.cc/7683yhtb/alatrsh-qbl-aldght.jpg",

screenshots: [
  "/screenshots/alatrash/1.webp",
  "/screenshots/alatrash/2.webp",
  "/screenshots/alatrash/3.webp",
  "/screenshots/alatrash/4.webp",
  "/screenshots/alatrash/5.webp"
],
  rating: "5.0",

  description: "لعبة تحرٍ اجتماعية مليئة بالضحك والذكاء، وتُعد نسخة محسنة من فكرة “برا السالفة”. يحصل أحد اللاعبين على سؤال مختلف دون أن يعلم، بينما يحاول الجميع كشفه من خلال إجاباته وتصرفاته. مناسبة لـ 3 لاعبين فأكثر، وتضمن جلسات مليئة بالحماس والمواقف المضحكة.",

  reviews: [],

category:"5 - 20 دقيقة",
  players: "٣+ لاعبين",
  badge: "كتابة ",
  status: "متاحة الآن",

price:"7.99 ريال",
priceValue:7.99,
priceCurrency:"SAR",

  buyLink: "https://zamn1.com/%D8%A7%D9%84%D8%A3%D8%B7%D8%B1%D8%B4-%D9%81%D9%8A-%D8%A7%D9%84%D8%B2%D9%81%D8%A9-%7C-%D9%84%D8%B9%D8%A8%D8%A9-%D8%AC%D9%85%D8%A7%D8%B9%D9%8A%D8%A9/p2017869223",

  playLink: "https://alatrash.oneapp.dev/",

   trialKey: "trial_new_game_9"
  }

];
















const articles = [

{
  id: 1,
  slug: "how-to-play-horof",
  title: "طريقة لعب حروف وألوف",
  description:
    "تعرف على طريقة لعب حروف وألوف، وتقسيم الفرق واحتساب النقاط وبدء التحدي مع العائلة والأصدقاء.",
  date: "2026-08-02",
  category: "شرح الألعاب",
  content: [
    "لعبة حروف وألوف من أشهر الألعاب الجماعية التي تعتمد على سرعة التفكير وسرعة الإجابة، وهي مناسبة للجلسات العائلية وتجمعات الأصدقاء.",
    "قبل بدء اللعب يتم تقسيم المشاركين إلى فريقين أو أكثر، ثم يختار كل فريق حرفًا ويحاول الإجابة عن السؤال المرتبط به خلال الوقت المحدد.",
    "كل إجابة صحيحة تمنح الفريق نقطة، ويستمر التحدي حتى انتهاء جميع الحروف أو الوصول إلى عدد النقاط المتفق عليه بين اللاعبين.",
    "يمكن تشغيل اللعبة مباشرة من المتصفح على الجوال أو الكمبيوتر، كما يمكن عرضها على شاشة التلفزيون لتكون التجربة أكثر متعة لجميع المشاركين.",
    "تحتوي اللعبة على مئات الأسئلة المتنوعة التي تجعل كل جولة مختلفة عن الأخرى، لذلك تبقى المنافسة ممتعة حتى مع تكرار اللعب.",
    "إذا كنت تبحث عن لعبة جماعية عربية تعمل بدون تحميل وتناسب جميع الأعمار، فإن لعبة حروف وألوف من ألعاب زامن تعد خيارًا مناسبًا للجلسات العائلية والمناسبات."
  ]
},








{
  id: 2,
  slug: "ramadan-games-2026",
  title: "أفضل ألعاب رمضان 2026 للجمعات العائلية",
    description:
    "تعرف على أفضل ألعاب رمضان 2026 المناسبة للجلسات العائلية وتجمعات الأصدقاء، وتعمل مباشرة من المتصفح دون تحميل.",

  date: "2026-02-28",
  category: "ألعاب رمضان",
content: [
  "يعد شهر رمضان من أفضل الأوقات لاجتماع العائلة والأصدقاء، ولذلك يبحث الكثير عن ألعاب جماعية تضيف أجواء من المرح بعد الإفطار وأثناء السهرات.",

  "إذا كنت تبحث عن ألعاب تعمل مباشرة من المتصفح دون تحميل، فإليك أفضل 7 ألعاب مناسبة لجلسات رمضان 2026.",

  "1- حروف وألوف: لعبة تعتمد على سرعة التفكير والإجابة، وتعد من أشهر ألعاب التحدي الجماعية.",

  "2- تحدي الصور: لعبة تعتمد على سرعة الملاحظة وتخمين الصور، وتناسب جميع الأعمار.",

  "3- فاميلي فيود: حاول تخمين الإجابات الأكثر شيوعًا وتنافس مع فريقك في أجواء مليئة بالحماس.",

  "4- فوازير: مجموعة كبيرة من الأسئلة والألغاز المناسبة للسهرات الرمضانية.",

  "5- خمن الرابط: لعبة تعتمد على ربط الصور للوصول إلى الإجابة الصحيحة قبل الفريق المنافس.",

  "6- مين الأطرش في الزفة: لعبة اجتماعية مليئة بالضحك تعتمد على الذكاء والملاحظة وكشف اللاعب المختلف.",

  "7- جميع ألعاب زامن تعمل مباشرة من المتصفح ويمكن تشغيلها على الجوال أو الكمبيوتر أو شاشة التلفزيون دون الحاجة إلى تحميل أي تطبيق، مما يجعلها خيارًا مثاليًا لسهرات رمضان 2026."
]
}
];










const faqItems = [
  {
    question: "كيف أبدأ ألعب الألعاب؟",
    answer:
      "كل ما عليك هو فتح رابط الموقع من أي جهاز، سواء كان جوالًا أو جهازًا لوحيًا أو كمبيوتر، ثم تبدأ اللعب مباشرة دون الحاجة إلى تحميل أي تطبيق."
  },
  {
    question: "هل الألعاب مجانية؟",
    answer:
  "يمكنك تجربة بعض الألعاب مجانًا لمدة محدودة، وبعد انتهاء الفترة التجريبية يمكنك شراء اللعبة أو الباقة المناسبة من متجرنا."  
  },
  {
    question: "كم عدد اللاعبين المطلوب؟",
    answer:
      "معظم ألعابنا تحتاج إلى لاعبين على الأقل، بينما تتطلب بعض الألعاب عددًا أكبر، وكلما زاد عدد المشاركين أصبحت اللعبة أكثر حماسًا ومتعة."
  },
  {
    question: "هل أستطيع عرض اللعبة على التلفزيون؟",
    answer:
      "نعم، يمكنك تشغيل اللعبة على التلفزيون أو أي شاشة كبيرة، بينما يستخدم كل لاعب هاتفه للمشاركة حسب طريقة اللعبة."
  },
  {
    question: "ما الفرق بين شراء لعبة واحدة وشراء الباقة؟",
    answer:
      "عند شراء لعبة واحدة تحصل على اللعبة التي اخترتها فقط، أما الباقة فتضم عدة ألعاب بسعر أقل من شراء كل لعبة بشكل منفصل، مما يمنحك خيارات أكثر وتوفيرًا أكبر."
  },
  {
    question: "هل أحتاج إلى اشتراك شهري؟",
    answer:
      "لا، يتم الدفع مرة واحدة فقط عند شراء اللعبة، وبعدها تبقى متاحة في حسابك دون أي رسوم أو اشتراكات شهرية."
  },
  {
    question: "إذا غيرت هاتفي، هل سأفقد اللعبة؟",
    answer:
      "لا، يمكنك تسجيل الدخول من أي جهاز جديد باستخدام رقم الجوال الذي استخدمته عند الشراء، وستتمكن من الوصول إلى ألعابك."
  },
  {
    question: "كيف يمكنني التواصل مع الدعم الفني؟",
    answer:
      "يمكنك التواصل مع فريق الدعم بسهولة عبر زر واتساب الموجود أسفل الصفحة، وسنساعدك في أي استفسار أو مشكلة تواجهك."
  },
  {
    question: "هل لديكم لعبة حروف مع عزيز؟",
    answer:
      "لدينا لعبة حروف وألوف تعمل مباشرة من المتصفح دون الحاجة إلى تحميل أي تطبيق، ويمكن تشغيلها على التلفزيون واستخدامها في الجلسات والتحديات الجماعية. اللعبة مستقلة وليست إصدارًا رسميًا من برنامج حروف مع عزيز، ولا توجد أي علاقة أو شراكة بيننا وبين البرنامج أو مقدمه."
  }
];



const getGameSeoTitle = (game) => {
  const cleanName = game.name.trim();

  if (game.slug === "horof-bell") {
    return "لعبة حروف وألوف مع جرس | أكثر من 2000 سؤال - ألعاب زامن";
  }

  if (game.slug === "horof") {
    return "لعبة حروف وألوف أونلاين | أكثر من 1400 سؤال - ألعاب زامن";
  }

  if (game.slug === "photos-1") {
    return "تحدي الصور الجزء الأول | لعبة تخمين صور جماعية - ألعاب زامن";
  }

  if (game.slug === "photos-2") {
    return "تحدي الصور الجزء الثاني | ألغاز صور جماعية - ألعاب زامن";
  }

  if (game.slug === "photos-3") {
    return "تحدي الصور الجزء الثالث | لعبة صور وتخمين - ألعاب زامن";
  }

  if (game.slug === "family-feud") {
    return "لعبة فاميلي فيود أونلاين | تحدي عائلي جماعي - ألعاب زامن";
  }

  if (game.slug === "fawazeer") {
    return "لعبة فوازير وأسئلة أونلاين | ألعاب جماعية - ألعاب زامن";
  }

  if (game.slug === "guess-link") {
    return "لعبة خمن الرابط | تحدي تجميع الصور الجماعي - ألعاب زامن";
  }

  if (game.slug === "alatrash") {
    return "مين الأطرش في الزفة | لعبة جماعية مثل برا السالفة - ألعاب زامن";
  }

  return `${cleanName} | ألعاب جماعية أونلاين - ألعاب زامن`;
};

const getGameSeoDescription = (game) => {
  const cleanName = game.name.trim();

  if (game.slug === "horof-bell") {
    return "العب لعبة حروف وألوف مع جرس مدمج وأكثر من 2000 سؤال. لعبة جماعية عربية للعائلة والأصدقاء تعمل مباشرة من المتصفح بدون تحميل.";
  }

  if (game.slug === "horof") {
    return "العب لعبة حروف وألوف أونلاين مع أكثر من 1400 سؤال. لعبة جماعية مناسبة للعائلة والأصدقاء وتعمل من المتصفح بدون تحميل.";
  }

  if (game.slug === "photos-1") {
    return "تحدي الصور الجزء الأول لعبة جماعية لاختبار سرعة الملاحظة وتخمين الصور الغامضة مع الأصدقاء والعائلة مباشرة من المتصفح.";
  }

  if (game.slug === "photos-2") {
    return "تحدي الصور الجزء الثاني يقدم صورًا وألغازًا جديدة للمنافسة بين الأصدقاء والعائلة في لعبة جماعية ممتعة بدون تحميل.";
  }

  if (game.slug === "photos-3") {
    return "تحدي الصور الجزء الثالث يحتوي على تحديات بصرية جديدة وأصعب، مناسب للجمعات والمنافسات بين الأصدقاء والعائلة.";
  }

  if (game.slug === "family-feud") {
    return "العب فاميلي فيود أونلاين مع العائلة والأصدقاء وخمّن الإجابات الأكثر شيوعًا في لعبة جماعية مليئة بالحماس والضحك.";
  }

  if (game.slug === "fawazeer") {
    return "لعبة فوازير وأسئلة جماعية تعمل من المتصفح بدون تحميل، مناسبة للجلسات والتحديات الثقافية بين الأصدقاء والعائلة.";
  }

  if (game.slug === "guess-link") {
    return "لعبة خمن الرابط تحدي جماعي يعتمد على تجميع الصور ومعرفة الإجابة الصحيحة بسرعة قبل الفريق المنافس.";
  }

  if (game.slug === "alatrash") {
    return "مين الأطرش في الزفة لعبة تحرٍ اجتماعية شبيهة بفكرة برا السالفة، مناسبة لثلاثة لاعبين فأكثر ومليئة بالضحك والذكاء.";
  }

  return `اكتشف ${cleanName} من ألعاب زامن، لعبة جماعية عربية تعمل مباشرة من المتصفح ومناسبة للعائلة والأصدقاء.`;
};

// معرّف ثابت للمتصفح لمعرفة الزائر بدون تخزين معلومات حساسة
const getVisitorId = () => {
  let visitorId = localStorage.getItem("zamnVisitorId");

  if (!visitorId) {
    visitorId =
      "visitor_" +
      Date.now() +
      "_" +
      Math.random().toString(36).slice(2, 12);

    localStorage.setItem("zamnVisitorId", visitorId);
  }

  return visitorId;
};

// معرّف مختلف لكل تبويب/جلسة مفتوحة
const getSessionId = () => {
  let sessionId = sessionStorage.getItem("zamnSessionId");

  if (!sessionId) {
    sessionId =
      "session_" +
      Date.now() +
      "_" +
      Math.random().toString(36).slice(2, 12);

    sessionStorage.setItem("zamnSessionId", sessionId);
  }

  return sessionId;
};

const visitorId = getVisitorId();
const sessionId = getSessionId();
const presenceRef = db.ref("analytics/online/" + sessionId);

// تسجيل زيارة واحدة في كل جلسة متصفح
const registerSiteVisit = async () => {
  if (sessionStorage.getItem("zamnVisitRegistered")) return;

  const updates = {};

  updates["analytics/totalVisits"] =
    firebase.database.ServerValue.increment(1);

  updates["analytics/visitors/" + visitorId + "/lastVisit"] =
    firebase.database.ServerValue.TIMESTAMP;

  updates["analytics/visitors/" + visitorId + "/visits"] =
    firebase.database.ServerValue.increment(1);

  await db.ref().update(updates);

  sessionStorage.setItem("zamnVisitRegistered", "yes");
};

// تسجيل المستخدم ضمن المتصلين الآن
const startPresenceTracking = () => {
  const connectedRef = db.ref(".info/connected");

  connectedRef.on("value", async snapshot => {
    if (snapshot.val() !== true) return;

    // يُحذف المستخدم تلقائياً عند انقطاع الإنترنت أو إغلاق الصفحة
    await presenceRef.onDisconnect().remove();

    await presenceRef.set({
      visitorId,
      phone: localStorage.getItem("playerPhone") || null,
      playerName: null,
      currentGameId: null,
      currentGameName: null,
      connectedAt: firebase.database.ServerValue.TIMESTAMP,
      lastActivity: firebase.database.ServerValue.TIMESTAMP
    });
  });
};

const updateOnlinePlayer = async ({
  phone = null,
  playerName = null,
  currentGameId = null,
  currentGameName = null
} = {}) => {
  try {
    await presenceRef.update({
      phone: phone || null,
      playerName: playerName || null,
      currentGameId: currentGameId || null,
      currentGameName: currentGameName || null,
      lastActivity: firebase.database.ServerValue.TIMESTAMP
    });
  } catch (error) {
    console.error("Presence update error:", error);
  }
};

const registerGameEntry = async (game, phone, playerName, entryType) => {
  if (!game) return;

  const logRef = db.ref("analytics/gameEntryLogs").push();

  const updates = {};

  updates[`analytics/gameEntries/${game.id}/name`] = game.name;

  updates[`analytics/gameEntries/${game.id}/count`] =
    firebase.database.ServerValue.increment(1);

  updates[`analytics/gameEntries/${game.id}/lastEntryAt`] =
    firebase.database.ServerValue.TIMESTAMP;

  updates[`analytics/gameEntries/${game.id}/players/${sessionId}`] = {
    phone: phone || null,
    playerName: playerName || null,
    entryType: entryType || "owned",
    enteredAt: firebase.database.ServerValue.TIMESTAMP
  };

  updates[`analytics/gameEntryLogs/${logRef.key}`] = {
    gameId: game.id,
    gameName: game.name,
    phone: phone || null,
    playerName: playerName || null,
    visitorId,
    sessionId,
    entryType: entryType || "owned",
    enteredAt: firebase.database.ServerValue.TIMESTAMP
  };

  await db.ref().update(updates);

  await updateOnlinePlayer({
    phone,
    playerName,
    currentGameId: game.id,
    currentGameName: game.name
  });
};

registerSiteVisit().catch(console.error);
startPresenceTracking();









function App() {
  const [previewImage, setPreviewImage] = React.useState(null);

  const getGameFromUrl = () => {
    const path = window.location.pathname;
    const match = path.match(/^\/game\/([^/]+)\/?$/);

    if (!match) {
      return null;
    }

    const slug = decodeURIComponent(match[1]);

    return games.find((game) => game.slug === slug) || null;
  };

  const getArticleFromUrl = () => {
    const path = window.location.pathname;
    const match = path.match(/^\/blog\/([^/]+)\/?$/);

    if (!match) {
      return null;
    }

    const slug = decodeURIComponent(match[1]);

    return articles.find((article) => article.slug === slug) || null;
  };

  const [selectedGame, setSelectedGame] = React.useState(getGameFromUrl);

  const [selectedArticle, setSelectedArticle] = React.useState(() => {
    const path = window.location.pathname;

    if (path === "/blog" || path === "/blog/") {
      return "blog-list";
    }

    return getArticleFromUrl();
  });

  React.useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [selectedGame, selectedArticle]);





















// تحديث عنوان الصفحة والوصف والأيقونة وروابط المشاركة
React.useEffect(() => {
  const canonical = document.querySelector('link[rel="canonical"]');
  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector(
    'meta[property="og:description"]'
  );
  const ogUrl = document.querySelector('meta[property="og:url"]');
  const ogImage = document.querySelector('meta[property="og:image"]');

  const siteUrl = "https://zamn-games.vercel.app";
  const siteIcon = `${siteUrl}/favicon.png?v=10`;
  const siteImage = "https://i.postimg.cc/MKrfPPHy/s.png";

  // حذف الأيقونة القديمة وإنشاء أيقونة جديدة
  // هذه الطريقة تجبر المتصفح على تحديثها
  const setIcon = (iconUrl) => {
    document
      .querySelectorAll(
        'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
      )
      .forEach((link) => link.remove());

    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = iconUrl;
    document.head.appendChild(favicon);

    const shortcutIcon = document.createElement("link");
    shortcutIcon.rel = "shortcut icon";
    shortcutIcon.href = iconUrl;
    document.head.appendChild(shortcutIcon);

    const appleIcon = document.createElement("link");
    appleIcon.rel = "apple-touch-icon";
    appleIcon.href = iconUrl;
    document.head.appendChild(appleIcon);
  };

  // صفحة المقال
  if (selectedArticle && selectedArticle !== "blog-list") {
    const articleUrl =
      `${siteUrl}/blog/${selectedArticle.slug}`;

    const articleTitle =
      `${selectedArticle.title} | ألعاب زامن`;

    document.title = articleTitle;

    // شعار ألعاب زامن
    setIcon(siteIcon);

    description?.setAttribute(
      "content",
      selectedArticle.description
    );

    canonical?.setAttribute(
      "href",
      articleUrl
    );

    ogTitle?.setAttribute(
      "content",
      articleTitle
    );

    ogDescription?.setAttribute(
      "content",
      selectedArticle.description
    );

    ogUrl?.setAttribute(
      "content",
      articleUrl
    );

    ogImage?.setAttribute(
      "content",
      siteImage
    );

    return;
  }

























  // صفحة المدونة
  if (selectedArticle === "blog-list") {
    const blogTitle =
      "مدونة ألعاب زامن | ألعاب جماعية وأفكار للجمعات";

    const blogDescription =
      "مقالات وأفكار عن الألعاب الجماعية والجلسات العائلية وتجمعات الأصدقاء من ألعاب زامن.";

    document.title = blogTitle;

    // شعار ألعاب زامن
    setIcon(siteIcon);

    canonical?.setAttribute(
      "href",
      `${siteUrl}/blog`
    );

    description?.setAttribute(
      "content",
      blogDescription
    );

    ogTitle?.setAttribute(
      "content",
      blogTitle
    );

    ogDescription?.setAttribute(
      "content",
      blogDescription
    );

    ogUrl?.setAttribute(
      "content",
      `${siteUrl}/blog`
    );

    ogImage?.setAttribute(
      "content",
      siteImage
    );

    return;
  }

  // صفحة اللعبة
  if (selectedGame) {
    const gameUrl =
      `${siteUrl}/game/${selectedGame.slug}`;

    const gameTitle =
      getGameSeoTitle(selectedGame);

    const gameDescription =
      getGameSeoDescription(selectedGame);

    const gameIcon =
      selectedGame.icon || selectedGame.image;

    document.title = gameTitle;

    // صورة اللعبة في تبويب المتصفح
    setIcon(gameIcon);

    description?.setAttribute(
      "content",
      gameDescription
    );

    canonical?.setAttribute(
      "href",
      gameUrl
    );

    ogTitle?.setAttribute(
      "content",
      gameTitle
    );

    ogDescription?.setAttribute(
      "content",
      gameDescription
    );

    ogUrl?.setAttribute(
      "content",
      gameUrl
    );

    ogImage?.setAttribute(
      "content",
      selectedGame.image
    );

    return;
  }

  // الصفحة الرئيسية
  const homeTitle =
    "ألعاب زامن | ألعاب جماعية وحروف وفوازير بدون تحميل";

  const homeDescription =
    "ألعاب زامن منصة ألعاب جماعية عربية تضم حروف وألوف، فاميلي فيود، الفوازير، تحدي الصور وألعاب الجمعات للعائلة والأصدقاء.";

  document.title = homeTitle;

  // إعادة شعار ألعاب زامن في الرئيسية
  setIcon(siteIcon);

  canonical?.setAttribute(
    "href",
    `${siteUrl}/`
  );

  description?.setAttribute(
    "content",
    homeDescription
  );

  ogTitle?.setAttribute(
    "content",
    homeTitle
  );

  ogDescription?.setAttribute(
    "content",
    homeDescription
  );

  ogUrl?.setAttribute(
    "content",
    `${siteUrl}/`
  );

  ogImage?.setAttribute(
    "content",
    siteImage
  );
}, [selectedGame, selectedArticle]);






// إضافة Product Schema و Breadcrumb لصفحة كل لعبة
React.useEffect(() => {
  document.getElementById("product-schema")?.remove();

  if (!selectedGame) {
    return;
  }

  const numericPrice =
    selectedGame.priceValue ??
    parseFloat(
      String(selectedGame.price || "").replace(/[^\d.]/g, "")
    );

  // جميع التقييمات الظاهرة في صفحة اللعبة تُستخدم لحساب المتوسط والعدد.
  // المراجعات النصية فقط تُرسل كعناصر Review منفصلة.
  const allRatings = (selectedGame.reviews || []).filter(
    review => String(review.name || "").trim() || String(review.stars || "").trim()
  );

  const validReviews = allRatings.filter(
    review => String(review.comment || "").trim()
  );

  const productSchema = {
    "@type": "Product",
    "@id":
      `${window.location.origin}/game/${selectedGame.slug}#product`,

    name: selectedGame.name.trim(),

    description: getGameSeoDescription(selectedGame),

image: [
  selectedGame.image,
  ...(selectedGame.screenshots || [])
],
    url:
      `${window.location.origin}/game/${selectedGame.slug}`,

    sku: String(selectedGame.id),

    category: selectedGame.category,

    brand: {
      "@type": "Brand",
      name: "ألعاب زامن"
    },

    offers: {
      "@type": "Offer",

      url:
        `${window.location.origin}/game/${selectedGame.slug}`,

      price: numericPrice,

      priceCurrency:
        selectedGame.priceCurrency || "SAR",

      availability:
        "https://schema.org/InStock",

      itemCondition:
        "https://schema.org/NewCondition"
    },

    ...(allRatings.length > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",

            ratingValue:
              Number(selectedGame.rating),

            ratingCount:
              allRatings.length,

            reviewCount:
              allRatings.length,

            bestRating: 5,

            worstRating: 1
          },

          review: validReviews.map(review => ({
            "@type": "Review",

            author: {
              "@type": "Person",

              name:
                String(review.name || "لاعب").trim()
            },

            reviewRating: {
              "@type": "Rating",

              ratingValue: 5,

              bestRating: 5,

              worstRating: 1
            },

            reviewBody:
              String(review.comment || "").trim()
          }))
        }
      : {})
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",

        position: 1,

        name: "الرئيسية",

        item:
          `${window.location.origin}/`
      },

      {
        "@type": "ListItem",

        position: 2,

        name:
          selectedGame.name.trim(),

        item:
          `${window.location.origin}/game/${selectedGame.slug}`
      }
    ]
  };

  const script =
    document.createElement("script");

  script.id = "product-schema";

  script.type =
    "application/ld+json";

  script.textContent =
    JSON.stringify({
      "@context":
        "https://schema.org",

      "@graph": [
        productSchema,
        breadcrumbSchema
      ]
    });

  document.head.appendChild(script);

  return () => {
    document
      .getElementById("product-schema")
      ?.remove();
  };
}, [selectedGame]);













  const [gameFrame, setGameFrame] = React.useState(null);
  const [gameEntryType, setGameEntryType] = React.useState(null);
  const gameIframeRef = React.useRef(null);

  const [showStats, setShowStats] = React.useState(false);
  const [statsClicks, setStatsClicks] = React.useState(0);
  const [statsCode, setStatsCode] = React.useState("");
  const [statsLoggedIn, setStatsLoggedIn] = React.useState(false);






  const [totalVisits,setTotalVisits] = React.useState(0);
  const [onlineUsers,setOnlineUsers] = React.useState([]);
  const [registeredCount,setRegisteredCount] = React.useState(0);

const [gameStats,setGameStats] = React.useState([]);
const [gameEntryLogs,setGameEntryLogs] = React.useState([]);
const [customersList,setCustomersList] = React.useState([]);
const [phone,setPhone] = React.useState(localStorage.getItem("playerPhone") || "");


const [phoneInput,setPhoneInput] = React.useState("");
const [playerName,setPlayerName] = React.useState("");
const [needName,setNeedName] = React.useState(false);
const [agreeTerms,setAgreeTerms] = React.useState(false);
const [ownedGames,setOwnedGames] = React.useState([]);
const [pendingPhone,setPendingPhone] = React.useState("");
const [loadingPhone,setLoadingPhone] = React.useState(false);
const [showLoginBox,setShowLoginBox] = React.useState(false);
const [openFaq, setOpenFaq] = React.useState(0);
const [showMoreFaq, setShowMoreFaq] = React.useState(false);
const arabCountries = [
  { name:"السعودية", flag:"🇸🇦", code:"966", length:9 },
  { name:"الإمارات", flag:"🇦🇪", code:"971", length:9 },
  { name:"البحرين", flag:"🇧🇭", code:"973", length:8 },
  { name:"الكويت", flag:"🇰🇼", code:"965", length:8 },
  { name:"عمان", flag:"🇴🇲", code:"968", length:8 },
  { name:"قطر", flag:"🇶🇦", code:"974", length:8 },
  { name:"اليمن", flag:"🇾🇪", code:"967", length:9 },
  { name:"الأردن", flag:"🇯🇴", code:"962", length:9 },
  { name:"لبنان", flag:"🇱🇧", code:"961", length:8 },
  { name:"سوريا", flag:"🇸🇾", code:"963", length:9 },
  { name:"العراق", flag:"🇮🇶", code:"964", length:10 },
  { name:"فلسطين", flag:"🇵🇸", code:"970", length:9 },
  { name:"مصر", flag:"🇪🇬", code:"20", length:10 },
  { name:"ليبيا", flag:"🇱🇾", code:"218", length:9 },
  { name:"تونس", flag:"🇹🇳", code:"216", length:8 },
  { name:"الجزائر", flag:"🇩🇿", code:"213", length:9 },
  { name:"المغرب", flag:"🇲🇦", code:"212", length:9 },
  { name:"موريتانيا", flag:"🇲🇷", code:"222", length:8 },
  { name:"السودان", flag:"🇸🇩", code:"249", length:9 },
  { name:"الصومال", flag:"🇸🇴", code:"252", length:8 },
  { name:"جيبوتي", flag:"🇩🇯", code:"253", length:8 },
  { name:"جزر القمر", flag:"🇰🇲", code:"269", length:7 }
];
const [hideOverlayButtons, setHideOverlayButtons] = React.useState(false);
const [selectedCountry,setSelectedCountry] = React.useState(arabCountries[0]);
const [showCountries,setShowCountries] = React.useState(false);
const cleanPhone = (value) => {
  let p = value.replace(/\D/g,"");

  if(p.startsWith("966")){
    p = p.slice(3);
  }

  if(p.startsWith("0")){
    p = p.slice(1);
  }

  return p;
};
const loadOwnedGames = async (phoneNumber) => {
  const snap = await db.ref("customers/" + phoneNumber + "/games").get();
  const data = snap.val() || {};
  setOwnedGames(Object.keys(data));
};
const loginPhone = async () => {
  const localPhone = phoneInput.replace(/\D/g,"");

  if(localPhone.length !== selectedCountry.length){
    showMessage(`رقم ${selectedCountry.name} يجب أن يكون ${selectedCountry.length} أرقام ❌`, "error");
    return;
  }

  const clean = selectedCountry.code + localPhone;
  setLoadingPhone(true);

  try{
    const nameSnap = await db.ref("customers/" + clean + "/name").get();

if(nameSnap.exists() && String(nameSnap.val()).trim()){
        setPlayerName(nameSnap.val());
      localStorage.setItem("playerPhone", clean);
      setPhone(clean);
      await db.ref("customers/" + clean + "/lastLogin").set(Date.now());
   await loadOwnedGames(clean);

await updateOnlinePlayer({
  phone: clean,
  playerName: nameSnap.val(),
  currentGameId: null,
  currentGameName: null
});

setNeedName(false);
  }
   else {
  setPendingPhone(clean);
  setNeedName(true);
}
 }catch(error){
  console.log(error);
  showMessage(error.message,"error");
}
  setLoadingPhone(false);
};


const savePlayerName = async () => {
  const name = playerName.trim();

  if(!name){
    showMessage("اكتب اسم اللاعب ❌","error");
    return;
  }

  if(!agreeTerms){
    showMessage("يجب الموافقة على التعهد أولاً ❌","error");
    return;
  }

  try{
    await db.ref("customers/" + pendingPhone + "/name").set(name);
    await db.ref("customers/" + pendingPhone + "/agreeTerms").set(true);
    await db.ref("customers/" + pendingPhone + "/agreeTermsAt").set(Date.now());
    await db.ref("customers/" + pendingPhone + "/lastLogin").set(Date.now());

    localStorage.setItem("playerPhone", pendingPhone);

    setPlayerName(name);
    setPhone(pendingPhone);

    await loadOwnedGames(pendingPhone);

await updateOnlinePlayer({
  phone: pendingPhone,
  playerName: name,
  currentGameId: null,
  currentGameName: null
});

setNeedName(false);
    setPendingPhone("");
    setAgreeTerms(false);
  }catch(error){
    showMessage(error.message,"error");
  }
};
const logoutPhone = async () => {
  await updateOnlinePlayer({
    phone: null,
    playerName: null,
    currentGameId: null,
    currentGameName: null
  });

  localStorage.removeItem("playerPhone");
  setPhone("");
  setPhoneInput("");
  setPlayerName("");
  setPendingPhone("");
  setNeedName(false);
  setAgreeTerms(false);
  setOwnedGames([]);
};
const saveGameToPhone = async (gameCode) => {

  await db.ref("customers/" + phone + "/games/" + String(gameCode)).set(true);

  await loadOwnedGames(phone);

};
const [showCodeBox,setShowCodeBox] = React.useState(false);
const [codeInput,setCodeInput] = React.useState("");
const [trialTime,setTrialTime] = React.useState(null);

const [siteMessage,setSiteMessage] = React.useState(null);
const messageTimer = React.useRef(null);
const trialTimer = React.useRef(null);
const overlayTimer = React.useRef(null);


const showMessage = (text, type = "info") => {
  if (messageTimer.current) {
    clearTimeout(messageTimer.current);
    messageTimer.current = null;
  }

  setSiteMessage({
    text: String(text || ""),
    type
  });

  // رسالة التأكيد لا تُغلق تلقائيًا
  if (type === "confirm") {
    return;
  }

  messageTimer.current = setTimeout(() => {
    setSiteMessage(null);
    messageTimer.current = null;
  }, 4000);
};

const SiteMessageModal = () => {
  if (!siteMessage) return null;

  const closeMessage = () => {
    setSiteMessage(null);

    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
      messageTimer.current = null;
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-[999999]
        flex items-center justify-center
        bg-[#1f122d]/85 backdrop-blur-md
        p-4
      "
      onClick={() => {
        if (siteMessage.type !== "confirm") {
          closeMessage();
        }
      }}
    >
      <div
        dir="rtl"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-[390px]
          overflow-hidden rounded-[26px]
          border-[3px] border-[#d8cbea]
          bg-white
          shadow-[8px_8px_0_#9b8aaa,0_25px_70px_rgba(31,18,45,.45)]
          animate-[codeBoxPop_.25s_ease-out]
        "
      >
        <span className="absolute left-4 top-4 z-30 h-3 w-3 bg-yellow-300"></span>
        <span className="absolute left-9 top-4 z-30 h-3 w-3 bg-white/50"></span>
        <span className="absolute bottom-4 right-4 z-30 h-3 w-3 bg-purple-300"></span>

        <div
          className={`
            relative overflow-hidden
            border-b-[3px] px-6 py-7
            text-center text-white

            ${
              siteMessage.type === "error"
                ? "border-[#991b1b] bg-gradient-to-br from-[#7f1d1d] via-[#dc2626] to-[#f87171]"
                : siteMessage.type === "confirm"
                ? "border-[#92400e] bg-gradient-to-br from-[#78350f] via-[#d97706] to-[#fbbf24]"
                : "border-[#4c1d95] bg-gradient-to-br from-[#3b0764] via-[#6d28d9] to-[#8b5cf6]"
            }
          `}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
              backgroundSize: "18px 18px"
            }}
          />

          <div className="relative z-10">
            <div
              className="
                mx-auto mb-4 flex h-20 w-20
                items-center justify-center
                rounded-2xl
                border-[3px] border-white/40
                bg-white/15
                text-5xl
                shadow-[6px_6px_0_rgba(37,13,64,.45)]
              "
            >
              {siteMessage.type === "error"
                ? "❌"
                : siteMessage.type === "confirm"
                ? "⚠️"
                : "✅"}
            </div>

            <h2 className="text-2xl font-black">
              {siteMessage.type === "error"
                ? "تنبيه"
                : siteMessage.type === "confirm"
                ? "تأكيد العملية"
                : "تم بنجاح"}
            </h2>
          </div>
        </div>

        <div
          className="p-5 md:p-6"
          style={{
            backgroundColor: "#faf8fc",
            backgroundImage:
              "linear-gradient(rgba(124,58,237,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.045) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        >
          <p className="mb-6 text-center text-lg font-black leading-8 text-[#3b0764]">
            {siteMessage.text}
          </p>

          {siteMessage.type === "confirm" ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={closeMessage}
                className="
                  cairo-btn min-h-[54px]
                  rounded-xl
                  border-[3px] border-[#b8afbd]
                  bg-white
                  font-black text-[#514957]
                  shadow-[4px_4px_0_#99909f]
                "
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={async () => {
                  closeMessage();
                  setShowLoginBox(false);
                  await logoutPhone();
                }}
                className="
                  cairo-btn min-h-[54px]
                  rounded-xl
                  border-[3px] border-[#991b1b]
                  bg-[#ef4444]
                  font-black text-white
                  shadow-[4px_4px_0_#991b1b]
                "
              >
                تأكيد
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={closeMessage}
              className={`
                cairo-btn min-h-[56px] w-full
                rounded-xl border-[3px]
                text-lg font-black text-white

                ${
                  siteMessage.type === "error"
                    ? "border-[#991b1b] bg-[#ef4444] shadow-[5px_5px_0_#991b1b]"
                    : "border-[#4c1d95] bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] shadow-[5px_5px_0_#4c1d95]"
                }
              `}
            >
              حسناً
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const handleStatsSecretClick = () => {
  const newCount = statsClicks + 1;

  if(newCount >= 5){
    setStatsClicks(0);
    setStatsCode("");
    setStatsLoggedIn(false);
    setShowStats(true);
    return;
  }

  setStatsClicks(newCount);
};

React.useEffect(() => {
  if (!statsLoggedIn) return;

  const visitsRef = db.ref("analytics/totalVisits");
  const onlineRef = db.ref("analytics/online");
  const customersRef = db.ref("customers");
const gameEntriesRef = db.ref("analytics/gameEntries");
const gameEntryLogsRef = db.ref("analytics/gameEntryLogs");
  visitsRef.on("value", (snap) => {
    setTotalVisits(snap.val() || 0);
  });

  onlineRef.on("value", (snap) => {
    const data = snap.val() || {};

    const users = Object.entries(data).map(([id, value]) => ({
      id,
      ...value
    }));

    setOnlineUsers(users);
  });

customersRef.on("value", (snap) => {
  const data = snap.val() || {};

  setRegisteredCount(Object.keys(data).length);

  const list = Object.entries(data).map(([customerPhone, customer]) => {
    const ownedCodes = Object.keys(customer.games || {});

    const ownedGameNames = ownedCodes.map((code) => {
      const foundGame = games.find(
        (game) => String(game.code) === String(code)
      );

      return foundGame ? foundGame.name : "لعبة غير معروفة - " + code;
    });

    return {
      phone: customerPhone,
      name: customer.name || "بدون اسم",
      games: ownedGameNames,
      lastLogin: customer.lastLogin || null
    };
  });

  list.sort((a, b) => (b.lastLogin || 0) - (a.lastLogin || 0));

  setCustomersList(list);
});

gameEntriesRef.on("value", (snap) => {
  const data = snap.val() || {};

  const list = Object.entries(data)
    .map(([id, value]) => ({
      id: String(id),
      name: value.name || "لعبة",
      count: value.count || 0
    }))
    .sort((a,b) => b.count - a.count);

  setGameStats(list);
});

gameEntryLogsRef.on("value", (snap) => {
  const data = snap.val() || {};

  const logs = Object.entries(data).map(([id, value]) => ({
    id,
    gameId: String(value.gameId || ""),
    gameName: value.gameName || "لعبة",
    enteredAt: Number(value.enteredAt || 0),
    phone: value.phone || null,
    playerName: value.playerName || null,
    entryType: value.entryType || "owned"
  }));

  setGameEntryLogs(logs);
});

return () => {
  visitsRef.off();
  onlineRef.off();
  customersRef.off();
  gameEntriesRef.off();
  gameEntryLogsRef.off();
};

}, [statsLoggedIn]);
const getGamePeriodStats = (gameId) => {
  const now = Date.now();

  const oneMinuteAgo = now - (60 * 1000);
  const oneHourAgo = now - (60 * 60 * 1000);
  const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const gameLogs = gameEntryLogs.filter(
    log => String(log.gameId) === String(gameId)
  );

  return {
    minute: gameLogs.filter(log => log.enteredAt >= oneMinuteAgo).length,
    hour: gameLogs.filter(log => log.enteredAt >= oneHourAgo).length,
    today: gameLogs.filter(log => log.enteredAt >= startOfToday.getTime()).length,
    week: gameLogs.filter(log => log.enteredAt >= sevenDaysAgo).length,
    month: gameLogs.filter(log => log.enteredAt >= thirtyDaysAgo).length,
    total: gameLogs.length
  };
};

const resetOneGameStats = async (gameId, gameName) => {
  const accepted = window.confirm(
    `هل أنت متأكد من تصفير إحصائيات لعبة ${gameName}؟`
  );

  if (!accepted) return;

  try {
    const logsSnap = await db.ref("analytics/gameEntryLogs").get();
    const logsData = logsSnap.val() || {};

    const updates = {};

    Object.entries(logsData).forEach(([logId, log]) => {
      if (String(log.gameId) === String(gameId)) {
        updates[`analytics/gameEntryLogs/${logId}`] = null;
      }
    });

    updates[`analytics/gameEntries/${gameId}/count`] = 0;
    updates[`analytics/gameEntries/${gameId}/players`] = null;
    updates[`analytics/gameEntries/${gameId}/lastEntryAt`] = null;

    await db.ref().update(updates);

    showMessage(`تم تصفير إحصائيات ${gameName} ✅`);
  } catch (error) {
    console.error(error);
    showMessage("حدث خطأ أثناء التصفير ❌", "error");
  }
};

const resetAllGameStats = async () => {
  const accepted = window.confirm(
    "هل أنت متأكد من تصفير جميع إحصائيات دخول الألعاب؟"
  );

  if (!accepted) return;

  try {
    const updates = {
      "analytics/gameEntryLogs": null
    };

    games.forEach(game => {
      updates[`analytics/gameEntries/${game.id}/count`] = 0;
      updates[`analytics/gameEntries/${game.id}/players`] = null;
      updates[`analytics/gameEntries/${game.id}/lastEntryAt`] = null;
      updates[`analytics/gameEntries/${game.id}/name`] = game.name;
    });

    await db.ref().update(updates);

    showMessage("تم تصفير جميع إحصائيات الألعاب ✅");
  } catch (error) {
    console.error(error);
    showMessage("حدث خطأ أثناء تصفير الإحصائيات ❌", "error");
  }
};

const openGame = async (game, entryType = "owned") => {
  if (!game || !game.playLink) return;

  if (overlayTimer.current) {
    clearTimeout(overlayTimer.current);
  }

  setHideOverlayButtons(false);
  setGameEntryType(entryType);
  setGameFrame(game.playLink);

  try {
    await registerGameEntry(
      game,
      phone || null,
      playerName || null,
      entryType
    );
  } catch (error) {
    console.error("Game analytics error:", error);
  }

  overlayTimer.current = setTimeout(() => {
    setHideOverlayButtons(true);
    overlayTimer.current = null;
  }, 3000);
};
React.useEffect(() => {
  const savedPhone = localStorage.getItem("playerPhone");

  if (!savedPhone) return;

  db.ref("customers/" + savedPhone + "/name")
    .get()
    .then((snap) => {
      if (snap.exists() && String(snap.val()).trim()) {
        const savedName = snap.val();
setPlayerName(savedName);
setPhone(savedPhone);

loadOwnedGames(savedPhone).catch((error)=>{
  console.error(error);
});

updateOnlinePlayer({

          phone: savedPhone,
          playerName: savedName,
          currentGameId: null,
          currentGameName: null
        });
      } else {
        localStorage.removeItem("playerPhone");
        setPhone("");
        setPendingPhone(savedPhone);
        setNeedName(true);
        setShowLoginBox(true);
      }
    })
    .catch((error) => {
      console.error(error);
      showMessage(error.message, "error");
    });
}, []);

const normalizeCode = (value) => {
  return String(value || "")
    .replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)])
    .replace(/[۰-۹]/g, d => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)])
    .replace(/[^0-9]/g, "");
};

const checkCode = async () => {
 if(!phone || needName){
  showMessage("سجل رقمك واسمك أولاً ❌","error");
  setShowLoginBox(true);
  return;
}

  const enteredCode = normalizeCode(codeInput);
  const realCode = normalizeCode(selectedGame.code);

  if(enteredCode === realCode){
    await saveGameToPhone(selectedGame.code);
    setShowCodeBox(false);
    setCodeInput("");
openGame(selectedGame, "owned");
  } else {
    showMessage("الرمز غير صحيح ❌","error");
  }
};

const buyGame = () => {
  window.open(selectedGame.buyLink, "_blank");
};
const openGameDetails = (game) => {
  window.history.pushState(
    {},
    "",
    `/game/${game.slug}`
  );

  setSelectedGame(game);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const closeGameDetails = () => {
  window.history.pushState({}, "", "/");

  setSelectedGame(null);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

React.useEffect(() => {

 const handleBrowserBack = () => {
  const path = window.location.pathname;

  setSelectedGame(getGameFromUrl());

  if (path === "/blog" || path === "/blog/") {
    setSelectedArticle("blog-list");
  } else {
    setSelectedArticle(getArticleFromUrl());
  }
};

  window.addEventListener("popstate", handleBrowserBack);

  return () => {
    window.removeEventListener("popstate", handleBrowserBack);
  };
}, []);

const startTrial = () => {

  if(trialTimer.current){
    clearInterval(trialTimer.current);
    trialTimer.current = null;
  }

  if(localStorage.getItem(selectedGame.trialKey)){
    showMessage("انتهت التجربة المجانية لهذه اللعبة 🛑","error");
    return;
  }

  localStorage.setItem(selectedGame.trialKey,"used");
openGame(selectedGame, "trial");

setTrialTime(45);

  let time = 45;

  trialTimer.current = setInterval(() => {
    time--;
    setTrialTime(time);

 if(time <= 0){
  clearInterval(trialTimer.current);
  trialTimer.current = null;

  setGameFrame(null);
  setTrialTime(null);
  setGameEntryType(null);

  updateOnlinePlayer({
    phone,
    playerName,
    currentGameId: null,
    currentGameName: null
  });

  showMessage("انتهت التجربة المجانية ⏳","error");
}

  },1000);
};

const sendHostAccessToGame = () => {
  if (!gameIframeRef.current?.contentWindow) {
    console.log("iframe غير جاهز");
    return;
  }

  if (!gameFrame) {
    console.log("رابط اللعبة غير موجود");
    return;
  }

  const currentGame = games.find((game) => {
    try {
      return (
        new URL(game.playLink).origin ===
        new URL(gameFrame).origin
      );
    } catch {
      return false;
    }
  });

  if (!currentGame) {
    console.log("لم يتم العثور على اللعبة");
    return;
  }

  if (Number(currentGame.id) !== 9) {
    return;
  }

  if (gameEntryType !== "owned") {
    console.log("الدخول ليس owned:", gameEntryType);
    return;
  }

  const message = {
    type: "ZAMN_GAME_ACCESS",
    gameId: "deaf_party",
    role: "host"
  };

const gameOrigin = "https://alatrash.oneapp.dev";

  gameIframeRef.current.contentWindow.postMessage(
    message,
    gameOrigin
  );

  setTimeout(() => {
    gameIframeRef.current?.contentWindow?.postMessage(
      message,
      gameOrigin
    );
  }, 500);

  setTimeout(() => {
    gameIframeRef.current?.contentWindow?.postMessage(
      message,
      gameOrigin
    );
  }, 1500);

  console.log("تم إرسال صلاحية المضيف");
};




























if (selectedArticle === "blog-list") {
  return (
<div className="home-game-background page-enter">

      <div className="bg-gradient-to-br from-[#3b0764] via-[#6d28d9] to-[#a855f7] text-white px-5 py-12">
        <div className="max-w-6xl mx-auto">

          <button
            onClick={() => {
              window.history.pushState({}, "", "/");
              setSelectedArticle(null);
              setSelectedGame(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-black/30 px-5 py-3 rounded-xl font-black mb-7"
          >
            ← الرجوع للرئيسية
          </button>

          <h1 className="text-4xl md:text-6xl font-black mb-4">
            مدونة ألعاب زامن
          </h1>

          <p className="text-lg md:text-xl text-white/85 leading-9">
            مقالات وأفكار عن الألعاب الجماعية والجلسات العائلية وتجمعات الأصدقاء.
          </p>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {articles.map((article) => (
            <a
              key={article.id}
              href={`/blog/${article.slug}`}
              onClick={(e) => {
                e.preventDefault();

                window.history.pushState(
                  {},
                  "",
                  `/blog/${article.slug}`
                );

                setSelectedGame(null);
                setSelectedArticle(article);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              }}
              className="bg-white rounded-3xl p-6 shadow-xl border border-[#eadcff] hover:-translate-y-1 transition"
            >
              <div className="flex items-center justify-between gap-3 mb-5">

                <span className="bg-purple-100 text-[#6d28d9] px-3 py-2 rounded-full text-sm font-black">
                  {article.category || "ألعاب جماعية"}
                </span>

                <time className="text-gray-500 text-sm font-bold">
                  {article.date || "2026-03-15"}
                </time>

              </div>

              <h2 className="text-2xl font-black text-[#3b0764] mb-3 leading-9">
                {article.title}
              </h2>

              <p className="text-gray-600 font-bold leading-7">
                {article.description}
              </p>

              <div className="mt-5 text-[#7c3aed] font-black">
                اقرأ المقال ←
              </div>
            </a>
          ))}

        </div>

      </div>

    </div>
  );
}

if (
  selectedArticle &&
  selectedArticle !== "blog-list"
) {
  return (
<div className="home-game-background page-enter">
      <div className="bg-gradient-to-br from-[#3b0764] via-[#6d28d9] to-[#a855f7] text-white px-5 py-12">

        <div className="max-w-4xl mx-auto">

          <button
            onClick={() => {
              window.history.pushState({}, "", "/blog");
              setSelectedArticle("blog-list");
              setSelectedGame(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-black/30 px-5 py-3 rounded-xl font-black mb-7"
          >
            ← الرجوع للمدونة
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-5">

            <span className="bg-white/15 px-4 py-2 rounded-full font-black">
              {selectedArticle.category || "ألعاب جماعية"}
            </span>

            <time className="text-white/80 font-bold">
              {selectedArticle.date || "2026-03-15"}
            </time>

          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
            {selectedArticle.title}
          </h1>

          <p className="text-lg md:text-xl text-white/85 leading-9">
            {selectedArticle.description}
          </p>

        </div>

      </div>

      <article className="max-w-4xl mx-auto px-5 py-10">

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl">

          {selectedArticle.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-700 text-lg font-bold leading-10 mb-5"
            >
              {paragraph}
            </p>
          ))}

        </div>

        <hr className="my-12 border-[#dce6bf]" />

       <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-[#eadcff]">

  <h2 className="text-4xl font-black text-center text-[#3b0764] mb-4">
    ابدأ الآن!
  </h2>

  <p className="text-center text-lg md:text-xl text-gray-600 mb-8 leading-9">
    جرّب{" "}
    <span className="font-black text-[#7c3aed]">
      ألعاب زامن
    </span>{" "}
    مجانًا واكتشف كيف تحوّل أي تجمع إلى تجربة ممتعة لا تُنسى.
  </p>

  <h3 className="text-3xl font-black text-center text-[#3b0764] mb-6">
    جرّب ألعابنا
  </h3>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <a
      href="/game/horof"
      onClick={(e) => {
        e.preventDefault();

        const game = games.find(
          game => game.slug === "horof"
        );

        if (!game) return;

        setSelectedArticle(null);
        openGameDetails(game);
      }}
      className="bg-[#f4f0ff] hover:bg-[#eadcff] border border-[#d8b4fe] text-[#3b0764] rounded-2xl py-5 px-3 text-center font-black transition"
    >
      🔤 لعبة حروف
    </a>

    <a
      href="/game/photos-1"
      onClick={(e) => {
        e.preventDefault();

        const game = games.find(
          game => game.slug === "photos-1"
        );

        if (!game) return;

        setSelectedArticle(null);
        openGameDetails(game);
      }}
      className="bg-[#f4f0ff] hover:bg-[#eadcff] border border-[#d8b4fe] text-[#3b0764] rounded-2xl py-5 px-3 text-center font-black transition"
    >
      🖼️ تحدي الصور
    </a>

    <a
      href="/game/alatrash"
      onClick={(e) => {
        e.preventDefault();

        const game = games.find(
          game => game.slug === "alatrash"
        );

        if (!game) return;

        setSelectedArticle(null);
        openGameDetails(game);
      }}
      className="bg-[#f4f0ff] hover:bg-[#eadcff] border border-[#d8b4fe] text-[#3b0764] rounded-2xl py-5 px-3 text-center font-black transition"
    >
      🕵️ مين الأطرش؟
    </a>

    <a
      href="/game/horof-bell"
      onClick={(e) => {
        e.preventDefault();

        const game = games.find(
          game => game.slug === "horof-bell"
        );

        if (!game) return;

        setSelectedArticle(null);
        openGameDetails(game);
      }}
      className="bg-[#f4f0ff] hover:bg-[#eadcff] border border-[#d8b4fe] text-[#3b0764] rounded-2xl py-5 px-3 text-center font-black transition"
    >
      🔔 حروف مع جرس
    </a>

  </div>

</div>










      </article>

    </div>
  );
}
if (selectedGame) {
  return (
    <>
      <SiteMessageModal />

        








<div
  className="min-h-screen bg-[#f4f0ff] text-[#3b0764]"
  style={{
    fontFamily:
selectedGame?.slug === "horof-bell"
        ? '"AA Galaxy", sans-serif'
        : "inherit"
  }}
>













{selectedGame.slug === "horof-bell" ? (
  /* واجهة خاصة بلعبة حروف وألوف مع الجرس */
<section className="game-details-hero relative overflow-hidden text-white">

<button
  onClick={closeGameDetails}
  className="cairo-btn absolute top-4 right-4 md:top-5 md:right-5 z-20 bg-black/30 hover:bg-black/45 backdrop-blur-md px-4 py-2.5 md:px-5 md:py-3 rounded-2xl font-black flex items-center gap-2 text-white"
>
  <i className="fa-solid fa-house text-white"></i>
  <span>الرئيسية</span>
</button>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 pt-20 md:pt-24 pb-8 md:pb-10">

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        {/* النص والبطاقات */}
        <div className="text-center lg:text-right order-2 lg:order-1">

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-2">
            حروف وألوف مع جرس مدمج
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-yellow-300 mb-3">
            تحدي الخلية
          </h2>

          <p className="max-w-2xl mx-auto lg:mx-0 text-sm md:text-base leading-7 text-white/90 font-bold mb-5">
            لعبة حروف جماعية تعمل مباشرة من المتصفح بدون تحميل.
            تنافس مع أصدقائك في الإجابة عن أكثر من 2000 سؤال،
            واضغط الجرس قبل الفريق المنافس لتحقيق أعلى النقاط.
          </p>

          {/* بطاقتان في كل صف */}
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto lg:mx-0">

            <div className="min-h-[60px] md:min-h-[68px] flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-white/15 border border-white/25 backdrop-blur-md rounded-2xl px-2 py-2 text-center">
              <i className="fa-solid fa-bell text-yellow-300 text-base md:text-lg"></i>

              <span className="text-[11px] sm:text-xs md:text-sm font-black leading-5">
                جرس مدمج
              </span>
            </div>

            <div className="min-h-[60px] md:min-h-[68px] flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-white/15 border border-white/25 backdrop-blur-md rounded-2xl px-2 py-2 text-center">
              <i className="fa-solid fa-users text-yellow-300 text-base md:text-lg"></i>

              <span className="text-[11px] sm:text-xs md:text-sm font-black leading-5">
                لاعبان فأكثر
              </span>
            </div>

            <div className="min-h-[60px] md:min-h-[68px] flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-white/15 border border-white/25 backdrop-blur-md rounded-2xl px-2 py-2 text-center">
              <i className="fa-solid fa-question text-yellow-300 text-base md:text-lg"></i>

              <span className="text-[11px] sm:text-xs md:text-sm font-black leading-5">
                أكثر من 2000 سؤال
              </span>
            </div>

            <div className="min-h-[60px] md:min-h-[68px] flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-white/15 border border-white/25 backdrop-blur-md rounded-2xl px-2 py-2 text-center">
              <i className="fa-solid fa-mobile-screen-button text-yellow-300 text-base md:text-lg"></i>

              <span className="text-[11px] sm:text-xs md:text-sm font-black leading-5">
                الجوال والتلفزيون
              </span>
            </div>

          </div>

        </div>

        {/* الصورة تظهر في كل الشاشات */}




         {/* الصورة */}

<div className="flex justify-center lg:justify-start items-center order-1 lg:order-2">
  <img
    src="https://i.postimg.cc/cLs9NqGk/shat.webp"
    alt="لعبة حروف وألوف مع جرس مدمج"
    width="440"
    height="440"
    loading="eager"
    decoding="async"


 className="w-[230px] sm:w-[280px] md:w-[340px] lg:w-[430px] xl:w-[520px] h-auto object-contain drop-shadow-2xllg:-translate-x-24 xl:-translate-x-28"  
  />
</div>

      </div>

    </div>

  </section>
) : (
  /* ضع هنا تصميم بقية الألعاب كما هو */
  
  /* الواجهة العادية لبقية الألعاب */
<section className="game-details-hero relative overflow-hidden text-white">

   <button
  onClick={closeGameDetails}
  className="cairo-btn absolute top-4 right-4 md:top-5 md:right-5 z-20 bg-black/30 hover:bg-black/45 backdrop-blur-md px-4 py-2.5 md:px-5 md:py-3 rounded-2xl font-black flex items-center gap-2 text-white"
>
  <i className="fa-solid fa-house text-white"></i>
  <span>الرئيسية</span>
</button>

<div className="relative z-10 max-w-7xl mx-auto px-5 pt-24 pb-14">

      <h1 className="text-4xl md:text-7xl font-black mb-7">
        {selectedGame.name}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mb-7">

        <div className="bg-white/15 backdrop-blur border border-white/20 rounded-2xl px-4 py-3 text-center">
          <div className="font-black">
            {selectedGame.players}
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur border border-white/20 rounded-2xl px-4 py-3 text-center">
          <div className="font-black">
            {selectedGame.category}
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur border border-white/20 rounded-2xl px-4 py-3 text-center">
          <div className="font-black text-green-400">
            {selectedGame.status}
          </div>
        </div>

      </div>

      <div className="max-w-3xl bg-white/15 backdrop-blur border border-white/20 rounded-3xl p-5 shadow-2xl">

        <div className="text-sm font-black text-yellow-300 mb-2">
          ✨ وصف اللعبة
        </div>

        <p className="text-base md:text-xl leading-9 text-white font-bold">
          {selectedGame.description}
        </p>

      </div>

    </div>

  </section>
)}



























<div className="max-w-7xl mx-auto px-5 py-10">

<div className="grid grid-cols-1 gap-8">

<div className="md:col-span-2">

<div className="game-details-action-card mb-8">

  <button
  onClick={()=>{
  if(!phone || needName){
  showMessage("سجل رقمك واسمك أولاً ❌","error");
  setShowLoginBox(true);
  return;
}
if (ownedGames.includes(String(selectedGame.code))) {
  openGame(selectedGame, "owned");
} else {
  setShowCodeBox(true);
}
  }}
className="cairo-btn game-details-btn game-details-play mb-4"
>
  ▶ العب الآن
</button>

    <button
      onClick={buyGame}
className="cairo-btn game-details-btn game-details-buy mb-4"
    >
      💳 اشتر الآن - {selectedGame.price}
    </button>

       <button
      onClick={startTrial}
className="cairo-btn game-details-btn game-details-trial"
    >
      🎮 جرّب مجاناً 45 ثانية
    </button>
</div>











{/* طريقة اللعب — تظهر فقط في حروف وألوف مع الجرس */}
{selectedGame.slug === "horof-bell" && (
  <section className="bg-white border border-[#eadcff] rounded-3xl p-6 md:p-8 shadow-xl mb-10">

    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-black text-[#3b0764] mb-3">
        كيف تلعب حروف وألوف مع الجرس؟
      </h2>

      <p className="text-gray-500 text-base md:text-lg font-bold">
        ابدأ التحدي في ثلاث خطوات بسيطة
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      {/* الخطوة الأولى */}
      <div className="relative bg-[#faf7ff] border border-[#eadcff] rounded-3xl p-6 text-center shadow-sm">

        <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-black">
          1
        </span>

        <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-purple-100 text-[#7c3aed] flex items-center justify-center">
          <i className="fa-solid fa-users text-4xl"></i>
        </div>

        <h3 className="text-xl md:text-2xl font-black text-[#3b0764] mb-3">
          قسّم اللاعبين
        </h3>

        <p className="text-gray-600 font-bold leading-8">
          قسّم المشاركين إلى فريقين، ثم اختر أسماء الفرق وابدأ جولة جديدة.
        </p>

      </div>

      {/* الخطوة الثانية */}
      <div className="relative bg-[#faf7ff] border border-[#eadcff] rounded-3xl p-6 text-center shadow-sm">

        <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-black">
          2
        </span>

        <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-purple-100 text-[#7c3aed] flex items-center justify-center">
          <i className="fa-solid fa-tv text-4xl"></i>
        </div>

        <h3 className="text-xl md:text-2xl font-black text-[#3b0764] mb-3">
          اعرض اللعبة
        </h3>

        <p className="text-gray-600 font-bold leading-8">
          اعرض اللعبة على التلفزيون أو الشاشة الكبيرة ليشاهد الجميع الحروف والأسئلة.
        </p>

      </div>

      {/* الخطوة الثالثة */}
      <div className="relative bg-[#faf7ff] border border-[#eadcff] rounded-3xl p-6 text-center shadow-sm">

        <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-black">
          3
        </span>

        <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-purple-100 text-[#7c3aed] flex items-center justify-center">
          <i className="fa-solid fa-bell text-4xl"></i>
        </div>

        <h3 className="text-xl md:text-2xl font-black text-[#3b0764] mb-3">
          اضغط الجرس وأجب
        </h3>

        <p className="text-gray-600 font-bold leading-8">
          أول فريق يضغط الجرس يحصل على فرصة الإجابة، والإجابة الصحيحة تمنحه النقطة.
        </p>

      </div>

    </div>

  </section>
)}

{selectedGame.screenshots?.length > 0 && (


  <section className="bg-white border border-[#eadcff] rounded-3xl p-5 md:p-8 shadow-xl mb-10">

    <div className="mb-6 text-center">
      <h2 className="text-2xl md:text-3xl font-black text-[#3b0764]">
        صور من الداخل
      </h2>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

      {selectedGame.screenshots.map((img, index) => (
        <button
          type="button"
          key={index}
          onClick={() => setPreviewImage(img)}
          className="group block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-[#e5e7eb] shadow-sm hover:shadow-md transition"
        >
        <img
  src={img}
  alt={`صورة ${index + 1} من داخل لعبة ${selectedGame.name}`}
  title={`لقطة من لعبة ${selectedGame.name}`}
  width="1920"
  height="1080"
  loading={index < 3 ? "eager" : "lazy"}
  decoding="async"
  className="w-full aspect-[16/9] object-cover group-hover:scale-[1.03] transition duration-300"
/>
        </button>
      ))}

    </div>

  </section>
)}

{previewImage && (
  <div
    role="dialog"
    aria-modal="true"
    aria-label="معاينة صورة اللعبة"
    onClick={() => setPreviewImage(null)}
    className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
  >
    <button
      type="button"
      aria-label="إغلاق الصورة"
      onClick={() => setPreviewImage(null)}
      className="absolute top-4 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-4xl font-light text-white hover:bg-white/25 transition"
    >
      ×
    </button>


   <img
  src={previewImage}
  alt={`صورة مكبرة من داخل لعبة ${selectedGame.name}`}
  onClick={(e) => e.stopPropagation()}
  decoding="async"
  fetchPriority="high"
  className="max-h-[90vh] max-w-[96vw] rounded-3xl object-contain shadow-2xl"
/>
  </div>
)}


{selectedGame.reviews.length > 0 && (
  <>
    <h2 className="text-3xl font-black mb-5">
      تقييمات اللاعبين
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
      {selectedGame.reviews.map((review,index)=>(
        <div
          key={index}
          className="bg-white border border-[#eadcff] rounded-3xl p-5 shadow"
        >
          <div className="font-black mb-2">
            {review.stars} {review.name}
          </div>

          <div className="text-[#6b7280]">
            {review.comment}
          </div>
        </div>
      ))}
    </div>
  </>
)}















<section className="mt-12 mb-6">

  <h2 className="text-3xl font-black text-[#3b0764] mb-8 text-center">
    ألعاب أخرى من زامن
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

    {games
      .filter((game) => game.id !== selectedGame.id)
      .map((game) => (

        <a
          key={game.id}
          href={`/game/${game.slug}`}
          onClick={(e) => {
            e.preventDefault();
            openGameDetails(game);
          }}
          className="block text-center"
        >

          <img
            src={game.image}
            alt={`${game.name} - لعبة جماعية من ألعاب زامن`}
            width="245"
            height="175"
            loading="lazy"
            decoding="async"
            className="w-full aspect-[7/5] object-cover rounded-3xl hover:scale-[1.03] transition duration-300"
          />

          <h3 className="mt-3 text-lg md:text-xl font-black text-[#3b0764]">
            {game.name}
          </h3>

        </a>

      ))}

  </div>

</section>








{selectedGame.slug === "horof-bell" && (
  <section className="faq-section">

    <div className="faq-heading-wrap">
      <h2 className="faq-heading">
الأسئلة الشائعة حول لعبة حروف

      </h2>
    </div>

    <div className="faq-list">

      {[
        {
          question: "هل هذه لعبة حروف مع عزيز التابعة لفريق فالكونز؟",
          answer:
            "لا، هذه لعبة حروف إصدار مستقل أُطلق عام 2025، ولا ترتبط بأي علاقة رسمية ببرنامج «لعبة حروف مع عزيز» التابع لفريق فالكونز. تقدم اللعبة تجربة تخمين كلمات وصور ممتعة مستوحاة من هذا النوع من الألعاب، ويمكن لعبها مباشرة من المتصفح دون تحميل باستخدام الجوال أو الكمبيوتر أو شاشة التلفزيون."
        },
        {
          question: "ما الفرق بين حروف وألوف مع الجرس والنسخة العادية؟",
          answer:
            "تحتوي هذه النسخة على جرس مدمج داخل اللعبة لإضافة أجواء تنافسية وحماس أكبر أثناء اللعب."
        },
        {
          question: "كم عدد الأسئلة في اللعبة؟",
          answer:
            "تحتوي اللعبة على أكثر من 2000 سؤال متنوع يغطي جميع الحروف."
        },
        {
          question: "هل تعمل اللعبة بدون تحميل؟",
          answer:
            "نعم، تعمل مباشرة من المتصفح على الجوال أو الكمبيوتر بدون الحاجة إلى تحميل أي تطبيق."
        },
        {
          question: "هل يمكن تشغيل اللعبة على التلفزيون؟",
          answer:
            "نعم، يمكن عرض اللعبة على شاشة التلفزيون لتستمتع بها العائلة والأصدقاء."
        },
        {
          question: "كم عدد اللاعبين؟",
          answer:
            "يمكن لعبها بواسطة لاعبين أو أكثر، وكلما زاد عدد اللاعبين أصبحت المنافسة أكثر متعة."
        },
        {
          question: "هل توجد تجربة مجانية؟",
          answer:
            "نعم، يمكنك تجربة اللعبة مجانًا لمدة 45 ثانية قبل شراء النسخة الكاملة."
        }
      ].map((item, index) => {

        const key = `horofbellfaq-${index}`;
        const isOpen = openFaq === key;

        return (
          <div key={key} className="faq-item">

            <button
              className="faq-question"
              onClick={() => setOpenFaq(isOpen ? null : key)}
            >
              <span className="faq-question-text">
                {item.question}
              </span>

              <span
                className={`faq-icon ${isOpen ? "open" : ""}`}
              ></span>
            </button>

            <div className={`faq-answer ${isOpen ? "open" : ""}`}>
              <div className="faq-answer-inner">
                <p className="faq-answer-text">
                  {item.answer}
                </p>
              </div>
            </div>

          </div>
        );
      })}

    </div>

  </section>
)}

</div>
</div>
</div>

{/* Footer — يظهر في جميع صفحات الألعاب */}
<footer className="mt-10 bg-gradient-to-r from-[#3b0764] via-[#6d28d9] to-[#7c3aed] text-white rounded-t-[40px]">

  <div className="max-w-6xl mx-auto px-6 py-12">

    <div className="grid md:grid-cols-3 gap-10 items-start">

      {/* التعريف */}
      <div>
        <h2 className="text-3xl font-black mb-4">
          ألعاب زامن
        </h2>

        <p className="text-white/80 leading-8 text-base">
          منصة ألعاب تفاعلية عربية تجمع العائلة والأصدقاء في تجربة
          مليئة بالمرح والتحدي. حوّل أي جلسة إلى لحظات لا تُنسى مع
          ألعاب جماعية متنوعة تعمل مباشرة من المتصفح.
        </p>
      </div>

      {/* الروابط */}
      <div>
        <h2 className="text-3xl font-black mb-4">
          روابط سريعة
        </h2>

        <div className="flex flex-col gap-3">

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();

              window.history.pushState({}, "", "/");

              setSelectedGame(null);
              setSelectedArticle(null);

              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
            }}
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 rounded-2xl font-black transition"
          >
            <i className="fa-solid fa-gamepad text-lg"></i>
            <span>ألعابنا</span>
          </a>

          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();

              window.history.pushState({}, "", "/blog");

              setSelectedGame(null);
              setSelectedArticle("blog-list");

              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
            }}
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 rounded-2xl font-black transition"
          >
            <i className="fa-solid fa-newspaper text-lg"></i>
            <span>المدونة</span>
          </a>

          <a
            href="https://zamn1.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 rounded-2xl font-black transition"
          >
            <i className="fa-solid fa-cart-shopping text-lg"></i>
            <span>المتجر</span>
          </a>

        </div>
      </div>

      {/* التواصل */}
      <div>
        <h2 className="text-3xl font-black mb-6">
          تواصل معنا
        </h2>

        <div className="flex gap-5">

          <a
            href="https://zamn1.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="زيارة متجر ألعاب زامن"
            className="w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition duration-300"
          >
            <i className="fa-solid fa-store text-4xl text-white"></i>
          </a>

          <a
            href="https://wa.me/message/ZDFHGX5MVYMOF1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="التواصل عبر واتساب"
            className="w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition duration-300"
          >
            <i className="fa-brands fa-whatsapp text-4xl text-white"></i>
          </a>

        </div>
      </div>

    </div>

    <div className="border-t border-white/20 mt-10 pt-6 text-center text-white/70 font-bold">
      © {new Date().getFullYear()} جميع الحقوق محفوظة - متجر ZAMN
    </div>

  </div>

</footer>

</div>



{showCodeBox && (
  <div
    className="
      fixed inset-0 z-[99999]
      flex items-center justify-center
      bg-[#1f122d]/90 backdrop-blur-md
      p-4
    "
    onClick={() => {
      setShowCodeBox(false);
      setCodeInput("");
    }}
  >
    <div
      dir="rtl"
      onClick={(e) => e.stopPropagation()}
      className="
        relative w-full max-w-md overflow-hidden
        rounded-[26px]
        border-[3px] border-[#d8cbea]
        bg-white
        shadow-[8px_8px_0_#a99ab8,0_25px_70px_rgba(31,18,45,.45)]
        animate-[codeBoxPop_.25s_ease-out]
      "
    >
      {/* مربعات كرتونية */}
      <span className="absolute left-4 top-4 z-20 h-3 w-3 bg-yellow-300"></span>
      <span className="absolute left-9 top-4 z-20 h-3 w-3 bg-white/50"></span>
      <span className="absolute bottom-4 right-4 z-20 h-3 w-3 bg-purple-300"></span>

      {/* رأس النافذة */}
      <div
        className="
          relative overflow-hidden
          border-b-[3px] border-[#4c1d95]
          bg-gradient-to-br
          from-[#3b0764] via-[#6d28d9] to-[#8b5cf6]
          px-6 py-8 text-center text-white
        "
      >
        {/* شبكة الخلفية */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "18px 18px"
          }}
        />

        <div className="relative z-10">
          <div
            className="
              mx-auto mb-4 flex h-20 w-20
              items-center justify-center
              rounded-2xl
              border-[3px] border-white/40
              bg-white/15
              text-5xl
              shadow-[6px_6px_0_rgba(37,13,64,.5)]
            "
          >
            🎮
          </div>

          <h2 className="text-3xl font-black">
            دخول اللعبة
          </h2>

          <p className="mt-2 text-sm font-bold text-white/80 md:text-base">
            أدخل رمز التفعيل لبدء اللعب
          </p>
        </div>
      </div>

      {/* جسم النافذة */}
      <div
        className="p-5 md:p-6"
        style={{
          backgroundColor: "#faf8fc",
          backgroundImage:
            "linear-gradient(rgba(124,58,237,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      >
        <label className="mb-2 block text-right text-sm font-black text-[#3b0764]">
          رمز اللعبة
        </label>

        <input
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              checkCode();
            }
          }}
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          placeholder="اكتب الرمز هنا"
          className="
            mb-5 h-16 w-full
            rounded-xl
            border-[3px] border-[#d8cfe0]
            bg-white px-4
            text-center text-2xl font-black
            text-[#3b0764]
            outline-none
            shadow-[4px_4px_0_#bfb3c9]
            transition
            focus:-translate-y-0.5
            focus:border-[#7c3aed]
            focus:shadow-[4px_4px_0_#4c1d95]
          "
        />

        <button
          type="button"
          onClick={checkCode}
          className="
            cairo-btn mb-4 flex h-14 w-full
            items-center justify-center gap-2
            rounded-xl
            border-[3px] border-[#15803d]
            bg-[#22c55e]
            text-lg font-black text-white
            shadow-[5px_5px_0_#15803d]
            transition
            hover:-translate-y-1
            hover:brightness-105
            active:translate-x-1
            active:translate-y-1
            active:shadow-none
          "
        >
          <i className="fa-solid fa-play"></i>
          <span>دخول اللعبة</span>
        </button>

        <a
          href={selectedGame.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            cairo-btn mb-4 flex h-14 w-full
            items-center justify-center gap-2
            rounded-xl
            border-[3px] border-[#4c1d95]
            bg-gradient-to-r
            from-[#6d28d9] to-[#8b5cf6]
            text-lg font-black text-white
            shadow-[5px_5px_0_#4c1d95]
            transition
            hover:-translate-y-1
            hover:brightness-105
            active:translate-x-1
            active:translate-y-1
            active:shadow-none
          "
        >
          <i className="fa-solid fa-key"></i>
          <span>الحصول على الرمز</span>
        </a>

        <button
          type="button"
          onClick={() => {
            setShowCodeBox(false);
            setCodeInput("");
          }}
          className="
            cairo-btn flex h-13 w-full
            items-center justify-center
            rounded-xl
            border-[3px] border-[#cfc5d5]
            bg-white
            py-3
            font-black text-[#52485a]
            shadow-[5px_5px_0_#bfb4c6]
            transition
            hover:-translate-y-1
            hover:bg-[#f3eff7]
            active:translate-x-1
            active:translate-y-1
            active:shadow-none
          "
        >
          إغلاق
        </button>
      </div>
    </div>
  </div>
)}














{gameFrame && (
  <div className="fixed inset-0 bg-black z-[999]">

    {trialTime !== null && (
      <div className="absolute top-4 left-4 bg-red-500 text-white px-5 py-3 rounded-2xl font-black z-[1000]">
        التجربة: {trialTime}
      </div>
    )}

    {!hideOverlayButtons && (
      <button
        onClick={()=>{
          if(trialTimer.current){
            clearInterval(trialTimer.current);
            trialTimer.current = null;
          }
        setGameFrame(null);
setTrialTime(null);
setHideOverlayButtons(false);
setGameEntryType(null);
updateOnlinePlayer({
  phone,
  playerName,
  currentGameId: null,
  currentGameName: null
});
        }}
        className="absolute top-4 right-4 bg-white text-black px-5 py-3 rounded-2xl font-black z-[1000]"
      >
        إغلاق
      </button>
    )}

  <iframe
  ref={gameIframeRef}
  src={gameFrame}
  title="اللعبة"
  className="w-full h-full border-0"
  onLoad={sendHostAccessToGame}
></iframe>

  </div>
)}

</>
);
}





return (
<>






















<div className="home-game-background page-enter">
  {showStats && (
      <div className="fixed inset-0 z-[10000] bg-[#f4f0ff] overflow-y-auto">

    <div className="sticky top-0 z-20 bg-gradient-to-r from-[#3b0764] to-[#7c3aed] text-white p-5 flex items-center justify-between">

      <h2 className="text-2xl font-black">
        📊 لوحة الإحصائيات
      </h2>

      <button
        onClick={()=>setShowStats(false)}
        className="bg-white text-[#3b0764] px-5 py-2 rounded-xl font-black"
      >
        إغلاق
      </button>

    </div>

    {!statsLoggedIn ? (
      <div className="max-w-sm mx-auto p-5 mt-16">

        <div className="bg-white rounded-3xl p-6 shadow-xl">

          <h3 className="text-2xl font-black text-[#3b0764] text-center mb-5">
            دخول الإدارة
          </h3>

          <input
            type="password"
            value={statsCode}
            onChange={(e)=>setStatsCode(e.target.value)}
            placeholder="اكتب رمز الإدارة"
            className="w-full h-14 border-2 border-purple-200 rounded-2xl text-center text-xl font-black mb-4"
          />

          <button
            onClick={()=>{
              if(statsCode === "7788"){
                setStatsLoggedIn(true);
              }else{
                showMessage("رمز الإدارة غير صحيح ❌","error");
              }
            }}
            className="w-full bg-[#7c3aed] text-white py-4 rounded-2xl font-black"
          >
            دخول
          </button>

        </div>

      </div>
    ) : (
      <div className="max-w-7xl mx-auto p-5">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white p-5 rounded-3xl shadow">
            <div className="text-gray-500 font-bold">
              الزيارات
            </div>

            <div className="text-4xl font-black text-purple-700 mt-2">
              {totalVisits}
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow">
            <div className="text-gray-500 font-bold">
              الأرقام المسجلة
            </div>

            <div className="text-4xl font-black text-purple-700 mt-2">
              {registeredCount}
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow">
            <div className="text-gray-500 font-bold">
              المتصلون الآن
            </div>

            <div className="text-4xl font-black text-green-600 mt-2">
              {onlineUsers.length}
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow">
            <div className="text-gray-500 font-bold">
              دخول الألعاب
            </div>

            <div className="text-4xl font-black text-orange-500 mt-2">
              {gameStats.reduce((total,game)=>total + game.count,0)}
            </div>
          </div>

        </div>
<h3 className="text-2xl font-black text-[#3b0764] mb-4">
  المتصلون الآن ({onlineUsers.length})
</h3>

<div className="bg-white rounded-3xl shadow overflow-x-auto mb-8">

  <table className="w-full min-w-[900px] text-right">

    <thead className="bg-[#3b0764] text-white">
      <tr>
        <th className="p-4">الاسم</th>
        <th className="p-4">رقم الجوال</th>
        <th className="p-4">ماذا يفعل الآن؟</th>
        <th className="p-4">وقت الاتصال</th>
        <th className="p-4">الحالة</th>
      </tr>
    </thead>

    <tbody>

      {onlineUsers.map((user)=>(
        <tr key={user.id} className="border-b hover:bg-purple-50">

          <td className="p-4 font-black">
            {user.playerName || "زائر غير مسجل"}
          </td>

          <td className="p-4 font-bold" dir="ltr">
            {user.phone ? `+${user.phone}` : "لم يسجل رقمه"}
          </td>

          <td className="p-4">
            {user.currentGameName ? (
              <span className="inline-block bg-purple-100 text-purple-700 px-3 py-2 rounded-full font-black">
                🎮 يلعب: {user.currentGameName}
              </span>
            ) : (
              <span className="inline-block bg-gray-100 text-gray-600 px-3 py-2 rounded-full font-black">
                👀 يتصفح الموقع
              </span>
            )}
          </td>

          <td className="p-4">
            {user.connectedAt
              ? new Date(user.connectedAt).toLocaleString("ar-SA")
              : "غير معروف"}
          </td>

          <td className="p-4">
            <span className="inline-block bg-green-100 text-green-700 px-3 py-2 rounded-full font-black">
              🟢 متصل الآن
            </span>
          </td>

        </tr>
      ))}

      {onlineUsers.length === 0 && (
        <tr>
          <td
            colSpan="5"
            className="p-8 text-center text-gray-500 font-bold"
          >
            لا يوجد أحد في الموقع الآن
          </td>
        </tr>
      )}

    </tbody>

  </table>

</div><div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">

  <h3 className="text-2xl font-black text-[#3b0764]">
    عدد دخول كل لعبة
  </h3>

  <button
    onClick={resetAllGameStats}
    className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-black"
  >
    🗑️ تصفير جميع الألعاب
  </button>

</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">

  {gameStats.map((game) => {
    const periodStats = getGamePeriodStats(game.id);






    return (
      <div
        key={game.id}
        className="bg-white rounded-3xl p-5 shadow border border-purple-100"
      >

        <div className="flex items-center justify-between gap-3 mb-5">

          <div className="font-black text-[#3b0764] text-xl">
            {game.name}
          </div>

          <button
            onClick={() => resetOneGameStats(game.id, game.name)}
            className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-xl font-black text-sm"
          >
            تصفير
          </button>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

          <div className="bg-blue-50 rounded-2xl p-3 text-center">
            <div className="text-gray-500 text-xs font-bold">
              آخر دقيقة
            </div>
            <div className="text-2xl font-black text-blue-600 mt-1">
              {periodStats.minute}
            </div>
          </div>

          <div className="bg-cyan-50 rounded-2xl p-3 text-center">
            <div className="text-gray-500 text-xs font-bold">
              آخر ساعة
            </div>
            <div className="text-2xl font-black text-cyan-600 mt-1">
              {periodStats.hour}
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-3 text-center">
            <div className="text-gray-500 text-xs font-bold">
              اليوم
            </div>
            <div className="text-2xl font-black text-green-600 mt-1">
              {periodStats.today}
            </div>
          </div>

          <div className="bg-orange-50 rounded-2xl p-3 text-center">
            <div className="text-gray-500 text-xs font-bold">
              آخر 7 أيام
            </div>
            <div className="text-2xl font-black text-orange-600 mt-1">
              {periodStats.week}
            </div>
          </div>

          <div className="bg-pink-50 rounded-2xl p-3 text-center">
            <div className="text-gray-500 text-xs font-bold">
              آخر 30 يوم
            </div>
            <div className="text-2xl font-black text-pink-600 mt-1">
              {periodStats.month}
            </div>
          </div>

          <div className="bg-purple-100 rounded-2xl p-3 text-center">
            <div className="text-purple-600 text-xs font-bold">
              الإجمالي
            </div>
            <div className="text-2xl font-black text-purple-700 mt-1">
              {periodStats.total}
            </div>
          </div>

        </div>

      </div>
    );
  })}

  {gameStats.length === 0 && (
    <div className="lg:col-span-2 bg-white rounded-3xl p-8 text-center text-gray-500 font-bold shadow">
      لا توجد إحصائيات دخول حتى الآن
    </div>
  )}

</div>


        <h3 className="text-2xl font-black text-[#3b0764] mb-4">
          كل الأرقام المسجلة والألعاب المملوكة
        </h3>

        <div className="bg-white rounded-3xl shadow overflow-x-auto">

          <table className="w-full min-w-[850px] text-right">

            <thead className="bg-[#3b0764] text-white">
              <tr>
                <th className="p-4">الاسم</th>
                <th className="p-4">رقم الجوال</th>
                <th className="p-4">الألعاب المملوكة</th>
                <th className="p-4">آخر دخول</th>
              </tr>
            </thead>

            <tbody>

              {customersList.map((customer) => (
                <tr key={customer.phone} className="border-b">

                  <td className="p-4 font-black">
                    {customer.name}
                  </td>

                  <td className="p-4 font-bold" dir="ltr">
                    +{customer.phone}
                  </td>

                  <td className="p-4">
                    {customer.games.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {customer.games.map((gameName, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full text-sm font-black"
                          >
                            {gameName}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 font-bold">
                        لا يملك ألعاب
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    {customer.lastLogin
                      ? new Date(customer.lastLogin).toLocaleString("ar-SA")
                      : "لا يوجد"}
                  </td>

                </tr>
              ))}

              {customersList.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-8 text-center text-gray-500 font-bold"
                  >
                    لا توجد أرقام مسجلة
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>



      </div>
    )}

  </div>
)}



<SiteMessageModal />




{!gameFrame && (
  <div className="fixed top-2 left-2 z-[3000]">
    <button
      onClick={() => setShowLoginBox(true)}
      className="bg-white text-[#6d28d9] border-2 border-[#eadcff] shadow-xl px-5 py-3 rounded-full font-black"
    >
      {phone ? "🎮 ألعابي" : "👤 تسجيل دخول"}
    </button>
  </div>
)}
<div className="relative overflow-hidden bg-gradient-to-br from-[#3b0764] via-[#5b21b6] to-[#7c3aed] text-white">
<div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
    <div className="grid md:grid-cols-2 gap-10 items-center">

<div className="text-center md:text-right hero-text-enter">
<h1
  onClick={handleStatsSecretClick}
  className="text-4xl md:text-5xl font-black mb-4 cursor-default select-none"
>
  ألعاب الجمعات
</h1>

<p className="text-base md:text-xl text-white/80 leading-8 mb-5">          تجاوزنا مرحلة تحميل التطبيقات وتعقيد الإعدادات.
          افتح متصفحك، اعرض اللعبة على شاشة التلفزيون،
        </p>

<div className="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
          <span
className="bg-white/15 px-4 py-2 rounded-full backdrop-blur text-sm font-bold"          >
            ألعاب تفاعلية
          </span>

          <span className="bg-white/15 px-4 py-2 rounded-full backdrop-blur text-sm font-bold"     >        لعبة حروف
          </span>

          <span 
className="bg-white/15 px-4 py-2 rounded-full backdrop-blur text-sm font-bold"          >
            العب فوراً
          </span>

          <span
className="bg-white/15 px-4 py-2 rounded-full backdrop-blur text-sm font-bold"          >
            بدون تحميل
          </span>

        </div>

        <button
          onClick={()=>{
            document.getElementById("games-list").scrollIntoView({
              behavior:"smooth"
            });
          }}


  className="bg-orange-500 hover:bg-orange-600 px-7 py-3 rounded-full font-black text-base inline-flex items-center justify-center gap-2"
>

  <i className="fa-solid fa-play text-xs"></i>
  <span>استعرض الألعاب</span>
</button>
      </div>

<div className="flex justify-center hero-logo-enter">


    <img
  src="https://i.postimg.cc/Y9T6ZMng/nqn.webp"
  alt="شعار ألعاب زامن"
  width="256"
  height="256"
  className="w-52 md:w-72"
  />


      </div>

    </div>
  </div>











<svg
  className="block w-full -mt-8 -mb-[2px]"
  viewBox="0 0 1440 120"
  preserveAspectRatio="none"
>
  <path
    fill="#f4f0ff"
    d="M0,80 C250,130 500,130 720,90 C950,50 1200,40 1440,80 L1440,120 L0,120 Z"
  />
</svg>

</div>

















{showLoginBox && (
  <div className="player-login-overlay">

    <div className="player-login-page">

      <div className="player-login-header">

        <div className="player-login-pixels">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <button
          type="button"
          onClick={() => setShowLoginBox(false)}
          className="player-login-back"
        >
          <i className="fa-solid fa-house"></i>
          <span>الرئيسية</span>
        </button>

        {phone && (
          <button
            type="button"
            onClick={() => {
              showMessage("هل أنت متأكد من تسجيل الخروج؟", "confirm");
            }}
            className="player-login-logout"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>تسجيل الخروج</span>
          </button>
        )}

        <div className="player-login-header-grid"></div>

        <div className="player-login-header-content">

          <div className="player-login-icon">
            {phone ? "🕹️" : "🎮"}
          </div>

          <h2 className="player-login-title">
            {phone ? "مكتبتي" : "دخول اللاعب"}
          </h2>

          <p className="player-login-subtitle">
            {phone
              ? "ألعابك المحفوظة في مكان واحد"
              : "سجّل رقمك للوصول إلى ألعابك"}
          </p>

        </div>

      </div>

      <div className="player-login-content">

        {!phone ? (
          <div className="player-login-card">

            <label className="player-login-label">
              رقم الجوال
            </label>

            <div className="player-phone-row" dir="ltr">

              <div className="player-country-wrap">

                <button
                  type="button"
                  onClick={() => setShowCountries(!showCountries)}
                  className="player-country-button"
                >
                  <span>{selectedCountry.flag}</span>
                  <span>+{selectedCountry.code}</span>
                  <span className="player-country-arrow">⌄</span>
                </button>

                {showCountries && (
                  <div className="player-country-list">

                    {arabCountries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setShowCountries(false);
                          setPhoneInput("");
                        }}
                        className="player-country-item"
                      >
                        <span>{country.name}</span>

                        <span>
                          {country.flag} +{country.code}
                        </span>
                      </button>
                    ))}

                  </div>
                )}

              </div>

              <input
                value={phoneInput}
                onChange={(e) =>
                  setPhoneInput(e.target.value.replace(/\D/g, ""))
                }
                placeholder="رقم الجوال"
                maxLength={selectedCountry.length}
                inputMode="numeric"
                className="player-login-input"
              />

            </div>

            {needName && (
              <div className="player-name-section">

                <div className="player-login-notice">
                  اكتب اسم اللاعب أولاً
                </div>

                <input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="اسم اللاعب"
                  className="player-login-input player-name-input"
                />

                <label className="player-terms">

                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />

                  <span>
                    أتعهد بعدم نشر الألعاب أو رموز التشغيل أو أي معلومات
                    من داخل الألعاب، وأتحمل المسؤولية عند مخالفة ذلك.
                  </span>

                </label>

              </div>
            )}

            <button
              type="button"
              onClick={needName ? savePlayerName : loginPhone}
              disabled={loadingPhone}
              className="player-login-main-button"
            >
              <i className="fa-solid fa-play"></i>

              <span>
                {loadingPhone
                  ? "جاري الدخول..."
                  : needName
                  ? "حفظ الاسم"
                  : "دخول"}
              </span>
            </button>

            <p className="player-login-help">
              أدخل رمز اللعبة مرة واحدة وسيتم حفظها تلقائيًا.
            </p>

          </div>
        ) : (
          <div className="player-library">

            <div className="player-account-card">

              <div>
                <div className="player-account-label">
                  حساب اللاعب
                </div>

                <div className="player-account-name">
                  {playerName || "لا يوجد اسم"}
                </div>

                <div className="player-account-phone">
                  +{phone}
                </div>
              </div>

              <div className="player-online-badge">
                <span></span>
                متصل
              </div>

            </div>

            <div className="player-library-heading">

              <div>
                <h3>ألعابي المحفوظة</h3>
                <p>اختر اللعبة التي تريد فتحها</p>
              </div>

              <div className="player-library-count">
                {ownedGames.length}
              </div>

            </div>

            {ownedGames.length === 0 ? (
              <div className="player-empty-library">

                <div className="player-empty-icon">
                  🕹️
                </div>

                <h3>
                  لا توجد ألعاب محفوظة
                </h3>

                <p>
                  اختر لعبة من الصفحة الرئيسية، ثم أدخل رمزها مرة واحدة.
                </p>

                <button
                  type="button"
                  onClick={() => setShowLoginBox(false)}
                  className="player-empty-button"
                >
                  استعرض الألعاب
                </button>

              </div>
            ) : (
              <div className="player-games-list">

                {games
                  .filter((game) =>
                    ownedGames.includes(String(game.code))
                  )
                  .map((game) => (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => {
                        setShowLoginBox(false);
                        openGameDetails(game);
                      }}
                      className="player-library-game"
                    >

                      <div className="player-library-image-wrap">

                        <img
                          src={game.image}
                          alt={`${game.name} - صورة اللعبة`}
                          width="74"
                          height="74"
                          loading="eager"
                          decoding="async"
                          className="player-library-image"
                        />

                      </div>

                      <div className="player-library-game-info">

                        <h4>
                          {game.name}
                        </h4>

                        <p>
                          {game.category} • {game.players}
                        </p>

                        <div className="player-library-tags">

                          {game.badge && (
                            <span>
                              {game.badge}
                            </span>
                          )}

                          {game.questions && (
                            <span>
                              {game.questions}
                            </span>
                          )}

                        </div>

                      </div>

                      <div className="player-library-open">
                        فتح
                      </div>

                    </button>
                  ))}

              </div>
            )}

          </div>
        )}

      </div>

    </div>

  </div>
)}






{gameFrame && (
  <div className="fixed inset-0 bg-black z-[999]">

    {trialTime !== null && (
      <div className="absolute top-4 left-4 bg-red-500 text-white px-5 py-3 rounded-2xl font-black z-[1000]">
        التجربة: {trialTime}
      </div>
    )}

    {!hideOverlayButtons && (
      <button
        onClick={()=>{
          if(trialTimer.current){
            clearInterval(trialTimer.current);
            trialTimer.current = null;
          }

          setGameFrame(null);
          setTrialTime(null);
          setHideOverlayButtons(false);

          updateOnlinePlayer({
            phone,
            playerName,
            currentGameId: null,
            currentGameName: null
          });
        }}
        className="absolute top-4 right-4 bg-white text-black px-5 py-3 rounded-2xl font-black z-[1000]"
      >
        إغلاق
      </button>
    )}
<iframe
  ref={gameIframeRef}
  src={gameFrame}
  title="اللعبة"
  className="w-full h-full border-0"
  onLoad={sendHostAccessToGame}
></iframe>

</div>

)}



<div id="games-list" className="max-w-6xl mx-auto px-5 py-8">
<div className="flex flex-col items-center mb-10 reveal-on-scroll">
<div className="bg-white border border-[#f1e8ff] shadow-md rounded-full px-8 py-2">
      <h2 className="text-2xl md:text-3xl font-black text-[#3b0764] text-center">
        ألعابنا
      </h2>
    </div>

    <p className="mt-5 text-center text-gray-500 text-base md:text-lg font-bold leading-8 max-w-2xl">
      اختر لعبتك المفضلة وابدأ التحدي مع أصدقائك.
    </p>

  </div>
  
  {/* هنا تبدأ بطاقات الألعاب */}




{[
  {
    title:" حروف والوف",
    items:games.filter(game => game.name.includes("حروف والوف"))
  },
  {
    title:" تحدي الصور",
    items:games.filter(game => game.name.includes("تحدي الصور"))
  },
  {
    title:" ألعاب أخرى",
    items:games.filter(game =>
      !game.name.includes("حروف والوف") &&
      !game.name.includes("تحدي الصور")
    )
  }
].map(section => (
  section.items.length > 0 && (
<div key={section.title} className="mb-12">

  <div className="flex items-center gap-3 mb-5">
  <div className="w-2 h-9 rounded-full bg-[#7c3aed]"></div>

  <h2 className="text-2xl font-black text-[#3b0764]">
    {section.title}
  </h2>

   
  </div>


      <div className="games-grid">

{section.items.map((game, index) => (






          <a
  key={game.id}
  href={`/game/${game.slug}`}
  onClick={(e) => {
    e.preventDefault();
    openGameDetails(game);
  }}
className={`game-card reveal-on-scroll reveal-delay-${(index % 4) + 1}`}
>

  <div className="game-image-box">

    <img
      src={game.image}
      alt={`${game.name} - لعبة جماعية من ألعاب زامن`}
      width="245"
      height="175"
      loading="lazy"
      decoding="async"
      fetchpriority="low"
      className="game-image"
    />

             
            </div>

            <div className="game-content">

              <h3 className="game-title">
                {game.name}
              </h3>

              {false && (
                <p className="game-desc">
                  {game.description}
                </p>
              )}
              
<div className="game-tags">

  {game.slug !== "horof-bell" && (
    <span className="game-tag">{game.players}</span>
  )}

  {game.questions && (
    <span className="game-tag">{game.questions}</span>
  )}

  {(game.slug === "horof-bell" || !game.questions) && (
    <span className="game-tag">{game.badge}</span>
  )}

</div>
<span className="game-btn flex items-center justify-center">
  عرض اللعبة
</span>


            </div>

        </a>
))}

      </div>

    </div>
  )
))}







{/* الباقات */}
<section className="py-20 px-5 bg-white/35">

  <div className="text-center mb-12">

    <span className="inline-block bg-[#3b0764] text-white px-8 py-3 rounded-full text-xl font-black">
      الباقات
    </span>

    <h2 className="text-4xl font-black text-[#3b0764] mt-6">
      وفر أكثر مع الباقات
    </h2>

    <p className="text-gray-600 text-lg mt-3 font-bold">
      اشتر أكثر من لعبة واحصل على أفضل سعر.
    </p>

  </div>

  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

    {/* باقة جميع الألعاب */}
<div className="package-card reveal-on-scroll reveal-delay-1 relative bg-white rounded-[30px] border-4 border-[#7c3aed] shadow-2xl p-8 overflow-hidden">

      <div className="absolute top-4 left-4 bg-[#7c3aed] text-white px-4 py-2 rounded-full text-sm font-black rotate-[-8deg]">
        الأكثر توفيرًا
      </div>

      <div className="text-6xl text-center mb-4">
        👑
      </div>

      <h3 className="text-3xl text-center font-black text-[#3b0764]">
        باقة جميع الألعاب
      </h3>

      <p className="text-center text-gray-500 mt-4 leading-8 font-bold">
        احصل على جميع ألعاب زامن الحالية
        وجميع الألعاب التي ستصدر لاحقًا ضمن الباقة.
      </p>

      <a
        href="https://zamn1.com/%D8%A8%D9%83%D8%AC-%D8%A7%D9%84%D8%A3%D9%84%D8%B9%D8%A7%D8%A8-%D8%A7%D9%84%D8%A3%D9%83%D8%A8%D8%B1-%D8%A8%D8%A7%D9%84%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE!/p1077969731"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex justify-center items-center bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white h-14 rounded-full font-black text-lg transition hover:scale-105"
      >
        شراء الباقة 👑
      </a>

    </div>

    {/* باقة 4 ألعاب */}
<div className="package-card reveal-on-scroll reveal-delay-2 relative bg-white rounded-[30px] border-2 border-[#eadcff] shadow-xl p-6 md:p-7 md:scale-95">
      <div className="text-6xl text-center mb-4">
        🎁
      </div>

      <h3 className="text-3xl text-center font-black text-[#3b0764]">
        باقة 4 ألعاب
      </h3>

      <p className="text-center text-gray-500 mt-4 leading-8 font-bold">
      تضم الباقة:
حروف مع عزيز + تحدي الصور + فوازير + فاميلي فيود
بسعر أوفر من شراء كل لعبة بشكل منفصل.
      </p>

      <a
        href="https://zamn1.com/%D8%AD%D8%B1%D9%88%D9%81-%D9%85%D8%B9-%D8%B9%D8%B2%D9%8A%D8%B2-+%D8%AA%D8%AD%D8%AF%D9%8A-%D8%A7%D9%84%D8%B5%D9%88%D8%B1-+%D9%81%D9%88%D8%A7%D8%B2%D9%8A%D8%B1/p1476560404"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex justify-center items-center bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white h-14 rounded-full font-black text-lg transition hover:scale-105"
      >
        شراء الباقة 🎁
      </a>

    </div>

  </div>

</section>



























{/* لماذا ألعاب زامن؟ */}
<section className="max-w-6xl mx-auto px-5 py-14">

  <div className="flex justify-center mb-10">
    <div className="bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white px-10 py-3 rounded-full shadow-lg">
      <h2 className="text-3xl font-black">
        لماذا ألعاب زامن؟
      </h2>
    </div>
  </div>

  <div className="grid md:grid-cols-2 gap-6">

<div className="feature-card reveal-on-scroll reveal-delay-1 bg-white rounded-3xl border border-purple-100 shadow-lg p-8 text-center">
      <div className="w-20 h-20 rounded-3xl bg-purple-100 flex items-center justify-center mx-auto mb-5">
        <i className="fa-solid fa-language text-4xl text-[#7c3aed]"></i>
      </div>

      <h3 className="text-2xl font-black text-[#3b0764] mb-3">
        محتوى عربي
      </h3>

      <p className="text-gray-600 leading-8 font-bold">
        ألعاب مصممة بالكامل باللغة العربية ومناسبة للثقافة العربية.
      </p>
    </div>

<div className="feature-card reveal-on-scroll reveal-delay-2 bg-white rounded-3xl border border-purple-100 shadow-lg p-8 text-center">
      <div className="w-20 h-20 rounded-3xl bg-purple-100 flex items-center justify-center mx-auto mb-5">
        <i className="fa-solid fa-bolt text-4xl text-[#7c3aed]"></i>
      </div>

      <h3 className="text-2xl font-black text-[#3b0764] mb-3">
        العب فورًا
      </h3>

      <p className="text-gray-600 leading-8 font-bold">
        بدون تحميل تطبيقات، افتح الرابط والعب مباشرة من أي جهاز.
      </p>
    </div>

<div className="feature-card reveal-on-scroll reveal-delay-3 bg-white rounded-3xl border border-purple-100 shadow-lg p-8 text-center">
      <div className="w-20 h-20 rounded-3xl bg-purple-100 flex items-center justify-center mx-auto mb-5">
        <i className="fa-solid fa-tv text-4xl text-[#7c3aed]"></i>
      </div>

      <h3 className="text-2xl font-black text-[#3b0764] mb-3">
        شاشة كبيرة
      </h3>

      <p className="text-gray-600 leading-8 font-bold">
        اعرض اللعبة على التلفزيون وكل لاعب يستخدم جواله كجهاز تحكم.
      </p>
    </div>

<div className="feature-card reveal-on-scroll reveal-delay-4 bg-white rounded-3xl border border-purple-100 shadow-lg p-8 text-center">
      <div className="w-20 h-20 rounded-3xl bg-purple-100 flex items-center justify-center mx-auto mb-5">
        <i className="fa-solid fa-users text-4xl text-[#7c3aed]"></i>
      </div>

      <h3 className="text-2xl font-black text-[#3b0764] mb-3">
        تجمعات أحلى
      </h3>

      <p className="text-gray-600 leading-8 font-bold">
        حوّل أي جلسة إلى تحدٍ ممتع ومنافسة حماسية بين العائلة والأصدقاء.
      </p>
    </div>

  </div>

</section>








{/* الأسئلة الشائعة */}
<section className="faq-section">

  <div className="faq-heading-wrap">
    <h2 className="faq-heading">
      الأسئلة الشائعة
    </h2>
  </div>

  <div className="faq-list">

    {faqItems
      .slice(0, showMoreFaq ? faqItems.length : 4)
      .map((item, index) => {

        const isOpen = openFaq === index;

        return (
          <div
            key={index}
            className="faq-item"
          >

            <button
              type="button"
              className="faq-question"
              onClick={() => {
                setOpenFaq(isOpen ? null : index);
              }}
              aria-expanded={isOpen}
            >
              <span className="faq-question-text">
                {item.question}
              </span>

           <span
  className={`faq-icon ${isOpen ? "open" : ""}`}
  aria-hidden="true"
></span>
            </button>

            <div className={`faq-answer ${isOpen ? "open" : ""}`}>
              <div className="faq-answer-inner">
                <p className="faq-answer-text">
                  {item.answer}
                </p>
              </div>
            </div>

          </div>
        );
      })}

  </div>



{faqItems.length > 4 && (
  <div className="faq-more-wrap">
    <button
      type="button"
      className="faq-more-btn"
      onClick={() => {
        setShowMoreFaq(prev => {
          const nextValue = !prev;

          if (!nextValue && openFaq !== null && openFaq >= 4) {
            setOpenFaq(null);
          }

          return nextValue;
        });
      }}
    >
     {showMoreFaq
  ? " عرض أسئلة أقل"
  : " عرض المزيد من الأسئلة "
}
    </button>
  </div>
)}

</section>



</div>








{/* Footer */}
<div className="mt-0 bg-gradient-to-r from-[#3b0764] via-[#6d28d9] to-[#7c3aed] text-white rounded-t-[40px]">

  <div className="max-w-6xl mx-auto px-6 py-12">

    <div className="grid md:grid-cols-3 gap-10 items-start">

      {/* التعريف */}
      <div>
        <h3 className="text-3xl font-black mb-4">
          ألعاب زامن
        </h3>

        <p className="text-white/80 leading-8 text-base">
          منصة ألعاب تفاعلية عربية تجمع العائلة والأصدقاء في تجربة مليئة بالمرح والتحدي.
          حوّل أي جلسة إلى لحظات لا تُنسى مع ألعاب جماعية متنوعة تعمل مباشرة من المتصفح.
        </p>
      </div>

      {/* الروابط */}
      <div>
        <h3 className="text-3xl font-black mb-4">
          روابط سريعة
        </h3>

        <div className="flex flex-col gap-3">

          <a
            href="/"
            onClick={(e)=>{
              e.preventDefault();
              window.history.pushState({}, "", "/");
              setSelectedGame(null);
              setSelectedArticle(null);
              window.scrollTo({top:0,behavior:"smooth"});
            }}
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 rounded-2xl font-black transition"
          >
            <i className="fa-solid fa-gamepad text-lg"></i>
            <span>ألعابنا</span>
          </a>

          <a
            href="/blog"
            onClick={(e)=>{
              e.preventDefault();
              window.history.pushState({}, "", "/blog");
              setSelectedGame(null);
              setSelectedArticle("blog-list");
              window.scrollTo({top:0,behavior:"smooth"});
            }}
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 rounded-2xl font-black transition"
          >
            <i className="fa-solid fa-newspaper text-lg"></i>
            <span>المدونة</span>
          </a>

          <a
            href="https://zamn1.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 rounded-2xl font-black transition"
          >
            <i className="fa-solid fa-cart-shopping text-lg"></i>
            <span>المتجر</span>
          </a>

        </div>
      </div>

      {/* التواصل */}
      <div>
        <h3 className="text-3xl font-black mb-6">
          تواصل معنا
        </h3>

        <div className="flex gap-5">

          <a
            href="https://zamn1.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition duration-300"
            title="المتجر"
          >
            <i className="fa-solid fa-store text-4xl text-white"></i>
          </a>

          <a
            href="https://wa.me/message/ZDFHGX5MVYMOF1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition duration-300"
            title="واتساب"
          >
            <i className="fa-brands fa-whatsapp text-4xl text-white"></i>
          </a>

        </div>

      </div>

    </div>

    <div className="border-t border-white/20 mt-10 pt-6 text-center text-white/70 font-bold">
      © {new Date().getFullYear()} جميع الحقوق محفوظة - متجر ZAMN
    </div>

  </div>

</div>

</div>
</>
);
}














ReactDOM.createRoot(document.getElementById("root")).render(<App />);