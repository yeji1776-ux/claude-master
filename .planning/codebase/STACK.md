# Technology Stack

## Core
- Framework: Next.js 16.2.1 (App Router)
- Language: TypeScript ^5
- UI: React 19.2.4 + React DOM 19.2.4
- Styling: Tailwind CSS v4 (via PostCSS plugin `@tailwindcss/postcss`) + custom CSS classes (glassmorphism utilities, animations)

## Architecture
- Single-page app with tab-based navigation (no multi-page routing except `/tip/[id]`)
- All components are client-side (`'use client'`)
- State managed via React Context (TimerContext) and a custom `useLocalStorage` hook
- Korean-language learning app ("Claude Master - AI 100 Tips")
- Font: Pretendard Variable (loaded from CDN)
- Visual theme: Glassmorphism with gradient background

## Dependencies

### Production
| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.2.1 | App framework (App Router) |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | React DOM renderer |

**Note:** This is a minimal dependency project. No additional production libraries (no state management lib, no UI component library, no data fetching library).

### Development
| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5 | Type checking |
| tailwindcss | ^4 | Utility-first CSS |
| @tailwindcss/postcss | ^4 | Tailwind PostCSS integration |
| eslint | ^9 | Linting |
| eslint-config-next | 16.2.1 | Next.js ESLint rules (core-web-vitals + typescript) |
| @types/node | ^20 | Node.js type definitions |
| @types/react | ^19 | React type definitions |
| @types/react-dom | ^19 | React DOM type definitions |
| babel-plugin-react-compiler | 1.0.0 | React Compiler (auto-memoization) |

## Build & Deploy
- Build tool: Next.js (Turbopack for dev, Webpack/SWC for prod)
- React Compiler: Enabled (`reactCompiler: true` in next.config.ts)
- Deploy target: Not specified (standard Next.js output)
- Node version: Not specified (no `.nvmrc` or `engines` field)

## Configuration Files
| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js config (React Compiler enabled) |
| `tsconfig.json` | TypeScript config (ES2017 target, bundler resolution, `@/*` path alias to `./src/*`) |
| `postcss.config.mjs` | PostCSS config (Tailwind v4 plugin) |
| `eslint.config.mjs` | ESLint flat config (Next.js core-web-vitals + TypeScript rules) |
| `package.json` | Dependencies and scripts (`dev`, `build`, `start`, `lint`) |
| `CLAUDE.md` / `AGENTS.md` | Claude Code agent instructions |

## Directory Structure
```
src/
  app/              # Next.js App Router pages
    layout.tsx      # Root layout (metadata, Providers wrapper)
    page.tsx        # Main SPA page with tab navigation
    globals.css     # Global styles, Tailwind import, glassmorphism utilities
    tip/[id]/       # Dynamic route for individual tip detail pages
  components/       # 19 React components (all client-side)
  contexts/         # TimerContext (Pomodoro timer state)
  data/             # Static data files (tips, AG reference, GSD reference)
  hooks/            # useLocalStorage custom hook
  types/            # TypeScript type definitions (Tip, Category, GlossaryTerm, etc.)
```
