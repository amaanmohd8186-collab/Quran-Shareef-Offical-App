import React, { useState, useEffect } from 'react';
import { Clock, MapPin, ArrowLeft, Loader2 } from 'lucide-react';
import { AppView } from '../types';
import PermissionGuard from './PermissionGuard';

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface NamazTimesViewProps {
  setActiveView: (view: AppView) => void;
}

export default function NamazTimesView({ setActiveView }: NamazTimesViewProps) {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [manualCity, setManualCity] = useState('');

  const fetchPrayerTimes = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${lat}&longitude=${lon}&method=2`);
      const data = await response.json();
      setTimes(data.data.timings);
      setLocation(`${data.data.meta.timezone}`);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch prayer times.");
      setLoading(false);
    }
  };

  const handleLocationGranted = () => {
    setLoading(true);
    setError(null); // Clear previous errors
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError("Location access denied. Please enable location or enter your city manually.");
        setLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const fetchByCity = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=India&method=2`);
      const data = await response.json();
      if (data.code === 200) {
        setTimes(data.data.timings);
        setLocation(`${data.data.meta.timezone}`);
      } else {
        setError("City not found.");
      }
    } catch (err) {
      setError("Failed to fetch prayer times.");
    }
    setLoading(false);
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
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Prayer Times</h1>
        {location && <p className="text-slate-500 flex items-center justify-center gap-2"><MapPin className="w-4 h-4" /> {location}</p>}
      </div>

      {error && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <p className="text-center text-rose-500">{error}</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={manualCity}
              onChange={(e) => setManualCity(e.target.value)}
              placeholder="Enter city name (e.g., Delhi)"
              className="flex-1 p-3 border border-slate-200 rounded-xl"
            />
            <button 
              onClick={() => fetchByCity(manualCity)}
              className="bg-islamic-green text-white px-6 py-3 rounded-xl font-bold"
            >
              Get Times
            </button>
          </div>
        </div>
      )}

      <PermissionGuard permissionType="geolocation" onGranted={handleLocationGranted}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-islamic-green mb-4" />
            <p>Fetching prayer times...</p>
          </div>
        ) : times && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(times).filter(([name]) => ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(name)).map(([name, time]) => (
              <div key={name} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-islamic-green/10 flex items-center justify-center text-islamic-green">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{name}</p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </PermissionGuard>
    </div>
  );
}
