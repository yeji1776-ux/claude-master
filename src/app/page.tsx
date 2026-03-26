'use client';

import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import LearningTab from '@/components/LearningTab';
import AGReferenceTab from '@/components/AGReferenceTab';
import DictionaryTab from '@/components/DictionaryTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState('learn');

  return (
    <div className="mx-auto max-w-[520px] min-h-dvh px-4 pb-24">
      {activeTab === 'learn' && <LearningTab />}
      {activeTab === 'reference' && <AGReferenceTab />}
      {activeTab === 'dictionary' && <DictionaryTab />}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
