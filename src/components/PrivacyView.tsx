import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
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
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 text-islamic-green">
          <Shield className="w-8 h-8" />
          <h2 className="text-3xl font-serif font-bold">Privacy Policy</h2>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-8">
        <div className="space-y-2">
          <p className="text-slate-500 text-sm">Last Updated: March 10, 2024</p>
          <p className="text-slate-700 leading-relaxed font-medium">
            Welcome to Al-Huda. Your privacy is critically important to us.
          </p>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green">1. Information We Collect</h3>
          <p className="text-slate-600 leading-relaxed">
            Al-Huda is designed with privacy in mind. We do not collect personal identification information. Any data like your name or preferences are stored locally on your device using browser storage.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green">2. AI Assistant</h3>
          <p className="text-slate-600 leading-relaxed">
            When you interact with Al-Huda AI, your queries are processed by Google's Gemini API. We do not store your chat history on our servers; it remains on your device.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green">3. Location Data</h3>
          <p className="text-slate-600 leading-relaxed">
            The Qibla Finder requires location access to calculate the direction of the Kaaba. This data is processed locally in your browser and is never shared or stored by us.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green">4. Third-Party Services</h3>
          <p className="text-slate-600 leading-relaxed">
            We use external APIs for Quranic text, audio, and Hadith data. These services may have their own privacy policies regarding how they handle requests.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green">5. Contact Us</h3>
          <p className="text-slate-600 leading-relaxed">
            If you have any questions about this policy, please contact us at <a href="mailto:amaanmohd8186@gmail.com" className="text-islamic-green font-bold hover:underline">amaanmohd8186@gmail.com</a>.
          </p>
        </section>
      </div>

      <div className="text-center pt-8">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">© 2024 Al-Huda. All rights reserved.</p>
      </div>
    </div>
  );
}
