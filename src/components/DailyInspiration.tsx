import React from 'react';
import { DAILY_INSPIRATION } from '../constants';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function DailyInspiration({ language }: { language: 'en' | 'hi' | 'ur' }) {
  const inspiration = DAILY_INSPIRATION[Math.floor(Math.random() * DAILY_INSPIRATION.length)];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl mb-8 text-center"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-islamic-gold via-emerald-500 to-islamic-gold"></div>
      <Quote className="w-10 h-10 text-islamic-gold/50 mx-auto mb-6" />
      
      <h3 className="text-emerald-400 font-serif font-bold text-xs uppercase tracking-[0.3em] mb-6">
        {language === 'en' ? 'Daily Reflection' : language === 'hi' ? 'दैनिक चिंतन' : 'روزانہ کا فکر'}
      </h3>
      
      <p className="text-2xl font-serif text-slate-100 leading-relaxed mb-6 italic px-4">
        "{inspiration.text[language]}"
      </p>
      
      <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-slate-700">
        <p className="text-islamic-gold text-sm font-medium tracking-wide">
          {inspiration.reference}
        </p>
      </div>
    </motion.div>
  );
}
