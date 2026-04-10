import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, ArrowLeft, Loader2 } from 'lucide-react';
import { AppView } from '../types';

interface QiblaViewProps {
  setActiveView: (view: AppView) => void;
}

export default function QiblaView({ setActiveView }: QiblaViewProps) {
  const [direction, setDirection] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchQibla(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError("Location access denied. Please enable location to find Qibla.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  const fetchQibla = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lon}`);
      const data = await response.json();
      setDirection(data.data.direction);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch Qibla direction.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <button 
        onClick={() => setActiveView('home')}
        className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Qibla Direction</h1>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin text-islamic-green mb-4" />
          <p>Calculating Qibla direction...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center text-rose-500 bg-rose-50 rounded-3xl">{error}</div>
      ) : direction !== null && (
        <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-8">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <Compass className="w-48 h-48 text-islamic-green dark:text-emerald-400 opacity-20" />
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: direction }}
              className="absolute w-2 h-32 bg-rose-500 rounded-full origin-bottom"
            />
            <div className="absolute w-4 h-4 bg-islamic-green rounded-full" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Direction: {direction.toFixed(2)}° from North
          </p>
        </div>
      )}
    </div>
  );
}
