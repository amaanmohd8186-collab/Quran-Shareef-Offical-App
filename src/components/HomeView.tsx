import React from 'react';
import { Book, MessageSquare, BrainCircuit, Heart, Sparkles, Fingerprint, Settings, Quote, Calendar as CalendarIcon, Calculator, Video, History, Camera, AlarmClock, Shield } from 'lucide-react';
import { AppView } from '../types';
import { motion } from 'motion/react';
import DailyInspiration from './DailyInspiration';
import { cn } from '../lib/utils';

import { UI_TRANSLATIONS } from '../lib/translations';

interface HomeViewProps {
  setActiveView: (view: AppView) => void;
  language: 'en' | 'hi' | 'ur' | 'ar';
}

export default function HomeView({ setActiveView, language }: HomeViewProps) {
  const t = (key: keyof typeof UI_TRANSLATIONS) => UI_TRANSLATIONS[key][language] || UI_TRANSLATIONS[key]['en'];
  const isRTL = language === 'ar' || language === 'ur';

  const features = [
    { id: 'quran', label: t('quran'), icon: Book, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400', desc: 'Read and listen to the Holy Quran' },
    { id: 'assistant', label: t('assistant'), icon: MessageSquare, color: 'bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400', desc: 'Ask questions about Islam and Quran' },
    { id: 'hadith', label: t('hadith'), icon: Quote, color: 'bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400', desc: 'Wisdom from the Prophet (PBUH)' },
    { id: 'dua', label: t('dua'), icon: Heart, color: 'bg-pink-50 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400', desc: 'Supplications for every occasion' },
    { id: 'asma_ul_husna', label: t('asma_ul_husna'), icon: Sparkles, color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400', desc: 'Asma ul Husna with audio' },
    { id: 'calendar', label: t('calendar'), icon: CalendarIcon, color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400', desc: 'Hijri calendar and events' },
    { id: 'zakat_calculator', label: t('zakat_calculator'), icon: Calculator, color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400', desc: 'Calculate your Zakat easily' },
    { id: 'tasbeeh', label: t('tasbeeh'), icon: Fingerprint, color: 'bg-teal-50 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400', desc: 'Digital counter for Dhikr' },
    { id: 'live_ziyarat', label: 'Live Ziyarat', icon: Video, color: 'bg-red-50 text-red-600 dark:bg-red-500/20 dark:text-red-400', desc: 'Live stream from Makkah & Madinah' },
    { id: 'hidayat', label: t('hidayat'), icon: Sparkles, color: 'bg-purple-50 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400', desc: 'Daily guidance and inspiration' },
    { id: 'quiz', label: t('quiz'), icon: BrainCircuit, color: 'bg-orange-50 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400', desc: 'Test your Islamic knowledge' },
    { id: 'islamic_quotes', label: 'Islamic Quotes', icon: Quote, color: 'bg-rose-50 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400', desc: 'Inspiring quotes for status' },
    { id: 'prayer_alarm', label: t('prayer_alarm'), icon: AlarmClock, color: 'bg-sky-50 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400', desc: 'Set prayer reminders' },
    { id: 'hifz_detector', label: t('hifz_detector'), icon: Camera, color: 'bg-violet-50 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400', desc: 'Practice Hifz with AI' },
    { id: 'islamic_history', label: t('islamic_history'), icon: History, color: 'bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400', desc: 'Learn Islamic history' },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield, color: 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400', desc: 'View privacy policy' },
    { id: 'settings', label: t('settings'), icon: Settings, color: 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400', desc: 'Manage your preferences' },
  ];

  return (
    <div className={cn("max-w-6xl mx-auto p-6 space-y-12", isRTL && "text-right")}>
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-islamic-green rounded-3xl flex items-center justify-center overflow-hidden mx-auto shadow-xl shadow-islamic-green/20"
        >
          <img 
            src="/app-logo.jpg" 
            alt="Quran Shareef Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to text if image fails to load
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const span = document.createElement('span');
                span.className = 'text-4xl font-serif font-bold text-white';
                span.innerText = 'Q';
                parent.appendChild(span);
              }
            }}
          />
        </motion.div>
        <div className="space-y-2">
          <h2 className="text-4xl font-serif font-bold text-islamic-green dark:text-emerald-400 transition-colors">Quran Shareef App</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto italic transition-colors">
            Android Application with offline voice recitations and spiritual guidance.
          </p>
        </div>
      </div>

      <DailyInspiration language={language} />

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 perspective-1000">
        {features.map((feature, index) => (
          <motion.button
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
            onClick={() => setActiveView(feature.id as AppView)}
            className="group p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-islamic-green/20 dark:hover:shadow-emerald-500/20 transition-all text-left space-y-4 perspective-1000"
          >
            <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200 transition-colors">{feature.label}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 transition-colors">{feature.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer Quote */}
      <div className="text-center pt-8 border-t border-slate-100 dark:border-slate-800 transition-colors">
        <p className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-[0.3em] font-bold transition-colors">Guided by Faith • Powered by Amaan Siddiqui</p>
      </div>
    </div>
  );
}
