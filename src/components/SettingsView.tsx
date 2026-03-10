import React from 'react';
import { Heart, Mail, Shield, User, ExternalLink, Coffee } from 'lucide-react';

export default function SettingsView() {
  const upiId = "9719818918-@ybl";
  const upiLink = `upi://pay?pa=${upiId}&pn=Amaan%20Siddiqui&cu=INR`;
  const contactEmail = "amaanmohd8186@gmail.com";

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-islamic-green">Settings & About</h2>
        <p className="text-slate-500">Manage your preferences and learn more about Al-Huda.</p>
      </div>

      {/* Developer Info */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center gap-3 text-islamic-green">
          <User className="w-6 h-6" />
          <h3 className="text-xl font-bold">Developer</h3>
        </div>
        <div className="space-y-1">
          <p className="text-slate-700 font-medium">Developed by <span className="text-islamic-green font-bold">Amaan Siddiqui</span></p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${contactEmail}`} className="hover:text-islamic-green transition-colors">{contactEmail}</a>
          </div>
        </div>
      </div>

      {/* Donate Section */}
      <div className="bg-islamic-green/5 rounded-3xl p-8 border border-islamic-green/10 text-center space-y-6">
        <div className="w-16 h-16 bg-islamic-green/10 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 text-islamic-green fill-islamic-green/20" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold text-islamic-green">Support Al-Huda</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            If you find this app helpful, consider supporting its development. Your contributions help keep the app ad-free and updated.
          </p>
        </div>
        
        <div className="space-y-4">
          <a 
            href={upiLink}
            className="inline-flex items-center gap-3 px-8 py-4 bg-islamic-green text-white rounded-2xl font-bold shadow-lg shadow-islamic-green/20 hover:bg-islamic-green-dark transition-all transform hover:-translate-y-1"
          >
            <Coffee className="w-5 h-5" />
            Donate via UPI
          </a>
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">UPI ID: {upiId}</p>
        </div>
      </div>

      {/* Links & Policy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a 
          href="/privacy.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 hover:border-islamic-green/30 hover:bg-islamic-green/5 transition-all group w-full"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-islamic-green" />
            <span className="font-bold text-slate-700">Privacy Policy</span>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-islamic-green" />
        </a>

        <a 
          href={`mailto:${contactEmail}`}
          className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 hover:border-islamic-green/30 hover:bg-islamic-green/5 transition-all group"
        >
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-islamic-green" />
            <span className="font-bold text-slate-700">Contact Support</span>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-islamic-green" />
        </a>
      </div>

      <div className="text-center pt-8">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">Al-Huda v1.0.0</p>
      </div>
    </div>
  );
}
