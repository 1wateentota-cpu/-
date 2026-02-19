
import React, { useState } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "رمضان كريم") {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 ramadan-gradient flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-12 animate-bounce">
        <div className="text-9xl mb-4">🌙</div>
        <h1 className="text-5xl font-black text-amber-400 drop-shadow-2xl">خطوات الخير</h1>
        <p className="text-slate-300 mt-4 text-xl">رفيقك الإيماني في شهر رمضان</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="أدخل كلمة المرور (رمضان كريم)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`
              w-full bg-white/10 border-2 p-5 rounded-3xl text-center text-xl outline-none transition-all
              ${error ? 'border-red-500 shake animate-pulse' : 'border-amber-500/50 focus:border-amber-500'}
            `}
          />
          {error && <p className="text-red-400 text-sm mt-2">عذراً، كلمة المرور خاطئة</p>}
        </div>
        <button 
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-400 text-indigo-950 font-black py-5 rounded-3xl text-xl shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 transition-all"
        >
          دخول
        </button>
      </form>

      <div className="mt-12 opacity-30 text-sm">
        تطبيق تفاعلي لإدارة طاعاتك اليومية في شهر الخير
      </div>
    </div>
  );
};
