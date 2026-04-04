'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { tips } from '@/data/tips';
import { agSections } from '@/data/agReference';
import { gsdCategories } from '@/data/gsdReference';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import type { GlossaryTerm } from '@/types';

interface Memo {
  id: string;
  content: string;
  createdAt: number;
}

interface SearchResult {
  id: string;
  title: string;
  preview: string;
  category: string;
  action: () => void;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, subTab?: string) => void;
}

const MAX_PER_CATEGORY = 5;
const MIN_QUERY_LENGTH = 2;

function highlightMatch(text: string, query: string): string {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + '**' + text.slice(idx, idx + query.length) + '**' + text.slice(idx + query.length);
}

function truncate(text: string, max = 80): string {
  return text.length > max ? text.slice(0, max) + '…' : text;
}

export default function GlobalSearch({ isOpen, onClose, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Auto-focus and reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setDebouncedQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const search = useCallback((q: string): Map<string, SearchResult[]> => {
    const results = new Map<string, SearchResult[]>();
    if (q.length < MIN_QUERY_LENGTH) return results;

    const lq = q.toLowerCase();
    const match = (text: string) => text.toLowerCase().includes(lq);

    // 1. Tips
    const tipResults: SearchResult[] = [];
    for (const tip of tips) {
      if (tipResults.length >= MAX_PER_CATEGORY) break;
      if (match(tip.title) || match(tip.desc) || match(tip.lesson) || match(tip.bad) || match(tip.good) || match(tip.practice)) {
        tipResults.push({
          id: `tip-${tip.id}`,
          title: `#${tip.id} ${tip.title}`,
          preview: truncate(tip.desc),
          category: '📚 팁',
          action: () => { router.push(`/tip/${tip.id}`); onClose(); },
        });
      }
    }
    if (tipResults.length > 0) results.set('📚 팁', tipResults);

    // 2. AG Reference
    const agResults: SearchResult[] = [];
    for (const section of agSections) {
      if (agResults.length >= MAX_PER_CATEGORY) break;
      for (const item of section.items) {
        if (agResults.length >= MAX_PER_CATEGORY) break;
        if (match(item.title) || match(item.description)) {
          agResults.push({
            id: `ag-${item.id}`,
            title: item.title,
            preview: truncate(item.description),
            category: '🛸 AG 레퍼런스',
            action: () => { onNavigate('reference', 'ag'); onClose(); },
          });
        }
      }
    }
    if (agResults.length > 0) results.set('🛸 AG 레퍼런스', agResults);

    // 3. GSD Commands
    const gsdResults: SearchResult[] = [];
    for (const cat of gsdCategories) {
      if (gsdResults.length >= MAX_PER_CATEGORY) break;
      for (const cmd of cat.commands) {
        if (gsdResults.length >= MAX_PER_CATEGORY) break;
        if (match(cmd.command) || match(cmd.description)) {
          gsdResults.push({
            id: `gsd-${cmd.id}`,
            title: cmd.command,
            preview: truncate(cmd.description),
            category: '⚙️ GSD 명령어',
            action: () => { onNavigate('reference', 'gsd'); onClose(); },
          });
        }
      }
    }
    if (gsdResults.length > 0) results.set('⚙️ GSD 명령어', gsdResults);

    // 4. Dictionary (localStorage)
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.GLOSSARY);
      if (raw) {
        const terms: GlossaryTerm[] = JSON.parse(raw);
        const dictResults: SearchResult[] = [];
        for (const t of terms) {
          if (dictResults.length >= MAX_PER_CATEGORY) break;
          if (match(t.term) || match(t.description)) {
            dictResults.push({
              id: `dict-${t.id}`,
              title: t.term,
              preview: truncate(t.description),
              category: '📒 사전',
              action: () => { onNavigate('tools', 'dictionary'); onClose(); },
            });
          }
        }
        if (dictResults.length > 0) results.set('📒 사전', dictResults);
      }
    } catch { /* ignore */ }

    // 5. Memos (localStorage)
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.MEMOS);
      if (raw) {
        const memos: Memo[] = JSON.parse(raw);
        const memoResults: SearchResult[] = [];
        for (const m of memos) {
          if (memoResults.length >= MAX_PER_CATEGORY) break;
          if (match(m.content)) {
            memoResults.push({
              id: `memo-${m.id}`,
              title: truncate(m.content, 40),
              preview: truncate(m.content),
              category: '📝 메모',
              action: () => { onNavigate('tools', 'memo'); onClose(); },
            });
          }
        }
        if (memoResults.length > 0) results.set('📝 메모', memoResults);
      }
    } catch { /* ignore */ }

    return results;
  }, [router, onClose, onNavigate]);

  if (!isOpen) return null;

  const results = search(debouncedQuery);
  const hasResults = results.size > 0;
  const showNoResults = debouncedQuery.length >= MIN_QUERY_LENGTH && !hasResults;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] animate-fadeIn"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg mx-4 bg-white/80 backdrop-blur-xl border border-white/80 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200/60">
          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요…"
            className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm"
          />
          <kbd className="hidden sm:inline text-[10px] text-gray-400 border border-gray-300/60 rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {debouncedQuery.length < MIN_QUERY_LENGTH && (
            <p className="text-center text-sm text-gray-400 py-8">검색어를 입력하세요</p>
          )}

          {showNoResults && (
            <p className="text-center text-sm text-gray-400 py-8">검색 결과가 없습니다</p>
          )}

          {hasResults && Array.from(results.entries()).map(([category, items]) => (
            <div key={category} className="mb-3">
              <h3 className="text-xs font-semibold text-gray-500 px-2 py-1.5">{category}</h3>
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-amber-50/80 transition-colors group"
                >
                  <div className="text-sm font-medium text-gray-800 group-hover:text-amber-700 truncate">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 truncate">
                    {item.preview}
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
