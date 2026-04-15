import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, ArrowLeft, Loader2, MapPin, Building } from 'lucide-react';
import { AppView } from '../types';
import PermissionGuard from './PermissionGuard';

interface QiblaViewProps {
  setActiveView: (view: AppView) => void;
}

export default function QiblaView({ setActiveView }: QiblaViewProps) {
  const [direction, setDirection] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQibla = async () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(`https://api.aladhan.com/v1/qibla/${position.coords.latitude}/${position.coords.longitude}`);
            const data = await response.json();
            setDirection(data.data.direction);
            setDistance(data.data.distance);
            
            const geoResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`);
            const geoData = await geoResponse.json();
            setLocationName(`${geoData.city || geoData.locality}, ${geoData.countryName}`);
            
            setLoading(false);
          } catch (err) {
            setError("Failed to fetch Qibla direction.");
            setLoading(false);
          }
        },
        (err) => {
          setError("Location access denied. Please enable location to find Qibla.");
          setLoading(false);
        },
        { timeout: 10000 }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1a1a] text-white p-6 pb-12">
      <button 
        onClick={() => setActiveView('home')}
        className="flex items-center gap-2 text-emerald-400 font-medium hover:underline mb-8"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <h1 className="text-4xl font-serif font-bold text-center text-amber-400 mb-12 tracking-wide">Qibla Finder</h1>

      <PermissionGuard permissionType="geolocation" onGranted={fetchQibla}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-emerald-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p>Calculating Qibla direction...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-rose-950/30 rounded-3xl border border-rose-900/50 space-y-6">
            <p className="text-rose-300">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-700"
            >
              Retry Location
            </button>
          </div>
        ) : direction !== null && (
          <div className="relative flex flex-col items-center gap-8 bg-[#0d2121] p-8 rounded-3xl border border-emerald-900/50 shadow-2xl">
            {/* Glowing Kaaba Icon */}
            <div className="flex flex-col items-center gap-2">
              <Building className="w-12 h-12 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
              <div className="h-16 w-0.5 bg-gradient-to-b from-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
            </div>

            {/* 3D Compass */}
            <div className="relative w-72 h-72 flex items-center justify-center [perspective:1000px]">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-800/50"></div>
              <Compass className="w-56 h-56 text-amber-500/80 [transform:rotateX(30deg)]" />
              
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: direction }}
                className="absolute w-2 h-40 bg-gradient-to-t from-amber-500 to-amber-200 rounded-full origin-bottom [transform:rotateX(30deg)] shadow-[0_0_20px_rgba(245,158,11,0.6)]"
              />
              
              {/* Turquoise light beam */}
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: direction }}
                className="absolute w-1 h-32 bg-cyan-400/50 blur-sm origin-bottom [transform:rotateX(30deg)]"
              />
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-5xl font-bold text-amber-400 drop-shadow-md">
                {direction.toFixed(1)}° <span className="text-2xl text-emerald-400">{direction > 22.5 && direction < 67.5 ? 'NE' : direction > 67.5 && direction < 112.5 ? 'E' : direction > 112.5 && direction < 157.5 ? 'SE' : direction > 157.5 && direction < 202.5 ? 'S' : direction > 202.5 && direction < 247.5 ? 'SW' : direction > 247.5 && direction < 292.5 ? 'W' : direction > 292.5 && direction < 337.5 ? 'NW' : 'N'}</span>
              </p>
              <p className="text-emerald-300 font-medium tracking-widest uppercase">Distance: {distance?.toFixed(0)} km</p>
            </div>
            
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/50 px-6 py-3 rounded-full border border-emerald-800">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{locationName}</span>
            </div>
          </div>
        )}
      </PermissionGuard>
    </div>
  );
}
