import React, { useState, useEffect } from 'react';
import { Compass, Loader2, Navigation, RotateCw, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function QiblaView() {
  const [heading, setHeading] = useState<number | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [manualRotation, setManualRotation] = useState(0);

  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        calculateQibla(latitude, longitude);
        setLoading(false);
      },
      (err) => {
        setError("Please enable location access to find Qibla direction. You can still use the manual compass below.");
        setLoading(false);
        // Default to a central location if denied
        calculateQibla(20, 70); 
      }
    );

    const handleOrientation = (event: any) => {
      if (event.webkitCompassHeading) {
        setHeading(event.webkitCompassHeading);
      } else if (event.alpha) {
        setHeading(360 - event.alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const calculateQibla = (lat: number, lng: number) => {
    const φ1 = lat * (Math.PI / 180);
    const λ1 = lng * (Math.PI / 180);
    const φ2 = KAABA_LAT * (Math.PI / 180);
    const λ2 = KAABA_LNG * (Math.PI / 180);

    const y = Math.sin(λ2 - λ1);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
    let qibla = Math.atan2(y, x) * (180 / Math.PI);
    qibla = (qibla + 360) % 360;
    setQiblaDirection(qibla);
  };

  const handleManualRotate = () => {
    setManualRotation(prev => (prev + 45) % 360);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center text-center p-6">
      <div className="mb-12">
        <h2 className="text-4xl font-serif text-islamic-green">Qibla Finder</h2>
        <p className="text-slate-500 italic">Accurate direction to the Holy Kaaba.</p>
      </div>

      {loading ? (
        <Loader2 className="w-12 h-12 text-islamic-green animate-spin" />
      ) : (
        <div className="flex flex-col items-center space-y-12">
          {error && (
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-amber-700 text-sm flex items-center gap-3 max-w-md">
              <MapPin className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-8 border-islamic-green/5 rounded-full shadow-inner" />
            <div className="absolute inset-4 border-2 border-islamic-green/10 rounded-full border-dashed" />
            
            {/* Cardinal Points */}
            <div className="absolute top-2 font-bold text-slate-400 text-sm">N</div>
            <div className="absolute bottom-2 font-bold text-slate-400 text-sm">S</div>
            <div className="absolute left-2 font-bold text-slate-400 text-sm">W</div>
            <div className="absolute right-2 font-bold text-slate-400 text-sm">E</div>

            {/* Qibla Indicator */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: (qiblaDirection || 0) - (heading || manualRotation) }}
              transition={{ type: 'spring', stiffness: 40, damping: 15 }}
            >
              <div className="relative flex flex-col items-center">
                {/* Needle */}
                <div className="w-1.5 h-36 bg-gradient-to-t from-islamic-gold to-amber-300 rounded-full shadow-lg" />
                
                {/* Kaaba Icon/Marker */}
                <div className="absolute -top-12 w-16 h-16 bg-white rounded-2xl shadow-xl border-2 border-islamic-gold flex items-center justify-center p-2">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" 
                    alt="Kaaba" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Center Pivot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-islamic-gold shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-islamic-gold rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Qibla Angle</p>
              <p className="text-5xl font-serif text-islamic-green font-bold">
                {qiblaDirection?.toFixed(1)}°
              </p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleManualRotate}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm text-sm font-bold"
              >
                <RotateCw className="w-4 h-4" /> Manual Rotate
              </button>
              <div className="px-6 py-3 bg-islamic-green/5 border border-islamic-green/10 rounded-2xl text-islamic-green text-sm font-bold flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                {heading !== null ? `Heading: ${heading.toFixed(0)}°` : 'Compass Inactive'}
              </div>
            </div>

            <p className="text-[10px] text-slate-400 italic max-w-xs mx-auto">
              For best results, place your phone flat on a surface and rotate it until the needle points to the Kaaba icon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
