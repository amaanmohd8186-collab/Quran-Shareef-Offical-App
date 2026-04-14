import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, History, Trash2, Volume2, VolumeX, Vibrate, Home, ArrowLeft } from 'lucide-react';
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
    <div className="max-w-md mx-auto h-full flex flex-col items-center justify-center p-6 bg-slate-950">
      <button 
        onClick={() => setActiveView('home')}
        className="self-start flex items-center gap-2 text-cyan-400 font-medium hover:underline mb-6"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      
      {/* Realistic 3D Device */}
      <div className="relative w-80 h-80 bg-slate-900 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_2px_10px_rgba(255,255,255,0.1)] border-[12px] border-slate-800 flex flex-col items-center justify-center p-8">
        {/* Glossy Black Inner Circle */}
        <div className="w-full h-full rounded-full bg-black shadow-[inset_0_0_40px_rgba(0,255,255,0.1)] flex flex-col items-center justify-center">
          
          {/* Neon Turquoise Screen */}
          <div className="mb-6">
            <motion.h3 
              key={count}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="text-7xl font-mono font-bold text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]"
            >
              {count}
            </motion.h3>
          </div>

          {/* Reset Button */}
          <button
            onClick={reset}
            className="px-8 py-2 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] text-black font-bold text-lg hover:from-cyan-500 hover:to-cyan-300 transition-all"
            aria-label="Reset"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Count Button */}
      <button
        onClick={increment}
        className="mt-12 w-40 h-40 bg-slate-800 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all border-4 border-slate-700"
        aria-label="Count"
      />

      {/* Controls & History */}
      <div className="w-full mt-8 flex justify-center gap-4 text-slate-400">
        <button onClick={() => setVibrate(!vibrate)} className={cn("p-4 rounded-2xl", vibrate ? "text-cyan-400" : "text-slate-600")}>
          <Vibrate />
        </button>
        <button onClick={() => setSound(!sound)} className={cn("p-4 rounded-2xl", sound ? "text-cyan-400" : "text-slate-600")}>
          {sound ? <Volume2 /> : <VolumeX />}
        </button>
        <button onClick={saveSession} className="p-4 bg-cyan-900/30 text-cyan-400 rounded-2xl font-bold border border-cyan-900">Save</button>
      </div>

      {/* History */}
      <div className="w-full mt-8 bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-4 text-cyan-400">
          <h4 className="font-bold flex items-center gap-2"><History className="w-4 h-4"/> History</h4>
          <button onClick={() => setSessions([])} className="text-rose-500 text-xs font-bold"><Trash2 className="w-4 h-4"/></button>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {sessions.map(s => (
            <div key={s.id} className="flex justify-between text-sm p-2 bg-slate-950 rounded-lg text-slate-300">
              <span>{s.count}</span>
              <span className="text-slate-500 text-xs">{s.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
