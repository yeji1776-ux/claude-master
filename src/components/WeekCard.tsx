'use client';

import { WEEK_TITLES } from '@/types';

interface WeekCardProps {
  week: number;
  completed: number;
  total: number;
  onClick: () => void;
  isActive: boolean;
}

const weekColors = ['#F59E0B', '#F59E0B', '#10B981', '#10B981', '#6366F1', '#EC4899', '#3B82F6', '#EF4444'];

export default function WeekCard({ week, completed, total, onClick, isActive }: WeekCardProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const color = weekColors[week - 1];

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left transition-all ${
        isActive
          ? 'bg-white/70 border-white/80 shadow-xl shadow-black/10 glow-amber'
          : 'bg-white/60 backdrop-blur-xl border-white/80 shadow-lg shadow-black/5 hover:bg-white/70 hover:shadow-xl hover:shadow-black/10'
      }`}
      style={{ borderTopWidth: '3px', borderTopColor: color }}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>
            Week {week}
          </span>
          <h3 className="text-sm font-medium text-gray-900 mt-0.5">
            {WEEK_TITLES[week]}
          </h3>
        </div>
        <span className="text-xs text-gray-400">
          {completed}/{total}
        </span>
      </div>
      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-gray-200/50 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </button>
  );
}
