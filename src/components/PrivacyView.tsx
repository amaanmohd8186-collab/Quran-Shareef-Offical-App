import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { AppView } from '../types';

interface PrivacyPolicyViewProps {
  setActiveView: (view: AppView) => void;
}

export default function PrivacyPolicyView({ setActiveView }: PrivacyPolicyViewProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 text-slate-800 dark:text-slate-200">
      <button onClick={() => setActiveView('home')} className="flex items-center gap-2 text-islamic-green">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
        <p><strong>Effective Date:</strong> April 14, 2026</p>
        <p>Welcome to Quran Shareef App. Your privacy is important to us. This Privacy Policy explains how we handle your information.</p>
        
        <h2 className="text-xl font-bold">1. Information We Collect</h2>
        <p>We do not collect any personal information such as your name, email address, or phone number.</p>
        <p>However, our app may collect:</p>
        <ul className="list-disc pl-5">
          <li>Location Information (Geographical Data) – used only to provide accurate features such as prayer times, Qibla direction, and Islamic calendar based on your region.</li>
        </ul>

        <h2 className="text-xl font-bold">2. How We Use Information</h2>
        <p>The location data is used only to:</p>
        <ul className="list-disc pl-5">
          <li>Provide accurate Namaz (Prayer) times</li>
          <li>Determine Qibla direction</li>
          <li>Show relevant Islamic calendar information</li>
        </ul>
        <p>We do not store, share, or sell your location data.</p>

        <h2 className="text-xl font-bold">3. Data Storage</h2>
        <ul className="list-disc pl-5">
          <li>We do not store any personal data on our servers.</li>
          <li>Location data is used temporarily within the app and is not permanently saved.</li>
        </ul>

        <h2 className="text-xl font-bold">4. Third-Party Services</h2>
        <p>We do not use advertising services like AdMob.</p>
        <p>However, the app may use basic system services (such as location services provided by your device) to function properly.</p>

        <h2 className="text-xl font-bold">5. Children’s Privacy</h2>
        <p>Our app is safe for all users, including children. We do not knowingly collect any personal data from users of any age.</p>

        <h2 className="text-xl font-bold">6. Permissions</h2>
        <p>The app may request:</p>
        <ul className="list-disc pl-5">
          <li>Location Permission – to provide accurate prayer times and Qibla direction</li>
          <li>Internet Access – to load Quran content and features</li>
        </ul>

        <h2 className="text-xl font-bold">7. User Consent</h2>
        <p>By using this app, you agree to this Privacy Policy.</p>

        <h2 className="text-xl font-bold">8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page.</p>

        <h2 className="text-xl font-bold">9. Contact Us</h2>
        <p>If you have any questions, please contact us:</p>
        <p>Email: amaanmohd8186@gmail.com</p>

        <p className="pt-4 border-t border-slate-200 dark:border-slate-700">This application is developed for educational and religious purposes only.</p>
        <p className="italic text-center">Guided by Faith • Powered by Amaan Siddiqui</p>
      </div>
    </div>
  );
}
