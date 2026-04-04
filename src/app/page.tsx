'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import BottomNav from '@/components/BottomNav';
import Sidebar from '@/components/Sidebar';

const HomePage = dynamic(() => import('@/components/HomePage'));
const LearningTab = dynamic(() => import('@/components/LearningTab'));
const AGReferenceTab = dynamic(() => import('@/components/AGReferenceTab'));
const GSDReferenceTab = dynamic(() => import('@/components/GSDReferenceTab'));
const YouTubeTab = dynamic(() => import('@/components/YouTubeTab'));
const TimerWidget = dynamic(() => import('@/components/TimerWidget'));
const MemoTab = dynamic(() => import('@/components/MemoTab'));
const DictionaryTab = dynamic(() => import('@/components/DictionaryTab'));
const BookmarkTab = dynamic(() => import('@/components/BookmarkTab'));
const CalendarWidget = dynamic(() => import('@/components/CalendarWidget'));
const PortfolioTab = dynamic(() => import('@/components/PortfolioTab'));
const DataManagement = dynamic(() => import('@/components/DataManagement'));

type MainTab = 'home' | 'learn' | 'reference' | 'tools' | 'my';

const REFERENCE_SUB_TABS = [
  { id: 'ag', label: '🛸 AG 레퍼런스' },
  { id: 'gsd', label: '⚙️ GSD 가이드' },
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
  { id: 'data', label: '💾 데이터 관리' },
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
    <div className="min-h-dvh">
      {/* Desktop Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as MainTab)} />

      {/* Content Area */}
      <div className="md:ml-20 lg:ml-64 max-w-[520px] md:max-w-3xl lg:max-w-4xl mx-auto px-4 pb-24 md:pb-8">
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
            {referenceSubTab === 'gsd' && <GSDReferenceTab />}
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
            {mySubTab === 'data' && <DataManagement />}
          </div>
        )}

        {/* Mobile Bottom Nav */}
        <BottomNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as MainTab)} />
      </div>
    </div>
  );
}
