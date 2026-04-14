import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { AppView } from '../types';
import kalimas from '../data/kalimas.json';

interface KalimasViewProps {
  setActiveView: (view: AppView) => void;
}

export default function KalimasView({ setActiveView }: KalimasViewProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <button onClick={() => setActiveView('home')} className="flex items-center gap-2 text-islamic-green">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h1 className="text-3xl font-bold text-center">Six Kalimas</h1>
      <div className="space-y-4">
        {kalimas.map((kalima) => (
          <div key={kalima.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <h3 className="font-bold text-xl text-islamic-green">{kalima.name}</h3>
            <p className="text-2xl text-right font-serif" dir="rtl">{kalima.arabic}</p>
            <p className="text-lg text-slate-700 italic">{kalima.hindi}</p>
            <p className="text-slate-600">{kalima.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
