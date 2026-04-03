'use client';

import { useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { tips } from '@/data/tips';
import { useTimer } from '@/contexts/TimerContext';
import ProgressCircle from './ProgressCircle';
import CheckInBanner from './CheckInBanner';

interface HomePageProps {
  onTabChange: (tab: string, subTab?: string) => void;
}

const quickAccess = [
  { id: 'learn', emoji: '📚', label: '학습', tab: 'learn' },
  { id: 'timer', emoji: '⏱️', label: '타이머', tab: 'tools', subTab: 'timer' },
  { id: 'calendar', emoji: '📅', label: '캘린더', tab: 'my', subTab: 'calendar' },
  { id: 'memo', emoji: '📝', label: '메모', tab: 'tools', subTab: 'memo' },
  { id: 'portfolio', emoji: '💼', label: '포트폴리오', tab: 'my', subTab: 'portfolio' },
  { id: 'reference', emoji: '🛸', label: '레퍼런스', tab: 'reference' },
];

export default function HomePage({ onTabChange }: HomePageProps) {
  const [completedTips] = useLocalStorage<number[]>('claude-master-completed', []);
  const [bookmarks] = useLocalStorage<number[]>('claude-master-bookmarks', []);
  const { isRunning, timeLeft, mode, todayMinutes } = useTimer();

  const percentage = useMemo(() => Math.round((completedTips.length / 100) * 100), [completedTips]);

  const recentBookmarks = useMemo(() => {
    return bookmarks.slice(-3).reverse().map(id => tips.find(t => t.id === id)).filter(Boolean);
  }, [bookmarks]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="text-center pt-4 md:hidden">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          클로드 마스터
        </h1>
        <p className="text-xs text-gray-400 mt-1">AI 활용 100가지 팁 - 8주 마스터</p>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block pt-6">
        <h1 className="text-2xl font-bold text-gray-900">홈</h1>
        <p className="text-sm text-gray-400 mt-1">AI 활용 100가지 팁 - 8주 마스터</p>
      </div>

      {/* Check-in Banner */}
      <CheckInBanner />

      {/* Progress Circle + Quick Stats side by side on desktop */}
      <div className="md:flex md:gap-6 md:items-center">
        {/* Progress Circle */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5 p-6 md:flex-1">
          <ProgressCircle completed={completedTips.length} total={100} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-5 md:mt-0 md:flex md:flex-col md:gap-3 md:w-48">
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5 p-3 text-center">
            <p className="text-xl font-bold text-amber-600">{completedTips.length}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">완료한 팁</p>
          </div>
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5 p-3 text-center">
            <p className="text-xl font-bold text-emerald-600">{todayMinutes}<span className="text-xs">분</span></p>
            <p className="text-[11px] text-gray-400 mt-0.5">오늘 집중</p>
          </div>
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5 p-3 text-center">
            <p className="text-xl font-bold text-purple-600">{bookmarks.length}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">북마크</p>
          </div>
        </div>
      </div>

      {/* Mini Timer (if running) */}
      {isRunning && (
        <div className="bg-white/60 backdrop-blur-xl border border-amber-200/60 rounded-2xl shadow-lg shadow-black/5 p-4 glow-amber">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{mode === 'focus' ? '🎯' : '☕'}</span>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {mode === 'focus' ? '집중 모드' : '휴식 모드'}
                </p>
                <p className="text-xs text-gray-400">진행 중</p>
              </div>
            </div>
            <p className="text-2xl font-mono font-bold text-amber-600 tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
        </div>
      )}

      {/* Quick Access Grid */}
      <div>
        <h2 className="text-gray-700 text-sm font-semibold mb-3">빠른 접근</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {quickAccess.map(item => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.tab, item.subTab)}
              className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5 p-4 text-center hover:bg-white/70 hover:shadow-xl hover:shadow-black/10 transition-all active:scale-95"
            >
              <span className="text-2xl block mb-1">{item.emoji}</span>
              <span className="text-xs text-gray-600 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Bookmarks */}
      {recentBookmarks.length > 0 && (
        <div>
          <h2 className="text-gray-700 text-sm font-semibold mb-3">최근 북마크</h2>
          <div className="space-y-2 md:grid md:grid-cols-3 md:gap-3 md:space-y-0">
            {recentBookmarks.map(tip => tip && (
              <button
                key={tip.id}
                onClick={() => { window.location.href = `/tip/${tip.id}`; }}
                className="w-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-xl shadow-sm p-3 text-left hover:bg-white/70 hover:shadow-xl hover:shadow-black/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-amber-600 text-xs font-bold">#{tip.id}</span>
                  <p className="text-sm text-gray-900 truncate">{tip.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Motivational Card */}
      <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 border border-amber-200/60 rounded-2xl p-5 text-center">
        <p className="text-lg mb-1">🔥</p>
        <p className="text-sm text-gray-900 font-medium">꾸준히 학습하면 8주 안에 마스터!</p>
        <p className="text-xs text-gray-400 mt-1">매일 조금씩 진행해보세요</p>
      </div>
    </div>
  );
}
