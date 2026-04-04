'use client';

interface GlassCardProps {
  className?: string;
  children: React.ReactNode;
}

export default function GlassCard({ className, children }: GlassCardProps) {
  return (
    <div className={`bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}
