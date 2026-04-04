# Code Conventions

## File Naming
- **Components**: PascalCase (e.g., `HomePage.tsx`, `TimerWidget.tsx`, `BottomNav.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useLocalStorage.ts`)
- **Data files**: camelCase (e.g., `agReference.ts`, `tips-part1.ts` -- note inconsistency with kebab-case in tips files)
- **Types**: `index.ts` barrel file in `src/types/`
- **Contexts**: PascalCase with `Context` suffix (e.g., `TimerContext.tsx`)
- **Pages**: Next.js App Router convention (`page.tsx` inside route directories)

## Component Patterns
- **Every component file** starts with `'use client';` directive -- there are zero Server Components besides `layout.tsx`
- **Export style**: `export default function ComponentName()` -- always named default exports, never arrow function exports
- **Props**: Inline `interface` declared directly above the component (e.g., `interface HomePageProps`, `interface BottomNavProps`). No separate props files.
- **No React.FC**: Components use plain function declarations with typed props parameter
- **State management**: Component-local `useState` + shared state via React Context (`TimerContext`). No external state library.
- **Persistence**: All persistent data uses `useLocalStorage` custom hook with `claude-master-` prefixed keys
- **Navigation**: Tab-based SPA pattern managed by `useState` in the root `page.tsx`. No Next.js routing between tabs -- only `router.push` for individual tip detail pages.
- **Context pattern**: `createContext` + Provider component + `useX` hook with null-check error boundary (see `TimerContext.tsx`)

## Styling Approach
- **Framework**: Tailwind CSS v4 (via `@tailwindcss/postcss`), utility-first
- **Theme**: Glassmorphism design system with consistent patterns:
  - Card base: `bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-black/5`
  - Active/selected states: `bg-amber-500 text-white shadow-lg shadow-amber-500/25`
  - Gradient text: `bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent`
  - Hover states: `hover:bg-white/70 hover:shadow-xl hover:shadow-black/10 transition-all`
- **Color palette**: Amber/orange as primary, emerald for success/break, purple for accents. Category colors defined as hex strings in `CATEGORY_COLORS` constant.
- **Responsive breakpoints**: Mobile-first. `md:` for tablet/desktop layout changes. `lg:` for wide sidebar expansion. No `sm:` or `xl:` usage observed.
- **Mobile-specific**: `md:hidden` for mobile-only elements (BottomNav, mobile header). `hidden md:flex` / `hidden md:block` for desktop-only elements (Sidebar).
- **Layout**: Desktop uses fixed sidebar (`md:ml-20 lg:ml-64`), mobile uses fixed bottom nav. Content max-width varies by breakpoint (`max-w-[520px] md:max-w-3xl lg:max-w-4xl`).
- **Animations**: `animate-fadeIn` custom animation class used on tab content. `active:scale-95` for button press feedback. `transition-all` used broadly.
- **Icons**: Inline SVGs for UI controls (timer buttons). Emoji for navigation and decorative icons -- no icon library.
- **No CSS modules, no styled-components, no global custom classes** beyond Tailwind utilities and `globals.css`.

## TypeScript Usage
- **Strict mode**: Enabled in `tsconfig.json` (`"strict": true`)
- **Interfaces for component props**: Simple `interface` declarations, not `type` aliases
- **Exported types**: `Tip`, `Category`, `GlossaryTerm`, `AGItem`, `AGSection` in `src/types/index.ts`
- **Union literal types**: `Category` is a string union type, `MainTab` is inline union in `page.tsx`
- **Generics**: Used in `useLocalStorage<T>` hook
- **Type assertions**: `as MainTab` and `as Category` casts used when converting from generic strings
- **Constants with type annotations**: `Record<Category, string>` for color maps, `Record<number, string>` for week titles
- **No enums**: String unions and `Record` types preferred over enums
- **No Zod or runtime validation**: Types are compile-time only

## Code Organization
Within component files, the consistent order is:
1. `'use client'` directive
2. React/library imports
3. Local component/hook imports (using `@/` alias)
4. Interface/type declarations
5. Module-level constants (e.g., `quickAccess`, `tabs`, `FOCUS_TIME`)
6. Default export function component
7. Inside component: hooks first (`useState`, `useLocalStorage`, `useMemo`), then derived values, then event handlers, then JSX return

**Directory structure**:
```
src/
  app/           # Next.js App Router pages (layout.tsx, page.tsx, tip/[id]/page.tsx)
  components/    # All UI components (flat -- no subdirectories)
  contexts/      # React Context providers
  data/          # Static data (tips, references)
  hooks/         # Custom React hooks
  types/         # TypeScript type definitions
```

**No barrel exports** from component directories -- each component is imported by direct file path.

**Data co-location**: Static data lives in `src/data/` as exported TypeScript arrays/objects, not JSON files or API calls. The app is entirely client-side with localStorage persistence.
