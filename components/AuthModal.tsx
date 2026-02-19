
import React, { useState } from 'react';

export const AuthModal: React.FC<{ onClose: () => void, onLogin: (name: string) => void }> = ({ onClose, onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onLogin(name);
    else alert("يرجى إدخال اسمك الكريم");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-indigo-950/90 backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="bg-indigo-900 border border-amber-500/50 p-10 rounded-[50px] w-full max-w-sm text-center space-y-6 shadow-2xl animate-in zoom-in duration-300">
        <div className="text-5xl mb-4">🌙</div>
        <h2 className="text-3xl font-black text-amber-400">مرحباً بك في خطوات الخير</h2>
        <p className="text-slate-400 text-sm">أدخل اسمك لتبدأ رحلتك الإيمانية الخاصة</p>
        
        <input 
          autoFocus
          type="text" 
          placeholder="اسمك الكريم"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-indigo-950 border border-indigo-700 p-5 rounded-2xl text-center outline-none focus:border-amber-500 text-white font-bold"
        />

        <button type="submit" className="w-full bg-amber-500 text-indigo-950 font-black py-4 rounded-2xl shadow-lg hover:bg-amber-400 transition-all">
          ابدأ الآن
        </button>
        <button type="button" onClick={onClose} className="text-slate-500 text-sm hover:text-slate-300 transition-colors">إغلاق</button>
      </form>
    </div>
  );
};
