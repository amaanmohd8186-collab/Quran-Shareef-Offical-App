import React, { useState, useEffect } from 'react';
import { AlarmClock, Bell, BellOff, Trash2, Plus, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView } from '../types';
import { cn } from '../lib/utils';

interface Alarm {
  id: string;
  name: string;
  time: string;
  enabled: boolean;
}

interface PrayerAlarmViewProps {
  setActiveView: (view: AppView) => void;
  isAlarmPlaying: boolean;
  stopAlarm: () => void;
}

const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export default function PrayerAlarmView({ setActiveView, isAlarmPlaying, stopAlarm }: PrayerAlarmViewProps) {
  const [alarms, setAlarms] = useState<Alarm[]>(() => {
    const saved = localStorage.getItem('prayer_alarms');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Fajr', time: '05:00', enabled: false },
      { id: '2', name: 'Dhuhr', time: '12:30', enabled: false },
      { id: '3', name: 'Asr', time: '16:00', enabled: false },
      { id: '4', name: 'Maghrib', time: '18:30', enabled: false },
      { id: '5', name: 'Isha', time: '20:00', enabled: false },
    ];
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newAlarmName, setNewAlarmName] = useState('');
  const [newAlarmTime, setNewAlarmTime] = useState('12:00');

  useEffect(() => {
    localStorage.setItem('prayer_alarms', JSON.stringify(alarms));
  }, [alarms]);

  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(a => 
      a.id === id ? { ...a, enabled: !a.enabled } : a
    ));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  };

  const addAlarm = () => {
    if (!newAlarmName) return;
    const newAlarm: Alarm = {
      id: Date.now().toString(),
      name: newAlarmName,
      time: newAlarmTime,
      enabled: true
    };
    setAlarms(prev => [...prev, newAlarm].sort((a, b) => a.time.localeCompare(b.time)));
    setShowAddModal(false);
    setNewAlarmName('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </button>
        <button
          onClick={() => setShowAddModal(true)}
          className="p-3 bg-islamic-green text-white rounded-2xl shadow-lg shadow-islamic-green/20 hover:scale-105 transition-all active:scale-95"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-islamic-green/10 dark:bg-emerald-500/20 text-islamic-green dark:text-emerald-400 mb-2">
          <AlarmClock className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Prayer Alarms</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Set reminders for your daily prayers. The Azan will play automatically at the scheduled time.
        </p>
      </div>

      {isAlarmPlaying && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-rose-500 text-white p-6 rounded-[2.5rem] shadow-xl flex items-center justify-between border-4 border-white/20 animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-lg">Alarm is Ringing!</p>
              <p className="text-white/80 text-sm">Time for Prayer</p>
            </div>
          </div>
          <button 
            onClick={stopAlarm}
            className="px-8 py-3 bg-white text-rose-500 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-lg active:scale-95"
          >
            STOP
          </button>
        </motion.div>
      )}

      <div className="space-y-4">
        {alarms.map((alarm) => (
          <motion.div
            key={alarm.id}
            layout
            className={cn(
              "p-6 rounded-[2.5rem] border transition-all flex items-center justify-between group",
              alarm.enabled 
                ? "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm" 
                : "bg-slate-50/50 dark:bg-slate-900/30 border-transparent opacity-60"
            )}
          >
            <div className="flex items-center gap-6">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                alarm.enabled ? "bg-islamic-green/10 text-islamic-green" : "bg-slate-200 dark:bg-slate-800 text-slate-400"
              )}>
                {alarm.enabled ? <Bell className="w-6 h-6" /> : <BellOff className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{alarm.time}</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{alarm.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAlarm(alarm.id)}
                className={cn(
                  "w-14 h-8 rounded-full relative transition-colors duration-300",
                  alarm.enabled ? "bg-islamic-green" : "bg-slate-300 dark:bg-slate-700"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-sm",
                  alarm.enabled ? "left-7" : "left-1"
                )} />
              </button>
              <button
                onClick={() => deleteAlarm(alarm.id)}
                className="p-3 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-800"
            >
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">Add New Alarm</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Alarm Name</label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {PRAYER_NAMES.map(name => (
                      <button
                        key={name}
                        onClick={() => setNewAlarmName(name)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-xs font-bold border transition-all",
                          newAlarmName === name 
                            ? "bg-islamic-green border-islamic-green text-white" 
                            : "border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                        )}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={newAlarmName}
                    onChange={(e) => setNewAlarmName(e.target.value)}
                    placeholder="Or enter custom name"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-islamic-green outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Time</label>
                  <input
                    type="time"
                    value={newAlarmTime}
                    onChange={(e) => setNewAlarmTime(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-islamic-green outline-none transition-all text-2xl font-bold"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addAlarm}
                    disabled={!newAlarmName}
                    className="flex-1 px-6 py-4 bg-islamic-green text-white rounded-2xl font-bold shadow-lg shadow-islamic-green/20 hover:bg-opacity-90 disabled:opacity-50 transition-all"
                  >
                    Save Alarm
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
