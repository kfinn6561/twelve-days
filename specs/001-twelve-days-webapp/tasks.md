# Tasks: Twelve Days of Christmas Interactive Web App

**Input**: Design documents from `/specs/001-twelve-days-webapp/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included per constitution requirement (Principle II - Comprehensive Test Coverage is NON-NEGOTIABLE)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/`, `frontend/tests/`
- Paths shown below use web app structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify React app is initialized with Vite in frontend/ directory
- [x] T002 [P] Install testing dependencies (Jest, React Testing Library, Playwright) per quickstart.md
- [x] T003 [P] Configure Jest with jsdom environment in frontend/jest.config.js
- [x] T004 [P] Configure Playwright for E2E tests in frontend/playwright.config.js
- [x] T005 [P] Create test mocks directory frontend/tests/__mocks__/ with audio.js and image.js mocks
- [x] T006 [P] Set up ESLint configuration in frontend/eslint.config.js
- [x] T007 [P] Create frontend/tests/setup.js for test environment configuration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T008 Source 12 gift images from internet (Unsplash/public domain) and place in frontend/public/assets/images/
- [x] T009 Obtain complete "Twelve Days of Christmas" recording and split into 12 audio segments in frontend/public/assets/audio/ (day-1.mp3 through day-12.mp3)
- [x] T010 Create gifts data structure in frontend/src/data/giftsData.js with all 12 gift objects (id, name, lyrics, imagePath, audioPath, position)
- [x] T011 Create ASCII art fallbacks for all 12 gifts in frontend/src/data/asciiArt.js
- [x] T012 [P] Create base CSS file frontend/src/styles/App.css with scattered layout grid and responsive mobile scaling
- [x] T013 [P] Implement platform detection utility in frontend/src/services/platformDetection.js (desktop vs mobile)

---

## Phase 3: User Story 1 - View All Gifts (P1)

**Story Goal**: Display all twelve gift images scattered on page load

**Independent Test**: Load app in browser and verify all 12 gift images are visible and properly positioned

### Tests

- [x] T014 [P] [US1] Create test for App component rendering in frontend/tests/components/App.test.jsx
- [x] T015 [P] [US1] Create test for GiftCard component rendering in frontend/tests/components/GiftCard.test.jsx
- [x] T016 [P] [US1] Create test for image loading and fallback in frontend/tests/services/imageService.test.js

### Implementation

- [x] T017 [US1] Implement useImageFallback custom hook in frontend/src/hooks/useImageFallback.js (handles image loading, fallback to ASCII)
- [x] T018 [US1] Create GiftCard component in frontend/src/components/GiftCard.jsx (display gift image, position absolutely, handle image errors)
- [x] T019 [US1] Create App component shell in frontend/src/components/App.jsx (render 12 GiftCard components with scattered positioning)
- [x] T020 [US1] Update frontend/src/main.jsx to mount App component
- [x] T021 [US1] Add CSS for gift positioning and mobile scaling in frontend/src/styles/layout.css
- [x] T022 [US1] Test US1: Verify all 12 gifts display correctly on desktop and mobile

---

## Phase 4: User Story 2 - Interactive Gift Hover (P2)

**Story Goal**: Add hover/touch animations to gifts

**Independent Test**: Hover over each gift and confirm animation triggers

### Tests

- [x] T023 [P] [US2] Create test for hover event handling in frontend/tests/components/GiftCard.test.jsx
- [x] T024 [P] [US2] Create test for touch event handling in frontend/tests/components/GiftCard.test.jsx
- [x] T025 [P] [US2] Create test for desktop vs mobile animation duration in frontend/tests/components/GiftCard.test.jsx

### Implementation

- [x] T026 [US2] Add CSS animations (bounce/float keyframes) in frontend/src/styles/animations.css
- [x] T027 [US2] Update GiftCard component to handle onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd events
- [x] T028 [US2] Add animation state management to GiftCard (isHovered state, apply CSS class)
- [x] T029 [US2] Add cursor:pointer CSS to gifts in frontend/src/styles/App.css
- [x] T030 [US2] Implement desktop: continuous animation loop while hovering logic
- [x] T031 [US2] Test US2: Verify hover animations work on desktop (continuous loop)
- [x] T032 [US2] Test US2: Verify touch animations work on mobile (duration matches audio length - deferred to US3)

