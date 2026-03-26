'use client';

import { useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface StudyActivity {
  id: string;
  type: string;
  label: string;
  timestamp: number;
}

interface StudyRecord {
  date: string;
  activities: StudyActivity[];
}

const GREETINGS = [
  '오늘도 한 발 앞으로! 화이팅!',
  '꾸준함이 실력이 됩니다!',
  '작은 노력이 큰 변화를 만들어요!',
  '오늘도 성장하는 하루를 시작해볼까요?',
  '매일 배우는 당신이 멋져요!',
  '오늘의 학습이 미래를 바꿉니다!',
  '한 걸음씩, 꾸준히 가봅시다!',
  '학습은 가장 좋은 투자예요!',
  '오늘도 새로운 걸 배워볼까요?',
  '당신의 성장을 응원합니다!',
];

export default function CheckInBanner() {
  const [records, setRecords] = useLocalStorage<StudyRecord[]>('claude-master-study-records', []);

  const today = new Date().toISOString().split('T')[0];
  const dayIndex = new Date().getDay();
  const greeting = GREETINGS[dayIndex % GREETINGS.length];

  const isCheckedIn = useMemo(() => {
    const todayRecord = records.find(r => r.date === today);
    return todayRecord?.activities.some(a => a.type === 'attendance') ?? false;
  }, [records, today]);

  // Streak calculation
  const streak = useMemo(() => {
    const recordMap: Record<string, boolean> = {};
    records.forEach(r => {
      if (r.activities.length > 0) recordMap[r.date] = true;
    });

    let count = 0;
    const d = new Date();
    const todayStr = d.toISOString().split('T')[0];
    if (!recordMap[todayStr]) {
      d.setDate(d.getDate() - 1);
    }
    while (true) {
      const dateStr = d.toISOString().split('T')[0];
      if (recordMap[dateStr]) {
        count++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  }, [records]);

  const handleCheckIn = () => {
    const now = Date.now();
    const activity: StudyActivity = {
      id: `attendance-${now}`,
      type: 'attendance',
      label: '출석 체크',
      timestamp: now,
    };

    setRecords(prev => {
      const existing = prev.find(r => r.date === today);
      if (existing) {
        return prev.map(r =>
          r.date === today
            ? { ...r, activities: [...r.activities, activity] }
            : r
        );
      }
      return [...prev, { date: today, activities: [activity] }];
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium mb-1">{greeting}</p>
          {streak > 0 && (
            <p className="text-amber-400 text-xs font-medium">
              🔥 {streak}일 연속 학습 중
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          {isCheckedIn ? (
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white/40 text-sm cursor-default">
              오늘도 출석 완료! 🔥
            </div>
          ) : (
            <button
              onClick={handleCheckIn}
              className="bg-gradient-to-r from-amber-500 to-red-500 text-black font-semibold text-sm px-4 py-2 rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all animate-pulse"
            >
              출석 체크
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
