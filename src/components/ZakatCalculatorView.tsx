import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Coins, Gem, Home, TrendingUp, ArrowLeft } from 'lucide-react';
import { AppView } from '../types';

interface ZakatCalculatorViewProps {
  setActiveView: (view: AppView) => void;
}

export default function ZakatCalculatorView({ setActiveView }: ZakatCalculatorViewProps) {
  const [currency, setCurrency] = useState('USD');
  const [gold, setGold] = useState<number>(0);
  const [silver, setSilver] = useState<number>(0);
  const [cash, setCash] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [business, setBusiness] = useState<number>(0);
  const [liabilities, setLiabilities] = useState<number>(0);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
    { code: 'SAR', symbol: 'SR', name: 'Saudi Riyal' },
    { code: 'AED', symbol: 'DH', name: 'UAE Dirham' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
    { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar' },
    { code: 'QAR', symbol: 'QR', name: 'Qatari Riyal' },
  ];

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  // Approximate Nisab values (can be made dynamic via API)
  // These are rough estimates in USD, we should ideally scale them by exchange rate
  // For now, we'll keep them as base values and the user can adjust their understanding
  const nisabGold = 85 * 65; 
  const nisabSilver = 595 * 0.8;

  const totalAssets = gold + silver + cash + savings + business;
  const netAssets = totalAssets - liabilities;
  
  const isEligible = netAssets >= nisabSilver; // Using silver nisab as the safer threshold
  const zakatAmount = isEligible ? netAssets * 0.025 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <button 
        onClick={() => setActiveView('home')}
        className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-islamic-green/10 dark:bg-emerald-500/20 text-islamic-green dark:text-emerald-400 mb-4">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">Zakat Calculator</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Calculate your Zakat easily. Enter your assets and liabilities to find out your Zakat obligation.
        </p>
        
        <div className="flex justify-center pt-4">
          <div className="bg-white dark:bg-slate-800 p-1 rounded-2xl border border-slate-100 dark:border-slate-700 inline-flex gap-1 overflow-x-auto max-w-full no-scrollbar">
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  currency === c.code 
                    ? 'bg-islamic-green text-white shadow-lg shadow-islamic-green/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {c.code} ({c.symbol})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
              <Coins className="w-5 h-5 text-islamic-green dark:text-emerald-400" />
              Your Assets
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gold & Silver (Value)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{currentCurrency.symbol}</span>
                  <input 
                    type="number" 
                    min="0"
                    value={gold || ''} 
                    onChange={(e) => setGold(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-islamic-green focus:border-islamic-green dark:focus:border-emerald-500 transition-colors"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cash at Home & Bank</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{currentCurrency.symbol}</span>
                  <input 
                    type="number" 
                    min="0"
                    value={cash || ''} 
                    onChange={(e) => setCash(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-islamic-green focus:border-islamic-green dark:focus:border-emerald-500 transition-colors"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Savings & Investments</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{currentCurrency.symbol}</span>
                  <input 
                    type="number" 
                    min="0"
                    value={savings || ''} 
                    onChange={(e) => setSavings(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-islamic-green focus:border-islamic-green dark:focus:border-emerald-500 transition-colors"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Business Assets (Stock/Inventory)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{currentCurrency.symbol}</span>
                  <input 
                    type="number" 
                    min="0"
                    value={business || ''} 
                    onChange={(e) => setBusiness(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-islamic-green focus:border-islamic-green dark:focus:border-emerald-500 transition-colors"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-500" />
              Your Liabilities
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Debts & Short-term Liabilities</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{currentCurrency.symbol}</span>
                <input 
                  type="number" 
                  min="0"
                  value={liabilities || ''} 
                  onChange={(e) => setLiabilities(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  placeholder="0.00"
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Only include debts that need to be paid off within the next 12 months.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-islamic-green text-white rounded-3xl p-6 md:p-8 shadow-lg sticky top-6">
            <h2 className="text-xl font-bold mb-6">Zakat Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-white/80">
                <span>Total Assets</span>
                <span>{currentCurrency.symbol}{totalAssets.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span>Total Liabilities</span>
                <span>- {currentCurrency.symbol}{liabilities.toFixed(2)}</span>
              </div>
              <div className="h-px bg-white dark:bg-slate-900/20 my-2" />
              <div className="flex justify-between items-center font-medium">
                <span>Net Zakatable Wealth</span>
                <span>{currentCurrency.symbol}{Math.max(0, netAssets).toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/10 rounded-2xl p-6 text-center">
              <p className="text-white/80 text-sm mb-2">Your Zakat (2.5%)</p>
              <p className="text-4xl font-bold">{currentCurrency.symbol}{zakatAmount.toFixed(2)}</p>
            </div>

            {!isEligible && netAssets > 0 && (
              <p className="text-sm text-white/80 mt-6 text-center">
                Your net wealth is below the Nisab threshold. Zakat is not obligatory for you at this time.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
