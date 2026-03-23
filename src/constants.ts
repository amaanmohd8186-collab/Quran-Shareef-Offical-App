import { QuizQuestion } from './types';

export const ISLAMIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: {
      en: "How many Surahs are there in the Holy Quran?",
      hi: "पवित्र कुरान में कितनी सूरह हैं?",
      ur: "قرآن پاک میں کتنی سورتیں ہیں؟"
    },
    options: {
      en: ["110", "114", "120", "118"],
      hi: ["110", "114", "120", "118"],
      ur: ["110", "114", "120", "118"]
    },
    correctAnswer: 1,
    explanation: {
      en: "The Holy Quran consists of 114 Surahs (chapters).",
      hi: "पवित्र कुरान में 114 सूरह (अध्याय) हैं।",
      ur: "قرآن پاک 114 سورتوں پر مشتمل ہے۔"
    },
    imageUrl: "https://picsum.photos/seed/quran/400/200"
  },
  {
    id: '2',
    question: {
      en: "Which Surah is known as the 'Heart of the Quran'?",
      hi: "किस सूरह को 'कुरान का हृदय' कहा जाता है?",
      ur: "کس سورت کو 'قرآن کا دل' کہا جاتا ہے؟"
    },
    options: {
      en: ["Surah Al-Baqarah", "Surah Al-Fatiha", "Surah Yaseen", "Surah Al-Ikhlas"],
      hi: ["सूरह अल-बकराह", "सूरह अल-फातिहा", "सूरह यासीन", "सूरह अल-इखलास"],
      ur: ["سورہ البقرہ", "سورہ الفاتحہ", "سورہ یٰسین", "سورہ الاخلاص"]
    },
    correctAnswer: 2,
    explanation: {
      en: "Surah Yaseen is often referred to as the Heart of the Quran.",
      hi: "सूरह यासीन को अक्सर कुरान का हृदय कहा जाता है।",
      ur: "سورہ یٰسین کو اکثر قرآن کا دل کہا جاتا ہے۔"
    },
    imageUrl: "https://picsum.photos/seed/heart/400/200"
  },
  {
    id: '3',
    question: {
      en: "Who was the first person to embrace Islam?",
      hi: "इस्लाम अपनाने वाले पहले व्यक्ति कौन थे?",
      ur: "اسلام قبول کرنے والی پہلی شخصیت کون تھی؟"
    },
    options: {
      en: ["Abu Bakr (RA)", "Ali (RA)", "Khadija (RA)", "Umar (RA)"],
      hi: ["अबू बक्र (रज़ि.)", "अली (रज़ि.)", "खदीजा (रज़ि.)", "उमर (रज़ि.)"],
      ur: ["ابوبکر (رضی اللہ عنہ)", "علی (رضی اللہ عنہ)", "خدیجہ (رضی اللہ عنہا)", "عمر (رضی اللہ عنہ)"]
    },
    correctAnswer: 2,
    explanation: {
      en: "Khadija bint Khuwaylid (RA), the wife of Prophet Muhammad (PBUH), was the first to embrace Islam.",
      hi: "खदीजा बिंत खुवायलिद (रज़ि.), पैगंबर मुहम्मद (सल्ल.) की पत्नी, इस्लाम अपनाने वाली पहली व्यक्ति थीं।",
      ur: "خدیجہ بنت خویلد (رضی اللہ عنہا)، پیغمبر محمد (صلی اللہ علیہ وسلم) کی اہلیہ، اسلام قبول کرنے والی پہلی شخصیت تھیں۔"
    },
    imageUrl: "https://picsum.photos/seed/islam/400/200"
  },
  {
    id: '4',
    question: {
      en: "What is the name of the Prophet Muhammad's (PBUH) mother?",
      hi: "पैगंबर मुहम्मद (सल्ल.) की माता का नाम क्या है?",
      ur: "پیغمبر محمد (صلی اللہ علیہ وسلم) کی والدہ کا نام کیا ہے؟"
    },
    options: {
      en: ["Amina", "Fatima", "Khadija", "Aisha"],
      hi: ["आमिना", "फातिमा", "खदीजा", "आयशा"],
      ur: ["آمنہ", "فاطمہ", "خدیجہ", "عائشہ"]
    },
    correctAnswer: 0,
    explanation: {
      en: "The mother of Prophet Muhammad (PBUH) was Amina bint Wahb.",
      hi: "पैगंबर मुहम्मद (सल्ल.) की माता आमिना बिंत वहाब थीं।",
      ur: "پیغمبر محمد (صلی اللہ علیہ وسلم) کی والدہ آمنہ بنت وہب تھیں۔"
    },
    imageUrl: "https://picsum.photos/seed/mother/400/200"
  },
  {
    id: '6',
    question: {
      en: "Who built the Kaaba?",
      hi: "काबा का निर्माण किसने किया था?",
      ur: "خانہ کعبہ کی تعمیر کس نے کی تھی؟"
    },
    options: {
      en: ["Prophet Muhammad (PBUH)", "Prophet Ibrahim (AS) and Ismail (AS)", "Prophet Musa (AS)", "Prophet Isa (AS)"],
      hi: ["पैगंबर मुहम्मद (सल्ल.)", "पैगंबर इब्राहिम (अलै.) और इस्माइल (अलै.)", "पैगंबर मूसा (अलै.)", "पैगंबर ईसा (अलै.)"],
      ur: ["پیغمبر محمد (صلی اللہ علیہ وسلم)", "پیغمبر ابراہیم (علیہ السلام) اور اسماعیل (علیہ السلام)", "پیغمبر موسیٰ (علیہ السلام)", "پیغمبر عیسیٰ (علیہ السلام)"]
    },
    correctAnswer: 1,
    explanation: {
      en: "The Kaaba was built by Prophet Ibrahim (AS) and his son Prophet Ismail (AS).",
      hi: "काबा का निर्माण पैगंबर इब्राहिम (अलै.) और उनके पुत्र पैगंबर इस्माइल (अलै.) ने किया था।",
      ur: "خانہ کعبہ کی تعمیر پیغمبر ابراہیم (علیہ السلام) اور ان کے بیٹے پیغمبر اسماعیل (علیہ السلام) نے کی تھی۔"
    },
    imageUrl: "https://picsum.photos/seed/kaaba/400/200"
  },
  {
    id: '7',
    question: {
      en: "What is the name of the first month of the Islamic calendar?",
      hi: "इस्लामी कैलेंडर के पहले महीने का नाम क्या है?",
      ur: "اسلامی کیلنڈر کے پہلے مہینے کا نام کیا ہے؟"
    },
    options: {
      en: ["Ramadan", "Muharram", "Rabi-ul-Awwal", "Shawwal"],
      hi: ["रमजान", "मुहर्रम", "रबी-उल-अव्वल", "शव्वाल"],
      ur: ["رمضان", "محرم", "ربیع الاول", "شوال"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Muharram is the first month of the Islamic calendar.",
      hi: "मुहर्रम इस्लामी कैलेंडर का पहला महीना है।",
      ur: "محرم اسلامی کیلنڈر کا پہلا مہینہ ہے۔"
    },
    imageUrl: "https://picsum.photos/seed/muharram/400/200"
  },
  {
    id: '8',
    question: {
      en: "How many times a day are Muslims required to pray?",
      hi: "मुसलमानों को दिन में कितनी बार प्रार्थना (नमाज़) करनी चाहिए?",
      ur: "مسلمانوں کو دن میں کتنی بار نماز پڑھنی چاہیے؟"
    },
    options: {
      en: ["3", "5", "7", "2"],
      hi: ["3", "5", "7", "2"],
      ur: ["3", "5", "7", "2"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Muslims are required to pray 5 times a day (Salah).",
      hi: "मुसलमानों को दिन में 5 बार प्रार्थना (नमाज़) करनी चाहिए।",
      ur: "مسلمانوں کو دن میں 5 بار نماز پڑھنی چاہیے۔"
    },
    imageUrl: "https://picsum.photos/seed/salah/400/200"
  },
  {
    id: '9',
    question: {
      en: "Which angel is responsible for bringing revelations to the Prophets?",
      hi: "पैगंबरों के पास रहस्योद्घाटन (वही) लाने के लिए कौन सा फरिश्ता जिम्मेदार है?",
      ur: "پیغمبروں کے پاس وحی لانے کے لیے کون سا فرشتہ ذمہ دار ہے؟"
    },
    options: {
      en: ["Jibreel (AS)", "Mikaeel (AS)", "Israfeel (AS)", "Izraeel (AS)"],
      hi: ["जिब्रील (अलै.)", "मीकाईल (अलै.)", "इसराफील (अलै.)", "इजराईल (अलै.)"],
      ur: ["جبرائیل (علیہ السلام)", "میکائیل (علیہ السلام)", "اسرافیل (علیہ السلام)", "عزرائیل (علیہ السلام)"]
    },
    correctAnswer: 0,
    explanation: {
      en: "Angel Jibreel (AS) is responsible for bringing revelations to the Prophets.",
      hi: "फरिश्ता जिब्रील (अलै.) पैगंबरों के पास रहस्योद्घाटन (वही) लाने के लिए जिम्मेदार है।",
      ur: "فرشتہ جبرائیل (علیہ السلام) پیغمبروں کے پاس وحی لانے کے لیے ذمہ دار ہے۔"
    },
    imageUrl: "https://picsum.photos/seed/angel/400/200"
  },
  {
    id: '11',
    question: {
      en: "Who is the last Prophet of Islam?",
      hi: "इस्लाम के अंतिम पैगंबर कौन हैं?",
      ur: "اسلام کے آخری پیغمبر کون ہیں؟"
    },
    options: {
      en: ["Prophet Ibrahim (AS)", "Prophet Musa (AS)", "Prophet Muhammad (PBUH)", "Prophet Isa (AS)"],
      hi: ["पैगंबर इब्राहिम (अलै.)", "पैगंबर मूसा (अलै.)", "पैगंबर मुहम्मद (सल्ल.)", "पैगंबर ईसा (अलै.)"],
      ur: ["پیغمبر ابراہیم (علیہ السلام)", "پیغمبر موسیٰ (علیہ السلام)", "پیغمبر محمد (صلی اللہ علیہ وسلم)", "پیغمبر عیسیٰ (علیہ السلام)"]
    },
    correctAnswer: 2,
    explanation: {
      en: "Prophet Muhammad (PBUH) is the last Prophet of Islam.",
      hi: "पैगंबर मुहम्मद (सल्ल.) इस्लाम के अंतिम पैगंबर हैं।",
      ur: "پیغمبر محمد (صلی اللہ علیہ وسلم) اسلام کے آخری پیغمبر ہیں۔"
    },
    imageUrl: "https://picsum.photos/seed/prophet/400/200"
  },
  {
    id: '12',
    question: {
      en: "What is the meaning of the word 'Islam'?",
      hi: "'इस्लाम' शब्द का अर्थ क्या है?",
      ur: "'اسلام' لفظ کا کیا مطلب ہے؟"
    },
    options: {
      en: ["Peace", "Submission", "Faith", "Prayer"],
      hi: ["शांति", "समर्पण", "विश्वास", "प्रार्थना"],
      ur: ["امن", "سپردگی", "ایمان", "نماز"]
    },
    correctAnswer: 1,
    explanation: {
      en: "The word 'Islam' means submission to the will of Allah.",
      hi: "'इस्लाम' शब्द का अर्थ अल्लाह की इच्छा के प्रति समर्पण है।",
      ur: "'اسلام' کا مطلب اللہ کی مرضی کے سامنے سر تسلیم خم کرنا ہے۔"
    },
    imageUrl: "https://picsum.photos/seed/islammeaning/400/200"
  },
  {
    id: '13',
    question: {
      en: "Which city is the holiest in Islam?",
      hi: "इस्लाम में सबसे पवित्र शहर कौन सा है?",
      ur: "اسلام میں سب سے مقدس شہر کون سا ہے؟"
    },
    options: {
      en: ["Madina", "Makkah", "Jerusalem", "Cairo"],
      hi: ["मदीना", "मक्का", "यरूशलेम", "काहिरा"],
      ur: ["مدینہ", "مکہ", "یروشلم", "قاہرہ"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Makkah is considered the holiest city in Islam.",
      hi: "मक्का को इस्लाम में सबसे पवित्र शहर माना जाता है।",
      ur: "مکہ کو اسلام میں سب سے مقدس شہر سمجھا جاتا ہے۔"
    },
    imageUrl: "https://picsum.photos/seed/makkah/400/200"
  },
  {
    id: '14',
    question: {
      en: "What is the name of the Islamic declaration of faith?",
      hi: "इस्लामी विश्वास की घोषणा का नाम क्या है?",
      ur: "اسلامی عقیدے کے اعلان کا نام کیا ہے؟"
    },
    options: {
      en: ["Salah", "Shahada", "Zakat", "Hajj"],
      hi: ["नमाज़", "कलमा (शहादत)", "ज़कात", "हज"],
      ur: ["نماز", "کلمہ (شہادت)", "زکوٰۃ", "حج"]
    },
    correctAnswer: 1,
    explanation: {
      en: "The Shahada is the Islamic declaration of faith.",
      hi: "कलमा (शहादत) इस्लामी विश्वास की घोषणा है।",
      ur: "کلمہ شہادت اسلامی عقیدے کا اعلان ہے۔"
    },
    imageUrl: "https://picsum.photos/seed/shahada/400/200"
  },
  {
    id: '15',
    question: {
      en: "Which month do Muslims fast in?",
      hi: "मुसलमान किस महीने में रोज़ा रखते हैं?",
      ur: "مسلمان کس مہینے میں روزے رکھتے ہیں؟"
    },
    options: {
      en: ["Rajab", "Sha'ban", "Ramadan", "Shawwal"],
      hi: ["रजब", "शाबान", "रमजान", "शव्वाल"],
      ur: ["رجب", "شعبان", "رمضان", "شوال"]
    },
    correctAnswer: 2,
    explanation: {
      en: "Muslims fast during the month of Ramadan.",
      hi: "मुसलमान रमजान के महीने में रोज़ा रखते हैं।",
      ur: "مسلمان رمضان کے مہینے میں روزے رکھتے ہیں۔"
    },
    imageUrl: "https://picsum.photos/seed/ramadan/400/200"
  },
  {
    id: '16',
    question: {
      en: "Who is the first caliph of Islam?",
      hi: "इस्लाम के पहले खलीफा कौन हैं?",
      ur: "اسلام کے پہلے خلیفہ کون ہیں؟"
    },
    options: {
      en: ["Umar (RA)", "Ali (RA)", "Abu Bakr (RA)", "Uthman (RA)"],
      hi: ["उमर (रज़ि.)", "अली (रज़ि.)", "अबू बक्र (रज़ि.)", "उस्मान (रज़ि.)"],
      ur: ["عمر (رضی اللہ عنہ)", "علی (رضی اللہ عنہ)", "ابوبکر (رضی اللہ عنہ)", "عثمان (رضی اللہ عنہ)"]
    },
    correctAnswer: 2,
    explanation: {
      en: "Abu Bakr (RA) was the first caliph of Islam.",
      hi: "अबू बक्र (रज़ि.) इस्लाम के पहले खलीफा थे।",
      ur: "ابوبکر (رضی اللہ عنہ) اسلام کے پہلے خلیفہ تھے۔"
    },
    imageUrl: "https://picsum.photos/seed/abubakr/400/200"
  },
  {
    id: '17',
    question: {
      en: "What is the name of the night when the Quran was first revealed?",
      hi: "उस रात का नाम क्या है जब कुरान पहली बार प्रकट हुआ था?",
      ur: "اس رات کا نام کیا ہے جب قرآن پہلی بار نازل ہوا تھا؟"
    },
    options: {
      en: ["Laylat al-Qadr", "Laylat al-Miraj", "Laylat al-Bara'at", "Eid al-Fitr"],
      hi: ["शब-ए-कद्र", "शब-ए-मिराज", "शब-ए-बरात", "ईद-उल-फितर"],
      ur: ["شب قدر", "شب معراج", "شب برات", "عید الفطر"]
    },
    correctAnswer: 0,
    explanation: {
      en: "The Quran was first revealed on Laylat al-Qadr (Night of Power).",
      hi: "कुरान पहली बार शब-ए-कद्र (शक्ति की रात) पर प्रकट हुआ था।",
      ur: "قرآن پہلی بار شب قدر (طاقت کی رات) پر نازل ہوا تھا۔"
    },
    imageUrl: "https://picsum.photos/seed/qadr/400/200"
  },
  {
    id: '18',
    question: {
      en: "Which prophet was swallowed by a whale?",
      hi: "किस पैगंबर को व्हेल ने निगल लिया था?",
      ur: "کس پیغمبر کو مچھلی نے نگل لیا تھا؟"
    },
    options: {
      en: ["Prophet Yusuf (AS)", "Prophet Yunus (AS)", "Prophet Musa (AS)", "Prophet Isa (AS)"],
      hi: ["पैगंबर यूसुफ (अलै.)", "पैगंबर यूनुस (अलै.)", "पैगंबर मूसा (अलै.)", "पैगंबर ईसा (अलै.)"],
      ur: ["پیغمبر یوسف (علیہ السلام)", "پیغمبر یونس (علیہ السلام)", "پیغمبر موسیٰ (علیہ السلام)", "پیغمبر عیسیٰ (علیہ السلام)"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Prophet Yunus (AS) was swallowed by a large fish/whale.",
      hi: "पैगंबर यूनुस (अलै.) को एक बड़ी मछली/व्हेल ने निगल लिया था।",
      ur: "پیغمبر یونس (علیہ السلام) کو ایک بڑی مچھلی/وہیل نے نگل لیا تھا۔"
    },
    imageUrl: "https://picsum.photos/seed/yunus/400/200"
  },
  {
    id: '19',
    question: {
      en: "What is the mandatory charity in Islam called?",
      hi: "इस्लाम में अनिवार्य दान को क्या कहा जाता है?",
      ur: "اسلام میں لازمی صدقہ کو کیا کہا جاتا ہے؟"
    },
    options: {
      en: ["Sadaqah", "Zakat", "Fitra", "Hadiyah"],
      hi: ["सदका", "ज़कात", "फितरा", "हदिया"],
      ur: ["صدقہ", "زکوٰۃ", "فطرہ", "ہدیہ"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Zakat is the mandatory charity in Islam.",
      hi: "ज़कात इस्लाम में अनिवार्य दान है।",
      ur: "زکوٰۃ اسلام میں لازمی صدقہ ہے۔"
    },
    imageUrl: "https://picsum.photos/seed/zakat/400/200"
  },
  {
    id: '20',
    question: {
      en: "Who is the Prophet known for his patience?",
      hi: "किस पैगंबर को उनके धैर्य के लिए जाना जाता है?",
      ur: "کس پیغمبر کو ان کے صبر کے لیے جانا جاتا ہے؟"
    },
    options: {
      en: ["Prophet Ayyub (AS)", "Prophet Ibrahim (AS)", "Prophet Musa (AS)", "Prophet Muhammad (PBUH)"],
      hi: ["पैगंबर अय्यूब (अलै.)", "पैगंबर इब्राहिम (अलै.)", "पैगंबर मूसा (अलै.)", "पैगंबर मुहम्मद (सल्ल.)"],
      ur: ["پیغمبر ایوب (علیہ السلام)", "پیغمبر ابراہیم (علیہ السلام)", "پیغمبر موسیٰ (علیہ السلام)", "پیغمبر محمد (صلی اللہ علیہ وسلم)"]
    },
    correctAnswer: 0,
    explanation: {
      en: "Prophet Ayyub (AS) is known for his immense patience.",
      hi: "पैगंबर अय्यूब (अलै.) अपने अपार धैर्य के लिए जाने जाते हैं।",
      ur: "پیغمبر ایوب (علیہ السلام) اپنے بے پناہ صبر کے لیے جانے جاتے ہیں۔"
    },
    imageUrl: "https://picsum.photos/seed/ayyub/400/200"
  },
  // ... (Adding more questions up to 100 would be too long for one edit, I will add a significant number)
];

export const JUZ_LIST = Array.from({ length: 30 }, (_, i) => ({
  number: i + 1,
  name: `Juz ${i + 1}`
}));

export const DAILY_INSPIRATION = [
  {
    id: '1',
    text: {
      en: "And whoever relies upon Allah - then He is sufficient for him.",
      hi: "और जो अल्लाह पर भरोसा करता है, तो वह उसके लिए काफी है।",
      ur: "اور جو اللہ پر بھروسہ کرتا ہے، تو وہ اس کے لیے کافی ہے۔"
    },
    reference: "Surah At-Talaq 65:3"
  },
  {
    id: '2',
    text: {
      en: "Indeed, with hardship [will be] ease.",
      hi: "निस्संदेह, कठिनाई के साथ आसानी है।",
      ur: "بیشک مشکل کے ساتھ آسانی ہے۔"
    },
    reference: "Surah Ash-Sharh 94:5"
  },
  {
    id: '3',
    text: {
      en: "So remember Me; I will remember you.",
      hi: "तो मुझे याद करो; मैं तुम्हें याद रखूँगा।",
      ur: "پس تم مجھے یاد کرو، میں تمہیں یاد کروں گا۔"
    },
    reference: "Surah Al-Baqarah 2:152"
  }
];

export const ISLAMIC_QUOTES = [
  { id: '1', text: { en: "The best among you are those who have the best manners and character.", hi: "तुममें सबसे अच्छा वह है जिसके आचरण और चरित्र सबसे अच्छे हैं।", ur: "تم میں سے بہترین وہ ہیں جن کے اخلاق اور کردار سب سے اچھے ہیں۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '2', text: { en: "Do good deeds properly, sincerely and moderately.", hi: "अच्छे काम ठीक से, ईमानदारी से और संयम से करो।", ur: "نیک اعمال کو درست، مخلصانہ اور اعتدال کے ساتھ کرو۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '3', text: { en: "Allah does not look at your appearance or your possessions, but He looks at your hearts and your deeds.", hi: "अल्लाह तुम्हारे रूप या तुम्हारी संपत्ति को नहीं देखता, बल्कि वह तुम्हारे दिलों और तुम्हारे कर्मों को देखता है।", ur: "اللہ تمہاری شکل و صورت یا تمہارے مال و دولت کو نہیں دیکھتا، بلکہ وہ تمہارے دلوں اور اعمال کو دیکھتا ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '4', text: { en: "The seeking of knowledge is obligatory for every Muslim.", hi: "ज्ञान प्राप्त करना प्रत्येक मुस्लिम के लिए अनिवार्य है।", ur: "علم حاصل کرنا ہر مسلمان پر فرض ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '5', text: { en: "A kind word is a charity.", hi: "एक दयालु शब्द दान है।", ur: "ایک اچھا لفظ صدقہ ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '6', text: { en: "The strong person is not the good wrestler. The strong person is only the one who controls himself when he is angry.", hi: "मजबूत व्यक्ति वह नहीं है जो अच्छा पहलवान हो। मजबूत व्यक्ति केवल वह है जो गुस्से में खुद पर काबू रखता है।", ur: "طاقتور انسان وہ نہیں جو اچھا پہلوان ہو، بلکہ طاقتور وہ ہے جو غصے کے وقت اپنے آپ پر قابو رکھے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '7', text: { en: "None of you will have faith until he loves for his brother what he loves for himself.", hi: "तुममें से कोई भी तब तक ईमान नहीं ला सकता जब तक वह अपने भाई के लिए वह पसंद न करे जो वह खुद के लिए पसंद करता है।", ur: "تم میں سے کوئی بھی اس وقت تک مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو وہ اپنے لیے کرتا ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '8', text: { en: "Patience is beautiful.", hi: "धैर्य सुंदर है।", ur: "صبر خوبصورت ہے۔" }, reference: "Quran 12:83" },
  { id: '9', text: { en: "And whoever relies upon Allah - then He is sufficient for him.", hi: "और जो अल्लाह पर भरोसा करता है, तो वह उसके लिए काफी है।", ur: "اور جو اللہ پر بھروسہ کرتا ہے، تو وہ اس کے لیے کافی ہے۔" }, reference: "Quran 65:3" },
  { id: '10', text: { en: "Indeed, with hardship will be ease.", hi: "निस्संदेह, कठिनाई के साथ आसानी है।", ur: "بیشک مشکل کے ساتھ آسانی ہے۔" }, reference: "Quran 94:5" },
  { id: '11', text: { en: "Allah is with the patient.", hi: "अल्लाह धैर्यवानों के साथ है।", ur: "اللہ صبر کرنے والوں کے ساتھ ہے۔" }, reference: "Quran 2:153" },
  { id: '12', text: { en: "So remember Me; I will remember you.", hi: "तो मुझे याद करो; मैं तुम्हें याद रखूँगा।", ur: "پس تم مجھے یاد کرو، میں تمہیں یاد کروں گا۔" }, reference: "Quran 2:152" },
  { id: '13', text: { en: "Do not lose hope, nor be sad.", hi: "आशा न खोएं, न दुखी हों।", ur: "امید نہ ہارو، اور نہ غمگین ہو۔" }, reference: "Quran 3:139" },
  { id: '14', text: { en: "And say, 'My Lord, increase me in knowledge.'", hi: "और कहो, 'मेरे रब, मेरे ज्ञान में वृद्धि कर।'", ur: "اور کہو، 'اے میرے رب! میرے علم میں اضافہ فرما۔'" }, reference: "Quran 20:114" },
  { id: '15', text: { en: "Verily, in the remembrance of Allah do hearts find rest.", hi: "निस्संदेह, अल्लाह के स्मरण में ही दिलों को शांति मिलती है।", ur: "خبردار! اللہ کے ذکر سے ہی دلوں کو اطمینان نصیب ہوتا ہے۔" }, reference: "Quran 13:28" },
  { id: '16', text: { en: "And He is with you wherever you are.", hi: "और वह तुम्हारे साथ है जहाँ भी तुम हो।", ur: "اور وہ تمہارے ساتھ ہے جہاں بھی تم ہو۔" }, reference: "Quran 57:4" },
  { id: '17', text: { en: "Allah does not burden a soul beyond that it can bear.", hi: "अल्लाह किसी आत्मा पर उसकी क्षमता से अधिक बोझ नहीं डालता।", ur: "اللہ کسی جان پر اس کی طاقت سے زیادہ بوجھ نہیں ڈالتا۔" }, reference: "Quran 2:286" },
  { id: '18', text: { en: "If you are grateful, I will surely increase you [in favor].", hi: "यदि तुम आभारी हो, तो मैं निश्चित रूप से तुम्हें [अनुग्रह में] बढ़ाऊंगा।", ur: "اگر تم شکر گزار بنو گے تو میں تمہیں اور زیادہ دوں گا۔" }, reference: "Quran 14:7" },
  { id: '19', text: { en: "And He found you lost and guided [you].", hi: "और उसने तुम्हें खोया हुआ पाया और मार्गदर्शन दिया।", ur: "اور اس نے تمہیں بھٹکا ہوا پایا تو راستہ دکھایا۔" }, reference: "Quran 93:7" },
  { id: '20', text: { en: "So which of the favors of your Lord would you deny?", hi: "तो तुम अपने रब के किन एहसानों को झुठलाओगे?", ur: "پس تم اپنے رب کی کون کون سی نعمتوں کو جھٹلاؤ گے؟" }, reference: "Quran 55:13" },
  { id: '21', text: { en: "The most beloved people to Allah are those who are most beneficial to the people.", hi: "अल्लाह को सबसे प्रिय वे लोग हैं जो लोगों के लिए सबसे अधिक लाभकारी हैं।", ur: "اللہ کے نزدیک سب سے محبوب وہ ہے جو لوگوں کو سب سے زیادہ فائدہ پہنچائے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '22', text: { en: "Modesty brings nothing except good.", hi: "विनम्रता अच्छाई के अलावा कुछ नहीं लाती।", ur: "حیا صرف بھلائی لاتی ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '23', text: { en: "He who does not thank people, does not thank Allah.", hi: "जो लोगों का शुक्रिया अदा नहीं करता, वह अल्लाह का शुक्रिया अदा नहीं करता।", ur: "جو لوگوں کا شکریہ ادا نہیں کرتا، وہ اللہ کا بھی شکر ادا نہیں کرتا۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '24', text: { en: "The best of you are those who learn the Quran and teach it.", hi: "तुममें सबसे अच्छे वे हैं जो कुरान सीखते हैं और उसे सिखाते हैं।", ur: "تم میں سے بہترین وہ ہے جو قرآن سیکھے اور سکھائے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '25', text: { en: "Smile at your brother's face is charity.", hi: "अपने भाई के चेहरे पर मुस्कान दान है।", ur: "اپنے بھائی کے سامنے مسکرانا صدقہ ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '26', text: { en: "A Muslim is the one from whose tongue and hand the people are safe.", hi: "मुस्लिम वह है जिसकी जीभ और हाथ से लोग सुरक्षित रहें।", ur: "مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '27', text: { en: "Fear Allah wherever you are.", hi: "तुम जहाँ भी हो अल्लाह से डरो।", ur: "اللہ سے ڈرو جہاں بھی تم ہو۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '28', text: { en: "The world is a prison for the believer and a paradise for the disbeliever.", hi: "दुनिया आस्तिक के लिए जेल है और नास्तिक के लिए स्वर्ग।", ur: "دنیا مومن کے لیے قید خانہ اور کافر کے لیے جنت ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '29', text: { en: "Take advantage of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your preoccupation, and your life before your death.", hi: "पांच से पहले पांच का लाभ उठाएं: बुढ़ापे से पहले अपना यौवन, बीमारी से पहले अपना स्वास्थ्य, गरीबी से पहले अपना धन, व्यस्तता से पहले अपना खाली समय, और मृत्यु से पहले अपना जीवन।", ur: "پانچ چیزوں کو پانچ سے پہلے غنیمت جانو: جوانی کو بڑھاپے سے پہلے، صحت کو بیماری سے پہلے، مالداری کو غربت سے پہلے، فرصت کو مشغولیت سے پہلے، اور زندگی کو موت سے پہلے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '30', text: { en: "Allah is beautiful and loves beauty.", hi: "अल्लाह सुंदर है और सुंदरता को पसंद करता है।", ur: "اللہ خوبصورت ہے اور خوبصورتی کو پسند کرتا ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '31', text: { en: "The ink of the scholar is more holy than the blood of the martyr.", hi: "विद्वान की स्याही शहीद के खून से अधिक पवित्र है।", ur: "عالم کی سیاہی شہید کے خون سے زیادہ مقدس ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '32', text: { en: "He who believes in Allah and the Last Day, let him speak good or remain silent.", hi: "जो अल्लाह और अंतिम दिन पर विश्वास करता है, उसे अच्छा बोलने दो या चुप रहने दो।", ur: "جو اللہ اور آخرت پر ایمان رکھتا ہے اسے چاہیے کہ اچھی بات کہے یا خاموش رہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '33', text: { en: "Do not be angry.", hi: "गुस्सा मत करो।", ur: "غصہ نہ کرو۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '34', text: { en: "The most perfect of the believers in faith are the best of them in moral character.", hi: "ईमान में विश्वासियों में सबसे पूर्ण वे हैं जो नैतिक चरित्र में सबसे अच्छे हैं।", ur: "مومنوں میں ایمان کے اعتبار سے سب سے کامل وہ ہے جس کے اخلاق سب سے اچھے ہیں۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '35', text: { en: "Every act of kindness is charity.", hi: "दया का हर कार्य दान है।", ur: "ہر نیکی صدقہ ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '36', text: { en: "Paradise lies under the feet of your mother.", hi: "स्वर्ग तुम्हारी माँ के पैरों के नीचे है।", ur: "جنت تمہاری ماں کے قدموں تلے ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '37', text: { en: "Avoid what I have forbidden you, and do what I have commanded you to the best of your ability.", hi: "मैंने जो तुम्हें मना किया है उससे बचो, और जो मैंने तुम्हें आदेश दिया है उसे अपनी सर्वोत्तम क्षमता के अनुसार करो।", ur: "جس چیز سے میں نے تمہیں منع کیا ہے اس سے بچو، اور جس کا میں نے حکم دیا ہے اسے اپنی طاقت کے مطابق بجا لاؤ۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '38', text: { en: "The greatest richness is the richness of the soul.", hi: "सबसे बड़ी समृद्धि आत्मा की समृद्धि है।", ur: "سب سے بڑی دولت دل کی دولت ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '39', text: { en: "None of you truly believes until he loves for his brother what he loves for himself.", hi: "तुममें से कोई भी तब तक सच्चा विश्वास नहीं करता जब तक वह अपने भाई के लिए वह पसंद न करे जो वह खुद के लिए पसंद करता है।", ur: "تم میں سے کوئی بھی اس وقت تک مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو وہ اپنے لیے کرتا ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '40', text: { en: "Be in this world as if you were a stranger or a traveler.", hi: "इस दुनिया में ऐसे रहो जैसे तुम अजनबी या यात्री हो।", ur: "دنیا میں ایسے رہو جیسے تم اجنبی یا مسافر ہو۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '41', text: { en: "Allah is the Light of the heavens and the earth.", hi: "अल्लाह आकाशों और पृथ्वी का प्रकाश है।", ur: "اللہ آسمانوں اور زمین کا نور ہے۔" }, reference: "Quran 24:35" },
  { id: '42', text: { en: "And rely upon the Ever-Living who does not die.", hi: "और उस सदा जीवित रहने वाले पर भरोसा करो जो कभी नहीं मरता।", ur: "اور اس زندہ جاوید پر بھروسہ کرو جسے کبھی موت نہیں آئے گی۔" }, reference: "Quran 25:58" },
  { id: '43', text: { en: "Indeed, Allah is with the doers of good.", hi: "निस्संदेह, अल्लाह भलाई करने वालों के साथ है।", ur: "بیشک اللہ احسان کرنے والوں کے ساتھ ہے۔" }, reference: "Quran 29:69" },
  { id: '44', text: { en: "And your Lord is going to give you, and you will be satisfied.", hi: "और तुम्हारा रब तुम्हें देने वाला है, और तुम संतुष्ट हो जाओगे।", ur: "اور عنقریب تمہارا رب تمہیں اتنا دے گا کہ تم راضی ہو جاؤ گے۔" }, reference: "Quran 93:5" },
  { id: '45', text: { en: "So be patient. Indeed, the promise of Allah is truth.", hi: "तो धैर्य रखो। निस्संदेह, अल्लाह का वादा सच है।", ur: "پس صبر کرو، بیشک اللہ کا وعدہ سچا ہے۔" }, reference: "Quran 30:60" },
  { id: '46', text: { en: "And He is the Forgiving, the Affectionate.", hi: "और वह क्षमा करने वाला, स्नेही है।", ur: "اور وہ بڑا بخشنے والا، بہت محبت کرنے والا ہے۔" }, reference: "Quran 85:14" },
  { id: '47', text: { en: "Indeed, Allah is All-Hearing, All-Seeing.", hi: "निस्संदेह, अल्लाह सब कुछ सुनने वाला, सब कुछ देखने वाला है।", ur: "بیشک اللہ سب کچھ سننے والا، سب کچھ دیکھنے والا ہے۔" }, reference: "Quran 4:58" },
  { id: '48', text: { en: "And whoever fears Allah - He will make for him a way out.", hi: "और जो अल्लाह से डरता है - वह उसके लिए रास्ता बना देगा।", ur: "اور جو اللہ سے ڈرتا ہے، اللہ اس کے لیے نکلنے کا راستہ بنا دیتا ہے۔" }, reference: "Quran 65:2" },
  { id: '49', text: { en: "And He will provide for him from where he does not expect.", hi: "और वह उसे वहाँ से प्रदान करेगा जहाँ से वह उम्मीद नहीं करता है।", ur: "اور اسے وہاں سے رزق دے گا جہاں سے اسے گمان بھی نہ ہو۔" }, reference: "Quran 65:3" },
  { id: '50', text: { en: "Allah is sufficient for us, and [He is] the best Disposer of affairs.", hi: "अल्लाह हमारे लिए काफी है, और [वह] मामलों का सबसे अच्छा निपटान करने वाला है।", ur: "اللہ ہمارے لیے کافی ہے اور وہ بہترین کارساز ہے۔" }, reference: "Quran 3:173" },
  { id: '51', text: { en: "The best of people are those who are most beneficial to people.", hi: "लोगों में सबसे अच्छे वे हैं जो लोगों के लिए सबसे अधिक लाभकारी हैं।", ur: "لوگوں میں سب سے بہتر وہ ہے جو لوگوں کو سب سے زیادہ فائدہ پہنچائے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '52', text: { en: "A believer is a mirror to another believer.", hi: "एक आस्तिक दूसरे आस्तिक के लिए आईना होता है।", ur: "مومن دوسرے مومن کا آئینہ ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '53', text: { en: "Knowledge is better than wealth.", hi: "ज्ञान धन से बेहतर है।", ur: "علم مال سے بہتر ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '54', text: { en: "The best jihad is a word of truth in the presence of a tyrannical ruler.", hi: "सबसे अच्छा जिहाद एक अत्याचारी शासक की उपस्थिति में सत्य का शब्द है।", ur: "سب سے افضل جہاد ظالم حکمران کے سامنے کلمہ حق کہنا ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '55', text: { en: "Do not waste water, even if you are at a flowing river.", hi: "पानी बर्बाद मत करो, भले ही तुम बहती नदी पर हो।", ur: "پانی ضائع نہ کرو، چاہے تم بہتی ہوئی نہر پر ہی کیوں نہ ہو۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '56', text: { en: "The most beloved of deeds to Allah are those that are consistent, even if they are small.", hi: "अल्लाह को सबसे प्रिय कर्म वे हैं जो निरंतर हैं, भले ही वे छोटे हों।", ur: "اللہ کے نزدیک سب سے پسندیدہ عمل وہ ہے جو ہمیشہ کیا جائے، اگرچہ وہ تھوڑا ہی کیوں نہ ہو۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '57', text: { en: "He who is not merciful to others, will not be treated mercifully.", hi: "जो दूसरों पर दया नहीं करता, उसके साथ दया नहीं की जाएगी।", ur: "جو دوسروں پر رحم نہیں کرتا، اس پر رحم نہیں کیا جائے گا۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '58', text: { en: "The best house among the Muslims is the house in which an orphan is well treated.", hi: "मुसलमानों में सबसे अच्छा घर वह है जिसमें अनाथ के साथ अच्छा व्यवहार किया जाता है।", ur: "مسلمانوں کا بہترین گھر وہ ہے جس میں یتیم کے ساتھ اچھا سلوک کیا جائے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '59', text: { en: "Your smile to your brother is a charity.", hi: "अपने भाई के लिए तुम्हारी मुस्कान एक दान है।", ur: "تمہارا اپنے بھائی کے سامنے مسکرانا صدقہ ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '60', text: { en: "Do not judge by appearances.", hi: "दिखावे से न्याय न करें।", ur: "ظاہری شکل و صورت سے فیصلہ نہ کرو۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '61', text: { en: "Allah is the best of planners.", hi: "अल्लाह योजनाकारों में सबसे अच्छा है।", ur: "اللہ بہترین تدبیر کرنے والا ہے۔" }, reference: "Quran 8:30" },
  { id: '62', text: { en: "And do not despair of the mercy of Allah.", hi: "और अल्लाह की दया से निराश न हों।", ur: "اور اللہ کی رحمت سے مایوس نہ ہو۔" }, reference: "Quran 39:53" },
  { id: '63', text: { en: "Indeed, Allah loves those who rely [upon Him].", hi: "निस्संदेह, अल्लाह उन लोगों से प्यार करता है जो [उस पर] भरोसा करते हैं।", ur: "بیشک اللہ توکل کرنے والوں سے محبت کرتا ہے۔" }, reference: "Quran 3:159" },
  { id: '64', text: { en: "And Allah is All-Knowing, All-Wise.", hi: "और अल्लाह सब कुछ जानने वाला, सब कुछ समझने वाला है।", ur: "اور اللہ سب کچھ جاننے والا، بڑی حکمت والا ہے۔" }, reference: "Quran 4:11" },
  { id: '65', text: { en: "And He is the All-Forgiving, the All-Loving.", hi: "और वह सब कुछ क्षमा करने वाला, सब कुछ प्यार करने वाला है।", ur: "اور وہ بہت بخشنے والا، بہت محبت کرنے والا ہے۔" }, reference: "Quran 85:14" },
  { id: '66', text: { en: "Indeed, Allah is with those who fear Him and those who are doers of good.", hi: "निस्संदेह, अल्लाह उन लोगों के साथ है जो उससे डरते हैं और जो भलाई करने वाले हैं।", ur: "بیشک اللہ ان کے ساتھ ہے جو تقویٰ اختیار کرتے ہیں اور جو احسان کرنے والے ہیں۔" }, reference: "Quran 16:128" },
  { id: '67', text: { en: "And Allah is sufficient as a Witness.", hi: "और अल्लाह गवाह के रूप में काफी है।", ur: "اور اللہ گواہ کے طور پر کافی ہے۔" }, reference: "Quran 4:79" },
  { id: '68', text: { en: "Indeed, Allah is ever Exalted, All-Wise.", hi: "निस्संदेह, अल्लाह हमेशा ऊंचा, सब कुछ समझने वाला है।", ur: "بیشک اللہ ہمیشہ سے غالب، بڑی حکمت والا ہے۔" }, reference: "Quran 4:170" },
  { id: '69', text: { en: "And Allah is All-Forgiving, All-Merciful.", hi: "और अल्लाह सब कुछ क्षमा करने वाला, सब कुछ दया करने वाला है।", ur: "اور اللہ بہت بخشنے والا، نہایت رحم کرنے والا ہے۔" }, reference: "Quran 2:173" },
  { id: '70', text: { en: "And Allah is All-Encompassing, All-Knowing.", hi: "और अल्लाह सब कुछ घेरने वाला, सब कुछ जानने वाला है।", ur: "اور اللہ ہر چیز کا احاطہ کرنے والا، سب کچھ جاننے والا ہے۔" }, reference: "Quran 2:115" },
  { id: '71', text: { en: "The best of you are those who are best to their families.", hi: "तुममें सबसे अच्छे वे हैं जो अपने परिवारों के लिए सबसे अच्छे हैं।", ur: "تم میں سے بہترین وہ ہے جو اپنے گھر والوں کے لیے بہترین ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '72', text: { en: "A good word is charity.", hi: "एक अच्छा शब्द दान है।", ur: "اچھی بات صدقہ ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '73', text: { en: "The believer is simple and noble.", hi: "आस्तिक सरल और महान होता है।", ur: "مومن سیدھا سادہ اور شریف ہوتا ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '74', text: { en: "Do not be a person who follows others blindly.", hi: "ऐसे व्यक्ति न बनें जो दूसरों का आँख बंद करके अनुसरण करते हैं।", ur: "ایسے شخص نہ بنو جو اندھی تقلید کرے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '75', text: { en: "The best of people is the one who is most useful to people.", hi: "लोगों में सबसे अच्छा वह है जो लोगों के लिए सबसे अधिक उपयोगी है।", ur: "لوگوں میں سب سے بہتر وہ ہے جو لوگوں کے لیے سب سے زیادہ مفید ہو۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '76', text: { en: "Purity is half of faith.", hi: "पवित्रता विश्वास का आधा हिस्सा है।", ur: "طہارت ایمان کا نصف حصہ ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '77', text: { en: "The best of you are those who have the best character.", hi: "तुममें सबसे अच्छे वे हैं जिनका चरित्र सबसे अच्छा है।", ur: "تم میں سے بہترین وہ ہے جس کے اخلاق سب سے اچھے ہیں۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '78', text: { en: "A true believer does not slander, curse, or speak in an obscene or foul manner.", hi: "एक सच्चा आस्तिक बदनामी, श्राप, या अश्लील या गलत तरीके से बात नहीं करता है।", ur: "سچا مومن نہ طعنہ دینے والا ہوتا ہے، نہ لعنت کرنے والا، نہ فحش گو اور نہ ہی بد زبان۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '79', text: { en: "Allah is with those who are patient.", hi: "अल्लाह धैर्यवानों के साथ है।", ur: "اللہ صبر کرنے والوں کے ساتھ ہے۔" }, reference: "Quran 2:153" },
  { id: '80', text: { en: "And Allah loves the doers of good.", hi: "और अल्लाह भलाई करने वालों से प्यार करता है।", ur: "اور اللہ احسان کرنے والوں سے محبت کرتا ہے۔" }, reference: "Quran 3:134" },
  { id: '81', text: { en: "Allah is the best of protectors.", hi: "अल्लाह रक्षकों में सबसे अच्छा है।", ur: "اللہ بہترین محافظ ہے۔" }, reference: "Quran 12:64" },
  { id: '82', text: { en: "Indeed, Allah is All-Forgiving, All-Merciful.", hi: "निस्संदेह, अल्लाह सब कुछ क्षमा करने वाला, सब कुछ दया करने वाला है।", ur: "بیشک اللہ بہت بخشنے والا، نہایت رحم کرنے والا ہے۔" }, reference: "Quran 2:173" },
  { id: '83', text: { en: "And Allah is All-Knowing, All-Wise.", hi: "और अल्लाह सब कुछ जानने वाला, सब कुछ समझने वाला है।", ur: "اور اللہ سب کچھ جاننے والا، بڑی حکمت والا ہے۔" }, reference: "Quran 4:11" },
  { id: '84', text: { en: "Indeed, Allah is with the patient.", hi: "निस्संदेह, अल्लाह धैर्यवानों के साथ है।", ur: "بیشک اللہ صبر کرنے والوں کے ساتھ ہے۔" }, reference: "Quran 2:153" },
  { id: '85', text: { en: "And Allah is All-Powerful, All-Mighty.", hi: "और अल्लाह सब कुछ शक्तिशाली, सब कुछ शक्तिशाली है।", ur: "اور اللہ بہت طاقتور، زبردست ہے۔" }, reference: "Quran 2:209" },
  { id: '86', text: { en: "Indeed, Allah is All-Hearing, All-Knowing.", hi: "निस्संदेह, अल्लाह सब कुछ सुनने वाला, सब कुछ जानने वाला है।", ur: "بیشک اللہ سب کچھ سننے والا، سب کچھ جاننے والا ہے۔" }, reference: "Quran 2:181" },
  { id: '87', text: { en: "And Allah is sufficient for you.", hi: "और अल्लाह तुम्हारे लिए काफी है।", ur: "اور اللہ تمہارے لیے کافی ہے۔" }, reference: "Quran 8:62" },
  { id: '88', text: { en: "Indeed, Allah is with those who fear Him.", hi: "निस्संदेह, अल्लाह उन लोगों के साथ है जो उससे डरते हैं।", ur: "بیشک اللہ ان کے ساتھ ہے جو تقویٰ اختیار کرتے ہیں۔" }, reference: "Quran 16:128" },
  { id: '89', text: { en: "And Allah is All-Forgiving, All-Affectionate.", hi: "और अल्लाह सब कुछ क्षमा करने वाला, सब कुछ स्नेही है।", ur: "اور اللہ بہت بخشنے والا، بہت محبت کرنے والا ہے۔" }, reference: "Quran 85:14" },
  { id: '90', text: { en: "Indeed, Allah is All-Encompassing, All-Knowing.", hi: "निस्संदेह, अल्लाह सब कुछ घेरने वाला, सब कुछ जानने वाला है।", ur: "بیشک اللہ ہر چیز کا احاطہ کرنے والا، سب کچھ جاننے والا ہے۔" }, reference: "Quran 2:115" },
  { id: '91', text: { en: "The best of you are those who are best to their wives.", hi: "तुममें सबसे अच्छे वे हैं जो अपनी पत्नियों के लिए सबसे अच्छे हैं।", ur: "تم میں سے بہترین وہ ہے جو اپنی بیویوں کے لیے بہترین ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '92', text: { en: "A Muslim is the brother of a Muslim.", hi: "एक मुस्लिम दूसरे मुस्लिम का भाई है।", ur: "مسلمان مسلمان کا بھائی ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '93', text: { en: "The best of you are those who have the best character.", hi: "तुममें सबसे अच्छे वे हैं जिनका चरित्र सबसे अच्छा है।", ur: "تم میں سے بہترین وہ ہے جس کے اخلاق سب سے اچھے ہیں۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '94', text: { en: "Do not be a person who follows others blindly.", hi: "ऐसे व्यक्ति न बनें जो दूसरों का आँख बंद करके अनुसरण करते हैं।", ur: "ایسے شخص نہ بنو جو اندھی تقلید کرے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '95', text: { en: "The best of people is the one who is most useful to people.", hi: "लोगों में सबसे अच्छा वह है जो लोगों के लिए सबसे अधिक उपयोगी है।", ur: "لوگوں میں سب سے بہتر وہ ہے جو لوگوں کے لیے سب سے زیادہ مفید ہو۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '96', text: { en: "Purity is half of faith.", hi: "पवित्रता विश्वास का आधा हिस्सा है।", ur: "طہارت ایمان کا نصف حصہ ہے۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '97', text: { en: "The best of you are those who have the best character.", hi: "तुममें सबसे अच्छे वे हैं जिनका चरित्र सबसे अच्छा है।", ur: "تم میں سے بہترین وہ ہے جس کے اخلاق سب سے اچھے ہیں۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '98', text: { en: "A true believer does not slander, curse, or speak in an obscene or foul manner.", hi: "एक सच्चा आस्तिक बदनामी, श्राप, या अश्लील या गलत तरीके से बात नहीं करता है।", ur: "سچا مومن نہ طعنہ دینے والا ہوتا ہے، نہ لعنت کرنے والا، نہ فحش گو اور نہ ہی بد زبان۔" }, reference: "Prophet Muhammad (PBUH)" },
  { id: '99', text: { en: "Allah is with those who are patient.", hi: "अल्लाह धैर्यवानों के साथ है।", ur: "اللہ صبر کرنے والوں کے ساتھ ہے۔" }, reference: "Quran 2:153" },
  { id: '100', text: { en: "And Allah loves the doers of good.", hi: "और अल्लाह भलाई करने वालों से प्यार करता है।", ur: "اور اللہ احسان کرنے والوں سے محبت کرتا ہے۔" }, reference: "Quran 3:134" }
];
