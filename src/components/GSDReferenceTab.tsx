'use client';

import { useState } from 'react';
import { gsdCategories, GSD_WORKFLOW_STEPS } from '@/data/gsdReference';
import GlassCard from './ui/GlassCard';

const ALL_TAGS = ['전체', '필수', '핵심', '계획', '실행', '검증', '배포', '자동', '편리', '빠른실행', '관리', '고급', '세션'];

export default function GSDReferenceTab() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filteredCategories = gsdCategories.map(cat => ({
    ...cat,
    commands: cat.commands.filter(cmd => {
      const matchesSearch = search === '' ||
        cmd.command.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description.toLowerCase().includes(search.toLowerCase());
      const matchesTag = selectedTag === '전체' || cmd.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
  })).filter(cat => cat.commands.length > 0);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="text-center pt-2">
        <h1 className="text-xl font-bold text-gray-900">⚙️ GSD 명령어 가이드</h1>
        <p className="text-xs text-gray-400 mt-1">Claude Code GSD 워크플로우 치트시트</p>
      </div>

      {/* Workflow Steps */}
      <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 border border-amber-200/60 rounded-2xl p-4">
        <h3 className="text-xs font-semibold text-amber-700 mb-2">📌 기본 작업 흐름</h3>
        <div className="flex flex-wrap gap-1.5">
          {GSD_WORKFLOW_STEPS.map((step, i) => (
            <span key={step} className="inline-flex items-center gap-1">
              <span className="rounded-full bg-white/80 border border-amber-200 px-2.5 py-1 text-[11px] font-mono text-amber-800">
                {step}
              </span>
              {i < GSD_WORKFLOW_STEPS.length - 1 && (
                <span className="text-amber-400 text-xs">→</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="명령어 또는 설명 검색..."
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

      {/* Categories */}
      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
        {filteredCategories.map(cat => (
          <GlassCard key={cat.id} className="overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/70 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{cat.emoji}</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{cat.title}</h3>
                  <p className="text-xs text-gray-400">{cat.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-gray-400 bg-gray-100/80 rounded-full px-2 py-0.5">
                  {cat.commands.length}
                </span>
                <span className={`text-gray-400 transition-transform ${expandedCategory === cat.id ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </div>
            </button>

            {expandedCategory === cat.id && (
              <div className="border-t border-gray-100 px-4 pb-4 space-y-3 animate-fadeIn">
                {cat.commands.map(cmd => (
                  <div key={cmd.id} className="pt-3">
                    <div className="flex items-start justify-between gap-2">
                      <code className="text-sm font-semibold text-amber-700 bg-amber-50/60 rounded px-1.5 py-0.5">
                        {cmd.command}
                      </code>
                      <div className="flex gap-1 shrink-0">
                        {cmd.tags.map(tag => (
                          <span key={tag} className="rounded-full bg-amber-50/80 px-2 py-0.5 text-[10px] text-amber-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{cmd.description}</p>
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
