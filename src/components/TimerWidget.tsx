'use client';

import { useTimer } from '@/contexts/TimerContext';

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function TimerWidget() {
  const { mode, timeLeft, isRunning, todayMinutes, toggleTimer, resetTimer, switchToBreak } = useTimer();

  const totalTime = mode === 'focus' ? FOCUS_TIME : BREAK_TIME;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const sessionCount = Math.floor(todayMinutes / 25);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5 p-6">
      <div className="flex flex-col items-center gap-4">
        {/* Mode indicator */}
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${mode === 'focus' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'}`} />
          <span className="text-sm font-medium text-gray-900">
            {mode === 'focus' ? '집중 모드' : '휴식 모드'}
          </span>
        </div>

        {/* Circular progress */}
        <div className="relative">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={mode === 'focus' ? '#F59E0B' : '#10B981'} />
                <stop offset="100%" stopColor={mode === 'focus' ? '#F97316' : '#34D399'} />
              </linearGradient>
            </defs>
            {/* Background circle */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="rgba(0,0,0,0.05)"
              strokeWidth="6"
            />
            {/* Progress circle */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="url(#timerGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 70 70)"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900 font-mono">{timeDisplay}</span>
            <span className="text-xs text-gray-400 mt-1">
              {mode === 'focus' ? '집중' : '휴식'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Reset */}
          <button
            onClick={resetTimer}
            className="bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl p-2.5 text-gray-500 hover:bg-white/70 hover:text-gray-700 transition-all"
            title="리셋"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={toggleTimer}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl p-3.5 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all"
          >
            {isRunning ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            )}
          </button>

          {/* Skip to break */}
          <button
            onClick={switchToBreak}
            className="bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl p-2.5 text-gray-500 hover:bg-white/70 hover:text-gray-700 transition-all"
            title="휴식으로 전환"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5,4 15,12 5,20" />
              <line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-600">🔥</span>
            <span className="text-gray-600">오늘 집중</span>
            <span className="text-gray-900 font-semibold">{todayMinutes}분</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <span className="text-amber-600">✅</span>
            <span className="text-gray-600">{sessionCount}회 완료</span>
          </div>
        </div>
      </div>
    </div>
  );
}
