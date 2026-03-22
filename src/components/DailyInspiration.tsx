import React from 'react';
import { DAILY_INSPIRATION } from '../constants';
import { motion } from 'motion/react';

export default function DailyInspiration({ language }: { language: 'en' | 'hi' | 'ur' }) {
  const inspiration = DAILY_INSPIRATION[Math.floor(Math.random() * DAILY_INSPIRATION.length)];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm mb-8"
    >
      <h3 className="text-islamic-green dark:text-emerald-400 font-serif font-bold text-sm uppercase tracking-widest mb-4">
        {language === 'en' ? 'Daily Inspiration' : language === 'hi' ? 'दैनिक प्रेरणा' : 'روزانہ کی ترغیب'}
      </h3>
      <p className="text-2xl font-serif text-slate-800 dark:text-slate-200 leading-relaxed mb-4 italic">
        "{inspiration.text[language]}"
      </p>
      <p className="text-islamic-gold dark:text-amber-400 text-sm font-medium">
        — {inspiration.reference}
      </p>
    </motion.div>
  );
}
