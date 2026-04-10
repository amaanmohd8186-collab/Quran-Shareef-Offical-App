import React, { useState } from 'react';
import { Mic, Square, Loader2, ArrowLeft } from 'lucide-react';
import { AppView } from '../types';
import { hifzDetector } from '../services/hifzDetector';

interface HifzDetectorProps {
  setActiveView: (view: AppView) => void;
}

export default function HifzDetectorView({ setActiveView }: HifzDetectorProps) {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = async () => {
    if (isListening) {
      const progress = await hifzDetector.stopListening(transcript);
      setResult(progress);
      setIsListening(false);
      setError(null);

      // Voice Feedback
      let feedback = `Your accuracy is ${progress.accuracy.toFixed(0)} percent.`;
      if (progress.totalMistakes > 0) {
        feedback += ` You made ${progress.totalMistakes} mistakes.`;
        progress.mistakes.forEach((m, i) => {
          feedback += ` Mistake ${i + 1}: ${m.word}.`;
        });
      } else {
        feedback += " Excellent recitation!";
      }
      speak(feedback);

    } else {
      try {
        await hifzDetector.startListening(1, 1, (text) => setTranscript(text));
        setIsListening(true);
        setResult(null);
        setError(null);
        setTranscript('');
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <button onClick={() => setActiveView('home')} className="flex items-center gap-2 text-islamic-green">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Live Hifz Mistake Detector</h1>
        <p>Start reciting Surah Al-Fatiha (Ayah 1) to check your Hifz.</p>
      </div>

      {error && (
        <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-center font-bold">
          {error}
        </div>
      )}

      <div className="flex justify-center">
        <button 
          onClick={toggleListening}
          className={`p-8 rounded-full transition-all ${isListening ? 'bg-rose-500 animate-pulse' : 'bg-islamic-green'}`}
        >
          {isListening ? <Square className="w-12 h-12 text-white" /> : <Mic className="w-12 h-12 text-white" />}
        </button>
      </div>

      {transcript && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold">Recognized Text:</h3>
          <p className="text-2xl text-right" dir="rtl">{transcript}</p>
        </div>
      )}

      {result && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-2">
          <h3 className="font-bold text-xl">Recitation Result</h3>
          <p className="text-lg">Accuracy: {result.accuracy.toFixed(2)}%</p>
          <p className="text-lg">Total Mistakes: {result.totalMistakes}</p>
        </div>
      )}
    </div>
  );
}
