import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, MessageSquare, Trash2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

const SYSTEM_INSTRUCTION = `You are Quran AI, a knowledgeable and respectful Islamic AI Assistant. 
Your goal is to provide accurate information about Islam, the Quran, Hadith, and Islamic history.
Always maintain a humble and respectful tone. 
When quoting the Quran, provide the Surah and Ayah number.
If a question is outside the scope of Islam or religious matters, gently guide the user back or state your primary purpose.
Use clear, empathetic language.`;

export default function AIAssistant() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Assalamu Alaikum! I am Quran AI, your Islamic companion. How can I help you learn more about Islam or the Quran today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })).concat([{ role: 'user', parts: [{ text: userMessage }] }]),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const aiResponse = response.text || "I apologize, I couldn't generate a response. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error connecting to my knowledge base. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: "Assalamu Alaikum! I am Quran AI, your Islamic companion. How can I help you learn more about Islam or the Quran today?" }]);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-4xl font-serif text-islamic-green flex items-center gap-3">
            Quran AI Assistant <Sparkles className="w-6 h-6 text-islamic-gold" />
          </h2>
          <p className="text-slate-500 italic">Ask anything about Islam, Quran, or Hadith.</p>
        </div>
        <button 
          onClick={clearChat}
          className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
          title="Clear Chat"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-4 mb-6 scroll-smooth">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                m.role === 'user' ? 'bg-islamic-green text-white' : 'bg-white border border-slate-100 text-islamic-green shadow-sm'
              }`}>
                {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-4 rounded-3xl shadow-sm ${
                m.role === 'user' 
                  ? 'bg-islamic-green text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-islamic-green">
                  <Markdown>{m.content}</Markdown>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-islamic-green shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-3xl rounded-tl-none shadow-sm italic text-slate-400">
                Quran AI is thinking...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about prayer, fasting, Quran verses..."
          className="w-full pl-6 pr-16 py-4 bg-white border border-slate-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-islamic-green/5 focus:border-islamic-green transition-all shadow-sm"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-islamic-green text-white rounded-2xl hover:bg-islamic-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
