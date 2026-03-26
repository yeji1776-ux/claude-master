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
            className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-all hover:bg-card-hover ${
              isCompleted ? 'border-green-500/30 bg-green-500/5' : 'border-border bg-card'
            }`}
          >
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-border text-text-muted'
            }`}>
              {isCompleted ? '✓' : tip.id}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{tip.title}</p>
              <p className="text-xs text-text-muted truncate">{tip.desc}</p>
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
