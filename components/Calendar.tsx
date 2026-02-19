
import React from 'react';
import { ProgressState } from '../types';

interface CalendarProps {
  progress: ProgressState;
  activeStage: number;
  onDayClick: (day: number) => void;
}

const getDayNameAr = (day: number) => {
  const names = [
    "الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر",
    "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر", "الثامن عشر", "التاسع عشر", "العشرون",
    "الحادي والعشرون", "الثاني والعشرون", "الثالث والعشرون", "الرابع والعشرون", "الخامس والعشرون", "السادس والعشرون", "السابع والعشرون", "الثامن والعشرون", "التاسع والعشرون", "الثلاثون"
  ];
  return names[day - 1] || day.toString();
};

export const Calendar: React.FC<CalendarProps> = ({ progress, activeStage, onDayClick }) => {
  // عرض جميع أيام الشهر (30 يوماً) دفعة واحدة بناءً على طلب "فتح كل الأيام"
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const isDayCompleted = (day: number) => {
    const tasks = progress[day];
    return tasks && Object.values(tasks).every(v => v === true);
  };

  const getDayScore = (day: number) => {
    const tasks = progress[day];
    if (!tasks) return 0;
    const completed = Object.values(tasks).filter(Boolean).length;
    const total = Object.keys(tasks).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const isLocked = (day: number) => {
    // تم فتح جميع الأيام بناءً على طلب المستخدم
    return false;
  };

  return (
    <div className="w-full flex justify-start overflow-x-auto py-8 scrollbar-hide" dir="rtl">
      <div className="flex gap-6 px-6 min-w-max items-end">
        {days.map(day => {
          const locked = isLocked(day);
          const completed = isDayCompleted(day);
          const score = getDayScore(day);
          const hasStarted = progress[day] && Object.values(progress[day]).some(v => v === true);

          return (
            <div key={day} className="flex flex-col items-center group relative">
              <span className={`text-[11px] font-black mb-3 transition-all duration-300 transform group-hover:scale-110 ${locked ? 'text-slate-600' : 'text-amber-400'}`}>
                اليوم {getDayNameAr(day)}
              </span>
              
              <button
                disabled={locked}
                onClick={() => onDayClick(day)}
                className={`
                  w-20 h-28 rounded-[35px] flex flex-col items-center justify-center transition-all duration-500 relative shrink-0 border-2
                  ${locked 
                    ? 'opacity-40 border-dashed border-indigo-700 bg-indigo-950/20 cursor-not-allowed' 
                    : 'hover:scale-110 active:scale-95 shadow-2xl lantern-glow transform hover:-translate-y-2'}
                  ${completed 
                    ? 'bg-emerald-600 border-emerald-400 text-white' 
                    : hasStarted 
                      ? 'bg-amber-500 border-amber-300 text-indigo-950 font-black' 
                      : 'bg-indigo-900/40 border-indigo-700/50 text-slate-400'}
                `}
              >
                {completed ? (
                  <div className="flex flex-col items-center animate-in zoom-in">
                    <span className="text-xl font-black">100%</span>
                  </div>
                ) : (hasStarted && score > 0) ? (
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-black">{score}%</span>
                  </div>
                ) : (
                  <span className="text-3xl font-black">{day}</span>
                )}
                
                {locked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-[35px]">
                    <span className="text-2xl">🔒</span>
                  </div>
                )}
                
                {completed && (
                  <div className="absolute -top-2 -right-2 bg-white text-emerald-600 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-lg border-2 border-emerald-500 animate-bounce">
                    ✓
                  </div>
                )}

                {!locked && !completed && (
                   <div className="absolute -bottom-1 w-12 h-1 bg-amber-400 rounded-full blur-[2px] animate-pulse"></div>
                )}
              </button>

              {day < 30 && (
                <div className={`absolute right-full top-2/3 w-6 h-[2px] -mr-3 z-0 ${isDayCompleted(day) ? 'bg-emerald-500' : 'bg-indigo-800'}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
