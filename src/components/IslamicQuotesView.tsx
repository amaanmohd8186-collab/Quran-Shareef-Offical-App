import React, { useState, useRef } from 'react';
import { ISLAMIC_QUOTES } from '../constants';
import { motion } from 'motion/react';
import { Copy, Check, Download } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function IslamicQuotesView() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const copyToClipboard = (quote: typeof ISLAMIC_QUOTES[0], id: string) => {
    const text = `"${quote.text.en}"\n"${quote.text.hi}"\n"${quote.text.ur}"\n— ${quote.reference}`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadQuote = async (id: string) => {
    const card = cardRefs.current[id];
    if (card) {
      try {
        const dataUrl = await toPng(card, { cacheBust: true });
        const link = document.createElement('a');
        link.download = `islamic-quote-${id}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Error downloading quote:', err);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-serif font-bold text-islamic-green dark:text-emerald-400 mb-6">
        Islamic Quotes
      </h2>
      <div className="grid gap-8">
        {ISLAMIC_QUOTES.map((quote) => (
          <motion.div
            key={quote.id}
            ref={(el) => { cardRefs.current[quote.id] = el; }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-8 text-center"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-[url('https://picsum.photos/seed/tree/800/1000')] bg-cover bg-center"
            />
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative z-10 space-y-6 text-white"
            >
              <div className="space-y-3">
                <p className="text-xl font-serif leading-relaxed italic">
                  "{quote.text.en}"
                </p>
                <p className="text-xl font-serif leading-relaxed italic">
                  "{quote.text.hi}"
                </p>
                <p className="text-xl font-serif leading-relaxed italic">
                  "{quote.text.ur}"
                </p>
              </div>
              <p className="text-amber-300 text-sm font-medium tracking-wider">
                — {quote.reference}
              </p>
            </motion.div>

            {/* Actions */}
            <div className="absolute bottom-6 right-6 flex gap-2 z-20">
              <button
                onClick={() => downloadQuote(quote.id)}
                className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
                title="Download as image"
              >
                <Download className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => copyToClipboard(quote, quote.id)}
                className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
                title="Copy all languages"
              >
                {copiedId === quote.id ? (
                  <Check className="w-6 h-6 text-emerald-300" />
                ) : (
                  <Copy className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
