import React, { useState } from 'react';
import { History } from 'lucide-react';

export default function IslamicHistoryView() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-islamic-green/10 dark:bg-emerald-500/20 text-islamic-green dark:text-emerald-400 mb-4">
          <History className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">Islamic History - Volume {currentPage}</h1>
      </div>
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-2xl font-semibold text-islamic-green dark:text-emerald-400">Content for Volume {currentPage}</h2>
        <p className="text-slate-600 dark:text-slate-400">
          This is the content for volume {currentPage} of Islamic History. [Detailed content would be here for each volume].
        </p>
        
        <div className="flex justify-between mt-8">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-islamic-green text-white rounded-xl disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-slate-600 dark:text-slate-400">Volume {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-islamic-green text-white rounded-xl disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
