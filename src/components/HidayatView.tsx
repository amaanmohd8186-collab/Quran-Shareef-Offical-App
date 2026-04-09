import React from 'react';
import { Sparkles, Sun, Moon, Shield, Heart, Star, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { AppView } from '../types';

const HIDAYAT = [
  {
    icon: Sun,
    title: "Morning Remembrance",
    text: "Start your day with Bismillah and gratitude. A heart that remembers Allah in the morning finds peace throughout the day.",
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    icon: Moon,
    title: "Evening Reflection",
    text: "Before sleeping, forgive everyone who wronged you. Purify your heart so you may wake up with a soul that is light and free.",
    color: "text-indigo-500",
    bg: "bg-indigo-50"
  },
  {
    icon: Shield,
    title: "Patience (Sabr)",
    text: "When things don't go your way, remember that Allah's plan is better than your dreams. Sabr is not just waiting, it's how you behave while waiting.",
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    icon: Heart,
    title: "Kindness",
    text: "The Prophet (PBUH) said: 'Every act of kindness is charity.' A smile, a kind word, or helping someone is a path to Jannah.",
    color: "text-rose-500",
    bg: "bg-rose-50"
  }
];

interface HidayatViewProps {
  setActiveView: (view: AppView) => void;
}

export default function HidayatView({ setActiveView }: HidayatViewProps) {
  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
      <button 
        onClick={() => setActiveView('home')}
        className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline w-fit mb-6"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="mb-12">
        <h2 className="text-4xl font-serif text-islamic-green dark:text-emerald-400 flex items-center gap-3">
          Hidayat (Guidance) <Sparkles className="w-6 h-6 text-islamic-gold" />
        </h2>
        <p className="text-slate-500 dark:text-slate-400 italic">Daily reminders and spiritual guidance for a meaningful life.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {HIDAYAT.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all flex gap-6"
          >
            <div className={`w-16 h-16 shrink-0 rounded-3xl ${item.bg} ${item.color} flex items-center justify-center`}>
              <item.icon className="w-8 h-8" />
            </div>
            <div className="space-y-3 flex-1">
              <h3 className="text-xl font-serif font-bold text-slate-800 dark:text-slate-200">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "{item.text}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-islamic-green text-white p-10 rounded-[3rem] relative overflow-hidden shadow-xl shadow-islamic-green/20">
        <Star className="absolute top-6 right-6 w-12 h-12 text-white/10 rotate-12" />
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl font-serif font-bold mb-4">Spiritual Growth</h3>
          <p className="text-white/80 leading-relaxed italic text-lg">
            "The most beloved of deeds to Allah are those that are most consistent, even if they are small." 
            Focus on small, daily improvements in your character and worship.
          </p>
        </div>
      </div>
    </div>
  );
}
