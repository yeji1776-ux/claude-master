# Testing

## Current State
- **No tests exist.** There are zero test files (`*.test.*`, `*.spec.*`) in the `src/` directory or project root.
- No test runner is installed (no Jest, Vitest, Playwright, Cypress, or React Testing Library in `package.json`).
- No test scripts in `package.json` -- only `dev`, `build`, `start`, and `lint`.
- No CI/CD pipeline (no `.github/workflows/` directory, no CI configuration files).

## Test Infrastructure
- **Test runner**: None installed
- **Assertion library**: None
- **Component testing**: None
- **E2E testing**: None
- **Linting**: ESLint v9 with `eslint-config-next` is the only code quality tool configured
- **Type checking**: TypeScript strict mode serves as a basic correctness layer (`tsc` via `next build`)

## Coverage
- **Estimated coverage: 0%** -- no automated tests of any kind
- The `build` script provides compile-time type checking, which is the only automated validation
- Manual testing appears to be the sole QA method

## Recommendations

### High Priority
1. **Install Vitest + React Testing Library** -- Vitest integrates well with the Next.js/Vite ecosystem and is faster than Jest. Add `@testing-library/react` and `@testing-library/user-event` for component tests.
2. **Test `useLocalStorage` hook** -- This is the core persistence layer used across the entire app. Test serialization, deserialization, default values, and the functional updater pattern. A bug here would silently corrupt user data.
3. **Test `TimerContext` logic** -- The timer has non-trivial state transitions (focus->break->focus cycle, daily minutes accumulation, timer completion). These are pure logic and easy to unit test.

### Medium Priority
4. **Test data integrity** -- Validate that `tips` data has 100 entries, all IDs are unique, all weeks are 1-8, and all categories match the `Category` union type. This is a simple snapshot/assertion test that prevents data corruption during edits.
5. **Test `page.tsx` tab routing** -- The root page manages complex tab/sub-tab state. Test that tab switching renders the correct components and that `onTabChange` with sub-tab arguments works correctly.
6. **Add a `test` script to `package.json`** -- e.g., `"test": "vitest"` and `"test:ci": "vitest run"`.

### Lower Priority
7. **E2E tests with Playwright** -- For critical user flows: completing a tip, using the timer, adding a bookmark. Next.js 16 has built-in Playwright support via `next/experimental/testmode/playwright`.
8. **CI pipeline** -- Add a GitHub Actions workflow that runs `lint`, `type-check` (`tsc --noEmit`), and `test` on push/PR.
9. **Component snapshot tests** -- Low-value for this project given the heavy use of Tailwind utility classes (snapshots would be noisy). Prefer behavioral tests over snapshot tests.

### Suggested Starter Setup
```bash
npm install -D vitest @testing-library/react @testing-library/user-event jsdom
```

Add to `package.json`:
```json
"scripts": {
  "test": "vitest",
  "test:run": "vitest run"
}
```

Create `vitest.config.ts` with React plugin and `jsdom` environment, and path alias resolution matching the existing `@/` alias in `tsconfig.json`.
