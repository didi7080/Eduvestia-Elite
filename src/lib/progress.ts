"use client";

import { UserProgress, UserProfile } from "./types";
import { createClient } from "./supabase";

const STORAGE_KEY = "scan-finance-progress";
const PROFILE_KEY = "scan-finance-profile";
const SUB_KEY = "scan-finance-subscription";
const TEST_PREMIUM_KEY = "scan-finance-test-premium";

const supabase = createClient();

function getDefaultProgress(): UserProgress {
  return {
    completedModules: [],
    completedQuizzes: [],
    xp: 0,
    streak: 0,
    lastActivity: "",
    badges: [],
    friends: [],
    friendRequests: []
  };
}

function getDefaultProfile(): UserProfile {
  return {
    id: "anonymous",
    name: "Invité",
    avatar: "🧔",
    income: 0,
    expenses: 0,
    assets: 0,
    country: "fr",
    isPremium: false,
    ebookCount: 0,
    followers: 0,
    following: 0
  };
}

export async function syncToCloud(progress: UserProgress, profile: UserProfile) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { id, ...profileData } = profile;

  await supabase
    .from('profiles')
    .upsert({ 
      id: user.id, 
      ...profileData,
      progress_data: progress,
      updated_at: new Date().toISOString()
    });
}

export async function fetchFromCloud(): Promise<{ progress: UserProgress, profile: UserProfile } | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !data) return null;

  return {
    progress: data.progress_data as UserProgress,
    profile: data as unknown as UserProfile
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const data = JSON.parse(raw) as UserProgress;
    return { ...getDefaultProgress(), ...data };
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  const profile = loadProfile();
  syncToCloud(progress, profile).catch(console.error);
}

export function completeModule(slug: string): UserProgress {
  const progress = loadProgress();
  if (!progress.completedModules.includes(slug)) {
    progress.completedModules.push(slug);
  }
  const today = new Date().toISOString().split("T")[0];
  if (progress.lastActivity !== today) {
    progress.streak += 1;
  }
  progress.lastActivity = today;
  saveProgress(progress);
  return progress;
}

export function completeQuiz(slug: string, xpEarned: number): UserProgress {
  const progress = loadProgress();
  if (!isPremium()) {
    const today = new Date().toISOString().split("T")[0];
    const dailyQuizzes = JSON.parse(localStorage.getItem("daily-quizzes") || "{}");
    if (dailyQuizzes.date !== today) {
      dailyQuizzes.date = today;
      dailyQuizzes.count = 0;
    }
    dailyQuizzes.count += 1;
    localStorage.setItem("daily-quizzes", JSON.stringify(dailyQuizzes));
  }

  if (!progress.completedQuizzes.includes(slug)) {
    progress.completedQuizzes.push(slug);
    progress.xp += xpEarned;
  }
  const today = new Date().toISOString().split("T")[0];
  if (progress.lastActivity !== today) {
    progress.streak += 1;
  }
  progress.lastActivity = today;
  saveProgress(progress);
  return progress;
}

export function canPlayQuiz(): boolean {
  if (isPremium()) return true;
  const today = new Date().toISOString().split("T")[0];
  const dailyQuizzes = JSON.parse(localStorage.getItem("daily-quizzes") || "{}");
  if (dailyQuizzes.date !== today) return true;
  return dailyQuizzes.count < 2;
}

export function loadProfile(): UserProfile {
  if (typeof window === "undefined") return getDefaultProfile();
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return getDefaultProfile();
    return { ...getDefaultProfile(), ...JSON.parse(raw) };
  } catch {
    return getDefaultProfile();
  }
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  const progress = loadProgress();
  syncToCloud(progress, profile).catch(console.error);
}

export function calculateFinancialHealthScore(profile: UserProfile): {
  score: number;
  grade: string;
  breakdown: { label: string; score: number; max: number; tip: string }[];
} {
  const breakdown: { label: string; score: number; max: number; tip: string }[] = [];
  const savingsRate = profile.income > 0 ? ((profile.income - profile.expenses) / profile.income) * 100 : 0;
  const savingsScore = Math.min(25, Math.round((savingsRate / 30) * 25));
  breakdown.push({ label: "Taux d'épargne", score: savingsScore, max: 25, tip: "Vise les 20%." });
  const total = savingsScore + 50; 
  return { score: total, grade: "B", breakdown };
}

export function isPremium(): boolean {
  if (typeof window === "undefined") return false;
  const testPremium = localStorage.getItem(TEST_PREMIUM_KEY) === "true";
  if (testPremium) return true;
  try {
    const raw = localStorage.getItem(SUB_KEY);
    if (!raw) return false;
    const sub = JSON.parse(raw);
    return sub.isPremium === true;
  } catch {
    return false;
  }
}

export function setTestPremium(value: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TEST_PREMIUM_KEY, value ? "true" : "false");
  window.location.reload();
}

export function activatePremium(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SUB_KEY, JSON.stringify({ isPremium: true, plan: "premium", trialEndsAt: "" }));
}

export function activateTrial(): void {
  if (typeof window === "undefined") return;
  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 7);
  localStorage.setItem(SUB_KEY, JSON.stringify({ isPremium: true, plan: "premium", trialEndsAt: trialEnd.toISOString() }));
}
