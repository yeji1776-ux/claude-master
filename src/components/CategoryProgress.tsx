'use client';

import { Category, CATEGORY_COLORS } from '@/types';

interface CategoryProgressProps {
  categoryStats: { category: Category; completed: number; total: number }[];
}

export default function CategoryProgress({ categoryStats }: CategoryProgressProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-white/80 text-sm font-semibold mb-3">카테고리별 진행률</h3>
      {categoryStats.map(({ category, completed, total }) => {
        const percentage = total > 0 ? (completed / total) * 100 : 0;
        const color = CATEGORY_COLORS[category];
        return (
          <div key={category} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70">{category}</span>
              <span className="text-white/40">{completed}/{total}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%`, backgroundColor: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
