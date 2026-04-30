export interface Chapter {
  id: number;
  title: string;
  content: string;
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explanation?: string;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  level: number;
  is_free: boolean;
  chapters: Chapter[];
  ebook: {
    chapters: Chapter[];
  };
  slides?: { id: number; title: string; text: string }[];
  quiz: QuizQuestion[];
  affiliation?: {
    provider: string;
    text: string;
    link: string;
    cta?: string;
  };
  marketing?: {
    hook?: string;
    promise?: string;
    transformation?: string;
  };
}

export interface Level {
  id: number;
  title: string;
  modules: { id: number; slug: string; title: string; free: boolean }[];
}

export interface UserProgress {
  completedModules: string[];
  completedQuizzes: string[];
  xp: number;
  streak: number;
  lastActivity: string;
  isPremium?: boolean;
  badges: string[];
  friends: string[]; // List of user IDs
  friendRequests: { from: string; status: 'pending' | 'accepted' }[];
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  income: number;
  expenses: number;
  assets: number;
  country: string;
  isPremium: boolean;
  ebookCount: number;
  followers: number;
  following: number;
}

export interface AIGeneratedEbook {
  id: string;
  creatorId: string;
  creatorName: string;
  title: string;
  theme: string;
  level: 'Débutant' | 'Intermédiaire' | 'Expert';
  sections: Chapter[];
  likes: number;
  comments: { user: string; text: string; date: string }[];
  isPublic: boolean;
  createdAt: string;
}

export interface SocialMessage {
  id: string;
  fromId: string;
  toId: string;
  text?: string;
  sharedContent?: {
    type: 'ebook' | 'quiz' | 'profile';
    id: string;
    label: string;
  };
  timestamp: string;
  status: 'sent' | 'read';
}

export type BadgeType = "Débutant" | "Investisseur" | "Premium" | "Ambassadeur";

export const RANKS = [
  { name: "Apprenti", minXp: 0, icon: "💡" },
  { name: "Analyste", minXp: 500, icon: "🔍" },
  { name: "Investisseur", minXp: 1500, icon: "📊" },
  { name: "Stratège", minXp: 3500, icon: "🎯" },
  { name: "Maître de l'Empire", minXp: 7000, icon: "🏰" },
];

export function getRank(xp: number) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXp) rank = r;
  }
  return rank;
}

export function getNextRank(xp: number) {
  for (const r of RANKS) {
    if (xp < r.minXp) return r;
  }
  return null;
}
