import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { AppView } from '../types';
import pillars from '../data/pillars.json';

interface FivePillarsViewProps {
  setActiveView: (view: AppView) => void;
}

export default function FivePillarsView({ setActiveView }: FivePillarsViewProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <button onClick={() => setActiveView('home')} className="flex items-center gap-2 text-islamic-green">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h1 className="text-3xl font-bold text-center">Five Pillars of Islam</h1>
      <div className="space-y-4">
        {pillars.map((pillar) => (
          <div key={pillar.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-xl text-islamic-green">{pillar.title}</h3>
            <p className="text-slate-600">{pillar.tafseer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
