
import React from 'react';

interface EidCelebrationProps {
  onBack: () => void;
}

export const EidCelebration: React.FC<EidCelebrationProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 flex flex-col items-center justify-center p-8 text-center overflow-hidden">
      {/* Animated Stars/Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-amber-300 opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 2 + 1}rem`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="relative z-10 space-y-8 animate-in zoom-in fade-in duration-1000">
        <div className="text-[120px] mb-4">🎉</div>
        <h1 className="text-6xl md:text-8xl font-black text-amber-400 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">عيد مبارك</h1>
        <div className="space-y-4">
          <p className="text-3xl text-emerald-300 font-bold">تقبل الله منا ومنكم صالح الأعمال</p>
          <p className="text-xl text-slate-300 max-w-lg mx-auto leading-relaxed">
            تم بحمد الله إتمام شهر رمضان، نسأل الله أن يبارك لنا ولكم في عيدنا وأن يعيده علينا بالخير واليمن والبركات.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
          <button 
            onClick={onBack}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-12 rounded-full border border-white/20 transition-all"
          >
            العودة للتطبيق
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-amber-500 hover:bg-amber-400 text-indigo-950 font-black py-4 px-12 rounded-full shadow-2xl transition-all"
          >
            حفظ شهادة الإتمام 📜
          </button>
        </div>
      </div>

      {/* Traditional Decoration */}
      <div className="absolute top-0 w-full flex justify-between px-12 opacity-30">
        <span className="text-6xl">🏮</span>
        <span className="text-6xl">🏮</span>
        <span className="text-6xl">🏮</span>
      </div>
    </div>
  );
};
