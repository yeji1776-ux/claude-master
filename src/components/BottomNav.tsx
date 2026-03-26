'use client';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'learn', emoji: '🏠', label: '학습' },
  { id: 'reference', emoji: '🛸', label: 'AG 레퍼런스' },
  { id: 'dictionary', emoji: '📒', label: '용어 사전' },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[520px] items-center justify-around py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 text-xs transition-all ${
              activeTab === tab.id
                ? 'text-gold scale-105'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <span className="text-xl">{tab.emoji}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