---

## Phase 5: User Story 3 - Audio Playback on Hover (P3)

**Story Goal**: Play audio verse when gift is hovered/touched

**Independent Test**: Hover over each gift and verify correct audio plays

### Tests

- [x] T033 [P] [US3] Create test for audioService in frontend/tests/services/audioService.test.js (desktop immediate stop, mobile full playback)
- [x] T034 [P] [US3] Create test for useAudio hook in frontend/tests/unit/hooks.test.js
- [x] T035 [P] [US3] Create test for AudioPlayer component in frontend/tests/components/AudioPlayer.test.jsx
- [x] T036 [P] [US3] Create test for audio autoplay detection and error handling in frontend/tests/services/audioService.test.js

### Implementation

- [x] T037 [US3] Implement audioService.js in frontend/src/services/audioService.js (play, stop, autoplay detection, desktop vs mobile logic)
- [x] T038 [US3] Implement useAudio custom hook in frontend/src/hooks/useAudio.js (wraps audioService, manages audio state)
- [x] T039 [US3] Create AudioPlayer component in frontend/src/components/AudioPlayer.jsx (functional component, no UI)
- [x] T040 [US3] Create AudioIndicator component in frontend/src/components/AudioIndicator.jsx (shows when audio unavailable)
- [x] T041 [US3] Update App component to manage audio state (currentAudio, audioAvailable, audioError)
- [x] T042 [US3] Update GiftCard to call onHover/onUnhover callbacks passing gift data
- [x] T043 [US3] Implement desktop audio behavior: stop immediately when hover ends (in audioService.js)
- [x] T044 [US3] Implement mobile audio behavior: play full audio even if touch ends early (in audioService.js)
- [x] T045 [US3] Update mobile animation logic: continue bouncing until audio completes (sync animation duration to audio playback)
- [x] T046 [US3] Implement logic to stop previous audio when new gift is hovered (in App component)
- [x] T047 [US3] Test US3: Verify audio plays correctly on desktop (stops on unhover)
- [x] T048 [US3] Test US3: Verify audio plays correctly on mobile (full playback with synchronized animation)
- [x] T049 [US3] Test US3: Verify audio unavailable indicator shows when autoplay is blocked

---

## Phase 6: User Story 4 - Lyrics Display (P4)

**Story Goal**: Display lyrics at top of screen when gift is hovered

**Independent Test**: Hover over each gift and verify correct lyrics appear at top

### Tests

- [x] T050 [P] [US4] Create test for LyricsDisplay component in frontend/tests/components/LyricsDisplay.test.jsx
- [x] T051 [P] [US4] Create test for lyrics state updates in frontend/tests/components/App.test.jsx

### Implementation

- [x] T052 [US4] Create LyricsDisplay component in frontend/src/components/LyricsDisplay.jsx (displays lyrics at top, smooth transitions)
- [x] T053 [US4] Add CSS for lyrics display in frontend/src/styles/lyrics.css (fixed position, centered, smooth opacity transition)
- [x] T054 [US4] Update App component to manage currentLyrics state
- [x] T055 [US4] Update App to render LyricsDisplay component at top of viewport
- [x] T056 [US4] Update gift hover handlers in App to set currentLyrics
- [x] T057 [US4] Update unhover handlers in App to clear lyrics
- [x] T058 [US4] Test US4: Verify lyrics display correctly for all 12 gifts
- [x] T059 [US4] Test US4: Verify lyrics clear when hover ends

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final integration, E2E tests, browser compatibility, performance optimization

### Integration Tests

- [ ] T060 [P] Create E2E test for full user flow (desktop) in frontend/tests/e2e/desktop-interaction.spec.js
- [ ] T061 [P] Create E2E test for full user flow (mobile) in frontend/tests/e2e/mobile-interaction.spec.js
- [ ] T062 [P] Create E2E test for audio failure scenarios in frontend/tests/e2e/edge-cases.spec.js
- [ ] T063 [P] Create E2E test for image failure scenarios in frontend/tests/e2e/edge-cases.spec.js

### Browser Compatibility

- [ ] T064 [P] Test app in Chrome (last 2 versions)
- [ ] T065 [P] Test app in Firefox (last 2 versions)
- [ ] T066 [P] Test app in Safari (last 2 versions)

