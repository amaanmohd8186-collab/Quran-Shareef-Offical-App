import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import QuranView from './components/QuranView';
import QuizView from './components/QuizView';
import HadithView from './components/HadithView';
import DuaView from './components/DuaView';
import KalimasView from './components/KalimasView';
import FivePillarsView from './components/FivePillarsView';
import ReflectionJournalView from './components/ReflectionJournalView';
import HidayatView from './components/HidayatView';
import TasbeehView from './components/TasbeehView';
import AIAssistant from './components/AIAssistant';
import SettingsView from './components/SettingsView';
import PrivacyView from './components/PrivacyView';
import HomeView from './components/HomeView';
import PrayerAlarmView from './components/PrayerAlarmView';
import AsmaUlHusnaView from './components/AsmaUlHusnaView';
import CalendarView from './components/CalendarView';
import ZakatCalculatorView from './components/ZakatCalculatorView';
import IslamicHistoryView from './components/IslamicHistoryView';
import IslamicQuotesView from './components/IslamicQuotesView';
import LiveZiyaratView from './components/LiveZiyaratView';
import NamazTimesView from './components/NamazTimesView';
import QiblaView from './components/QiblaView';
import HifzDetectorView from './components/HifzDetectorView';
import SplashScreen from './components/SplashScreen';
import { AppView } from './types';
import { Menu, Volume2, X, Heart, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DEFAULT_AZAN_URL = 'https://www.islamcan.com/audio/adhan/azan1.mp3';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeView, setActiveView] = useState<AppView>('home');
  const [quranScrollPos, setQuranScrollPos] = useState(0);
  const [isQuranSearchMode, setIsQuranSearchMode] = useState(false);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setActiveView(event.state.view);
      } else {
        // If we hit the bottom of the stack, go home
        setActiveView('home');
        // Push home back onto the stack to prevent immediate exit on next back
        window.history.pushState({ view: 'home' }, '');
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initial state setup
    if (!window.history.state) {
      window.history.replaceState({ view: 'home' }, '');
      // Push an extra state so the first back button press doesn't exit
      window.history.pushState({ view: 'home' }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleViewChange = (view: AppView) => {
    if (view !== activeView) {
      window.history.pushState({ view }, '');
      setActiveView(view);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'en' | 'hi' | 'ur'>('en');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(DEFAULT_AZAN_URL);
    }
    
    const checkAlarms = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const currentSeconds = now.getSeconds();

      if (currentSeconds > 15) return;

      const alarms = JSON.parse(localStorage.getItem('prayer_alarms') || '[]');
      const triggered = alarms.find((a: any) => a.enabled && a.time === currentTime);

      if (triggered && !isAlarmPlaying) {
        if (audioRef.current) {
          audioRef.current.src = DEFAULT_AZAN_URL;
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
        return <HomeView setActiveView={handleViewChange} language={language} />;
      case 'quran':
        return (
          <QuranView 
            setActiveView={handleViewChange} 
            scrollPos={quranScrollPos} 
            setScrollPos={setQuranScrollPos}
            isSearchMode={isQuranSearchMode}
            setIsSearchMode={setIsQuranSearchMode}
          />
        );
      case 'assistant':
        return <AIAssistant setActiveView={handleViewChange} />;
      case 'hadith':
        return <HadithView setActiveView={handleViewChange} />;
      case 'dua':
        return <DuaView setActiveView={handleViewChange} />;
      case 'kalimas':
        return <KalimasView setActiveView={handleViewChange} />;
      case 'five_pillars':
        return <FivePillarsView setActiveView={handleViewChange} />;
      case 'reflection_journal':
        return <ReflectionJournalView setActiveView={handleViewChange} />;
      case 'tasbeeh':
        return <TasbeehView setActiveView={handleViewChange} />;
      case 'hidayat':
        return <HidayatView setActiveView={handleViewChange} />;
      case 'quiz':
        return <QuizView setActiveView={handleViewChange} />;
      case 'asma_ul_husna':
        return <AsmaUlHusnaView setActiveView={handleViewChange} />;
      case 'calendar':
        return <CalendarView setActiveView={handleViewChange} />;
      case 'zakat_calculator':
        return <ZakatCalculatorView setActiveView={handleViewChange} />;
      case 'islamic_history':
        return <IslamicHistoryView setActiveView={handleViewChange} />;
      case 'live_ziyarat':
        return <LiveZiyaratView setActiveView={handleViewChange} />;
      case 'namaz_times':
        return <NamazTimesView setActiveView={handleViewChange} />;
      case 'qibla':
        return <QiblaView setActiveView={handleViewChange} />;
      case 'hifz_detector':
        return <HifzDetectorView setActiveView={handleViewChange} />;
      case 'islamic_quotes':
        return <IslamicQuotesView setActiveView={handleViewChange} />;
      case 'prayer_alarm':
        return <PrayerAlarmView setActiveView={handleViewChange} isAlarmPlaying={isAlarmPlaying} stopAlarm={stopAlarm} />;
      case 'settings':
        return <SettingsView setActiveView={handleViewChange} />;
      case 'privacy':
        return <PrivacyView setActiveView={handleViewChange} />;
      default:
        return <HomeView setActiveView={handleViewChange} language={language} />;
    }
  };

  return (
    <div className="flex h-screen bg-cream dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
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
        setActiveView={handleViewChange} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header for mobile */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
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
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-islamic-green dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-500 hover:text-islamic-green dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 pb-20">
          <div className="max-w-7xl mx-auto h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <BottomNav activeView={activeView} setActiveView={handleViewChange} />
      </main>
    </div>
  );
}
