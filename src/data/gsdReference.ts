export interface GSDCommand {
  id: string;
  command: string;
  description: string;
  tags: string[];
}

export interface GSDCategory {
  id: string;
  emoji: string;
  title: string;
  description: string;
  commands: GSDCommand[];
}

export const gsdCategories: GSDCategory[] = [
  {
    id: "gsd-start",
    emoji: "🚀",
    title: "프로젝트 시작",
    description: "새 프로젝트를 초기화하고 코드베이스를 분석합니다.",
    commands: [
      {
        id: "gsd-start-1",
        command: "/gsd:map-codebase",
        description: "기존 코드베이스를 분석해서 구조 문서 7개를 자동 생성합니다. 프로젝트에 처음 GSD를 도입할 때 가장 먼저 실행하세요.",
        tags: ["필수", "시작"],
      },
      {
        id: "gsd-start-2",
        command: "/gsd:new-project",
        description: "새 프로젝트를 초기화합니다. PROJECT.md를 생성하고 마일스톤과 로드맵을 설정합니다.",
        tags: ["필수", "시작"],
      },
      {
        id: "gsd-start-3",
        command: "/gsd:new-milestone",
        description: "새 마일스톤(버전)을 시작합니다. 목표를 설정하고 단계별 작업을 자동으로 생성해줍니다.",
        tags: ["필수", "시작"],
      },
    ],
  },
  {
    id: "gsd-phase",
    emoji: "📋",
    title: "단계(Phase) 관리",
    description: "작업 단계를 계획하고, 추가하고, 실행합니다.",
    commands: [
      {
        id: "gsd-phase-1",
        command: "/gsd:discuss-phase",
        description: "특정 단계 작업 전에 대화형으로 질문하며 요구사항을 정리합니다. --auto 옵션으로 자동 진행, --chain으로 토론→계획→실행 연결도 가능합니다.",
        tags: ["핵심", "계획"],
      },
      {
        id: "gsd-phase-2",
        command: "/gsd:plan-phase",
        description: "단계별 상세 실행 계획(PLAN.md)을 작성합니다. 어떤 파일을 어떻게 수정할지 구체적으로 계획합니다.",
        tags: ["핵심", "계획"],
      },
      {
        id: "gsd-phase-3",
        command: "/gsd:execute-phase",
        description: "계획된 단계를 실제로 실행합니다. PLAN.md를 기반으로 코드를 작성하고, 파일을 생성/수정합니다.",
        tags: ["핵심", "실행"],
      },
      {
        id: "gsd-phase-4",
        command: "/gsd:add-phase",
        description: "로드맵 끝에 새 단계를 추가합니다.",
        tags: ["관리"],
      },
      {
        id: "gsd-phase-5",
        command: "/gsd:insert-phase",
        description: "기존 단계 사이에 긴급 작업을 삽입합니다. 소수점 번호(예: 72.1)로 중간에 끼워넣기 가능합니다.",
        tags: ["관리"],
      },
      {
        id: "gsd-phase-6",
        command: "/gsd:remove-phase",
        description: "특정 단계를 삭제하고 뒤에 있는 번호를 재정렬합니다.",
        tags: ["관리"],
      },
      {
        id: "gsd-phase-7",
        command: "/gsd:ui-phase",
        description: "프론트엔드 단계의 UI 디자인 명세(UI-SPEC.md)를 생성합니다. 화면 설계가 필요한 단계에 사용합니다.",
        tags: ["프론트엔드", "계획"],
      },
      {
        id: "gsd-phase-8",
        command: "/gsd:research-phase",
        description: "단계 구현 방법을 사전에 조사합니다. 어떤 라이브러리를 쓸지, 어떤 방식으로 구현할지 리서치합니다.",
        tags: ["계획"],
      },
    ],
  },
  {
    id: "gsd-execute",
    emoji: "⚡",
    title: "진행 & 실행",
    description: "작업을 진행하고, 자동으로 다음 단계를 이어갑니다.",
    commands: [
      {
        id: "gsd-exec-1",
        command: "/gsd:progress",
        description: "현재 프로젝트 진행 상황을 확인하고 다음 할 일을 안내받습니다. '지금 어디까지 왔지?' 싶을 때 사용하세요.",
        tags: ["핵심", "상태"],
      },
      {
        id: "gsd-exec-2",
        command: "/gsd:next",
        description: "다음 논리적 단계로 자동 이동합니다. 뭘 해야 할지 모르겠을 때 이것만 치면 됩니다.",
        tags: ["핵심", "자동"],
      },
      {
        id: "gsd-exec-3",
        command: "/gsd:autonomous",
        description: "남은 모든 단계를 자동으로 연속 실행합니다 (토론→계획→실행 반복). 손 놓고 기다리면 됩니다!",
        tags: ["자동", "강력"],
      },
      {
        id: "gsd-exec-4",
        command: "/gsd:do",
        description: "자유 텍스트를 입력하면 적절한 GSD 명령어로 자동 연결해줍니다. 명령어를 외울 필요 없이 하고 싶은 말을 치면 됩니다.",
        tags: ["핵심", "편리"],
      },
      {
        id: "gsd-exec-5",
        command: "/gsd:quick",
        description: "간단한 작업을 빠르게 실행합니다. 계획 단계를 건너뛰고 바로 코드를 작성합니다.",
        tags: ["빠른실행"],
      },
      {
        id: "gsd-exec-6",
        command: "/gsd:fast",
        description: "아주 간단한 작업을 즉시 실행합니다. 서브에이전트 없이 인라인으로 바로 처리합니다.",
        tags: ["빠른실행"],
      },
    ],
  },
  {
    id: "gsd-verify",
    emoji: "✅",
    title: "검증 & 리뷰",
    description: "완성된 기능을 테스트하고 품질을 검증합니다.",
    commands: [
      {
        id: "gsd-verify-1",
        command: "/gsd:verify-work",
        description: "완성된 기능을 대화형 UAT(사용자 수락 테스트)로 검증합니다. 실제로 동작하는지 하나씩 확인합니다.",
        tags: ["핵심", "검증"],
      },
      {
        id: "gsd-verify-2",
        command: "/gsd:add-tests",
        description: "완료된 단계에 대한 테스트 코드를 자동 생성합니다.",
        tags: ["테스트"],
      },
      {
        id: "gsd-verify-3",
        command: "/gsd:review",
        description: "다른 AI CLI로부터 교차 리뷰를 요청합니다. 다양한 관점에서 코드를 검토받을 수 있습니다.",
        tags: ["리뷰"],
      },
      {
        id: "gsd-verify-4",
        command: "/gsd:ui-review",
        description: "구현된 프론트엔드 코드의 시각적 품질을 6개 기준으로 감사합니다.",
        tags: ["프론트엔드", "리뷰"],
      },
      {
        id: "gsd-verify-5",
        command: "/gsd:validate-phase",
        description: "완료된 단계의 검증 누락 항목을 점검합니다. 빠뜨린 게 없는지 확인합니다.",
        tags: ["검증"],
      },
      {
        id: "gsd-verify-6",
        command: "/gsd:secure-phase",
        description: "완료된 단계의 보안 위협을 점검합니다. 취약점이 없는지 확인합니다.",
        tags: ["보안"],
      },
      {
        id: "gsd-verify-7",
        command: "/gsd:audit-uat",
        description: "전체 단계의 미완료 UAT 항목을 일괄 감사합니다.",
        tags: ["검증"],
      },
    ],
  },
  {
    id: "gsd-milestone",
    emoji: "🏁",
    title: "마일스톤 관리",
    description: "마일스톤 완료, 감사, 요약을 관리합니다.",
    commands: [
      {
        id: "gsd-ms-1",
        command: "/gsd:complete-milestone",
        description: "마일스톤을 완료 처리하고 아카이브합니다. 모든 단계가 끝났을 때 사용합니다.",
        tags: ["관리"],
      },
      {
        id: "gsd-ms-2",
        command: "/gsd:audit-milestone",
        description: "마일스톤 완료 전에 원래 목표 대비 달성도를 감사합니다. 빠진 부분이 없는지 점검합니다.",
        tags: ["검증"],
      },
      {
        id: "gsd-ms-3",
        command: "/gsd:plan-milestone-gaps",
        description: "감사에서 발견된 미흡 항목에 대한 추가 단계를 자동 생성합니다.",
        tags: ["관리"],
      },
      {
        id: "gsd-ms-4",
        command: "/gsd:milestone-summary",
        description: "마일스톤 종합 요약을 생성합니다. 팀 온보딩이나 리뷰에 사용할 수 있습니다.",
        tags: ["문서"],
      },
      {
        id: "gsd-ms-5",
        command: "/gsd:review-backlog",
        description: "백로그 항목을 현재 마일스톤으로 승격할지 검토합니다.",
        tags: ["관리"],
      },
    ],
  },
  {
    id: "gsd-deploy",
    emoji: "🚢",
    title: "배포 & PR",
    description: "PR을 만들고 배포를 준비합니다.",
    commands: [
      {
        id: "gsd-deploy-1",
        command: "/gsd:ship",
        description: "PR 생성 + 리뷰 + 머지 준비를 한 번에 처리합니다. 배포 준비가 되었을 때 사용하세요.",
        tags: ["핵심", "배포"],
      },
      {
        id: "gsd-deploy-2",
        command: "/gsd:pr-branch",
        description: ".planning/ 커밋을 제외한 깨끗한 PR 브랜치를 생성합니다. 코드 리뷰에 불필요한 파일이 섞이지 않습니다.",
        tags: ["배포"],
      },
    ],
  },
  {
    id: "gsd-session",
    emoji: "💾",
    title: "세션 & 컨텍스트",
    description: "작업 세션을 관리하고 이전 작업을 이어갑니다.",
    commands: [
      {
        id: "gsd-session-1",
        command: "/gsd:resume-work",
        description: "이전 세션을 이어서 작업합니다. 컨텍스트를 자동으로 복원해서 어디까지 했는지 바로 알 수 있습니다.",
        tags: ["핵심", "세션"],
      },
      {
        id: "gsd-session-2",
        command: "/gsd:pause-work",
        description: "작업 중단 시 핸드오프 문서를 생성합니다. 나중에 resume-work로 이어갈 수 있습니다.",
        tags: ["세션"],
      },
      {
        id: "gsd-session-3",
        command: "/gsd:thread",
        description: "세션 간 지속되는 컨텍스트 스레드를 관리합니다. 여러 세션에 걸쳐 정보를 유지합니다.",
        tags: ["세션"],
      },
      {
        id: "gsd-session-4",
        command: "/gsd:session-report",
        description: "세션 리포트를 생성합니다. 토큰 사용량, 작업 요약 등을 확인할 수 있습니다.",
        tags: ["세션"],
      },
    ],
  },
  {
    id: "gsd-workspace",
    emoji: "🔀",
    title: "워크스페이스 & 병렬 작업",
    description: "독립된 작업 공간을 만들고 병렬로 작업합니다.",
    commands: [
      {
        id: "gsd-ws-1",
        command: "/gsd:workstreams",
        description: "병렬 작업 흐름을 관리합니다. 생성, 전환, 상태 확인이 가능합니다.",
        tags: ["고급"],
      },
      {
        id: "gsd-ws-2",
        command: "/gsd:new-workspace",
        description: "독립된 작업 공간을 생성합니다. 별도의 repo 복사본에서 안전하게 작업할 수 있습니다.",
        tags: ["고급"],
      },
      {
        id: "gsd-ws-3",
        command: "/gsd:list-workspaces",
        description: "활성 워크스페이스 목록을 조회합니다.",
        tags: ["관리"],
      },
      {
        id: "gsd-ws-4",
        command: "/gsd:remove-workspace",
        description: "워크스페이스를 삭제하고 정리합니다.",
        tags: ["관리"],
      },
      {
        id: "gsd-ws-5",
        command: "/gsd:manager",
        description: "여러 단계를 하나의 터미널에서 관리하는 명령 센터입니다.",
        tags: ["고급"],
      },
    ],
  },
  {
    id: "gsd-notes",
    emoji: "💡",
    title: "메모 & 아이디어",
    description: "할 일, 메모, 백로그를 관리합니다.",
    commands: [
      {
        id: "gsd-notes-1",
        command: "/gsd:add-todo",
        description: "현재 대화에서 할 일 항목을 캡처합니다.",
        tags: ["편리"],
      },
      {
        id: "gsd-notes-2",
        command: "/gsd:check-todos",
        description: "대기 중인 할 일 목록을 확인하고 선택합니다.",
        tags: ["편리"],
      },
      {
        id: "gsd-notes-3",
        command: "/gsd:note",
        description: "빠른 아이디어 메모입니다. 추가, 목록 보기, 할일로 승격이 가능합니다.",
        tags: ["편리"],
      },
      {
        id: "gsd-notes-4",
        command: "/gsd:add-backlog",
        description: "백로그에 아이디어를 추가합니다. 999.x 번호로 관리됩니다.",
        tags: ["관리"],
      },
      {
        id: "gsd-notes-5",
        command: "/gsd:plant-seed",
        description: "미래 마일스톤에 자동으로 표면화될 아이디어를 심어둡니다. 트리거 조건을 설정할 수 있습니다.",
        tags: ["고급"],
      },
    ],
  },
  {
    id: "gsd-util",
    emoji: "🔧",
    title: "유틸리티",
    description: "디버깅, 통계, 설정 등 유틸리티 도구들입니다.",
    commands: [
      {
        id: "gsd-util-1",
        command: "/gsd:stats",
        description: "프로젝트 통계를 보여줍니다. 단계 수, 커밋 수, 타임라인 등을 확인할 수 있습니다.",
        tags: ["상태"],
      },
      {
        id: "gsd-util-2",
        command: "/gsd:debug",
        description: "체계적 디버깅을 지원합니다. 컨텍스트 리셋 간에도 디버깅 상태가 유지됩니다.",
        tags: ["디버깅"],
      },
      {
        id: "gsd-util-3",
        command: "/gsd:health",
        description: ".planning 디렉토리 상태를 진단하고 필요하면 복구합니다.",
        tags: ["관리"],
      },
      {
        id: "gsd-util-4",
        command: "/gsd:cleanup",
        description: "완료된 마일스톤의 단계 디렉토리를 아카이브합니다.",
        tags: ["관리"],
      },
      {
        id: "gsd-util-5",
        command: "/gsd:settings",
        description: "GSD 워크플로우 설정을 변경합니다.",
        tags: ["설정"],
      },
      {
        id: "gsd-util-6",
        command: "/gsd:set-profile",
        description: "에이전트 모델 프로필을 전환합니다. quality(고품질), balanced(균형), budget(저비용) 중 선택합니다.",
        tags: ["설정"],
      },
      {
        id: "gsd-util-7",
        command: "/gsd:docs-update",
        description: "프로젝트 문서를 코드베이스 기반으로 생성하거나 업데이트합니다.",
        tags: ["문서"],
      },
      {
        id: "gsd-util-8",
        command: "/gsd:update",
        description: "GSD를 최신 버전으로 업데이트합니다.",
        tags: ["관리"],
      },
    ],
  },
];

export const GSD_WORKFLOW_STEPS = [
  "map-codebase",
  "new-project",
  "new-milestone",
  "discuss-phase",
  "plan-phase",
  "execute-phase",
  "verify-work",
  "ship",
] as const;
