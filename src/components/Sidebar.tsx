import React from 'react';
import { Book, MessageSquare, BrainCircuit, Settings, Moon, Sun, Menu, X, Heart, Compass, Sparkles, Fingerprint, Home, Bell, Calendar as CalendarIcon, Calculator, Video, Users, History as HistoryIcon, Tv, Camera } from 'lucide-react';
import { AppView } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const DAILY_VERSES = [
  { text: "Verily, with hardship comes ease.", ref: "94:6" },
  { text: "And He found you lost and guided [you].", ref: "93:7" },
  { text: "My mercy encompasses all things.", ref: "7:156" },
  { text: "So remember Me; I will remember you.", ref: "2:152" },
  { text: "Allah does not burden a soul beyond that it can bear.", ref: "2:286" },
  { text: "Indeed, Allah is with the patient.", ref: "2:153" },
  { text: "And put your trust in Allah, and enough is Allah as a disposer of affairs.", ref: "33:3" }
];

export default function Sidebar({ activeView, setActiveView, isOpen, setIsOpen, theme, toggleTheme }: SidebarProps) {
  const today = new Date().toDateString();
  const verseIndex = Math.abs(today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % DAILY_VERSES.length;
  const dailyVerse = DAILY_VERSES[verseIndex];

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'quran', label: 'Holy Quran', icon: Book },
    { id: 'assistant', label: 'Quran AI', icon: MessageSquare },
    { id: 'islamic_history', label: 'Islamic History', icon: HistoryIcon },
    { id: 'hadith', label: 'Hadith', icon: MessageSquare },
    { id: 'dua', label: 'Duas', icon: Heart },
    { id: 'asma_ul_husna', label: '99 Names', icon: Sparkles },
    { id: 'calendar', label: 'Islamic Calendar', icon: CalendarIcon },
    { id: 'zakat_calculator', label: 'Zakat Calculator', icon: Calculator },
    { id: 'prayer_alarm', label: 'Prayer Alarm', icon: Bell },
    { id: 'tasbeeh', label: 'Tasbeeh', icon: Fingerprint },
    { id: 'hidayat', label: 'Hidayat', icon: Sparkles },
    { id: 'quiz', label: 'Islamic Quiz', icon: BrainCircuit },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside 
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col lg:static lg:translate-x-0"
      >
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-islamic-green rounded-2xl flex items-center justify-center overflow-hidden shadow-lg shadow-islamic-green/20">
            <img 
              src="/app-logo.jpg" 
              alt="Quran Shareef Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback to icon if image fails to load
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const icon = document.createElement('div');
                  icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book w-6 h-6 text-white"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>';
                  parent.appendChild(icon.firstChild as Node);
                }
              }}
            />
          </div>
          <h1 className="text-2xl font-serif font-bold text-islamic-green dark:text-emerald-400 tracking-tight transition-colors">Quran Sharif</h1>
          <button 
            className="lg:hidden ml-auto p-2 text-slate-400 hover:text-islamic-green dark:hover:text-emerald-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveView(item.id as AppView);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group",
                activeView === item.id 
                  ? "bg-islamic-green dark:bg-emerald-500/20 text-white dark:text-emerald-400 shadow-md shadow-islamic-green/10 dark:shadow-none" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-islamic-green/5 dark:hover:bg-slate-800 hover:text-islamic-green dark:hover:text-emerald-400"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                activeView === item.id ? "text-white dark:text-emerald-400" : "text-slate-400 group-hover:text-islamic-green dark:group-hover:text-emerald-400"
              )} />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-slate-50 dark:border-slate-800 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Theme</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-islamic-green dark:hover:text-emerald-400 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          <div className="bg-islamic-green/5 dark:bg-emerald-500/10 rounded-2xl p-4 transition-colors">
            <p className="text-xs text-islamic-green dark:text-emerald-400 font-serif italic mb-1">Daily Verse</p>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
              "{dailyVerse.text}" ({dailyVerse.ref})
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
