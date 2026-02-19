
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Benefit {
  id: number;
  text: string;
}

export interface DailyTasks {
  fasting: boolean;
  prayer: boolean;
  qiyam: boolean;
  charity: boolean;
  athkar: boolean;
  quran: boolean;
  dua: boolean;
}

export interface ProgressState {
  [day: number]: DailyTasks;
}

export interface UserProfile {
  name: string;
  avatar: string;
  isLoggedIn: boolean;
  points: number;
}

export interface QuranNote {
  day: number;
  content: string;
  progress: string;
}
