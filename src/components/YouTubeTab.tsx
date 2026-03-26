'use client';

import { useState } from 'react';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

const VIDEOS: VideoItem[] = [
  { id: '1', title: 'AI 프롬프트 기초', description: 'AI에게 효과적으로 질문하는 방법을 배워보세요', category: '기초' },
  { id: '2', title: '클로드 활용 실전', description: '실무에서 클로드를 활용하는 다양한 팁', category: '실전' },
  { id: '3', title: '코딩 자동화 입문', description: 'AI를 활용한 코딩 자동화 시작하기', category: '코딩' },
  { id: '4', title: '프롬프트 엔지니어링', description: '고급 프롬프트 기법 마스터하기', category: '고급' },
];

const CATEGORIES = ['전체', '기초', '실전', '코딩', '고급'];

export default function YouTubeTab() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredVideos = selectedCategory === '전체'
    ? VIDEOS
    : VIDEOS.filter(v => v.category === selectedCategory);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="text-center pt-2">
        <h1 className="text-xl font-bold text-white">📺 추천 영상</h1>
        <p className="text-xs text-white/40 mt-1">학습에 도움되는 영상 모음</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video List */}
      <div className="space-y-3">
        {filteredVideos.map(video => (
          <div key={video.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-white/20 transition-all">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white">{video.title}</h3>
                <p className="text-xs text-white/40 mt-1">{video.description}</p>
                <span className="inline-block mt-2 rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-white/60">
                  {video.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📺</p>
          <p className="text-sm text-white/40">해당 카테고리에 영상이 없어요</p>
        </div>
      )}
    </div>
  );
}
