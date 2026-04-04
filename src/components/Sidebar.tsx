'use client';

import { NAV_TABS } from '@/constants/navTabs';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 lg:w-64 flex-col items-center lg:items-stretch bg-white/60 backdrop-blur-2xl border-r border-white/80 shadow-[4px_0_20px_rgba(0,0,0,0.05)] z-50 py-8 px-2 lg:px-4">
      {/* Logo */}
      <div className="mb-8 text-center lg:text-left lg:px-3">
        <h1 className="hidden lg:block text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          클로드 마스터
        </h1>
        <span className="lg:hidden text-2xl">🎯</span>
        <p className="hidden lg:block text-xs text-gray-400 mt-0.5">AI 활용 100가지 팁</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-2 w-full">
        {NAV_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                : 'text-gray-600 hover:bg-white/70 hover:text-gray-900'
            }`}
          >
            <span className="text-lg shrink-0">{tab.emoji}</span>
            <span className="hidden lg:block">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="hidden lg:block text-center">
        <p className="text-xs text-gray-400">GGANGLAB</p>
        <p className="text-[10px] text-gray-300 mt-0.5">8주 완성 커리큘럼</p>
      </div>
    </aside>
  );
}
