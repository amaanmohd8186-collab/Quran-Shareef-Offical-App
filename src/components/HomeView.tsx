import React from 'react';
import { Book, MessageSquare, BrainCircuit, Heart, Compass, Sparkles, Fingerprint, Settings, Quote } from 'lucide-react';
import { AppView } from '../types';
import { motion } from 'motion/react';

interface HomeViewProps {
  setActiveView: (view: AppView) => void;
}

export default function HomeView({ setActiveView }: HomeViewProps) {
  const features = [
    { id: 'quran', label: 'Holy Quran', icon: Book, color: 'bg-emerald-50 text-emerald-600', desc: 'Read and listen to the Holy Quran' },
    { id: 'assistant', label: 'Al-Huda AI', icon: MessageSquare, color: 'bg-blue-50 text-blue-600', desc: 'Ask questions about Islam' },
    { id: 'hadith', label: 'Hadith', icon: Quote, color: 'bg-amber-50 text-amber-600', desc: 'Wisdom from the Prophet (PBUH)' },
    { id: 'dua', label: 'Duas', icon: Heart, color: 'bg-pink-50 text-pink-600', desc: 'Supplications for every occasion' },
    { id: 'qibla', label: 'Qibla', icon: Compass, color: 'bg-indigo-50 text-indigo-600', desc: 'Find the direction of Kaaba' },
    { id: 'tasbeeh', label: 'Tasbeeh', icon: Fingerprint, color: 'bg-teal-50 text-teal-600', desc: 'Digital counter for Dhikr' },
    { id: 'hidayat', label: 'Hidayat', icon: Sparkles, color: 'bg-purple-50 text-purple-600', desc: 'Daily guidance and inspiration' },
    { id: 'quiz', label: 'Islamic Quiz', icon: BrainCircuit, color: 'bg-orange-50 text-orange-600', desc: 'Test your Islamic knowledge' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'bg-slate-50 text-slate-600', desc: 'Manage your preferences' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-islamic-green rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl shadow-islamic-green/20"
        >
          <span className="text-4xl font-serif font-bold">Q</span>
        </motion.div>
        <div className="space-y-2">
          <h2 className="text-4xl font-serif font-bold text-islamic-green">Welcome to Quran Shareef</h2>
          <p className="text-slate-500 max-w-lg mx-auto italic">
            Your comprehensive Islamic companion with offline voice recitations and spiritual guidance.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <motion.button
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setActiveView(feature.id as AppView)}
            className="group p-6 bg-white rounded-3xl border border-slate-100 hover:border-islamic-green/30 hover:shadow-xl hover:shadow-islamic-green/5 transition-all text-left space-y-4"
          >
            <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{feature.label}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{feature.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer Quote */}
      <div className="text-center pt-8 border-t border-slate-100">
        <p className="text-slate-400 text-xs uppercase tracking-[0.3em] font-bold">Guided by Faith • Powered by AI</p>
      </div>
    </div>
  );
}
