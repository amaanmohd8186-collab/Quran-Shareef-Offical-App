import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, ChevronRight, Loader2, Play, Pause, Volume2, SkipBack, SkipForward, Download, CheckCircle2, UserCircle, Languages, X, FileText, Bookmark, BookmarkCheck, Heart, Trash2, ArrowLeft, MessageSquare } from 'lucide-react';
import { Surah, SurahDetail, Ayah, Bookmark as BookmarkType, AppView } from '../types';
import { cn, toArabicNumerals } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import surahsData from '../data/surahs.json';

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
  { id: 'hi.hindi', name: 'Hindi (Hindi)' },
  { id: 'bn.bengali', name: 'Bengali (Bengali)' },
];

const QURAN_COM_RECITATION_IDS: Record<string, number> = {
  'ar.alafasy': 7,
  'ar.abdulsamad': 1,
  'ar.abdurrahmaansudais': 3,
  'ar.mahermuaiqly': 12,
  'ar.minshawi': 4,
  'ar.saoodshuraym': 11,
  'ar.hudhaify': 6,
};

interface QuranViewProps {
  setActiveView: (view: AppView) => void;
  scrollPos: number;
  setScrollPos: (pos: number) => void;
  isSearchMode: boolean;
  setIsSearchMode: (mode: boolean) => void;
}

