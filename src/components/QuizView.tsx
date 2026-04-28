import React, { useState } from 'react';
import { ISLAMIC_QUIZ_QUESTIONS } from '../constants';
import { CheckCircle2, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { AppView } from '../types';
import AdBanner from './AdBanner';

interface QuizViewProps {
  setActiveView: (view: AppView) => void;
  language: 'en' | 'hi' | 'ur' | 'ar';
}

export default function QuizView({ setActiveView, language: globalLanguage }: QuizViewProps) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [internalLanguage, setInternalLanguage] = useState<'en' | 'hi' | 'ur' | 'ar'>(globalLanguage);

  const language = internalLanguage;

  const questionsPerLevel = 5;
  const totalLevels = 20;

  const currentQuestion = ISLAMIC_QUIZ_QUESTIONS[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if ((currentQuestionIndex + 1) % questionsPerLevel !== 0) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const nextLevel = () => {
    if (currentLevel < totalLevels) {
      setCurrentLevel(prev => {
        const next = prev + 1;
        setCurrentQuestionIndex((next - 1) * questionsPerLevel);
        return next;
      });
      setScore(0);
      setShowResult(false);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-6 space-y-8 text-center max-w-2xl mx-auto min-h-screen bg-[#002B1B] text-white"
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-[#D4AF37] rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="w-32 h-32 bg-[#D4AF37]/20 border-2 border-[#D4AF37] rounded-full flex items-center justify-center text-[#D4AF37] relative z-10">
            <Trophy className="w-16 h-16" />
          </div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-5xl font-h2 text-[#D4AF37] mb-2 leading-tight">Level {currentLevel} Complete!</h2>
          <p className="text-white/60 text-xl font-medium">Masha'Allah! May Allah increase your knowledge.</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl w-full border border-white/20 shadow-2xl relative z-10">
          <div className="text-7xl font-h1 text-[#D4AF37] mb-2 drop-shadow-sm">{score} / {questionsPerLevel}</div>
          <div className="h-1 w-20 bg-white/20 mx-auto mb-4"></div>
          <p className="text-white/40 uppercase tracking-[0.4em] text-xs font-bold font-sans">Level Final Score</p>
        </div>

        <AdBanner className="relative z-10 opacity-80" />

        <button 
          onClick={nextLevel}
          className="relative z-10 flex items-center gap-3 px-12 py-5 bg-[#D4AF37] text-[#002B1B] rounded-full hover:scale-105 active:scale-95 transition-all font-bold shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
        >
          <span className="text-lg">{currentLevel < totalLevels ? 'Next Level' : 'Restart Journey'}</span>
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Background elements for results view */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#D4AF37] rounded-full blur-[150px]"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#002B1B] text-white font-body-md relative overflow-y-auto">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#004D36] rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 p-gutter pt-12 pb-20 max-w-2xl mx-auto flex flex-col items-center">
        {/* Top Header */}
        <div className="w-full flex items-center justify-between mb-8">
          <button 
            onClick={() => setActiveView('home')}
            className="p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-1">Islamic Quiz</span>
            <span className="text-xl font-h2">{(currentQuestionIndex % questionsPerLevel) + 1}/{questionsPerLevel}</span>
          </div>

          <div className="flex gap-2">
            <select 
              value={internalLanguage} 
              onChange={(e) => setInternalLanguage(e.target.value as 'en' | 'hi' | 'ur' | 'ar')}
              className="bg-white/10 border-none text-xs rounded-lg px-2 py-1 outline-none text-white/70"
            >
              <option value="en" className="bg-[#002B1B]">EN</option>
              <option value="hi" className="bg-[#002B1B]">HI</option>
              <option value="ur" className="bg-[#002B1B]">UR</option>
              <option value="ar" className="bg-[#002B1B]">AR</option>
            </select>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="58"
              stroke="#D4AF37"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray="364.4"
              initial={{ strokeDashoffset: 364.4 }}
              animate={{ 
                strokeDashoffset: 364.4 - (364.4 * ((currentQuestionIndex % questionsPerLevel) + 1) / questionsPerLevel) 
              }}
              className="drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-h1 text-[#D4AF37]">{(currentQuestionIndex % questionsPerLevel) + 1}</span>
            <span className="text-[10px] uppercase tracking-widest text-white/50">Level {currentLevel}</span>
          </div>
        </div>

        <AdBanner className="mb-6 opacity-80" />

        {/* Question Area */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-center"
          >
            {/* Question Card */}
            <div className="w-full mb-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center shadow-2xl">
                <h2 className="text-2xl font-h2 leading-relaxed mb-4">
                  {currentQuestion.question[language] || currentQuestion.question['en']}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto"></div>
              </div>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {currentQuestion.options[language].map((option, index) => {
                const isCorrect = index === currentQuestion.correctAnswer;
                const isSelected = index === selectedOption;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isAnswered}
                    className={cn(
                      "relative group flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300",
                      !isAnswered && "bg-white/5 border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10",
                      isAnswered && isCorrect && "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]",
                      isAnswered && isSelected && !isCorrect && "bg-red-500/20 border-red-500 text-red-200",
                      isAnswered && !isSelected && !isCorrect && "opacity-40 grayscale"
                    )}
                  >
                    <div className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors",
                      !isAnswered && "border-white/20 bg-white/5 text-white/80 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]",
                      isAnswered && isCorrect && "border-[#D4AF37] bg-[#D4AF37] text-[#002B1B]",
                      isAnswered && isSelected && !isCorrect && "border-red-500 bg-red-500 text-white"
                    )}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium text-left text-lg">{(currentQuestion.options[language] && currentQuestion.options[language][index]) || currentQuestion.options['en'][index]}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 ml-auto text-[#D4AF37]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Explanation */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 w-full"
            >
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl p-4">
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">Knowledge Drop</p>
                <p className="text-white/80 text-sm italic">{currentQuestion.explanation[language] || currentQuestion.explanation['en']}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        <div className="mt-10 w-full flex justify-end">
          <motion.button
            key={isAnswered ? 'answered' : 'not-answered'}
            initial={isAnswered ? { scale: 0.9, opacity: 0 } : { scale: 1, opacity: 0.5 }}
            animate={isAnswered ? { 
              scale: [1, 1.05, 1],
              opacity: 1 
            } : { scale: 1, opacity: 0.5 }}
            transition={isAnswered ? { 
              scale: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
              opacity: { duration: 0.3 }
            } : {}}
            onClick={handleNext}
            disabled={!isAnswered}
            className={cn(
              "flex items-center gap-2 px-10 py-4 rounded-full font-bold transition-all transform",
              isAnswered 
                ? "bg-[#D4AF37] text-[#002B1B] shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
                : "bg-white/10 text-white/30 cursor-not-allowed"
            )}
          >
            {((currentQuestionIndex + 1) % questionsPerLevel === 0) ? 'Complete Level' : 'Next Question'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
