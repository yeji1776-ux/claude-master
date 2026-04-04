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
import { STORAGE_KEYS } from '@/constants/storageKeys';
import GlassCard from './ui/GlassCard';

export default function LearningTab() {
  const router = useRouter();
  const [completedTips, , completedLoaded] = useLocalStorage<number[]>(STORAGE_KEYS.COMPLETED, []);
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
    <div className={`space-y-6 animate-fadeIn transition-opacity duration-300 ${completedLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <div className="text-center pt-2">
        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          클로드 마스터
        </h1>
        <p className="text-xs text-gray-400 mt-1">8주 완성 AI 활용 100가지 팁</p>
      </div>

      {/* Progress Circle + Category Progress side by side on desktop */}
      <div className="md:flex md:gap-8 md:items-start">
        <div className="md:flex-1">
          <ProgressCircle completed={completedTips.length} total={tips.length} />
        </div>
        <GlassCard className="mt-6 md:mt-0 md:flex-1 p-4">
          <CategoryProgress categoryStats={categoryStats} />
        </GlassCard>
      </div>

      {/* Week Cards */}
      <div>
        <h2 className="text-gray-700 text-sm font-semibold mb-3">📚 주차별 커리큘럼</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
          <h2 className="text-gray-700 text-sm font-semibold mb-3">
            Week {activeWeek} 팁 목록
          </h2>
          <TipList
            tips={weekTips[activeWeek]}
            completedTips={completedTips}
            onTipClick={(id) => router.push(`/tip/${id}`)}
          />
        </div>
      )}
    </div>
  );
}
