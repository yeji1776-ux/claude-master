'use client';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', emoji: '\u{1F3E0}', label: '홈' },
  { id: 'learn', emoji: '\u{1F4DA}', label: '학습' },
  { id: 'reference', emoji: '\u{1F6F8}', label: '참고' },
  { id: 'tools', emoji: '\u{1F6E0}', label: '도구' },
  { id: 'my', emoji: '\u{1F464}', label: '마이' },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-t border-white/80 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex max-w-[520px] items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 text-xs transition-all ${
              activeTab === tab.id
                ? 'text-amber-600 scale-105'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className={`text-xl ${activeTab === tab.id ? 'drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]' : ''}`}>
              {tab.emoji}
            </span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
