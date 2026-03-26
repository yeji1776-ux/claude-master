'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Memo {
  id: string;
  content: string;
  createdAt: number;
}

export default function MemoTab() {
  const [memos, setMemos] = useLocalStorage<Memo[]>('claude-master-memos', []);
  const [newMemo, setNewMemo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAdd = () => {
    if (!newMemo.trim()) return;
    const memo: Memo = {
      id: Date.now().toString(),
      content: newMemo,
      createdAt: Date.now(),
    };
    setMemos(prev => [memo, ...prev]);
    setNewMemo('');
  };

  const handleDelete = (id: string) => {
    setMemos(prev => prev.filter(m => m.id !== id));
  };

  const handleEdit = (memo: Memo) => {
    setEditingId(memo.id);
    setEditContent(memo.content);
  };

  const handleSaveEdit = () => {
    if (!editContent.trim() || !editingId) return;
    setMemos(prev => prev.map(m =>
      m.id === editingId ? { ...m, content: editContent } : m
    ));
    setEditingId(null);
    setEditContent('');
  };

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="text-center pt-2">
        <h1 className="text-xl font-bold text-gray-900">📝 메모</h1>
        <p className="text-xs text-gray-400 mt-1">학습 중 떠오른 생각을 기록하세요</p>
      </div>

      {/* New Memo Input */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5 p-4 space-y-3">
        <textarea
          placeholder="메모를 입력하세요..."
          value={newMemo}
          onChange={(e) => setNewMemo(e.target.value)}
          rows={3}
          className="w-full rounded-xl bg-white/50 border border-white/60 backdrop-blur-sm px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none resize-none transition-colors"
        />
        <button
          onClick={handleAdd}
          disabled={!newMemo.trim()}
          className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-all active:scale-[0.98] disabled:opacity-40"
        >
          메모 저장
        </button>
      </div>

      {/* Memo List */}
      {memos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-sm text-gray-400">아직 메모가 없어요</p>
        </div>
      ) : (
        <div className="space-y-2">
          {memos.map(memo => (
            <div key={memo.id} className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5 p-4 hover:bg-white/70 hover:shadow-xl hover:shadow-black/10 transition-all">
              {editingId === memo.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl bg-white/50 border border-white/60 backdrop-blur-sm px-3 py-2 text-sm text-gray-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none resize-none transition-colors"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleSaveEdit} className="flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-1.5 text-xs font-semibold text-white shadow-lg shadow-amber-500/25">저장</button>
                    <button onClick={() => setEditingId(null)} className="flex-1 rounded-xl bg-white/50 border border-white/60 py-1.5 text-xs text-gray-600">취소</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{memo.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">{formatDate(memo.createdAt)}</span>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(memo)} className="rounded-xl bg-white/50 border border-white/60 p-1.5 text-xs text-gray-400 hover:text-amber-600 transition-all">✏️</button>
                      <button onClick={() => handleDelete(memo.id)} className="rounded-xl bg-white/50 border border-white/60 p-1.5 text-xs text-gray-400 hover:text-red-500 transition-all">🗑️</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="text-center text-xs text-gray-400 pb-2">
        총 {memos.length}개 메모
      </div>
    </div>
  );
}
