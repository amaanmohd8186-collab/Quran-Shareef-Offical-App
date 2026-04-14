import React, { useState } from 'react';
import { BookOpen, RefreshCcw, Quote, Languages, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView } from '../types';

const BILINGUAL_HADITHS = [
  {
    en: "The best among you are those who have the best manners and character.",
    hi: "तुम में से सबसे अच्छे वे हैं जिनके शिष्टाचार और चरित्र सबसे अच्छे हैं।",
    ref: "Sahih Bukhari 6035"
  },
  {
    en: "None of you will have faith until he wishes for his brother what he likes for himself.",
    hi: "तुम में से कोई भी तब तक ईमान वाला नहीं हो सकता जब तक कि वह अपने भाई के लिए वही पसंद न करे जो वह अपने लिए पसंद करता है।",
    ref: "Sahih Bukhari 13"
  },
  {
    en: "The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself while in anger.",
    hi: "शक्तिशाली वह नहीं है जो अपनी ताकत से लोगों पर विजय प्राप्त करता है, बल्कि शक्तिशाली वह है जो क्रोध के समय स्वयं पर नियंत्रण रखता है।",
    ref: "Sahih Bukhari 6114"
  },
  {
    en: "A good word is charity.",
    hi: "एक अच्छी बात कहना भी सदका (दान) है।",
    ref: "Sahih Bukhari 2989"
  },
  {
    en: "Allah does not look at your appearance or your wealth, but He looks at your hearts and your deeds.",
    hi: "अल्लाह तुम्हारे रूप या तुम्हारी संपत्ति को नहीं देखता, बल्कि वह तुम्हारे दिलों और तुम्हारे कर्मों को देखता है।",
    ref: "Sahih Muslim 2564"
  },
  {
    en: "The most beloved of deeds to Allah are those that are most consistent, even if they are small.",
    hi: "अल्लाह को सबसे प्रिय वे कर्म हैं जो सबसे निरंतर होते हैं, भले ही वे छोटे हों।",
    ref: "Sahih Bukhari 6465"
  },
  {
    en: "Every act of kindness is a charity.",
    hi: "दयालुता का प्रत्येक कार्य सदका (दान) है।",
    ref: "Sahih Bukhari 6021"
  },
  {
    en: "Modesty is part of faith.",
    hi: "हया (विनम्रता) ईमान का हिस्सा है।",
    ref: "Sahih Bukhari 24"
  },
  {
    en: "Cleanliness is half of faith.",
    hi: "सफाई ईमान का आधा हिस्सा है।",
    ref: "Sahih Muslim 223"
  },
  {
    en: "The best of you are those who learn the Quran and teach it.",
    hi: "तुम में से सबसे अच्छे वे हैं जो कुरान सीखते हैं और उसे सिखाते हैं।",
    ref: "Sahih Bukhari 5027"
  },
  {
    en: "A Muslim is the one from whose tongue and hands the Muslims are safe.",
    hi: "मुसलमान वह है जिसकी जुबान और हाथ से दूसरे मुसलमान सुरक्षित रहें।",
    ref: "Sahih Bukhari 10"
  },
  {
    en: "He who does not show mercy to others, will not be shown mercy.",
    hi: "जो दूसरों पर दया नहीं करता, उस पर दया नहीं की जाएगी।",
    ref: "Sahih Bukhari 5997"
  },
  {
    en: "The upper hand is better than the lower hand (the one that gives is better than the one that takes).",
    hi: "ऊपर वाला हाथ नीचे वाले हाथ से बेहतर है (देने वाला लेने वाले से बेहतर है)।",
    ref: "Sahih Bukhari 1429"
  },
  {
    en: "Avoid suspicion, for suspicion is the worst of false tales.",
    hi: "संदेह से बचो, क्योंकि संदेह सबसे बुरी झूठी बात है।",
    ref: "Sahih Bukhari 6064"
  },
  {
    en: "The world is a prison for the believer and a paradise for the disbeliever.",
    hi: "दुनिया मोमिन (आस्तिक) के लिए कैदखाना है और काफिर (नास्तिक) के लिए जन्नत है।",
    ref: "Sahih Muslim 2956"
  },
  {
    en: "Riches are not from an abundance of worldly goods, but from a contented mind.",
    hi: "अमीरी सांसारिक वस्तुओं की प्रचुरता से नहीं, बल्कि संतुष्ट मन से होती है।",
    ref: "Sahih Bukhari 6446"
  },
  {
    en: "He who believes in Allah and the Last Day should honor his guest.",
    hi: "जो अल्लाह और कयामत के दिन पर विश्वास करता है उसे अपने मेहमान का सम्मान करना चाहिए।",
    ref: "Sahih Bukhari 6018"
  },
  {
    en: "The most perfect man in his faith among the believers is the one whose behavior is most excellent.",
    hi: "मोमिनों में अपने ईमान में सबसे पूर्ण वह है जिसका व्यवहार सबसे उत्कृष्ट है।",
    ref: "Tirmidhi 1162"
  },
  {
    en: "The seeking of knowledge is obligatory for every Muslim.",
    hi: "ज्ञान प्राप्त करना प्रत्येक मुसलमान के लिए अनिवार्य है।",
    ref: "Ibn Majah 224"
  },
  {
    en: "Paradise lies under the feet of your mother.",
    hi: "जन्नत तुम्हारी माँ के पैरों के नीचे है।",
    ref: "Nasai 3104"
  },
  {
    en: "The best of you is the one who is best to his wife.",
    hi: "तुम में से सबसे अच्छा वह है जो अपनी पत्नी के लिए सबसे अच्छा है।",
    ref: "Tirmidhi 1162"
  },
  {
    en: "The most beloved of people to Allah is the one who brings most benefit to people.",
    hi: "अल्लाह को सबसे प्रिय वह व्यक्ति है जो लोगों को सबसे अधिक लाभ पहुँचाता है।",
    ref: "Tabarani"
  },
  {
    en: "He who is not grateful to people is not grateful to Allah.",
    hi: "जो लोगों का शुक्रगुजार नहीं है, वह अल्लाह का भी शुक्रगुजार नहीं है।",
    ref: "Tirmidhi 1954"
  },
  {
    en: "A Muslim is a brother of another Muslim, so he should not oppress him, nor should he hand him over to an oppressor.",
    hi: "एक मुसलमान दूसरे मुसलमान का भाई है, इसलिए उसे न तो उस पर जुल्म करना चाहिए और न ही उसे किसी जालिम के हवाले करना चाहिए।",
    ref: "Sahih Bukhari 2442"
  },
  {
    en: "The best charity is that which is given by one who has little.",
    hi: "सबसे अच्छा सदका वह है जो उस व्यक्ति द्वारा दिया जाता है जिसके पास बहुत कम है।",
    ref: "Abu Dawud 1677"
  },
  {
    en: "He who has in his heart as much as a grain of mustard seed of pride will not enter Paradise.",
    hi: "जिसके दिल में राई के दाने के बराबर भी घमंड होगा, वह जन्नत में दाखिल नहीं होगा।",
    ref: "Sahih Muslim 91"
  },
  {
    en: "The most beloved of places to Allah are the mosques.",
    hi: "अल्लाह को सबसे प्रिय स्थान मस्जिदें हैं।",
    ref: "Sahih Muslim 671"
  },
  {
    en: "The prayer in congregation is twenty-seven times superior to the prayer offered by person alone.",
    hi: "जमात (समूह) में नमाज अकेले पढ़ी गई नमाज से सत्ताइस गुना बेहतर है।",
    ref: "Sahih Bukhari 645"
  },
  {
    en: "The key to Paradise is prayer.",
    hi: "जन्नत की चाबी नमाज है।",
    ref: "Tirmidhi 4"
  },
  {
    en: "Fasting is a shield.",
    hi: "रोजा एक ढाल है।",
    ref: "Sahih Bukhari 1894"
  },
  {
    en: "The best of you are those who are best in paying off their debts.",
    hi: "तुम में से सबसे अच्छे वे हैं जो अपना कर्ज चुकाने में सबसे अच्छे हैं।",
    ref: "Sahih Bukhari 2305"
  },
  {
    en: "A believer is not bitten from the same hole twice.",
    hi: "एक मोमिन एक ही बिल से दो बार नहीं डसा जाता।",
    ref: "Sahih Bukhari 6133"
  },
  {
    en: "The most hated of lawful things to Allah is divorce.",
    hi: "अल्लाह को हलाल चीजों में सबसे ज्यादा नापसंद तलाक है।",
    ref: "Abu Dawud 2178"
  },
  {
    en: "Truthfulness leads to righteousness, and righteousness leads to Paradise.",
    hi: "सच्चाई नेकी की ओर ले जाती है, और नेकी जन्नत की ओर ले जाती है।",
    ref: "Sahih Bukhari 6094"
  },
  {
    en: "Richness is not having many possessions, but richness is being content with oneself.",
    hi: "अमीरी बहुत अधिक संपत्ति होने से नहीं, बल्कि स्वयं से संतुष्ट होने से है।",
    ref: "Sahih Bukhari 6446"
  },
  {
    en: "The best of you are those who are best to their families.",
    hi: "तुम में से सबसे अच्छे वे हैं जो अपने परिवार के लिए सबसे अच्छे हैं।",
    ref: "Tirmidhi 3895"
  },
  {
    en: "Allah is Beautiful and He loves beauty.",
    hi: "अल्लाह खूबसूरत है और वह खूबसूरती को पसंद करता है।",
    ref: "Sahih Muslim 91"
  },
  {
    en: "The most beloved of speech to Allah is: SubhanAllah wa bihamdihi.",
    hi: "अल्लाह को सबसे प्रिय शब्द हैं: सुभानअल्लाह व बिहम्दिही।",
    ref: "Sahih Muslim 2731"
  }
];

