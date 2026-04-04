'use client';

import { useState } from 'react';
import { agSections } from '@/data/agReference';
import GlassCard from './ui/GlassCard';

const ALL_TAGS = ['전체', '필수', '핵심', '기초', '추천', '유용', '중급', '고급', '인기', '무료', '유료', '강력'];

export default function AGReferenceTab() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const filteredSections = agSections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      const matchesSearch = search === '' ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchesTag = selectedTag === '전체' || item.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
  })).filter(section => section.items.length > 0);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="text-center pt-2">
        <h1 className="text-xl font-bold text-gray-900">🛸 AG 레퍼런스</h1>
        <p className="text-xs text-gray-400 mt-1">코딩 초보를 위한 실전 치트시트</p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl bg-white/50 border border-white/60 backdrop-blur-sm px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-colors"
      />

      {/* Tag Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedTag === tag
                ? 'bg-amber-500 text-white'
                : 'bg-white/50 border border-white/60 text-gray-600 hover:bg-white/70'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
        {filteredSections.map(section => (
          <GlassCard key={section.id} className="overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/70 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{section.emoji}</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-xs text-gray-400">{section.description}</p>
                </div>
              </div>
              <span className={`text-gray-400 transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                ▾
              </span>
            </button>

            {expandedSection === section.id && (
              <div className="border-t border-gray-100 px-4 pb-4 space-y-3 animate-fadeIn">
                {section.items.map(item => (
                  <div key={item.id} className="pt-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                      <div className="flex gap-1 shrink-0">
                        {item.tags.map(tag => (
                          <span key={tag} className="rounded-full bg-amber-50/80 px-2 py-0.5 text-[10px] text-amber-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
