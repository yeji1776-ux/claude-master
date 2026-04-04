# Architecture

## Pattern
Single-page application (SPA) built with Next.js App Router. The main page (`/`) acts as a tab-based shell where all primary content renders client-side via conditional tab switching (no route-per-tab). A single dynamic route (`/tip/[id]`) handles individual tip detail pages. The UI follows a glassmorphism design theme with a mobile-first, responsive layout (bottom nav on mobile, sidebar on desktop).

## Data Flow
1. **Static data** -- Tips (100 items split across `tips-part1.ts` / `tips-part2.ts`), AG reference sections, GSD reference categories, and YouTube video lists are defined as constant TypeScript arrays in `src/data/`. These are imported directly by components.
2. **User state via localStorage** -- All mutable user data (completed tips, bookmarks, memos, glossary terms, study records) is persisted in `localStorage` through the `useLocalStorage` hook. There is no backend or database.
3. **Timer state via React Context** -- The Pomodoro timer (`TimerContext`) provides global timer state (mode, timeLeft, isRunning, todayMinutes) to any component that needs it. The context also syncs daily minutes to `localStorage`.
4. **Props for tab coordination** -- The root `Home` component in `page.tsx` owns the active tab state and passes `onTabChange` callbacks down to child components (e.g., `HomePage` quick-access grid navigates to other tabs via props).

## Component Hierarchy
```
RootLayout (layout.tsx)
  Providers (TimerProvider wraps entire app)
    Home (page.tsx) -- owns tab state
      Sidebar (desktop nav, hidden on mobile)
      BottomNav (mobile nav, hidden on desktop)
      HomePage (home tab)
        ProgressCircle
        CheckInBanner
      LearningTab (learn tab)
        WeekCard (x8, one per week)
        TipList (tips for selected week)
        CategoryProgress
        ProgressCircle
      [Reference sub-tabs]
        AGReferenceTab
        GSDReferenceTab
        YouTubeTab
      [Tools sub-tabs]
        TimerWidget
        MemoTab
        DictionaryTab
        BookmarkTab
      [My sub-tabs]
        CalendarWidget
        PortfolioTab

    TipPage (/tip/[id]) -- standalone detail page
```

## State Management
- **Tab navigation**: `useState` in root `Home` component for `activeTab`, `referenceSubTab`, `toolsSubTab`, `mySubTab`.
- **Persistent user data**: `useLocalStorage` custom hook (generic, supports any JSON-serializable type). Key localStorage keys:
  - `claude-master-completed` -- array of completed tip IDs
  - `claude-master-bookmarks` -- array of bookmarked tip IDs
  - `claude-master-memos` -- array of memo objects
  - `claude-master-glossary` -- array of glossary term objects
  - `claude-master-timer-today` / `claude-master-timer-date` -- daily timer tracking
- **Global timer**: `TimerContext` via React Context API, provided by `TimerProvider` at app root.
- **No server state**: The app has no API calls, no server-side data fetching, no external database.

## Routing
- **Next.js App Router** with two routes:
  - `/` -- Main SPA shell (`src/app/page.tsx`), all tabs render here via conditional rendering
  - `/tip/[id]` -- Dynamic route for tip detail pages (`src/app/tip/[id]/page.tsx`), uses `useRouter` for navigation back
- Both pages are client components (`'use client'`).
- Navigation between the main tabs is handled entirely by state (no URL changes). Only navigating to a specific tip detail page uses actual routing.
