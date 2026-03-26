'use client';

interface ProgressCircleProps {
  completed: number;
  total: number;
}

export default function ProgressCircle({ completed, total }: ProgressCircleProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <filter id="progressGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Background circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 90 90)"
            className="transition-all duration-700 ease-out"
            filter="url(#progressGlow)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{completed}</span>
          <span className="text-sm text-white/70">/ {total} 완료</span>
        </div>
      </div>
      <p className="text-sm text-white/70">
        전체 진행률 <span className="font-semibold text-amber-400">{Math.round(percentage)}%</span>
      </p>
    </div>
  );
}
