'use client';

import { useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function CalendarWidget() {
  const [completedTips] = useLocalStorage<number[]>('claude-master-completed', []);
  const [currentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const monthName = currentDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });

  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  const activeDays = useMemo(() => {
    const days = new Set<number>();
    const count = completedTips.length;
    if (count > 0) {
      for (let i = 0; i < Math.min(count, today); i++) {
        days.add(today - i);
      }
    }
    return days;
  }, [completedTips, today]);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="text-center pt-2">
        <h1 className="text-xl font-bold text-white">📅 학습 캘린더</h1>
        <p className="text-xs text-white/40 mt-1">학습 기록을 한눈에 확인하세요</p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <h3 className="text-center text-sm font-semibold text-white mb-4">{monthName}</h3>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayLabels.map(day => (
            <div key={day} className="text-center text-xs text-white/40 py-1">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }, (_, i) => (
            <div key={`empty-${i}`} className="h-9" />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const isToday = day === today;
            const isActive = activeDays.has(day);
            return (
              <div
                key={day}
                className={`h-9 flex items-center justify-center rounded-lg text-xs transition-all ${
                  isToday
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold'
                    : isActive
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-white/40'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/30" />
            <span className="text-white/40">오늘</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500/10" />
            <span className="text-white/40">학습 완료</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">{completedTips.length}</p>
          <p className="text-xs text-white/40 mt-1">총 완료 팁</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">{activeDays.size}</p>
          <p className="text-xs text-white/40 mt-1">이번 달 학습일</p>
        </div>
      </div>
    </div>
  );
}
