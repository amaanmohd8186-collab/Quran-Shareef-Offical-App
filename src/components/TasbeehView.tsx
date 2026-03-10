import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Plus, Minus, History, Trash2, Volume2, VolumeX, Vibrate } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface TasbeehSession {
  id: string;
  count: number;
  date: string;
  label: string;
}

export default function TasbeehView() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [sessions, setSessions] = useState<TasbeehSession[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [vibrate, setVibrate] = useState(true);
  const [sound, setSound] = useState(false);
  const clickAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedSessions = localStorage.getItem('tasbeeh_sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    
    // Create a simple click sound
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
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
    if (count > 0) {
      const newSession: TasbeehSession = {
        id: Date.now().toString(),
        count,
        date: new Date().toLocaleString(),
        label: count >= target ? 'Completed' : 'Partial'
      };
      const updatedSessions = [newSession, ...sessions].slice(0, 50);
      setSessions(updatedSessions);
      localStorage.setItem('tasbeeh_sessions', JSON.stringify(updatedSessions));
    }
    setCount(0);
  };

  const clearHistory = () => {
    setSessions([]);
    localStorage.removeItem('tasbeeh_sessions');
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-islamic-green">Digital Tasbeeh</h2>
        <p className="text-slate-500 italic mt-2">Keep track of your Dhikr with ease.</p>
      </div>

      <div className="relative w-full max-w-md aspect-square flex flex-col items-center justify-center bg-slate-900 rounded-[3rem] shadow-2xl border-4 border-slate-800 p-12 overflow-hidden">
        {/* Progress Ring Background */}
        <div className="absolute inset-8 rounded-full border-8 border-slate-800" />
        
        {/* Progress Ring Active */}
        <svg className="absolute inset-8 w-[calc(100%-64px)] h-[calc(100%-64px)] -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-islamic-green transition-all duration-300"
            style={{ strokeDasharray: '283', strokeDashoffset: `${283 - (Math.min(count, target) / target * 283)}` }}
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500 mb-4">Digital Counter</p>
          <motion.h3 
            key={count}
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-9xl font-mono font-bold text-islamic-green drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            {count.toString().padStart(2, '0')}
          </motion.h3>
          <div className="mt-6 flex items-center gap-2 px-4 py-1 bg-islamic-green/10 rounded-full border border-islamic-green/20">
            <span className="text-[10px] font-bold text-islamic-green uppercase tracking-widest">Target: {target}</span>
          </div>
        </div>

        <button
          onClick={increment}
          className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-20"
          aria-label="Increment count"
        />

        <div className="absolute top-8 right-8 flex flex-col gap-4 z-30">
          <button 
            onClick={() => setVibrate(!vibrate)}
            className={cn("p-2 rounded-lg transition-colors", vibrate ? "text-islamic-green bg-islamic-green/10" : "text-slate-600 bg-slate-800")}
          >
            <Vibrate className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setSound(!sound)}
            className={cn("p-2 rounded-lg transition-colors", sound ? "text-islamic-green bg-islamic-green/10" : "text-slate-600 bg-slate-800")}
          >
            {sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        <div className="absolute bottom-12 flex gap-6 z-30">
          <button 
            onClick={reset}
            className="p-4 bg-slate-800 text-slate-300 rounded-2xl hover:bg-slate-700 transition-colors shadow-sm border border-slate-700"
            title="Reset and save"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="mt-8 flex bg-white border border-slate-100 rounded-2xl p-1 shadow-sm">
        {[33, 99, 100].map(t => (
          <button
            key={t}
            onClick={() => setTarget(t)}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold transition-all",
              target === t ? "bg-islamic-green text-white shadow-md" : "text-slate-400 hover:text-islamic-green"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-12 w-full max-w-md">
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
        >
          <div className="flex items-center gap-3">
            <History className="w-5 h-5 text-islamic-green" />
            <span className="font-bold text-sm uppercase tracking-widest">Dhikr History</span>
          </div>
          <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded-lg">{sessions.length}</span>
        </button>

        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {sessions.length === 0 ? (
                  <p className="text-center py-8 text-slate-400 text-sm italic">No history yet.</p>
                ) : (
                  <>
                    {sessions.map(session => (
                      <div key={session.id} className="bg-white border border-slate-50 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate-700">{session.count} Counts</p>
                          <p className="text-[10px] text-slate-400">{session.date}</p>
                        </div>
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg",
                          session.label === 'Completed' ? "bg-islamic-green/10 text-islamic-green" : "bg-amber-100 text-amber-700"
                        )}>
                          {session.label}
                        </span>
                      </div>
                    ))}
                    <button 
                      onClick={clearHistory}
                      className="w-full py-3 text-rose-500 text-xs font-bold uppercase tracking-widest hover:bg-rose-50 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Clear History
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-8 text-slate-400 text-xs italic">Tip: Tap anywhere on the counter to increment.</p>
    </div>
  );
}
