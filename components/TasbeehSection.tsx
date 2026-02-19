
import React, { useState } from 'react';

export const TasbeehSection: React.FC = () => {
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);

  const increment = () => {
    if (count === 32) {
      setCount(0);
      setRounds(prev => prev + 1);
    } else {
      setCount(prev => prev + 1);
    }
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const reset = () => {
    setCount(0);
    setRounds(0);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-black text-amber-400 mb-1">المسبحة</h2>
        <p className="text-slate-400 text-sm">ألا بذكر الله تطمئن القلوب</p>
      </div>

      <div className="relative w-56 h-56 flex items-center justify-center">
        <div className="absolute inset-0 border-4 border-indigo-800 rounded-full"></div>
        <div className="absolute inset-2 border border-amber-500/20 rounded-full"></div>
        
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="112"
            cy="112"
            r="106"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-amber-500/5"
          />
          <circle
            cx="112"
            cy="112"
            r="106"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={106 * 2 * Math.PI}
            strokeDashoffset={106 * 2 * Math.PI * (1 - count / 33)}
            className="text-amber-500 transition-all duration-300"
          />
        </svg>

        <button 
          onClick={increment}
          className="w-40 h-40 bg-gradient-to-br from-indigo-800 to-indigo-950 rounded-full shadow-inner flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all group z-10 border border-indigo-700"
        >
          <span className="text-5xl font-black text-white group-hover:text-amber-400 transition-colors">{count}</span>
          <span className="text-slate-400 text-[10px] mt-1">انقر للتسبيح</span>
        </button>
      </div>

      <div className="flex gap-4 items-center bg-indigo-900/30 p-4 rounded-2xl w-full justify-around border border-indigo-700/30">
        <div className="text-center">
          <p className="text-slate-400 text-[10px]">الدورات</p>
          <p className="text-xl font-bold text-emerald-400">{rounds}</p>
        </div>
        <button 
          onClick={reset}
          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-1.5 rounded-xl text-xs font-bold transition-all"
        >
          تصفير
        </button>
      </div>
    </div>
  );
};
