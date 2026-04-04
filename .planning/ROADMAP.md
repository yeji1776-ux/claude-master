# 로드맵 (v1.0 마일스톤)

## Phase 1: 공통 컴포넌트 추출
**목표**: CSS 중복 제거, 재사용 가능한 UI 프리미티브 생성
- GlassCard 컴포넌트 추출 (20+ 중복 제거)
- PrimaryButton 컴포넌트 추출
- 네비게이션 탭 배열 공유 상수화
**요구사항**: R1.1, R1.3

## Phase 2: 코드 안정화
**목표**: 버그 수정, 상수화, 코드 정리
- localStorage 키 상수 파일 생성
- window.location.href → router.push 수정
- 하드코딩 100 → tips.length 변경
- TimerContext를 useLocalStorage 훅 사용하도록 통일
**요구사항**: R1.2, R1.4, R1.5

## Phase 3: UX 개선
**목표**: 사용자 경험 문제 해결
- useLocalStorage에 isLoaded 노출 + 로딩 상태 UI
- 메모/사전 삭제 확인 다이얼로그
- 캘린더 실제 학습일 기반으로 수정
**요구사항**: R4.1, R4.2, R4.3

## Phase 4: 접근성
**목표**: 기본 접근성 확보
- nav, aside에 aria-label 추가
- 아이콘 버튼에 aria-label 추가
- prefers-reduced-motion 미디어 쿼리
- 탭 패널 키보드 네비게이션
**요구사항**: R3.1, R3.2, R3.3

## Phase 5: 성능 최적화
**목표**: 초기 로드 시간 개선
- 탭 컴포넌트 dynamic import
- 정적 데이터 최적화
**요구사항**: R2.1, R2.2

## Phase 6: 데이터 안전성
**목표**: 사용자 데이터 보호
- 데이터 내보내기/가져오기 기능 (설정 탭)
- localStorage 읽기 유효성 검증 강화
**요구사항**: R5.1, R5.2

---
**총 6개 Phase** | 예상 순서: 1 → 2 → 3 → 4 → 5 → 6
