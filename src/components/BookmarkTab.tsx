'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { tips } from '@/data/tips';
import { CATEGORY_COLORS } from '@/types';

export default function BookmarkTab() {
  const router = useRouter();
  const [bookmarks] = useLocalStorage<number[]>('claude-master-bookmarks', []);
  const [completedTips] = useLocalStorage<number[]>('claude-master-completed', []);

  const bookmarkedTips = useMemo(() => {
    return tips.filter(t => bookmarks.includes(t.id));
  }, [bookmarks]);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="text-center pt-2">
        <h1 className="text-xl font-bold text-white">⭐ 북마크</h1>
        <p className="text-xs text-white/40 mt-1">저장해둔 팁을 확인하세요</p>
      </div>

      {bookmarkedTips.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">⭐</p>
          <p className="text-sm text-white/40">북마크한 팁이 없어요</p>
          <p className="text-xs text-white/40 mt-1">팁 상세 페이지에서 별 아이콘을 눌러보세요</p>
        </div>
      ) : (
        <div className="space-y-2">
          {bookmarkedTips.map(tip => {
            const isCompleted = completedTips.includes(tip.id);
            const color = CATEGORY_COLORS[tip.category];
            return (
              <button
                key={tip.id}
                onClick={() => router.push(`/tip/${tip.id}`)}
                className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                  isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/15'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/40'
                }`}>
                  {isCompleted ? '✓' : tip.id}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{tip.title}</p>
                  <p className="text-xs text-white/40 truncate">{tip.desc}</p>
                </div>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{ backgroundColor: color + '20', color }}
                >
                  {tip.category}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="text-center text-xs text-white/40 pb-2">
        {bookmarkedTips.length}개 북마크
      </div>
    </div>
  );
}
