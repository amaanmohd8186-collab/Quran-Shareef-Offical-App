import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import QuranView from './components/QuranView';
import AIAssistant from './components/AIAssistant';
import QuizView from './components/QuizView';
import HadithView from './components/HadithView';
import DuaView from './components/DuaView';
import QiblaView from './components/QiblaView';
import HidayatView from './components/HidayatView';
import TasbeehView from './components/TasbeehView';
import SettingsView from './components/SettingsView';
import PrivacyView from './components/PrivacyView';
import HomeView from './components/HomeView';
import PrayerAlarmView from './components/PrayerAlarmView';
import { AppView } from './types';
import { Menu, Volume2, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DEFAULT_RINGTONES = [
  { id: 'azan1', name: 'Azan 1 (Makkah)', url: 'https://www.islamcan.com/audio/adhan/azan1.mp3' },
  { id: 'azan2', name: 'Azan 2 (Madinah)', url: 'https://www.islamcan.com/audio/adhan/azan2.mp3' },
  { id: 'azan3', name: 'Azan 3 (Egypt)', url: 'https://www.islamcan.com/audio/adhan/azan3.mp3' },
  { id: 'azan4', name: 'Azan 4 (Al-Aqsa)', url: 'https://www.islamcan.com/audio/adhan/azan4.mp3' },
  { id: 'azan5', name: 'Azan 5 (Turkey)', url: 'https://www.islamcan.com/audio/adhan/azan5.mp3' },
  { id: 'azan6', name: 'Azan 6 (Bosnia)', url: 'https://www.islamcan.com/audio/adhan/azan6.mp3' },
  { id: 'beep', name: 'Soft Beep', url: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' },
];

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedRingtone = localStorage.getItem('prayer_ringtone') || 'azan1';
    const custom = JSON.parse(localStorage.getItem('custom_ringtones') || '[]');
    const all = [...DEFAULT_RINGTONES, ...custom];
    const ringtoneUrl = all.find(r => r.id === savedRingtone)?.url || DEFAULT_RINGTONES[0].url;
    audioRef.current = new Audio(ringtoneUrl);
    
    const checkAlarms = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const currentSeconds = now.getSeconds();

      if (currentSeconds > 15) return;

      const alarms = JSON.parse(localStorage.getItem('prayer_alarms') || '[]');
      const triggered = alarms.find((a: any) => a.enabled && a.time === currentTime);

      if (triggered && !isAlarmPlaying) {
        // Refresh ringtone from storage in case it changed
        const currentRingtone = localStorage.getItem('prayer_ringtone') || 'azan1';
        const customRingtones = JSON.parse(localStorage.getItem('custom_ringtones') || '[]');
        const allRingtones = [...DEFAULT_RINGTONES, ...customRingtones];
        const currentUrl = allRingtones.find(r => r.id === currentRingtone)?.url || DEFAULT_RINGTONES[0].url;
        
        if (audioRef.current) {
          audioRef.current.src = currentUrl;
          audioRef.current.play().catch(e => console.error("Global Azan failed:", e));
        }
        setIsAlarmPlaying(true);
      }
    };

    const handleStop = () => stopAlarm();
    window.addEventListener('stop-global-alarm', handleStop);

    const interval = setInterval(checkAlarms, 10000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('stop-global-alarm', handleStop);
    };
  }, [isAlarmPlaying]);

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAlarmPlaying(false);
  };

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView setActiveView={setActiveView} />;
      case 'quran':
        return <QuranView />;
      case 'assistant':
        return <AIAssistant />;
      case 'hadith':
        return <HadithView />;
      case 'dua':
        return <DuaView />;
      case 'qibla':
        return <QiblaView />;
      case 'tasbeeh':
        return <TasbeehView />;
      case 'hidayat':
        return <HidayatView />;
      case 'quiz':
        return <QuizView />;
      case 'prayer_alarm':
        return <PrayerAlarmView />;
      case 'settings':
        return <SettingsView setActiveView={setActiveView} />;
      case 'privacy':
        return <PrivacyView setActiveView={setActiveView} />;
      default:
        return <HomeView setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-cream overflow-hidden">
      <AnimatePresence>
        {isAlarmPlaying && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md bg-islamic-green text-white p-6 rounded-3xl shadow-2xl flex items-center justify-between border-4 border-white/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">Prayer Time!</p>
                <p className="text-white/80 text-xs italic">Hayya 'ala-s-Salah</p>
              </div>
            </div>
            <button 
              onClick={stopAlarm}
              className="px-4 py-2 bg-white text-islamic-green rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              STOP
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header for mobile */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-islamic-green rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/app-logo.jpg" 
                alt="Quran Shareef Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const span = document.createElement('span');
                    span.className = 'font-serif font-bold text-white';
                    span.innerText = 'Q';
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
            <h1 className="text-xl font-serif font-bold text-islamic-green">Quran Shareef</h1>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href={`upi://pay?pa=9719818918@ybl&pn=Amaan%20Siddiqui&cu=INR`}
              className="flex items-center gap-1 px-3 py-1.5 bg-islamic-green/10 text-islamic-green rounded-full text-xs font-bold hover:bg-islamic-green/20 transition-colors"
            >
              <Heart className="w-3 h-3 fill-current" />
              Donate
            </a>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-500 hover:text-islamic-green"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto h-full">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
}
