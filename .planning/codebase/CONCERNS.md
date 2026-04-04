# Concerns & Opportunities

## Technical Debt

### HIGH
- **Massive CSS class duplication**: The glassmorphism pattern `bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5` is copy-pasted 20+ times across 12 files. The gradient button pattern `bg-gradient-to-r from-amber-500 to-orange-500` appears 8 times. These should be extracted into reusable Tailwind `@apply` classes or shared component primitives (e.g., `<GlassCard>`, `<PrimaryButton>`).
- **Duplicated navigation tab definitions**: `Sidebar.tsx` and `BottomNav.tsx` both define identical `tabs` arrays independently. A single shared constant would prevent drift.
- **localStorage key strings scattered everywhere**: 7 distinct localStorage keys (`claude-master-completed`, `claude-master-bookmarks`, `claude-master-memos`, `claude-master-glossary`, `claude-master-study-records`, `claude-master-timer-date`, `claude-master-timer-today`) are hardcoded as string literals across 10+ files. Should be centralized into a constants file.
- **Inconsistent localStorage access**: `TimerContext.tsx` accesses `localStorage` directly, while all other components use the `useLocalStorage` hook. This means timer state has no SSR hydration safety.

### MEDIUM
- **`useLocalStorage` hook hydration flash**: The hook initializes with `initialValue`, then overwrites with localStorage on mount. This causes a brief flash of default state on every page load (e.g., progress shows 0% then jumps). The `isLoaded` flag is tracked but never exposed to consumers.
- **Entire app is a single client component**: `page.tsx` is `'use client'` and eagerly imports every tab component. No code splitting -- the dictionary, timer, calendar, reference data, etc. all load on first paint even if the user only views the home tab.
- **No delete confirmation**: `MemoTab` and `DictionaryTab` delete items immediately on click with no confirmation dialog. Easy accidental data loss.
- **`Date.now().toString()` used as IDs**: Both `MemoTab` and `DictionaryTab` generate IDs with `Date.now().toString()`. Two rapid operations in the same millisecond would produce colliding IDs.
- **Calendar `activeDays` logic is fake**: `CalendarWidget` backfills `activeDays` by counting completed tips backward from today (`today - i`), which has nothing to do with actual study dates. It gives a misleading picture of study history.
- **YouTubeTab has hardcoded placeholder data**: 4 dummy video entries with no links, no thumbnails, and no actual YouTube embeds or URLs. Appears to be stub content.

### LOW
- **Inline SVG icons**: Multiple components hand-code SVG paths for bookmark stars, play/pause buttons, reset arrows, etc. An icon library or shared icon components would reduce noise.
- **`window.location.href` navigation**: `HomePage.tsx` line 125 uses `window.location.href` for bookmark navigation instead of Next.js `router.push()`, causing a full page reload.
- **Magic number 100**: The total tip count (100) is hardcoded in percentage calculations across `HomePage`, `PortfolioTab`, etc. Should derive from `tips.length`.

## Performance

- **No code splitting**: All tab content is bundled together. Using `React.lazy()` or Next.js dynamic imports for each tab would significantly reduce initial JS payload.
- **Large static data in client bundle**: `tips-part1.ts` (665 lines) + `tips-part2.ts` (661 lines) + `agReference.ts` (727 lines) + `gsdReference.ts` (426 lines) = ~2,500 lines of static data shipped as client-side JS. This should be server-rendered or loaded on demand.
- **Linear search for tips**: `tips.find(t => t.id === tipId)` is O(n) on every render in `TipPage`. With 100 tips this is negligible, but a Map would be trivially better.
- **`bookmarks.includes()` is O(n) per tip**: `BookmarkTab` and `TipPage` use `.includes()` to check completion/bookmark status. A Set would be more appropriate.
- **Timer re-renders entire app every second**: The `TimerContext` updates state every second when running, which triggers re-renders down through the Provider to every consuming component (HomePage mini-timer, TimerWidget).

## Accessibility

