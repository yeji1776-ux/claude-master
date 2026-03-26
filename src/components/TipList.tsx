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
                ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/15'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/40'
            }`}>
              {isCompleted ? '\u2713' : tip.id}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{tip.title}</p>
              <p className="text-xs text-white/40 truncate">{tip.desc}</p>
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
