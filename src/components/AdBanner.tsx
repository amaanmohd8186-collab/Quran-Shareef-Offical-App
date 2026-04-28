import React from 'react';
import { cn } from '../lib/utils';

interface AdBannerProps {
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className }) => {
  // AdMob info provided by user
  const AD_UNIT_ID = "ca-app-pub-6075226919590011/5048543660";
  
  return (
    <div 
      className={cn(
        "w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex flex-col items-center justify-center my-4 min-h-[50px] shadow-sm",
        className
      )}
    >
      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 pt-1">
        Advertisement
      </div>
      <div className="flex flex-col items-center justify-center p-2 text-center">
        <div className="text-xs text-slate-500 font-mono break-all px-2">
          {AD_UNIT_ID}
        </div>
      </div>
      {/* 
        In a production mobile app wrapped with Capacitor/Cordova, 
        you would use the native AdMob plugin here.
        Example: AdMob.showBanner({ adId: AD_UNIT_ID })
      */}
    </div>
  );
};

export default AdBanner;
