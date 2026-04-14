import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Bot, User, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { AppView } from '../types';
import islamicQuestions from '../data/islamicQuestions.json';

interface AIAssistantProps {
  setActiveView: (view: AppView) => void;
}

export default function AIAssistant({ setActiveView }: AIAssistantProps) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Assalamu Alaikum! I am your Quran AI Assistant. I can answer common questions about Islam and the Quran. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const lowerInput = userMessage.toLowerCase();
    
    // Better matching logic
    const found = islamicQuestions.find(q => {
      const qLower = q.question.toLowerCase();
      // Check if input contains question keywords or vice versa
      const keywords = qLower.split(' ').filter(w => w.length > 3);
      return lowerInput.includes(qLower) || qLower.includes(lowerInput) || keywords.some(k => lowerInput.includes(k));
    });

    const response = found 
      ? found.answer 
      : "I'm sorry, I don't have a specific answer for that in my database yet. Please try asking about Zakat, Ramadan, Hajj, or the Five Pillars of Islam.";
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 500);
  };

  const startTilawatCorrection = () => {
    setMessages(prev => [...prev, { role: 'assistant', content: "Tilawat Correction Tool: Please record your Tilawat. (Note: This feature requires integration with a Speech-to-Text engine, which is currently a placeholder.)" }]);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col p-6 space-y-6">
      <button 
        onClick={() => setActiveView('home')}
        className="flex items-center gap-2 text-islamic-green dark:text-emerald-400 font-medium hover:underline w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-islamic-gold" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Quran AI Assistant</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={startTilawatCorrection}
            className="px-4 py-2 bg-islamic-gold text-white rounded-full font-bold text-sm hover:bg-amber-600 transition-all"
          >
            Tilawat Correction
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && <Bot className="w-8 h-8 text-islamic-green mt-1" />}
            <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-islamic-green text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'}`}>
              {msg.content}
            </div>
            {msg.role === 'user' && <User className="w-8 h-8 text-slate-400 mt-1" />}
          </div>
        ))}
        {isLoading && <div className="text-slate-500 italic">Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask anything about Islam..."
          className="flex-1 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-islamic-green"
        />
        <button onClick={sendMessage} className="p-4 bg-islamic-green text-white rounded-2xl hover:bg-emerald-600">
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
