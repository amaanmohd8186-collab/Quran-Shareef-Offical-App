import React from 'react';
import { Home, Book, MessageSquare, Heart } from 'lucide-react';
import { AppView } from '../types';
import { cn } from '../lib/utils';

interface BottomNavProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

export default function BottomNav({ activeView, setActiveView }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'quran', label: 'Quran', icon: Book },
    { id: 'assistant', label: 'AI', icon: MessageSquare },
    { id: 'dua', label: 'Duas', icon: Heart },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-around items-center p-2 z-50">
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
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
