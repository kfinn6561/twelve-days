# Research: Twelve Days of Christmas Interactive Web App

**Date**: 2025-12-19
**Feature**: 001-twelve-days-webapp
**Purpose**: Resolve technical decisions for implementation

## Technical Decisions

### 1. Language: JavaScript ES6+ (No TypeScript)

**Decision**: Use plain JavaScript ES6+ without TypeScript

**Rationale**:
- YAGNI alignment: Simple SPA with only 12 interactive elements and straightforward data structures
- Minimal type complexity: Data model is extremely simple (array of 12 gift objects with consistent properties)
- Faster development: No TypeScript configuration, type definitions, or type error debugging
- Testing provides safety: Comprehensive test coverage mandated by constitution provides the safety net TypeScript would offer
- Small codebase: ~5-6 components and 2 custom hooks - small enough to reason about without type annotations

**Alternatives Considered**:
- TypeScript: Adds overhead (tsconfig, @types packages, compilation) for minimal benefit
- JSDoc with type hints: Unnecessary complexity for this scope

**When to reconsider**: If project grows beyond 20 components or requires API integration

---

### 2. Animation: CSS Keyframes (No Library)

**Decision**: Use CSS `@keyframes` with `:hover` pseudo-classes, no animation library

**Rationale**:
- Perfect YAGNI fit: Only need bounce/float animations on hover - exactly what CSS is designed for
- Zero dependencies: No bundle size or library complexity
- Better performance: CSS animations run on GPU without triggering React re-renders
- Trivial implementation: 10 lines of CSS vs 20KB library

**Implementation Example**:
```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.gift:hover {
  animation: bounce 0.6s ease-in-out;
}
```

**Alternatives Considered**:
- Framer Motion: Excellent library but adds ~20KB (gzipped) for animations achievable with CSS
- React Spring: Physics-based animations are overkill
- GSAP: Powerful but heavyweight
- Animate.css: Adds 80+ animations when we need 2

**When to reconsider**: If complex orchestrated animations, gesture interactions, or page transitions are needed

---

### 3. State Management: React Hooks (useState + useContext)

**Decision**: Use built-in React hooks (`useState`, optional `useContext`) without external state library

**Rationale**:
- State is simple and localized:
  - `currentlyPlaying`: String (which audio is playing)
  - `audioAvailable`: Boolean (audio loading status)
  - `currentLyrics`: String (displayed lyrics)
  - `imageLoadStates`: Object (per-gift loading status)
- No prop drilling: Only 2-3 component layers (App → GiftCard → nested)
- Constitution compliance: "Simple code is easier to understand, maintain, debug"
- Built-in React features sufficient

**State Architecture**:
```javascript
// App.jsx - top-level state
const [currentLyrics, setCurrentLyrics] = useState('');
const [currentAudio, setCurrentAudio] = useState(null);
const [audioAvailable, setAudioAvailable] = useState(true);

// Custom hooks for isolated concerns
const { playAudio, stopAudio } = useAudio();
const { imageSrc, hasError } = useImageFallback(originalSrc, asciiArt);
```

**Alternatives Considered**:
- Redux: Massive overkill - actions/reducers for 4 state variables
- Zustand: Lightweight (1KB) but unnecessary
- Jotai/Recoil: Atomic state adds conceptual overhead
- MobX: Observables violate simplicity principle

**When to reconsider**: If exceeding 3 levels of prop drilling or 20+ components

---

### 4. E2E Testing: Playwright

**Decision**: Use Playwright for end-to-end testing

**Rationale (2025 context)**:
- Current industry standard: Overtaken Cypress as best practice
- Better performance: Parallel test execution by default
- Multi-browser built-in: Chrome, Firefox, Safari, Edge without configuration
- Modern async/await API with auto-waiting
- Better mobile testing: Built-in device emulation and touch event support (critical for FR-010)
- Audio testing support: Can intercept and verify audio playback
- Active Microsoft-backed development

**Testing Strategy**:
- **Unit tests (Jest + React Testing Library)**: 80% of tests
  - Component logic, hooks, edge cases
  - Image fallback to ASCII art
  - Audio error handling
- **E2E tests (Playwright)**: 20% of tests
  - Critical user flows: hover → animation → audio → lyrics
  - Mobile touch interactions
  - Multi-browser verification

**Alternatives Considered**:
- Cypress: Slower execution, no native parallel support, declining momentum
- Selenium: Legacy tool, verbose API
- TestCafe: Smaller ecosystem
- WebdriverIO: Complex setup

**When to reconsider**: Never - Playwright is the correct choice for 2025

---

## Updated Technical Context

Based on research, all NEEDS CLARIFICATION items are resolved:

- **Language/Version**: JavaScript ES6+ (no TypeScript)
- **Primary Dependencies**: React 18+, HTML5 Audio API (no animation library, no state management library)
- **Testing**: Jest + React Testing Library (unit/integration), Playwright (E2E)
- **Animation**: CSS keyframes with :hover pseudo-classes
- **State**: React built-in hooks (useState, useContext if needed)

---

## Dependencies Summary

### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### Dev Dependencies
```json
{
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.1.0",
  "@testing-library/user-event": "^14.5.0",
  "@playwright/test": "^1.40.0",
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0"
}
```

### Build Tools
- Vite (fast, modern, minimal config) or Create React App (if preferring stability)

---

## Constitution Compliance Check

All decisions align with project constitution:

✅ **Principle I - Modular Design**: React components, custom hooks, separated concerns
✅ **Principle II - Comprehensive Testing**: Jest + RTL + Playwright covering all scenarios
✅ **Principle III - Simplicity**: Zero unnecessary libraries, built-in solutions, YAGNI applied
✅ **Principle IV - Technology Standards**: React framework with best practices

---

## Next Steps

1. Update plan.md Technical Context with resolved decisions
2. Proceed to Phase 1: Generate data-model.md
3. Generate component contracts
4. Create quickstart.md for development setup
