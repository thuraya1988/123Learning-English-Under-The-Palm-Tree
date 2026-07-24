/* ============================================
   Al-Qarawashiya Tarot - Hand Gesture Control
   MediaPipe Hands + Three.js + Canvas 2D
   Colors: BEIGE + DEEP BURGUNDY + DARK BROWN
   NO GOLD
   ============================================ */

// ============================================
// TAROT CARD DATA - Major Arcana (22 cards)
// ============================================
// ============================================================
// مجموعة أسئلة مشتركة (من ملف الزب) — أسئلة عامة عن عمان، تُستخدم
// مؤقتاً لكل البطاقات الجديدة لحين تأليف أسئلة خاصة بكل مستوى
// ============================================================
const SharedQuestionPool = [
  { q: "In which governorate is Bahla Fort located?", opts: ["Ad Dakhiliyah", "Muscat", "Dhofar", "Al Batinah"], correct: 0 },
  { q: "When was Bahla Fort added to UNESCO World Heritage list?", opts: ["1987", "1990", "2000", "2006"], correct: 0 },
  { q: "What material is Bahla Fort primarily built from?", opts: ["Mud brick", "Marble", "Granite", "Concrete"], correct: 0 },
  { q: "Which tribe built Bahla Fort?", opts: ["Bani Nebhan", "Bani Qitab", "Bani Hattab", "Bani Riyam"], correct: 0 },
  { q: "How many mosques are inside Bahla Fort?", opts: ["3", "1", "5", "7"], correct: 0 },
  { q: "What is the main defensive feature of Bahla Fort?", opts: ["Round tower", "Moat", "Drawbridge", "Catapult"], correct: 0 },
  { q: "Bahla Fort is surrounded by what type of wall?", opts: ["Mud brick wall", "Stone wall", "Iron fence", "Wooden palisade"], correct: 0 },
  { q: "What century was Bahla Fort originally built?", opts: ["13th", "15th", "17th", "19th"], correct: 0 },
  { q: "Bahla is known for what traditional craft?", opts: ["Pottery", "Weaving", "Metalwork", "Glassblowing"], correct: 0 },
  { q: "What color are the walls of Bahla Fort?", opts: ["Brown", "White", "Blue", "Red"], correct: 0 },
  { q: "How tall is the main tower of Bahla Fort?", opts: ["40 meters", "20 meters", "60 meters", "80 meters"], correct: 0 },
  { q: "What is the shape of Bahla Fort's main tower?", opts: ["Circular", "Square", "Triangular", "Hexagonal"], correct: 0 },
  { q: "Bahla Fort was restored in which decade?", opts: ["1990s", "1970s", "2000s", "1950s"], correct: 0 },
  { q: "What type of trees surround Bahla Fort?", opts: ["Date palms", "Olive trees", "Pine trees", "Coconut trees"], correct: 0 },
  { q: "Bahla Fort is the only fort in Oman with what feature?", opts: ["Underground passages", "Swimming pool", "Elevator", "Air conditioning"], correct: 0 },
  { q: "What is the Arabic name for Bahla Fort?", opts: ["Qasr Bahla", "Husn Bahla", "Qalaa Bahla", "Bait Bahla"], correct: 0 },
  { q: "How many rooms are estimated inside Bahla Fort?", opts: ["Over 100", "50", "25", "200"], correct: 0 },
  { q: "What defensive structure surrounds Bahla town?", opts: ["Wall with 7 gates", "River", "Mountain", "Forest"], correct: 0 },
  { q: "Bahla Fort is one of how many UNESCO sites in Oman?", opts: ["5", "3", "7", "10"], correct: 0 },
  { q: "What animal is commonly depicted in Bahla pottery?", opts: ["Camel", "Horse", "Bird", "Fish"], correct: 0 },
  { q: "The wall around Bahla is how many kilometers long?", opts: ["13 km", "5 km", "20 km", "8 km"], correct: 0 },
  { q: "What is the main entrance of Bahla Fort called?", opts: ["Bab al-Fath", "Bab al-Salam", "Bab al-Rahma", "Bab al-Karim"], correct: 0 },
  { q: "Bahla Fort overlooks which wadi?", opts: ["Wadi Bahla", "Wadi Shab", "Wadi Bani Khalid", "Wadi Dawkah"], correct: 0 },
  { q: "What type of roof does Bahla Fort have?", opts: ["Palm frond", "Tile", "Metal", "Concrete"], correct: 0 },
  { q: "How many towers does Bahla Fort have?", opts: ["4", "2", "6", "8"], correct: 0 },
  { q: "What is the local name for the Bahla Fort wall?", opts: ["Sur", "Hisan", "Qasr", "Bait"], correct: 0 },
  { q: "Bahla was the capital of which historical region?", opts: ["Nizwa region", "Muscat region", "Salalah region", "Sohar region"], correct: 0 },
  { q: "What defensive feature is unique to Bahla Fort?", opts: ["False doors", "Cannons", "Watchtowers", "Drawbridges"], correct: 0 },
  { q: "What material is used for the fort's foundation?", opts: ["Stone", "Wood", "Iron", "Sand"], correct: 0 },
  { q: "How many floors does the main tower have?", opts: ["5", "3", "7", "2"], correct: 0 },
  { q: "What is the purpose of the small openings in walls?", opts: ["Archer positions", "Windows", "Ventilation", "Decoration"], correct: 0 },
  { q: "Bahla Fort's restoration took how many years?", opts: ["12 years", "5 years", "20 years", "3 years"], correct: 0 },
  { q: "What is the traditional Omani weapon stored in forts?", opts: ["Khanjar", "Sword", "Spear", "Bow"], correct: 0 },
  { q: "What color is the Omani flag?", opts: ["Red, white, green", "Blue, yellow, red", "Green, black, white", "Red, black, white"], correct: 0 },
  { q: "What does the khanjar symbolize?", opts: ["Manhood and honor", "Wealth", "Peace", "War"], correct: 0 },
  { q: "What is the capital of Oman?", opts: ["Muscat", "Salalah", "Nizwa", "Sohar"], correct: 0 },
  { q: "When did Oman gain independence?", opts: ["1970", "1960", "1980", "1950"], correct: 0 },
  { q: "Who was the Sultan who modernized Oman?", opts: ["Qaboos bin Said", "Said bin Taimur", "Faisal bin Turki", "Nadir bin Faisal"], correct: 0 },
  { q: "What is the currency of Oman?", opts: ["Rial", "Dinar", "Dirham", "Rupee"], correct: 0 },
  { q: "What is the official language of Oman?", opts: ["Arabic", "English", "French", "Urdu"], correct: 0 },
  { q: "What is the population of Oman approximately?", opts: ["5 million", "10 million", "2 million", "8 million"], correct: 0 },
  { q: "What sea borders Oman?", opts: ["Arabian Sea", "Red Sea", "Mediterranean", "Caspian"], correct: 0 },
  { q: "What is the highest mountain in Oman?", opts: ["Jebel Shams", "Jebel Akhdar", "Al Hajar", "Jebel Qahwan"], correct: 0 },
  { q: "What is the largest desert in Oman?", opts: ["Rub al Khali", "Wahiba Sands", "Nafud", "Dahna"], correct: 0 },
  { q: "What is Oman's national animal?", opts: ["Arabian Oryx", "Camel", "Falcon", "Horse"], correct: 0 },
  { q: "What is the traditional Omani coffee called?", opts: ["Kahwa", "Qahwa", "Gahwa", "Kawa"], correct: 0 },
  { q: "What spice is essential in Omani coffee?", opts: ["Cardamom", "Cinnamon", "Saffron", "Cloves"], correct: 0 },
  { q: "What is the traditional Omani dagger called?", opts: ["Khanjar", "Jambiya", "Kard", "Peshkabz"], correct: 0 },
  { q: "What is the Omani traditional dress for men?", opts: ["Dishdasha", "Thobe", "Kandura", "Jalabiya"], correct: 0 },
  { q: "What is the Omani traditional cap called?", opts: ["Kumma", "Taqiya", "Imama", "Ghutra"], correct: 0 },
  { q: "What is the Omani turban called?", opts: ["Mussar", "Imama", "Shumagh", "Ghutra"], correct: 0 },
  { q: "What is the traditional Omani women's mask?", opts: ["Burqa", "Niqab", "Hijab", "Battoulah"], correct: 0 },
  { q: "What is the main ingredient in Omani halwa?", opts: ["Starch", "Flour", "Rice", "Corn"], correct: 0 },
  { q: "What nut is commonly used in Omani halwa?", opts: ["Cashew", "Almond", "Pistachio", "Walnut"], correct: 0 },
  { q: "What is the traditional Omani bread called?", opts: ["Khubz Ragag", "Pita", "Naan", "Lavash"], correct: 0 },
  { q: "What is the Omani national dish?", opts: ["Shuwa", "Majboos", "Mandi", "Machboos"], correct: 0 },
  { q: "How is shuwa traditionally cooked?", opts: ["Underground oven", "Grill", "Stove", "Clay pot"], correct: 0 },
  { q: "What meat is used in traditional shuwa?", opts: ["Lamb or goat", "Chicken", "Beef", "Camel"], correct: 0 },
  { q: "What leaves are used to wrap shuwa?", opts: ["Banana leaves", "Palm leaves", "Fig leaves", "Grape leaves"], correct: 0 },
  { q: "What is the Omani rice dish called?", opts: ["Majboos", "Biryani", "Pilaf", "Kabsa"], correct: 0 },
  { q: "What fish is used in Mashuai?", opts: ["Kingfish", "Tuna", "Sardine", "Shark"], correct: 0 },
  { q: "What is the Omani grilled fish dish?", opts: ["Mashuai", "Samak", "Sayad", "Hout"], correct: 0 },
  { q: "What is the traditional Omani sweet dumpling?", opts: ["Luqaimat", "Baklava", "Kunafa", "Basbousa"], correct: 0 },
  { q: "What syrup is poured on luqaimat?", opts: ["Date syrup", "Honey", "Sugar", "Maple"], correct: 0 },
  { q: "What is the Omani meat skewer called?", opts: ["Mishkak", "Kebab", "Tikka", "Shish"], correct: 0 },
  { q: "What sauce is served with mishkak?", opts: ["Tamarind", "Tahini", "Yogurt", "Chili"], correct: 0 },
  { q: "What is the Omani wheat porridge?", opts: ["Harees", "Madrouba", "Jareesh", "Freekeh"], correct: 0 },
  { q: "When is harees traditionally eaten?", opts: ["Ramadan", "Eid", "Wedding", "Friday"], correct: 0 },
  { q: "What is the Omani rice porridge called?", opts: ["Madrouba", "Harees", "Jareesh", "Shorba"], correct: 0 },
  { q: "What spice flavors madrouba?", opts: ["Cardamom", "Cumin", "Turmeric", "Cinnamon"], correct: 0 },
  { q: "What is the Omani date flatbread?", opts: ["Khoubz Mardhouf", "Khubz Ragag", "Ragag", "Malawah"], correct: 0 },
  { q: "What cheese is in Khaliat Nahal?", opts: ["Cream cheese", "Feta", "Cheddar", "Mozzarella"], correct: 0 },
  { q: "When is Khaliat Nahal traditionally made?", opts: ["Ramadan", "Eid", "Wedding", "National Day"], correct: 0 },
  { q: "What is the Omani honeycomb bread?", opts: ["Khaliat Nahal", "Luqaimat", "Kunafa", "Baklava"], correct: 0 },
  { q: "What is the main ingredient in Omani halwa?", opts: ["Sugar", "Honey", "Dates", "Milk"], correct: 0 },
  { q: "What gives Omani halwa its color?", opts: ["Saffron", "Turmeric", "Beetroot", "Paprika"], correct: 0 },
  { q: "What is the traditional Omani incense?", opts: ["Frankincense", "Myrrh", "Sandalwood", "Agarwood"], correct: 0 },
  { q: "Where does frankincense come from in Oman?", opts: ["Dhofar", "Muscat", "Nizwa", "Sohar"], correct: 0 },
  { q: "What tree produces frankincense?", opts: ["Boswellia sacra", "Acacia", "Palm", "Olive"], correct: 0 },
  { q: "What was frankincense worth in ancient times?", opts: ["More than gold", "Same as silver", "Less than copper", "Worthless"], correct: 0 },
  { q: "What is the ancient name for Oman?", opts: ["Magan", "Sheba", "Hadhramaut", "Dilmun"], correct: 0 },
  { q: "What did ancient Oman export?", opts: ["Copper", "Iron", "Gold", "Silk"], correct: 0 },
  { q: "What civilization traded with ancient Oman?", opts: ["Mesopotamia", "Rome", "China", "Egypt"], correct: 0 },
  { q: "What is the Omani traditional boat called?", opts: ["Dhow", "Felucca", "Junk", "Galley"], correct: 0 },
  { q: "What is the famous Omani port city?", opts: ["Sohar", "Muscat", "Salalah", "Sur"], correct: 0 },
  { q: "Who was the famous Omani sailor?", opts: ["Ahmad bin Majid", "Sinbad", "Vasco da Gama", "Marco Polo"], correct: 0 },
  { q: "What did Ahmad bin Majid write about?", opts: ["Navigation", "Poetry", "Medicine", "Astronomy"], correct: 0 },
  { q: "What is the Omani version of Sinbad?", opts: ["Sailor of the East", "Pirate", "Merchant", "Explorer"], correct: 0 },
  { q: "What sea did Omani sailors cross?", opts: ["Indian Ocean", "Atlantic", "Pacific", "Mediterranean"], correct: 0 },
  { q: "What African city did Oman rule?", opts: ["Zanzibar", "Mombasa", "Dar es Salaam", "Kilwa"], correct: 0 },
  { q: "When did Oman rule Zanzibar?", opts: ["19th century", "15th century", "17th century", "20th century"], correct: 0 },
  { q: "What is the Omani palace in Zanzibar?", opts: ["House of Wonders", "Alhambra", "Topkapi", "Forbidden City"], correct: 0 },
  { q: "What is the main export of ancient Sohar?", opts: ["Copper", "Silk", "Spices", "Pearls"], correct: 0 },
  { q: "What is the Omani pearl diving tradition?", opts: ["Ghaws", "Taqa", "Sima", "Ramy"], correct: 0 },
  { q: "What is the traditional Omani pearl market?", opts: ["Muttrah Souq", "Nizwa Souq", "Salalah Souq", "Sohar Souq"], correct: 0 },
  { q: "What is the Omani traditional dance?", opts: ["Razha", "Dabke", "Belly dance", "Sword dance"], correct: 0 },
  { q: "What weapon is used in Razha dance?", opts: ["Sword", "Stick", "Gun", "Shield"], correct: 0 },
  { q: "What is the Omani traditional music?", opts: ["Al-Mawlid", "Oud", "Mizmar", "Rababa"], correct: 0 },
  { q: "What instrument is used in Omani music?", opts: ["Rahmani", "Oud", "Qanun", "Ney"], correct: 0 },
  { q: "What is the Omani traditional poetry?", opts: ["Al-Taghrooda", "Ghazal", "Qasida", "Muwashshah"], correct: 0 },
  { q: "What is the Omani camel race festival?", opts: ["Al-Maidan", "Al-Janad", "Al-Seeb", "Al-Khoud"], correct: 0 },
  { q: "What is the Omani horse breed?", opts: ["Arabian", "Thoroughbred", "Mustang", "Friesian"], correct: 0 },
  { q: "What is the Omani traditional sport?", opts: ["Horse racing", "Camel racing", "Falconry", "Dhow racing"], correct: 0 },
  { q: "What is the Omani falcon called?", opts: ["Saker", "Peregrine", "Gyrfalcon", "Kestrel"], correct: 0 },
  { q: "What is the Omani traditional tent?", opts: ["Bait al-Shaar", "Khaima", "Bayt", "Dar"], correct: 0 },
  { q: "What material is the Omani tent made of?", opts: ["Goat hair", "Cotton", "Silk", "Wool"], correct: 0 },
  { q: "What is the Omani coffee pot called?", opts: ["Dallah", "Ibrik", "Cezve", "Jebena"], correct: 0 },
  { q: "What is the Omani date variety?", opts: ["Khalas", "Medjool", "Deglet Noor", "Barhi"], correct: 0 },
  { q: "What is the best date region in Oman?", opts: ["Nizwa", "Muscat", "Salalah", "Sohar"], correct: 0 },
  { q: "What is the Omani date harvest season?", opts: ["July-August", "December-January", "March-April", "October-November"], correct: 0 },
  { q: "What is the Omani traditional date dish?", opts: ["Asida", "Halwa", "Luqaimat", "Kunafa"], correct: 0 },
  { q: "What is the Omani rose water used for?", opts: ["Perfume and cooking", "Medicine", "Cleaning", "Painting"], correct: 0 },
  { q: "What is the Omani rose water region?", opts: ["Jebel Akhdar", "Salalah", "Nizwa", "Muscat"], correct: 0 },
  { q: "What is the Omani pomegranate region?", opts: ["Jebel Akhdar", "Dhofar", "Batinah", "Sharqiyah"], correct: 0 },
  { q: "What is the Omani apricot called?", opts: ["Mishmish", "Khubz", "Tamar", "Rutab"], correct: 0 },
  { q: "What is the Omani walnut region?", opts: ["Jebel Akhdar", "Salalah", "Nizwa", "Sohar"], correct: 0 },
  { q: "What is the Omani honey region?", opts: ["Wadi Doan", "Jebel Akhdar", "Salalah", "Nizwa"], correct: 0 },
  { q: "What is the Omani traditional medicine?", opts: ["Herbal remedies", "Acupuncture", "Homeopathy", "Ayurveda"], correct: 0 },
  { q: "What is the Omani traditional healer?", opts: ["Hakim", "Tabib", "Muallim", "Sheikh"], correct: 0 },
  { q: "What is the Omani traditional birth ceremony?", opts: ["Aqiqah", "Khatna", "Zaffa", "Mahr"], correct: 0 },
  { q: "What is the Omani wedding tradition?", opts: ["Henna night", "Zaffa", "Mahr", "Walima"], correct: 0 },
  { q: "What is the Omani traditional henna design?", opts: ["Geometric patterns", "Floral", "Animal", "Abstract"], correct: 0 },
  { q: "What is the Omani Eid celebration?", opts: ["Eid al-Fitr", "Eid al-Adha", "Mawlid", "Ashura"], correct: 0 },
  { q: "What is the Omani National Day?", opts: ["November 18", "July 23", "December 12", "January 1"], correct: 0 },
  { q: "What does National Day celebrate?", opts: ["Sultan Qaboos birthday", "Independence", "Unification", "Victory"], correct: 0 },
  { q: "What is the Omani Renaissance Day?", opts: ["July 23", "November 18", "December 12", "January 1"], correct: 0 },
  { q: "What is the Omani flag color order?", opts: ["White, red, green", "Red, white, green", "Green, white, red", "Red, green, white"], correct: 0 },
  { q: "What is on the Omani flag?", opts: ["Coat of arms", "Crescent", "Star", "Sword"], correct: 0 },
  { q: "What is the Omani national anthem?", opts: ["Nashid as-Salaam", "Nashid al-Watani", "Nashid al-Istiqlal", "Nashid al-Umma"], correct: 0 },
  { q: "What is the Omani motto?", opts: ["God, Country, Sultan", "Unity, Faith, Discipline", "Peace, Progress, Prosperity", "Freedom, Justice, Equality"], correct: 0 },
];

