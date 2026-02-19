
import React, { useState } from 'react';
import { DailyTasks } from '../types';

interface DailyModalProps {
  day: number;
  currentTasks?: DailyTasks;
  onClose: () => void;
  onSave: (tasks: DailyTasks) => void;
}

export const DailyModal: React.FC<DailyModalProps> = ({ day, currentTasks, onClose, onSave }) => {
  const [tasks, setTasks] = useState<DailyTasks>(currentTasks || {
    fasting: false,
    prayer: false,
    qiyam: false,
    charity: false,
    athkar: false,
    quran: false,
    dua: false
  });

  const toggleTask = (key: keyof DailyTasks) => {
    setTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateScore = () => {
    const total = Object.values(tasks).length;
    const completed = Object.values(tasks).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  const taskLabels: Record<keyof DailyTasks, string> = {
    fasting: "الصيام",
    prayer: "الصلاة (5 فروض)",
    qiyam: "صلاة القيام (التراويح)",
    charity: "الصدقة",
    athkar: "أذكار الصباح والمساء",
    quran: "قراءة الورد اليومي",
    dua: "الدعاء"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-indigo-950 border-2 border-amber-500/50 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="bg-amber-500 p-6 flex justify-between items-center text-indigo-950">
          <h2 className="text-2xl font-black">تقييم اليوم {day}</h2>
          <button onClick={onClose} className="text-3xl font-bold leading-none hover:rotate-90 transition-transform">&times;</button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {(Object.keys(taskLabels) as Array<keyof DailyTasks>).map((key) => (
              <div 
                key={key} 
                className="flex items-center justify-between p-4 bg-indigo-900/50 rounded-2xl cursor-pointer hover:bg-indigo-900 transition-colors"
                onClick={() => toggleTask(key)}
              >
                <span className="text-lg font-medium">{taskLabels[key]}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${tasks[key] ? 'bg-emerald-500 border-emerald-500 scale-110' : 'border-slate-600'}`}>
                  {tasks[key] && <span className="text-xl text-white">✓</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-indigo-800 flex items-center justify-between">
            <div className="text-center">
              <p className="text-slate-400 text-sm">الدرجة النهائية</p>
              <p className="text-3xl font-black text-amber-400">{calculateScore()}%</p>
            </div>
            <button 
              onClick={() => {
                onSave(tasks);
                onClose();
              }}
              className="bg-amber-500 hover:bg-amber-400 text-indigo-950 font-black py-4 px-12 rounded-2xl transition-all shadow-xl shadow-amber-500/10"
            >
              حفظ الإنجاز
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
