
import React from 'react';
import { ProgressState } from '../types';

interface ProgressTrackerProps {
  progress: ProgressState;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  const getStageStats = (start: number, end: number) => {
    let completed = 0;
    for (let i = start; i <= end; i++) {
      if (progress[i] && Object.values(progress[i]).every(v => v === true)) {
        completed++;
      }
    }
    return (completed / (end - start + 1)) * 100;
  };

  const stages = [
    { name: "العشر الأوائل", range: [1, 10], label: "الرحمة", color: "from-blue-500 to-indigo-600" },
    { name: "العشر الأواسط", range: [11, 20], label: "المغفرة", color: "from-amber-500 to-orange-600" },
    { name: "العشر الأواخر", range: [21, 30], label: "العتق", color: "from-emerald-500 to-teal-600" }
  ];

  return (
    <div className="space-y-6">
      {stages.map((stage, idx) => {
        const percentage = getStageStats(stage.range[0], stage.range[1]);
        return (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-amber-200">{stage.name} - <span className="opacity-70">{stage.label}</span></span>
              <span className="text-slate-400">{Math.round(percentage)}%</span>
            </div>
            <div className="h-4 bg-indigo-950 rounded-full overflow-hidden border border-indigo-800">
              <div 
                className={`h-full bg-gradient-to-l ${stage.color} transition-all duration-1000`} 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
