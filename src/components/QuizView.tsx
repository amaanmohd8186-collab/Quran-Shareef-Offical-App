import React, { useState } from 'react';
import { ISLAMIC_QUIZ_QUESTIONS } from '../constants';
import { CheckCircle2, XCircle, RefreshCcw, Trophy, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function QuizView() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

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
    if (currentQuestionIndex < ISLAMIC_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full space-y-8 text-center max-w-2xl mx-auto"
      >
        <div className="w-32 h-32 bg-islamic-green/10 rounded-full flex items-center justify-center text-islamic-green">
          <Trophy className="w-16 h-16" />
        </div>
        <div>
          <h2 className="text-5xl font-serif text-islamic-green mb-2">Masha'Allah!</h2>
          <p className="text-slate-500 text-xl">You've completed the Islamic Quiz.</p>
        </div>
        
        <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm w-full">
          <div className="text-6xl font-serif text-islamic-green mb-2">{score} / {ISLAMIC_QUIZ_QUESTIONS.length}</div>
          <p className="text-slate-500 uppercase tracking-widest text-sm">Your Final Score</p>
        </div>

        <button 
          onClick={resetQuiz}
          className="flex items-center gap-2 px-8 py-4 bg-islamic-green text-white rounded-2xl hover:bg-islamic-green/90 transition-all font-semibold shadow-lg shadow-islamic-green/20"
        >
          <RefreshCcw className="w-5 h-5" /> Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-serif text-islamic-green">Islamic Knowledge Quiz</h2>
          <p className="text-slate-500 italic">Test your knowledge and learn more about Islam.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full border border-slate-100 text-islamic-green font-serif font-bold">
          {currentQuestionIndex + 1} / {ISLAMIC_QUIZ_QUESTIONS.length}
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-serif text-slate-800 leading-relaxed">
                {currentQuestion.question}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = index === currentQuestion.correctAnswer;
                const isSelected = index === selectedOption;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isAnswered}
                    className={cn(
                      "flex items-center justify-between p-6 rounded-2xl border-2 transition-all text-left group",
                      !isAnswered && "border-slate-100 hover:border-islamic-green/30 hover:bg-islamic-green/5",
                      isAnswered && isCorrect && "border-emerald-500 bg-emerald-50 text-emerald-900",
                      isAnswered && isSelected && !isCorrect && "border-rose-500 bg-rose-50 text-rose-900",
                      isAnswered && !isSelected && !isCorrect && "border-slate-50 opacity-50"
                    )}
                  >
                    <span className="text-lg font-medium">{option}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-500" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-islamic-green/5 border border-islamic-green/10 p-6 rounded-2xl"
              >
                <p className="text-islamic-green font-semibold mb-1">Explanation:</p>
                <p className="text-slate-700 italic">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className="flex items-center gap-2 px-8 py-4 bg-islamic-green text-white rounded-2xl hover:bg-islamic-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg shadow-islamic-green/20"
        >
          {currentQuestionIndex === ISLAMIC_QUIZ_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'} 
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
