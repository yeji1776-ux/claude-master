# Project Structure

## Directory Layout
```
src/
├── app/                 # Next.js App Router pages and global styles
│   ├── layout.tsx       # Root layout (html/body, Providers wrapper)
│   ├── page.tsx         # Main SPA shell with tab navigation
│   ├── globals.css      # Global CSS (Tailwind + custom styles)
│   ├── favicon.ico      # App favicon
│   └── tip/[id]/
│       └── page.tsx     # Dynamic tip detail page
├── components/          # All React UI components (all 'use client')
├── contexts/            # React Context providers
│   └── TimerContext.tsx  # Pomodoro timer state + provider
├── data/                # Static data constants (no fetching)
│   ├── tips.ts          # Re-exports combined tips array
│   ├── tips-part1.ts    # Tips 1-50
│   ├── tips-part2.ts    # Tips 51-100
│   ├── agReference.ts   # Antigravity reference sections
│   └── gsdReference.ts  # GSD command reference categories
├── hooks/               # Custom React hooks
│   └── useLocalStorage.ts  # Generic localStorage hook with SSR safety
└── types/               # TypeScript type definitions
    └── index.ts         # Tip, Category, GlossaryTerm, AGItem, AGSection types + constants
```

## Key Files
| File | Role |
|------|------|
| `src/app/page.tsx` | App entry point; owns all tab state and renders the active tab |
| `src/app/layout.tsx` | Root layout; wraps app in `Providers` (TimerContext) |
| `src/app/tip/[id]/page.tsx` | Tip detail page with quiz, completion toggle, bookmark |
| `src/types/index.ts` | Central type definitions + category color map + week titles |
| `src/hooks/useLocalStorage.ts` | Reusable localStorage hook used by most components |
| `src/contexts/TimerContext.tsx` | Global Pomodoro timer (25min focus / 5min break) |
| `src/data/tips.ts` | Aggregates 100 tips from two part files |
| `src/components/Providers.tsx` | Wraps children in TimerProvider |

## Component Map
| Component | Description |
|-----------|-------------|
| `HomePage` | Home tab dashboard with progress circle, check-in banner, quick-access grid, timer status, recent bookmarks |
| `LearningTab` | Learning tab with 8 week cards, expandable tip lists, category progress bars |
| `AGReferenceTab` | Antigravity reference browser with tag filtering and search |
| `GSDReferenceTab` | GSD workflow command reference with tag filtering and search |
| `YouTubeTab` | Recommended video list with category filter |
| `TimerWidget` | Pomodoro timer UI with circular progress, start/pause/reset controls |
| `MemoTab` | CRUD memo pad persisted to localStorage |
| `DictionaryTab` | User-created glossary/dictionary with category tagging |
| `BookmarkTab` | Displays bookmarked tips with completion status |
| `CalendarWidget` | Monthly calendar view showing study activity |
| `PortfolioTab` | Learning portfolio with per-category completion stats |
| `ProgressCircle` | SVG circular progress indicator (reused in HomePage and LearningTab) |
| `CheckInBanner` | Daily check-in streak banner with motivational messages |
| `WeekCard` | Week selector card showing week number, title, and completion progress |
| `TipList` | Renders a list of tips with completion checkmarks, used inside LearningTab |
| `CategoryProgress` | Horizontal progress bars per category |
| `BottomNav` | Mobile bottom navigation bar (5 main tabs) |
| `Sidebar` | Desktop left sidebar navigation (5 main tabs), responsive widths |
| `Providers` | Context provider wrapper (currently only TimerProvider) |
