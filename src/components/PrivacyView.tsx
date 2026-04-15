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
        <p><strong>Effective Date:</strong> April 15, 2026</p>
        <p>Welcome to Quran Shareef App. Your privacy is important to us.</p>
        
        <h2 className="text-xl font-bold">1. Information We Collect</h2>
        <p>We do not collect, store, or process any personal information directly from users.</p>

        <h2 className="text-xl font-bold">2. Permissions</h2>
        <p>This app does not request sensitive permissions such as:</p>
        <ul className="list-disc pl-5">
          <li>Camera</li>
          <li>Microphone</li>
          <li>Storage</li>
        </ul>

        <h2 className="text-xl font-bold">3. Third-Party Content</h2>
        <p>This app may display third-party content, such as live streaming from Makkah and Madinah through external websites.</p>
        <p>These third-party services may:</p>
        <ul className="list-disc pl-5">
          <li>Collect usage data</li>
          <li>Use cookies or similar technologies</li>
          <li>Track user interaction according to their own privacy policies</li>
        </ul>
        <p>We do not control or take responsibility for how third-party services handle data.</p>

        <h2 className="text-xl font-bold">4. Data Usage</h2>
        <p>We do not store, share, or sell any personal data.</p>

        <h2 className="text-xl font-bold">5. Children’s Privacy</h2>
        <p>This app is suitable for all ages and does not knowingly collect personal information.</p>

        <h2 className="text-xl font-bold">6. Security</h2>
        <p>We do not store any user data on our servers.</p>

        <h2 className="text-xl font-bold">7. User Consent</h2>
        <p>By using this app, you agree to this Privacy Policy.</p>

        <h2 className="text-xl font-bold">8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy at any time. Changes will be reflected within the app.</p>

        <h2 className="text-xl font-bold">9. Contact Us</h2>
        <p>If you have any questions, contact us:</p>
        <p>Email: amaanmohd8186@gmail.com</p>

        <p className="pt-4 border-t border-slate-200 dark:border-slate-700">This app is developed for educational and religious purposes only.</p>
        <p className="italic text-center">Guided by Faith • Powered by Amaan Siddiqui</p>
      </div>
    </div>
  );
}
