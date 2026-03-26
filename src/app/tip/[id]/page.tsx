'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { tips } from '@/data/tips';
import { CATEGORY_COLORS } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function TipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const tipId = parseInt(id);
  const tip = tips.find(t => t.id === tipId);
  const [completedTips, setCompletedTips] = useLocalStorage<number[]>('claude-master-completed', []);
  const [bookmarks, setBookmarks] = useLocalStorage<number[]>('claude-master-bookmarks', []);
  const [quizAnswer, setQuizAnswer] = useState<'bad' | 'good' | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Randomize quiz order
  const [quizOrder, setQuizOrder] = useState<['bad', 'good'] | ['good', 'bad']>(['bad', 'good']);

  useEffect(() => {
    setQuizOrder(Math.random() > 0.5 ? ['bad', 'good'] : ['good', 'bad']);
    setQuizAnswer(null);
    setShowQuizResult(false);
  }, [tipId]);

  if (!tip) {
    return (
      <div className="mx-auto max-w-[520px] min-h-dvh px-4 flex items-center justify-center">
        <p className="text-gray-400">팁을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const isCompleted = completedTips.includes(tipId);
  const isBookmarked = bookmarks.includes(tipId);
  const prevTip = tips.find(t => t.id === tipId - 1);
  const nextTip = tips.find(t => t.id === tipId + 1);
  const color = CATEGORY_COLORS[tip.category];

  const toggleComplete = () => {
    if (isCompleted) {
      setCompletedTips(prev => prev.filter(id => id !== tipId));
    } else {
      setCompletedTips(prev => [...prev, tipId]);
    }
  };

  const toggleBookmark = () => {
    if (isBookmarked) {
      setBookmarks(prev => prev.filter(id => id !== tipId));
    } else {
      setBookmarks(prev => [...prev, tipId]);
    }
  };

  const handleQuizSelect = (answer: 'bad' | 'good') => {
    setQuizAnswer(answer);
    setShowQuizResult(true);
  };

  return (
    <div className="mx-auto max-w-[520px] min-h-dvh px-4 py-6 animate-fadeIn">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-sm text-gray-400 hover:text-amber-600 transition-colors"
      >
        ← 목록으로
      </button>

      {/* Tip Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-amber-600">
              #{tip.id}
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ backgroundColor: color + '20', color }}
            >
              {tip.category}
            </span>
          </div>
          {/* Bookmark button */}
          <button
            onClick={toggleBookmark}
            className="p-1.5 transition-all hover:scale-110"
            title={isBookmarked ? '북마크 해제' : '북마크 추가'}
          >
            {isBookmarked ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(156,163,175,1)" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            )}
          </button>
        </div>
        <h1 className="text-xl font-bold text-gray-900">{tip.title}</h1>
        <p className="text-sm text-gray-600 mt-1">{tip.desc}</p>
      </div>

      {/* Lesson */}
      <section className="mb-6 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5 p-4">
        <h2 className="text-sm font-semibold text-amber-700 mb-2">📖 쉬운 설명</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{tip.lesson}</p>
      </section>

      {/* Bad Example */}
      <section className="mb-4 bg-red-50/80 border border-red-200/60 rounded-2xl p-4">
        <h2 className="text-sm font-semibold text-red-700 mb-2">❌ 나쁜 예시</h2>
        <p className="text-sm text-gray-700 leading-relaxed font-mono bg-gray-50/80 rounded-lg p-3">
          {tip.bad}
        </p>
      </section>

      {/* Good Example */}
      <section className="mb-6 bg-emerald-50/80 border border-emerald-200/60 rounded-2xl p-4">
        <h2 className="text-sm font-semibold text-emerald-700 mb-2">✅ 좋은 예시</h2>
        <p className="text-sm text-gray-700 leading-relaxed font-mono bg-gray-50/80 rounded-lg p-3">
          {tip.good}
        </p>
      </section>

      {/* Practice */}
      <section className="mb-6 bg-amber-50/80 border border-amber-200/60 rounded-2xl p-4">
        <h2 className="text-sm font-semibold text-amber-700 mb-2">🎯 실습 과제</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{tip.practice}</p>
      </section>

      {/* Quiz */}
      <section className="mb-6 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5 p-4">
        <h2 className="text-sm font-semibold text-amber-700 mb-3">🧠 퀴즈: 어떤 프롬프트가 더 효과적일까?</h2>
        <div className="space-y-3">
          {quizOrder.map((type, index) => {
            const isSelected = quizAnswer === type;
            const isCorrect = type === 'good';
            let borderClass = 'border-white/60';
            if (showQuizResult) {
              borderClass = isCorrect ? 'border-emerald-400' : 'border-red-300';
            } else if (isSelected) {
              borderClass = 'border-amber-400';
            }

            return (
              <button
                key={type}
                onClick={() => !showQuizResult && handleQuizSelect(type)}
                disabled={showQuizResult}
                className={`w-full rounded-xl border ${borderClass} bg-white/50 p-3 text-left transition-all ${
                  !showQuizResult ? 'hover:border-amber-400 hover:bg-white/70' : ''
                }`}
              >
                <span className="text-xs text-gray-400 mb-1 block">프롬프트 {index + 1}</span>
                <p className="text-sm text-gray-700 font-mono">
                  {type === 'bad' ? tip.bad : tip.good}
                </p>
                {showQuizResult && (
                  <p className={`text-xs mt-2 font-medium ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                    {isCorrect ? '✅ 정답! 이 프롬프트가 더 효과적이에요' : '❌ 이 프롬프트는 개선이 필요해요'}
                  </p>
                )}
              </button>
            );
          })}
        </div>
        {showQuizResult && (
          <button
            onClick={() => { setQuizAnswer(null); setShowQuizResult(false); setQuizOrder(Math.random() > 0.5 ? ['bad', 'good'] : ['good', 'bad']); }}
            className="mt-3 text-xs text-amber-600 hover:underline"
          >
            다시 풀기
          </button>
        )}
      </section>

      {/* Complete Button */}
      <button
        onClick={toggleComplete}
        className={`w-full rounded-xl py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
          isCompleted
            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
        }`}
      >
        {isCompleted ? '✅ 학습 완료!' : '✅ 학습 완료 표시'}
      </button>

      {/* Navigation */}
      <div className="flex justify-between mt-6 pb-8">
        {prevTip ? (
          <button
            onClick={() => router.push(`/tip/${prevTip.id}`)}
            className="text-sm text-gray-400 hover:text-amber-600 transition-colors"
          >
            ← 이전: {prevTip.title}
          </button>
        ) : <div />}
        {nextTip ? (
          <button
            onClick={() => router.push(`/tip/${nextTip.id}`)}
            className="text-sm text-gray-400 hover:text-amber-600 transition-colors"
          >
            다음: {nextTip.title} →
          </button>
        ) : <div />}
      </div>
    </div>
  );
}
