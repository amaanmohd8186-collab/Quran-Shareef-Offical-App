import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, ChevronRight, Loader2, Play, Pause, Volume2, SkipBack, SkipForward, Download, CheckCircle2, UserCircle, Languages, X, Youtube, FileText, Bookmark, BookmarkCheck, Heart, Trash2 } from 'lucide-react';
import { Surah, SurahDetail, Ayah, Bookmark as BookmarkType } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const RECITERS = [
  { id: 'ar.alafasy', name: 'Mishary Rashid Alafasy' },
  { id: 'ar.abdulsamad', name: 'Abdul Basit Abdus Samad' },
  { id: 'ar.abdurrahmaansudais', name: 'Abdurrahman As-Sudais' },
  { id: 'ar.mahermuaiqly', name: 'Maher Al Muaiqly' },
  { id: 'ar.minshawi', name: 'Mohamed Siddiq El-Minshawi' },
  { id: 'ar.saoodshuraym', name: 'Sa\'ud al-Shuraym' },
  { id: 'ar.hudhaify', name: 'Ali Al-Huthaify' },
];

const TRANSLATIONS = [
  { id: 'en.sahih', name: 'English (Sahih International)' },
  { id: 'ur.jalandhry', name: 'Urdu (Jalandhry)' },
  { id: 'fr.hamidullah', name: 'French (Hamidullah)' },
  { id: 'hi.farooq', name: 'Hindi (Farooq)' },
];

