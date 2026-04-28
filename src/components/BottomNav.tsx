import React from 'react';
import { Home, Book, MessageSquare, Heart } from 'lucide-react';
import { AppView } from '../types';
import { cn } from '../lib/utils';

import { UI_TRANSLATIONS } from '../lib/translations';

interface BottomNavProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  language: 'en' | 'hi' | 'ur' | 'ar';
}

export default function BottomNav({ activeView, setActiveView, language }: BottomNavProps) {
  const t = (key: keyof typeof UI_TRANSLATIONS) => UI_TRANSLATIONS[key][language] || UI_TRANSLATIONS[key]['en'];
  const isRTL = language === 'ar' || language === 'ur';

  const navItems = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'quran', label: t('quran'), icon: Book },
    { id: 'assistant', label: t('assistant'), icon: MessageSquare },
    { id: 'dua', label: t('dua'), icon: Heart },
  ];

  return (
    <nav className={cn(
      "lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-around items-center p-2 z-50 transition-colors",
      isRTL && "flex-row-reverse"
    )}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveView(item.id as AppView)}
          className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors",
            activeView === item.id
              ? "text-islamic-green dark:text-emerald-400"
              : "text-slate-400 hover:text-islamic-green dark:hover:text-emerald-400"
          )}
        >
          <item.icon className="w-6 h-6" />
          <span className={cn("text-[10px] font-medium", isRTL && "font-arabic text-xs")}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
