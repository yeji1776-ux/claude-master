'use client';

import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import HomePage from '@/components/HomePage';
import LearningTab from '@/components/LearningTab';
import AGReferenceTab from '@/components/AGReferenceTab';
import YouTubeTab from '@/components/YouTubeTab';
import TimerWidget from '@/components/TimerWidget';
import MemoTab from '@/components/MemoTab';
import DictionaryTab from '@/components/DictionaryTab';
import BookmarkTab from '@/components/BookmarkTab';
import CalendarWidget from '@/components/CalendarWidget';
import PortfolioTab from '@/components/PortfolioTab';

type MainTab = 'home' | 'learn' | 'reference' | 'tools' | 'my';

const REFERENCE_SUB_TABS = [
  { id: 'ag', label: '🛸 AG 레퍼런스' },
  { id: 'youtube', label: '📺 추천 영상' },
];

const TOOLS_SUB_TABS = [
  { id: 'timer', label: '⏱️ 타이머' },
  { id: 'memo', label: '📝 메모' },
  { id: 'dictionary', label: '📒 사전' },
  { id: 'bookmark', label: '⭐ 북마크' },
];

const MY_SUB_TABS = [
  { id: 'calendar', label: '📅 캘린더' },
  { id: 'portfolio', label: '🎯 포트폴리오' },
];

function SubTabSelector({ tabs, activeTab, onTabChange }: {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-3 pt-2 scrollbar-hide">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
            activeTab === tab.id
              ? 'bg-amber-500 text-white'
              : 'bg-white/50 border border-white/60 text-gray-600 hover:bg-white/70'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [referenceSubTab, setReferenceSubTab] = useState('ag');
  const [toolsSubTab, setToolsSubTab] = useState('timer');
  const [mySubTab, setMySubTab] = useState('calendar');

  return (
    <div className="mx-auto max-w-[520px] min-h-dvh px-4 pb-24">
      {/* Home Tab */}
      {activeTab === 'home' && (
        <HomePage onTabChange={(tab, subTab) => {
          setActiveTab(tab as MainTab);
          if (tab === 'tools' && subTab) setToolsSubTab(subTab);
          if (tab === 'my' && subTab) setMySubTab(subTab);
          if (tab === 'reference' && subTab) setReferenceSubTab(subTab);
        }} />
      )}

      {/* Learn Tab */}
      {activeTab === 'learn' && <LearningTab />}

      {/* Reference Tab with sub-tabs */}
      {activeTab === 'reference' && (
        <div className="animate-fadeIn">
          <SubTabSelector tabs={REFERENCE_SUB_TABS} activeTab={referenceSubTab} onTabChange={setReferenceSubTab} />
          {referenceSubTab === 'ag' && <AGReferenceTab />}
          {referenceSubTab === 'youtube' && <YouTubeTab />}
        </div>
      )}

      {/* Tools Tab with sub-tabs */}
      {activeTab === 'tools' && (
        <div className="animate-fadeIn">
          <SubTabSelector tabs={TOOLS_SUB_TABS} activeTab={toolsSubTab} onTabChange={setToolsSubTab} />
          {toolsSubTab === 'timer' && (
            <div className="space-y-4">
              <div className="text-center pt-2">
                <h1 className="text-xl font-bold text-gray-900">⏱️ 집중 타이머</h1>
                <p className="text-xs text-gray-400 mt-1">포모도로 기법으로 집중하세요</p>
              </div>
              <TimerWidget />
            </div>
          )}
          {toolsSubTab === 'memo' && <MemoTab />}
          {toolsSubTab === 'dictionary' && <DictionaryTab />}
          {toolsSubTab === 'bookmark' && <BookmarkTab />}
        </div>
      )}

      {/* My Tab with sub-tabs */}
      {activeTab === 'my' && (
        <div className="animate-fadeIn">
          <SubTabSelector tabs={MY_SUB_TABS} activeTab={mySubTab} onTabChange={setMySubTab} />
          {mySubTab === 'calendar' && <CalendarWidget />}
          {mySubTab === 'portfolio' && <PortfolioTab />}
        </div>
      )}

      <BottomNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as MainTab)} />
    </div>
  );
}
