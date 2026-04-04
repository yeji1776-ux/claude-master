# 요구사항 (v1.0 마일스톤)

## 목표
기존 앱의 품질 개선 및 사용자 경험 향상. 새 기능보다 기반 안정화에 집중.

## 기능 요구사항

### R1: 코드 품질 개선
- R1.1: 공통 UI 컴포넌트 추출 (GlassCard, PrimaryButton)
- R1.2: localStorage 키 상수화
- R1.3: 네비게이션 탭 배열 중복 제거
- R1.4: window.location.href → router.push 수정
- R1.5: 하드코딩된 100 → tips.length로 변경

### R2: 성능 개선
- R2.1: 탭 컴포넌트 코드 스플리팅 (React.lazy / dynamic import)
- R2.2: 정적 데이터 최적화

### R3: 접근성
- R3.1: 네비게이션에 ARIA 속성 추가
- R3.2: 버튼/입력에 aria-label 추가
- R3.3: prefers-reduced-motion 지원

### R4: UX 개선
- R4.1: useLocalStorage에서 isLoaded 노출 (하이드레이션 플래시 해결)
- R4.2: 메모/사전 삭제 확인 다이얼로그
- R4.3: 캘린더 실제 학습일 기반으로 수정

### R5: 데이터 안전성
- R5.1: localStorage 데이터 내보내기/가져오기 기능
- R5.2: localStorage 읽기 시 유효성 검증 강화

## 비기능 요구사항
- 기존 UI/UX 유지 (글래스모피즘 테마)
- 외부 라이브러리 추가 최소화
- 모바일 퍼스트 반응형 유지
