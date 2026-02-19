
import React, { useState, useEffect } from 'react';
import { Calendar } from './components/Calendar';
import { DailyModal } from './components/DailyModal';
import { TasbeehSection } from './components/TasbeehSection';
import { QuranSection } from './components/QuranSection';
import { AuthModal } from './components/AuthModal';
import { QUESTIONS, BENEFITS } from './data';
import { ProgressState, Question, Benefit, UserProfile, DailyTasks } from './types';

const AVATAR_OPTIONS = [
  '👤', '👳‍♂️', '🧕', '🧔', '👴', '👵', '🕌', '🌙', '⭐', '🦁', '🦅', '🕊️', '📿', '📖', '🍵', '🕯️', '🕋', '🏘️', '🌄', '💎', '🛡️', '🎁'
];

const getDayNameAr = (day: number) => {
  const names = [
    "الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر",
    "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر", "الثامن عشر", "التاسع عشر", "العشرون",
    "الحادي والعشرون", "الثاني والعشرون", "الثالث والعشرون", "الرابع والعشرون", "الخامس والعشرون", "السادس والعشرون", "السابع والعشرون", "الثامن والعشرون", "التاسع والعشرون", "الثلاثون"
  ];
  return names[day - 1] || day.toString();
};

const App: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showBenefit, setShowBenefit] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  
  const [simulatedDay, setSimulatedDay] = useState<number>(() => {
    const d = new Date().getDate();
    return d > 30 ? 30 : (d || 1);
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ramadan_user');
    return saved ? JSON.parse(saved) : { name: '', avatar: '👤', isLoggedIn: false, points: 0 };
  });

  const [progress, setProgress] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('ramadan_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [solvedQuestions, setSolvedQuestions] = useState<number[]>(() => {
    const saved = localStorage.getItem('ramadan_solved_questions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ramadan_progress', JSON.stringify(progress));
    localStorage.setItem('ramadan_solved_questions', JSON.stringify(solvedQuestions));
    localStorage.setItem('ramadan_user', JSON.stringify(user));
  }, [progress, solvedQuestions, user]);

  const handleUpdateTask = (day: number, tasks: any) => {
    setProgress(prev => {
      const newProgress: ProgressState = { ...prev, [day]: tasks };
      const taskPoints = Object.values(newProgress).reduce((acc: number, dayTasks: DailyTasks) => 
        acc + Object.values(dayTasks || {}).filter(Boolean).length * 10, 0
      );
      const bonusPoints = solvedQuestions.length * 50;
      
      setUser(u => ({ ...u, points: taskPoints + bonusPoints }));
      return newProgress;
    });
  };

  let activeStage = 0;
  if (simulatedDay > 10) activeStage = 1;
  if (simulatedDay > 20) activeStage = 2;

  const dailyQuestion: Question = QUESTIONS[simulatedDay % QUESTIONS.length];
  const dailyBenefit: Benefit = BENEFITS[simulatedDay % BENEFITS.length];

  const handleCorrectAnswer = () => {
    if (solvedQuestions.includes(dailyQuestion.id)) return;
    setSolvedQuestions(prev => [...prev, dailyQuestion.id]);
    setUser(u => ({ ...u, points: u.points + 50 }));
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowQuestion(false);
    }, 3000);
  };

  const onQuestionClick = () => {
    if (solvedQuestions.includes(dailyQuestion.id)) return;
    setShowQuestion(true);
  };

  return (
    <div className="min-h-screen ramadan-gradient p-4 md:p-8 flex flex-col items-center overflow-x-hidden" dir="rtl">
      {/* Navigation */}
      <nav className="w-full max-w-5xl flex flex-col sm:flex-row gap-4 justify-between items-center mb-12 bg-white/5 backdrop-blur-md p-5 rounded-[40px] border border-white/10 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="text-3xl filter drop-shadow-glow">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C11.5367 3 11.0822 3.03504 10.6378 3.10265C13.2981 4.54226 15.087 7.4116 15.087 10.6957C15.087 14.8647 11.705 18.2466 7.53603 18.2466C5.97544 18.2466 4.52643 17.7725 3.32141 16.9605C4.38531 19.3892 6.80492 21 9.61538 21H12Z" fill="#FBBF24"/>
            </svg>
          </div>
          {user.isLoggedIn ? (
            <div className="flex items-center gap-4 group">
              <button 
                onClick={() => setShowAvatarPicker(true)}
                className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform relative overflow-visible"
              >
                {user.avatar}
                <div className="absolute -top-1 -right-1 bg-white text-indigo-950 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black border border-amber-500 animate-pulse">✎</div>
              </button>
              <div className="text-right">
                <p className="text-sm font-black text-amber-200">{user.name}</p>
                <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                   <p className="text-[10px] text-slate-400 font-bold">{user.points} نقطة</p>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuth(true)}
              className="bg-amber-500 text-indigo-950 px-8 py-2.5 rounded-2xl text-xs font-black shadow-lg hover:bg-amber-400 hover:scale-105 transition-all"
            >
              دخول
            </button>
          )}
        </div>

        {/* Date Controller */}
        <div className="flex items-center gap-4 bg-indigo-950/60 p-2 rounded-2xl border border-indigo-700/50 shadow-inner">
           <button 
             onClick={() => setSimulatedDay(prev => Math.max(1, prev - 1))}
             className="w-10 h-10 flex items-center justify-center bg-indigo-800 hover:bg-amber-500 hover:text-indigo-950 text-amber-400 rounded-xl transition-all font-black"
           >
             -
           </button>
           <div className="flex flex-col items-center px-4 min-w-[120px]">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">تغيير التاريخ</span>
              <span className="text-sm font-black text-amber-100">اليوم {getDayNameAr(simulatedDay)}</span>
           </div>
           <button 
             onClick={() => setSimulatedDay(prev => Math.min(30, prev + 1))}
             className="w-10 h-10 flex items-center justify-center bg-indigo-800 hover:bg-amber-500 hover:text-indigo-950 text-amber-400 rounded-xl transition-all font-black"
           >
             +
           </button>
        </div>

        <div className="hidden md:flex gap-4 items-center">
            <span className="text-xs font-bold text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              خطوات الخير • ٢٠٢٤
            </span>
        </div>
      </nav>

      <main className="w-full max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-24">
        {/* Progress & Calendar Section */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
             <h2 className="text-3xl font-black text-amber-100 uppercase tracking-[0.2em] drop-shadow-lg">
                {activeStage === 0 ? 'مرحلة الرحمة' : activeStage === 1 ? 'مرحلة المغفرة' : 'مرحلة العتق'}
             </h2>
             <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full blur-[1px]"></div>
             <p className="text-slate-400 text-sm font-medium">سجل عبادتك اليومية بالضغط على الرقم..</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-[50px] border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[80px]"></div>
            <Calendar 
              progress={progress} 
              activeStage={activeStage} 
              onDayClick={(day) => setSelectedDay(day)} 
            />
          </div>
        </section>

        {/* Interaction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <button 
            disabled={solvedQuestions.includes(dailyQuestion.id)}
            onClick={onQuestionClick}
            className={`p-12 rounded-[60px] border-2 transition-all flex flex-col items-center justify-center h-64 relative overflow-hidden group shadow-2xl
              ${solvedQuestions.includes(dailyQuestion.id) ? 'border-emerald-500/40 bg-emerald-500/5 cursor-default' : 'border-amber-500/20 bg-white/5 hover:border-amber-500 hover:bg-amber-500/5 hover:-translate-y-2'}
            `}
          >
            <div className="absolute -top-6 -left-6 text-8xl opacity-5 group-hover:opacity-10 transition-opacity rotate-12">❓</div>
            <h3 className="text-2xl font-black text-amber-400 mb-4">تحدي اليوم {simulatedDay}</h3>
            {solvedQuestions.includes(dailyQuestion.id) ? (
              <div className="flex flex-col items-center text-emerald-400 font-black animate-in zoom-in">
                 <div className="text-4xl mb-2">✓</div>
                 <span className="text-sm">أحسنت! تم الحل</span>
              </div>
            ) : (
              <span className="text-slate-400 text-xs font-black bg-indigo-900/60 px-6 py-2 rounded-full border border-indigo-700/50">اربح ٥٠ نقطة</span>
            )}
          </button>

          <button 
            onClick={() => setShowBenefit(true)}
            className="p-12 rounded-[60px] border-2 border-emerald-500/20 bg-white/5 hover:border-emerald-500 hover:bg-emerald-500/5 hover:-translate-y-2 transition-all flex flex-col items-center justify-center h-64 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute -top-6 -left-6 text-8xl opacity-5 group-hover:opacity-10 transition-opacity -rotate-12">💡</div>
            <h3 className="text-2xl font-black text-emerald-400 mb-4">فائدة اليوم {simulatedDay}</h3>
            <p className="text-slate-400 text-xs text-center font-black bg-indigo-900/60 px-6 py-2 rounded-full border border-indigo-700/50 uppercase tracking-widest">زادك المعرفي</p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-indigo-900/10 p-12 rounded-[60px] border border-white/5 shadow-2xl backdrop-blur-xl">
            <TasbeehSection />
          </div>
          <div className="bg-indigo-900/10 p-12 rounded-[60px] border border-white/5 shadow-2xl backdrop-blur-xl">
            <QuranSection />
          </div>
        </div>
      </main>

      {/* Modals */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={(name) => {
        setUser(u => ({ ...u, name, isLoggedIn: true }));
        setShowAuth(false);
      }} />}

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
          <div className="bg-indigo-950 border-2 border-amber-500/50 p-10 rounded-[60px] w-full max-w-lg shadow-[0_0_80px_rgba(251,191,36,0.15)] animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-amber-400">اختر صورتك الرمزية</h3>
              <button onClick={() => setShowAvatarPicker(false)} className="text-slate-400 hover:text-white text-3xl">✕</button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 max-h-96 overflow-y-auto p-2 scrollbar-hide">
              {AVATAR_OPTIONS.map((av) => (
                <button 
                  key={av}
                  onClick={() => {
                    setUser(u => ({ ...u, avatar: av }));
                    setShowAvatarPicker(false);
                  }}
                  className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl transition-all border-2 ${user.avatar === av ? 'bg-amber-500 border-white scale-110 shadow-lg shadow-amber-500/20' : 'bg-indigo-900 border-indigo-700 hover:bg-indigo-800'}`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedDay !== null && (
        <DailyModal 
          day={selectedDay} 
          currentTasks={progress[selectedDay]}
          onClose={() => setSelectedDay(null)}
          onSave={(tasks) => handleUpdateTask(selectedDay, tasks)}
        />
      )}

      {showQuestion && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
          {showConfetti && <div className="absolute inset-0 z-[110] flex items-center justify-center pointer-events-none text-6xl animate-bounce">🎊✨⭐🕌⭐✨🎊</div>}
          <div className="bg-indigo-950 border-2 border-amber-500 w-full max-w-md p-12 rounded-[60px] relative shadow-[0_0_50px_rgba(251,191,36,0.2)] animate-in zoom-in duration-300">
            <button onClick={() => setShowQuestion(false)} className="absolute top-10 left-10 text-white/50 text-2xl hover:text-amber-500 transition-colors">✕</button>
            <div className="space-y-10 text-center">
              <div className="bg-amber-500/10 w-24 h-24 rounded-[30px] flex items-center justify-center mx-auto mb-4 border border-amber-500/20 rotate-3">
                <span className="text-5xl">🕌</span>
              </div>
              <h3 className="text-2xl font-black leading-relaxed text-amber-100">{dailyQuestion.text}</h3>
              <div className="space-y-4">
                {dailyQuestion.options.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => i === dailyQuestion.correctAnswer ? handleCorrectAnswer() : alert("إجابة غير صحيحة، حاول مجدداً")}
                    className="w-full p-6 bg-indigo-900/40 hover:bg-amber-500 hover:text-indigo-950 transition-all rounded-3xl text-center border border-indigo-700/50 font-black text-lg"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showBenefit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-3xl">
          <div className="bg-indigo-950 border-2 border-emerald-500 w-full max-w-md p-12 rounded-[60px] text-center shadow-[0_0_50px_rgba(16,185,129,0.2)] animate-in fade-in zoom-in duration-300 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 blur-[50px]"></div>
            <div className="text-8xl mb-10 animate-pulse">💡</div>
            <p className="text-2xl text-slate-100 font-black leading-relaxed italic mb-12">"{dailyBenefit.text}"</p>
            <button 
              onClick={() => setShowBenefit(false)} 
              className="bg-emerald-600 px-16 py-5 rounded-full font-black text-white shadow-xl hover:bg-emerald-500 hover:scale-105 transition-all w-full"
            >
              سبحان الله وبحمده
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
