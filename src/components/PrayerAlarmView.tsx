import React, { useState, useEffect, useRef } from 'react';
import { Bell, BellOff, Volume2, Clock, Trash2, Plus, Check, X, AlertCircle, Upload, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Alarm {
  id: string;
  name: string;
  time: string;
  enabled: boolean;
}

const DEFAULT_AZAN_URL = 'https://www.islamcan.com/audio/adhan/azan1.mp3';

const DEFAULT_PRAYERS = [
  { name: 'Fajr', time: '05:30' },
  { name: 'Dhuhr', time: '12:30' },
  { name: 'Asr', time: '15:45' },
  { name: 'Maghrib', time: '18:15' },
  { name: 'Isha', time: '19:45' },
];

interface PrayerAlarmViewProps {
  isAlarmPlaying?: boolean;
  stopAlarm?: () => void;
}

export default function PrayerAlarmView({ isAlarmPlaying, stopAlarm }: PrayerAlarmViewProps) {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTime, setNewTime] = useState('12:00');

  useEffect(() => {
    const saved = localStorage.getItem('prayer_alarms');
    
    if (saved) {
      setAlarms(JSON.parse(saved));
    } else {
      const initial = DEFAULT_PRAYERS.map((p, i) => ({
        id: `default-${i}`,
        name: p.name,
        time: p.time,
        enabled: false
      }));
      setAlarms(initial);
      localStorage.setItem('prayer_alarms', JSON.stringify(initial));
    }
  }, []);

  const toggleAlarm = (id: string) => {
    const updated = alarms.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a);
    setAlarms(updated);
    localStorage.setItem('prayer_alarms', JSON.stringify(updated));
  };

  const deleteAlarm = (id: string) => {
    const updated = alarms.filter(a => a.id !== id);
    setAlarms(updated);
    localStorage.setItem('prayer_alarms', JSON.stringify(updated));
  };

  const addAlarm = () => {
    if (!newName.trim()) return;
    const newAlarm: Alarm = {
      id: Date.now().toString(),
      name: newName,
      time: newTime,
      enabled: true
    };
    const updated = [...alarms, newAlarm].sort((a, b) => a.time.localeCompare(b.time));
    setAlarms(updated);
    localStorage.setItem('prayer_alarms', JSON.stringify(updated));
    setIsAdding(false);
    setNewName('');
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-serif text-islamic-green flex items-center gap-3">
            Namaz Alarm <Bell className="w-8 h-8 text-islamic-gold" />
          </h2>
          <p className="text-slate-500 italic">Set reminders for your daily prayers with Azan.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-islamic-green text-white rounded-2xl hover:bg-islamic-green/90 transition-all shadow-lg shadow-islamic-green/20 font-bold"
        >
          <Plus className="w-5 h-5" /> Add Alarm
        </button>
      </div>

      {isAlarmPlaying && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-islamic-green text-white p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between shadow-2xl border-4 border-white/20"
        >
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <Volume2 className="w-8 h-8" />
            </div>
            <div>
              <p className="font-bold text-2xl">Alarm is Playing!</p>
              <p className="text-white/80 italic">Time for prayer. Hayya 'ala-s-Salah.</p>
            </div>
          </div>
          <button 
            onClick={stopAlarm}
            className="w-full md:w-auto px-10 py-4 bg-white text-islamic-green rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-lg active:scale-95"
          >
            STOP ALARM
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {isAdding && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-islamic-green/20 p-8 rounded-[2.5rem] shadow-xl space-y-6"
            >
              <h3 className="text-xl font-serif font-bold text-slate-800">New Prayer Alarm</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Prayer Name</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Tahajjud"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-islamic-green/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Time</label>
                  <input 
                    type="time" 
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-islamic-green/20"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={addAlarm}
                  className="flex-1 py-3 bg-islamic-green text-white rounded-xl font-bold hover:bg-islamic-green/90 transition-all"
                >
                  Save
                </button>
                <button 
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-3 bg-slate-100 text-slate-500 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {alarms.map((alarm) => (
          <motion.div 
            layout
            key={alarm.id}
            className={cn(
              "bg-white border p-8 rounded-[2.5rem] shadow-sm flex items-center justify-between group transition-all",
              alarm.enabled ? "border-slate-100" : "border-slate-50 opacity-60"
            )}
          >
            <div className="flex items-center gap-6">
              <div className={cn(
                "w-16 h-16 rounded-3xl flex items-center justify-center transition-colors",
                alarm.enabled ? "bg-islamic-green/10 text-islamic-green" : "bg-slate-100 text-slate-400"
              )}>
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-800">{alarm.time}</h3>
                <p className="text-slate-500 font-medium">{alarm.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => toggleAlarm(alarm.id)}
                className={cn(
                  "w-14 h-8 rounded-full relative transition-colors",
                  alarm.enabled ? "bg-islamic-green" : "bg-slate-200"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-sm",
                  alarm.enabled ? "left-7" : "left-1"
                )} />
              </button>
              <button 
                onClick={() => deleteAlarm(alarm.id)}
                className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-amber-50 border border-amber-100 p-6 rounded-3xl flex gap-4">
        <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
        <div className="text-sm text-amber-800 leading-relaxed">
          <p className="font-bold mb-1">Important Note:</p>
          <p>For the alarm to work, please keep this tab open. Browsers may restrict audio playback if the tab is inactive for a long time. Ensure your volume is turned up.</p>
        </div>
      </div>
    </div>
  );
}
