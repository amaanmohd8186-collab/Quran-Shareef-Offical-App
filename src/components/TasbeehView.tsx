import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, History, Trash2, Volume2, VolumeX, Vibrate, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { AppView } from '../types';

interface TasbeehSession {
  id: string;
  count: number;
  date: string;
  label: string;
}

interface TasbeehViewProps {
  setActiveView: (view: AppView) => void;
}

export default function TasbeehView({ setActiveView }: TasbeehViewProps) {
  const [count, setCount] = useState(0);
  const [sessions, setSessions] = useState<TasbeehSession[]>([]);
  const [vibrate, setVibrate] = useState(() => localStorage.getItem('tasbeeh_vibrate') !== 'false');
  const [sound, setSound] = useState(() => localStorage.getItem('tasbeeh_sound') === 'true');
  const clickAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem('tasbeeh_vibrate', vibrate.toString());
    localStorage.setItem('tasbeeh_sound', sound.toString());
  }, [vibrate, sound]);

  useEffect(() => {
    const savedSessions = localStorage.getItem('tasbeeh_sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    
    // Create a simple click sound
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    clickAudio.current = {
      play: () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      }
    } as any;
  }, []);

  const increment = () => {
    setCount(prev => prev + 1);
    if (vibrate && navigator.vibrate) {
      navigator.vibrate(50);
    }
    if (sound && clickAudio.current) {
      clickAudio.current.play();
    }
  };

  const reset = () => {
    setCount(0);
  };

  const saveSession = () => {
    const newSession: TasbeehSession = {
      id: Date.now().toString(),
      count,
      date: new Date().toLocaleString(),
      label: 'Completed'
    };
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    localStorage.setItem('tasbeeh_sessions', JSON.stringify(updatedSessions));
    setCount(0);
  };

  return (
    <div className="max-w-md mx-auto h-full flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-slate-950">
      
      {/* Device Body */}
      <div className="relative w-72 h-96 bg-cyan-500 rounded-[3rem] shadow-2xl border-b-8 border-cyan-700 flex flex-col items-center p-6">
        {/* Beaded Texture Effect */}
        <div className="absolute inset-0 rounded-[3rem] border-4 border-cyan-400 opacity-50 pointer-events-none"></div>
        
        {/* Screen */}
        <div className="w-full h-24 bg-black rounded-2xl border-4 border-cyan-900 flex flex-col items-center justify-center mb-8 shadow-inner">
          <p className="text-[10px] font-bold text-cyan-800 uppercase tracking-[0.2em] mb-1">Tally Counter</p>
          <motion.h3 
            key={count}
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-mono font-bold text-cyan-400"
          >
            {count.toString().padStart(5, '0')}
          </motion.h3>
        </div>

        {/* Main Count Button */}
        <button
          onClick={increment}
          className="w-24 h-24 bg-slate-300 rounded-full shadow-[0_10px_0_#94a3b8] active:shadow-none active:translate-y-2 transition-all border-4 border-slate-400 mb-6"
          aria-label="Count"
        >
          <span className="text-slate-600 font-bold">COUNT</span>
        </button>

        {/* Reset Button */}
        <button
          onClick={reset}
          className="w-16 h-16 bg-slate-400 rounded-full shadow-[0_5px_0_#64748b] active:shadow-none active:translate-y-1 transition-all border-4 border-slate-500"
          aria-label="Reset"
        >
          <span className="text-slate-700 font-bold text-xs">RESET</span>
        </button>
      </div>

      {/* Controls & History */}
      <div className="w-full mt-8 flex justify-center gap-4">
        <button onClick={() => setActiveView('home')} className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm text-slate-600"><Home /></button>
        <button onClick={saveSession} className="p-4 bg-islamic-green text-white rounded-2xl shadow-sm font-bold">Save Session</button>
        <button onClick={() => setVibrate(!vibrate)} className={cn("p-4 rounded-2xl", vibrate ? "bg-cyan-500 text-white" : "bg-slate-200")}>
          <Vibrate />
        </button>
        <button onClick={() => setSound(!sound)} className={cn("p-4 rounded-2xl", sound ? "bg-cyan-500 text-white" : "bg-slate-200")}>
          {sound ? <Volume2 /> : <VolumeX />}
        </button>
      </div>

      {/* History */}
      <div className="w-full mt-8 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold flex items-center gap-2"><History className="w-4 h-4"/> History</h4>
          <button onClick={() => setSessions([])} className="text-rose-500 text-xs font-bold"><Trash2 className="w-4 h-4"/></button>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {sessions.map(s => (
            <div key={s.id} className="flex justify-between text-sm p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span>{s.count}</span>
              <span className="text-slate-400 text-xs">{s.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
