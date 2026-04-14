import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { AppView } from '../types';

interface Reflection {
  id: number;
  text: string;
  date: string;
}

interface ReflectionJournalViewProps {
  setActiveView: (view: AppView) => void;
}

export default function ReflectionJournalView({ setActiveView }: ReflectionJournalViewProps) {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [newReflection, setNewReflection] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('quran_reflections');
    if (saved) setReflections(JSON.parse(saved));
  }, []);

  const addReflection = () => {
    if (!newReflection.trim()) return;
    const updated = [...reflections, { id: Date.now(), text: newReflection, date: new Date().toLocaleDateString() }];
    setReflections(updated);
    localStorage.setItem('quran_reflections', JSON.stringify(updated));
    setNewReflection('');
  };

  const deleteReflection = (id: number) => {
    const updated = reflections.filter(r => r.id !== id);
    setReflections(updated);
    localStorage.setItem('quran_reflections', JSON.stringify(updated));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <button onClick={() => setActiveView('home')} className="flex items-center gap-2 text-islamic-green">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h1 className="text-3xl font-bold text-center">Quranic Reflection Journal</h1>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <textarea 
          value={newReflection}
          onChange={(e) => setNewReflection(e.target.value)}
          placeholder="Write your reflection on an Ayah..."
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-islamic-green"
          rows={4}
        />
        <button onClick={addReflection} className="w-full flex items-center justify-center gap-2 bg-islamic-green text-white p-3 rounded-xl font-bold">
          <Plus className="w-5 h-5" /> Add Reflection
        </button>
      </div>

      <div className="space-y-4">
        {reflections.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-start">
            <div>
              <p className="text-slate-800">{r.text}</p>
              <p className="text-sm text-slate-400 mt-2">{r.date}</p>
            </div>
            <button onClick={() => deleteReflection(r.id)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
