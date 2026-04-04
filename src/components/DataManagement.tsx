'use client';

import { useState } from 'react';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import GlassCard from '@/components/ui/GlassCard';

export default function DataManagement() {
  const [status, setStatus] = useState<string | null>(null);

  const handleExport = () => {
    try {
      const data: Record<string, unknown> = {};
      const keys = Object.values(STORAGE_KEYS);

      for (const key of keys) {
        const value = localStorage.getItem(key);
        if (value !== null) {
          try {
            data[key] = JSON.parse(value);
          } catch {
            data[key] = value;
          }
        }
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const date = new Date().toISOString().slice(0, 10);
      const a = document.createElement('a');
      a.href = url;
      a.download = `claude-master-backup-${date}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus('백업 파일이 다운로드되었습니다.');
    } catch (error) {
      console.error(error);
      setStatus('내보내기 중 오류가 발생했습니다.');
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const data = JSON.parse(text);

        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
          setStatus('올바른 백업 파일이 아닙니다.');
          return;
        }

        const validKeys = new Set<string>(Object.values(STORAGE_KEYS));
        const importKeys = Object.keys(data).filter((key) => validKeys.has(key));

        if (importKeys.length === 0) {
          setStatus('백업 파일에 유효한 데이터가 없습니다.');
          return;
        }

        if (!window.confirm('현재 데이터를 덮어쓰시겠습니까?')) {
          return;
        }

        for (const key of importKeys) {
          localStorage.setItem(key, JSON.stringify(data[key]));
        }

        setStatus('데이터를 가져왔습니다. 페이지를 새로고침합니다...');
        setTimeout(() => window.location.reload(), 1000);
      } catch {
        setStatus('파일을 읽는 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);

    // Reset input so the same file can be selected again
    e.target.value = '';
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="text-center pt-2">
        <h1 className="text-xl font-bold text-gray-900">💾 데이터 관리</h1>
        <p className="text-xs text-gray-400 mt-1">학습 데이터를 백업하고 복원하세요</p>
      </div>

      <GlassCard className="p-5 space-y-4">
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">📤 데이터 내보내기</h2>
          <p className="text-sm text-gray-500 mb-3">
            모든 학습 데이터를 JSON 파일로 저장합니다.
          </p>
          <button
            onClick={handleExport}
            className="w-full rounded-xl bg-amber-500 px-4 py-3 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
          >
            백업 파일 다운로드
          </button>
        </div>

        <hr className="border-white/60" />

        <div>
          <h2 className="font-semibold text-gray-800 mb-2">📥 데이터 가져오기</h2>
          <p className="text-sm text-gray-500 mb-3">
            백업 파일에서 데이터를 복원합니다.
          </p>
          <label className="block w-full cursor-pointer rounded-xl border-2 border-dashed border-gray-300 px-4 py-3 text-center text-sm text-gray-500 hover:border-amber-400 hover:text-amber-600 transition-colors">
            JSON 파일 선택
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </GlassCard>

      {status && (
        <GlassCard className="p-3 text-center">
          <p className="text-sm text-gray-700">{status}</p>
        </GlassCard>
      )}
    </div>
  );
}
