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
        <h1 className="text-xl font-bold">🛸 AG 레퍼런스</h1>
        <p className="text-xs text-text-muted mt-1">코딩 초보를 위한 실전 치트시트</p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:border-gold focus:outline-none"
      />

      {/* Tag Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedTag === tag
                ? 'bg-gold text-black'
                : 'bg-card border border-border text-text-secondary hover:border-gold/50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Sections */}
      {filteredSections.map(section => (
        <div key={section.id} className="rounded-xl border border-border bg-card overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-card-hover transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{section.emoji}</span>
              <div>
                <h3 className="text-sm font-semibold text-white">{section.title}</h3>
                <p className="text-xs text-text-muted">{section.description}</p>
              </div>
            </div>
            <span className={`text-text-muted transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`}>
              ▾
            </span>
          </button>

          {expandedSection === section.id && (
            <div className="border-t border-border px-4 pb-4 space-y-3 animate-fadeIn">
              {section.items.map(item => (
                <div key={item.id} className="pt-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium text-white">{item.title}</h4>
                    <div className="flex gap-1 shrink-0">
                      {item.tags.map(tag => (
                        <span key={tag} className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] text-gold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
