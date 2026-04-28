import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { AppView } from '../types';
import AdBanner from './AdBanner';

interface LiveZiyaratViewProps {
  setActiveView: (view: AppView) => void;
}

export default function LiveZiyaratView({ setActiveView }: LiveZiyaratViewProps) {
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStreams = () => {
    setLoading(true);
    setError(null);
    fetch('/.netlify/functions/live-ziyarat')
      .then(async res => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || data.error || `Server error: ${res.status}`);
          }
          return data;
        } else {
          const text = await res.text();
          console.error("Received non-JSON response:", text.substring(0, 100));
          throw new Error("Received invalid response from server. The API endpoint might be missing or misconfigured.");
        }
      })
      .then(data => {
        console.log("Client received data:", data);
        if (data.items && data.items.length > 0) {
          setStreams(data.items.map((item: any) => ({
            name: item.snippet.title,
            description: item.snippet.description,
            url: item.url,
            videoId: item.id.videoId
          })));
        } else {
          setError(`No live streams found.`);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(`Error: ${err.message}`);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-white dark:bg-slate-950 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex items-center justify-between sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-4 z-10">
          <button 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-800"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </button>
          <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">Live Ziyarat</h2>
        </div>

        <AdBanner />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-islamic-green border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500">Loading live streams...</p>
          </div>
        ) : error ? (
          <div className="text-center space-y-4 py-20">
            <p className="text-red-500 font-medium">{error}</p>
            <button 
              onClick={fetchStreams}
              className="px-8 py-3 bg-islamic-green text-white rounded-2xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-islamic-green/20"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-120px)] pb-10">
            {streams.map((stream) => (
              <div key={stream.videoId} className="flex-1 flex flex-col space-y-4 bg-slate-50 dark:bg-slate-900/50 p-4 md:p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-2 shrink-0">
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-islamic-green dark:text-emerald-400 truncate pr-4">{stream.name}</h3>
                  <span className="shrink-0 px-4 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse shadow-sm">LIVE</span>
                </div>
                <div className="flex-1 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 group relative min-h-0">
                  <iframe
                    width="100%"
                    height="100%"
                    src={stream.url}
                    title={stream.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 italic px-2 shrink-0">
                  {stream.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
