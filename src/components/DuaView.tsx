import React, { useState } from 'react';
import { Heart, Star, CloudMoon, Sun, ShieldCheck, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const CATEGORIES = ['All', 'Quranic', 'Daily', 'Protection', 'Forgiveness', 'Parents'];

const DUAS = [
  {
    title: "Dua for Knowledge",
    category: "Quranic",
    arabic: "رَّبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    translation: "My Lord, increase me in knowledge.",
    source: "Surah Taha, 20:114"
  },
  {
    title: "Dua for Parents",
    category: "Parents",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbi irhamhuma kama rabbayani sagheera",
    translation: "My Lord, have mercy upon them as they brought me up [when I was] small.",
    source: "Surah Al-Isra, 17:24"
  },
  {
    title: "Dua for Forgiveness",
    category: "Forgiveness",
    arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    transliteration: "Rabbana thalamna anfusana wa-in lam taghfir lana watarhamna lanakoonanna mina al-khasireen",
    translation: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
    source: "Surah Al-A'raf, 7:23"
  },
  {
    title: "Dua for Ease",
    category: "Daily",
    arabic: "اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً وَأَنْتَ تَجْعَلُ الحَزْنَ إِذَا شِئْتَ سَهْلاً",
    transliteration: "Allahumma la sahla illa ma ja'altahu sahla, wa anta taj'alul-hazna idha shi'ta sahla",
    translation: "O Allah, there is no ease except in what You have made easy, and You make the difficulty, if You wish, easy.",
    source: "Ibn Hibban"
  },
  {
    title: "Dua for Protection",
    category: "Protection",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahi-lladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i, wa Huwas-Sami'ul-'Alim",
    translation: "In the Name of Allah with Whose Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing.",
    source: "Abu Dawud"
  },
  {
    title: "Dua for Guidance",
    category: "Daily",
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    transliteration: "Ihdinas-siratal-mustaqim",
    translation: "Guide us to the straight path.",
    source: "Surah Al-Fatiha, 1:6"
  },
  {
    title: "Dua for Patience",
    category: "Daily",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا",
    transliteration: "Rabbana afrigh 'alayna sabran wa thabbit aqdamana",
    translation: "Our Lord, pour upon us patience and plant firmly our feet.",
    source: "Surah Al-Baqarah, 2:250"
  },
  {
    title: "Dua for Goodness",
    category: "Daily",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    translation: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    source: "Surah Al-Baqarah, 2:201"
  },
  {
    title: "Dua for Success",
    category: "Daily",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    transliteration: "Rabbi-shrah li sadri wa yassir li amri",
    translation: "My Lord, expand for me my breast [with assurance] and ease for me my task.",
    source: "Surah Taha, 20:25-26"
  },
  {
    title: "Dua for Protection from Evil",
    category: "Protection",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bi-kalimatillahi-t-tammati min sharri ma khalaq",
    translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    source: "Sahih Muslim"
  },
  {
    title: "Dua for Anxiety",
    category: "Daily",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazani wal-'ajzi wal-kasal",
    translation: "O Allah, I seek refuge in You from anxiety and sorrow, and from weakness and laziness.",
    source: "Sahih Bukhari"
  },
  {
    title: "Dua for Health",
    category: "Daily",
    arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي اللَّهُمَّ عَافِنِي فِي سَمْعِي اللَّهُمَّ عَافِنِي فِي بَصَرِي",
    transliteration: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari",
    translation: "O Allah, grant me health in my body, O Allah, grant me health in my hearing, O Allah, grant me health in my sight.",
    source: "Abu Dawud"
  }
];

export default function DuaView() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDuas = DUAS.filter(dua => 
    (activeCategory === 'All' || dua.category === activeCategory) &&
    (dua.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     dua.translation.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-serif text-islamic-green dark:text-emerald-400">Supplications (Duas)</h2>
          <p className="text-slate-500 dark:text-slate-400 italic">Connect with your Creator through beautiful prayers.</p>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-islamic-green dark:text-emerald-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search Duas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-islamic-green/5 focus:border-islamic-green dark:focus:border-emerald-500 transition-all w-full md:w-72 shadow-sm"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-6 mb-6 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              activeCategory === cat 
                ? "bg-islamic-green text-white shadow-md shadow-islamic-green/10" 
                : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-islamic-green/30 dark:hover:border-emerald-500/30 hover:text-islamic-green dark:hover:text-emerald-400"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <AnimatePresence mode="popLayout">
          {filteredDuas.map((dua, index) => (
            <motion.div
              layout
              key={dua.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-islamic-green/5 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center text-islamic-green dark:text-emerald-400 group-hover:bg-islamic-green group-hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-800 dark:text-slate-200">{dua.title}</h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-islamic-gold bg-islamic-gold/5 px-3 py-1 rounded-full">
                  {dua.category}
                </span>
              </div>

              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <p className="arabic-text text-3xl text-right text-islamic-green dark:text-emerald-400 leading-relaxed">
                  {dua.arabic}
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-400 italic tracking-wide">
                      {dua.transliteration}
                    </p>
                    <p className="text-slate-700 leading-relaxed font-serif text-lg">
                      "{dua.translation}"
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-50">
                    Source: {dua.source}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
