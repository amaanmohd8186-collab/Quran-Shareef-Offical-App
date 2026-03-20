import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HijriDate {
  date: string;
  format: string;
  day: string;
  weekday: {
    en: string;
    ar: string;
  };
  month: {
    number: number;
    en: string;
    ar: string;
  };
  year: string;
  designation: {
    abbreviated: string;
    expanded: string;
  };
  holidays: string[];
}

interface GregorianDate {
  date: string;
  format: string;
  day: string;
  weekday: {
    en: string;
  };
  month: {
    number: number;
    en: string;
  };
  year: string;
  designation: {
    abbreviated: string;
    expanded: string;
  };
}

interface CalendarDay {
  hijri: HijriDate;
  gregorian: GregorianDate;
}

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCalendarData(currentDate.getFullYear(), currentDate.getMonth() + 1);
  }, [currentDate]);

  const fetchCalendarData = async (year: number, month: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`);
      if (!response.ok) throw new Error('Failed to fetch calendar data');
      const data = await response.json();
      setCalendarData(data.data);
    } catch (err) {
      setError("Failed to load Islamic calendar. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get the first day of the month to pad the calendar grid
  const getFirstDayOffset = () => {
    if (calendarData.length === 0) return 0;
    const firstDayStr = calendarData[0].gregorian.date; // DD-MM-YYYY
    const [day, month, year] = firstDayStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.getDay();
  };

  const todayStr = new Date().toLocaleDateString('en-GB').replace(/\//g, '-'); // DD-MM-YYYY

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-islamic-green/10 dark:bg-emerald-500/20 text-islamic-green dark:text-emerald-400 mb-4">
          <CalendarIcon className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-800 dark:text-slate-200">Islamic Calendar</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Gregorian & Hijri Calendar with Islamic Events and Holidays.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <button
            onClick={prevMonth}
            className="p-2 text-slate-400 hover:text-islamic-green dark:hover:text-emerald-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-all shadow-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            {calendarData.length > 0 && (
              <p className="text-islamic-green dark:text-emerald-400 font-medium mt-1">
                {calendarData[0].hijri.month.en} / {calendarData[calendarData.length - 1].hijri.month.en} {calendarData[0].hijri.year} AH
              </p>
            )}
          </div>

          <button
            onClick={nextMonth}
            className="p-2 text-slate-400 hover:text-islamic-green dark:hover:text-emerald-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-all shadow-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-islamic-green dark:text-emerald-400 mb-4" />
            <p>Loading calendar...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-rose-600">
            {error}
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-7 gap-4 mb-4">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center font-bold text-slate-400 text-sm uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-4">
              {Array.from({ length: getFirstDayOffset() }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800/50" />
              ))}
              
              {calendarData.map((day, i) => {
                const isToday = day.gregorian.date === todayStr;
                const hasHolidays = day.hijri.holidays.length > 0;
                
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.01 }}
                    key={day.gregorian.date}
                    className={`aspect-square rounded-2xl p-2 md:p-4 flex flex-col justify-between relative group transition-all ${
                      isToday 
                        ? 'bg-islamic-green text-white shadow-lg shadow-islamic-green/20 scale-105 z-10' 
                        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-islamic-green/30 dark:hover:border-emerald-500/30 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-lg md:text-xl font-bold ${isToday ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                        {day.gregorian.day}
                      </span>
                      <span className={`text-sm font-medium ${isToday ? 'text-white/80' : 'text-islamic-green dark:text-emerald-400'}`}>
                        {day.hijri.day}
                      </span>
                    </div>
                    
                    {hasHolidays && (
                      <div className="mt-auto">
                        <div className={`w-2 h-2 rounded-full mx-auto ${isToday ? 'bg-white dark:bg-slate-900' : 'bg-rose-500'}`} />
                        
                        {/* Tooltip for holidays */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-slate-800 text-white text-xs p-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 text-center pointer-events-none">
                          {day.hijri.holidays.join(', ')}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Events List */}
      {!loading && !error && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">Islamic Events This Month</h3>
          <div className="space-y-4">
            {calendarData.filter(d => d.hijri.holidays.length > 0).length > 0 ? (
              calendarData.filter(d => d.hijri.holidays.length > 0).map((day, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                  <div className="w-16 h-16 rounded-xl bg-islamic-green/10 dark:bg-emerald-500/20 flex flex-col items-center justify-center text-islamic-green dark:text-emerald-400 flex-shrink-0">
                    <span className="text-2xl font-bold leading-none">{day.gregorian.day}</span>
                    <span className="text-xs font-medium uppercase">{day.gregorian.month.en.substring(0, 3)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">{day.hijri.holidays.join(', ')}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {day.hijri.day} {day.hijri.month.en} {day.hijri.year} AH
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-center py-8">No major Islamic events this month.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
