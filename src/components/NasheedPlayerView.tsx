import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, ArrowLeft } from 'lucide-react';
import { AppView } from '../types';

interface Nasheed {
  id: string;
  title: string;
  artist: string;
  url: string;
}

const nasheeds: Nasheed[] = [
  { id: '1', title: 'Tala al Badru Alayna', artist: 'Traditional', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '2', title: 'Ya Nabi Salam Alayka', artist: 'Maher Zain', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
];

interface NasheedPlayerProps {
  setActiveView: (view: AppView) => void;
}

export default function NasheedPlayerView({ setActiveView }: NasheedPlayerProps) {
  const [currentNasheed, setCurrentNasheed] = useState<Nasheed>(nasheeds[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Audio playback failed:", error);
          // Show error in UI instead of alert
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm">
      <button onClick={() => setActiveView('home')} className="flex items-center gap-2 text-islamic-green">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Nasheed Player</h1>
        <p className="text-slate-500">Listen to your favorite Nasheeds offline.</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="w-48 h-48 bg-islamic-green/10 rounded-full flex items-center justify-center">
          <Music className="w-20 h-20 text-islamic-green" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{currentNasheed.title}</h2>
          <p className="text-slate-500">{currentNasheed.artist}</p>
        </div>
      </div>

      <audio ref={audioRef} src={currentNasheed.url} onEnded={() => setIsPlaying(false)} />

      <div className="flex items-center justify-center gap-6">
        <button className="p-4 rounded-full bg-slate-100 dark:bg-slate-800"><SkipBack /></button>
        <button onClick={togglePlay} className="p-6 rounded-full bg-islamic-green text-white">
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
        </button>
        <button className="p-4 rounded-full bg-slate-100 dark:bg-slate-800"><SkipForward /></button>
      </div>

      <div className="space-y-2">
        {nasheeds.map(nasheed => (
          <button 
            key={nasheed.id}
            onClick={() => { setCurrentNasheed(nasheed); setIsPlaying(false); }}
            className="w-full p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-xl"
          >
            <span>{nasheed.title}</span>
            <Play className="w-4 h-4 text-islamic-green" />
          </button>
        ))}
      </div>
    </div>
  );
}
