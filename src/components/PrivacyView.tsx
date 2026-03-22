import React from 'react';
import { Shield, ArrowLeft, Heart } from 'lucide-react';
import { AppView } from '../types';

interface PrivacyViewProps {
  setActiveView: (view: AppView) => void;
}

export default function PrivacyView({ setActiveView }: PrivacyViewProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setActiveView('settings')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 text-islamic-green dark:text-emerald-400">
          <Shield className="w-8 h-8" />
          <h2 className="text-3xl font-serif font-bold">Privacy Policy</h2>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-8">
        <div className="space-y-2">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Last Updated: March 22, 2026</p>
          <p className="text-slate-700 leading-relaxed font-medium">
            Welcome to Al-Huda. Your privacy is critically important to us.
          </p>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">1. Information We Collect</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Quran Shareef is designed with absolute privacy in mind. We do not ask for any permissions (like location or microphone), nor do we collect any personal identification information such as your name, email, or phone number. Any preferences (like bookmarks or settings) are stored locally on your device using browser storage.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">2. AI Assistant</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            When you interact with the Quran AI, your queries are processed securely. We do not store your chat history on any servers; it remains entirely on your device.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">3. No Permissions Required</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            This app does not require access to your location, microphone, camera, or any other sensitive device features. You can use all features with complete peace of mind.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">4. Third-Party Services</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We use external APIs for Quranic text, audio, and Hadith data. These services may have their own privacy policies regarding how they handle requests.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">5. Contact Us</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            If you have any questions about this policy, please contact us at <a href="mailto:amaanmohd8186@gmail.com" className="text-islamic-green dark:text-emerald-400 font-bold hover:underline">amaanmohd8186@gmail.com</a>.
          </p>
        </section>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-islamic-green/5 dark:bg-emerald-500/10 rounded-2xl p-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-islamic-green dark:text-emerald-400">
              <Heart className="w-5 h-5 fill-current" />
              <h4 className="font-bold">Support Our Mission</h4>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Your support helps us keep Al-Huda free and accessible for everyone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a 
                href={`upi://pay?pa=9719818918@ybl&pn=Amaan%20Siddiqui&cu=INR`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-islamic-green text-white rounded-xl font-bold text-sm hover:bg-islamic-green-dark transition-all shadow-sm"
              >
                Donate via UPI
              </a>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText("9719818918@ybl");
                  alert('UPI ID copied!');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 text-islamic-green dark:text-emerald-400 border border-islamic-green rounded-xl font-bold text-sm hover:bg-islamic-green/5 dark:bg-emerald-500/10 transition-all"
              >
                Copy UPI ID
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">© 2026 Al-Huda. All rights reserved.</p>
      </div>
    </div>
  );
}
