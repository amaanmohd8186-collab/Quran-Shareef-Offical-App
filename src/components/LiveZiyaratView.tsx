import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { AppView } from '../types';

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
    fetch('/api/ziyarat')
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || data.error || `Server error: ${res.status}`);
        }
        return data;
      })
      .then(data => {
        console.log("Client received data:", data);
        if (data.items && data.items.length > 0) {
          setStreams(data.items.map((item: any) => ({
            name: item.snippet.title,
            url: `https://www.youtube.com/embed/${item.id.videoId}`,
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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <button 
        onClick={() => setActiveView('home')}
        className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <h2 className="text-3xl font-serif font-bold text-slate-800 dark:text-slate-100">Live Ziyarat</h2>

      {loading ? (
        <div className="text-center text-slate-500">Loading live streams...</div>
      ) : error ? (
        <div className="text-center space-y-4">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={fetchStreams}
            className="px-4 py-2 bg-islamic-green text-white rounded-lg hover:bg-opacity-90 transition-all"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid gap-8">
          {streams.map((stream) => (
            <div key={stream.videoId} className="space-y-4">
              <h3 className="text-xl font-serif font-semibold text-islamic-green dark:text-emerald-400">{stream.name}</h3>
              <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900">
                <iframe
                  width="100%"
                  height="100%"
                  src={stream.url}
                  title={stream.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
