'use client';

import { Tip, CATEGORY_COLORS } from '@/types';

interface TipListProps {
  tips: Tip[];
  completedTips: number[];
  onTipClick: (tipId: number) => void;
}

export default function TipList({ tips, completedTips, onTipClick }: TipListProps) {
  return (
    <div className="space-y-2 animate-fadeIn">
      {tips.map((tip) => {
        const isCompleted = completedTips.includes(tip.id);
        return (
          <button
            key={tip.id}
            onClick={() => onTipClick(tip.id)}
            className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
              isCompleted
                ? 'bg-emerald-50/80 border-emerald-200 hover:bg-emerald-50'
                : 'bg-white/60 backdrop-blur-xl border-white/80 shadow-sm hover:bg-white/70 hover:shadow-xl hover:shadow-black/10'
            }`}
          >
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'
            }`}>
              {isCompleted ? '\u2713' : tip.id}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{tip.title}</p>
              <p className="text-xs text-gray-400 truncate">{tip.desc}</p>
            </div>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: CATEGORY_COLORS[tip.category] + '20',
                color: CATEGORY_COLORS[tip.category]
              }}
            >
              {tip.category}
            </span>
          </button>
        );
      })}
    </div>
  );
}
