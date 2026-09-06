/* ============================================================
   منهج «تحت شجرة النخيل» لتعلّم الإنجليزية
   ------------------------------------------------------------
   ملف محتوى مشترك تستورده كل الألعاب، حتى يبقى المنهج واحداً
   ويكفي تحديثه في مكان واحد.

   المحتوى:
     VOCAB        مفردات موزّعة على ٣٥ موضوعاً
     SPELLING     أخطاء إملائية شائعة وتصحيحها
     GRAMMAR      أسئلة قواعد بخيارات
     SENTENCES    جمل فيها كلمة خاطئة تُلتقط وتُصحّح
     OPPOSITES    الأضداد
     PLURALS      الجموع الشاذة والمنتظمة
     PREPS        حروف الجر
     TENSES       الأزمنة: مضارع، ماضٍ، مستقبل، مستمر، تام
     COMPARE      المقارنة والتفضيل
     QUESTIONS    أدوات الاستفهام
     ARTICLES     a / an / the
     PRONOUNS     الضمائر
     UNITS        عشر وحدات
     LEVELS       مئة مستوى مبنية على الوحدات
============================================================ */

(function (root) {
'use strict';

/* ============================================================
   ١) المفردات — {en: إنجليزي، ar: عربي، e: رمز}
============================================================ */
const VOCAB = {

family: { ar:"العائلة", en:"Family", items:[
  {en:"mother",ar:"أم",e:"👩"},{en:"father",ar:"أب",e:"👨"},{en:"sister",ar:"أخت",e:"👧"},
  {en:"brother",ar:"أخ",e:"👦"},{en:"grandmother",ar:"جدة",e:"👵"},{en:"grandfather",ar:"جد",e:"👴"},
  {en:"aunt",ar:"عمة",e:"🧕"},{en:"uncle",ar:"عم",e:"🧔"},{en:"cousin",ar:"ابن العم",e:"🧑"},
  {en:"baby",ar:"رضيع",e:"👶"},{en:"son",ar:"ابن",e:"👦"},{en:"daughter",ar:"ابنة",e:"👧"},
  {en:"family",ar:"عائلة",e:"👨‍👩‍👧"},{en:"parents",ar:"والدان",e:"👫"},{en:"child",ar:"طفل",e:"🧒"},
  {en:"friend",ar:"صديق",e:"🤝"},{en:"neighbour",ar:"جار",e:"🏘️"},{en:"guest",ar:"ضيف",e:"🎁"}
]},

home: { ar:"البيت", en:"Home", items:[
  {en:"house",ar:"بيت",e:"🏠"},{en:"door",ar:"باب",e:"🚪"},{en:"window",ar:"نافذة",e:"🪟"},
  {en:"room",ar:"غرفة",e:"🛏️"},{en:"bed",ar:"سرير",e:"🛏️"},{en:"table",ar:"طاولة",e:"🪑"},
  {en:"chair",ar:"كرسي",e:"🪑"},{en:"lamp",ar:"مصباح",e:"💡"},{en:"key",ar:"مفتاح",e:"🔑"},
  {en:"wall",ar:"جدار",e:"🧱"},{en:"roof",ar:"سطح",e:"🏚️"},{en:"floor",ar:"أرضية",e:"🟫"},
  {en:"stairs",ar:"درج",e:"🪜"},{en:"garden",ar:"حديقة",e:"🌷"},{en:"mirror",ar:"مرآة",e:"🪞"},
  {en:"carpet",ar:"سجادة",e:"🧶"},{en:"clock",ar:"ساعة حائط",e:"🕰️"},{en:"curtain",ar:"ستارة",e:"🪟"}
]},

kitchen: { ar:"المطبخ", en:"Kitchen", items:[
  {en:"kitchen",ar:"مطبخ",e:"🍳"},{en:"plate",ar:"صحن",e:"🍽️"},{en:"cup",ar:"كوب",e:"☕"},
  {en:"spoon",ar:"ملعقة",e:"🥄"},{en:"fork",ar:"شوكة",e:"🍴"},{en:"knife",ar:"سكين",e:"🔪"},
  {en:"pot",ar:"قدر",e:"🍲"},{en:"pan",ar:"مقلاة",e:"🍳"},{en:"oven",ar:"فرن",e:"🔥"},
  {en:"fridge",ar:"ثلاجة",e:"🧊"},{en:"bowl",ar:"وعاء",e:"🥣"},{en:"kettle",ar:"غلاية",e:"🫖"},
  {en:"tray",ar:"صينية",e:"🍱"},{en:"bottle",ar:"قارورة",e:"🍶"},{en:"basket",ar:"سلة",e:"🧺"},
  {en:"stove",ar:"موقد",e:"🔥"}
]},

school: { ar:"المدرسة", en:"School", items:[
  {en:"school",ar:"مدرسة",e:"🏫"},{en:"teacher",ar:"معلّم",e:"👩‍🏫"},{en:"student",ar:"طالب",e:"🧑‍🎓"},
  {en:"book",ar:"كتاب",e:"📖"},{en:"pen",ar:"قلم حبر",e:"🖊️"},{en:"pencil",ar:"قلم رصاص",e:"✏️"},
  {en:"ruler",ar:"مسطرة",e:"📏"},{en:"eraser",ar:"ممحاة",e:"🧽"},{en:"bag",ar:"حقيبة",e:"🎒"},
  {en:"desk",ar:"مكتب",e:"🪑"},{en:"board",ar:"سبورة",e:"📋"},{en:"paper",ar:"ورقة",e:"📄"},
  {en:"lesson",ar:"درس",e:"📚"},{en:"homework",ar:"واجب",e:"📝"},{en:"library",ar:"مكتبة",e:"📚"},
  {en:"exam",ar:"امتحان",e:"🧾"},{en:"answer",ar:"إجابة",e:"✅"},{en:"question",ar:"سؤال",e:"❓"}
]},

body: { ar:"الجسم", en:"Body", items:[
  {en:"head",ar:"رأس",e:"🧠"},{en:"hair",ar:"شعر",e:"💇"},{en:"eye",ar:"عين",e:"👁️"},
  {en:"ear",ar:"أذن",e:"👂"},{en:"nose",ar:"أنف",e:"👃"},{en:"mouth",ar:"فم",e:"👄"},
  {en:"tooth",ar:"سن",e:"🦷"},{en:"tongue",ar:"لسان",e:"👅"},{en:"neck",ar:"رقبة",e:"🧣"},
  {en:"hand",ar:"يد",e:"✋"},{en:"finger",ar:"إصبع",e:"👆"},{en:"arm",ar:"ذراع",e:"💪"},
  {en:"leg",ar:"ساق",e:"🦵"},{en:"foot",ar:"قدم",e:"🦶"},{en:"knee",ar:"ركبة",e:"🦵"},
  {en:"heart",ar:"قلب",e:"❤️"},{en:"back",ar:"ظهر",e:"🔙"},{en:"shoulder",ar:"كتف",e:"🫱"}
]},

clothes: { ar:"الملابس", en:"Clothes", items:[
  {en:"shirt",ar:"قميص",e:"👕"},{en:"trousers",ar:"بنطال",e:"👖"},{en:"dress",ar:"فستان",e:"👗"},
  {en:"shoes",ar:"حذاء",e:"👟"},{en:"sandals",ar:"صندل",e:"🩴"},{en:"hat",ar:"قبعة",e:"🎩"},
  {en:"cap",ar:"كاب",e:"🧢"},{en:"scarf",ar:"وشاح",e:"🧣"},{en:"socks",ar:"جوارب",e:"🧦"},
  {en:"coat",ar:"معطف",e:"🧥"},{en:"glasses",ar:"نظارة",e:"👓"},{en:"watch",ar:"ساعة يد",e:"⌚"},
  {en:"belt",ar:"حزام",e:"🪢"},{en:"gloves",ar:"قفازات",e:"🧤"},{en:"ring",ar:"خاتم",e:"💍"},
  {en:"pocket",ar:"جيب",e:"👝"}
]},

colours: { ar:"الألوان", en:"Colours", items:[
  {en:"red",ar:"أحمر",e:"🟥"},{en:"blue",ar:"أزرق",e:"🟦"},{en:"green",ar:"أخضر",e:"🟩"},
  {en:"yellow",ar:"أصفر",e:"🟨"},{en:"orange",ar:"برتقالي",e:"🟧"},{en:"purple",ar:"بنفسجي",e:"🟪"},
  {en:"brown",ar:"بني",e:"🟫"},{en:"black",ar:"أسود",e:"⬛"},{en:"white",ar:"أبيض",e:"⬜"},
  {en:"pink",ar:"وردي",e:"🌸"},{en:"grey",ar:"رمادي",e:"🩶"},{en:"gold",ar:"ذهبي",e:"🥇"},
  {en:"silver",ar:"فضي",e:"🥈"},{en:"dark",ar:"داكن",e:"🌑"},{en:"light",ar:"فاتح",e:"🌕"}
]},

numbers: { ar:"الأعداد", en:"Numbers", items:[
  {en:"one",ar:"واحد",e:"1️⃣"},{en:"two",ar:"اثنان",e:"2️⃣"},{en:"three",ar:"ثلاثة",e:"3️⃣"},
  {en:"four",ar:"أربعة",e:"4️⃣"},{en:"five",ar:"خمسة",e:"5️⃣"},{en:"six",ar:"ستة",e:"6️⃣"},
  {en:"seven",ar:"سبعة",e:"7️⃣"},{en:"eight",ar:"ثمانية",e:"8️⃣"},{en:"nine",ar:"تسعة",e:"9️⃣"},
  {en:"ten",ar:"عشرة",e:"🔟"},{en:"eleven",ar:"أحد عشر",e:"1️⃣"},{en:"twelve",ar:"اثنا عشر",e:"1️⃣"},
  {en:"twenty",ar:"عشرون",e:"2️⃣"},{en:"fifty",ar:"خمسون",e:"5️⃣"},{en:"hundred",ar:"مئة",e:"💯"},
  {en:"first",ar:"الأول",e:"🥇"},{en:"second",ar:"الثاني",e:"🥈"},{en:"third",ar:"الثالث",e:"🥉"}
]},

shapes: { ar:"الأشكال", en:"Shapes", items:[
  {en:"circle",ar:"دائرة",e:"⭕"},{en:"square",ar:"مربع",e:"🟦"},{en:"triangle",ar:"مثلث",e:"🔺"},
  {en:"rectangle",ar:"مستطيل",e:"▬"},{en:"star",ar:"نجمة",e:"🌴"},{en:"heart",ar:"قلب",e:"❤️"},
  {en:"line",ar:"خط",e:"➖"},{en:"point",ar:"نقطة",e:"⚫"},{en:"cube",ar:"مكعّب",e:"🧊"},
  {en:"ball",ar:"كرة",e:"⚽"},{en:"ring",ar:"حلقة",e:"⭕"},{en:"arrow",ar:"سهم",e:"➡️"}
]},

food: { ar:"الطعام", en:"Food", items:[
  {en:"bread",ar:"خبز",e:"🍞"},{en:"rice",ar:"أرز",e:"🍚"},{en:"meat",ar:"لحم",e:"🥩"},
  {en:"chicken",ar:"دجاج",e:"🍗"},{en:"fish",ar:"سمك",e:"🐟"},{en:"egg",ar:"بيضة",e:"🥚"},
  {en:"cheese",ar:"جبن",e:"🧀"},{en:"honey",ar:"عسل",e:"🍯"},{en:"salt",ar:"ملح",e:"🧂"},
  {en:"sugar",ar:"سكر",e:"🍬"},{en:"soup",ar:"شوربة",e:"🍲"},{en:"salad",ar:"سلطة",e:"🥗"},
  {en:"cake",ar:"كعكة",e:"🍰"},{en:"halwa",ar:"حلوى",e:"🍮"},{en:"oil",ar:"زيت",e:"🫒"},
  {en:"butter",ar:"زبدة",e:"🧈"},{en:"breakfast",ar:"فطور",e:"🍳"},{en:"dinner",ar:"عشاء",e:"🍽️"}
]},

fruits: { ar:"الفواكه", en:"Fruits", items:[
  {en:"date",ar:"تمرة",e:"🌰"},{en:"apple",ar:"تفاحة",e:"🍎"},{en:"banana",ar:"موزة",e:"🍌"},
  {en:"orange",ar:"برتقالة",e:"🍊"},{en:"lemon",ar:"ليمونة",e:"🍋"},{en:"mango",ar:"مانجو",e:"🥭"},
  {en:"grapes",ar:"عنب",e:"🍇"},{en:"melon",ar:"شمّام",e:"🍈"},{en:"watermelon",ar:"بطيخ",e:"🍉"},
  {en:"pomegranate",ar:"رمّان",e:"🌺"},{en:"fig",ar:"تين",e:"🫒"},{en:"peach",ar:"خوخ",e:"🍑"},
  {en:"strawberry",ar:"فراولة",e:"🍓"},{en:"coconut",ar:"جوز الهند",e:"🥥"},{en:"pineapple",ar:"أناناس",e:"🍍"}
]},

vegetables: { ar:"الخُضار", en:"Vegetables", items:[
  {en:"tomato",ar:"طماطم",e:"🍅"},{en:"potato",ar:"بطاطس",e:"🥔"},{en:"onion",ar:"بصل",e:"🧅"},
  {en:"garlic",ar:"ثوم",e:"🧄"},{en:"carrot",ar:"جزر",e:"🥕"},{en:"cucumber",ar:"خيار",e:"🥒"},
  {en:"pepper",ar:"فلفل",e:"🌶️"},{en:"lettuce",ar:"خس",e:"🥬"},{en:"corn",ar:"ذرة",e:"🌽"},
  {en:"beans",ar:"فاصولياء",e:"🫘"},{en:"pumpkin",ar:"قرع",e:"🎃"},{en:"eggplant",ar:"باذنجان",e:"🍆"},
  {en:"mushroom",ar:"فطر",e:"🍄"},{en:"okra",ar:"بامية",e:"🥬"}
]},

drinks: { ar:"المشروبات", en:"Drinks", items:[
  {en:"water",ar:"ماء",e:"💧"},{en:"milk",ar:"حليب",e:"🥛"},{en:"tea",ar:"شاي",e:"🍵"},
  {en:"coffee",ar:"قهوة",e:"☕"},{en:"juice",ar:"عصير",e:"🧃"},{en:"lemonade",ar:"ليموناضة",e:"🍋"},
  {en:"laban",ar:"لبن",e:"🥛"},{en:"soda",ar:"مشروب غازي",e:"🥤"},{en:"ice",ar:"ثلج",e:"🧊"},
  {en:"cocoa",ar:"كاكاو",e:"🍫"}
]},

farm: { ar:"حيوانات المزرعة", en:"Farm Animals", items:[
  {en:"goat",ar:"ماعز",e:"🐐"},{en:"sheep",ar:"خروف",e:"🐑"},{en:"cow",ar:"بقرة",e:"🐄"},
  {en:"camel",ar:"جمل",e:"🐪"},{en:"donkey",ar:"حمار",e:"🫏"},{en:"horse",ar:"حصان",e:"🐎"},
  {en:"hen",ar:"دجاجة",e:"🐔"},{en:"rooster",ar:"ديك",e:"🐓"},{en:"duck",ar:"بطة",e:"🦆"},
  {en:"rabbit",ar:"أرنب",e:"🐇"},{en:"cat",ar:"قطة",e:"🐱"},{en:"dog",ar:"كلب",e:"🐕"},
  {en:"bee",ar:"نحلة",e:"🐝"},{en:"mouse",ar:"فأر",e:"🐁"}
]},

wild: { ar:"الحيوانات البرية", en:"Wild Animals", items:[
  {en:"lion",ar:"أسد",e:"🦁"},{en:"tiger",ar:"نمر",e:"🐅"},{en:"elephant",ar:"فيل",e:"🐘"},
  {en:"monkey",ar:"قرد",e:"🐒"},{en:"bear",ar:"دب",e:"🐻"},{en:"wolf",ar:"ذئب",e:"🐺"},
  {en:"fox",ar:"ثعلب",e:"🦊"},{en:"deer",ar:"غزال",e:"🦌"},{en:"snake",ar:"أفعى",e:"🐍"},
  {en:"lizard",ar:"سحلية",e:"🦎"},{en:"scorpion",ar:"عقرب",e:"🦂"},{en:"hedgehog",ar:"قنفذ",e:"🦔"},
  {en:"oryx",ar:"مها",e:"🦌"},{en:"leopard",ar:"نمر عربي",e:"🐆"}
]},

sea: { ar:"البحر", en:"The Sea", items:[
  {en:"sea",ar:"بحر",e:"🌊"},{en:"wave",ar:"موجة",e:"🌊"},{en:"beach",ar:"شاطئ",e:"🏖️"},
  {en:"shell",ar:"صدفة",e:"🐚"},{en:"crab",ar:"سرطان",e:"🦀"},{en:"turtle",ar:"سلحفاة",e:"🐢"},
  {en:"dolphin",ar:"دلفين",e:"🐬"},{en:"whale",ar:"حوت",e:"🐳"},{en:"shark",ar:"قرش",e:"🦈"},
  {en:"boat",ar:"قارب",e:"🛶"},{en:"ship",ar:"سفينة",e:"🚢"},{en:"dhow",ar:"سفينة شراعية",e:"⛵"},
  {en:"net",ar:"شبكة",e:"🕸️"},{en:"anchor",ar:"مرساة",e:"⚓"},{en:"port",ar:"ميناء",e:"⚓"},
  {en:"sail",ar:"شراع",e:"⛵"},{en:"pearl",ar:"لؤلؤة",e:"🦪"}
]},

birds: { ar:"الطيور", en:"Birds", items:[
  {en:"bird",ar:"طائر",e:"🐦"},{en:"falcon",ar:"صقر",e:"🦅"},{en:"eagle",ar:"نسر",e:"🦅"},
  {en:"owl",ar:"بومة",e:"🦉"},{en:"dove",ar:"حمامة",e:"🕊️"},{en:"parrot",ar:"ببغاء",e:"🦜"},
  {en:"seagull",ar:"نورس",e:"🕊️"},{en:"peacock",ar:"طاووس",e:"🦚"},{en:"swan",ar:"بجعة",e:"🦢"},
  {en:"nest",ar:"عش",e:"🪹"},{en:"feather",ar:"ريشة",e:"🪶"},{en:"wing",ar:"جناح",e:"🪽"},
  {en:"beak",ar:"منقار",e:"🐦"},{en:"egg",ar:"بيضة",e:"🥚"}
]},

insects: { ar:"الحشرات", en:"Insects", items:[
  {en:"bee",ar:"نحلة",e:"🐝"},{en:"butterfly",ar:"فراشة",e:"🦋"},{en:"ant",ar:"نملة",e:"🐜"},
  {en:"fly",ar:"ذبابة",e:"🪰"},{en:"spider",ar:"عنكبوت",e:"🕷️"},{en:"beetle",ar:"خنفساء",e:"🪲"},
  {en:"grasshopper",ar:"جرادة",e:"🦗"},{en:"firefly",ar:"يراعة",e:"✨"},{en:"snail",ar:"حلزون",e:"🐌"},
  {en:"worm",ar:"دودة",e:"🪱"},{en:"mosquito",ar:"بعوضة",e:"🦟"},{en:"honey",ar:"عسل",e:"🍯"}
]},

nature: { ar:"الطبيعة", en:"Nature", items:[
  {en:"palm tree",ar:"نخلة",e:"🌴"},{en:"tree",ar:"شجرة",e:"🌳"},{en:"leaf",ar:"ورقة شجر",e:"🍃"},
  {en:"flower",ar:"زهرة",e:"🌸"},{en:"grass",ar:"عشب",e:"🌱"},{en:"seed",ar:"بذرة",e:"🌰"},
  {en:"root",ar:"جذر",e:"🪵"},{en:"mountain",ar:"جبل",e:"⛰️"},{en:"valley",ar:"وادٍ",e:"🏞️"},
  {en:"cave",ar:"كهف",e:"🕳️"},{en:"desert",ar:"صحراء",e:"🏜️"},{en:"sand",ar:"رمل",e:"🏖️"},
  {en:"stone",ar:"حجر",e:"🪨"},{en:"falaj",ar:"فلج",e:"💧"},{en:"spring",ar:"عين ماء",e:"⛲"},
  {en:"oasis",ar:"واحة",e:"🌴"},{en:"sky",ar:"سماء",e:"🌌"},{en:"sun",ar:"شمس",e:"☀️"},
  {en:"moon",ar:"قمر",e:"🌙"},{en:"star",ar:"نجمة",e:"🌴"}
]},

weather: { ar:"الطقس", en:"Weather", items:[
  {en:"hot",ar:"حار",e:"🥵"},{en:"cold",ar:"بارد",e:"🥶"},{en:"warm",ar:"دافئ",e:"🌤️"},
  {en:"rain",ar:"مطر",e:"🌧️"},{en:"cloud",ar:"غيمة",e:"☁️"},{en:"wind",ar:"ريح",e:"🌬️"},
  {en:"storm",ar:"عاصفة",e:"⛈️"},{en:"fog",ar:"ضباب",e:"🌫️"},{en:"lightning",ar:"برق",e:"⚡"},
  {en:"thunder",ar:"رعد",e:"🌩️"},{en:"rainbow",ar:"قوس قزح",e:"🌈"},{en:"shade",ar:"ظل",e:"🌴"},
  {en:"dry",ar:"جاف",e:"🏜️"},{en:"wet",ar:"مبلل",e:"💦"},{en:"humid",ar:"رطب",e:"💧"}
]},

time: { ar:"الوقت", en:"Time", items:[
  {en:"day",ar:"يوم",e:"📅"},{en:"night",ar:"ليل",e:"🌙"},{en:"morning",ar:"صباح",e:"🌅"},
  {en:"afternoon",ar:"بعد الظهر",e:"🌞"},{en:"evening",ar:"مساء",e:"🌆"},{en:"hour",ar:"ساعة",e:"🕐"},
  {en:"minute",ar:"دقيقة",e:"⏱️"},{en:"week",ar:"أسبوع",e:"🗓️"},{en:"month",ar:"شهر",e:"📆"},
  {en:"year",ar:"سنة",e:"🎊"},{en:"today",ar:"اليوم",e:"📍"},{en:"tomorrow",ar:"غداً",e:"➡️"},
  {en:"yesterday",ar:"أمس",e:"⬅️"},{en:"now",ar:"الآن",e:"⏰"},{en:"early",ar:"مبكّر",e:"🌄"},
  {en:"late",ar:"متأخّر",e:"🌃"}
]},

calendar: { ar:"الأيام والشهور", en:"Days & Months", items:[
  {en:"Sunday",ar:"الأحد",e:"1️⃣"},{en:"Monday",ar:"الاثنين",e:"2️⃣"},{en:"Tuesday",ar:"الثلاثاء",e:"3️⃣"},
  {en:"Wednesday",ar:"الأربعاء",e:"4️⃣"},{en:"Thursday",ar:"الخميس",e:"5️⃣"},{en:"Friday",ar:"الجمعة",e:"6️⃣"},
  {en:"Saturday",ar:"السبت",e:"7️⃣"},{en:"January",ar:"يناير",e:"❄️"},{en:"March",ar:"مارس",e:"🌱"},
  {en:"May",ar:"مايو",e:"🌸"},{en:"July",ar:"يوليو",e:"☀️"},{en:"September",ar:"سبتمبر",e:"🍂"},
  {en:"November",ar:"نوفمبر",e:"🌧️"},{en:"December",ar:"ديسمبر",e:"🎄"},{en:"weekend",ar:"عطلة الأسبوع",e:"🎉"}
]},

city: { ar:"المدينة", en:"The City", items:[
  {en:"city",ar:"مدينة",e:"🏙️"},{en:"village",ar:"قرية",e:"🏘️"},{en:"street",ar:"شارع",e:"🛣️"},
  {en:"road",ar:"طريق",e:"🛤️"},{en:"bridge",ar:"جسر",e:"🌉"},{en:"tower",ar:"برج",e:"🗼"},
  {en:"fort",ar:"قلعة",e:"🏰"},{en:"mosque",ar:"مسجد",e:"🕌"},{en:"hospital",ar:"مستشفى",e:"🏥"},
  {en:"museum",ar:"متحف",e:"🏛️"},{en:"park",ar:"حديقة عامة",e:"🌳"},{en:"airport",ar:"مطار",e:"✈️"},
  {en:"station",ar:"محطة",e:"🚉"},{en:"corner",ar:"زاوية",e:"📐"},{en:"sign",ar:"لافتة",e:"🪧"},
  {en:"traffic light",ar:"إشارة مرور",e:"🚦"}
]},

shops: { ar:"المحلات والسوق", en:"Shops & Souq", items:[
  {en:"market",ar:"سوق",e:"🏪"},{en:"souq",ar:"سوق تراثي",e:"🛍️"},{en:"shop",ar:"دكان",e:"🛒"},
  {en:"bakery",ar:"مخبز",e:"🥖"},{en:"money",ar:"نقود",e:"💵"},{en:"price",ar:"سعر",e:"🏷️"},
  {en:"cheap",ar:"رخيص",e:"🪙"},{en:"expensive",ar:"غالٍ",e:"💎"},{en:"buy",ar:"يشتري",e:"🛍️"},
  {en:"sell",ar:"يبيع",e:"🤝"},{en:"customer",ar:"زبون",e:"🧑"},{en:"seller",ar:"بائع",e:"🧑‍💼"},
  {en:"bag",ar:"كيس",e:"🛍️"},{en:"basket",ar:"سلة",e:"🧺"},{en:"gift",ar:"هدية",e:"🎁"}
]},

transport: { ar:"المواصلات", en:"Transport", items:[
  {en:"car",ar:"سيارة",e:"🚗"},{en:"bus",ar:"حافلة",e:"🚌"},{en:"truck",ar:"شاحنة",e:"🚚"},
  {en:"train",ar:"قطار",e:"🚆"},{en:"plane",ar:"طائرة",e:"✈️"},{en:"helicopter",ar:"مروحية",e:"🚁"},
  {en:"boat",ar:"قارب",e:"🛶"},{en:"ship",ar:"سفينة",e:"🚢"},{en:"bicycle",ar:"دراجة",e:"🚲"},
  {en:"motorbike",ar:"دراجة نارية",e:"🏍️"},{en:"wheel",ar:"عجلة",e:"🛞"},{en:"engine",ar:"محرك",e:"⚙️"},
  {en:"driver",ar:"سائق",e:"🧑‍✈️"},{en:"ticket",ar:"تذكرة",e:"🎫"},{en:"journey",ar:"رحلة",e:"🧳"},
  {en:"cargo",ar:"شحنة",e:"📦"}
]},

jobs: { ar:"المهن", en:"Jobs", items:[
  {en:"teacher",ar:"معلّم",e:"👩‍🏫"},{en:"doctor",ar:"طبيب",e:"👨‍⚕️"},{en:"nurse",ar:"ممرض",e:"👩‍⚕️"},
  {en:"farmer",ar:"مزارع",e:"👨‍🌾"},{en:"fisherman",ar:"صيّاد",e:"🎣"},{en:"pilot",ar:"طيّار",e:"👨‍✈️"},
  {en:"engineer",ar:"مهندس",e:"👷"},{en:"builder",ar:"بنّاء",e:"🧱"},{en:"cook",ar:"طبّاخ",e:"👨‍🍳"},
  {en:"baker",ar:"خبّاز",e:"🥖"},{en:"driver",ar:"سائق",e:"🚕"},{en:"police officer",ar:"شرطي",e:"👮"},
  {en:"firefighter",ar:"رجل إطفاء",e:"🧑‍🚒"},{en:"artist",ar:"فنان",e:"🎨"},{en:"writer",ar:"كاتب",e:"✍️"},
  {en:"potter",ar:"فخّاري",e:"🏺"}
]},

sports: { ar:"الرياضة", en:"Sports", items:[
  {en:"football",ar:"كرة قدم",e:"⚽"},{en:"swimming",ar:"سباحة",e:"🏊"},{en:"running",ar:"جري",e:"🏃"},
  {en:"jumping",ar:"قفز",e:"🤸"},{en:"cycling",ar:"ركوب دراجة",e:"🚴"},{en:"climbing",ar:"تسلّق",e:"🧗"},
  {en:"riding",ar:"ركوب الخيل",e:"🏇"},{en:"sailing",ar:"إبحار",e:"⛵"},{en:"team",ar:"فريق",e:"👥"},
  {en:"game",ar:"مباراة",e:"🎮"},{en:"winner",ar:"فائز",e:"🏆"},{en:"goal",ar:"هدف",e:"🥅"},
  {en:"ball",ar:"كرة",e:"⚽"},{en:"race",ar:"سباق",e:"🏁"}
]},

feelings: { ar:"المشاعر", en:"Feelings", items:[
  {en:"happy",ar:"سعيد",e:"😊"},{en:"sad",ar:"حزين",e:"😢"},{en:"angry",ar:"غاضب",e:"😠"},
  {en:"tired",ar:"متعب",e:"😴"},{en:"hungry",ar:"جائع",e:"🍽️"},{en:"thirsty",ar:"عطشان",e:"🥤"},
  {en:"afraid",ar:"خائف",e:"😨"},{en:"proud",ar:"فخور",e:"🥹"},{en:"surprised",ar:"متفاجئ",e:"😲"},
  {en:"calm",ar:"هادئ",e:"😌"},{en:"excited",ar:"متحمّس",e:"🤩"},{en:"kind",ar:"لطيف",e:"🤗"},
  {en:"brave",ar:"شجاع",e:"🦁"},{en:"shy",ar:"خجول",e:"😳"},{en:"bored",ar:"ملول",e:"🥱"}
]},

verbs: { ar:"أفعال يومية", en:"Everyday Verbs", items:[
  {en:"eat",ar:"يأكل",e:"🍽️"},{en:"drink",ar:"يشرب",e:"🥤"},{en:"sleep",ar:"ينام",e:"😴"},
  {en:"read",ar:"يقرأ",e:"📖"},{en:"write",ar:"يكتب",e:"✍️"},{en:"listen",ar:"يستمع",e:"👂"},
  {en:"speak",ar:"يتكلم",e:"🗣️"},{en:"walk",ar:"يمشي",e:"🚶"},{en:"run",ar:"يركض",e:"🏃"},
  {en:"fly",ar:"يطير",e:"🛩️"},{en:"swim",ar:"يسبح",e:"🏊"},{en:"carry",ar:"يحمل",e:"📦"},
  {en:"open",ar:"يفتح",e:"🔓"},{en:"close",ar:"يغلق",e:"🔒"},{en:"wash",ar:"يغسل",e:"🧼"},
  {en:"cook",ar:"يطبخ",e:"🍳"},{en:"help",ar:"يساعد",e:"🤝"},{en:"plant",ar:"يزرع",e:"🌱"},
  {en:"build",ar:"يبني",e:"🧱"},{en:"draw",ar:"يرسم",e:"🎨"}
]},

adjectives: { ar:"الصفات", en:"Adjectives", items:[
  {en:"big",ar:"كبير",e:"🐘"},{en:"small",ar:"صغير",e:"🐜"},{en:"tall",ar:"طويل",e:"🦒"},
  {en:"short",ar:"قصير",e:"🐁"},{en:"long",ar:"طويل (طولاً)",e:"📏"},{en:"wide",ar:"عريض",e:"↔️"},
  {en:"heavy",ar:"ثقيل",e:"🪨"},{en:"light",ar:"خفيف",e:"🪶"},{en:"fast",ar:"سريع",e:"⚡"},
  {en:"slow",ar:"بطيء",e:"🐢"},{en:"clean",ar:"نظيف",e:"✨"},{en:"dirty",ar:"متسخ",e:"🧹"},
  {en:"new",ar:"جديد",e:"🆕"},{en:"old",ar:"قديم",e:"🏺"},{en:"beautiful",ar:"جميل",e:"🌷"},
  {en:"strong",ar:"قوي",e:"💪"},{en:"soft",ar:"ناعم",e:"🧸"},{en:"sweet",ar:"حلو",e:"🍯"}
]},

oman: { ar:"عُمان وتراثها", en:"Oman & Heritage", items:[
  {en:"falaj",ar:"فلج",e:"💧"},{en:"fort",ar:"حصن",e:"🏰"},{en:"khanjar",ar:"خنجر",e:"🗡️"},
  {en:"frankincense",ar:"لبان",e:"🪔"},{en:"dhow",ar:"سفينة شراعية",e:"⛵"},{en:"souq",ar:"سوق",e:"🛍️"},
  {en:"desert",ar:"صحراء",e:"🏜️"},{en:"wadi",ar:"وادٍ",e:"🏞️"},{en:"date palm",ar:"نخلة تمر",e:"🌴"},
  {en:"halwa",ar:"حلوى عمانية",e:"🍮"},{en:"coffee pot",ar:"دلة",e:"🫖"},{en:"pottery",ar:"فخار",e:"🏺"},
  {en:"weaving",ar:"نسيج",e:"🧶"},{en:"turban",ar:"عمامة",e:"👳"},{en:"incense",ar:"بخور",e:"🪔"},
  {en:"mountain village",ar:"قرية جبلية",e:"⛰️"}
]},

rescue: { ar:"الإنقاذ والطيران", en:"Rescue & Flight", items:[
  {en:"helicopter",ar:"مروحية",e:"🚁"},{en:"pilot",ar:"طيّار",e:"👨‍✈️"},{en:"rescue",ar:"إنقاذ",e:"🆘"},
  {en:"fire",ar:"حريق",e:"🔥"},{en:"smoke",ar:"دخان",e:"💨"},{en:"rope",ar:"حبل",e:"🪢"},
  {en:"help",ar:"مساعدة",e:"🙌"},{en:"danger",ar:"خطر",e:"⚠️"},{en:"safe",ar:"آمن",e:"✅"},
  {en:"fuel",ar:"وقود",e:"⛽"},{en:"landing",ar:"هبوط",e:"🛬"},{en:"takeoff",ar:"إقلاع",e:"🛫"},
  {en:"radio",ar:"لاسلكي",e:"📻"},{en:"map",ar:"خريطة",e:"🗺️"},{en:"altitude",ar:"ارتفاع",e:"📈"},
  {en:"speed",ar:"سرعة",e:"🚀"},{en:"rotor",ar:"مروحة",e:"🌀"},{en:"emergency",ar:"طوارئ",e:"🚨"}
]},

tools: { ar:"الأدوات", en:"Tools", items:[
  {en:"hammer",ar:"مطرقة",e:"🔨"},{en:"nail",ar:"مسمار",e:"📌"},{en:"saw",ar:"منشار",e:"🪚"},
  {en:"screw",ar:"برغي",e:"🔩"},{en:"ladder",ar:"سلّم",e:"🪜"},{en:"rope",ar:"حبل",e:"🪢"},
  {en:"bucket",ar:"دلو",e:"🪣"},{en:"brush",ar:"فرشاة",e:"🖌️"},{en:"needle",ar:"إبرة",e:"🪡"},
  {en:"scissors",ar:"مقص",e:"✂️"},{en:"torch",ar:"كشّاف",e:"🔦"},{en:"box",ar:"صندوق",e:"📦"}
]},

music: { ar:"الموسيقى", en:"Music", items:[
  {en:"song",ar:"أغنية",e:"🎵"},{en:"drum",ar:"طبل",e:"🥁"},{en:"oud",ar:"عود",e:"🎸"},
  {en:"flute",ar:"ناي",e:"🎶"},{en:"piano",ar:"بيانو",e:"🎹"},{en:"voice",ar:"صوت",e:"🗣️"},
  {en:"sound",ar:"صوت (سمعي)",e:"🔊"},{en:"loud",ar:"عالٍ",e:"📢"},{en:"quiet",ar:"هادئ",e:"🤫"},
  {en:"dance",ar:"رقصة",e:"💃"},{en:"clap",ar:"تصفيق",e:"👏"},{en:"listen",ar:"يستمع",e:"👂"}
]},

places: { ar:"أماكن ومواقع", en:"Places", items:[
  {en:"inside",ar:"داخل",e:"📥"},{en:"outside",ar:"خارج",e:"📤"},{en:"here",ar:"هنا",e:"📍"},
  {en:"there",ar:"هناك",e:"🧭"},{en:"left",ar:"يسار",e:"⬅️"},{en:"right",ar:"يمين",e:"➡️"},
  {en:"up",ar:"فوق",e:"⬆️"},{en:"down",ar:"تحت",e:"⬇️"},{en:"near",ar:"قريب",e:"🔍"},
  {en:"far",ar:"بعيد",e:"🔭"},{en:"north",ar:"شمال",e:"🧭"},{en:"south",ar:"جنوب",e:"🧭"},
  {en:"east",ar:"شرق",e:"🌅"},{en:"west",ar:"غرب",e:"🌇"},{en:"middle",ar:"وسط",e:"🎯"}
]}

};

/* كل المفردات في قائمة واحدة، وقائمة أسماء المواضيع */
const VOCAB_KEYS = Object.keys(VOCAB);
const VOCAB_ALL  = VOCAB_KEYS.flatMap(k => VOCAB[k].items);

/* ============================================================
   ٢) الإملاء — الخطأ الشائع ثم الخيارات (الصواب أولاً)
============================================================ */
const SPELLING = [
  {bad:"frend",opts:["friend","freind","frend"]},
  {bad:"appel",opts:["apple","apel","appel"]},
  {bad:"becaus",opts:["because","becaus","becouse"]},
  {bad:"beutiful",opts:["beautiful","beutiful","beautifull"]},
  {bad:"scool",opts:["school","scool","schol"]},
  {bad:"watr",opts:["water","watr","watar"]},
  {bad:"hause",opts:["house","hause","hows"]},
  {bad:"nife",opts:["knife","nife","knive"]},
  {bad:"fammily",opts:["family","famly","fammily"]},
  {bad:"pepel",opts:["people","pepel","peeple"]},
  {bad:"televisoin",opts:["television","televisoin","telavision"]},
  {bad:"restrant",opts:["restaurant","restrant","resturant"]},
  {bad:"febuary",opts:["February","febuary","Febuary"]},
  {bad:"wensday",opts:["Wednesday","wensday","Wendsday"]},
  {bad:"buisness",opts:["business","buisness","bussiness"]},
  {bad:"goverment",opts:["government","goverment","govermant"]},
  {bad:"reciev",opts:["receive","reciev","receve"]},
  {bad:"beleive",opts:["believe","beleive","belive"]},
  {bad:"wich",opts:["which","wich","whitch"]},
  {bad:"thier",opts:["their","thier","theyr"]},
  {bad:"tommorow",opts:["tomorrow","tommorow","tomorow"]},
  {bad:"allways",opts:["always","allways","alway"]},
  {bad:"diffrent",opts:["different","diffrent","differant"]},
  {bad:"favrite",opts:["favourite","favrite","favorit"]},
  {bad:"litle",opts:["little","litle","liddle"]},
  {bad:"happyness",opts:["happiness","happyness","hapiness"]},
  {bad:"neccessary",opts:["necessary","neccessary","neccesary"]},
  {bad:"speach",opts:["speech","speach","speeche"]},
  {bad:"gramer",opts:["grammar","gramer","grammer"]},
  {bad:"languege",opts:["language","languege","languaje"]},
  {bad:"mesage",opts:["message","mesage","massage"]},
  {bad:"strenght",opts:["strength","strenght","strengh"]},
  {bad:"garantee",opts:["guarantee","garantee","garuntee"]},
  {bad:"seperate",opts:["separate","seperate","seperete"]},
  {bad:"untill",opts:["until","untill","untile"]},
  {bad:"begining",opts:["beginning","begining","beggining"]},
  {bad:"writting",opts:["writing","writting","writeing"]},
  {bad:"comming",opts:["coming","comming","comeing"]},
  {bad:"runing",opts:["running","runing","runnning"]},
  {bad:"stoped",opts:["stopped","stoped","stopeed"]},
  {bad:"anser",opts:["answer","anser","answar"]},
  {bad:"biscit",opts:["biscuit","biscit","bisquit"]},
  {bad:"brige",opts:["bridge","brige","bridg"]},
  {bad:"catle",opts:["cattle","catle","cattel"]},
  {bad:"childen",opts:["children","childen","childrn"]},
  {bad:"cloths",opts:["clothes","cloths","clothse"]},
  {bad:"coler",opts:["colour","coler","colur"]},
  {bad:"contry",opts:["country","contry","countrey"]},
  {bad:"dailly",opts:["daily","dailly","dayly"]},
  {bad:"dosen't",opts:["doesn't","dosen't","does'nt"]},
  {bad:"enuf",opts:["enough","enuf","enough'"]},
  {bad:"exersize",opts:["exercise","exersize","excercise"]},
  {bad:"famous",opts:["famous","fameous","famos"]},
  {bad:"forteen",opts:["fourteen","forteen","fourten"]},
  {bad:"freind",opts:["friend","freind","frend"]},
  {bad:"garden",opts:["garden","gardan","gerden"]},
  {bad:"gest",opts:["guest","gest","guset"]},
  {bad:"heigth",opts:["height","heigth","hight"]},
  {bad:"holliday",opts:["holiday","holliday","holyday"]},
  {bad:"hospitl",opts:["hospital","hospitl","hospitel"]},
  {bad:"intresting",opts:["interesting","intresting","interressting"]},
  {bad:"jurney",opts:["journey","jurney","journy"]},
  {bad:"kichen",opts:["kitchen","kichen","kitchin"]},
  {bad:"libary",opts:["library","libary","libraray"]},
  {bad:"lisen",opts:["listen","lisen","listan"]},
  {bad:"mountian",opts:["mountain","mountian","mounten"]},
  {bad:"neighbor",opts:["neighbour","neigbour","nieghbour"]},
  {bad:"ofice",opts:["office","ofice","offise"]},
  {bad:"pencle",opts:["pencil","pencle","pensil"]},
  {bad:"picure",opts:["picture","picure","pictur"]},
  {bad:"probaly",opts:["probably","probaly","probablly"]},
  {bad:"quiet",opts:["quiet","quait","quiett"]},
  {bad:"remeber",opts:["remember","remeber","rememeber"]},
  {bad:"sandwhich",opts:["sandwich","sandwhich","sandwitch"]},
  {bad:"sientist",opts:["scientist","sientist","scientest"]},
  {bad:"shepherd",opts:["shepherd","sheperd","shepard"]},
  {bad:"sissors",opts:["scissors","sissors","scisors"]},
  {bad:"stomac",opts:["stomach","stomac","stomache"]},
  {bad:"succes",opts:["success","succes","sucess"]},
  {bad:"surprize",opts:["surprise","surprize","suprise"]},
  {bad:"tecnology",opts:["technology","tecnology","technolgy"]},
  {bad:"thourough",opts:["thorough","thourough","thorogh"]},
  {bad:"tounge",opts:["tongue","tounge","tonge"]},
  {bad:"trafic",opts:["traffic","trafic","traffick"]},
  {bad:"truely",opts:["truly","truely","truley"]},
  {bad:"usualy",opts:["usually","usualy","usualy'"]},
  {bad:"vegtable",opts:["vegetable","vegtable","vegatable"]},
  {bad:"wether",opts:["weather","wether","weathr"]},
  {bad:"wellcome",opts:["welcome","wellcome","welcom"]},
  {bad:"wimen",opts:["women","wimen","womin"]},
  {bad:"yesturday",opts:["yesterday","yesturday","yestarday"]}
];

/* ============================================================
   ٣) القواعد — سؤال بفراغ + خيارات (الصواب أولاً) + شرح
============================================================ */
const GRAMMAR = [
  {q:"___ is a doctor.",opts:["She","They","We"],h:"She + is"},
  {q:"I ___ happy.",opts:["am","is","are"],h:"I + am"},
  {q:"There ___ many palms.",opts:["are","is","am"],h:"جمع + are"},
  {q:"He goes ___ school.",opts:["to","in","on"],h:"go to school"},
  {q:"We ___ football yesterday.",opts:["played","play","plays"],h:"ماضٍ: played"},
  {q:"She will ___ tomorrow.",opts:["come","comes","came"],h:"will + الفعل الأصلي"},
  {q:"They ___ playing now.",opts:["are","is","am"],h:"They + are"},
  {q:"___ you like tea?",opts:["Do","Does","Is"],h:"You + Do"},
  {q:"She ___ like coffee.",opts:["doesn't","don't","isn't"],h:"She + doesn't"},
  {q:"We ___ to the souq yesterday.",opts:["went","go","goes"],h:"go → went"},
  {q:"I ___ a book right now.",opts:["am reading","reads","read"],h:"am + verb+ing"},
  {q:"He is the ___ boy in class.",opts:["tallest","taller","tall"],h:"the + tallest"},
  {q:"This is ___ apple.",opts:["an","a","the"],h:"قبل حرف صوتي: an"},
  {q:"___ is your name?",opts:["What","Who","Where"],h:"سؤال عن الاسم"},
  {q:"___ do you live?",opts:["Where","What","When"],h:"سؤال عن المكان"},
  {q:"She can ___ Arabic and English.",opts:["speak","speaks","speaking"],h:"can + الأصلي"},
  {q:"We must ___ our hands.",opts:["wash","washes","washed"],h:"must + الأصلي"},
  {q:"He ___ his homework already.",opts:["finished","finish","finishing"],h:"ماضٍ: finished"},
  {q:"I ___ never been to Salalah.",opts:["have","has","had"],h:"I + have"},
  {q:"___ they at home?",opts:["Are","Is","Do"],h:"They + Are"},
  {q:"This falaj is ___ than that one.",opts:["older","old","oldest"],h:"مقارنة: older"},
  {q:"My mother is ___ the kitchen.",opts:["in","on","at"],h:"in + مكان مغلق"},
  {q:"The book is ___ the table.",opts:["on","in","under"],h:"on + سطح"},
  {q:"We usually eat dinner ___ 7 pm.",opts:["at","in","on"],h:"at + وقت محدد"},
  {q:"I was born ___ 2014.",opts:["in","at","on"],h:"in + سنة"},
  {q:"She ___ swimming every Friday.",opts:["goes","go","going"],h:"مفرد + goes"},
  {q:"___ he like dates?",opts:["Does","Do","Is"],h:"He + Does"},
  {q:"They ___ finished their meal.",opts:["haven't","hasn't","don't"],h:"They + haven't"},
  {q:"Is there ___ milk left?",opts:["any","some","much"],h:"سؤال: any"},
  {q:"He runs ___ than his brother.",opts:["faster","fast","fastest"],h:"مقارنة: faster"},
  {q:"This is the ___ falaj in Oman.",opts:["oldest","older","old"],h:"the + oldest"},
  {q:"___ should we go now?",opts:["Why","What","Who"],h:"سؤال عن السبب"},
  {q:"I ___ my keys somewhere.",opts:["lost","loses","losing"],h:"ماضٍ: lost"},
  {q:"She was ___ when I called.",opts:["sleeping","sleep","slept"],h:"was + verb+ing"},
  {q:"We will ___ to the beach tomorrow.",opts:["go","went","goes"],h:"will + الأصلي"},
  {q:"There ___ no water in the falaj.",opts:["is","are","am"],h:"مفرد: is"},
  {q:"The palm trees ___ tall.",opts:["are","is","am"],h:"جمع + are"},
  {q:"He is ___ than his sister.",opts:["younger","young","youngest"],h:"مقارنة: younger"},
  {q:"My father ___ a truck.",opts:["drives","drive","driving"],h:"مفرد + drives"},
  {q:"The children ___ in the garden.",opts:["are","is","am"],h:"جمع + are"},
  {q:"I would like ___ water, please.",opts:["some","any","many"],h:"طلب مهذب: some"},
  {q:"How ___ dates do you want?",opts:["many","much","long"],h:"معدود: many"},
  {q:"How ___ water is left?",opts:["much","many","few"],h:"غير معدود: much"},
  {q:"There are ___ people at the souq.",opts:["a lot of","much","a little"],h:"جمع: a lot of"},
  {q:"She has ___ friends here.",opts:["a few","a little","much"],h:"معدود قليل: a few"},
  {q:"We have ___ time before sunset.",opts:["a little","a few","many"],h:"غير معدود: a little"},
  {q:"This is ___ bag, not yours.",opts:["my","mine","me"],h:"صفة ملكية قبل الاسم"},
  {q:"That book is ___.",opts:["mine","my","me"],h:"ضمير ملكية بلا اسم"},
  {q:"He hurt ___ while climbing.",opts:["himself","him","his"],h:"ضمير انعكاسي"},
  {q:"Look at ___! We look great.",opts:["ourselves","us","our"],h:"ضمير انعكاسي جمع"},
  {q:"The falaj ___ built long ago.",opts:["was","were","is"],h:"مبني للمجهول ماضٍ مفرد"},
  {q:"Dates ___ grown in Oman.",opts:["are","is","was"],h:"مبني للمجهول جمع"},
  {q:"If it rains, we ___ stay home.",opts:["will","would","were"],h:"الشرط الأول: will"},
  {q:"If I ___ a bird, I would fly.",opts:["were","am","will be"],h:"الشرط الثاني: were"},
  {q:"She said she ___ tired.",opts:["was","is","are"],h:"كلام منقول: is → was"},
  {q:"He asked me where I ___.",opts:["lived","live","living"],h:"كلام منقول"},
  {q:"The boy ___ is running is my brother.",opts:["who","which","where"],h:"who لِلعاقل"},
  {q:"The house ___ we saw is old.",opts:["which","who","when"],h:"which لغير العاقل"},
  {q:"This is the place ___ I was born.",opts:["where","which","who"],h:"where للمكان"},
  {q:"I like reading ___ writing.",opts:["and","but","because"],h:"and للربط"},
  {q:"He is small ___ very strong.",opts:["but","and","so"],h:"but للتضاد"},
  {q:"It was raining, ___ we stayed home.",opts:["so","but","or"],h:"so للنتيجة"},
  {q:"We stayed home ___ it was raining.",opts:["because","so","but"],h:"because للسبب"},
  {q:"Would you like tea ___ coffee?",opts:["or","and","but"],h:"or للاختيار"},
  {q:"He has been here ___ Monday.",opts:["since","for","from"],h:"since + نقطة زمنية"},
  {q:"She has lived here ___ five years.",opts:["for","since","from"],h:"for + مدة"},
  {q:"I have ___ finished my work.",opts:["already","yet","still"],h:"already في الإثبات"},
  {q:"He hasn't arrived ___.",opts:["yet","already","ever"],h:"yet في النفي"},
  {q:"Have you ___ seen a falcon?",opts:["ever","never","yet"],h:"ever في السؤال"},
  {q:"I have ___ been to Salalah.",opts:["never","ever","yet"],h:"never للنفي"},
  {q:"You ___ wear a helmet. It's the rule.",opts:["must","can","may"],h:"must للإلزام"},
  {q:"You ___ not swim here. It's dangerous.",opts:["must","can","would"],h:"must not للمنع"},
  {q:"___ I open the window?",opts:["May","Do","Am"],h:"May للاستئذان"},
  {q:"She ___ swim when she was four.",opts:["could","can","will"],h:"could للماضي"},
  {q:"We ___ to finish before sunset.",opts:["have","must","should"],h:"have to"},
  {q:"You ___ rest. You look tired.",opts:["should","must","may"],h:"should للنصيحة"},
  {q:"Let's go, ___ we?",opts:["shall","do","will"],h:"Let's ... shall we?"},
  {q:"She is a nurse, ___ she?",opts:["isn't","doesn't","won't"],h:"سؤال ذيلي"},
  {q:"They don't like fish, ___ they?",opts:["do","don't","are"],h:"سؤال ذيلي نفي"},
  {q:"The dates are ___ delicious!",opts:["so","such","too"],h:"so + صفة"},
  {q:"It was ___ a beautiful day.",opts:["such","so","very"],h:"such + a + صفة + اسم"},
  {q:"It's ___ hot to walk outside.",opts:["too","so","enough"],h:"too + صفة = زيادة مانعة"},
  {q:"He is old ___ to drive.",opts:["enough","too","so"],h:"صفة + enough"},
  {q:"I enjoy ___ in the sea.",opts:["swimming","to swim","swim"],h:"enjoy + verb+ing"},
  {q:"She wants ___ a doctor.",opts:["to be","being","be"],h:"want + to + الأصلي"},
  {q:"We decided ___ early.",opts:["to leave","leaving","leave"],h:"decide + to"},
  {q:"He avoided ___ the question.",opts:["answering","to answer","answer"],h:"avoid + verb+ing"},
  {q:"Neither Ali ___ Sara came.",opts:["nor","or","and"],h:"neither ... nor"},
  {q:"Both the boys ___ tired.",opts:["are","is","was"],h:"both + are"}
];

/* ============================================================
   ٤) تصحيح الجمل — w: الكلمات، e: فهرس الخطأ (-1 = صحيحة)
============================================================ */
const SENTENCES = [
  {w:["She","like","bananas"],e:1,c:"likes",h:"He/She/It + verb + s"},
  {w:["He","go","to","school"],e:1,c:"goes",h:"He/She/It + verb + es"},
  {w:["They","is","happy"],e:1,c:"are",h:"They/We/You + are"},
  {w:["I","has","a","cat"],e:1,c:"have",h:"I/You/We/They + have"},
  {w:["It","rain","a","lot"],e:1,c:"rains",h:"It + verb + s"},
  {w:["We","was","late"],e:1,c:"were",h:"We + were"},
  {w:["She","don't","like","tea"],e:1,c:"doesn't",h:"She/He/It + doesn't"},
  {w:["He","can","swims"],e:2,c:"swim",h:"بعد can الفعل الأصلي"},
  {w:["The","boy","play","football"],e:2,c:"plays",h:"مفرد + verb + s"},
  {w:["I","am","reading","a","book"],e:-1,c:"",h:"جملة صحيحة!"},
  {w:["They","was","at","home"],e:1,c:"were",h:"They + were"},
  {w:["You","is","my","friend"],e:1,c:"are",h:"You + are"},
  {w:["He","have","two","dogs"],e:1,c:"has",h:"He/She/It + has"},
  {w:["We","goes","to","the","market"],e:1,c:"go",h:"We + go بدون s"},
  {w:["She","eat","breakfast","every","day"],e:1,c:"eats",h:"She + verb + s"},
  {w:["I","doesn't","know","the","answer"],e:1,c:"don't",h:"I + don't"},
  {w:["The","cats","was","sleeping"],e:2,c:"were",h:"جمع + were"},
  {w:["My","brother","play","the","oud"],e:2,c:"plays",h:"مفرد + verb + s"},
  {w:["Yesterday","I","go","to","school"],e:2,c:"went",h:"go → went"},
  {w:["Last","year","we","visit","Muscat"],e:3,c:"visited",h:"الماضي: verb + ed"},
  {w:["She","is","reading","a","book","now"],e:-1,c:"",h:"جملة صحيحة!"},
  {w:["There","is","many","palm","trees"],e:1,c:"are",h:"There are + جمع"},
  {w:["This","are","my","books"],e:0,c:"These",h:"جمع: These are"},
  {w:["These","is","my","shoes"],e:1,c:"are",h:"جمع + are"},
  {w:["He","is","taller","than","me"],e:-1,c:"",h:"جملة صحيحة!"},
  {w:["She","is","more","tall","than","him"],e:2,c:"taller",h:"صفة قصيرة + er"},
  {w:["I","don't","have","no","money"],e:3,c:"any",h:"لا نفي مزدوج: no → any"},
  {w:["He","is","a","honest","boy"],e:2,c:"an",h:"قبل صوت متحرك: an"},
  {w:["I","seen","the","falaj","yesterday"],e:1,c:"saw",h:"الماضي البسيط: saw"},
  {w:["We","are","play","in","the","garden"],e:2,c:"playing",h:"are + verb+ing"},
  {w:["The","children","is","laughing"],e:2,c:"are",h:"جمع + are"},
  {w:["My","father","work","at","the","souq"],e:2,c:"works",h:"مفرد + verb + s"},
  {w:["I","will","went","home","soon"],e:2,c:"go",h:"will + الأصلي"},
  {w:["She","can","plays","the","piano"],e:2,c:"play",h:"can + الأصلي"},
  {w:["We","was","swimming","yesterday"],e:1,c:"were",h:"We + were"},
  {w:["He","don't","likes","dates"],e:1,c:"doesn't",h:"He + doesn't"},
  {w:["The","sun","rise","in","the","east"],e:2,c:"rises",h:"مفرد + verb + s"},
  {w:["They","has","a","big","house"],e:1,c:"have",h:"They + have"},
  {w:["The","boys","plays","football"],e:2,c:"play",h:"جمع + play"},
  {w:["I","is","from","Oman"],e:1,c:"am",h:"I + am"},
  {w:["She","have","been","here","since","Monday"],e:1,c:"has",h:"She + has been"},
  {w:["We","didn't","went","to","the","beach"],e:2,c:"go",h:"didn't + الأصلي"},
  {w:["Did","you","saw","the","dhow","?"],e:2,c:"see",h:"Did + الأصلي"},
  {w:["He","is","more","older","than","me"],e:2,c:"",h:"older وحدها تكفي"},
  {w:["The","most","tallest","tree","is","here"],e:1,c:"",h:"tallest وحدها تكفي"},
  {w:["I","am","agree","with","you"],e:1,c:"",h:"نقول I agree بدون am"},
  {w:["She","married","with","a","teacher"],e:2,c:"to",h:"married to"},
  {w:["We","discussed","about","the","plan"],e:2,c:"",h:"discuss بلا about"},
  {w:["He","explained","me","the","lesson"],e:2,c:"to me",h:"explain to someone"},
  {w:["I","am","interesting","in","science"],e:2,c:"interested",h:"الشخص interested"},
  {w:["The","film","was","bored"],e:3,c:"boring",h:"الشيء boring"},
  {w:["She","looks","happily","today"],e:2,c:"happy",h:"بعد look صفة"},
  {w:["He","drives","very","careful"],e:3,c:"carefully",h:"وصف الفعل: ظرف"},
  {w:["There","are","a","lot","informations"],e:4,c:"information",h:"information غير معدودة"},
  {w:["I","have","many","homeworks","today"],e:3,c:"homework",h:"homework غير معدودة"},
  {w:["He","gave","me","an","advice"],e:3,c:"some",h:"advice غير معدودة"},
  {w:["We","need","two","breads"],e:3,c:"loaves of bread",h:"bread غير معدودة"},
  {w:["My","hairs","are","long"],e:1,c:"hair",h:"hair غير معدودة"},
  {w:["She","is","good","in","English"],e:3,c:"at",h:"good at"},
  {w:["I","am","afraid","from","snakes"],e:3,c:"of",h:"afraid of"},
  {w:["He","depends","of","his","brother"],e:2,c:"on",h:"depend on"},
  {w:["We","arrived","to","Muscat","early"],e:2,c:"in",h:"arrive in + مدينة"},
  {w:["She","listens","the","radio"],e:2,c:"to the",h:"listen to"},
  {w:["Where","you","are","going","?"],e:1,c:"are you",h:"ترتيب السؤال"},
  {w:["What","time","it","is","?"],e:2,c:"is it",h:"ترتيب السؤال"},
  {w:["I","don't","know","where","is","he"],e:4,c:"he is",h:"سؤال داخلي بترتيب الخبر"},
  {w:["He","asked","me","what","do","I","want"],e:4,c:"I",h:"كلام منقول بلا do"},
  {w:["Every","students","must","come"],e:1,c:"student",h:"every + مفرد"},
  {w:["All","the","boy","are","here"],e:2,c:"boys",h:"all + جمع"},
  {w:["Each","of","the","girls","have","a","book"],e:4,c:"has",h:"each + has"},
  {w:["Neither","of","them","were","ready"],e:3,c:"was",h:"neither + was"},
  {w:["The","news","are","good"],e:2,c:"is",h:"news مفردة"},
  {w:["Mathematics","are","difficult"],e:1,c:"is",h:"mathematics مفردة"},
  {w:["My","trousers","is","new"],e:2,c:"are",h:"trousers جمع"},
  {w:["He","is","one","of","the","best","student"],e:6,c:"students",h:"one of the + جمع"},
  {w:["This","is","the","most","easiest","way"],e:3,c:"",h:"easiest وحدها"},
  {w:["She","sings","more","better","now"],e:2,c:"",h:"better وحدها"},
  {w:["I","have","went","there","twice"],e:2,c:"been",h:"have been"},
  {w:["We","are","living","here","since","2015"],e:2,c:"have lived",h:"since + المضارع التام"},
  {w:["He","is","working","here","for","ten","years"],e:2,c:"has worked",h:"for + المضارع التام"},
  {w:["The","door","was","opened","by","the","wind"],e:-1,c:"",h:"جملة صحيحة!"},
  {w:["Dates","is","grown","in","Oman"],e:1,c:"are",h:"جمع + are"},
  {w:["The","letter","wrote","by","Salim"],e:2,c:"was written",h:"مبني للمجهول"},
  {w:["If","it","will","rain",",","we","stay"],e:2,c:"",h:"لا will بعد if"},
  {w:["If","I","was","you",",","I","would","go"],e:2,c:"were",h:"الشرط الثاني: were"},
  {w:["I","wish","I","have","more","time"],e:3,c:"had",h:"wish + الماضي"},
  {w:["It's","time","we","go","home"],e:3,c:"went",h:"It's time + الماضي"},
  {w:["She","enjoys","to","read","books"],e:2,c:"reading",h:"enjoy + verb+ing"},
  {w:["We","decided","going","early"],e:2,c:"to go",h:"decide + to"},
  {w:["He","made","me","to","laugh"],e:3,c:"",h:"make + المصدر بلا to"},
  {w:["Let","him","to","try","again"],e:2,c:"",h:"let + المصدر بلا to"},
  {w:["The","childrens","are","playing"],e:1,c:"children",h:"children جمع بالفعل"},
  {w:["Two","womans","entered","the","shop"],e:1,c:"women",h:"woman → women"},
  {w:["My","foots","hurt"],e:1,c:"feet",h:"foot → feet"},
  {w:["He","lost","three","tooths"],e:3,c:"teeth",h:"tooth → teeth"},
  {w:["The","sheeps","are","in","the","wadi"],e:1,c:"sheep",h:"sheep لا تتغير"},
  {w:["I","bought","two","knifes"],e:3,c:"knives",h:"knife → knives"}
];

/* ============================================================
   ٥) الأضداد
============================================================ */
const OPPOSITES = [
  {w:"big",o:"small",d:["tall","new"]},        {w:"hot",o:"cold",d:["warm","wet"]},
  {w:"old",o:"new",d:["young","long"]},        {w:"fast",o:"slow",d:["quick","near"]},
  {w:"open",o:"close",d:["push","enter"]},     {w:"day",o:"night",d:["morning","week"]},
  {w:"up",o:"down",d:["over","in"]},           {w:"long",o:"short",d:["wide","thin"]},
  {w:"happy",o:"sad",d:["angry","tired"]},     {w:"clean",o:"dirty",d:["wet","empty"]},
  {w:"full",o:"empty",d:["heavy","open"]},     {w:"strong",o:"weak",d:["hard","soft"]},
  {w:"easy",o:"hard",d:["light","simple"]},    {w:"near",o:"far",d:["next","under"]},
  {w:"wet",o:"dry",d:["cold","fresh"]},        {w:"light",o:"heavy",d:["bright","dark"]},
  {w:"loud",o:"quiet",d:["soft","deep"]},      {w:"rich",o:"poor",d:["kind","busy"]},
  {w:"first",o:"last",d:["next","best"]},      {w:"start",o:"end",d:["stop","try"]},
  {w:"give",o:"take",d:["send","hold"]},       {w:"buy",o:"sell",d:["pay","keep"]},
  {w:"come",o:"go",d:["stay","walk"]},         {w:"remember",o:"forget",d:["think","learn"]},
  {w:"question",o:"answer",d:["problem","idea"]},{w:"north",o:"south",d:["east","left"]},
  {w:"above",o:"below",d:["beside","around"]}, {w:"inside",o:"outside",d:["between","near"]},
  {w:"begin",o:"finish",d:["try","open"]},     {w:"true",o:"false",d:["real","right"]},
  {w:"tall",o:"short",d:["big","wide"]},       {w:"wide",o:"narrow",d:["long","flat"]},
  {w:"thick",o:"thin",d:["fat","short"]},      {w:"deep",o:"shallow",d:["low","wide"]},
  {w:"early",o:"late",d:["soon","slow"]},      {w:"before",o:"after",d:["during","while"]},
  {w:"always",o:"never",d:["often","sometimes"]},{w:"same",o:"different",d:["equal","similar"]},
  {w:"win",o:"lose",d:["play","join"]},        {w:"push",o:"pull",d:["lift","carry"]},
  {w:"laugh",o:"cry",d:["smile","shout"]},     {w:"asleep",o:"awake",d:["tired","calm"]},
  {w:"safe",o:"dangerous",d:["careful","strong"]},{w:"brave",o:"afraid",d:["proud","kind"]},
  {w:"kind",o:"cruel",d:["polite","quiet"]},   {w:"cheap",o:"expensive",d:["free","rich"]},
  {w:"sweet",o:"sour",d:["salty","bitter"]},   {w:"soft",o:"rough",d:["smooth","hard"]},
  {w:"public",o:"private",d:["open","common"]},{w:"increase",o:"decrease",d:["grow","change"]},
  {w:"accept",o:"refuse",d:["agree","allow"]}, {w:"arrive",o:"leave",d:["reach","travel"]},
  {w:"build",o:"destroy",d:["make","repair"]}, {w:"borrow",o:"lend",d:["keep","owe"]},
  {w:"float",o:"sink",d:["swim","fall"]},      {w:"appear",o:"disappear",d:["show","hide"]}
];

/* ============================================================
   ٦) الجموع
============================================================ */
const PLURALS = [
  {s:"child",p:"children",d:["childs","childes"]},   {s:"man",p:"men",d:["mans","mens"]},
  {s:"woman",p:"women",d:["womans","womens"]},       {s:"foot",p:"feet",d:["foots","feets"]},
  {s:"tooth",p:"teeth",d:["tooths","teeths"]},       {s:"mouse",p:"mice",d:["mouses","mices"]},
  {s:"person",p:"people",d:["persons","peoples"]},   {s:"leaf",p:"leaves",d:["leafs","leafes"]},
  {s:"knife",p:"knives",d:["knifes","knive"]},       {s:"wife",p:"wives",d:["wifes","wive"]},
  {s:"box",p:"boxes",d:["boxs","boxies"]},           {s:"baby",p:"babies",d:["babys","babyes"]},
  {s:"city",p:"cities",d:["citys","cityes"]},        {s:"story",p:"stories",d:["storys","storyes"]},
  {s:"bus",p:"buses",d:["buss","busies"]},           {s:"watch",p:"watches",d:["watchs","watchies"]},
  {s:"dish",p:"dishes",d:["dishs","dishies"]},       {s:"sheep",p:"sheep",d:["sheeps","sheepes"]},
  {s:"fish",p:"fish",d:["fishs","fishies"]},         {s:"country",p:"countries",d:["countrys","countryes"]},
  {s:"family",p:"families",d:["familys","familyes"]},{s:"tomato",p:"tomatoes",d:["tomatos","tomatoies"]},
  {s:"potato",p:"potatoes",d:["potatos","potatoies"]},{s:"church",p:"churches",d:["churchs","churchies"]},
  {s:"class",p:"classes",d:["clasess","classs"]},    {s:"shelf",p:"shelves",d:["shelfs","shelfes"]},
  {s:"goose",p:"geese",d:["gooses","geeses"]},       {s:"ox",p:"oxen",d:["oxes","oxs"]},
  {s:"deer",p:"deer",d:["deers","deeres"]},          {s:"life",p:"lives",d:["lifes","lifies"]},
  {s:"half",p:"halves",d:["halfs","halfes"]},        {s:"thief",p:"thieves",d:["thiefs","thievs"]},
  {s:"wolf",p:"wolves",d:["wolfs","wolfes"]},        {s:"loaf",p:"loaves",d:["loafs","loafes"]},
  {s:"roof",p:"roofs",d:["rooves","roofes"]},        {s:"chief",p:"chiefs",d:["chieves","chiefes"]},
  {s:"piano",p:"pianos",d:["pianoes","pianies"]},    {s:"photo",p:"photos",d:["photoes","photoies"]},
  {s:"radio",p:"radios",d:["radioes","radioies"]},   {s:"hero",p:"heroes",d:["heros","heroies"]},
  {s:"key",p:"keys",d:["kies","keyes"]},             {s:"toy",p:"toys",d:["toies","toyes"]},
  {s:"day",p:"days",d:["daies","dayes"]},            {s:"lady",p:"ladies",d:["ladys","ladyes"]},
  {s:"party",p:"parties",d:["partys","partyes"]},    {s:"army",p:"armies",d:["armys","armyes"]},
  {s:"glass",p:"glasses",d:["glasss","glassies"]},   {s:"brush",p:"brushes",d:["brushs","brushies"]},
  {s:"beach",p:"beaches",d:["beachs","beachies"]},   {s:"fox",p:"foxes",d:["foxs","foxies"]}
];

/* ============================================================
   ٧) حروف الجر
============================================================ */
const PREPS = [
  {q:"The cat is ___ the box.",a:"in",d:["on","at"],h:"in = داخل"},
  {q:"The book is ___ the table.",a:"on",d:["in","under"],h:"on = على سطح"},
  {q:"The ball is ___ the chair.",a:"under",d:["on","over"],h:"under = تحت"},
  {q:"We meet ___ 6 o'clock.",a:"at",d:["in","on"],h:"at + ساعة"},
  {q:"My birthday is ___ May.",a:"in",d:["at","on"],h:"in + شهر"},
  {q:"School starts ___ Sunday.",a:"on",d:["in","at"],h:"on + يوم"},
  {q:"He walked ___ the bridge.",a:"across",d:["between","among"],h:"across = عبر"},
  {q:"The falaj runs ___ the village.",a:"through",d:["over","above"],h:"through = خلال"},
  {q:"She sat ___ me and my sister.",a:"between",d:["among","along"],h:"between = بين اثنين"},
  {q:"The plane flew ___ the clouds.",a:"above",d:["on","in"],h:"above = فوق بلا لمس"},
  {q:"I am waiting ___ the bus.",a:"for",d:["to","at"],h:"wait for"},
  {q:"This gift is ___ you.",a:"for",d:["to","of"],h:"for = لأجل"},
  {q:"He is good ___ English.",a:"at",d:["in","on"],h:"good at"},
  {q:"We arrived ___ Muscat.",a:"in",d:["to","at"],h:"arrive in + مدينة"},
  {q:"Put the dates ___ the basket.",a:"into",d:["onto","off"],h:"into = إلى داخل"},
  {q:"The bird flew ___ the branch.",a:"onto",d:["into","off"],h:"onto = إلى فوق"},
  {q:"He jumped ___ the wall.",a:"over",d:["under","across"],h:"over = فوق قفزاً"},
  {q:"The shop is ___ the mosque.",a:"next to",d:["between","through"],h:"next to = بجانب"},
  {q:"She comes ___ Oman.",a:"from",d:["of","by"],h:"come from"},
  {q:"We travelled ___ car.",a:"by",d:["with","on"],h:"by + وسيلة نقل"},
  {q:"Cut the bread ___ a knife.",a:"with",d:["by","from"],h:"with + أداة"},
  {q:"The picture is ___ the wall.",a:"on",d:["in","at"],h:"on the wall"},
  {q:"He lives ___ Nizwa.",a:"in",d:["at","on"],h:"in + مدينة"},
  {q:"Meet me ___ the station.",a:"at",d:["in","on"],h:"at + نقطة محددة"},
  {q:"The keys are ___ my pocket.",a:"in",d:["on","at"],h:"in my pocket"},
  {q:"We walked ___ the beach.",a:"along",d:["across","through"],h:"along = بمحاذاة"},
  {q:"The cat hid ___ the boxes.",a:"behind",d:["in front of","beside"],h:"behind = خلف"},
  {q:"He stood ___ the door.",a:"in front of",d:["behind","under"],h:"in front of = أمام"},
  {q:"The falcon flew ___ the mountain.",a:"towards",d:["against","among"],h:"towards = باتجاه"},
  {q:"She has been here ___ Monday.",a:"since",d:["for","from"],h:"since + نقطة"},
  {q:"They stayed ___ three days.",a:"for",d:["since","during"],h:"for + مدة"},
  {q:"It rained ___ the night.",a:"during",d:["for","since"],h:"during + فترة"},
  {q:"Finish it ___ sunset.",a:"before",d:["after","during"],h:"before = قبل"},
  {q:"We eat ___ prayer.",a:"after",d:["before","until"],h:"after = بعد"},
  {q:"Wait ___ I come back.",a:"until",d:["since","during"],h:"until = حتى"},
  {q:"The dates are made ___ sugar and fruit.",a:"of",d:["from","by"],h:"made of"},
  {q:"This letter was written ___ Salim.",a:"by",d:["from","with"],h:"by + الفاعل"},
  {q:"He is famous ___ his poetry.",a:"for",d:["of","by"],h:"famous for"},
  {q:"I am interested ___ history.",a:"in",d:["on","at"],h:"interested in"},
  {q:"She is married ___ a teacher.",a:"to",d:["with","of"],h:"married to"},
  {q:"He is afraid ___ snakes.",a:"of",d:["from","by"],h:"afraid of"},
  {q:"They depend ___ the falaj.",a:"on",d:["of","in"],h:"depend on"},
  {q:"Listen ___ the teacher.",a:"to",d:["at","for"],h:"listen to"},
  {q:"Look ___ the picture.",a:"at",d:["to","on"],h:"look at"},
  {q:"He is different ___ his brother.",a:"from",d:["than","of"],h:"different from"}
];

/* ============================================================
   ٨) الأزمنة — s: الجملة بفراغ، a: الصواب، d: بدائل
============================================================ */
const TENSES = [
  {q:"Every day he ___ to school.",a:"walks",d:["walked","is walking"],h:"مضارع بسيط: عادة"},
  {q:"Right now she ___ a letter.",a:"is writing",d:["writes","wrote"],h:"مضارع مستمر: الآن"},
  {q:"Yesterday we ___ dates.",a:"picked",d:["pick","are picking"],h:"ماضٍ بسيط"},
  {q:"Tomorrow they ___ to Salalah.",a:"will travel",d:["travelled","travel"],h:"مستقبل: will"},
  {q:"He ___ here since 2019.",a:"has lived",d:["lives","lived"],h:"مضارع تام + since"},
  {q:"When I arrived, she ___ .",a:"was cooking",d:["cooks","cooked"],h:"ماضٍ مستمر"},
  {q:"By sunset we ___ the work.",a:"will have finished",d:["finish","finished"],h:"مستقبل تام"},
  {q:"The sun ___ in the east.",a:"rises",d:["rise","is rising"],h:"حقيقة ثابتة"},
  {q:"Look! The falcon ___ .",a:"is flying",d:["flies","flew"],h:"يحدث الآن"},
  {q:"Last week I ___ my grandmother.",a:"visited",d:["visit","have visited"],h:"وقت ماضٍ محدد"},
  {q:"She ___ never seen the sea.",a:"has",d:["have","had"],h:"She + has"},
  {q:"They ___ playing when it rained.",a:"were",d:["was","are"],h:"They + were"},
  {q:"I ___ my homework before dinner.",a:"had finished",d:["finish","finishing"],h:"ماضٍ تام"},
  {q:"Water ___ at 100 degrees.",a:"boils",d:["boil","is boiling"],h:"حقيقة علمية"},
  {q:"He usually ___ coffee in the morning.",a:"drinks",d:["is drinking","drank"],h:"usually + مضارع بسيط"},
  {q:"We ___ to the souq next Friday.",a:"are going",d:["went","go"],h:"ترتيب مستقبلي"},
  {q:"She ___ the door when I knocked.",a:"opened",d:["opens","has opened"],h:"ماضٍ بسيط"},
  {q:"My father ___ trucks for ten years.",a:"has driven",d:["drives","drove"],h:"for + مضارع تام"},
  {q:"While he ___, the phone rang.",a:"was reading",d:["reads","read"],h:"ماضٍ مستمر مع حدث"},
  {q:"They ___ already left.",a:"have",d:["has","are"],h:"They + have"},
  {q:"Next year I ___ ten.",a:"will be",d:["am","was"],h:"مستقبل"},
  {q:"The boat ___ at the port now.",a:"is waiting",d:["waits","waited"],h:"الآن"},
  {q:"He ___ his keys and cannot enter.",a:"has lost",d:["lost","loses"],h:"نتيجة حاضرة"},
  {q:"We ___ dinner when you called.",a:"were having",d:["had","have"],h:"ماضٍ مستمر"},
  {q:"She ___ English for two years before moving.",a:"had studied",d:["studied","studies"],h:"ماضٍ تام"},
  {q:"Birds ___ south in winter.",a:"fly",d:["flies","are flying"],h:"عادة عامة"},
  {q:"I ___ you tomorrow.",a:"will call",d:["called","call"],h:"وعد مستقبلي"},
  {q:"The dates ___ dried in the sun every year.",a:"are",d:["is","were"],h:"مبني للمجهول مضارع"},
  {q:"That fort ___ 300 years ago.",a:"was built",d:["is built","builds"],h:"مبني للمجهول ماضٍ"},
  {q:"By the time we arrived, they ___ .",a:"had gone",d:["went","go"],h:"ماضٍ تام"}
];

/* ============================================================
   ٩) المقارنة والتفضيل
============================================================ */
const COMPARE = [
  {q:"A camel is ___ than a goat.",a:"bigger",d:["big","biggest"],h:"صفة قصيرة + er"},
  {q:"This is the ___ fort in Oman.",a:"oldest",d:["older","old"],h:"the + est"},
  {q:"She runs ___ than me.",a:"faster",d:["fast","fastest"],h:"faster"},
  {q:"Salalah is ___ than Muscat in summer.",a:"cooler",d:["cool","coolest"],h:"cooler"},
  {q:"This book is ___ interesting than that one.",a:"more",d:["most","much"],h:"صفة طويلة: more"},
  {q:"He is the ___ intelligent student.",a:"most",d:["more","much"],h:"the most + صفة طويلة"},
  {q:"Today is ___ than yesterday.",a:"hotter",d:["hot","hottest"],h:"مضاعفة الحرف: hotter"},
  {q:"This is the ___ story I know.",a:"funniest",d:["funnier","funny"],h:"y → iest"},
  {q:"Her voice is ___ than his.",a:"softer",d:["soft","softest"],h:"softer"},
  {q:"That was the ___ day of my life.",a:"best",d:["better","good"],h:"good → best"},
  {q:"My result is ___ than last time.",a:"better",d:["gooder","best"],h:"good → better"},
  {q:"This road is ___ than that one.",a:"worse",d:["badder","worst"],h:"bad → worse"},
  {q:"It was the ___ meal I ever had.",a:"worst",d:["worse","baddest"],h:"bad → worst"},
  {q:"He has ___ books than me.",a:"more",d:["much","most"],h:"many → more"},
  {q:"She has the ___ dates of all.",a:"most",d:["more","much"],h:"many → the most"},
  {q:"This bag is ___ heavy as that one.",a:"as",d:["so","than"],h:"as ... as"},
  {q:"He is not ___ tall as his father.",a:"as",d:["more","than"],h:"not as ... as"},
  {q:"The falaj is ___ deeper here.",a:"much",d:["very","more"],h:"much + مقارنة"},
  {q:"Nizwa is ___ from Muscat than Sur.",a:"farther",d:["far","farthest"],h:"far → farther"},
  {q:"She is ___ careful than her brother.",a:"more",d:["most","much"],h:"careful طويلة"},
  {q:"Of the three, this is the ___ .",a:"smallest",d:["smaller","small"],h:"ثلاثة فأكثر: the est"},
  {q:"Of the two, this is the ___ one.",a:"smaller",d:["smallest","small"],h:"اثنان: المقارنة"},
  {q:"The more you read, the ___ you learn.",a:"more",d:["most","much"],h:"the more ... the more"},
  {q:"He is by far the ___ swimmer.",a:"strongest",d:["stronger","strong"],h:"by far the est"},
  {q:"This tree is twice ___ tall as that one.",a:"as",d:["more","than"],h:"twice as ... as"}
];

/* ============================================================
   ١٠) أدوات الاستفهام
============================================================ */
const QUESTIONS = [
  {q:"___ is your name?",a:"What",d:["Who","Where"],h:"سؤال عن شيء"},
  {q:"___ are you from?",a:"Where",d:["What","When"],h:"سؤال عن المكان"},
  {q:"___ is your teacher?",a:"Who",d:["What","Which"],h:"سؤال عن شخص"},
  {q:"___ do you wake up?",a:"When",d:["Where","Why"],h:"سؤال عن الوقت"},
  {q:"___ are you sad?",a:"Why",d:["How","What"],h:"سؤال عن السبب"},
  {q:"___ do you go to school?",a:"How",d:["What","Who"],h:"سؤال عن الطريقة"},
  {q:"___ old are you?",a:"How",d:["What","When"],h:"How old"},
  {q:"___ many brothers do you have?",a:"How",d:["What","Which"],h:"How many"},
  {q:"___ much is this?",a:"How",d:["What","Which"],h:"How much"},
  {q:"___ colour do you like, red or blue?",a:"Which",d:["What","Who"],h:"Which للاختيار المحدود"},
  {q:"___ book is this?",a:"Whose",d:["Who","Which"],h:"Whose للملكية"},
  {q:"___ far is the souq?",a:"How",d:["What","Where"],h:"How far"},
  {q:"___ long does it take?",a:"How",d:["What","When"],h:"How long"},
  {q:"___ often do you swim?",a:"How",d:["When","What"],h:"How often"},
  {q:"___ happened here?",a:"What",d:["Who","How"],h:"What للحدث"},
  {q:"___ did you meet at the port?",a:"Who",d:["What","Where"],h:"Who للشخص"},
  {q:"___ is the falaj built?",a:"How",d:["Why","Who"],h:"How للطريقة"},
  {q:"___ time is it?",a:"What",d:["How","When"],h:"What time"},
  {q:"___ of these dates is sweeter?",a:"Which",d:["What","Who"],h:"Which of"},
  {q:"___ are you going tomorrow?",a:"Where",d:["Who","Why"],h:"Where للمكان"}
];

/* ============================================================
   ١١) أدوات التعريف a / an / the
============================================================ */
const ARTICLES = [
  {q:"I saw ___ falcon on the roof.",a:"a",d:["an","the"],h:"حرف ساكن: a"},
  {q:"She ate ___ apple.",a:"an",d:["a","the"],h:"حرف صوتي: an"},
  {q:"He is ___ honest man.",a:"an",d:["a","the"],h:"h صامتة → an"},
  {q:"This is ___ university.",a:"a",d:["an","the"],h:"تُنطق yu → a"},
  {q:"___ sun is very hot today.",a:"The",d:["A","An"],h:"شيء وحيد: the"},
  {q:"I need ___ hour to finish.",a:"an",d:["a","the"],h:"h صامتة → an"},
  {q:"We visited ___ old fort.",a:"an",d:["a","the"],h:"صوت o → an"},
  {q:"She plays ___ oud beautifully.",a:"the",d:["a","an"],h:"آلة موسيقية: the"},
  {q:"He is ___ best pilot here.",a:"the",d:["a","an"],h:"التفضيل: the"},
  {q:"I have ___ idea!",a:"an",d:["a","the"],h:"صوت i → an"},
  {q:"They live in ___ big house.",a:"a",d:["an","the"],h:"b ساكن → a"},
  {q:"Look at ___ moon tonight.",a:"the",d:["a","an"],h:"شيء وحيد: the"},
  {q:"He wants to be ___ engineer.",a:"an",d:["a","the"],h:"صوت e → an"},
  {q:"Give me ___ umbrella, please.",a:"an",d:["a","the"],h:"صوت u قصير → an"},
  {q:"We went to ___ souq yesterday.",a:"the",d:["a","an"],h:"معروف للطرفين: the"},
  {q:"Oman is ___ beautiful country.",a:"a",d:["an","the"],h:"b ساكن → a"},
  {q:"___ dates from Oman are famous.",a:"The",d:["A","An"],h:"محدد بـ from Oman"},
  {q:"I bought ___ new bag.",a:"a",d:["an","the"],h:"n ساكن → a"},
  {q:"She is ___ only girl here.",a:"the",d:["a","an"],h:"only → the"},
  {q:"He gave me ___ useful book.",a:"a",d:["an","the"],h:"تُنطق yu → a"}
];

/* ============================================================
   ١٢) الضمائر
============================================================ */
const PRONOUNS = [
  {q:"___ am a student.",a:"I",d:["Me","My"],h:"فاعل: I"},
  {q:"Give the book to ___ .",a:"me",d:["I","my"],h:"مفعول: me"},
  {q:"This is ___ bag.",a:"my",d:["me","mine"],h:"صفة ملكية + اسم"},
  {q:"The bag is ___ .",a:"mine",d:["my","me"],h:"ضمير ملكية بلا اسم"},
  {q:"___ is my sister.",a:"She",d:["Her","Hers"],h:"فاعل: She"},
  {q:"I saw ___ at the souq.",a:"her",d:["she","hers"],h:"مفعول: her"},
  {q:"That is ___ house.",a:"their",d:["them","theirs"],h:"صفة ملكية"},
  {q:"The house is ___ .",a:"theirs",d:["their","them"],h:"ضمير ملكية"},
  {q:"___ are my friends.",a:"They",d:["Them","Their"],h:"فاعل: They"},
  {q:"He hurt ___ climbing the wall.",a:"himself",d:["him","his"],h:"انعكاسي"},
  {q:"We enjoyed ___ at the beach.",a:"ourselves",d:["us","our"],h:"انعكاسي جمع"},
  {q:"___ is raining outside.",a:"It",d:["He","This"],h:"It للطقس"},
  {q:"Ali and ___ are cousins.",a:"I",d:["me","my"],h:"فاعل مركّب: I"},
  {q:"Between you and ___ , it's a secret.",a:"me",d:["I","my"],h:"بعد حرف جر: me"},
  {q:"___ book is this? — It's Salim's.",a:"Whose",d:["Who","Which"],h:"Whose للملكية"},
  {q:"The boy ___ won is my brother.",a:"who",d:["which","whose"],h:"who لِلعاقل"},
  {q:"The dhow ___ we saw was old.",a:"which",d:["who","whose"],h:"which لغير العاقل"},
  {q:"Everyone ___ came was happy.",a:"who",d:["which","what"],h:"who بعد everyone"},
  {q:"___ of you can swim?",a:"Which",d:["What","Whose"],h:"Which of you"},
  {q:"Help ___ to some dates!",a:"yourself",d:["you","your"],h:"انعكاسي للأمر"}
];

/* ============================================================
   الوحدات العشر — كل وحدة عشرة مستويات
============================================================ */
const UNITS = [
  { n:1,  ar:"المفردات الأولى",        en:"First Words",
    themes:["family","home","kitchen","colours","numbers","body","clothes","food","fruits","farm"],
    types:["vocab"],            need:[6,14] },
  { n:2,  ar:"عالمنا من حولنا",        en:"Our World",
    themes:["vegetables","drinks","wild","sea","birds","insects","nature","weather","shapes","places"],
    types:["vocab"],            need:[8,16] },
  { n:3,  ar:"المدينة والحياة",        en:"City & Life",
    themes:["city","shops","transport","jobs","sports","feelings","school","time","calendar","music"],
    types:["vocab"],            need:[9,17] },
  { n:4,  ar:"تراثنا العُماني",        en:"Our Omani Heritage",
    themes:["oman","rescue","tools","verbs","adjectives","nature","sea","city","farm","food"],
    types:["vocab","spelling"], need:[10,18] },
  { n:5,  ar:"الإملاء الصحيح",         en:"Spelling",
    themes:[], types:["spelling"],                     need:[10,20] },
  { n:6,  ar:"الأضداد والصفات",        en:"Opposites & Adjectives",
    themes:["adjectives","feelings"], types:["opposite","vocab"], need:[10,20] },
  { n:7,  ar:"الجموع",                 en:"Plurals",
    themes:[], types:["plural","spelling"],            need:[11,21] },
  { n:8,  ar:"حروف الجر والاستفهام",   en:"Prepositions & Questions",
    themes:[], types:["prep","question"],              need:[11,21] },
  { n:9,  ar:"الأزمنة والقواعد",        en:"Tenses & Grammar",
    themes:[], types:["tense","grammar","article","pronoun"], need:[12,22] },
  { n:10, ar:"إتقان الجملة",           en:"Sentence Mastery",
    themes:[], types:["sentence","compare","grammar","tense"], need:[12,24] }
];

/* ============================================================
   المستويات المئة — تُبنى من الوحدات
   كل وحدة: عشرة مستويات يتصاعد فيها الهدف والطقس والموضوع.
============================================================ */
const LEVELS = (() => {
  const out = [];
  for (const U of UNITS){
    for (let i = 0; i < 10; i++){
      const n = (U.n - 1) * 10 + i + 1;
      const t = i / 9;
      const need = Math.round(U.need[0] + (U.need[1] - U.need[0]) * t);
      const theme = U.themes.length ? U.themes[i % U.themes.length] : null;
      const themeAr = theme ? VOCAB[theme].ar : U.ar;
      const themeEn = theme ? VOCAB[theme].en : U.en;
      out.push({
        n, unit: U.n,
        unitAr: U.ar, unitEn: U.en,
        ar: themeAr, en: themeEn,
        types: U.types,
        pool: theme ? [theme] : [],
        need,
        /* الطقس يشتدّ داخل كل وحدة ثم يهدأ في بداية التالية */
        weather: 1 + (i % 9),
        mission: theme
          ? `المستوى ${n} · ${themeAr} — التقطوا كلمات ${themeAr}`
          : `المستوى ${n} · ${U.ar} — ${themeEn}`
      });
    }
  }
  return out;
})();

/* عدد عناصر كل بنك — مفيد للعرض في الشاشات */
const STATS = {
  themes:      VOCAB_KEYS.length,
  words:       VOCAB_ALL.length,
  spelling:    SPELLING.length,
  grammar:     GRAMMAR.length,
  sentences:   SENTENCES.length,
  opposites:   OPPOSITES.length,
  plurals:     PLURALS.length,
  preps:       PREPS.length,
  tenses:      TENSES.length,
  compare:     COMPARE.length,
  questions:   QUESTIONS.length,
  articles:    ARTICLES.length,
  pronouns:    PRONOUNS.length,
  levels:      LEVELS.length,
  get total(){
    return this.words + this.spelling + this.grammar + this.sentences +
           this.opposites + this.plurals + this.preps + this.tenses +
           this.compare + this.questions + this.articles + this.pronouns;
  }
};

/* ============================================================
   مولّد الأسئلة — يعطي سؤالاً جاهزاً من نوع مطلوب
   يُرجع: {type, prompt, correct, choices[], hint, learn}
============================================================ */
const pick = a => a[Math.floor(Math.random() * a.length)];
function shuffle(a){
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
function otherWords(correct, n){
  const out = [], seen = new Set([correct]);
  let guard = 0;
  while (out.length < n && guard++ < 300){
    const c = pick(VOCAB_ALL).en;
    if (!seen.has(c)){ seen.add(c); out.push(c); }
  }
  return out;
}

function makeQuestion(level){
  const L = level || LEVELS[0];
  const type = pick(L.types);
  const pool = (L.pool && L.pool.length)
    ? L.pool.flatMap(k => (VOCAB[k] ? VOCAB[k].items : []))
    : VOCAB_ALL;

  switch (type){
    case 'vocab': {
      const s = pick(pool);
      return { type, prompt:`${s.e}  ما الكلمة الإنجليزية لـ «${s.ar}»؟`,
               correct:s.en, choices:shuffle([s.en, ...otherWords(s.en, 2)]),
               hint:`${s.ar} = ${s.en}`, learn:`${s.en} = ${s.ar}` };
    }
    case 'spelling': {
      const s = pick(SPELLING);
      return { type, prompt:`الكتابة الصحيحة لـ «${s.bad}»؟ 📝`,
               correct:s.opts[0], choices:shuffle(s.opts),
               hint:`الصواب: ${s.opts[0]}`, learn:s.opts[0] };
    }
    case 'grammar': {
      const s = pick(GRAMMAR);
      return { type, prompt:s.q, correct:s.opts[0], choices:shuffle(s.opts),
               hint:s.h, learn:s.q.replace('___', s.opts[0]) };
    }
    case 'sentence': {
      const s = pick(SENTENCES);
      const hasErr = s.e >= 0;
      const fixed = hasErr
        ? s.w.map((w,i) => i === s.e ? (s.c || '') : w).filter(Boolean).join(' ')
        : s.w.join(' ');
      return { type, kind:'sentence',
               prompt: hasErr ? 'أمسكوا الكلمة الخاطئة 🔍' : 'هذه جملة صحيحة — أمسكوا OK ✅',
               sentence: s.w.join(' '),
               words: hasErr ? s.w : [...s.w, 'OK'],
               targetIndex: hasErr ? s.e : s.w.length,
               correct: fixed, hint:s.h, learn:fixed };
    }
    case 'opposite': {
      const s = pick(OPPOSITES);
      return { type, prompt:`ما ضدّ «${s.w}»؟ ↔️`, correct:s.o,
               choices:shuffle([s.o, ...s.d]), hint:`${s.w} ↔ ${s.o}`,
               learn:`${s.w} ↔ ${s.o}` };
    }
    case 'plural': {
      const s = pick(PLURALS);
      return { type, prompt:`ما جمع «${s.s}»؟ 👥`, correct:s.p,
               choices:shuffle([s.p, ...s.d]), hint:`${s.s} → ${s.p}`,
               learn:`${s.s} → ${s.p}` };
    }
    case 'prep': {
      const s = pick(PREPS);
      return { type, prompt:s.q + ' 📍', correct:s.a, choices:shuffle([s.a, ...s.d]),
               hint:s.h, learn:s.q.replace('___', s.a) };
    }
    case 'tense': {
      const s = pick(TENSES);
      return { type, prompt:s.q + ' ⏳', correct:s.a, choices:shuffle([s.a, ...s.d]),
               hint:s.h, learn:s.q.replace('___', s.a) };
    }
    case 'compare': {
      const s = pick(COMPARE);
      return { type, prompt:s.q + ' 📊', correct:s.a, choices:shuffle([s.a, ...s.d]),
               hint:s.h, learn:s.q.replace('___', s.a) };
    }
    case 'question': {
      const s = pick(QUESTIONS);
      return { type, prompt:s.q + ' ❓', correct:s.a, choices:shuffle([s.a, ...s.d]),
               hint:s.h, learn:s.q.replace('___', s.a) };
    }
    case 'article': {
      const s = pick(ARTICLES);
      return { type, prompt:s.q + ' 🔤', correct:s.a, choices:shuffle([s.a, ...s.d]),
               hint:s.h, learn:s.q.replace('___', s.a) };
    }
    case 'pronoun': {
      const s = pick(PRONOUNS);
      return { type, prompt:s.q + ' 👤', correct:s.a, choices:shuffle([s.a, ...s.d]),
               hint:s.h, learn:s.q.replace('___', s.a) };
    }
    default: {
      const s = pick(VOCAB_ALL);
      return { type:'vocab', prompt:`${s.e}  ما الكلمة الإنجليزية لـ «${s.ar}»؟`,
               correct:s.en, choices:shuffle([s.en, ...otherWords(s.en, 2)]),
               hint:`${s.ar} = ${s.en}`, learn:`${s.en} = ${s.ar}` };
    }
  }
}


/* ============================================================
   التصدير — يعمل كسكربت عادي (window.PALM) وكوحدة ES
============================================================ */
root.PALM = {
  VOCAB, VOCAB_KEYS, VOCAB_ALL,
  SPELLING, GRAMMAR, SENTENCES, OPPOSITES, PLURALS, PREPS,
  TENSES, COMPARE, QUESTIONS, ARTICLES, PRONOUNS,
  UNITS, LEVELS, STATS, makeQuestion
};

})(typeof globalThis !== 'undefined' ? globalThis : this);
