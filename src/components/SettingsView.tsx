import React from 'react';
import { Heart, Mail, Shield, User, ExternalLink, Coffee, ArrowRight, ArrowLeft } from 'lucide-react';
import { AppView } from '../types';

interface SettingsViewProps {
  setActiveView: (view: AppView) => void;
}

export default function SettingsView({ setActiveView }: SettingsViewProps) {
  const upiId = "9719818918@ybl";
  const upiLink = `upi://pay?pa=${upiId}&pn=Amaan%20Siddiqui&cu=INR`;
  const contactEmail = "amaanmohd8186@gmail.com";

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <button 
        onClick={() => setActiveView('home')}
        className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-islamic-green dark:text-emerald-400">Settings & About</h2>
        <p className="text-slate-500 dark:text-slate-400">Manage your preferences and learn more about Quran Sharif Official App.</p>
      </div>

      {/* Developer Info */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-islamic-green dark:text-emerald-400">
          <User className="w-6 h-6" />
          <h3 className="text-xl font-bold">Developer</h3>
        </div>
        <div className="space-y-1">
          <p className="text-slate-700 font-medium">Developed by <span className="text-islamic-green dark:text-emerald-400 font-bold">Amaan Siddiqui</span></p>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${contactEmail}`} className="hover:text-islamic-green dark:hover:text-emerald-400 transition-colors">{contactEmail}</a>
          </div>
        </div>
      </div>

      {/* Donate Section */}
      <div className="bg-islamic-green/5 dark:bg-emerald-500/10 rounded-3xl p-8 border border-islamic-green/10 text-center space-y-6">
        <div className="w-16 h-16 bg-islamic-green/10 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 text-islamic-green dark:text-emerald-400 fill-islamic-green/20" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold text-islamic-green dark:text-emerald-400">Support Quran Sharif Official App</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
            If you find this app helpful, consider supporting its development. Your contributions help keep the app ad-free and updated.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a 
              href={upiLink}
              className="inline-flex items-center gap-3 px-8 py-4 bg-islamic-green text-white rounded-2xl font-bold shadow-lg shadow-islamic-green/20 hover:bg-islamic-green-dark transition-all transform hover:-translate-y-1"
            >
              <Coffee className="w-5 h-5" />
              Donate via UPI
            </a>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(upiId);
                alert('UPI ID copied! You can now paste it in any payment app.');
              }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 text-islamic-green dark:text-emerald-400 border-2 border-islamic-green rounded-2xl font-bold hover:bg-islamic-green/5 dark:bg-emerald-500/10 transition-all"
            >
              Copy UPI ID
            </button>
          </div>
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">UPI ID: {upiId}</p>
        </div>
      </div>

      {/* Links & Policy */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-islamic-green dark:text-emerald-400" />
              <span className="font-bold text-slate-700">Privacy Policy</span>
            </div>
            <button 
              onClick={() => setActiveView('privacy')}
              className="text-sm font-bold text-islamic-green dark:text-emerald-400 hover:underline"
            >
              View In-App
            </button>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-2">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Play Store Privacy URL</p>
            <div className="flex items-center justify-between gap-2">
              <code className="text-xs text-slate-600 dark:text-slate-400 break-all bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700 flex-1">
                {window.location.origin}/privacy.html
              </code>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/privacy.html`);
                  alert('URL copied to clipboard!');
                }}
                className="p-2 hover:bg-islamic-green/10 dark:bg-emerald-500/20 rounded-xl text-islamic-green dark:text-emerald-400 transition-colors"
                title="Copy URL"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[9px] text-slate-400">Use this URL when submitting your app to the Google Play Store.</p>
          </div>
        </div>

        <a 
          href={`mailto:${contactEmail}`}
          className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-islamic-green/30 dark:hover:border-emerald-500/30 hover:bg-islamic-green/5 dark:bg-emerald-500/10 transition-all group"
        >
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-islamic-green dark:text-emerald-400" />
            <span className="font-bold text-slate-700">Contact Support</span>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-islamic-green dark:hover:text-emerald-400" />
        </a>
      </div>

      <div className="text-center pt-8">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">Quran Sharif Official App v1.0.0</p>
      </div>
    </div>
  );
}
