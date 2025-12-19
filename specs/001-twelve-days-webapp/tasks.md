# Tasks: Twelve Days of Christmas Interactive Web App

**Input**: Design documents from `/specs/001-twelve-days-webapp/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Comprehensive test coverage is mandated by project constitution. All tests included below are REQUIRED.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (SPA)**: `frontend/src/`, `frontend/tests/` at repository root
- Paths shown below use this structure per plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create React app with Vite in frontend/ directory
- [ ] T002 Install core dependencies (React 18+) in frontend/package.json
- [ ] T003 [P] Install testing dependencies (Jest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event) in frontend/package.json
- [ ] T004 [P] Install Playwright for E2E testing in frontend/package.json
- [ ] T005 [P] Install Playwright browsers using npx playwright install
- [ ] T006 Create directory structure (src/components, src/hooks, src/data, src/assets/images, src/assets/audio, src/styles, tests/unit, tests/integration, tests/__mocks__)
- [ ] T007 [P] Configure Jest in frontend/jest.config.js for React testing
- [ ] T008 [P] Configure Playwright in frontend/playwright.config.js
- [ ] T009 [P] Create Audio API mock in frontend/tests/__mocks__/audio.js
- [ ] T010 [P] Create test setup file in frontend/tests/setup.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data and utilities that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T011 Create Gift data with all 12 gifts (id, name, shortName, lyrics, imagePath, audioPath, asciiArt, position) in frontend/src/data/gifts.js
- [ ] T012 [P] Create CSS animations (bounce, float) with @keyframes in frontend/src/styles/animations.css
- [ ] T013 [P] Create base layout styles (scattered positioning, responsive) in frontend/src/styles/layout.css
- [ ] T014 [P] Create useImageFallback custom hook with ASCII art fallback logic in frontend/src/hooks/useImageFallback.js
- [ ] T015 [P] Create useAudio custom hook with error handling for autoplay policies in frontend/src/hooks/useAudio.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View All Gifts (Priority: P1) 🎯 MVP

**Goal**: Display all twelve gift images scattered on the page in a visually pleasing arrangement

**Independent Test**: Load app in browser and verify all twelve gift images are visible and properly arranged

### Tests for User Story 1

> **NOTE: These tests are REQUIRED per project constitution**

- [ ] T016 [P] [US1] Unit test for App component rendering 12 GiftCard components in frontend/tests/unit/App.test.jsx
- [ ] T017 [P] [US1] Unit test for GiftCard component rendering image with correct position in frontend/tests/unit/GiftCard.test.jsx
- [ ] T018 [P] [US1] Unit test for useImageFallback hook handling image load success in frontend/tests/unit/hooks.test.js
- [ ] T019 [P] [US1] Unit test for useImageFallback hook falling back to ASCII art on error in frontend/tests/unit/hooks.test.js

### Implementation for User Story 1

- [ ] T020 [P] [US1] Create GiftCard component with image display and absolute positioning in frontend/src/components/GiftCard.jsx
- [ ] T021 [US1] Create App component that renders all 12 GiftCard components with scattered positioning in frontend/src/components/App.jsx
- [ ] T022 [US1] Integrate useImageFallback hook into GiftCard for ASCII art fallback in frontend/src/components/GiftCard.jsx
- [ ] T023 [US1] Apply scattered layout styles to GiftCard components in App in frontend/src/components/App.jsx
- [ ] T024 [US1] Add visual feedback styling (cursor:pointer, hover hint) to GiftCard in frontend/src/components/GiftCard.jsx

**Checkpoint**: At this point, User Story 1 should be fully functional - all 12 gifts visible and arranged

---

## Phase 4: User Story 2 - Interactive Gift Hover (Priority: P2)

**Goal**: Gifts animate with bounce/float motion when hovered

**Independent Test**: Hover over each gift and confirm bounce/float animation triggers

### Tests for User Story 2

- [ ] T025 [P] [US2] Unit test for GiftCard onMouseEnter calling onHover callback in frontend/tests/unit/GiftCard.test.jsx
- [ ] T026 [P] [US2] Unit test for GiftCard onMouseLeave calling onUnhover callback in frontend/tests/unit/GiftCard.test.jsx
- [ ] T027 [P] [US2] Unit test for GiftCard applying animation CSS class when isHovered=true in frontend/tests/unit/GiftCard.test.jsx
- [ ] T028 [P] [US2] Unit test for GiftCard handling touch events (onTouchStart, onTouchEnd) in frontend/tests/unit/GiftCard.test.jsx

### Implementation for User Story 2

- [ ] T029 [US2] Add hover state management (isHovered) to GiftCard component in frontend/src/components/GiftCard.jsx
- [ ] T030 [US2] Add onMouseEnter and onMouseLeave event handlers to GiftCard in frontend/src/components/GiftCard.jsx
- [ ] T031 [US2] Add onTouchStart and onTouchEnd event handlers to GiftCard for mobile in frontend/src/components/GiftCard.jsx
- [ ] T032 [US2] Apply animation CSS class conditionally based on isHovered state in frontend/src/components/GiftCard.jsx
- [ ] T033 [US2] Add onHover and onUnhover prop handlers in App component in frontend/src/components/App.jsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - gifts display and animate on hover

---

## Phase 5: User Story 3 - Audio Playback on Hover (Priority: P3)

**Goal**: Play corresponding audio verse when hovering over a gift

**Independent Test**: Hover over each gift with audio enabled and verify correct audio plays

### Tests for User Story 3

- [ ] T034 [P] [US3] Unit test for AudioPlayer component playing audio when isPlaying=true in frontend/tests/unit/AudioPlayer.test.jsx
- [ ] T035 [P] [US3] Unit test for AudioPlayer stopping audio when isPlaying=false in frontend/tests/unit/AudioPlayer.test.jsx
- [ ] T036 [P] [US3] Unit test for AudioPlayer calling onError when audio fails in frontend/tests/unit/AudioPlayer.test.jsx
- [ ] T037 [P] [US3] Unit test for AudioPlayer handling autoplay policy rejection in frontend/tests/unit/AudioPlayer.test.jsx
- [ ] T038 [P] [US3] Unit test for useAudio hook playAudio function stopping previous audio in frontend/tests/unit/hooks.test.js

### Implementation for User Story 3

- [ ] T039 [P] [US3] Create AudioPlayer component with HTML5 Audio API integration in frontend/src/components/AudioPlayer.jsx
- [ ] T040 [P] [US3] Create AudioIndicator component for audio unavailability warning in frontend/src/components/AudioIndicator.jsx
- [ ] T041 [US3] Add currentAudio state (gift id or null) to App component in frontend/src/components/App.jsx
- [ ] T042 [US3] Add audioError state for error indicator visibility in App component in frontend/src/components/App.jsx
- [ ] T043 [US3] Update onHover handler in App to set currentAudio state in frontend/src/components/App.jsx
- [ ] T044 [US3] Update onUnhover handler in App to clear currentAudio state in frontend/src/components/App.jsx
- [ ] T045 [US3] Integrate AudioPlayer component in App with currentAudio state in frontend/src/components/App.jsx
- [ ] T046 [US3] Integrate AudioIndicator component in App with audioError state in frontend/src/components/App.jsx
- [ ] T047 [US3] Add audio error handler that sets audioError=true on playback failure in frontend/src/components/App.jsx

**Checkpoint**: User Stories 1, 2, AND 3 work independently - gifts display, animate, and play audio

---

## Phase 6: User Story 4 - Lyrics Display (Priority: P4)

**Goal**: Display gift lyrics at top of screen when hovering

**Independent Test**: Hover over each gift and verify correct lyrics appear at top

### Tests for User Story 4

- [ ] T048 [P] [US4] Unit test for LyricsDisplay component rendering provided lyrics in frontend/tests/unit/LyricsDisplay.test.jsx
- [ ] T049 [P] [US4] Unit test for LyricsDisplay handling empty string gracefully in frontend/tests/unit/LyricsDisplay.test.jsx
- [ ] T050 [P] [US4] Unit test for LyricsDisplay smooth transition on lyrics change in frontend/tests/unit/LyricsDisplay.test.jsx

### Implementation for User Story 4

- [ ] T051 [P] [US4] Create LyricsDisplay component with fixed positioning at top in frontend/src/components/LyricsDisplay.jsx
- [ ] T052 [US4] Add currentLyrics state (string) to App component in frontend/src/components/App.jsx
- [ ] T053 [US4] Update onHover handler in App to set currentLyrics=gift.lyrics in frontend/src/components/App.jsx
- [ ] T054 [US4] Update onUnhover handler in App to clear currentLyrics='' in frontend/src/components/App.jsx
- [ ] T055 [US4] Integrate LyricsDisplay component in App with currentLyrics state in frontend/src/components/App.jsx
- [ ] T056 [US4] Add smooth transition CSS (opacity, transform) to LyricsDisplay in frontend/src/components/LyricsDisplay.jsx

**Checkpoint**: All user stories (1-4) are now independently functional - complete feature set works

---

## Phase 7: Integration & Cross-Cutting Tests

**Purpose**: Comprehensive integration tests covering full user flows and edge cases

- [ ] T057 [P] Integration test for complete hover flow (hover → animation → audio → lyrics) in frontend/tests/integration/GiftInteraction.test.jsx
- [ ] T058 [P] Integration test for rapid hovering across multiple gifts in frontend/tests/integration/GiftInteraction.test.jsx
- [ ] T059 [P] Integration test for touch interaction on mobile devices in frontend/tests/integration/GiftInteraction.test.jsx
- [ ] T060 [P] Integration test for audio failure graceful degradation in frontend/tests/integration/GiftInteraction.test.jsx
- [ ] T061 [P] Integration test for image failure ASCII art fallback in frontend/tests/integration/GiftInteraction.test.jsx
- [ ] T062 [P] E2E test using Playwright for full app load and gift interaction in frontend/tests/e2e/app.spec.js
- [ ] T063 [P] E2E test using Playwright for multi-browser compatibility (Chrome, Firefox, Safari) in frontend/tests/e2e/browsers.spec.js

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final touches, performance, and deployment readiness

- [ ] T064 [P] Add responsive layout media queries for mobile/tablet in frontend/src/styles/layout.css
- [ ] T065 [P] Add accessibility attributes (ARIA labels, alt text) to all components
- [ ] T066 [P] Optimize image loading with lazy loading attributes in frontend/src/components/GiftCard.jsx
- [ ] T067 [P] Add loading states and skeleton screens for initial app load in frontend/src/components/App.jsx
- [ ] T068 [P] Add error boundary for React error handling in frontend/src/components/ErrorBoundary.jsx
- [ ] T069 Run all unit tests and verify 100% pass rate using npm run test
- [ ] T070 Run all integration tests and verify 100% pass rate using npm run test
- [ ] T071 Run all E2E tests and verify 100% pass rate using npx playwright test
- [ ] T072 Run production build and verify bundle size <500KB using npm run build
- [ ] T073 Test app in Chrome, Firefox, and Safari for cross-browser compatibility
- [ ] T074 [P] Create README.md with setup instructions and feature description
- [ ] T075 [P] Update quickstart.md with actual implementation notes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Integration Tests (Phase 7)**: Depends on all user stories being complete
- **Polish (Phase 8)**: Depends on integration tests passing

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Requires US1 GiftCard component but can be built incrementally
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2 (adds audio capability)
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Independent of US1/US2/US3 (adds lyrics display)

**Note**: User Stories 2, 3, and 4 all enhance the same GiftCard component created in US1, so they naturally build on each other but can be implemented sequentially.

### Within Each User Story

- Tests (REQUIRED) can be written in any order relative to implementation per constitution
- All tasks marked [P] within a phase can run in parallel
- Models/data before services/hooks
- Hooks before components that use them
- Components before integration into App
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003-T010)
- All Foundational tasks marked [P] can run in parallel (T012-T015)
- Within each user story, test tasks marked [P] can run in parallel
- Integration test tasks (T057-T063) can all run in parallel once user stories complete
- Polish tasks (T064-T068, T074-T075) can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task T016: Unit test for App component
Task T017: Unit test for GiftCard component
Task T018: Unit test for useImageFallback success
Task T019: Unit test for useImageFallback error

# Launch models for User Story 1 together:
Task T020: Create GiftCard component
Task T021: Create App component
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T010)
2. Complete Phase 2: Foundational (T011-T015) - **CRITICAL BLOCKER**
3. Complete Phase 3: User Story 1 (T016-T024)
4. **STOP and VALIDATE**: Test User Story 1 independently - verify all 12 gifts display
5. Deploy/demo if ready

**MVP delivers**: Visual display of 12 gifts in scattered arrangement with image fallback

### Incremental Delivery

1. Complete Setup + Foundational (T001-T015) → Foundation ready
2. Add User Story 1 (T016-T024) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (T025-T033) → Test independently → Deploy/Demo (adds interactivity)
4. Add User Story 3 (T034-T047) → Test independently → Deploy/Demo (adds audio)
5. Add User Story 4 (T048-T056) → Test independently → Deploy/Demo (adds lyrics)
6. Add Integration Tests (T057-T063) → Validate complete feature
7. Add Polish (T064-T075) → Production ready

### Parallel Team Strategy

With multiple developers (after Foundational phase completes):

1. Team completes Setup + Foundational together (T001-T015)
2. Once Foundational is done:
   - Developer A: User Story 1 (T016-T024)
   - Wait for US1 GiftCard to be created, then:
   - Developer B: User Story 2 (T025-T033)
   - Developer C: User Story 3 (T034-T047)
   - Developer D: User Story 4 (T048-T056)
3. Stories complete sequentially or in parallel based on GiftCard availability
4. Team converges on Integration Tests (T057-T063)
5. Team parallelizes Polish (T064-T075)

**Note**: Since US2-4 all enhance the GiftCard component from US1, they work best done sequentially after US1, but can be parallelized if developers coordinate carefully.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- All tests are REQUIRED per project constitution (comprehensive test coverage)
- Verify tests pass at each checkpoint
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, breaking user story independence

---

## Task Summary

**Total Tasks**: 75
- **Setup** (Phase 1): 10 tasks
- **Foundational** (Phase 2): 5 tasks
- **User Story 1** (Phase 3): 9 tasks (4 tests + 5 implementation)
- **User Story 2** (Phase 4): 9 tasks (4 tests + 5 implementation)
- **User Story 3** (Phase 5): 14 tasks (5 tests + 9 implementation)
- **User Story 4** (Phase 6): 9 tasks (3 tests + 6 implementation)
- **Integration Tests** (Phase 7): 7 tasks
- **Polish** (Phase 8): 12 tasks

**Parallel Opportunities**: 45 tasks can run in parallel within their phases

**MVP Scope** (recommended first delivery): Phase 1 + Phase 2 + Phase 3 = 24 tasks

**Independent Test Criteria**:
- US1: Load app and see all 12 gifts
- US2: Hover over gifts and see animations
- US3: Hover over gifts and hear audio
- US4: Hover over gifts and see lyrics at top
