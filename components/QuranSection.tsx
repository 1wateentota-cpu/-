
import React, { useState, useEffect } from 'react';
import { QuranNote } from '../types';

export const QuranSection: React.FC = () => {
  const [notes, setNotes] = useState<QuranNote[]>(() => {
    const saved = localStorage.getItem('quran_notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [newNote, setNewNote] = useState("");
  const [newProgress, setNewProgress] = useState("");

  useEffect(() => {
    localStorage.setItem('quran_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newNote && !newProgress) return;
    const note: QuranNote = {
      day: new Date().getDate(),
      content: newNote,
      progress: newProgress
    };
    setNotes([note, ...notes]);
    setNewNote("");
    setNewProgress("");
  };

  const deleteNote = (idx: number) => {
    setNotes(notes.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-black text-amber-400 mb-1">الختمة والملاحظات</h2>
        <p className="text-slate-400 text-sm">ورتل القرآن ترتيلاً</p>
      </div>

      <div className="bg-indigo-900/20 p-6 rounded-3xl border border-indigo-700/30 space-y-3">
        <input 
          type="text" 
          placeholder="أين وصلت اليوم؟"
          value={newProgress}
          onChange={(e) => setNewProgress(e.target.value)}
          className="w-full bg-indigo-950/50 border border-indigo-700/50 p-3 rounded-xl focus:ring-1 focus:ring-amber-500 outline-none text-sm"
        />
        <textarea 
          placeholder="خاطرة عن آية..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={2}
          className="w-full bg-indigo-950/50 border border-indigo-700/50 p-3 rounded-xl focus:ring-1 focus:ring-amber-500 outline-none text-sm resize-none"
        />
        <button 
          onClick={addNote}
          className="w-full bg-amber-500 hover:bg-amber-400 text-indigo-950 font-black py-3 rounded-xl transition-all text-sm"
        >
          حفظ
        </button>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-1 scrollbar-hide">
        {notes.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs italic">
            لا يوجد سجل قراءة بعد
          </div>
        ) : (
          notes.map((note, idx) => (
            <div key={idx} className="bg-indigo-900/30 p-4 rounded-2xl border border-indigo-700/20 flex justify-between items-start group">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-amber-500 text-indigo-950 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">يوم {note.day}</span>
                  <span className="text-emerald-400 font-bold text-xs">{note.progress}</span>
                </div>
                <p className="text-slate-300 text-xs italic leading-relaxed">"{note.content}"</p>
              </div>
              <button 
                onClick={() => deleteNote(idx)}
                className="opacity-0 group-hover:opacity-100 text-red-400/50 hover:text-red-400 p-1"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
