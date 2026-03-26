'use client';

import { useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { tips } from '@/data/tips';
import { useTimer } from '@/contexts/TimerContext';

export default function HomePage() {
  const [completedTips] = useLocalStorage<number[]>('claude-master-completed', []);
  const { todayMinutes } = useTimer();

  const percentage = useMemo(() => Math.round((completedTips.length / 100) * 100), [completedTips]);

  const recentTips = useMemo(() => {
    return tips
      .filter(t => !completedTips.includes(t.id))
      .slice(0, 3);
  }, [completedTips]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome */}
      <div className="text-center pt-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
          클로드 마스터
        </h1>
        <p className="text-sm text-white/40 mt-1">AI 활용 100가지 팁</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">{completedTips.length}</p>
          <p className="text-xs text-white/40 mt-1">완료한 팁</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{percentage}%</p>
          <p className="text-xs text-white/40 mt-1">진행률</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">{todayMinutes}</p>
          <p className="text-xs text-white/40 mt-1">오늘 학습(분)</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 text-sm font-semibold">전체 진행률</span>
          <span className="text-amber-400 text-sm font-bold">{percentage}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-white/40 mt-2">{completedTips.length}/100 팁 완료</p>
      </div>

      {/* Next Up */}
      <div>
        <h2 className="text-white/80 text-sm font-semibold mb-3">📋 다음에 학습할 팁</h2>
        <div className="space-y-2">
          {recentTips.map(tip => (
            <div key={tip.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 hover:bg-white/10 hover:border-white/20 transition-all">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/40">
                  {tip.id}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{tip.title}</p>
                  <p className="text-xs text-white/40 truncate">{tip.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Card */}
      <div className="bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-amber-500/20 rounded-2xl p-5 text-center">
        <p className="text-lg mb-1">🔥</p>
        <p className="text-sm text-white font-medium">꾸준히 학습하면 8주 안에 마스터!</p>
        <p className="text-xs text-white/40 mt-1">매일 조금씩 진행해보세요</p>
      </div>
    </div>
  );
}
