export interface Tip {
  id: number;
  title: string;
  desc: string;
  category: Category;
  week: number;
  lesson: string;
  bad: string;
  good: string;
  practice: string;
}

export type Category = "프롬프트 기본기" | "글쓰기 & 콘텐츠" | "리서치 & 분석" | "업무 & 비즈니스" | "코딩 & 자동화" | "학습 & 정리" | "고급 테크닉";

export const CATEGORY_COLORS: Record<Category, string> = {
  "프롬프트 기본기": "#F59E0B",
  "글쓰기 & 콘텐츠": "#10B981",
  "리서치 & 분석": "#6366F1",
  "업무 & 비즈니스": "#EC4899",
  "코딩 & 자동화": "#3B82F6",
  "학습 & 정리": "#8B5CF6",
  "고급 테크닉": "#EF4444",
};

export const WEEK_TITLES: Record<number, string> = {
  1: "프롬프트 기본기 전반",
  2: "프롬프트 기본기 후반",
  3: "글쓰기 & 콘텐츠 전반",
  4: "글쓰기 후반 + 리서치",
  5: "리서치 & 분석",
  6: "업무 & 비즈니스",
  7: "코딩 & 자동화 + 학습",
  8: "고급 테크닉",
};

export interface GlossaryTerm {
  id: string;
  term: string;
  description: string;
  category: "일반" | "프롬프트" | "코딩" | "AI용어" | "비즈니스" | "AG관련";
  createdAt: number;
}

export interface AGItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface AGSection {
  id: string;
  emoji: string;
  title: string;
  description: string;
  items: AGItem[];
}
