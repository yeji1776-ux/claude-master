'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { GlossaryTerm } from '@/types';

const CATEGORIES = ['전체', '일반', '프롬프트', '코딩', 'AI용어', '비즈니스', 'AG관련'] as const;
type DictCategory = typeof CATEGORIES[number];

const CATEGORY_EMOJI: Record<string, string> = {
  '일반': '📌',
  '프롬프트': '💬',
  '코딩': '💻',
  'AI용어': '🤖',
  '비즈니스': '💼',
  'AG관련': '🛸',
};

export default function DictionaryTab() {
  const [terms, setTerms] = useLocalStorage<GlossaryTerm[]>('claude-master-glossary', []);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<DictCategory>('전체');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formTerm, setFormTerm] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState<GlossaryTerm['category']>('일반');

  const filteredTerms = terms.filter(t => {
    const matchesSearch = search === '' ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === '전체' || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => b.createdAt - a.createdAt);

  const handleSubmit = () => {
    if (!formTerm.trim()) return;

    if (editingId) {
      setTerms(prev => prev.map(t =>
        t.id === editingId
          ? { ...t, term: formTerm, description: formDesc, category: formCategory }
          : t
      ));
      setEditingId(null);
    } else {
      const newTerm: GlossaryTerm = {
        id: Date.now().toString(),
        term: formTerm,
        description: formDesc,
        category: formCategory,
        createdAt: Date.now(),
      };
      setTerms(prev => [...prev, newTerm]);
    }

    setFormTerm('');
    setFormDesc('');
    setFormCategory('일반');
    setShowForm(false);
  };

  const handleEdit = (term: GlossaryTerm) => {
    setFormTerm(term.term);
    setFormDesc(term.description);
    setFormCategory(term.category);
    setEditingId(term.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setTerms(prev => prev.filter(t => t.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormTerm('');
    setFormDesc('');
    setFormCategory('일반');
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="text-center pt-2">
        <h1 className="text-xl font-bold">📒 나만의 용어 사전</h1>
        <p className="text-xs text-text-muted mt-1">직접 만드는 나만의 AI 용어 사전</p>
      </div>

      {/* Search + Add Button */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="용어 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:border-gold focus:outline-none"
        />
        <button
          onClick={() => { setShowForm(!showForm); if (editingId) handleCancel(); }}
          className="shrink-0 rounded-lg bg-gradient-to-r from-gold to-red px-4 py-2.5 text-sm font-semibold text-black transition-transform active:scale-95"
        >
          {showForm ? '취소' : '+ 추가'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="rounded-xl border border-gold/30 bg-card p-4 space-y-3 animate-fadeIn">
          <input
            type="text"
            placeholder="용어 이름"
            value={formTerm}
            onChange={(e) => setFormTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-white placeholder:text-text-muted focus:border-gold focus:outline-none"
          />
          <textarea
            placeholder="설명 / 메모"
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-white placeholder:text-text-muted focus:border-gold focus:outline-none resize-none"
          />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.filter(c => c !== '전체').map(cat => (
              <button
                key={cat}
                onClick={() => setFormCategory(cat as GlossaryTerm['category'])}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  formCategory === cat
                    ? 'bg-gold text-black'
                    : 'bg-border text-text-secondary'
                }`}
              >
                {CATEGORY_EMOJI[cat]} {cat}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-gold py-2 text-sm font-semibold text-black transition-transform active:scale-[0.98]"
          >
            {editingId ? '수정 완료' : '저장'}
          </button>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              filterCategory === cat
                ? 'bg-gold text-black'
                : 'bg-card border border-border text-text-secondary hover:border-gold/50'
            }`}
          >
            {cat === '전체' ? '🏷️' : CATEGORY_EMOJI[cat]} {cat}
          </button>
        ))}
      </div>

      {/* Terms List */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-sm text-text-muted">
            {terms.length === 0 ? '아직 등록된 용어가 없어요' : '검색 결과가 없어요'}
          </p>
          <p className="text-xs text-text-muted mt-1">
            {terms.length === 0 && '+ 추가 버튼을 눌러 첫 용어를 등록해보세요!'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTerms.map(term => (
            <div key={term.id} className="rounded-xl border border-border bg-card p-4 animate-fadeIn">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white">{term.term}</h3>
                    <span className="rounded-full bg-card-hover px-2 py-0.5 text-[10px] text-text-muted">
                      {CATEGORY_EMOJI[term.category]} {term.category}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{term.description}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => handleEdit(term)}
                    className="rounded-lg p-1.5 text-text-muted hover:bg-card-hover hover:text-gold transition-colors text-xs"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(term.id)}
                    className="rounded-lg p-1.5 text-text-muted hover:bg-red/10 hover:text-red transition-colors text-xs"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center text-xs text-text-muted pb-2">
        총 {terms.length}개 용어
      </div>
    </div>
  );
}
