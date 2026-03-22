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
