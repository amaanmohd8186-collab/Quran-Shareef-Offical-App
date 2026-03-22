import React from 'react';
import { motion } from 'framer-motion';
import { Video } from 'lucide-react';

export default function LiveMakkahView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-islamic-green/10 dark:bg-emerald-500/20 text-islamic-green dark:text-emerald-400 mb-4">
          <Video className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">Live Makkah & Madinah</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Watch the live broadcast from Masjid al-Haram in Makkah and Al-Masjid an-Nabawi in Madinah.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800"
        >
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Makkah Live</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Masjid al-Haram</p>
          </div>
          <div className="aspect-video bg-slate-900 relative">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://share.google/hcHAdNrg9DMg04C6c" 
              title="Makkah Live" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800"
        >
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Madinah Live</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Al-Masjid an-Nabawi</p>
          </div>
          <div className="aspect-video bg-slate-900 relative">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/live_stream?channel=UCWJ_P-oA6iE-t9H8uK-wA_g&autoplay=1&mute=1" 
              title="Madinah Live" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