const TarotCards = {
    0: { id: 0, name: "The Castle of Knowledge", nameAr: "حصن المعرفة", emoji: "🏰", num: "I",
         meaning: "New beginnings, innocence, spontaneity. A leap of faith into the unknown.",
         meaningAr: "بدايات جديدة، براءة، تلقائية. قفزة إيمان في المجهول.",
         isReady: true,
         category: "place",
         secretWord: "JABRIN CASTLE",
         loreText: "Built in 1670 in the region of Al Dakhiliyah, this stronghold was never meant for war. Instead, scholars gathered within its high walls to study the stars, medicine, and law. Hidden staircases connect rooms painted with verses from the Quran — a place where knowledge, not conquest, was king. Even today, visitors climb narrow stairs to reach the room where a great Imam is said to be buried.",
         vocabTargets: ["stronghold", "scholars", "staircases", "conquest"],
         grammarTargets: ["was never meant", "is said to be"],
         image: "assets/jabrin-castle.jpg",
         questions: [
           { q: 'What was this stronghold built for?', opts: ['War and conquest', 'Knowledge, medicine, and law', 'Trade and markets'], correct: 1 },
           { q: 'What connects the rooms inside?', opts: ['Long tunnels', 'Hidden staircases', 'Glass bridges'], correct: 1 },
           { q: 'What is painted on the walls?', opts: ['Verses from the Quran', 'Modern paintings', 'Old maps'], correct: 0 },
           { q: 'In which region is it located?', opts: ['Al Dakhiliyah', 'Muscat', 'Salalah'], correct: 0 },
           { q: 'Who is said to be buried in a room reached by narrow stairs?', opts: ['A famous trader', 'A great Imam', 'A foreign king'], correct: 1 }
         ]
       },
    1: { id: 1, name: "The Magician", nameAr: "الساحر", emoji: "🎩", num: "I",
         meaning: "Manifestation, resourcefulness, power. You have all the tools you need.",
         meaningAr: "تجسيد، موارد، قوة. عندك كل الأدوات اللي تحتاجها." },
    2: { id: 2, name: "The High Priestess", nameAr: "الكاهنة العليا", emoji: "🌙", num: "II",
         meaning: "Intuition, mystery, subconscious. Trust your inner voice.",
         meaningAr: "حدس، غموض، اللاوعي. صدق صوتك الداخلي." },
    3: { id: 3, name: "The Empress", nameAr: "الإمبراطورة", emoji: "👑", num: "III",
         meaning: "Femininity, beauty, nature. Abundance and nurturing energy.",
         meaningAr: "أنوثة، جمال، طبيعة. وفرة وطاقة حانية." },
    4: { id: 4, name: "The Emperor", nameAr: "الإمبراطور", emoji: "⚔️", num: "IV",
         meaning: "Authority, structure, control. Establish order and discipline.",
         meaningAr: "سلطة، هيكل، تحكم. أنشئ النظام والانضباط." },
    5: { id: 5, name: "The Hierophant", nameAr: "الكاهن", emoji: "📿", num: "V",
         meaning: "Tradition, spirituality, conformity. Seek wisdom from elders.",
         meaningAr: "تقليد، روحانية، تقاليد. ابحث عن الحكمة من الكبار." },
    6: { id: 6, name: "The Lovers", nameAr: "العشاق", emoji: "💕", num: "VI",
         meaning: "Love, harmony, relationships. A choice that aligns with your values.",
         meaningAr: "حب، تناغم، علاقات. اختيار يتوافق مع قيمك." },
    7: { id: 7, name: "The Chariot", nameAr: "المركبة", emoji: "🛡️", num: "VII",
         meaning: "Determination, willpower, victory. Overcome obstacles through focus.",
         meaningAr: "عزيمة، إرادة، نصر. تغلب على العقبات بالتركيز." },
    8: { id: 8, name: "Strength", nameAr: "القوة", emoji: "🦁", num: "VIII",
         meaning: "Courage, patience, inner strength. Gentle power over brute force.",
         meaningAr: "شجاعة، صبر، قوة داخلية. القوة اللطيفة تغلب القوة الغاشمة." },
    9: { id: 9, name: "The Hermit", nameAr: "الناسك", emoji: "🏔️", num: "IX",
         meaning: "Soul-searching, introspection, solitude. Withdraw to find answers.",
         meaningAr: "تأمل، تفكر، عزلة. انسحب لتجد الإجابات." },
    10: { id: 10, name: "Wheel of Fortune", nameAr: "عجلة الحظ", emoji: "☸️", num: "X",
          meaning: "Cycles, change, destiny. What goes down must come up.",
          meaningAr: "دورات، تغيير، قدر. اللي ينزل لازم يطلع." },
    11: { id: 11, name: "Justice", nameAr: "العدل", emoji: "⚖️", num: "XI",
          meaning: "Fairness, truth, cause and effect. Balance will be restored.",
          meaningAr: "إنصاف، حقيقة، سبب ونتيجة. التوازن راح يرجع." },
    12: { id: 12, name: "The Hanged Man", nameAr: "المشنوق", emoji: "🙃", num: "XII",
          meaning: "Pause, surrender, new perspective. Let go to gain clarity.",
          meaningAr: "توقف، استسلام، منظور جديد. خلّص عشان توضح الرؤية." },
    13: { id: 13, name: "Death", nameAr: "الموت", emoji: "💀", num: "XIII",
          meaning: "Transformation, endings, rebirth. Something must end for something new to begin.",
          meaningAr: "تحول، نهايات، ولادة جديدة. شي لازم ينتهي عشان شي جديد يبدأ." },
    14: { id: 14, name: "Temperance", nameAr: "الاعتدال", emoji: "🏺", num: "XIV",
          meaning: "Balance, moderation, patience. Find the middle path.",
          meaningAr: "توازن، اعتدال، صبر. لقِ الطريق الوسط." },
    15: { id: 15, name: "The Devil", nameAr: "الشيطان", emoji: "😈", num: "XV",
          meaning: "Shadow self, attachment, restriction. Break free from chains.",
          meaningAr: "الظل، تعلق، قيد. تحرر من القيود." },
    16: { id: 16, name: "The Tower", nameAr: "البرج", emoji: "🌩️", num: "XVI",
          meaning: "Sudden change, upheaval, revelation. Destruction precedes creation.",
          meaningAr: "تغيير مفاجئ، اضطراب، كشف. الهدم يسبق البناء." },
    17: { id: 17, name: "The Star", nameAr: "النجمة", emoji: "⭐", num: "XVII",
          meaning: "Hope, faith, purpose. The darkness is behind you.",
          meaningAr: "أمل، إيمان، هدف. الظلام وراك." },
    18: { id: 18, name: "The Moon", nameAr: "القمر", emoji: "🌙", num: "XVIII",
          meaning: "Illusion, fear, anxiety. Things are not what they seem.",
          meaningAr: "وهم، خوف، قلق. الأشياء مو زي ما تبدو." },
    19: { id: 19, name: "The Sun", nameAr: "الشمس", emoji: "☀️", num: "XIX",
          meaning: "Positivity, fun, warmth. Success and joy are yours.",
          meaningAr: "إيجابية، مرح، دفء. النجاح والفرح لك." },
    20: { id: 20, name: "Judgement", nameAr: "الحساب", emoji: "📯", num: "XX",
          meaning: "Rebirth, inner calling, absolution. Rise to a higher level.",
          meaningAr: "ولادة جديدة، نداء داخلي، غفران. ارتفع لمستوى أعلى." },
    21: { id: 21, name: "The World", nameAr: "العالم", emoji: "🌍", num: "XXI",
          meaning: "Completion, integration, accomplishment. The journey ends and begins anew.",
          meaningAr: "إكمال، اندماج، إنجاز. الرحلة تنتهي وتبدأ من جديد." },
    22: { id: 22, name: "Bahla Fort", nameAr: "", emoji: "🏰", num: "22",
         meaning: "One of Oman's most impressive forts, built in the 13th century. A UNESCO World Heritage site made of mud brick and stone.",
         meaningAr: "",
         isReady: true,
         category: "landmarks",
         secretWord: "BAHLA FORT",
         loreText: "Built with mud brick, this vast fortress in the desert oasis... a key stronghold without naming it. One of Oman's most impressive forts, built in the 13th century. A UNESCO World Heritage site made of mud brick and stone.",
         vocabTargets: ["impressive", "century"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "In which governorate is Bahla Fort located?", opts: ["Ad Dakhiliyah", "Muscat", "Dhofar", "Al Batinah"], correct: 0 },
           { q: "When was Bahla Fort added to UNESCO World Heritage list?", opts: ["1987", "1990", "2000", "2006"], correct: 0 },
           { q: "What material is Bahla Fort primarily built from?", opts: ["Mud brick", "Marble", "Granite", "Concrete"], correct: 0 },
           { q: "Which tribe built Bahla Fort?", opts: ["Bani Nebhan", "Bani Qitab", "Bani Hattab", "Bani Riyam"], correct: 0 },
           { q: "How many mosques are inside Bahla Fort?", opts: ["3", "1", "5", "7"], correct: 0 }
         ]
       },
    23: { id: 23, name: "Aflaj Oman", nameAr: "", emoji: "💧", num: "23",
         meaning: "The ancient water channels of Oman, engineering marvels over 2,000 years old that still bring life to the desert.",
         meaningAr: "",
         isReady: true,
         category: "heritage",
         secretWord: "AFLAJ OMAN",
         loreText: "An ancient irrigation system that brings water from the mountains to the villages... UNESCO heritage since 2006. The ancient water channels of Oman, engineering marvels over 2,000 years old that still bring life to the desert.",
         vocabTargets: ["ancient", "channels", "engineering", "marvels"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the main defensive feature of Bahla Fort?", opts: ["Round tower", "Moat", "Drawbridge", "Catapult"], correct: 0 },
           { q: "Bahla Fort is surrounded by what type of wall?", opts: ["Mud brick wall", "Stone wall", "Iron fence", "Wooden palisade"], correct: 0 },
           { q: "What century was Bahla Fort originally built?", opts: ["13th", "15th", "17th", "19th"], correct: 0 },
           { q: "Bahla is known for what traditional craft?", opts: ["Pottery", "Weaving", "Metalwork", "Glassblowing"], correct: 0 },
           { q: "What color are the walls of Bahla Fort?", opts: ["Brown", "White", "Blue", "Red"], correct: 0 }
         ]
       },
    24: { id: 24, name: "Omani Khanjar", nameAr: "", emoji: "🗡️", num: "24",
         meaning: "The traditional curved dagger of Oman, worn with the dishdasha. A symbol of manhood, honor, and national identity.",
         meaningAr: "",
         isReady: true,
         category: "culture",
         secretWord: "OMANI KHANJAR",
         loreText: "The curved dagger worn by Omani men... a symbol of pride and heritage on the national flag. The traditional curved dagger of Oman, worn with the dishdasha. A symbol of manhood, honor, and national identity.",
         vocabTargets: ["traditional", "dishdasha", "manhood", "national"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "How tall is the main tower of Bahla Fort?", opts: ["40 meters", "20 meters", "60 meters", "80 meters"], correct: 0 },
           { q: "What is the shape of Bahla Fort's main tower?", opts: ["Circular", "Square", "Triangular", "Hexagonal"], correct: 0 },
           { q: "Bahla Fort was restored in which decade?", opts: ["1990s", "1970s", "2000s", "1950s"], correct: 0 },
           { q: "What type of trees surround Bahla Fort?", opts: ["Date palms", "Olive trees", "Pine trees", "Coconut trees"], correct: 0 },
           { q: "Bahla Fort is the only fort in Oman with what feature?", opts: ["Underground passages", "Swimming pool", "Elevator", "Air conditioning"], correct: 0 }
         ]
       },
    25: { id: 25, name: "Omani Mandi", nameAr: "", emoji: "🍲", num: "25",
         meaning: "Traditional Omani slow-cooked lamb or chicken with fragrant rice, prepared in a tandoor underground oven.",
         meaningAr: "",
         isReady: true,
         category: "food",
         secretWord: "OMANI MANDI",
         loreText: "Slow-cooked meat and rice in an underground oven... the aroma fills every Omani home on Friday. Traditional Omani slow-cooked lamb or chicken with fragrant rice, prepared in a tandoor underground oven.",
         vocabTargets: ["chicken", "fragrant", "prepared", "tandoor"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Arabic name for Bahla Fort?", opts: ["Qasr Bahla", "Husn Bahla", "Qalaa Bahla", "Bait Bahla"], correct: 0 },
           { q: "How many rooms are estimated inside Bahla Fort?", opts: ["Over 100", "50", "25", "200"], correct: 0 },
           { q: "What defensive structure surrounds Bahla town?", opts: ["Wall with 7 gates", "River", "Mountain", "Forest"], correct: 0 },
           { q: "Bahla Fort is one of how many UNESCO sites in Oman?", opts: ["5", "3", "7", "10"], correct: 0 },
           { q: "What animal is commonly depicted in Bahla pottery?", opts: ["Camel", "Horse", "Bird", "Fish"], correct: 0 }
         ]
       },
    26: { id: 26, name: "Frankincense Land", nameAr: "", emoji: "🌿", num: "26",
         meaning: "Oman is the land of frankincense. The aromatic resin burned in homes and mosques for thousands of years.",
         meaningAr: "",
         isReady: true,
         category: "trade",
         secretWord: "FRANKINCENSE LAND",
         loreText: "The aromatic resin from the Boswellia tree... once worth more than gold on the ancient trade routes. Oman is the land of frankincense. The aromatic resin burned in homes and mosques for thousands of years.",
         vocabTargets: ["frankincense", "aromatic", "mosques", "thousands"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "The wall around Bahla is how many kilometers long?", opts: ["13 km", "5 km", "20 km", "8 km"], correct: 0 },
           { q: "What is the main entrance of Bahla Fort called?", opts: ["Bab al-Fath", "Bab al-Salam", "Bab al-Rahma", "Bab al-Karim"], correct: 0 },
           { q: "Bahla Fort overlooks which wadi?", opts: ["Wadi Bahla", "Wadi Shab", "Wadi Bani Khalid", "Wadi Dawkah"], correct: 0 },
           { q: "What type of roof does Bahla Fort have?", opts: ["Palm frond", "Tile", "Metal", "Concrete"], correct: 0 },
           { q: "How many towers does Bahla Fort have?", opts: ["4", "2", "6", "8"], correct: 0 }
         ]
       },
    27: { id: 27, name: "Wahiba Sands", nameAr: "", emoji: "🏜️", num: "27",
         meaning: "The stunning desert of Oman with towering golden dunes, where Bedouin tribes have lived for centuries.",
         meaningAr: "",
         isReady: true,
         category: "nature",
         secretWord: "WAHIBA SANDS",
         loreText: "Golden sand dunes stretching to the horizon... home to the Bedouin and their camels. The stunning desert of Oman with towering golden dunes, where Bedouin tribes have lived for centuries.",
         vocabTargets: ["stunning", "towering", "centuries"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the local name for the Bahla Fort wall?", opts: ["Sur", "Hisan", "Qasr", "Bait"], correct: 0 },
           { q: "Bahla was the capital of which historical region?", opts: ["Nizwa region", "Muscat region", "Salalah region", "Sohar region"], correct: 0 },
           { q: "What defensive feature is unique to Bahla Fort?", opts: ["False doors", "Cannons", "Watchtowers", "Drawbridges"], correct: 0 },
           { q: "What material is used for the fort's foundation?", opts: ["Stone", "Wood", "Iron", "Sand"], correct: 0 },
           { q: "How many floors does the main tower have?", opts: ["5", "3", "7", "2"], correct: 0 }
         ]
       },
    28: { id: 28, name: "Salalah Khareef", nameAr: "", emoji: "🏙️", num: "28",
         meaning: "The jewel of southern Oman, transformed by the monsoon into a lush green paradise with waterfalls and coconut groves.",
         meaningAr: "",
         isReady: true,
         category: "cities",
         secretWord: "SALALAH KHAREEF",
         loreText: "Green mountains, misty waterfalls, and coconut trees... the monsoon transforms this southern city. The jewel of southern Oman, transformed by the monsoon into a lush green paradise with waterfalls and coconut groves.",
         vocabTargets: ["southern", "transformed", "monsoon", "paradise"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the purpose of the small openings in walls?", opts: ["Archer positions", "Windows", "Ventilation", "Decoration"], correct: 0 },
           { q: "Bahla Fort's restoration took how many years?", opts: ["12 years", "5 years", "20 years", "3 years"], correct: 0 },
           { q: "What is the traditional Omani weapon stored in forts?", opts: ["Khanjar", "Sword", "Spear", "Bow"], correct: 0 },
           { q: "What color is the Omani flag?", opts: ["Red, white, green", "Blue, yellow, red", "Green, black, white", "Red, black, white"], correct: 0 },
           { q: "What does the khanjar symbolize?", opts: ["Manhood and honor", "Wealth", "Peace", "War"], correct: 0 }
         ]
       },
    29: { id: 29, name: "Omani Dress", nameAr: "", emoji: "🗡️", num: "29",
         meaning: "The traditional white ankle-length robe, symbol of Omani identity and elegance, worn with pride across the Sultanate.",
         meaningAr: "",
         isReady: true,
         category: "culture",
         secretWord: "OMANI DRESS",
         loreText: "The long white robe worn by Omani men... often perfumed with frankincense and topped with a colorful turban. The traditional white ankle-length robe, symbol of Omani identity and elegance, worn with pride across the Sultanate.",
         vocabTargets: ["traditional", "identity", "elegance"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the capital of Oman?", opts: ["Muscat", "Salalah", "Nizwa", "Sohar"], correct: 0 },
           { q: "When did Oman gain independence?", opts: ["1970", "1960", "1980", "1950"], correct: 0 },
           { q: "Who was the Sultan who modernized Oman?", opts: ["Qaboos bin Said", "Said bin Taimur", "Faisal bin Turki", "Nadir bin Faisal"], correct: 0 },
           { q: "What is the currency of Oman?", opts: ["Rial", "Dinar", "Dirham", "Rupee"], correct: 0 },
           { q: "What is the official language of Oman?", opts: ["Arabic", "English", "French", "Urdu"], correct: 0 }
         ]
       },
    30: { id: 30, name: "Nizwa Fort", nameAr: "", emoji: "🏰", num: "30",
         meaning: "One of Oman's most visited landmarks with a huge round tower. Famous for its souq, dates, and silver jewelry.",
         meaningAr: "",
         isReady: true,
         category: "landmarks",
         secretWord: "NIZWA FORT",
         loreText: "The city of silver, dates, and a massive round tower... once the capital of Oman. One of Oman's most visited landmarks with a huge round tower. Famous for its souq, dates, and silver jewelry.",
         vocabTargets: ["visited", "landmarks", "jewelry"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the population of Oman approximately?", opts: ["5 million", "10 million", "2 million", "8 million"], correct: 0 },
           { q: "What sea borders Oman?", opts: ["Arabian Sea", "Red Sea", "Mediterranean", "Caspian"], correct: 0 },
           { q: "What is the highest mountain in Oman?", opts: ["Jebel Shams", "Jebel Akhdar", "Al Hajar", "Jebel Qahwan"], correct: 0 },
           { q: "What is the largest desert in Oman?", opts: ["Rub al Khali", "Wahiba Sands", "Nafud", "Dahna"], correct: 0 },
           { q: "What is Oman's national animal?", opts: ["Arabian Oryx", "Camel", "Falcon", "Horse"], correct: 0 }
         ]
       },
    31: { id: 31, name: "Muscat City", nameAr: "", emoji: "🏙️", num: "31",
         meaning: "The capital of Oman, a beautiful city nestled between mountains and the Gulf of Oman, blending tradition and modernity.",
         meaningAr: "",
         isReady: true,
         category: "cities",
         secretWord: "MUSCAT CITY",
         loreText: "The capital where mountains meet the sea... home to the Sultan's palace and the Royal Opera House. The capital of Oman, a beautiful city nestled between mountains and the Gulf of Oman, blending tradition and modernity.",
         vocabTargets: ["capital", "beautiful", "nestled", "between"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the traditional Omani coffee called?", opts: ["Kahwa", "Qahwa", "Gahwa", "Kawa"], correct: 0 },
           { q: "What spice is essential in Omani coffee?", opts: ["Cardamom", "Cinnamon", "Saffron", "Cloves"], correct: 0 },
           { q: "What is the traditional Omani dagger called?", opts: ["Khanjar", "Jambiya", "Kard", "Peshkabz"], correct: 0 },
           { q: "What is the Omani traditional dress for men?", opts: ["Dishdasha", "Thobe", "Kandura", "Jalabiya"], correct: 0 },
           { q: "What is the Omani traditional cap called?", opts: ["Kumma", "Taqiya", "Imama", "Ghutra"], correct: 0 }
         ]
       },
    32: { id: 32, name: "Shuwa Feast", nameAr: "", emoji: "🍲", num: "32",
         meaning: "Oman's national dish. Lamb or goat marinated in spices, wrapped in leaves, and slow-cooked in an underground oven for 24 hours.",
         meaningAr: "",
         isReady: true,
         category: "food",
         secretWord: "SHUWA FEAST",
         loreText: "Meat wrapped in banana leaves and buried in hot sand for a day... the national dish of Oman. Oman's national dish. Lamb or goat marinated in spices, wrapped in leaves, and slow-cooked in an underground oven for 24 hours.",
         vocabTargets: ["national", "marinated", "wrapped", "underground"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Omani turban called?", opts: ["Mussar", "Imama", "Shumagh", "Ghutra"], correct: 0 },
           { q: "What is the traditional Omani women's mask?", opts: ["Burqa", "Niqab", "Hijab", "Battoulah"], correct: 0 },
           { q: "What is the main ingredient in Omani halwa?", opts: ["Starch", "Flour", "Rice", "Corn"], correct: 0 },
           { q: "What nut is commonly used in Omani halwa?", opts: ["Cashew", "Almond", "Pistachio", "Walnut"], correct: 0 },
           { q: "What is the traditional Omani bread called?", opts: ["Khubz Ragag", "Pita", "Naan", "Lavash"], correct: 0 }
         ]
       },
    33: { id: 33, name: "Omani Majboos", nameAr: "", emoji: "🍲", num: "33",
         meaning: "Fragrant basmati rice cooked in spiced meat broth, served with chicken, lamb, or fish and topped with fried onions and nuts.",
         meaningAr: "",
         isReady: true,
         category: "food",
         secretWord: "OMANI MAJBOOS",
         loreText: "Rice cooked in meat broth with Omani spices... the Gulf's favorite comfort food. Fragrant basmati rice cooked in spiced meat broth, served with chicken, lamb, or fish and topped with fried onions and nuts.",
         vocabTargets: ["basmati", "chicken"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Omani national dish?", opts: ["Shuwa", "Majboos", "Mandi", "Machboos"], correct: 0 },
           { q: "How is shuwa traditionally cooked?", opts: ["Underground oven", "Grill", "Stove", "Clay pot"], correct: 0 },
           { q: "What meat is used in traditional shuwa?", opts: ["Lamb or goat", "Chicken", "Beef", "Camel"], correct: 0 },
           { q: "What leaves are used to wrap shuwa?", opts: ["Banana leaves", "Palm leaves", "Fig leaves", "Grape leaves"], correct: 0 },
           { q: "What is the Omani rice dish called?", opts: ["Majboos", "Biryani", "Pilaf", "Kabsa"], correct: 0 }
         ]
       },
    34: { id: 34, name: "Mishkak Street", nameAr: "", emoji: "🍲", num: "34",
         meaning: "Popular Omani street food. Marinated beef, chicken, or lamb cubes grilled on skewers and served with tamarind sauce.",
         meaningAr: "",
         isReady: true,
         category: "food",
         secretWord: "MISHKAK STREET",
         loreText: "Skewers of marinated meat grilled over charcoal... the ultimate Omani street food. Popular Omani street food. Marinated beef, chicken, or lamb cubes grilled on skewers and served with tamarind sauce.",
         vocabTargets: ["chicken", "grilled", "skewers", "tamarind"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What fish is used in Mashuai?", opts: ["Kingfish", "Tuna", "Sardine", "Shark"], correct: 0 },
           { q: "What is the Omani grilled fish dish?", opts: ["Mashuai", "Samak", "Sayad", "Hout"], correct: 0 },
           { q: "What is the traditional Omani sweet dumpling?", opts: ["Luqaimat", "Baklava", "Kunafa", "Basbousa"], correct: 0 },
           { q: "What syrup is poured on luqaimat?", opts: ["Date syrup", "Honey", "Sugar", "Maple"], correct: 0 },
           { q: "What is the Omani meat skewer called?", opts: ["Mishkak", "Kebab", "Tikka", "Shish"], correct: 0 }
         ]
       },
    35: { id: 35, name: "Omani Halwa", nameAr: "", emoji: "🍲", num: "35",
         meaning: "Traditional Omani sweet made with starch, sugar, nuts, and rose water. Served in a communal bowl with small spoons.",
         meaningAr: "",
         isReady: true,
         category: "food",
         secretWord: "OMANI HALWA",
         loreText: "A sticky, sweet, nutty delicacy served with Omani coffee... the dessert of celebrations. Traditional Omani sweet made with starch, sugar, nuts, and rose water. Served in a communal bowl with small spoons.",
         vocabTargets: ["communal"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What sauce is served with mishkak?", opts: ["Tamarind", "Tahini", "Yogurt", "Chili"], correct: 0 },
           { q: "What is the Omani wheat porridge?", opts: ["Harees", "Madrouba", "Jareesh", "Freekeh"], correct: 0 },
           { q: "When is harees traditionally eaten?", opts: ["Ramadan", "Eid", "Wedding", "Friday"], correct: 0 },
           { q: "What is the Omani rice porridge called?", opts: ["Madrouba", "Harees", "Jareesh", "Shorba"], correct: 0 },
           { q: "What spice flavors madrouba?", opts: ["Cardamom", "Cumin", "Turmeric", "Cinnamon"], correct: 0 }
         ]
       },
    36: { id: 36, name: "Omani Kahwa", nameAr: "", emoji: "🗡️", num: "36",
         meaning: "Traditional Omani coffee brewed with cardamom and saffron. Served with dates as a symbol of hospitality and welcome.",
         meaningAr: "",
         isReady: true,
         category: "culture",
         secretWord: "OMANI KAHWA",
         loreText: "Bitter coffee flavored with cardamom and rose water... the essence of Omani hospitality. Traditional Omani coffee brewed with cardamom and saffron. Served with dates as a symbol of hospitality and welcome.",
         vocabTargets: ["cardamom", "saffron", "hospitality", "welcome"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Omani date flatbread?", opts: ["Khoubz Mardhouf", "Khubz Ragag", "Ragag", "Malawah"], correct: 0 },
           { q: "What cheese is in Khaliat Nahal?", opts: ["Cream cheese", "Feta", "Cheddar", "Mozzarella"], correct: 0 },
           { q: "When is Khaliat Nahal traditionally made?", opts: ["Ramadan", "Eid", "Wedding", "National Day"], correct: 0 },
           { q: "What is the Omani honeycomb bread?", opts: ["Khaliat Nahal", "Luqaimat", "Kunafa", "Baklava"], correct: 0 },
           { q: "What is the main ingredient in Omani halwa?", opts: ["Sugar", "Honey", "Dates", "Milk"], correct: 0 }
         ]
       },
    37: { id: 37, name: "Sur City", nameAr: "", emoji: "🏙️", num: "37",
         meaning: "Historic port city famous for traditional dhow building, turtle nesting beaches, and maritime heritage.",
         meaningAr: "",
         isReady: true,
         category: "cities",
         secretWord: "SUR CITY",
         loreText: "The city of dhow builders and sailors... where wooden ships are still crafted by hand. Historic port city famous for traditional dhow building, turtle nesting beaches, and maritime heritage.",
         vocabTargets: ["traditional", "building", "nesting", "beaches"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What gives Omani halwa its color?", opts: ["Saffron", "Turmeric", "Beetroot", "Paprika"], correct: 0 },
           { q: "What is the traditional Omani incense?", opts: ["Frankincense", "Myrrh", "Sandalwood", "Agarwood"], correct: 0 },
           { q: "Where does frankincense come from in Oman?", opts: ["Dhofar", "Muscat", "Nizwa", "Sohar"], correct: 0 },
           { q: "What tree produces frankincense?", opts: ["Boswellia sacra", "Acacia", "Palm", "Olive"], correct: 0 },
           { q: "What was frankincense worth in ancient times?", opts: ["More than gold", "Same as silver", "Less than copper", "Worthless"], correct: 0 }
         ]
       },
    38: { id: 38, name: "Sohar Port", nameAr: "", emoji: "🏙️", num: "38",
         meaning: "Ancient port city, legendary home of Sinbad. Historic center of copper trade and Omani maritime expansion.",
         meaningAr: "",
         isReady: true,
         category: "cities",
         secretWord: "SOHAR PORT",
         loreText: "The legendary birthplace of Sinbad the Sailor... an ancient port of copper and trade. Ancient port city, legendary home of Sinbad. Historic center of copper trade and Omani maritime expansion.",
         vocabTargets: ["legendary", "maritime", "expansion"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the ancient name for Oman?", opts: ["Magan", "Sheba", "Hadhramaut", "Dilmun"], correct: 0 },
           { q: "What did ancient Oman export?", opts: ["Copper", "Iron", "Gold", "Silk"], correct: 0 },
           { q: "What civilization traded with ancient Oman?", opts: ["Mesopotamia", "Rome", "China", "Egypt"], correct: 0 },
           { q: "What is the Omani traditional boat called?", opts: ["Dhow", "Felucca", "Junk", "Galley"], correct: 0 },
           { q: "What is the famous Omani port city?", opts: ["Sohar", "Muscat", "Salalah", "Sur"], correct: 0 }
         ]
       },
    39: { id: 39, name: "Muttrah Souq", nameAr: "", emoji: "🌿", num: "39",
         meaning: "One of the oldest marketplaces in the Arab world. A labyrinth of shops selling spices, textiles, silver, and frankincense.",
         meaningAr: "",
         isReady: true,
         category: "trade",
         secretWord: "MUTTRAH SOUQ",
         loreText: "The old souq by the harbor where frankincense, spices, and silver fill the air. One of the oldest marketplaces in the Arab world. A labyrinth of shops selling spices, textiles, silver, and frankincense.",
         vocabTargets: ["marketplaces", "labyrinth", "selling", "textiles"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "Who was the famous Omani sailor?", opts: ["Ahmad bin Majid", "Sinbad", "Vasco da Gama", "Marco Polo"], correct: 0 },
           { q: "What did Ahmad bin Majid write about?", opts: ["Navigation", "Poetry", "Medicine", "Astronomy"], correct: 0 },
           { q: "What is the Omani version of Sinbad?", opts: ["Sailor of the East", "Pirate", "Merchant", "Explorer"], correct: 0 },
           { q: "What sea did Omani sailors cross?", opts: ["Indian Ocean", "Atlantic", "Pacific", "Mediterranean"], correct: 0 },
           { q: "What African city did Oman rule?", opts: ["Zanzibar", "Mombasa", "Dar es Salaam", "Kilwa"], correct: 0 }
         ]
       },
    40: { id: 40, name: "Empty Quarter", nameAr: "", emoji: "🏜️", num: "40",
         meaning: "The Rub al Khali, the world's largest sand desert. Vast, mysterious, and largely unexplored wilderness.",
         meaningAr: "",
         isReady: true,
         category: "nature",
         secretWord: "EMPTY QUARTER",
         loreText: "The Empty Quarter... the largest sand desert on Earth, touching Oman's borders. The Rub al Khali, the world's largest sand desert. Vast, mysterious, and largely unexplored wilderness.",
         vocabTargets: ["largest", "mysterious", "largely", "unexplored"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "When did Oman rule Zanzibar?", opts: ["19th century", "15th century", "17th century", "20th century"], correct: 0 },
           { q: "What is the Omani palace in Zanzibar?", opts: ["House of Wonders", "Alhambra", "Topkapi", "Forbidden City"], correct: 0 },
           { q: "What is the main export of ancient Sohar?", opts: ["Copper", "Silk", "Spices", "Pearls"], correct: 0 },
           { q: "What is the Omani pearl diving tradition?", opts: ["Ghaws", "Taqa", "Sima", "Ramy"], correct: 0 },
           { q: "What is the traditional Omani pearl market?", opts: ["Muttrah Souq", "Nizwa Souq", "Salalah Souq", "Sohar Souq"], correct: 0 }
         ]
       },
    41: { id: 41, name: "Jebel Shams", nameAr: "", emoji: "🏜️", num: "41",
         meaning: "Oman's highest mountain at 3,009 meters. Home to the dramatic Wadi Ghul canyon, known as the Grand Canyon of Arabia.",
         meaningAr: "",
         isReady: true,
         category: "nature",
         secretWord: "JEBEL SHAMS",
         loreText: "The Mountain of the Sun... Oman's highest peak with a canyon called the Grand Canyon of Arabia. Oman's highest mountain at 3,009 meters. Home to the dramatic Wadi Ghul canyon, known as the Grand Canyon of Arabia.",
         vocabTargets: ["highest", "mountain", "dramatic"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Omani traditional dance?", opts: ["Razha", "Dabke", "Belly dance", "Sword dance"], correct: 0 },
           { q: "What weapon is used in Razha dance?", opts: ["Sword", "Stick", "Gun", "Shield"], correct: 0 },
           { q: "What is the Omani traditional music?", opts: ["Al-Mawlid", "Oud", "Mizmar", "Rababa"], correct: 0 },
           { q: "What instrument is used in Omani music?", opts: ["Rahmani", "Oud", "Qanun", "Ney"], correct: 0 },
           { q: "What is the Omani traditional poetry?", opts: ["Al-Taghrooda", "Ghazal", "Qasida", "Muwashshah"], correct: 0 }
         ]
       },
    42: { id: 42, name: "Jebel Akhdar", nameAr: "", emoji: "🏜️", num: "42",
         meaning: "The Green Mountain, famous for rose water, pomegranate, apricot, and walnut terraces. A cool retreat from the desert heat.",
         meaningAr: "",
         isReady: true,
         category: "nature",
         secretWord: "JEBEL AKHDAR",
         loreText: "The Green Mountain... where roses, pomegranates, and walnuts grow in terraced gardens. The Green Mountain, famous for rose water, pomegranate, apricot, and walnut terraces. A cool retreat from the desert heat.",
         vocabTargets: ["pomegranate", "apricot", "terraces", "retreat"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Omani camel race festival?", opts: ["Al-Maidan", "Al-Janad", "Al-Seeb", "Al-Khoud"], correct: 0 },
           { q: "What is the Omani horse breed?", opts: ["Arabian", "Thoroughbred", "Mustang", "Friesian"], correct: 0 },
           { q: "What is the Omani traditional sport?", opts: ["Horse racing", "Camel racing", "Falconry", "Dhow racing"], correct: 0 },
           { q: "What is the Omani falcon called?", opts: ["Saker", "Peregrine", "Gyrfalcon", "Kestrel"], correct: 0 },
           { q: "What is the Omani traditional tent?", opts: ["Bait al-Shaar", "Khaima", "Bayt", "Dar"], correct: 0 }
         ]
       },
    43: { id: 43, name: "Wadi Shab", nameAr: "", emoji: "🏜️", num: "43",
         meaning: "Stunning wadi with emerald pools, waterfalls, and a hidden cave. One of Oman's most beautiful natural attractions.",
         meaningAr: "",
         isReady: true,
         category: "nature",
         secretWord: "WADI SHAB",
         loreText: "A turquoise river hidden between canyon walls... leading to a secret waterfall and cave. Stunning wadi with emerald pools, waterfalls, and a hidden cave. One of Oman's most beautiful natural attractions.",
         vocabTargets: ["emerald", "waterfalls", "beautiful", "natural"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What material is the Omani tent made of?", opts: ["Goat hair", "Cotton", "Silk", "Wool"], correct: 0 },
           { q: "What is the Omani coffee pot called?", opts: ["Dallah", "Ibrik", "Cezve", "Jebena"], correct: 0 },
           { q: "What is the Omani date variety?", opts: ["Khalas", "Medjool", "Deglet Noor", "Barhi"], correct: 0 },
           { q: "What is the best date region in Oman?", opts: ["Nizwa", "Muscat", "Salalah", "Sohar"], correct: 0 },
           { q: "What is the Omani date harvest season?", opts: ["July-August", "December-January", "March-April", "October-November"], correct: 0 }
         ]
       },
    44: { id: 44, name: "Wadi Bani Khalid", nameAr: "", emoji: "🏜️", num: "44",
         meaning: "Beautiful wadi with year-round flowing water, large natural pools, and lush palm groves in the Sharqiyah region.",
         meaningAr: "",
         isReady: true,
         category: "nature",
         secretWord: "WADI BANI KHALID",
         loreText: "A permanent oasis with clear pools and palm trees... a desert paradise you can swim in. Beautiful wadi with year-round flowing water, large natural pools, and lush palm groves in the Sharqiyah region.",
         vocabTargets: ["flowing", "natural"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Omani traditional date dish?", opts: ["Asida", "Halwa", "Luqaimat", "Kunafa"], correct: 0 },
           { q: "What is the Omani rose water used for?", opts: ["Perfume and cooking", "Medicine", "Cleaning", "Painting"], correct: 0 },
           { q: "What is the Omani rose water region?", opts: ["Jebel Akhdar", "Salalah", "Nizwa", "Muscat"], correct: 0 },
           { q: "What is the Omani pomegranate region?", opts: ["Jebel Akhdar", "Dhofar", "Batinah", "Sharqiyah"], correct: 0 },
           { q: "What is the Omani apricot called?", opts: ["Mishmish", "Khubz", "Tamar", "Rutab"], correct: 0 }
         ]
       },
    45: { id: 45, name: "Ras Al Jinz", nameAr: "", emoji: "🏜️", num: "45",
         meaning: "One of the most important turtle nesting sites in the world. Green turtles return here every year to lay eggs.",
         meaningAr: "",
         isReady: true,
         category: "nature",
         secretWord: "RAS AL JINZ",
         loreText: "Where giant turtles crawl ashore at night to lay their eggs... a beach of ancient rituals. One of the most important turtle nesting sites in the world. Green turtles return here every year to lay eggs.",
         vocabTargets: ["important", "nesting", "turtles"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Omani walnut region?", opts: ["Jebel Akhdar", "Salalah", "Nizwa", "Sohar"], correct: 0 },
           { q: "What is the Omani honey region?", opts: ["Wadi Doan", "Jebel Akhdar", "Salalah", "Nizwa"], correct: 0 },
           { q: "What is the Omani traditional medicine?", opts: ["Herbal remedies", "Acupuncture", "Homeopathy", "Ayurveda"], correct: 0 },
           { q: "What is the Omani traditional healer?", opts: ["Hakim", "Tabib", "Muallim", "Sheikh"], correct: 0 },
           { q: "What is the Omani traditional birth ceremony?", opts: ["Aqiqah", "Khatna", "Zaffa", "Mahr"], correct: 0 }
         ]
       },
    46: { id: 46, name: "Daymaniyat Islands", nameAr: "", emoji: "🏜️", num: "46",
         meaning: "Protected marine nature reserve with pristine coral reefs, diverse marine life, and nesting sea turtles.",
         meaningAr: "",
         isReady: true,
         category: "nature",
         secretWord: "DAYMANIYAT ISLANDS",
         loreText: "Nine islands of coral reefs and sea turtles... a diver's paradise in the Gulf of Oman. Protected marine nature reserve with pristine coral reefs, diverse marine life, and nesting sea turtles.",
         vocabTargets: ["reserve", "pristine", "diverse", "nesting"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Omani wedding tradition?", opts: ["Henna night", "Zaffa", "Mahr", "Walima"], correct: 0 },
           { q: "What is the Omani traditional henna design?", opts: ["Geometric patterns", "Floral", "Animal", "Abstract"], correct: 0 },
           { q: "What is the Omani Eid celebration?", opts: ["Eid al-Fitr", "Eid al-Adha", "Mawlid", "Ashura"], correct: 0 },
           { q: "What is the Omani National Day?", opts: ["November 18", "July 23", "December 12", "January 1"], correct: 0 },
           { q: "What does National Day celebrate?", opts: ["Sultan Qaboos birthday", "Independence", "Unification", "Victory"], correct: 0 }
         ]
       },
    47: { id: 47, name: "Al Hoota Cave", nameAr: "", emoji: "🏜️", num: "47",
         meaning: "Spectacular cave system with underground lakes, stalactites, and rare blind fish. Located in Jebel Akhdar.",
         meaningAr: "",
         isReady: true,
         category: "nature",
         secretWord: "AL HOOTA CAVE",
         loreText: "An underground lake inside a mountain... where blind fish swim in crystal waters. Spectacular cave system with underground lakes, stalactites, and rare blind fish. Located in Jebel Akhdar.",
         vocabTargets: ["underground", "stalactites"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Omani Renaissance Day?", opts: ["July 23", "November 18", "December 12", "January 1"], correct: 0 },
           { q: "What is the Omani flag color order?", opts: ["White, red, green", "Red, white, green", "Green, white, red", "Red, green, white"], correct: 0 },
           { q: "What is on the Omani flag?", opts: ["Coat of arms", "Crescent", "Star", "Sword"], correct: 0 },
           { q: "What is the Omani national anthem?", opts: ["Nashid as-Salaam", "Nashid al-Watani", "Nashid al-Istiqlal", "Nashid al-Umma"], correct: 0 },
           { q: "What is the Omani motto?", opts: ["God, Country, Sultan", "Unity, Faith, Discipline", "Peace, Progress, Prosperity", "Freedom, Justice, Equality"], correct: 0 }
         ]
       },
    48: { id: 48, name: "Bimmah Sinkhole", nameAr: "", emoji: "🏜️", num: "48",
         meaning: "Stunning limestone sinkhole with turquoise water near the coast. Local legend says it was created by a meteorite.",
         meaningAr: "",
         isReady: true,
         category: "nature",
         secretWord: "BIMMAH SINKHOLE",
         loreText: "A turquoise sinkhole created by a meteor... or so the legend says. A natural swimming pool. Stunning limestone sinkhole with turquoise water near the coast. Local legend says it was created by a meteorite.",
         vocabTargets: ["limestone", "sinkhole", "turquoise", "created"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "In which governorate is Bahla Fort located?", opts: ["Ad Dakhiliyah", "Muscat", "Dhofar", "Al Batinah"], correct: 0 },
           { q: "When was Bahla Fort added to UNESCO World Heritage list?", opts: ["1987", "1990", "2000", "2006"], correct: 0 },
           { q: "What material is Bahla Fort primarily built from?", opts: ["Mud brick", "Marble", "Granite", "Concrete"], correct: 0 },
           { q: "Which tribe built Bahla Fort?", opts: ["Bani Nebhan", "Bani Qitab", "Bani Hattab", "Bani Riyam"], correct: 0 },
           { q: "How many mosques are inside Bahla Fort?", opts: ["3", "1", "5", "7"], correct: 0 }
         ]
       },
    49: { id: 49, name: "Musandam Peninsula", nameAr: "", emoji: "🏜️", num: "49",
         meaning: "Dramatic peninsula with stunning fjords, crystal waters, and mountain cliffs. Known as the Norway of Arabia.",
         meaningAr: "",
         isReady: true,
         category: "nature",
         secretWord: "MUSANDAM PENINSULA",
         loreText: "The Norway of Arabia... fjords, dolphins, and mountains rising straight from the sea. Dramatic peninsula with stunning fjords, crystal waters, and mountain cliffs. Known as the Norway of Arabia.",
         vocabTargets: ["peninsula", "stunning", "crystal", "mountain"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the main defensive feature of Bahla Fort?", opts: ["Round tower", "Moat", "Drawbridge", "Catapult"], correct: 0 },
           { q: "Bahla Fort is surrounded by what type of wall?", opts: ["Mud brick wall", "Stone wall", "Iron fence", "Wooden palisade"], correct: 0 },
           { q: "What century was Bahla Fort originally built?", opts: ["13th", "15th", "17th", "19th"], correct: 0 },
           { q: "Bahla is known for what traditional craft?", opts: ["Pottery", "Weaving", "Metalwork", "Glassblowing"], correct: 0 },
           { q: "What color are the walls of Bahla Fort?", opts: ["Brown", "White", "Blue", "Red"], correct: 0 }
         ]
       },
    50: { id: 50, name: "Duqm City", nameAr: "", emoji: "🏙️", num: "50",
         meaning: "Rapidly developing city and special economic zone on the central coast. Home to Oman's largest port and industrial projects.",
         meaningAr: "",
         isReady: true,
         category: "cities",
         secretWord: "DUQM CITY",
         loreText: "A new city rising from the desert sands... Oman's gateway to the future with a massive port and refinery. Rapidly developing city and special economic zone on the central coast. Home to Oman's largest port and industrial projects.",
         vocabTargets: ["developing", "special", "economic", "central"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "How tall is the main tower of Bahla Fort?", opts: ["40 meters", "20 meters", "60 meters", "80 meters"], correct: 0 },
           { q: "What is the shape of Bahla Fort's main tower?", opts: ["Circular", "Square", "Triangular", "Hexagonal"], correct: 0 },
           { q: "Bahla Fort was restored in which decade?", opts: ["1990s", "1970s", "2000s", "1950s"], correct: 0 },
           { q: "What type of trees surround Bahla Fort?", opts: ["Date palms", "Olive trees", "Pine trees", "Coconut trees"], correct: 0 },
           { q: "Bahla Fort is the only fort in Oman with what feature?", opts: ["Underground passages", "Swimming pool", "Elevator", "Air conditioning"], correct: 0 }
         ]
       },
    51: { id: 51, name: "Al Baleed", nameAr: "", emoji: "💧", num: "51",
         meaning: "Archaeological site of ancient port city in Salalah. Key center of the frankincense trade for over a thousand years.",
         meaningAr: "",
         isReady: true,
         category: "heritage",
         secretWord: "AL BALEED",
         loreText: "The ancient port of frankincense... where ships from China and India once docked. Archaeological site of ancient port city in Salalah. Key center of the frankincense trade for over a thousand years.",
         vocabTargets: ["ancient", "frankincense", "thousand"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Arabic name for Bahla Fort?", opts: ["Qasr Bahla", "Husn Bahla", "Qalaa Bahla", "Bait Bahla"], correct: 0 },
           { q: "How many rooms are estimated inside Bahla Fort?", opts: ["Over 100", "50", "25", "200"], correct: 0 },
           { q: "What defensive structure surrounds Bahla town?", opts: ["Wall with 7 gates", "River", "Mountain", "Forest"], correct: 0 },
           { q: "Bahla Fort is one of how many UNESCO sites in Oman?", opts: ["5", "3", "7", "10"], correct: 0 },
           { q: "What animal is commonly depicted in Bahla pottery?", opts: ["Camel", "Horse", "Bird", "Fish"], correct: 0 }
         ]
       },
    52: { id: 52, name: "Khor Rori", nameAr: "", emoji: "💧", num: "52",
         meaning: "Ancient port of Sumhuram, a major frankincense trading hub. Linked to the legendary Queen of Sheba.",
         meaningAr: "",
         isReady: true,
         category: "heritage",
         secretWord: "KHOR RORI",
         loreText: "A ruined port city where the Queen of Sheba once stored her treasures... now an archaeological park. Ancient port of Sumhuram, a major frankincense trading hub. Linked to the legendary Queen of Sheba.",
         vocabTargets: ["frankincense", "trading", "legendary"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "The wall around Bahla is how many kilometers long?", opts: ["13 km", "5 km", "20 km", "8 km"], correct: 0 },
           { q: "What is the main entrance of Bahla Fort called?", opts: ["Bab al-Fath", "Bab al-Salam", "Bab al-Rahma", "Bab al-Karim"], correct: 0 },
           { q: "Bahla Fort overlooks which wadi?", opts: ["Wadi Bahla", "Wadi Shab", "Wadi Bani Khalid", "Wadi Dawkah"], correct: 0 },
           { q: "What type of roof does Bahla Fort have?", opts: ["Palm frond", "Tile", "Metal", "Concrete"], correct: 0 },
           { q: "How many towers does Bahla Fort have?", opts: ["4", "2", "6", "8"], correct: 0 }
         ]
       },
    53: { id: 53, name: "Ancient Qalhat", nameAr: "", emoji: "💧", num: "53",
         meaning: "Ancient port city and UNESCO site. Once a thriving capital of the Kingdom of Hormuz, visited by Marco Polo.",
         meaningAr: "",
         isReady: true,
         category: "heritage",
         secretWord: "ANCIENT QALHAT",
         loreText: "A forgotten city on the coast... once ruled by a queen and visited by Marco Polo. Ancient port city and UNESCO site. Once a thriving capital of the Kingdom of Hormuz, visited by Marco Polo.",
         vocabTargets: ["thriving", "capital", "visited"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the local name for the Bahla Fort wall?", opts: ["Sur", "Hisan", "Qasr", "Bait"], correct: 0 },
           { q: "Bahla was the capital of which historical region?", opts: ["Nizwa region", "Muscat region", "Salalah region", "Sohar region"], correct: 0 },
           { q: "What defensive feature is unique to Bahla Fort?", opts: ["False doors", "Cannons", "Watchtowers", "Drawbridges"], correct: 0 },
           { q: "What material is used for the fort's foundation?", opts: ["Stone", "Wood", "Iron", "Sand"], correct: 0 },
           { q: "How many floors does the main tower have?", opts: ["5", "3", "7", "2"], correct: 0 }
         ]
       },
    54: { id: 54, name: "Wadi Dawkah", nameAr: "", emoji: "💧", num: "54",
         meaning: "UNESCO site with natural groves of Boswellia sacra trees. The heart of Oman's frankincense production.",
         meaningAr: "",
         isReady: true,
         category: "heritage",
         secretWord: "WADI DAWKAH",
         loreText: "A valley of frankincense trees... where the precious resin is still harvested as it was 3,000 years ago. UNESCO site with natural groves of Boswellia sacra trees. The heart of Oman's frankincense production.",
         vocabTargets: ["natural", "frankincense", "production"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the purpose of the small openings in walls?", opts: ["Archer positions", "Windows", "Ventilation", "Decoration"], correct: 0 },
           { q: "Bahla Fort's restoration took how many years?", opts: ["12 years", "5 years", "20 years", "3 years"], correct: 0 },
           { q: "What is the traditional Omani weapon stored in forts?", opts: ["Khanjar", "Sword", "Spear", "Bow"], correct: 0 },
           { q: "What color is the Omani flag?", opts: ["Red, white, green", "Blue, yellow, red", "Green, black, white", "Red, black, white"], correct: 0 },
           { q: "What does the khanjar symbolize?", opts: ["Manhood and honor", "Wealth", "Peace", "War"], correct: 0 }
         ]
       },
    55: { id: 55, name: "Al Hamra Village", nameAr: "", emoji: "💧", num: "55",
         meaning: "400-year-old mud-brick village with traditional Omani architecture. One of the best-preserved ancient settlements.",
         meaningAr: "",
         isReady: true,
         category: "heritage",
         secretWord: "AL HAMRA VILLAGE",
         loreText: "A village of mud houses abandoned to time... where ghosts of the past whisper in the wind. 400-year-old mud-brick village with traditional Omani architecture. One of the best-preserved ancient settlements.",
         vocabTargets: ["village", "traditional", "architecture", "preserved"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the capital of Oman?", opts: ["Muscat", "Salalah", "Nizwa", "Sohar"], correct: 0 },
           { q: "When did Oman gain independence?", opts: ["1970", "1960", "1980", "1950"], correct: 0 },
           { q: "Who was the Sultan who modernized Oman?", opts: ["Qaboos bin Said", "Said bin Taimur", "Faisal bin Turki", "Nadir bin Faisal"], correct: 0 },
           { q: "What is the currency of Oman?", opts: ["Rial", "Dinar", "Dirham", "Rupee"], correct: 0 },
           { q: "What is the official language of Oman?", opts: ["Arabic", "English", "French", "Urdu"], correct: 0 }
         ]
       },
    56: { id: 56, name: "Misfah Al Abriyin", nameAr: "", emoji: "💧", num: "56",
         meaning: "Picturesque mountain village in Jebel Akhdar with ancient falaj system, terraced farms, and traditional houses.",
         meaningAr: "",
         isReady: true,
         category: "heritage",
         secretWord: "MISFAH AL ABRIYIN",
         loreText: "A mountain village clinging to cliffs... where terraces of roses and pomegranates defy gravity. Picturesque mountain village in Jebel Akhdar with ancient falaj system, terraced farms, and traditional houses.",
         vocabTargets: ["mountain", "village", "ancient", "terraced"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the population of Oman approximately?", opts: ["5 million", "10 million", "2 million", "8 million"], correct: 0 },
           { q: "What sea borders Oman?", opts: ["Arabian Sea", "Red Sea", "Mediterranean", "Caspian"], correct: 0 },
           { q: "What is the highest mountain in Oman?", opts: ["Jebel Shams", "Jebel Akhdar", "Al Hajar", "Jebel Qahwan"], correct: 0 },
           { q: "What is the largest desert in Oman?", opts: ["Rub al Khali", "Wahiba Sands", "Nafud", "Dahna"], correct: 0 },
           { q: "What is Oman's national animal?", opts: ["Arabian Oryx", "Camel", "Falcon", "Horse"], correct: 0 }
         ]
       },
    57: { id: 57, name: "Imam Bil-Arab", nameAr: "", emoji: "📜", num: "57",
         meaning: "Imam Bil-Arab Bin Sultan, builder of Jabreen Castle. A scholar who promoted education in astrology, medicine, and law.",
         meaningAr: "",
         isReady: true,
         category: "history",
         secretWord: "IMAM BIL-ARAB",
         loreText: "The scholar Imam who built a castle for learning... his name lives on in Jabreen's painted ceilings. Imam Bil-Arab Bin Sultan, builder of Jabreen Castle. A scholar who promoted education in astrology, medicine, and law.",
         vocabTargets: ["builder", "scholar", "promoted", "education"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the traditional Omani coffee called?", opts: ["Kahwa", "Qahwa", "Gahwa", "Kawa"], correct: 0 },
           { q: "What spice is essential in Omani coffee?", opts: ["Cardamom", "Cinnamon", "Saffron", "Cloves"], correct: 0 },
           { q: "What is the traditional Omani dagger called?", opts: ["Khanjar", "Jambiya", "Kard", "Peshkabz"], correct: 0 },
           { q: "What is the Omani traditional dress for men?", opts: ["Dishdasha", "Thobe", "Kandura", "Jalabiya"], correct: 0 },
           { q: "What is the Omani traditional cap called?", opts: ["Kumma", "Taqiya", "Imama", "Ghutra"], correct: 0 }
         ]
       },
    58: { id: 58, name: "Ahmad Bin Majid", nameAr: "", emoji: "📜", num: "58",
         meaning: "Famous 15th-century Omani navigator and cartographer. Known as the Lion of the Sea, he wrote crucial navigation texts.",
         meaningAr: "",
         isReady: true,
         category: "history",
         secretWord: "AHMAD BIN MAJID",
         loreText: "The Lion of the Sea... the Omani navigator who taught Vasco da Gama the route to India. Famous 15th-century Omani navigator and cartographer. Known as the Lion of the Sea, he wrote crucial navigation texts.",
         vocabTargets: ["century", "navigator", "cartographer", "crucial"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Omani turban called?", opts: ["Mussar", "Imama", "Shumagh", "Ghutra"], correct: 0 },
           { q: "What is the traditional Omani women's mask?", opts: ["Burqa", "Niqab", "Hijab", "Battoulah"], correct: 0 },
           { q: "What is the main ingredient in Omani halwa?", opts: ["Starch", "Flour", "Rice", "Corn"], correct: 0 },
           { q: "What nut is commonly used in Omani halwa?", opts: ["Cashew", "Almond", "Pistachio", "Walnut"], correct: 0 },
           { q: "What is the traditional Omani bread called?", opts: ["Khubz Ragag", "Pita", "Naan", "Lavash"], correct: 0 }
         ]
       },
    59: { id: 59, name: "Sultan Qaboos", nameAr: "", emoji: "📜", num: "59",
         meaning: "Sultan Qaboos bin Said (1940-2020). Modernized Oman from isolation to a thriving, peaceful nation in 50 years.",
         meaningAr: "",
         isReady: true,
         category: "history",
         secretWord: "SULTAN QABOOS",
         loreText: "The Sultan who transformed a nation... modern schools, roads, and hospitals where there were none. Sultan Qaboos bin Said (1940-2020). Modernized Oman from isolation to a thriving, peaceful nation in 50 years.",
         vocabTargets: ["isolation", "thriving", "peaceful"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What is the Omani national dish?", opts: ["Shuwa", "Majboos", "Mandi", "Machboos"], correct: 0 },
           { q: "How is shuwa traditionally cooked?", opts: ["Underground oven", "Grill", "Stove", "Clay pot"], correct: 0 },
           { q: "What meat is used in traditional shuwa?", opts: ["Lamb or goat", "Chicken", "Beef", "Camel"], correct: 0 },
           { q: "What leaves are used to wrap shuwa?", opts: ["Banana leaves", "Palm leaves", "Fig leaves", "Grape leaves"], correct: 0 },
           { q: "What is the Omani rice dish called?", opts: ["Majboos", "Biryani", "Pilaf", "Kabsa"], correct: 0 }
         ]
       },
    60: { id: 60, name: "Camel Racing", nameAr: "", emoji: "🗡️", num: "60",
         meaning: "Traditional Omani sport. Camels race across desert tracks, a celebration of Bedouin culture and heritage.",
         meaningAr: "",
         isReady: true,
         category: "culture",
         secretWord: "CAMEL RACING",
         loreText: "Where camels race across the sand... the sport of Bedouin pride and speed. Traditional Omani sport. Camels race across desert tracks, a celebration of Bedouin culture and heritage.",
         vocabTargets: ["celebration", "culture", "heritage"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What fish is used in Mashuai?", opts: ["Kingfish", "Tuna", "Sardine", "Shark"], correct: 0 },
           { q: "What is the Omani grilled fish dish?", opts: ["Mashuai", "Samak", "Sayad", "Hout"], correct: 0 },
           { q: "What is the traditional Omani sweet dumpling?", opts: ["Luqaimat", "Baklava", "Kunafa", "Basbousa"], correct: 0 },
           { q: "What syrup is poured on luqaimat?", opts: ["Date syrup", "Honey", "Sugar", "Maple"], correct: 0 },
           { q: "What is the Omani meat skewer called?", opts: ["Mishkak", "Kebab", "Tikka", "Shish"], correct: 0 }
         ]
       },
    61: { id: 61, name: "Razha Dance", nameAr: "", emoji: "🗡️", num: "61",
         meaning: "Traditional Omani war dance performed with swords and poetry. Showcases strength, skill, and tribal solidarity.",
         meaningAr: "",
         isReady: true,
         category: "culture",
         secretWord: "RAZHA DANCE",
         loreText: "Men dance with swords and poetry... a dance of strength, pride, and tribal unity. Traditional Omani war dance performed with swords and poetry. Showcases strength, skill, and tribal solidarity.",
         vocabTargets: ["performed", "strength", "solidarity"],
         grammarTargets: [],
         image: "",
         questions: [
           { q: "What sauce is served with mishkak?", opts: ["Tamarind", "Tahini", "Yogurt", "Chili"], correct: 0 },
           { q: "What is the Omani wheat porridge?", opts: ["Harees", "Madrouba", "Jareesh", "Freekeh"], correct: 0 },
           { q: "When is harees traditionally eaten?", opts: ["Ramadan", "Eid", "Wedding", "Friday"], correct: 0 },
           { q: "What is the Omani rice porridge called?", opts: ["Madrouba", "Harees", "Jareesh", "Shorba"], correct: 0 },
           { q: "What spice flavors madrouba?", opts: ["Cardamom", "Cumin", "Turmeric", "Cinnamon"], correct: 0 }
         ]
       }
};

