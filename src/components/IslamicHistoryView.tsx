import React, { useState } from 'react';
import { History, BookOpen, ArrowLeft } from 'lucide-react';
import { AppView } from '../types';

const HISTORY_CONTENT = [
  {
    title: "The Life of Prophet Muhammad (PBUH)",
    content: "Prophet Muhammad (PBUH) was born in Makkah in 570 CE. He received the first revelation at the age of 40 in the Cave of Hira. His life is a beacon of guidance for all humanity, emphasizing justice, compassion, and the oneness of Allah."
  },
  {
    title: "The Migration (Hijrah)",
    content: "The migration of the Prophet (PBUH) and his companions from Makkah to Madinah in 622 CE marks the beginning of the Islamic calendar. It was a pivotal moment that allowed the early Muslim community to establish itself and flourish."
  },
  {
    title: "The Four Rightly Guided Caliphs",
    content: "After the passing of the Prophet (PBUH), the leadership of the Muslim community was taken up by the four Rightly Guided Caliphs: Abu Bakr (RA), Umar (RA), Uthman (RA), and Ali (RA). Their reigns were marked by expansion, justice, and the consolidation of the Islamic state."
  }
];

interface IslamicHistoryViewProps {
  setActiveView: (view: AppView) => void;
}

export default function IslamicHistoryView({ setActiveView }: IslamicHistoryViewProps) {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <button 
        onClick={() => setActiveView('home')}
        className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-islamic-green/10 dark:bg-emerald-500/20 text-islamic-green dark:text-emerald-400 mb-4">
          <History className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">Islamic History</h1>
      </div>
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-islamic-green dark:text-emerald-400" />
          <h2 className="text-2xl font-semibold text-islamic-green dark:text-emerald-400">{HISTORY_CONTENT[currentPage].title}</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {HISTORY_CONTENT[currentPage].content}
        </p>
        
        <div className="flex justify-between mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-6 py-3 bg-islamic-green text-white rounded-2xl disabled:opacity-50 font-semibold"
          >
            Previous
          </button>
          <span className="text-slate-600 dark:text-slate-400 self-center font-bold">Chapter {currentPage + 1} of {HISTORY_CONTENT.length}</span>
          <button 
            onClick={() => setCurrentPage(Math.min(HISTORY_CONTENT.length - 1, currentPage + 1))}
            disabled={currentPage === HISTORY_CONTENT.length - 1}
            className="px-6 py-3 bg-islamic-green text-white rounded-2xl disabled:opacity-50 font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
