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
          <p className="text-slate-500 dark:text-slate-400 text-sm">Last Updated: April 8, 2026</p>
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            Welcome to Quran Sharif Official App. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our mobile application.
          </p>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">1. No Data Collection</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Quran Sharif Official App does not collect, store, or transmit any personal data. We do not collect names, email addresses, phone numbers, location data, or any other personally identifiable information (PII).
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>Zero Data Transmission:</strong> No user data is ever uploaded to our servers or shared with third parties.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">2. Permissions Required</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            This application requires certain device permissions to provide specific features. We access your:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
            <li>Location or GPS (for Prayer Times and Qibla Finder)</li>
            <li>Camera or Microphone (for Hifz Detector)</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We do not access your:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
            <li>Contacts or Calendar</li>
            <li>Device Storage or Files</li>
            <li>Google Drive or Cloud Storage</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            These permissions are used solely to enhance your experience within the app.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">3. Local Storage Only</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Any settings you choose (such as bookmarks or alarm times) are stored exclusively on your device using local browser storage. This data never leaves your device and is not accessible by the developers.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">4. AI Assistant Privacy</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our AI Assistant offers two modes:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
            <li><strong>Offline Mode:</strong> Your questions are processed entirely on your device using a pre-loaded database. No data is ever transmitted.</li>
            <li><strong>Live Mode:</strong> If you choose to use Live Mode for more complex questions, your query is sent to Google's Gemini API to generate a response. We do not store your chat history or use your interactions for any purpose other than providing immediate answers.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">5. Third-Party Services</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We use trusted third-party services to provide content:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
            <li><strong>Quranic Content:</strong> Text and audio are fetched from public Islamic APIs.</li>
            <li><strong>Live Ziyarat:</strong> Live streams are provided via <strong>makkahlive.net</strong> and <strong>madinahlive.net</strong>. We do not use YouTube for live streaming to ensure your privacy.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">6. Children's Privacy</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our app does not collect any information from anyone, including children under the age of 13. It is safe for use by all age groups.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">7. Changes to This Policy</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-islamic-green dark:text-emerald-400">8. Contact Us</h3>
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-islamic-green text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-sm"
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
            <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-xl text-left text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <p className="font-bold text-islamic-green dark:text-emerald-400">Bank Transfer Details:</p>
              <p>Account Name: Amaan Siddiqui</p>
              <p>Account Number: 42265745938</p>
              <p>IFSC Code: SBIN0011598</p>
              <p>Bank Name: State Bank of India</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">© 2026 Quran Sharif Official App. All rights reserved.</p>
      </div>
    </div>
  );
}