// ============================================
// GAME STATE
// ============================================
const GameState = {
    LOADING: 'loading', CAMERA_PERMISSION: 'camera_permission',
    MENU: 'menu', PLAYING: 'playing', READING: 'reading',
    SETTINGS: 'settings', LEARN: 'learn'
};

const SpreadType = {
    SINGLE: 'single', THREE: 'three', CELTIC: 'celtic'
};

const GestureType = {
    NONE: 'none', HOVER: 'hover', PINCH: 'pinch', WAVE: 'wave', SELECT: 'select'
};

class TarotGame {
    constructor() {
        this.state = GameState.LOADING;
        this.spreadType = SpreadType.SINGLE;
        this.currentCards = [];
        this.selectedCards = [];
        this.language = 'en';
        this.useHandTracking = true;
        this.useMouse = false;

        // Hand tracking
        this.hands = null;
        this.camera = null;
        this.handCanvas = null;
        this.handCtx = null;
        this.videoElement = null;
        this.handResults = null;
        this.lastGesture = GestureType.NONE;
        this.gestureConfidence = 0;
        this.pinchDistance = 0;
        this.handPosition = { x: 0.5, y: 0.5 };
        this.isHandVisible = false;

        // Canvas
        this.canvas = null;
        this.ctx = null;
        this.cards = [];
        this.hoveredCard = null;
        this.selectedCard = null;

        // Animation
        this.animationId = null;
        this.time = 0;
        this.particles = [];

        // Settings
        this.settings = {
            trackingSensitivity: 5,
            showSkeleton: true,
            mirrorCamera: true,
            ambientVolume: 50,
            sfxVolume: 70,
            particlesEnabled: true,
            cardGlow: true
        };

        this.ui = {};
        this.init();
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        this.initUI();
        this.initCanvas();
        this.initParticles();
        this.startLoadingSequence();
    }

