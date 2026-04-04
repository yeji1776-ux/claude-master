# External Integrations

## APIs & Services
**None.** This is a fully client-side application with no API routes, no backend calls, and no external service integrations. All data is either hardcoded in static data files or stored in the browser.

### External Resources (CDN only)
- **Pretendard Font**: Loaded from `cdn.jsdelivr.net` via CSS `@import` in `globals.css`
  ```
  https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css
  ```

## Environment Variables
**None.** No `.env` files exist. No `process.env` or `NEXT_PUBLIC_*` references found anywhere in the codebase.

## Data Storage
All persistence uses **browser localStorage** via the custom `useLocalStorage` hook and direct `localStorage` calls.

### localStorage Keys
| Key | Type | Used By | Purpose |
|-----|------|---------|---------|
| `claude-master-completed` | `number[]` | HomePage, LearningTab, CalendarWidget, BookmarkTab, PortfolioTab, tip/[id] | IDs of completed tips |
| `claude-master-bookmarks` | `number[]` | HomePage, BookmarkTab, tip/[id] | IDs of bookmarked tips |
| `claude-master-memos` | `Memo[]` | MemoTab | User-created memo notes |
| `claude-master-glossary` | `GlossaryTerm[]` | DictionaryTab | User-created glossary terms |
| `claude-master-study-records` | `StudyRecord[]` | CheckInBanner | Daily study check-in records |
| `claude-master-timer-date` | `string` (ISO date) | TimerContext | Current date for timer reset tracking |
| `claude-master-timer-today` | `string` (number) | TimerContext | Today's accumulated focus minutes |

## Static Data
Learning content is embedded directly in TypeScript files under `src/data/`:
- `tips.ts` / `tips-part1.ts` / `tips-part2.ts` -- 100 AI usage tips organized by week and category
- `agReference.ts` -- AG (Anthropic Guidelines) reference material
- `gsdReference.ts` -- GSD workflow reference material
