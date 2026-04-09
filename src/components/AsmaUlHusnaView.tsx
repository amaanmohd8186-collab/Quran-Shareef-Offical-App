import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, Pause, Volume2, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { GoogleGenAI, Modality } from '@google/genai';
import { AppView } from '../types';

interface Name {
  name: string;
  transliteration: string;
  en: {
    meaning: string;
  };
}

interface AsmaUlHusnaViewProps {
  setActiveView: (view: AppView) => void;
}

export default function AsmaUlHusnaView({ setActiveView }: AsmaUlHusnaViewProps) {
  const [names, setNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [loadingAudioId, setLoadingAudioId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const createWavHeader = (dataLength: number, sampleRate: number = 24000) => {
    const buffer = new ArrayBuffer(44);
    const view = new DataView(buffer);

    const writeString = (view: DataView, offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true);

    return buffer;
  };

  useEffect(() => {
    fetch('https://api.aladhan.com/v1/asmaAlHusna')
      .then(res => res.json())
      .then(data => {
        setNames(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load Asma ul Husna. Please try again later.");
        setLoading(false);
      });
  }, []);

  const playAudio = async (number: number, nameText: string) => {
    if (playingId === number) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingId(null);
      return;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setLoadingAudioId(number);
    setPlayingId(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Say clearly in Arabic: ${nameText}`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const binaryString = window.atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const wavHeader = createWavHeader(len, 24000);
        const wavBlob = new Blob([wavHeader, bytes], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(wavBlob);
        
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        
        if (audioRef.current.src.startsWith('blob:')) {
          URL.revokeObjectURL(audioRef.current.src);
        }
        
        audioRef.current.onerror = (e) => {
          console.error("Asma Ul Husna Audio Error:", e);
          setPlayingId(null);
          setLoadingAudioId(null);
        };
        
        audioRef.current.onended = () => {
          setPlayingId(null);
        };
        
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch(err => {
          console.error("Asma Ul Husna Play Error:", err);
          setPlayingId(null);
        });
        setPlayingId(number);
      } else {
        console.error("No audio data received from Gemini TTS");
      }
    } catch (error) {
      console.error("Audio error:", error);
    } finally {
      setLoadingAudioId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-rose-600 p-8 bg-rose-50 rounded-2xl max-w-md mx-auto mt-12">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <button 
        onClick={() => setActiveView('home')}
        className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-islamic-green/10 dark:bg-emerald-500/20 text-islamic-green dark:text-emerald-400 mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-800 dark:text-slate-200">Asma ul Husna</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          The 99 Beautiful Names of Allah. "And to Allah belong the best names, so invoke Him by them." (Quran 7:180)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {names.map((name, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-islamic-green/5 dark:bg-emerald-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            
            <div className="flex justify-between items-start mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-sm">
                {index + 1}
              </span>
              <button
                onClick={() => playAudio(index + 1, name.name)}
                disabled={loadingAudioId === index + 1}
                className="p-2 text-slate-400 hover:text-islamic-green dark:hover:text-emerald-400 hover:bg-islamic-green/10 dark:bg-emerald-500/20 rounded-full transition-colors disabled:opacity-50"
              >
                {loadingAudioId === index + 1 ? (
                  <div className="w-5 h-5 rounded-full border-2 border-islamic-green border-t-transparent animate-spin" />
                ) : playingId === index + 1 ? (
                  <Volume2 className="w-5 h-5 text-islamic-green dark:text-emerald-400 animate-pulse" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-islamic-green dark:text-emerald-400 arabic-text leading-relaxed">
                {name.name}
              </h2>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {name.transliteration}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {name.en.meaning}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
