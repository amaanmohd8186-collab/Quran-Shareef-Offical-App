import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Loader2 } from 'lucide-react';

interface PermissionGuardProps {
  permissionType: 'geolocation';
  children: React.ReactNode;
  onGranted: () => void;
}

export default function PermissionGuard({ permissionType, children, onGranted }: PermissionGuardProps) {
  const [granted, setGranted] = useState<boolean | null>(null);

  useEffect(() => {
    if (permissionType === 'geolocation') {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          if (result.state === 'granted') {
            setGranted(true);
            onGranted();
          } else {
            setGranted(false);
          }
        });
      } else {
        // Fallback for browsers that don't support permissions.query
        setGranted(false);
      }
    }
  }, [permissionType, onGranted]);

  if (granted === null) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-islamic-green mb-4" />
        <p>Checking permissions...</p>
      </div>
    );
  }

  if (granted) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-md mx-auto p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="w-20 h-20 bg-islamic-green/10 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <MapPin className="w-10 h-10 text-islamic-green dark:text-emerald-400" />
      </div>
      <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-200 mb-4">Location Required</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        To provide you with accurate Qibla direction, we need access to your location. This information is used only for this purpose and is not stored.
      </p>
      <button 
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            () => { setGranted(true); onGranted(); },
            () => { setGranted(false); }
          );
        }}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-islamic-green text-white rounded-2xl hover:bg-islamic-green/90 transition-all font-semibold"
      >
        Enable Location <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
