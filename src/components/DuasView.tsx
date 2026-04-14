import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { AppView } from '../types';
import duas from '../data/duas.json';

interface DuasViewProps {
  setActiveView: (view: AppView) => void;
}

export default function DuasView({ setActiveView }: DuasViewProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <button onClick={() => setActiveView('home')} className="flex items-center gap-2 text-islamic-green">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h1 className="text-3xl font-bold text-center">Duas</h1>
      <div className="space-y-4">
        {duas.map((dua) => (
          <div key={dua.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-2">
            <h3 className="font-bold text-xl text-islamic-green">{dua.title}</h3>
            <p className="text-2xl text-right font-serif" dir="rtl">{dua.text}</p>
            <p className="text-slate-600">{dua.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
