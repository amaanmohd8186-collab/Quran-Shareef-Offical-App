import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Coins, Gem, Home, TrendingUp } from 'lucide-react';

export default function ZakatCalculatorView() {
  const [gold, setGold] = useState<number>(0);
  const [silver, setSilver] = useState<number>(0);
  const [cash, setCash] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [business, setBusiness] = useState<number>(0);
  const [liabilities, setLiabilities] = useState<number>(0);

  // Approximate Nisab values (can be made dynamic via API)
  const nisabGold = 85 * 65; // 85 grams of gold * approx price per gram
  const nisabSilver = 595 * 0.8; // 595 grams of silver * approx price per gram

  const totalAssets = gold + silver + cash + savings + business;
  const netAssets = totalAssets - liabilities;
  
  const isEligible = netAssets >= nisabSilver; // Using silver nisab as the safer threshold
  const zakatAmount = isEligible ? netAssets * 0.025 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-islamic-green/10 dark:bg-emerald-500/20 text-islamic-green dark:text-emerald-400 mb-4">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">Zakat Calculator</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Calculate your Zakat easily. Enter your assets and liabilities to find out your Zakat obligation.
        </p>
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
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
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
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
                <span>${totalAssets.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span>Total Liabilities</span>
                <span>- ${liabilities.toFixed(2)}</span>
              </div>
              <div className="h-px bg-white dark:bg-slate-900/20 my-2" />
              <div className="flex justify-between items-center font-medium">
                <span>Net Zakatable Wealth</span>
                <span>${Math.max(0, netAssets).toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/10 rounded-2xl p-6 text-center">
              <p className="text-white/80 text-sm mb-2">Your Zakat (2.5%)</p>
              <p className="text-4xl font-bold">${zakatAmount.toFixed(2)}</p>
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
