import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { AppView } from '../types';
import { toArabicNumerals } from '../lib/utils';

interface Name {
  name: string;
  transliteration: string;
  en: {
    meaning: string;
  };
}

interface AsmaUlHusnaViewProps {
  setActiveView: (view: AppView) => void;
}

export default function AsmaUlHusnaView({ setActiveView }: AsmaUlHusnaViewProps) {
  const [names, setNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.aladhan.com/v1/asmaAlHusna')
      .then(res => res.json())
      .then(data => {
        setNames(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load Asma ul Husna. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-rose-600 p-8 bg-rose-50 rounded-2xl max-w-md mx-auto mt-12">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <button 
        onClick={() => setActiveView('home')}
        className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-islamic-green/10 dark:bg-emerald-500/20 text-islamic-green dark:text-emerald-400 mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-800 dark:text-slate-200">Asma ul Husna</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          The 99 Beautiful Names of Allah. "And to Allah belong the best names, so invoke Him by them." (Quran 7:180)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {names.map((name, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-islamic-green/5 dark:bg-emerald-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            
            <div className="flex justify-between items-start mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-sm">
                {toArabicNumerals(index + 1)}
              </span>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-islamic-green dark:text-emerald-400 arabic-text leading-relaxed">
                {name.name}
              </h2>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {name.transliteration}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {name.en.meaning}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