interface HadithViewProps {
  setActiveView: (view: AppView) => void;
}

export default function HadithView({ setActiveView }: HadithViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const nextHadith = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % BILINGUAL_HADITHS.length);
      setLoading(false);
    }, 500);
  };

  const currentHadith = BILINGUAL_HADITHS[currentIndex];

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <button 
        onClick={() => setActiveView('home')}
        className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline w-fit mb-6"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-serif text-islamic-green dark:text-emerald-400">Bilingual Hadith</h2>
          <p className="text-slate-500 dark:text-slate-400 italic">Wisdom in English & Hindi (हिंदी).</p>
        </div>
        <button 
          onClick={nextHadith}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-islamic-green dark:text-emerald-400 hover:bg-islamic-green/5 dark:bg-emerald-500/10 transition-all disabled:opacity-50 shadow-sm"
        >
          <RefreshCcw className={cn("w-4 h-4", loading ? "animate-spin" : "")} />
          <span className="font-bold text-sm uppercase tracking-widest">Next Hadith</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-6"
          >
            {/* English Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-islamic-green dark:text-emerald-400/5 -rotate-12" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-islamic-green dark:text-emerald-400/40">
                    <Languages className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">English</span>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-slate-800 dark:text-slate-200 leading-relaxed italic">
                  "{currentHadith.en}"
                </h3>
              </div>
            </div>

            {/* Hindi Card */}
            <div className="bg-islamic-green/5 dark:bg-emerald-500/10 border border-islamic-green/10 p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-islamic-green dark:text-emerald-400/5 -rotate-12" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-islamic-green dark:text-emerald-400/40">
                    <Languages className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Hindi • हिंदी</span>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-islamic-green dark:text-emerald-400 leading-relaxed italic">
                  "{currentHadith.hi}"
                </h3>
              </div>
            </div>

            <div className="text-center">
              <p className="text-slate-400 text-xs uppercase tracking-widest">Source Reference</p>
              <p className="text-islamic-green dark:text-emerald-400 font-serif font-bold text-lg">{currentHadith.ref}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
