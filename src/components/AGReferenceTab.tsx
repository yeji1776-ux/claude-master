'use client';

import { useState } from 'react';
import { agSections } from '@/data/agReference';

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
        <h1 className="text-xl font-bold text-white">🛸 AG 레퍼런스</h1>
        <p className="text-xs text-white/40 mt-1">코딩 초보를 위한 실전 치트시트</p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-amber-400/50 focus:outline-none transition-colors"
      />

      {/* Tag Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedTag === tag
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Sections */}
      {filteredSections.map(section => (
        <div key={section.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{section.emoji}</span>
              <div>
                <h3 className="text-sm font-semibold text-white">{section.title}</h3>
                <p className="text-xs text-white/40">{section.description}</p>
              </div>
            </div>
            <span className={`text-white/40 transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`}>
              ▾
            </span>
          </button>

          {expandedSection === section.id && (
            <div className="border-t border-white/10 px-4 pb-4 space-y-3 animate-fadeIn">
              {section.items.map(item => (
                <div key={item.id} className="pt-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium text-white">{item.title}</h4>
                    <div className="flex gap-1 shrink-0">
                      {item.tags.map(tag => (
                        <span key={tag} className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