export default function QuranView({ setActiveView, scrollPos, setScrollPos, isSearchMode, setIsSearchMode }: QuranViewProps) {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<SurahDetail | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current && scrollPos > 0) {
      containerRef.current.scrollTop = scrollPos;
    }
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPos(containerRef.current.scrollTop);
    }
  };
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [viewMode, setViewMode] = useState<'surah' | 'juz'>('surah');
  const [cachedSurahs, setCachedSurahs] = useState<number[]>([]);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].id);
  const [showReciterMenu, setShowReciterMenu] = useState(false);
  const [selectedTranslation, setSelectedTranslation] = useState(TRANSLATIONS[0].id);
  const [showTranslationMenu, setShowTranslationMenu] = useState(false);
  const [targetAyah, setTargetAyah] = useState<number | null>(null);
  
  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Tafsir State
  const [selectedTafsir, setSelectedTafsir] = useState<{ surahNum: number, ayahNum: number, text: string, translation: string } | null>(null);
  const [tafsirContent, setTafsirContent] = useState<string | null>(null);
  const [isTafsirLoading, setIsTafsirLoading] = useState(false);
  const [tafsirError, setTafsirError] = useState<string | null>(null);
  const [tafsirLang, setTafsirLang] = useState<'en' | 'hi'>('hi');
  const tafsirAbortController = useRef<AbortController | null>(null);
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [activeAyahNumber, setActiveAyahNumber] = useState<number | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentAudioUrl]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
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

  useEffect(() => {
    if (selectedSurah && targetAyah) {
      const element = document.getElementById(`ayah-${targetAyah}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setActiveAyahNumber(targetAyah);
        setTargetAyah(null);
      }
    }
  }, [selectedSurah, targetAyah]);

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
    setSurahs(surahsData as Surah[]);
    setLoading(false);
  };

  const prefetchTafsir = async (surahNum: number) => {
    try {
      const cacheKey = `quran_tafsir_surah_${surahNum}`;
      
      const fetchEnglish = async () => {
        if (localStorage.getItem(cacheKey)) return;
        const response = await fetch(`https://api.quran.com/api/v4/tafsirs/169/by_chapter/${surahNum}?per_page=300`);
        if (!response.ok) return;
        const data = await response.json();
        
        const tafsirMap: Record<number, string> = {};
        data.tafsirs.forEach((t: any) => {
          const ayahNum = parseInt(t.verse_key.split(':')[1]);
          tafsirMap[ayahNum] = t.text;
        });
        localStorage.setItem(cacheKey, JSON.stringify(tafsirMap));
      };

      await fetchEnglish();
    } catch (e) {
      console.error("Failed to prefetch tafsir", e);
    }
  };

  const fetchTafsir = async (surahNum: number, ayahNum: number, text: string, translation: string, lang: 'en' | 'hi' = tafsirLang) => {
    setSelectedTafsir({ surahNum, ayahNum, text, translation });
    setTafsirLang(lang);
    setTafsirContent(null);
    setTafsirError(null);
    setIsTafsirLoading(true);
    
    if (tafsirAbortController.current) {
      tafsirAbortController.current.abort();
    }
    tafsirAbortController.current = new AbortController();
    
    try {
      if (lang === 'en') {
        const cacheKey = `quran_tafsir_surah_${surahNum}`;
        const cached = localStorage.getItem(cacheKey);
        
        let hasEnglish = false;
        let englishText = '';

        if (cached) {
          const tafsirMap = JSON.parse(cached);
          if (tafsirMap[ayahNum]) {
            englishText = tafsirMap[ayahNum];
            setTafsirContent(englishText);
            hasEnglish = true;
          }
        }

        if (!hasEnglish) {
          const res = await fetch(`https://api.quran.com/api/v4/tafsirs/169/by_ayah/${surahNum}:${ayahNum}`);
          const data = await res.json();
          englishText = data.tafsir.text;
          setTafsirContent(englishText);
          const map = cached ? JSON.parse(cached) : {};
          map[ayahNum] = englishText;
          localStorage.setItem(cacheKey, JSON.stringify(map));
        }
        setIsTafsirLoading(false);
      } else {
        // Hindi Tafsir using Backend API (to keep API key secure and avoid Netlify issues)
        const response = await fetch('/.netlify/functions/tafseer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ surahNum, ayahNum, text, translation }),
          signal: tafsirAbortController.current?.signal
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.error || 'Failed to fetch Tafseer');
          }
          const data = await response.json();
          setTafsirContent(data.tafsir);
        } else {
          const text = await response.text();
          console.error("Received non-JSON response:", text.substring(0, 100));
          throw new Error("Received invalid response from server. The API endpoint might be missing or misconfigured.");
        }
        setIsTafsirLoading(false);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setTafsirError(err.message || "Could not load Tafsir. Please try again later.");
        setIsTafsirLoading(false);
      }
    }
  };

  const fetchSurahDetail = async (number: number, translationId = selectedTranslation, ayahToScroll?: number) => {
    if (ayahToScroll) setTargetAyah(ayahToScroll);
    
    // Background prefetch (deferred to not block main content loading)
    setTimeout(() => {
      prefetchTafsir(number);
    }, 1500);

    // Try to load from cache first
    const cacheKey = `quran_surah_${number}_${translationId}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      setSelectedSurah(JSON.parse(cachedData));
      return;
    }

    setLoadingDetail(true);
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${number}/editions/quran-uthmani,${translationId}`);
      const data = await response.json();
      
      const arabicData = data.data[0];
      const translationData = data.data[1];
      
      const combinedAyahs = arabicData.ayahs.map((ayah: Ayah, index: number) => ({
        ...ayah,
        translation: translationData.ayahs[index].text
      }));

      const fullData = {
        ...arabicData,
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

    audio.onerror = async () => {
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

      if (stage < 7) {
        // If it's an Ayah audio
        if (context?.surahNum && context?.ayahInSurah) {
          const s = context.surahNum.toString().padStart(3, '0');
          const a = context.ayahInSurah.toString().padStart(3, '0');
          const ayahKey = `${context.surahNum}:${context.ayahInSurah}`;

          if (stage === 1) {
            // Stage 2: Quran.com CDN (Most reliable)
            const quranCdnMap: Record<string, string> = {
              'ar.alafasy': 'Mishari_Rashid_Al-Afasy',
              'ar.hudhaify': 'Ali_Al-Huthaify',
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
          } else if (stage === 3) {
            // Stage 4: EveryAyah Mirror
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
            fallbackUrl = `https://mirrors.quranicaudio.com/everyayah/${reciter}/${s}${a}.mp3`;
          } else if (stage === 4) {
            // Stage 5: Verses.quran.com
            const versesMap: Record<string, string> = {
              'ar.alafasy': 'Mishari_Rashid_Al-Afasy',
              'ar.abdulsamad': 'Abdul_Basit_Murattal',
              'ar.hudhaify': 'Ali_Al-Huthaify',
              'ar.minshawi': 'Muhammad_Siddiq_al-Minshawi',
              'ar.abdurrahmaansudais': 'Abdurrahmaan_As-Sudais',
              'ar.mahermuaiqly': 'Maher_Al-Muaiqly',
              'ar.saoodshuraym': 'Sa\'ood_ash-Shuraym'
            };
            const reciter = versesMap[selectedReciter] || 'Mishari_Rashid_Al-Afasy';
            fallbackUrl = `https://verses.quran.com/${reciter}/mp3/${s}${a}.mp3`;
          } else if (stage === 5 || stage === 6) {
            // Final Stage: Fetch from Quran.com API
            const recitationId = QURAN_COM_RECITATION_IDS[selectedReciter] || 7;
            try {
              const res = await fetch(`https://api.quran.com/api/v4/recitations/${recitationId}/by_ayah/${ayahKey}`);
              const data = await res.json();
              if (data.audio_files && data.audio_files[0] && data.audio_files[0].url) {
                let finalUrl = data.audio_files[0].url;
                if (!finalUrl.startsWith('http')) finalUrl = `https:${finalUrl}`;
                fallbackUrl = finalUrl;
              }
            } catch (e) {
              console.error("Failed to fetch from Quran.com API", e);
            }
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
        <Loader2 className="w-12 h-12 text-islamic-green dark:text-emerald-400 animate-spin" />
        <p className="text-serif italic text-slate-500 dark:text-slate-400">Loading the Holy Quran...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" ref={containerRef} onScroll={handleScroll}>
      <AnimatePresence mode="wait">
        {!selectedSurah ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col space-y-6"
          >
            <button 
              onClick={() => setActiveView('home')}
              className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline w-fit"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-4xl font-serif text-islamic-green dark:text-emerald-400">The Holy Quran</h2>
                <p className="text-slate-500 dark:text-slate-400 italic">Read, reflect, and find peace.</p>
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                <div className="relative">
                  <button 
                    onClick={() => setShowTranslationMenu(!showTranslationMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-islamic-green dark:hover:text-emerald-400 transition-all shadow-sm"
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
                        className="absolute top-full mt-2 left-0 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-50 py-2"
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
                              selectedTranslation === translation.id ? "bg-islamic-green/10 dark:bg-emerald-500/20 text-islamic-green dark:text-emerald-400 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
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
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-islamic-green dark:hover:text-emerald-400 transition-all shadow-sm"
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
                        className="absolute top-full mt-2 left-0 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-50 py-2"
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
                              selectedReciter === reciter.id ? "bg-islamic-green/10 dark:bg-emerald-500/20 text-islamic-green dark:text-emerald-400 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            )}
                          >
                            {reciter.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full p-1 shadow-sm">
                  <button 
                    onClick={() => setViewMode('surah')}
                    className={cn(
                      "px-6 py-1.5 rounded-full text-sm font-medium transition-all",
                      viewMode === 'surah' ? "bg-islamic-green text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-islamic-green dark:hover:text-emerald-400"
                    )}
                  >
                    Surah
                  </button>
                  <button 
                    onClick={() => setViewMode('juz')}
                    className={cn(
                      "px-6 py-1.5 rounded-full text-sm font-medium transition-all",
                      viewMode === 'juz' ? "bg-islamic-green text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-islamic-green dark:hover:text-emerald-400"
                    )}
                  >
                    Juz
                  </button>
                </div>

                <button 
                  onClick={() => setActiveView('assistant')}
                  className="flex items-center gap-2 px-6 py-2 bg-islamic-green/10 text-islamic-green dark:text-emerald-400 border border-islamic-green/20 rounded-full text-sm font-bold hover:bg-islamic-green/20 transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Quran AI</span>
                </button>

                <button 
                  onClick={() => setShowBookmarks(true)}
                  className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-rose-500 transition-all shadow-sm relative group"
                >
                  <Heart className={cn("w-4 h-4", bookmarks.length > 0 && "fill-rose-500 text-rose-500")} />
                  <span>Bookmarks</span>
                  {bookmarks.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      {bookmarks.length}
                    </span>
                  )}
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

                <button 
                  onClick={() => setIsSearchMode(!isSearchMode)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm",
                    isSearchMode 
                      ? "bg-islamic-green text-white" 
                      : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>

                {isSearchMode && (
                  <div className="relative group w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-islamic-green dark:text-emerald-400 transition-colors" />
                    <input 
                      type="text" 
                      placeholder={viewMode === 'surah' ? "Search Surah..." : "Search Juz..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-islamic-green/20 dark:focus:ring-emerald-500/20 focus:border-islamic-green dark:focus:border-emerald-500 transition-all w-full"
                    />
                  </div>
                )}
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
                    className="group flex items-center p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-islamic-green/30 dark:hover:border-emerald-500/30 hover:shadow-lg hover:shadow-islamic-green/5 dark:hover:shadow-emerald-500/5 transition-all text-left cursor-pointer outline-none focus:ring-2 focus:ring-islamic-green/20 dark:focus:ring-emerald-500/20"
                  >
                    <div className="w-10 h-10 rounded-xl bg-islamic-green/5 dark:bg-emerald-500/10 flex items-center justify-center text-islamic-green dark:text-emerald-400 font-serif font-bold group-hover:bg-islamic-green group-hover:text-white transition-colors">
                      {surah.number}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200">{surah.englishName}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{surah.englishNameTranslation}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <p className="arabic-text text-xl text-islamic-green dark:text-emerald-400">{surah.name}</p>
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
                              removeCachedSurah(surah.number);
                            }}
                            className="p-1 rounded-md transition-all hover:bg-red-500/10 dark:hover:bg-red-500/20 text-islamic-green dark:text-emerald-400 hover:text-red-500 dark:hover:text-red-400"
                            title="Remove from offline"
                          >
                            <CheckCircle2 className="w-3 h-3" />
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
                      className="group flex items-center p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-islamic-green/30 dark:hover:border-emerald-500/30 hover:shadow-lg hover:shadow-islamic-green/5 dark:hover:shadow-emerald-500/5 transition-all text-left cursor-pointer outline-none focus:ring-2 focus:ring-islamic-green/20 dark:focus:ring-emerald-500/20"
                    >
                      <div className="w-10 h-10 rounded-xl bg-islamic-green/5 dark:bg-emerald-500/10 flex items-center justify-center text-islamic-green dark:text-emerald-400 font-serif font-bold group-hover:bg-islamic-green group-hover:text-white transition-colors">
                        {juz}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200">Juz {juz}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Para {juz}</p>
                      </div>
                      <div className="text-right">
                        <p className="arabic-text text-xl text-islamic-green dark:text-emerald-400">الجزء {juz}</p>
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
                  className="p-2 hover:bg-islamic-green/5 dark:bg-emerald-500/10 rounded-full text-islamic-green dark:text-emerald-400 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 rotate-180" />
                </button>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-serif text-islamic-green dark:text-emerald-400">{selectedSurah.englishName}</h2>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 italic">{selectedSurah.englishNameTranslation} • {selectedSurah.revelationType}</p>
                </div>
              </div>

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
                </div>
              </motion.div>
            )}

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center space-y-8 shadow-sm">
              {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
                <p className="arabic-text text-4xl text-islamic-green dark:text-emerald-400 mb-8">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              )}
              
              <div className="w-full space-y-12">
                {selectedSurah.ayahs.map((ayah: any) => (
                  <div 
                    key={ayah.number} 
                    id={`ayah-${ayah.numberInSurah}`}
                    onClick={() => playAyahAudio(ayah.number, ayah.numberInSurah, ayah.surah?.number || selectedSurah.number)}
                    className={cn(
                      "flex flex-col space-y-6 pb-8 border-bottom border-slate-50 last:border-0 transition-all rounded-2xl p-4 cursor-pointer hover:bg-islamic-green/[0.02]",
                      activeAyahNumber === ayah.number ? "bg-islamic-green/5 dark:bg-emerald-500/10 ring-1 ring-islamic-green/10 shadow-sm" : ""
                    )}
                  >
                    <div className="flex justify-between items-start gap-8">
                      <div className="flex flex-col items-center gap-4 shrink-0 mt-2">
                        <div className={cn(
                          "w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold transition-colors",
                          activeAyahNumber === ayah.number ? "bg-islamic-green text-white border-islamic-green" : "border-islamic-green/20 text-islamic-green dark:text-emerald-400"
                        )}>
                          {toArabicNumerals(ayah.numberInSurah)}
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
                              : "bg-islamic-green/5 dark:bg-emerald-500/10 text-islamic-green dark:text-emerald-400 hover:bg-islamic-green hover:text-white",
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
                        {activeAyahNumber === ayah.number && (
                          <div className="flex flex-col items-center gap-1 mt-2 w-full">
                            <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-islamic-green dark:bg-emerald-400 transition-all duration-100"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            fetchTafsir(selectedSurah.number, ayah.numberInSurah, ayah.text, ayah.translation);
                          }}
                          className="p-2 rounded-xl transition-all bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:text-slate-400"
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
                              : "bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                          )}
                          title="Bookmark Ayah"
                        >
                          <Bookmark className={cn("w-4 h-4", bookmarks.find(b => b.id === `ayah:${selectedSurah.number}:${ayah.numberInSurah}`) && "fill-current")} />
                        </button>
                      </div>
                      <p className="arabic-text text-3xl text-right leading-[2.5] text-slate-800 dark:text-slate-200 flex-1">
                        {ayah.text}
                      </p>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-16 italic">
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
        <div className="fixed inset-0 bg-cream/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 text-islamic-green dark:text-emerald-400 animate-spin" />
            <p className="text-serif italic text-slate-600 dark:text-slate-400">Opening the Surah...</p>
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
              className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">My Bookmarks</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{bookmarks.length} saved items</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {bookmarks.length > 0 && (
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to clear all bookmarks?')) {
                          setBookmarks([]);
                          localStorage.setItem('quran_bookmarks', JSON.stringify([]));
                        }
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowBookmarks(false)}
                    className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:text-slate-400 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 bg-slate-50 dark:bg-slate-800/50">
                {bookmarks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mb-4">
                      <Bookmark className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-600 dark:text-slate-400">No bookmarks yet</h4>
                    <p className="text-slate-400 max-w-xs mx-auto mt-2">
                      Click the heart or bookmark icon on any Surah or Ayah to save it here for quick access.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookmarks.sort((a, b) => b.timestamp - a.timestamp).map((bookmark) => (
                      <div 
                        key={bookmark.id}
                        className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                              bookmark.type === 'surah' ? "bg-islamic-green/10 dark:bg-emerald-500/20 text-islamic-green dark:text-emerald-400" : "bg-islamic-gold/10 text-islamic-gold"
                            )}>
                              {bookmark.type}
                            </span>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200">
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
                            <p className="arabic-text text-xl text-right text-slate-800 dark:text-slate-200">{bookmark.text}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 italic line-clamp-2">{bookmark.translation}</p>
                          </div>
                        )}
                        
                        <button
                          onClick={() => {
                            if (bookmark.type === 'surah') {
                              fetchSurahDetail(bookmark.surahNumber);
                            } else {
                              fetchSurahDetail(bookmark.surahNumber, selectedTranslation, bookmark.ayahNumber);
                            }
                            setShowBookmarks(false);
                          }}
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-medium hover:bg-islamic-green hover:text-white transition-all flex items-center justify-center gap-2"
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
              className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[85vh] rounded-3xl shadow-xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Tafsir / Meaning</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Surah {selectedSurah?.englishName} • Ayah {selectedTafsir.ayahNum}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mr-2">
                    <button
                      onClick={() => fetchTafsir(selectedTafsir.surahNum, selectedTafsir.ayahNum, selectedTafsir.text, selectedTafsir.translation, 'hi')}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${tafsirLang === 'hi' ? 'bg-white dark:bg-slate-900 text-islamic-green dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                    >
                      Hindi
                    </button>
                    <button
                      onClick={() => fetchTafsir(selectedTafsir.surahNum, selectedTafsir.ayahNum, selectedTafsir.text, selectedTafsir.translation, 'en')}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${tafsirLang === 'en' ? 'bg-white dark:bg-slate-900 text-islamic-green dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                    >
                      English
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTafsir(null);
                      if (tafsirAbortController.current) {
                        tafsirAbortController.current.abort();
                      }
                    }}
                    className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:text-slate-400 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 bg-slate-50 dark:bg-slate-800/50">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-6">
                  <p className="arabic-text text-3xl text-right leading-[2.5] text-slate-800 dark:text-slate-200 mb-6">
                    {selectedTafsir.text}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    {selectedTafsir.translation}
                  </p>
                </div>

                {isTafsirLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin mb-4 text-islamic-green dark:text-emerald-400" />
                    <p>Loading Tafsir...</p>
                  </div>
                ) : tafsirError ? (
                  <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-center">
                    {tafsirError}
                  </div>
                ) : tafsirContent ? (
                  <div 
                    className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-800 dark:text-slate-200 prose-p:text-slate-600 dark:text-slate-400 prose-p:leading-relaxed prose-a:text-islamic-green dark:text-emerald-400"
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