export default function QuranView() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<SurahDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [viewMode, setViewMode] = useState<'surah' | 'juz'>('surah');
  const [downloadingSurahs, setDownloadingSurahs] = useState<Record<number, boolean>>({});
  const [cachedSurahs, setCachedSurahs] = useState<number[]>([]);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].id);
  const [showReciterMenu, setShowReciterMenu] = useState(false);
  const [selectedTranslation, setSelectedTranslation] = useState(TRANSLATIONS[0].id);
  const [showTranslationMenu, setShowTranslationMenu] = useState(false);
  
  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Tafsir State
  const [selectedTafsir, setSelectedTafsir] = useState<{ surahNum: number, ayahNum: number, text: string, translation: string } | null>(null);
  const [tafsirContent, setTafsirContent] = useState<string | null>(null);
  const [isTafsirLoading, setIsTafsirLoading] = useState(false);
  const [tafsirError, setTafsirError] = useState<string | null>(null);
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [activeAyahNumber, setActiveAyahNumber] = useState<number | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const CACHE_NAME = 'quran-audio-cache-v1';

  useEffect(() => {
    fetchSurahs();
    loadCachedSurahList();
    loadBookmarks();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const loadBookmarks = () => {
    const saved = localStorage.getItem('quran_bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  };

  const toggleBookmark = (bookmark: Omit<BookmarkType, 'timestamp'>) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.id === bookmark.id);
      let updated;
      if (exists) {
        updated = prev.filter(b => b.id !== bookmark.id);
      } else {
        updated = [...prev, { ...bookmark, timestamp: Date.now() }];
      }
      localStorage.setItem('quran_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const loadCachedSurahList = () => {
    const cached = localStorage.getItem('quran_cached_surahs');
    if (cached) {
      setCachedSurahs(JSON.parse(cached));
    }
  };

  const downloadSurahAudio = async (number: number) => {
    if (downloadingSurahs[number]) return;
    
    setDownloadingSurahs(prev => ({ ...prev, [number]: true }));
    
    try {
      // 1. Fetch text detail and cache it
      await fetchSurahDetail(number);
      
      // 2. Fetch audio and cache it
      // Try Islamic Network first
      let url = `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciter}/${number}.mp3`;
      let response = await fetch(url);
      
      if (!response.ok) {
        // Fallback to QuranicAudio Download Server
        const s = number.toString().padStart(3, '0');
        const qAudioMap: Record<string, string> = {
          'ar.alafasy': 'mishari_rashid_alafasy',
          'ar.hudhaify': 'ali_alhuthaifi',
          'ar.abdulsamad': 'abdul_basit_murattal',
          'ar.abdurrahmaansudais': 'abdurrahman_as-sudais',
          'ar.mahermuaiqly': 'maher_almuaiqly',
          'ar.minshawi': 'muhammad_siddeeq_al-minshaawee',
          'ar.saoodshuraym': 'sa3ood_ash-shuraym'
        };
        const reciter = qAudioMap[selectedReciter] || 'mishari_rashid_alafasy';
        url = `https://download.quranicaudio.com/quran/${reciter}/${s}.mp3`;
        response = await fetch(url);
      }

      if (!response.ok) throw new Error('Failed to fetch audio from all sources');
      
      const cache = await caches.open(CACHE_NAME);
      await cache.put(url, response);
      
      // Store the URL that worked so we can play it from cache later
      const workedUrlKey = `quran_audio_url_${number}_${selectedReciter}`;
      localStorage.setItem(workedUrlKey, url);
      
      const updated = [...new Set([...cachedSurahs, number])];
      setCachedSurahs(updated);
      localStorage.setItem('quran_cached_surahs', JSON.stringify(updated));
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download audio for offline use.');
    } finally {
      setDownloadingSurahs(prev => ({ ...prev, [number]: false }));
    }
  };

  const removeCachedSurah = async (number: number) => {
    const workedUrlKey = `quran_audio_url_${number}_${selectedReciter}`;
    const storedUrl = localStorage.getItem(workedUrlKey);
    const url = storedUrl || `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciter}/${number}.mp3`;
    
    const cache = await caches.open(CACHE_NAME);
    await cache.delete(url);
    localStorage.removeItem(workedUrlKey);
    
    const updated = cachedSurahs.filter(n => n !== number);
    setCachedSurahs(updated);
    localStorage.setItem('quran_cached_surahs', JSON.stringify(updated));
  };

  const fetchSurahs = async () => {
    // Try to load from cache first
    const cachedData = localStorage.getItem('quran_surah_list');
    if (cachedData) {
      setSurahs(JSON.parse(cachedData));
      setLoading(false);
    }

    try {
      const response = await fetch('https://api.alquran.cloud/v1/surah');
      const data = await response.json();
      setSurahs(data.data);
      localStorage.setItem('quran_surah_list', JSON.stringify(data.data));
    } catch (error) {
      console.error('Error fetching surahs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTafsir = async (surahNum: number, ayahNum: number, text: string, translation: string) => {
    setSelectedTafsir({ surahNum, ayahNum, text, translation });
    setTafsirContent(null);
    setTafsirError(null);
    setIsTafsirLoading(true);
    
    try {
      // 169 is Ibn Kathir (English)
      const response = await fetch(`https://api.quran.com/api/v4/tafsirs/169/by_ayah/${surahNum}:${ayahNum}`);
      if (!response.ok) throw new Error('Failed to fetch Tafsir');
      const data = await response.json();
      setTafsirContent(data.tafsir.text);
    } catch (err) {
      setTafsirError("Could not load Tafsir. Please try again later.");
    } finally {
      setIsTafsirLoading(false);
    }
  };

  const fetchSurahDetail = async (number: number, translationId = selectedTranslation) => {
    // Try to load from cache first
    const cacheKey = `quran_surah_${number}_${translationId}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      setSelectedSurah(JSON.parse(cachedData));
      return;
    }

    setLoadingDetail(true);
    try {
      const [arabicRes, translationRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${number}/quran-uthmani`),
        fetch(`https://api.alquran.cloud/v1/surah/${number}/${translationId}`)
      ]);
      
      const arabicData = await arabicRes.json();
      const translationData = await translationRes.json();
      
      const combinedAyahs = arabicData.data.ayahs.map((ayah: Ayah, index: number) => ({
        ...ayah,
        translation: translationData.data.ayahs[index].text
      }));

      const fullData = {
        ...arabicData.data,
        ayahs: combinedAyahs
      };

      setSelectedSurah(fullData);
      // Auto-cache when viewed
      localStorage.setItem(cacheKey, JSON.stringify(fullData));
      if (!cachedSurahs.includes(number)) {
        const newCached = [...cachedSurahs, number];
        setCachedSurahs(newCached);
        localStorage.setItem('quran_cached_surahs', JSON.stringify(newCached));
      }
    } catch (error) {
      console.error('Error fetching surah detail:', error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const downloadSurah = async (number: number) => {
    if (cachedSurahs.includes(number)) return;
    setLoadingDetail(true);
    await fetchSurahDetail(number);
    setLoadingDetail(false);
  };

  const playAudio = async (url: string, context?: { ayahGlobal?: number, surahNum?: number, ayahInSurah?: number }, isFallback = false) => {
    if (!isFallback) {
      setAudioError(null);
      setIsAudioLoading(true);
    }

    if (!url) {
      setAudioError("Invalid audio URL.");
      setIsAudioLoading(false);
      return;
    }

    // Stop existing audio if any
    if (audioRef.current) {
      if (currentAudioUrl === url) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          setIsAudioLoading(false);
        } else {
          try {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              await playPromise;
              setIsPlaying(true);
              setIsAudioLoading(false);
            }
          } catch (e) {
            console.error("Audio play failed:", e);
            setAudioError("Playback interrupted. Please try again.");
            setIsAudioLoading(false);
          }
        }
        return;
      }
      audioRef.current.pause();
      audioRef.current.src = ""; // Clear source
    }

    // Check cache first
    let audioSource = url;
    try {
      const cache = await caches.open(CACHE_NAME);
      
      // If it's a Surah, check if we have a stored worked URL
      if (context?.surahNum && !context?.ayahInSurah) {
        const workedUrlKey = `quran_audio_url_${context.surahNum}_${selectedReciter}`;
        const storedUrl = localStorage.getItem(workedUrlKey);
        if (storedUrl) {
          const cachedResponse = await cache.match(storedUrl);
          if (cachedResponse) {
            const blob = await cachedResponse.blob();
            audioSource = URL.createObjectURL(blob);
            console.log("Playing from offline cache (stored URL):", storedUrl);
          }
        }
      }

      if (audioSource === url) {
        const cachedResponse = await cache.match(url);
        if (cachedResponse) {
          const blob = await cachedResponse.blob();
          audioSource = URL.createObjectURL(blob);
          console.log("Playing from offline cache:", url);
        }
      }
    } catch (e) {
      console.warn("Cache check failed, playing from network:", e);
    }

    const audio = new Audio();
    // Only set crossOrigin for network URLs to avoid issues with local blobs
    // and only if we haven't failed with it before for this URL
    const hasFailedWithCORS = localStorage.getItem(`cors_fail_${url}`);
    if (!audioSource.startsWith('blob:') && !hasFailedWithCORS) {
      audio.crossOrigin = "anonymous";
    }
    
    audio.src = audioSource;
    audioRef.current = audio;
    setCurrentAudioUrl(url);
    setActiveAyahNumber(context?.ayahGlobal || null);
    setAudioError(null); // Clear previous errors
    
    audio.oncanplay = async () => {
      try {
        if (audioRef.current === audio) {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
            setIsAudioLoading(false);
          }
        }
      } catch (e) {
        console.error("Audio play failed:", e);
        // If it's a blob URL and it failed, maybe the blob is corrupted?
        // Let's try to play from network as a last resort
        if (audioSource.startsWith('blob:') && !isFallback) {
          console.log("Cached blob failed, falling back to network...");
          playAudio(url, context, true);
        } else {
          setIsAudioLoading(false);
        }
      }
    };

    audio.onplay = () => {
      setIsPlaying(true);
      setIsAudioLoading(false);
    };

    audio.onpause = () => {
      setIsPlaying(false);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setActiveAyahNumber(null);
      setIsAudioLoading(false);
    };

    audio.onerror = () => {
      console.error("Audio Error for URL:", url);
      
      // If CORS failed, remember it and retry without crossOrigin
      if (audio.crossOrigin === "anonymous") {
        console.log("CORS might have failed, retrying without crossOrigin...");
        localStorage.setItem(`cors_fail_${url}`, 'true');
        playAudio(url, context, true);
        return;
      }

      // Multi-stage Fallback logic
      let fallbackUrl = "";
      const stage = (url.includes('islamic.network') ? 1 : 
                    url.includes('qurancdn.com') ? 2 : 
                    url.includes('everyayah.com') ? 3 : 
                    url.includes('verses.quran.com') ? 4 :
                    url.includes('quranicaudio.com') ? 5 : 6);

      if (stage < 6) {
        // If it's an Ayah audio
        if (context?.surahNum && context?.ayahInSurah) {
          const s = context.surahNum.toString().padStart(3, '0');
          const a = context.ayahInSurah.toString().padStart(3, '0');

          if (stage === 1) {
            // Stage 2: Quran.com CDN (Most reliable)
            const quranCdnMap: Record<string, string> = {
              'ar.alafasy': 'Mishari_Rashid_Al-Afasy',
              'ar.hudhaify': 'Ali_Al-Huthaifi',
              'ar.minshawi': 'Muhammad_Siddiq_al-Minshawi',
              'ar.abdulsamad': 'Abdul_Basit_Murattal',
              'ar.abdurrahmaansudais': 'Abdurrahmaan_As-Sudais',
              'ar.mahermuaiqly': 'Maher_Al-Muaiqly',
              'ar.saoodshuraym': 'Sa\'ood_ash-Shuraym'
            };
            const reciter = quranCdnMap[selectedReciter] || 'Mishari_Rashid_Al-Afasy';
            fallbackUrl = `https://audio.qurancdn.com/${reciter}/mp3/${s}${a}.mp3`;
          } else if (stage === 2) {
            // Stage 3: EveryAyah
            const everyAyahMap: Record<string, string> = {
              'ar.alafasy': 'Alafasy_128kbps',
              'ar.hudhaify': 'Hudhaify_128kbps',
              'ar.minshawi': 'Minshawi_Murattal_128kbps',
              'ar.abdulsamad': 'Abdul_Basit_Murattal_128kbps',
              'ar.abdurrahmaansudais': 'Abdurrahmaan_As-Sudais_192kbps',
              'ar.mahermuaiqly': 'Maher_AlMuaiqly_64kbps',
              'ar.saoodshuraym': 'Saood_ash-Shuraym_128kbps'
            };
            const reciter = everyAyahMap[selectedReciter] || 'Alafasy_128kbps';
            fallbackUrl = `https://www.everyayah.com/data/${reciter}/${s}${a}.mp3`;
          }
        } 
        // If it's a Surah audio
        else if (context?.surahNum) {
          const s = context.surahNum.toString().padStart(3, '0');
          
          const qAudioMap: Record<string, string> = {
            'ar.alafasy': 'mishari_rashid_alafasy',
            'ar.hudhaify': 'ali_alhuthaifi',
            'ar.abdulsamad': 'abdul_basit_murattal',
            'ar.abdurrahmaansudais': 'abdurrahman_as-sudais',
            'ar.mahermuaiqly': 'maher_almuaiqly',
            'ar.minshawi': 'muhammad_siddeeq_al-minshaawee',
            'ar.saoodshuraym': 'sa3ood_ash-shuraym'
          };
          
          const versesMap: Record<string, string> = {
            'ar.alafasy': 'Mishari_Rashid_Al-Afasy',
            'ar.abdulsamad': 'Abdul_Basit_Murattal',
            'ar.hudhaify': 'Ali_Al-Huthaifi',
            'ar.minshawi': 'Muhammad_Siddiq_al-Minshawi',
            'ar.abdurrahmaansudais': 'Abdurrahmaan_As-Sudais',
            'ar.mahermuaiqly': 'Maher_Al-Muaiqly',
            'ar.saoodshuraym': 'Sa\'ood_ash-Shuraym'
          };

          const reciter = qAudioMap[selectedReciter] || 'mishari_rashid_alafasy';
          const vReciter = versesMap[selectedReciter] || 'Mishari_Rashid_Al-Afasy';

          if (stage === 1) {
            // Stage 2: Verses.quran.com (Very stable)
            fallbackUrl = `https://verses.quran.com/${vReciter}/mp3/${s}.mp3`;
          } else if (stage === 4) {
            // Stage 3: QuranicAudio Download Server
            fallbackUrl = `https://download.quranicaudio.com/quran/${reciter}/${s}.mp3`;
          } else if (stage === 5) {
            // Stage 4: Try another QuranicAudio server if download fails
            const servers = ['server10', 'server6', 'server12', 'server8'];
            const currentServerMatch = url.match(/https:\/\/(.*?)\.quranicaudio\.com/);
            const currentServer = currentServerMatch ? currentServerMatch[1] : 'download';
            
            let nextServer = '';
            if (currentServer === 'download') {
              nextServer = 'server10';
            } else {
              const currentIndex = servers.indexOf(currentServer);
              if (currentIndex !== -1 && currentIndex < servers.length - 1) {
                nextServer = servers[currentIndex + 1];
              }
            }
            
            if (nextServer) {
              fallbackUrl = `https://${nextServer}.quranicaudio.com/quran/${reciter}/${s}.mp3`;
            }
          }
        }

        if (fallbackUrl && fallbackUrl !== url) {
          console.log(`Attempting Stage Fallback:`, fallbackUrl);
          playAudio(fallbackUrl, context, true);
          return;
        }
      }

      setAudioError("Audio source not found. Please try another reciter or check your connection.");
      setIsPlaying(false);
      setActiveAyahNumber(null);
      setIsAudioLoading(false);
    };
  };

  const playSurahAudio = async (number: number) => {
    const url = `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciter}/${number}.mp3`;
    playAudio(url, { surahNum: number });
  };

  const playAyahAudio = (ayahGlobal: number, ayahInSurah: number, surahNum: number) => {
    const url = `https://cdn.islamic.network/quran/audio/128/${selectedReciter}/${ayahGlobal}.mp3`;
    playAudio(url, { ayahGlobal, ayahInSurah, surahNum });
  };

  const fetchJuzDetail = async (number: number, translationId = selectedTranslation) => {
    setLoadingDetail(true);
    try {
      const [arabicRes, translationRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/juz/${number}/quran-uthmani`),
        fetch(`https://api.alquran.cloud/v1/juz/${number}/${translationId}`)
      ]);
      
      const arabicData = await arabicRes.json();
      const translationData = await translationRes.json();
      
      const combinedAyahs = arabicData.data.ayahs.map((ayah: any, index: number) => ({
        ...ayah,
        translation: translationData.data.ayahs[index].text
      }));

      setSelectedSurah({
        number: number,
        name: `الجزء ${number}`,
        englishName: `Juz ${number}`,
        englishNameTranslation: `Para ${number}`,
        numberOfAyahs: combinedAyahs.length,
        revelationType: '',
        ayahs: combinedAyahs
      });
    } catch (error) {
      console.error('Error fetching juz detail:', error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.number.toString().includes(searchQuery)
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <Loader2 className="w-12 h-12 text-islamic-green animate-spin" />
        <p className="text-serif italic text-slate-500">Loading the Holy Quran...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="wait">
        {!selectedSurah ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-4xl font-serif text-islamic-green">The Holy Quran</h2>
                <p className="text-slate-500 italic">Read, reflect, and find peace.</p>
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                <div className="relative">
                  <button 
                    onClick={() => setShowTranslationMenu(!showTranslationMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full text-sm font-medium text-slate-600 hover:text-islamic-green transition-all shadow-sm"
                  >
                    <Languages className="w-4 h-4" />
                    <span className="max-w-[120px] truncate">
                      {TRANSLATIONS.find(t => t.id === selectedTranslation)?.name.split(' (')[0]}
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {showTranslationMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 left-0 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-2"
                      >
                        {TRANSLATIONS.map(translation => (
                          <button
                            key={translation.id}
                            onClick={() => {
                              setSelectedTranslation(translation.id);
                              setShowTranslationMenu(false);
                            }}
                            className={cn(
                              "w-full text-left px-4 py-2 text-sm transition-colors",
                              selectedTranslation === translation.id ? "bg-islamic-green/10 text-islamic-green font-bold" : "text-slate-600 hover:bg-slate-50"
                            )}
                          >
                            {translation.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <button 
                    onClick={() => setShowReciterMenu(!showReciterMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full text-sm font-medium text-slate-600 hover:text-islamic-green transition-all shadow-sm"
                  >
                    <UserCircle className="w-4 h-4" />
                    <span className="max-w-[120px] truncate">
                      {RECITERS.find(r => r.id === selectedReciter)?.name}
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {showReciterMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 left-0 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-2"
                      >
                        {RECITERS.map(reciter => (
                          <button
                            key={reciter.id}
                            onClick={() => {
                              setSelectedReciter(reciter.id);
                              setShowReciterMenu(false);
                            }}
                            className={cn(
                              "w-full text-left px-4 py-2 text-sm transition-colors",
                              selectedReciter === reciter.id ? "bg-islamic-green/10 text-islamic-green font-bold" : "text-slate-600 hover:bg-slate-50"
                            )}
                          >
                            {reciter.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex bg-white border border-slate-100 rounded-full p-1 shadow-sm">
                  <button 
                    onClick={() => setViewMode('surah')}
                    className={cn(
                      "px-6 py-1.5 rounded-full text-sm font-medium transition-all",
                      viewMode === 'surah' ? "bg-islamic-green text-white shadow-sm" : "text-slate-500 hover:text-islamic-green"
                    )}
                  >
                    Surah
                  </button>
                  <button 
                    onClick={() => setViewMode('juz')}
                    className={cn(
                      "px-6 py-1.5 rounded-full text-sm font-medium transition-all",
                      viewMode === 'juz' ? "bg-islamic-green text-white shadow-sm" : "text-slate-500 hover:text-islamic-green"
                    )}
                  >
                    Juz
                  </button>
                </div>

                <button 
                  onClick={() => setShowBookmarks(true)}
                  className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-100 rounded-full text-sm font-medium text-slate-600 hover:text-rose-500 transition-all shadow-sm"
                >
                  <Heart className={cn("w-4 h-4", bookmarks.length > 0 && "fill-rose-500 text-rose-500")} />
                  <span>Bookmarks</span>
                </button>

                {isPlaying && (
                  <button 
                    onClick={() => {
                      if (audioRef.current) audioRef.current.pause();
                      setIsPlaying(false);
                      setActiveAyahNumber(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-full text-sm font-bold hover:bg-rose-100 transition-all shadow-sm"
                  >
                    <X className="w-4 h-4" /> Stop Audio
                  </button>
                )}

                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-islamic-green transition-colors" />
                  <input 
                    type="text" 
                    placeholder={viewMode === 'surah' ? "Search Surah..." : "Search Juz..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-islamic-green/20 focus:border-islamic-green transition-all w-full md:w-64"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {viewMode === 'surah' ? (
                filteredSurahs.map((surah) => (
                  <div
                    key={surah.number}
                    onClick={() => fetchSurahDetail(surah.number)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchSurahDetail(surah.number)}
                    role="button"
                    tabIndex={0}
                    className="group flex items-center p-4 bg-white border border-slate-100 rounded-2xl hover:border-islamic-green/30 hover:shadow-lg hover:shadow-islamic-green/5 transition-all text-left cursor-pointer outline-none focus:ring-2 focus:ring-islamic-green/20"
                  >
                    <div className="w-10 h-10 rounded-xl bg-islamic-green/5 flex items-center justify-center text-islamic-green font-serif font-bold group-hover:bg-islamic-green group-hover:text-white transition-colors">
                      {surah.number}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-slate-800">{surah.englishName}</h3>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">{surah.englishNameTranslation}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <p className="arabic-text text-xl text-islamic-green">{surah.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] text-slate-400 uppercase">{surah.numberOfAyahs} Ayahs</p>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark({
                              id: `surah:${surah.number}`,
                              type: 'surah',
                              surahNumber: surah.number,
                              surahName: surah.englishName
                            });
                          }}
                          className={cn(
                            "p-1 rounded-md transition-all",
                            bookmarks.find(b => b.id === `surah:${surah.number}`)
                              ? "text-islamic-gold"
                              : "text-slate-300 hover:text-islamic-gold"
                          )}
                          title="Bookmark Surah"
                        >
                          {bookmarks.find(b => b.id === `surah:${surah.number}`) ? (
                            <BookmarkCheck className="w-3 h-3 fill-current" />
                          ) : (
                            <Bookmark className="w-3 h-3" />
                          )}
                        </button>
                        {cachedSurahs.includes(surah.number) ? (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCachedSurah(surah.number);
                            }}
                            className="p-1 hover:bg-rose-50 rounded-md text-emerald-500 hover:text-rose-500 transition-colors"
                            title="Remove from offline"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                          </button>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadSurahAudio(surah.number);
                            }}
                            className={cn(
                              "p-1 rounded-md transition-all",
                              downloadingSurahs[surah.number] 
                                ? "bg-islamic-green/10 text-islamic-green animate-pulse" 
                                : "hover:bg-islamic-green/10 text-slate-300 hover:text-islamic-green"
                            )}
                            title="Download for offline"
                            disabled={downloadingSurahs[surah.number]}
                          >
                            {downloadingSurahs[surah.number] ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Download className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                Array.from({ length: 30 }, (_, i) => i + 1)
                  .filter(j => j.toString().includes(searchQuery))
                  .map((juz) => (
                    <div
                      key={juz}
                      onClick={() => fetchJuzDetail(juz)}
                      onKeyDown={(e) => e.key === 'Enter' && fetchJuzDetail(juz)}
                      role="button"
                      tabIndex={0}
                      className="group flex items-center p-4 bg-white border border-slate-100 rounded-2xl hover:border-islamic-green/30 hover:shadow-lg hover:shadow-islamic-green/5 transition-all text-left cursor-pointer outline-none focus:ring-2 focus:ring-islamic-green/20"
                    >
                      <div className="w-10 h-10 rounded-xl bg-islamic-green/5 flex items-center justify-center text-islamic-green font-serif font-bold group-hover:bg-islamic-green group-hover:text-white transition-colors">
                        {juz}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-slate-800">Juz {juz}</h3>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Para {juz}</p>
                      </div>
                      <div className="text-right">
                        <p className="arabic-text text-xl text-islamic-green">الجزء {juz}</p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col space-y-6 pb-20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => {
                    setSelectedSurah(null);
                    if (audioRef.current) audioRef.current.pause();
                    setIsPlaying(false);
                  }}
                  className="p-2 hover:bg-islamic-green/5 rounded-full text-islamic-green transition-colors"
                >
                  <ChevronRight className="w-6 h-6 rotate-180" />
                </button>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-serif text-islamic-green">{selectedSurah.englishName}</h2>
                    {cachedSurahs.includes(selectedSurah.number) ? (
                      <button 
                        onClick={() => removeCachedSurah(selectedSurah.number)}
                        className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-rose-50 hover:text-rose-600 transition-all"
                        title="Remove from offline"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => downloadSurahAudio(selectedSurah.number)}
                        className={cn(
                          "p-2 rounded-full transition-all",
                          downloadingSurahs[selectedSurah.number]
                            ? "bg-islamic-green/10 text-islamic-green animate-pulse"
                            : "bg-slate-50 text-slate-400 hover:bg-islamic-green/10 hover:text-islamic-green"
                        )}
                        title="Download for offline"
                        disabled={downloadingSurahs[selectedSurah.number]}
                      >
                        {downloadingSurahs[selectedSurah.number] ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Download className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>
                  <p className="text-slate-500 italic">{selectedSurah.englishNameTranslation} • {selectedSurah.revelationType}</p>
                </div>
              </div>

              <button 
                onClick={() => playSurahAudio(selectedSurah.number)}
                disabled={isAudioLoading}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-bold shadow-lg",
                  isPlaying && currentAudioUrl?.includes(`audio-surah`) 
                    ? "bg-islamic-gold text-white shadow-islamic-gold/20" 
                    : "bg-islamic-green text-white shadow-islamic-green/20 hover:bg-islamic-green/90",
                  isAudioLoading && "opacity-70 cursor-not-allowed"
                )}
              >
                {isAudioLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  isPlaying && currentAudioUrl?.includes(`audio-surah`) ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />
                )}
                {isAudioLoading ? "Loading..." : (isPlaying && currentAudioUrl?.includes(`audio-surah`) ? "Playing Surah" : "Listen Surah")}
              </button>
            </div>

            {audioError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-50 border border-rose-100 text-rose-600 px-6 py-4 rounded-2xl text-sm font-medium flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  {audioError}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => playSurahAudio(selectedSurah.number)}
                    className="w-fit px-4 py-1.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all active:scale-95 shadow-sm"
                  >
                    Try Again
                  </button>
                  <button 
                    onClick={() => {
                      const reciterName = RECITERS.find(r => r.id === selectedReciter)?.name || "";
                      const query = encodeURIComponent(`Surah ${selectedSurah.englishName} ${reciterName} full recitation`);
                      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
                    }}
                    className="w-fit px-4 py-1.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all active:scale-95 shadow-sm flex items-center gap-2"
                  >
                    <Youtube className="w-4 h-4" />
                    Search on YouTube
                  </button>
                </div>
              </motion.div>
            )}

            <div className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center space-y-8 shadow-sm">
              {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
                <p className="arabic-text text-4xl text-islamic-green mb-8">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              )}
              
              <div className="w-full space-y-12">
                {selectedSurah.ayahs.map((ayah: any) => (
                  <div 
                    key={ayah.number} 
                    onClick={() => playAyahAudio(ayah.number, ayah.numberInSurah, ayah.surah?.number || selectedSurah.number)}
                    className={cn(
                      "flex flex-col space-y-6 pb-8 border-bottom border-slate-50 last:border-0 transition-all rounded-2xl p-4 cursor-pointer hover:bg-islamic-green/[0.02]",
                      activeAyahNumber === ayah.number ? "bg-islamic-green/5 ring-1 ring-islamic-green/10 shadow-sm" : ""
                    )}
                  >
                    <div className="flex justify-between items-start gap-8">
                      <div className="flex flex-col items-center gap-4 shrink-0 mt-2">
                        <div className={cn(
                          "w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold transition-colors",
                          activeAyahNumber === ayah.number ? "bg-islamic-green text-white border-islamic-green" : "border-islamic-green/20 text-islamic-green"
                        )}>
                          {ayah.numberInSurah}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            playAyahAudio(ayah.number, ayah.numberInSurah, ayah.surah?.number || selectedSurah.number);
                          }}
                          disabled={isAudioLoading && activeAyahNumber === ayah.number}
                          className={cn(
                            "p-2 rounded-xl transition-all",
                            activeAyahNumber === ayah.number 
                              ? "bg-islamic-gold text-white" 
                              : "bg-islamic-green/5 text-islamic-green hover:bg-islamic-green hover:text-white",
                            isAudioLoading && activeAyahNumber === ayah.number && "opacity-70 cursor-not-allowed"
                          )}
                          title="Play Audio"
                        >
                          {isAudioLoading && activeAyahNumber === ayah.number ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            activeAyahNumber === ayah.number && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            fetchTafsir(selectedSurah.number, ayah.numberInSurah, ayah.text, ayah.translation);
                          }}
                          className="p-2 rounded-xl transition-all bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                          title="Read Tafsir"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark({
                              id: `ayah:${selectedSurah.number}:${ayah.numberInSurah}`,
                              type: 'ayah',
                              surahNumber: selectedSurah.number,
                              surahName: selectedSurah.englishName,
                              ayahNumber: ayah.numberInSurah,
                              text: ayah.text,
                              translation: ayah.translation
                            });
                          }}
                          className={cn(
                            "p-2 rounded-xl transition-all",
                            bookmarks.find(b => b.id === `ayah:${selectedSurah.number}:${ayah.numberInSurah}`)
                              ? "bg-rose-50 text-rose-500"
                              : "bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                          )}
                          title="Bookmark Ayah"
                        >
                          <Heart className={cn("w-4 h-4", bookmarks.find(b => b.id === `ayah:${selectedSurah.number}:${ayah.numberInSurah}`) && "fill-current")} />
                        </button>
                      </div>
                      <p className="arabic-text text-3xl text-right leading-[2.5] text-slate-800 flex-1">
                        {ayah.text}
                      </p>
                    </div>
                    <p className="text-slate-600 leading-relaxed pl-16 italic">
                      {ayah.translation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loadingDetail && (
        <div className="fixed inset-0 bg-cream/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 text-islamic-green animate-spin" />
            <p className="text-serif italic text-slate-600">Opening the Surah...</p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showBookmarks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6"
            onClick={() => setShowBookmarks(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">My Bookmarks</h3>
                    <p className="text-sm text-slate-500">{bookmarks.length} saved items</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBookmarks(false)}
                  className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
                {bookmarks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
                      <Bookmark className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-600">No bookmarks yet</h4>
                    <p className="text-slate-400 max-w-xs mx-auto mt-2">
                      Click the heart or bookmark icon on any Surah or Ayah to save it here for quick access.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookmarks.sort((a, b) => b.timestamp - a.timestamp).map((bookmark) => (
                      <div 
                        key={bookmark.id}
                        className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                              bookmark.type === 'surah' ? "bg-islamic-green/10 text-islamic-green" : "bg-islamic-gold/10 text-islamic-gold"
                            )}>
                              {bookmark.type}
                            </span>
                            <h4 className="font-bold text-slate-800">
                              {bookmark.type === 'surah' ? bookmark.surahName : `Surah ${bookmark.surahName}, Ayah ${bookmark.ayahNumber}`}
                            </h4>
                          </div>
                          <button 
                            onClick={() => toggleBookmark(bookmark)}
                            className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {bookmark.type === 'ayah' && (
                          <div className="space-y-2 mb-4">
                            <p className="arabic-text text-xl text-right text-slate-800">{bookmark.text}</p>
                            <p className="text-sm text-slate-500 italic line-clamp-2">{bookmark.translation}</p>
                          </div>
                        )}
                        
                        <button
                          onClick={() => {
                            if (bookmark.type === 'surah') {
                              fetchSurahDetail(bookmark.surahNumber);
                            } else {
                              fetchSurahDetail(bookmark.surahNumber);
                            }
                            setShowBookmarks(false);
                          }}
                          className="w-full py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-medium hover:bg-islamic-green hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <BookOpen className="w-4 h-4" />
                          Open {bookmark.type === 'surah' ? 'Surah' : 'Ayah'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedTafsir && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6"
            onClick={() => setSelectedTafsir(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl max-h-[85vh] rounded-3xl shadow-xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Tafsir Ibn Kathir</h3>
                  <p className="text-sm text-slate-500">Surah {selectedSurah?.englishName} • Ayah {selectedTafsir.ayahNum}</p>
                </div>
                <button
                  onClick={() => setSelectedTafsir(null)}
                  className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
                  <p className="arabic-text text-3xl text-right leading-[2.5] text-slate-800 mb-6">
                    {selectedTafsir.text}
                  </p>
                  <p className="text-slate-600 leading-relaxed italic">
                    {selectedTafsir.translation}
                  </p>
                </div>

                {isTafsirLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin mb-4 text-islamic-green" />
                    <p>Loading Tafsir...</p>
                  </div>
                ) : tafsirError ? (
                  <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-center">
                    {tafsirError}
                  </div>
                ) : tafsirContent ? (
                  <div 
                    className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-islamic-green"
                    dangerouslySetInnerHTML={{ __html: tafsirContent }}
                  />
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