    initUI() {
        const ids = ['loading-screen','loading-bar-fill','loading-text','main-menu',
            'camera-permission','game-area','settings-screen','learn-screen',
            'reading-panel','reading-text','reading-card-display','gesture-feedback',
            'gesture-icon','gesture-text','hand-status','status-dot','status-text',
            'spread-name','cards-grid','card-modal','modal-card','btn-close-modal',
            'hand-canvas','input-video','tarot-canvas'];

        ids.push('btn-continue-journey');
        ids.forEach(id => {
            this.ui[id.replace(/-/g, '_')] = document.getElementById(id);
        });

        // Buttons
        document.getElementById('btn-enable-camera')?.addEventListener('click', () => this.enableCamera());
        document.getElementById('btn-mouse-mode')?.addEventListener('click', () => this.enableMouseMode());
        document.getElementById('btn-single-draw')?.addEventListener('click', () => this.startSpread(SpreadType.SINGLE));
        document.getElementById('btn-three-spread')?.addEventListener('click', () => this.startSpread(SpreadType.THREE));
        document.getElementById('btn-celtic-cross')?.addEventListener('click', () => this.startSpread(SpreadType.CELTIC));
        document.getElementById('btn-learn')?.addEventListener('click', () => this.showLearnScreen());
        document.getElementById('btn-settings')?.addEventListener('click', () => this.showSettings());
        document.getElementById('btn-restart-spread')?.addEventListener('click', () => this.restartSpread());
        document.getElementById('btn-back-menu')?.addEventListener('click', () => this.backToMenu());
        document.getElementById('btn-close-reading')?.addEventListener('click', () => this.closeReading());
        document.getElementById('btn-close-modal')?.addEventListener('click', () => this.closeModal());

        // Settings
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setLanguage(e.target.dataset.lang));
        });

        const bindSetting = (id, key) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('input', (e) => {
                this.settings[key] = e.target.type === 'checkbox' ? e.target.checked : parseInt(e.target.value);
                const valEl = document.getElementById(id + '-val');
                if (valEl) valEl.textContent = this.settings[key] + (id.includes('volume') ? '%' : '');
            });
        };
        bindSetting('tracking-sensitivity', 'trackingSensitivity');
        bindSetting('show-skeleton', 'showSkeleton');
        bindSetting('mirror-camera', 'mirrorCamera');
        bindSetting('ambient-volume', 'ambientVolume');
        bindSetting('sfx-volume', 'sfxVolume');
        bindSetting('particles-enabled', 'particlesEnabled');
        bindSetting('card-glow', 'cardGlow');

        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => this.backToMenu());
        });
    }

    initCanvas() {
        this.canvas = document.getElementById('tarot-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.handCanvas = document.getElementById('hand-canvas');
        if (this.handCanvas) this.handCtx = this.handCanvas.getContext('2d');

        this.videoElement = document.getElementById('input-video');

        // Mouse fallback listeners — attached unconditionally (onMouseMove/onMouseClick
        // already guard on this.useMouse themselves) since this used to be gated on
        // `this.useMouse` here in initUI(), which runs before the user has ever had a
        // chance to enable mouse mode, so the listeners were never actually attached.
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.onMouseClick(e));
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // ============================================
    // LOADING
    // ============================================
    startLoadingSequence() {
        const steps = [
            { progress: 15, text: 'Awakening the cards...', textAr: 'استيقاظ البطاقات...' },
            { progress: 35, text: 'Connecting to the desert spirits...', textAr: 'التواصل مع أرواح الصحراء...' },
            { progress: 55, text: 'Preparing hand tracking...', textAr: 'تحضير تتبع اليد...' },
            { progress: 75, text: 'Channeling ancient wisdom...', textAr: 'استقبال الحكمة القديمة...' },
            { progress: 100, text: 'The cards are ready...', textAr: 'البطاقات جاهزة...' },
        ];

        let step = 0;
        const interval = setInterval(() => {
            if (step < steps.length) {
                const s = steps[step];
                if (this.ui.loading_bar_fill) this.ui.loading_bar_fill.style.width = s.progress + '%';
                if (this.ui.loading_text) this.ui.loading_text.textContent = this.language === 'ar' ? s.textAr : s.text;
                step++;
            } else {
                clearInterval(interval);
                setTimeout(() => this.showCameraPermission(), 500);
            }
        }, 700);
    }

    showCameraPermission() {
        this.ui.loading_screen?.classList.add('hidden');
        this.ui.camera_permission?.classList.remove('hidden');
        this.state = GameState.CAMERA_PERMISSION;
    }

    // ============================================
    // HAND TRACKING - MediaPipe
    // ============================================
    async enableCamera() {
        this.ui.camera_permission?.classList.add('hidden');
        this.ui.loading_screen?.classList.remove('hidden');
        if (this.ui.loading_text) this.ui.loading_text.textContent = this.t('Initializing camera...');

        try {
            await this.initHandTracking();
            this.useHandTracking = true;
            this.useMouse = false;
            this.ui.loading_screen?.classList.add('hidden');
            this.showMenu();
        } catch (err) {
            console.error('Camera error:', err);
            this.enableMouseMode();
        }
    }

    enableMouseMode() {
        this.useHandTracking = false;
        this.useMouse = true;
        this.ui.camera_permission?.classList.add('hidden');
        this.ui.loading_screen?.classList.add('hidden');
        this.showMenu();
        this.updateGestureFeedback('🖱️', 'Use your mouse to interact with the cards');
    }

    async initHandTracking() {
        if (!this.videoElement || !this.handCanvas) return;

        this.hands = new Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });

        this.hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        this.hands.onResults((results) => this.onHandResults(results));

        this.camera = new Camera(this.videoElement, {
            onFrame: async () => {
                await this.hands.send({ image: this.videoElement });
            },
            width: 320,
            height: 240
        });

        await this.camera.start();
        this.updateHandStatus(true, 'tracking');
    }

    onHandResults(results) {
        this.handResults = results;

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            this.isHandVisible = true;
            const landmarks = results.multiHandLandmarks[0];
            this.processHandGesture(landmarks);
            this.drawHandSkeleton(landmarks);
            this.updateHandStatus(true, 'active');
        } else {
            this.isHandVisible = false;
            this.lastGesture = GestureType.NONE;
            this.clearHandCanvas();
            this.updateHandStatus(true, 'waiting');
        }
    }

    processHandGesture(landmarks) {
        // Index finger tip (8) and thumb tip (4)
        const indexTip = landmarks[8];
        const thumbTip = landmarks[4];
        const middleTip = landmarks[12];
        const wrist = landmarks[0];

        // Calculate pinch distance
        const dx = indexTip.x - thumbTip.x;
        const dy = indexTip.y - thumbTip.y;
        const dz = indexTip.z - thumbTip.z;
        this.pinchDistance = Math.sqrt(dx*dx + dy*dy + dz*dz);

        // Hand position (use index finger as cursor)
        let x = indexTip.x;
        if (this.settings.mirrorCamera) x = 1 - x;
        this.handPosition = { x, y: indexTip.y };

        // Detect gestures. Thresholds scale with the Settings > Tracking Sensitivity
        // slider (1-10, default 5) — previously this slider was wired up in the UI
        // but never actually read anywhere, so it did nothing. At the default value
        // of 5 these equal the original hardcoded 0.08 / 0.15, so existing behavior
        // is unchanged unless the user actually moves the slider.
        const sensitivity = this.settings.trackingSensitivity || 5;
        const pinchThreshold = 0.05 + (sensitivity / 10) * 0.06;
        const waveThreshold = 0.20 - (sensitivity / 10) * 0.10;

        if (this.pinchDistance < pinchThreshold) {
            this.setGesture(GestureType.PINCH);
        } else if (Math.abs(middleTip.x - wrist.x) > waveThreshold) {
            this.setGesture(GestureType.WAVE);
        } else {
            this.setGesture(GestureType.HOVER);
        }

        // Update cursor position for card interaction
        this.updateCursorFromHand();
    }

    setGesture(gesture) {
        if (this.lastGesture !== gesture) {
            this.lastGesture = gesture;
            this.gestureConfidence = 0;
            this.onGestureChange(gesture);
        } else {
            this.gestureConfidence = Math.min(this.gestureConfidence + 0.1, 1);
        }
    }

    onGestureChange(gesture) {
        const messages = {
            [GestureType.HOVER]: { icon: '✋', text: 'Hover over a card', textAr: 'حوّم فوق البطاقة' },
            [GestureType.PINCH]: { icon: '👌', text: 'Pinch to select', textAr: 'قرص للاختيار' },
            [GestureType.WAVE]: { icon: '👋', text: 'Wave to shuffle', textAr: 'لوح للخلط' },
            [GestureType.NONE]: { icon: '✋', text: 'Show your hand', textAr: 'أظهر يدك' }
        };

        const msg = messages[gesture];
        this.updateGestureFeedback(msg.icon, this.language === 'ar' ? msg.textAr : msg.text);
    }

    updateCursorFromHand() {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        const x = this.handPosition.x * rect.width;
        const y = this.handPosition.y * rect.height;

        // Check card hover
        this.checkCardHover(x, y);

        // Check pinch select
        if (this.lastGesture === GestureType.PINCH && this.gestureConfidence > 0.5) {
            this.selectHoveredCard();
        }
    }

    drawHandSkeleton(landmarks) {
        if (!this.handCtx || !this.settings.showSkeleton) return;
        const ctx = this.handCtx;
        const w = this.handCanvas.width;
        const h = this.handCanvas.height;

        ctx.clearRect(0, 0, w, h);

        // Draw connections
        const connections = [
            [0,1],[1,2],[2,3],[3,4], // Thumb
            [0,5],[5,6],[6,7],[7,8], // Index
            [0,9],[9,10],[10,11],[11,12], // Middle
            [0,13],[13,14],[14,15],[15,16], // Ring
            [0,17],[17,18],[18,19],[19,20] // Pinky
        ];

        ctx.strokeStyle = 'rgba(212, 197, 169, 0.4)';
        ctx.lineWidth = 1;

        connections.forEach(([start, end]) => {
            const p1 = landmarks[start];
            const p2 = landmarks[end];
            let x1 = p1.x * w, x2 = p2.x * w;
            if (this.settings.mirrorCamera) { x1 = w - x1; x2 = w - x2; }
            ctx.beginPath();
            ctx.moveTo(x1, p1.y * h);
            ctx.lineTo(x2, p2.y * h);
            ctx.stroke();
        });

        // Draw landmarks
        landmarks.forEach((lm, i) => {
            let x = lm.x * w;
            if (this.settings.mirrorCamera) x = w - x;
            const y = lm.y * h;

            ctx.beginPath();
            ctx.arc(x, y, i === 8 ? 5 : 3, 0, Math.PI * 2);
            ctx.fillStyle = i === 8 ? 'rgba(212, 197, 169, 0.9)' : 'rgba(74, 14, 31, 0.7)';
            ctx.fill();
        });
    }

    clearHandCanvas() {
        if (this.handCtx) {
            this.handCtx.clearRect(0, 0, this.handCanvas.width, this.handCanvas.height);
        }
    }

    // ============================================
    // MOUSE FALLBACK
    // ============================================
    onMouseMove(e) {
        if (!this.useMouse) return;
        const rect = this.canvas.getBoundingClientRect();
        this.handPosition = {
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height
        };
        this.checkCardHover(e.clientX - rect.left, e.clientY - rect.top);
    }

    onMouseClick(e) {
        if (!this.useMouse) return;
        this.selectHoveredCard();
    }

    // ============================================
    // CARD SYSTEM
    // ============================================
    createCards() {
        this.cards = [];
        const cardIds = Object.keys(TarotCards).map(Number);

        // Shuffle
        for (let i = cardIds.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardIds[i], cardIds[j]] = [cardIds[j], cardIds[i]];
        }

        const spread = this.spreadType;
        const count = spread === SpreadType.SINGLE ? 1 : spread === SpreadType.THREE ? 3 : 10;

        for (let i = 0; i < count; i++) {
            const cardData = TarotCards[cardIds[i]];
            this.cards.push({
                data: cardData,
                x: 0, y: 0, width: 140, height: 230,
                targetX: 0, targetY: 0,
                rotation: 0, targetRotation: 0,
                scale: 1, targetScale: 1,
                flipped: false, revealed: false,
                hover: false, selected: false,
                opacity: 1, glow: 0
            });
        }

        this.layoutCards();
    }

    layoutCards() {
        const w = this.canvas?.width || window.innerWidth;
        const h = this.canvas?.height || window.innerHeight;
        const spread = this.spreadType;

        if (spread === SpreadType.SINGLE) {
            this.cards[0].targetX = w / 2 - 70;
            this.cards[0].targetY = h / 2 - 115;
        } else if (spread === SpreadType.THREE) {
            const positions = [
                { x: w/2 - 220, y: h/2 - 115 }, // Past
                { x: w/2 - 70, y: h/2 - 115 },  // Present
                { x: w/2 + 80, y: h/2 - 115 }   // Future
            ];
            this.cards.forEach((card, i) => {
                card.targetX = positions[i].x;
                card.targetY = positions[i].y;
            });
        } else if (spread === SpreadType.CELTIC) {
            // Celtic cross layout
            const cx = w / 2, cy = h / 2;
            const positions = [
                { x: cx - 70, y: cy - 115 },      // 1. Present
                { x: cx - 70, y: cy - 115, r: 90 }, // 2. Challenge (cross)
                { x: cx - 70, y: cy - 315 },      // 3. Above
                { x: cx - 70, y: cy + 85 },       // 4. Below
                { x: cx - 270, y: cy - 115 },     // 5. Past
                { x: cx + 130, y: cy - 115 },     // 6. Future
                { x: cx + 280, y: cy - 315 },     // 7. Self
                { x: cx + 280, y: cy - 165 },     // 8. Environment
                { x: cx + 280, y: cy - 15 },      // 9. Hopes
                { x: cx + 280, y: cy + 135 }      // 10. Outcome
            ];
            this.cards.forEach((card, i) => {
                card.targetX = positions[i].x;
                card.targetY = positions[i].y;
                if (positions[i].r) card.targetRotation = positions[i].r;
            });
        }

        // Initial position (off-screen or stacked)
        this.cards.forEach((card, i) => {
            card.x = w / 2 - 70 + (i * 2);
            card.y = h + 50;
            card.rotation = (Math.random() - 0.5) * 10;
        });
    }

    checkCardHover(x, y) {
        let hovered = null;
        for (let i = this.cards.length - 1; i >= 0; i--) {
            const card = this.cards[i];
            if (x >= card.x && x <= card.x + card.width &&
                y >= card.y && y <= card.y + card.height) {
                hovered = card;
                break;
            }
        }

        this.cards.forEach(c => {
            c.hover = (c === hovered);
            c.targetScale = c.hover ? 1.08 : 1;
            c.targetRotation = c.hover ? (c === hovered ? 0 : c.rotation) : c.rotation;
        });

        this.hoveredCard = hovered;
    }

    selectHoveredCard() {
        if (!this.hoveredCard || this.hoveredCard.revealed) return;

        this.hoveredCard.selected = true;
        this.hoveredCard.revealed = true;
        this.hoveredCard.targetRotation = 0;

        // Flip animation
        this.animateCardFlip(this.hoveredCard);

        // Show reading
        setTimeout(() => this.showReading(this.hoveredCard), 600);
    }

    animateCardFlip(card) {
        let progress = 0;
        const animate = () => {
            progress += 0.05;
            if (progress <= 0.5) {
                card.scaleX = 1 - progress * 2;
            } else {
                card.scaleX = (progress - 0.5) * 2;
                card.flipped = true;
            }
            if (progress < 1) requestAnimationFrame(animate);
            else card.scaleX = 1;
        };
        animate();
    }

    // ============================================
    // RENDERING
    // ============================================
    initParticles() {
        this.particles = [];
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3 - 0.1,
                opacity: Math.random() * 0.5 + 0.1,
                color: Math.random() > 0.5 ? '212, 197, 169' : '74, 14, 31'
            });
        }
    }

    render() {
        if (!this.ctx || this.state !== GameState.PLAYING) return;
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        // Clear
        ctx.fillStyle = '#1a0a0f';
        ctx.fillRect(0, 0, w, h);

        // Background gradient
        const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
        gradient.addColorStop(0, 'rgba(74, 14, 31, 0.2)');
        gradient.addColorStop(1, 'rgba(26, 10, 15, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        // Particles
        if (this.settings.particlesEnabled) {
            this.renderParticles(ctx);
        }

        // Cards
        this.renderCards(ctx);

        // Hand cursor
        if (this.useHandTracking && this.isHandVisible) {
            this.renderHandCursor(ctx);
        }

        // Continue animation
        this.animationId = requestAnimationFrame(() => this.render());
    }

    renderParticles(ctx) {
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.y < 0) { p.y = ctx.canvas.height; p.x = Math.random() * ctx.canvas.width; }
            if (p.x < 0) p.x = ctx.canvas.width;
            if (p.x > ctx.canvas.width) p.x = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
            ctx.fill();
        });
    }

    renderCards(ctx) {
        this.cards.forEach(card => {
            // Smooth animation
            card.x += (card.targetX - card.x) * 0.05;
            card.y += (card.targetY - card.y) * 0.05;
            card.rotation += (card.targetRotation - card.rotation) * 0.05;
            card.scale += (card.targetScale - card.scale) * 0.1;

            ctx.save();
            ctx.translate(card.x + card.width/2, card.y + card.height/2);
            ctx.rotate(card.rotation * Math.PI / 180);
            ctx.scale(card.scale, card.scale);

            // Glow effect
            if (card.hover && this.settings.cardGlow) {
                ctx.shadowColor = 'rgba(212, 197, 169, 0.3)';
                ctx.shadowBlur = 20;
            }

            // Card background
            const cardW = card.width;
            const cardH = card.height;

            if (!card.flipped) {
                // Card back
                ctx.fillStyle = '#2a080f';
                ctx.fillRect(-cardW/2, -cardH/2, cardW, cardH);

                // Border
                ctx.strokeStyle = 'rgba(212, 197, 169, 0.3)';
                ctx.lineWidth = 2;
                ctx.strokeRect(-cardW/2 + 4, -cardH/2 + 4, cardW - 8, cardH - 8);

                // Pattern
                ctx.fillStyle = 'rgba(212, 197, 169, 0.1)';
                ctx.font = '30px serif';
                ctx.textAlign = 'center';
                ctx.fillText('🌙', 0, 5);

                // Decorative corners
                ctx.strokeStyle = 'rgba(212, 197, 169, 0.2)';
                ctx.lineWidth = 1;
                const cornerSize = 15;
                // Top-left
                ctx.beginPath(); ctx.moveTo(-cardW/2 + 10, -cardH/2 + 25); ctx.lineTo(-cardW/2 + 10, -cardH/2 + 10); ctx.lineTo(-cardW/2 + 25, -cardH/2 + 10); ctx.stroke();
                // Top-right
                ctx.beginPath(); ctx.moveTo(cardW/2 - 10, -cardH/2 + 25); ctx.lineTo(cardW/2 - 10, -cardH/2 + 10); ctx.lineTo(cardW/2 - 25, -cardH/2 + 10); ctx.stroke();
                // Bottom-left
                ctx.beginPath(); ctx.moveTo(-cardW/2 + 10, cardH/2 - 25); ctx.lineTo(-cardW/2 + 10, cardH/2 - 10); ctx.lineTo(-cardW/2 + 25, cardH/2 - 10); ctx.stroke();
                // Bottom-right
                ctx.beginPath(); ctx.moveTo(cardW/2 - 10, cardH/2 - 25); ctx.lineTo(cardW/2 - 10, cardH/2 - 10); ctx.lineTo(cardW/2 - 25, cardH/2 - 10); ctx.stroke();

            } else {
                // Card front
                ctx.fillStyle = '#3d2817';
                ctx.fillRect(-cardW/2, -cardH/2, cardW, cardH);

                // Inner border
                ctx.strokeStyle = 'rgba(212, 197, 169, 0.4)';
                ctx.lineWidth = 1;
                ctx.strokeRect(-cardW/2 + 8, -cardH/2 + 8, cardW - 16, cardH - 16);

                // Card number
                ctx.fillStyle = 'rgba(212, 197, 169, 0.6)';
                ctx.font = '10px Cinzel';
                ctx.textAlign = 'center';
                ctx.fillText(card.data.num, 0, -cardH/2 + 22);

                // Emoji
                ctx.font = '50px serif';
                ctx.fillText(card.data.emoji, 0, -10);

                // Name
                ctx.fillStyle = '#d4c5a9';
                ctx.font = 'bold 11px Cinzel';
                const name = this.language === 'ar' ? (card.data.nameAr || card.data.name) : card.data.name;
                ctx.fillText(name, 0, 30);

                // Bottom decoration
                ctx.fillStyle = 'rgba(212, 197, 169, 0.3)';
                ctx.fillRect(-20, cardH/2 - 25, 40, 1);
            }

            ctx.restore();
        });
    }

    renderHandCursor(ctx) {
        const x = this.handPosition.x * ctx.canvas.width;
        const y = this.handPosition.y * ctx.canvas.height;

        // Cursor ring
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(212, 197, 169, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner dot
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = this.lastGesture === GestureType.PINCH ? 'rgba(212, 197, 169, 0.9)' : 'rgba(212, 197, 169, 0.4)';
        ctx.fill();

        // Gesture indicator
        if (this.lastGesture === GestureType.PINCH) {
            ctx.beginPath();
            ctx.arc(x, y, 20 + Math.sin(Date.now() * 0.01) * 5, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(212, 197, 169, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    // ============================================
    // READING
    // ============================================
    showReading(card) {
        this.state = GameState.READING;
        const data = card.data;

        if (this.ui.reading_card_display) {
            this.ui.reading_card_display.innerHTML = `
                <div class="card-visual">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${data.emoji}</div>
                    <div style="font-family: Cinzel; font-size: 1.2rem; color: #d4c5a9; margin-bottom: 0.5rem;">${this.language === 'ar' ? (data.nameAr || data.name) : data.name}</div>
                    <div style="font-family: Cinzel; font-size: 0.8rem; color: #9a8b6b;">${data.num}</div>
                </div>
            `;
        }

        if (this.ui.reading_text) {
            this.ui.reading_text.innerHTML = `
                <h3>${this.language === 'ar' ? (data.nameAr || data.name) : data.name}</h3>
                <p>${this.language === 'ar' ? (data.meaningAr || data.meaning) : data.meaning}</p>
                ${data.isReady ? `<p style="margin-top:1rem; font-style:italic; direction:ltr; unicode-bidi:isolate;">${data.loreText}</p>
                <p style="margin-top:0.6rem; font-size:0.75rem; color:#9a8b6b;">Read carefully — you'll need this to spell the secret word and answer questions on the falaj ride.</p>` : ''}
            `;
        }

        if (this.ui.btn_continue_journey) {
            if (data.isReady) {
                this.ui.btn_continue_journey.classList.remove('hidden');
                this.ui.btn_continue_journey.onclick = () => this.continueToJourney(data);
            } else {
                this.ui.btn_continue_journey.classList.add('hidden');
            }
        }

        this.ui.reading_panel?.classList.remove('hidden');
    }

    continueToJourney(data) {
        // ما نودّي للستارة مباشرة — نخزن البطاقة ونرجع لغرفة المكتبة حتى يضغط
        // اللاعب هوت سبوت ٢ المتوهج بنفسه (بنفس تسلسل: كروت → ستارة → بلاك هول → فلج)
        sessionStorage.setItem('palmtree_currentCard', JSON.stringify(data));
        sessionStorage.setItem('palmtree_stage', 'hotspot2');
        this.closeReading();
        window.updateLibraryHotspots?.();
    }

    closeReading() {
        this.ui.reading_panel?.classList.add('hidden');
        this.state = GameState.PLAYING;
    }

    // ============================================
    // UI MANAGEMENT
    // ============================================
    showMenu() {
        this.hideAllScreens();
        this.ui.main_menu?.classList.remove('hidden');
        this.state = GameState.MENU;
    }

    startSpread(type) {
        this.spreadType = type;
        this.hideAllScreens();
        this.ui.game_area?.classList.remove('hidden');
        this.state = GameState.PLAYING;

        const spreadNames = {
            [SpreadType.SINGLE]: { en: 'Single Draw', ar: 'سحب واحد' },
            [SpreadType.THREE]: { en: 'Three Card Spread', ar: 'انتشار ثلاثي' },
            [SpreadType.CELTIC]: { en: 'Celtic Cross', ar: 'الصليب الكلتي' }
        };

        if (this.ui.spread_name) {
            this.ui.spread_name.textContent = this.language === 'ar' ? spreadNames[type].ar : spreadNames[type].en;
        }

        this.createCards();
        this.render();
    }

    restartSpread() {
        this.createCards();
    }

    backToMenu() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.hideAllScreens();
        this.ui.main_menu?.classList.remove('hidden');
        this.state = GameState.MENU;
    }

    showSettings() {
        this.hideAllScreens();
        this.ui.settings_screen?.classList.remove('hidden');
        this.state = GameState.SETTINGS;
    }

    showLearnScreen() {
        this.hideAllScreens();
        this.ui.learn_screen?.classList.remove('hidden');
        this.state = GameState.LEARN;
        this.renderLearnCards();
    }

    renderLearnCards() {
        const grid = this.ui.cards_grid;
        if (!grid) return;

        grid.innerHTML = '';
        Object.values(TarotCards).forEach(card => {
            const div = document.createElement('div');
            div.className = 'card-thumbnail';
            div.innerHTML = `
                <div class="card-num">${card.num}</div>
                <div class="card-emoji">${card.emoji}</div>
                <div class="card-name">${this.language === 'ar' ? card.nameAr : card.name}</div>
            `;
            div.addEventListener('click', () => this.showCardModal(card));
            grid.appendChild(div);
        });
    }

    showCardModal(card) {
        const modal = this.ui.card_modal;
        const content = this.ui.modal_card;
        if (!modal || !content) return;

        content.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">${card.emoji}</div>
                <h2 style="font-family: Cinzel; color: #d4c5a9; margin-bottom: 0.5rem;">${this.language === 'ar' ? card.nameAr : card.name}</h2>
                <div style="color: #9a8b6b; font-family: Cinzel; margin-bottom: 1.5rem;">${card.num}</div>
                <p style="font-size: 1.1rem; line-height: 1.8; color: #b8a88a;">${this.language === 'ar' ? card.meaningAr : card.meaning}</p>
            </div>
        `;
        modal.classList.remove('hidden');
    }

    closeModal() {
        this.ui.card_modal?.classList.add('hidden');
    }

    hideAllScreens() {
        this.ui.loading_screen?.classList.add('hidden');
        this.ui.camera_permission?.classList.add('hidden');
        this.ui.main_menu?.classList.add('hidden');
        this.ui.game_area?.classList.add('hidden');
        this.ui.settings_screen?.classList.add('hidden');
        this.ui.learn_screen?.classList.add('hidden');
        this.ui.reading_panel?.classList.add('hidden');
    }

    // ============================================
    // LANGUAGE
    // ============================================
    setLanguage(lang) {
        this.language = lang;
        document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.body.setAttribute('lang', lang);

        // Update all translatable elements
        document.querySelectorAll('[data-en][data-ar]').forEach(el => {
            el.textContent = lang === 'ar' ? el.dataset.ar : el.dataset.en;
        });

        // Update buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update spread name if playing
        if (this.state === GameState.PLAYING && this.ui.spread_name) {
            const spreadNames = {
                [SpreadType.SINGLE]: { en: 'Single Draw', ar: 'سحب واحد' },
                [SpreadType.THREE]: { en: 'Three Card Spread', ar: 'انتشار ثلاثي' },
                [SpreadType.CELTIC]: { en: 'Celtic Cross', ar: 'الصليب الكلتي' }
            };
            this.ui.spread_name.textContent = lang === 'ar' ? spreadNames[this.spreadType].ar : spreadNames[this.spreadType].en;
        }
    }

    t(key) {
        const translations = {
            'Initializing camera...': { ar: 'تهيئة الكاميرا...' },
            'Show your hand to begin': { ar: 'أظهر يدك للبدء' },
            'Hover over a card': { ar: 'حوّم فوق البطاقة' },
            'Pinch to select': { ar: 'قرص للاختيار' },
            'Wave to shuffle': { ar: 'لوح للخلط' },
            'Use your mouse to interact with the cards': { ar: 'استخدم الماوس للتفاعل مع البطاقات' }
        };
        return (translations[key] && translations[key][this.language]) || key;
    }

    // ============================================
    // HELPERS
    // ============================================
    updateGestureFeedback(icon, text) {
        if (this.ui.gesture_icon) this.ui.gesture_icon.textContent = icon;
        if (this.ui.gesture_text) this.ui.gesture_text.textContent = text;
    }

    updateHandStatus(active, state) {
        if (!this.ui.status_dot || !this.ui.status_text) return;

        this.ui.status_dot.className = 'status-dot';
        if (active) {
            if (state === 'tracking') this.ui.status_dot.classList.add('tracking');
            else if (state === 'active') this.ui.status_dot.classList.add('active');
        }

        const texts = {
            'off': { en: 'Camera Off', ar: 'الكاميرا مغلقة' },
            'waiting': { en: 'Show Hand', ar: 'أظهر يدك' },
            'tracking': { en: 'Tracking...', ar: 'يتتبع...' },
            'active': { en: 'Hand Detected', ar: 'تم اكتشاف اليد' }
        };
        this.ui.status_text.textContent = this.language === 'ar' ? texts[state].ar : texts[state].en;
    }
}

// ============================================
// START GAME
// ============================================
const game = new TarotGame();

export default game;
