import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Mail } from 'lucide-react';
import { AppView } from '../types';

interface PrivacyPolicyViewProps {
  setActiveView: (view: AppView) => void;
}

export default function PrivacyPolicyView({ setActiveView }: PrivacyPolicyViewProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 text-slate-800 dark:text-slate-200 pb-24">
      <button 
        onClick={() => setActiveView('home')} 
        className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline transition-all"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-islamic-green/10 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-10 h-10 text-islamic-green dark:text-emerald-400" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-islamic-green dark:text-emerald-400">Privacy Policy</h1>
        <p className="text-slate-500 dark:text-slate-400 italic">Last Updated: April 28, 2026</p>
      </div>

      <div className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 transition-colors">
        <section className="space-y-3">
          <div className="flex items-center gap-3 text-islamic-green dark:text-emerald-400">
            <Lock className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Introduction</h2>
          </div>
          <p className="leading-relaxed">
            Welcome to <strong>Quran Shareef App</strong>. We are committed to protecting your privacy and ensuring a safe experience while using our spiritual resources. This Privacy Policy explains how we handle information in our application.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-3 text-islamic-green dark:text-emerald-400">
            <Eye className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Information Collection</h2>
          </div>
          <p className="leading-relaxed">
            <strong>Quran Shareef App</strong> does not collect, store, or share any personal information. We do not require you to create an account or provide any data such as your name, email address, or phone number to use the core features of the app.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-slate-600 dark:text-slate-400">
            <li>No user registration required</li>
            <li>No background data collection</li>
            <li>No location tracking</li>
            <li>No access to your contacts or files</li>
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-3 text-islamic-green dark:text-emerald-400">
            <Shield className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Third-Party Services</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold mb-2">Google AdMob</h4>
              <p className="text-sm leading-relaxed mb-2">
                We use Google AdMob to display advertisements. To provide relevant ads, Google may use device identifiers and cookies. You can manage your preferences in Google's settings.
              </p>
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-xs text-islamic-green dark:text-emerald-400 font-bold hover:underline">Learn more about Google Ads Policy</a>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold mb-2">Live Ziyarat Streams</h4>
              <p className="text-sm leading-relaxed">
                The Live Ziyarat feature embeds third-party video streams (e.g., YouTube or direct web streams). These services have their own privacy policies which govern your interaction with their content.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Children's Privacy</h2>
          <p className="leading-relaxed">
            Our application is designed for users of all ages, including children. Since we do not collect any personal information, we are fully compliant with privacy regulations regarding minors.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-3 text-islamic-green dark:text-emerald-400">
            <Mail className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Contact Us</h2>
          </div>
          <p className="leading-relaxed">
            If you have any questions or concerns about this policy or the app, please feel free to reach out:
          </p>
          <div className="p-4 bg-islamic-green/5 dark:bg-emerald-500/10 rounded-2xl border border-islamic-green/20">
            <p className="font-bold text-islamic-green dark:text-emerald-400">Developer: Amaan Siddiqui</p>
            <p className="text-indigo-600 dark:text-emerald-400 select-all">amaanmohd8186@gmail.com</p>
          </div>
        </section>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-[0.4em] font-bold">Guided by Faith • Built for the Ummah</p>
        </div>
      </div>
    </div>
  );
}
