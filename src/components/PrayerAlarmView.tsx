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

const DEFAULT_RINGTONES = [
  { id: 'azan1', name: 'Azan 1 (Makkah)', url: 'https://www.islamcan.com/audio/adhan/azan1.mp3' },
  { id: 'azan2', name: 'Azan 2 (Madinah)', url: 'https://www.islamcan.com/audio/adhan/azan2.mp3' },
  { id: 'azan3', name: 'Azan 3 (Egypt)', url: 'https://www.islamcan.com/audio/adhan/azan3.mp3' },
  { id: 'azan4', name: 'Azan 4 (Al-Aqsa)', url: 'https://www.islamcan.com/audio/adhan/azan4.mp3' },
  { id: 'azan5', name: 'Azan 5 (Turkey)', url: 'https://www.islamcan.com/audio/adhan/azan5.mp3' },
  { id: 'azan6', name: 'Azan 6 (Bosnia)', url: 'https://www.islamcan.com/audio/adhan/azan6.mp3' },
  { id: 'beep', name: 'Soft Beep', url: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' },
];

const DEFAULT_PRAYERS = [
  { name: 'Fajr', time: '05:30' },
  { name: 'Dhuhr', time: '12:30' },
  { name: 'Asr', time: '15:45' },
  { name: 'Maghrib', time: '18:15' },
  { name: 'Isha', time: '19:45' },
];

export default function PrayerAlarmView() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTime, setNewTime] = useState('12:00');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedRingtone, setSelectedRingtone] = useState(DEFAULT_RINGTONES[0].id);
  const [customRingtones, setCustomRingtones] = useState<{ id: string, name: string, url: string }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const checkInterval = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const allRingtones = [...DEFAULT_RINGTONES, ...customRingtones];

  useEffect(() => {
    const saved = localStorage.getItem('prayer_alarms');
    const savedRingtone = localStorage.getItem('prayer_ringtone');
    const savedCustom = localStorage.getItem('custom_ringtones');
    
    if (savedCustom) {
      setCustomRingtones(JSON.parse(savedCustom));
    }

    if (savedRingtone) setSelectedRingtone(savedRingtone);

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

    // Initialize audio
    const initialRingtones = [...DEFAULT_RINGTONES, ...(savedCustom ? JSON.parse(savedCustom) : [])];
    const ringtoneUrl = initialRingtones.find(r => r.id === (savedRingtone || DEFAULT_RINGTONES[0].id))?.url || DEFAULT_RINGTONES[0].url;
    audioRef.current = new Audio(ringtoneUrl);
    audioRef.current.loop = false;
    audioRef.current.onended = () => setIsPlaying(false);

    // Start alarm checker
    checkInterval.current = setInterval(checkAlarms, 10000); // Check every 10 seconds

    return () => {
      if (checkInterval.current) clearInterval(checkInterval.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleRingtoneChange = (id: string) => {
    setSelectedRingtone(id);
    localStorage.setItem('prayer_ringtone', id);
    const url = allRingtones.find(r => r.id === id)?.url || DEFAULT_RINGTONES[0].url;
    if (audioRef.current) {
      audioRef.current.src = url;
      // Preview the sound
      audioRef.current.play().catch(e => console.error("Preview failed:", e));
      setIsPlaying(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert("File is too large. Please select a file smaller than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newCustom = {
        id: `custom-${Date.now()}`,
        name: file.name.split('.')[0],
        url: dataUrl
      };
      const updated = [...customRingtones, newCustom];
      setCustomRingtones(updated);
      localStorage.setItem('custom_ringtones', JSON.stringify(updated));
      handleRingtoneChange(newCustom.id);
    };
    reader.readAsDataURL(file);
  };

  const deleteCustomRingtone = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customRingtones.filter(r => r.id !== id);
    setCustomRingtones(updated);
    localStorage.setItem('custom_ringtones', JSON.stringify(updated));
    if (selectedRingtone === id) {
      handleRingtoneChange(DEFAULT_RINGTONES[0].id);
    }
  };

  const checkAlarms = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const currentSeconds = now.getSeconds();

    if (currentSeconds > 20) return;

    const activeAlarms = JSON.parse(localStorage.getItem('prayer_alarms') || '[]');
    const triggered = activeAlarms.find((a: Alarm) => a.enabled && a.time === currentTime);

    if (triggered && !isPlaying) {
      // Refresh ringtone URL in case it's custom
      const currentRingtone = localStorage.getItem('prayer_ringtone') || DEFAULT_RINGTONES[0].id;
      const custom = JSON.parse(localStorage.getItem('custom_ringtones') || '[]');
      const all = [...DEFAULT_RINGTONES, ...custom];
      const url = all.find(r => r.id === currentRingtone)?.url || DEFAULT_RINGTONES[0].url;
      
      if (audioRef.current) {
        audioRef.current.src = url;
        playAlarm();
      }
    }
  };

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Alarm play failed:", e));
      setIsPlaying(true);
    }
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    // Also try to stop global alarm if it's playing
    window.dispatchEvent(new CustomEvent('stop-global-alarm'));
  };

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

      {isPlaying && (
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

      <div className="mb-8 bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-widest block">Select Ringtone</label>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-islamic-green/10 text-islamic-green rounded-xl text-xs font-bold hover:bg-islamic-green/20 transition-all"
          >
            <Upload className="w-4 h-4" /> Upload Custom
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="audio/*" 
            className="hidden" 
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {allRingtones.map((r) => (
            <button
              key={r.id}
              onClick={() => handleRingtoneChange(r.id)}
              className={cn(
                "group relative px-4 py-3 rounded-xl text-sm font-medium transition-all border-2 flex items-center justify-center gap-2",
                selectedRingtone === r.id 
                  ? "bg-islamic-green/10 border-islamic-green text-islamic-green" 
                  : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
              )}
            >
              {r.id.startsWith('custom-') ? <Music className="w-3 h-3" /> : null}
              <span className="truncate">{r.name}</span>
              {r.id.startsWith('custom-') && (
                <button 
                  onClick={(e) => deleteCustomRingtone(r.id, e)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </button>
          ))}
        </div>
      </div>

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