- **Zero ARIA attributes in the entire codebase**: No `aria-label`, `aria-role`, `aria-expanded`, `aria-current`, or any WAI-ARIA attributes found anywhere.
- **No semantic landmarks**: No `<main>`, `<header>`, `<nav role="navigation">` usage. The sidebar and bottom nav use bare `<aside>` and `<nav>` but lack aria-labels to distinguish them.
- **Icon-only buttons have no accessible names**: Timer reset, skip, and bookmark toggle buttons use SVG-only content with no `aria-label` (only `title` attributes on some).
- **No keyboard navigation support**: Tab panels, accordion sections (AG/GSD reference), and sub-tab selectors have no keyboard handling (`onKeyDown`, `tabIndex`, `role="tablist"`).
- **Color-only status indication**: Completed vs. incomplete states rely solely on color differences (green vs. amber) with no text or icon alternative for colorblind users.
- **No focus-visible styles**: Interactive elements lack visible focus indicators beyond browser defaults, which are suppressed by the custom styling.
- **Missing form labels**: Search inputs and textarea elements use `placeholder` text as their only label, which disappears on input.
- **`animate-pulse` on check-in button**: Constant pulsing animation can be problematic for users with motion sensitivity (no `prefers-reduced-motion` respect).

## Security

- **localStorage data integrity**: All user data (completed tips, bookmarks, memos, glossary, study records) lives in localStorage with no validation on read. Malformed JSON would cause crashes (caught only by try/catch logging to console).
- **No input sanitization**: Memo and dictionary content is rendered directly. While React auto-escapes JSX string interpolation, there is no length limit or content validation on user inputs.
- **No Content Security Policy**: No CSP headers configured. Low risk for a static learning app but worth noting.
- **`parseInt(id)` without validation**: `TipPage` parses the URL `id` param with `parseInt()` but only checks if the resulting tip exists -- no NaN check or bounds validation.

## Scalability

- **All state is client-only localStorage**: No backend, no user accounts, no cloud sync. Data is trapped in the browser. Clearing browser data loses everything.
- **No data export/import**: Users cannot back up their progress, memos, glossary, or bookmarks.
- **Single-page tab architecture**: The entire app is a single route (`/`) with client-side tab switching, plus `/tip/[id]` for detail pages. Adding more sections or deep-linking to specific tabs (e.g., `/tools/timer`) is not possible without refactoring.
- **Static tip data**: All 100 tips are hardcoded in TypeScript files. Adding or updating tips requires a code change and redeploy. No CMS or API integration.
- **No i18n infrastructure**: All UI strings are hardcoded in Korean. Internationalization would require touching every component.
- **Growing localStorage**: Study records grow unboundedly (`claude-master-study-records` adds entries daily forever). No pruning or archival strategy. Will eventually hit the ~5MB localStorage limit.

## Quick Wins

1. **Extract `<GlassCard>` and `<PrimaryButton>` components** - Eliminate 20+ instances of duplicated CSS classes. Estimated effort: 1-2 hours. Impact: major reduction in code noise and future style consistency.
2. **Centralize localStorage keys** into `src/constants/storageKeys.ts` - Prevents typos and makes keys discoverable. Effort: 30 minutes.
3. **Add `React.lazy()` / `dynamic()` imports** for tab content in `page.tsx` - Each tab loads only when selected. Effort: 30 minutes. Impact: meaningful reduction in initial bundle.
4. **Fix `window.location.href`** in `HomePage.tsx` to use `router.push()` - Prevents full page reload on bookmark click. Effort: 5 minutes.
5. **Derive total tips from `tips.length`** instead of hardcoding `100` - Future-proofs percentage calculations. Effort: 10 minutes.
6. **Add basic ARIA labels** to navigation, buttons, and accordion panels - Minimal effort per component, large a11y improvement. Effort: 1-2 hours.
7. **Add `prefers-reduced-motion` media query** to disable `animate-pulse` and `animate-fadeIn` for motion-sensitive users. Effort: 15 minutes in `globals.css`.
8. **Expose `isLoaded` from `useLocalStorage`** so components can show loading state instead of flashing default values. Effort: 30 minutes.
9. **Add delete confirmation** to memo and dictionary delete actions. Effort: 30 minutes.
10. **Deduplicate the nav tabs array** between `Sidebar.tsx` and `BottomNav.tsx` into a shared constant. Effort: 10 minutes.