### Performance & Optimization

- [ ] T067 [P] Verify page load time <3s on standard broadband
- [ ] T068 [P] Verify hover response <100ms
- [ ] T069 [P] Verify audio playback starts <200ms after hover
- [ ] T070 [P] Optimize images if needed (compress without quality loss)

### Documentation

- [ ] T071 [P] Add README.md to frontend/ directory with setup and run instructions
- [ ] T072 [P] Document desktop vs mobile behavior differences in README

---

## Dependencies & Execution Order

### User Story Completion Order (MVP First)

1. **US1 (P1)** - View All Gifts
   - **Blocks**: US2, US3, US4 (all require gifts to be displayed)
   - **MVP Scope**: Can ship with just this story for static gift display

2. **US2 (P2)** - Interactive Gift Hover
   - **Depends on**: US1
   - **Blocks**: None (US3 and US4 can work without animations)
   - **Independent**: Yes, can be tested without US3/US4

3. **US3 (P3)** - Audio Playback on Hover
   - **Depends on**: US1 (needs gifts displayed)
   - **Enhances**: US2 (mobile animation duration syncs to audio length)
   - **Independent**: Yes, can work without US2 animations or US4 lyrics

4. **US4 (P4)** - Lyrics Display
   - **Depends on**: US1 (needs gifts displayed)
   - **Independent**: Yes, can work without US2/US3

### Parallel Execution Opportunities

**Setup Phase** (All parallelizable):
- T002, T003, T004, T005, T006, T007 can run concurrently

**Foundational Phase** (Some parallelizable):
- T008, T009 (asset sourcing) - sequential
- T012, T013 (CSS and utilities) can run parallel to asset sourcing

**US1 Implementation**:
- T017, T018, T021 (hook, component, CSS) can run parallel after tests complete

**US2 Implementation**:
- T026, T027, T028, T029, T030 can run parallel after tests complete

**US3 Implementation**:
- T037, T038, T039, T040 (services, hooks, components) can run parallel after tests complete
- T043, T044, T045 (behavior logic) must run sequential

**US4 Implementation**:
- T052, T053 (component and CSS) can run parallel after tests complete

**Polish Phase** (Most parallelizable):
- T060, T061, T062, T063 (E2E tests) can run parallel
- T064, T065, T066 (browser tests) can run parallel
- T067, T068, T069, T070 (performance) can run parallel
- T071, T072 (documentation) can run parallel

---

## Implementation Strategy

### MVP (Minimum Viable Product)
- **Scope**: User Story 1 only (T001-T022)
- **Deliverable**: Static display of 12 gifts with image fallback handling
- **Value**: Users can see the carol visualization
- **Testing**: US1 acceptance criteria fully met

### Increment 2
- **Scope**: +US2 (T023-T032)
- **Deliverable**: Interactive hover animations
- **Value**: Users can interact with gifts
- **Testing**: US1 + US2 acceptance criteria met

### Increment 3
- **Scope**: +US3 (T033-T049)
- **Deliverable**: Audio playback with desktop/mobile handling
- **Value**: Full audio-visual experience
- **Testing**: US1 + US2 + US3 acceptance criteria met

### Increment 4
- **Scope**: +US4 (T050-T059)
- **Deliverable**: Lyrics display for accessibility
- **Value**: Complete feature with accessibility support
- **Testing**: All acceptance criteria met

### Polish
- **Scope**: Phase 7 (T060-T072)
- **Deliverable**: Production-ready app with full browser compatibility
- **Value**: High-quality, performant, well-documented application

---

## Task Count Summary

- **Setup**: 7 tasks
- **Foundational**: 6 tasks
- **US1 (P1)**: 9 tasks (3 tests + 6 implementation)
- **US2 (P2)**: 10 tasks (3 tests + 7 implementation)
- **US3 (P3)**: 17 tasks (4 tests + 13 implementation)
- **US4 (P4)**: 10 tasks (2 tests + 8 implementation)
- **Polish**: 13 tasks

**Total**: 72 tasks

**Parallel Opportunities**: 35+ tasks can run in parallel (marked with [P])

**Independent Stories**: US2, US3, US4 can each be tested independently once US1 is complete
