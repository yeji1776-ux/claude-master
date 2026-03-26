'use client';

import { useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { tips } from '@/data/tips';
import { Category, CATEGORY_COLORS } from '@/types';

export default function PortfolioTab() {
  const [completedTips] = useLocalStorage<number[]>('claude-master-completed', []);

  const stats = useMemo(() => {
    const categories = Object.keys(CATEGORY_COLORS) as Category[];
    return categories.map(category => {
      const catTips = tips.filter(t => t.category === category);
      const completed = catTips.filter(t => completedTips.includes(t.id)).length;
      const percentage = catTips.length > 0 ? Math.round((completed / catTips.length) * 100) : 0;
      return { category, completed, total: catTips.length, percentage, color: CATEGORY_COLORS[category] };
    });
  }, [completedTips]);

  const totalPercentage = Math.round((completedTips.length / 100) * 100);

  const level = useMemo(() => {
    if (totalPercentage >= 90) return { name: '마스터', emoji: '👑' };
    if (totalPercentage >= 70) return { name: '전문가', emoji: '🏆' };
    if (totalPercentage >= 50) return { name: '중급자', emoji: '⭐' };
    if (totalPercentage >= 25) return { name: '입문자', emoji: '🌱' };
    return { name: '시작', emoji: '🔰' };
  }, [totalPercentage]);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="text-center pt-2">
        <h1 className="text-xl font-bold text-white">🎯 나의 포트폴리오</h1>
        <p className="text-xs text-white/40 mt-1">학습 성과를 확인하세요</p>
      </div>

      {/* Level Card */}
      <div className="bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-amber-500/20 rounded-2xl p-6 text-center">
        <p className="text-4xl mb-2">{level.emoji}</p>
        <p className="text-lg font-bold text-white">{level.name}</p>
        <p className="text-sm text-white/40 mt-1">전체 {totalPercentage}% 완료</p>
        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden mt-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-700"
            style={{ width: `${totalPercentage}%` }}
          />
        </div>
      </div>

      {/* Category Breakdown */}
      <div>
        <h2 className="text-white/80 text-sm font-semibold mb-3">카테고리별 성과</h2>
        <div className="space-y-3">
          {stats.map(stat => (
            <div key={stat.category} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">{stat.category}</span>
                <span className="text-sm font-bold" style={{ color: stat.color }}>{stat.percentage}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${stat.percentage}%`, backgroundColor: stat.color }}
                />
              </div>
              <p className="text-xs text-white/40 mt-1">{stat.completed}/{stat.total} 완료</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
