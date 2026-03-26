'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ProgressCircle from './ProgressCircle';
import WeekCard from './WeekCard';
import TipList from './TipList';
import CategoryProgress from './CategoryProgress';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { tips } from '@/data/tips';
import { Category, CATEGORY_COLORS } from '@/types';

export default function LearningTab() {
  const router = useRouter();
  const [completedTips] = useLocalStorage<number[]>('claude-master-completed', []);
  const [activeWeek, setActiveWeek] = useState<number | null>(null);

  const weekTips = useMemo(() => {
    const grouped: Record<number, typeof tips> = {};
    for (let w = 1; w <= 8; w++) {
      grouped[w] = tips.filter(t => t.week === w);
    }
    return grouped;
  }, []);

  const categoryStats = useMemo(() => {
    const categories = Object.keys(CATEGORY_COLORS) as Category[];
    return categories.map(category => {
      const categoryTips = tips.filter(t => t.category === category);
      const completed = categoryTips.filter(t => completedTips.includes(t.id)).length;
      return { category, completed, total: categoryTips.length };
    });
  }, [completedTips]);

  const handleWeekClick = (week: number) => {
    setActiveWeek(activeWeek === week ? null : week);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center pt-2">
        <h1 className="text-xl font-bold bg-gradient-to-r from-gold to-red bg-clip-text text-transparent">
          클로드 마스터
        </h1>
        <p className="text-xs text-text-muted mt-1">8주 완성 AI 활용 100가지 팁</p>
      </div>

      {/* Progress Circle */}
      <ProgressCircle completed={completedTips.length} total={100} />

      {/* Week Cards */}
      <div>
        <h2 className="text-sm font-semibold text-text-secondary mb-3">📚 주차별 커리큘럼</h2>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 8 }, (_, i) => i + 1).map(week => (
            <WeekCard
              key={week}
              week={week}
              completed={weekTips[week]?.filter(t => completedTips.includes(t.id)).length || 0}
              total={weekTips[week]?.length || 0}
              onClick={() => handleWeekClick(week)}
              isActive={activeWeek === week}
            />
          ))}
        </div>
      </div>

      {/* Tip List for active week */}
      {activeWeek && weekTips[activeWeek] && (
        <div>
          <h2 className="text-sm font-semibold text-text-secondary mb-3">
            Week {activeWeek} 팁 목록
          </h2>
          <TipList
            tips={weekTips[activeWeek]}
            completedTips={completedTips}
            onTipClick={(id) => router.push(`/tip/${id}`)}
          />
        </div>
      )}

      {/* Category Progress */}
      <div className="rounded-xl border border-border bg-card p-4">
        <CategoryProgress categoryStats={categoryStats} />
      </div>
    </div>
  );
}
