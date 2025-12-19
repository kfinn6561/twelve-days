# Tasks: Gift Detail Page

**Input**: Design documents from `/specs/002-gift-detail-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Test tasks are included per project constitution requirement for comprehensive test coverage.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Project Type**: Single web application
- **Paths**: `src/` and `tests/` at repository root
- All paths shown are absolute from project root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and routing foundation

- [ ] T001 Create spin animation keyframes in src/styles/animations.css
- [ ] T002 [P] Create routing hook in src/hooks/useRouter.js
- [ ] T003 [P] Create content loader hook in src/hooks/useContentLoader.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Create gift content data structure with all 12 gifts in src/data/giftContent.js (Overview, History, Cultural Significance, Related Traditions sections for each)
- [ ] T005 [P] Create BackButton component in src/components/BackButton.jsx
- [ ] T006 [P] Create BackButton styles in src/styles/backButton.css
- [ ] T007 [P] Create detail page styles in src/styles/detailPage.css
- [ ] T008 Create error fallback component in src/components/ErrorFallback.jsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Navigate to Gift Detail (Priority: P1) 🎯 MVP

**Goal**: Enable clickable navigation from main page gift images to detail pages with spin animation

**Independent Test**: Click each of the twelve gift images and verify navigation occurs to a detail page with spin animation during transition

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T009 [P] [US1] Unit test for useRouter hook in tests/unit/useRouter.test.js
- [ ] T010 [P] [US1] Unit test for route matching function in tests/unit/routing.test.js
- [ ] T011 [P] [US1] Unit test for GiftCard click and spin animation in tests/unit/GiftCard.test.jsx
- [ ] T012 [P] [US1] Integration test for click-to-navigate flow in tests/integration/navigation.test.jsx

### Implementation for User Story 1

- [ ] T013 [US1] Modify GiftCard component to add click handler, spin animation state, and navigation callback in src/components/GiftCard.jsx
- [ ] T014 [US1] Update App component to integrate useRouter hook and render based on route type in src/components/App.jsx
- [ ] T015 [US1] Add URL-based routing logic to handle home and detail routes in src/components/App.jsx

**Checkpoint**: At this point, clicking gifts navigates to detail pages (even if empty). Navigation and spin animation work independently.

---

## Phase 4: User Story 2 - View Wikipedia-Style Content (Priority: P1)

**Goal**: Display comprehensive Wikipedia-style content on detail pages with 4 standard sections

**Independent Test**: Navigate to any gift detail page and verify comprehensive, well-formatted content is displayed with all 4 sections (Overview, History, Cultural Significance, Related Traditions)

### Tests for User Story 2

- [ ] T016 [P] [US2] Unit test for useContentLoader hook in tests/unit/useContentLoader.test.js
- [ ] T017 [P] [US2] Unit test for GiftDetailContent component rendering in tests/unit/GiftDetailContent.test.jsx
- [ ] T018 [P] [US2] Unit test for GiftDetailPage component in tests/unit/GiftDetailPage.test.jsx
- [ ] T019 [P] [US2] Integration test for content loading and display in tests/integration/contentDisplay.test.jsx

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create GiftDetailContent component in src/components/GiftDetailContent.jsx
- [ ] T021 [US2] Create GiftDetailPage component integrating content loader and display in src/components/GiftDetailPage.jsx
- [ ] T022 [US2] Update App component to render GiftDetailPage for detail routes in src/components/App.jsx
- [ ] T023 [US2] Verify all 12 gifts have complete content with 4 sections (data validation)

**Checkpoint**: At this point, detail pages display full Wikipedia-style content for all 12 gifts. Content can be viewed independently of navigation features.

---

## Phase 5: User Story 3 - Return to Main Page (Priority: P2)

**Goal**: Provide clear navigation to return from detail pages to main page

**Independent Test**: Navigate to any detail page and verify "← Back" button exists, is clickable, and returns to main page

### Tests for User Story 3

- [ ] T024 [P] [US3] Unit test for BackButton component in tests/unit/BackButton.test.jsx
- [ ] T025 [P] [US3] Integration test for back navigation flow in tests/integration/backNavigation.test.jsx
- [ ] T026 [P] [US3] Integration test for browser back button behavior in tests/integration/browserBackButton.test.jsx

### Implementation for User Story 3

- [ ] T027 [US3] Integrate BackButton into GiftDetailPage with onBack callback in src/components/GiftDetailPage.jsx
- [ ] T028 [US3] Verify browser back button works correctly with history API in src/hooks/useRouter.js
- [ ] T029 [US3] Test direct URL access to detail pages (e.g., /gift/5) works correctly

**Checkpoint**: At this point, users can navigate back from detail pages using both "← Back" button and browser back button.

---

## Phase 6: User Story 4 - Visual Gift Identification (Priority: P3)

**Goal**: Display gift image prominently on detail page for visual confirmation

**Independent Test**: Navigate to each detail page and verify the corresponding gift image is displayed prominently

### Tests for User Story 4

- [ ] T030 [P] [US4] Unit test for gift image rendering in GiftDetailPage in tests/unit/GiftDetailPage.test.jsx
- [ ] T031 [P] [US4] Integration test for image loading and fallback in tests/integration/imageDisplay.test.jsx

### Implementation for User Story 4

- [ ] T032 [US4] Add gift image display to GiftDetailPage component in src/components/GiftDetailPage.jsx
- [ ] T033 [US4] Integrate useImageFallback hook for ASCII fallback in src/components/GiftDetailPage.jsx
- [ ] T034 [US4] Style gift image hero section in detail page layout in src/styles/detailPage.css

**Checkpoint**: All user stories are now independently functional. Detail pages show images with proper fallback handling.

---

## Phase 7: Edge Cases & Error Handling

**Purpose**: Handle error conditions and edge cases across all user stories

- [ ] T035 [P] Test error fallback for missing content in tests/unit/ErrorFallback.test.jsx
- [ ] T036 [P] Test rapid click handling (last click wins) in tests/integration/rapidClicks.test.jsx
- [ ] T037 Test 404 handling for invalid URLs in tests/integration/notFound.test.jsx
- [ ] T038 Implement NotFound component for invalid routes in src/components/NotFound.jsx
- [ ] T039 Update App component to render NotFound for unmatched routes in src/components/App.jsx
- [ ] T040 Verify error fallback displays for missing content in src/components/GiftDetailPage.jsx

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T041 [P] E2E test for complete user journey through multiple detail pages in tests/e2e/giftDetailJourney.spec.js
- [ ] T042 [P] Test mobile responsive layout (320px to 1920px) in tests/e2e/responsive.spec.js
- [ ] T043 [P] Validate content structure for all 12 gifts (automated check)
- [ ] T044 Performance testing: verify navigation <1s, page load <2s
- [ ] T045 [P] Accessibility audit: keyboard navigation, focus indicators, ARIA labels
- [ ] T046 [P] Code cleanup and refactoring across all components
- [ ] T047 Run linter and fix all warnings: npm run lint
- [ ] T048 Run full test suite and verify 100% pass: npm test
- [ ] T049 Build production bundle and verify size <90 KB gzipped: npm run build
- [ ] T050 Manual QA checklist validation per quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Edge Cases (Phase 7)**: Depends on relevant user stories being complete
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - Independent (navigation only)
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Independent (content display only) - OR can start after US1 if sequential
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Independent (back navigation) - Integrates with US1 and US2
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Independent (image display) - Integrates with US2

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Components can be built in parallel if marked [P]
- Integration tasks happen after component tasks
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1 (Setup)**: All 3 tasks [P] can run in parallel
- **Phase 2 (Foundational)**: T005, T006, T007 [P] can run in parallel
- **User Story 1 Tests**: T009, T010, T011, T012 all [P]
- **User Story 2 Tests**: T016, T017, T018, T019 all [P]
- **User Story 2 Implementation**: T020 [P] can run parallel to T023
- **User Story 3 Tests**: T024, T025, T026 all [P]
- **User Story 4 Tests**: T030, T031 [P]
- **Phase 7**: T035, T036 [P]
- **Phase 8**: T041, T042, T043, T045, T046 all [P]

- **Between Stories**: After Foundational completes, all user stories (US1, US2, US3, US4) can be worked on in parallel by different developers

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for useRouter hook in tests/unit/useRouter.test.js"
Task: "Unit test for route matching function in tests/unit/routing.test.js"
Task: "Unit test for GiftCard click and spin animation in tests/unit/GiftCard.test.jsx"
Task: "Integration test for click-to-navigate flow in tests/integration/navigation.test.jsx"

# After tests written, launch implementation:
Task: "Modify GiftCard component to add click handler in src/components/GiftCard.jsx"
Task: "Update App component to integrate useRouter in src/components/App.jsx"
```

## Parallel Example: User Story 2

```bash
# Launch all tests for User Story 2 together:
Task: "Unit test for useContentLoader hook in tests/unit/useContentLoader.test.js"
Task: "Unit test for GiftDetailContent component in tests/unit/GiftDetailContent.test.jsx"
Task: "Unit test for GiftDetailPage component in tests/unit/GiftDetailPage.test.jsx"
Task: "Integration test for content loading in tests/integration/contentDisplay.test.jsx"

# Launch parallel implementation tasks:
Task: "Create GiftDetailContent component in src/components/GiftDetailContent.jsx"
Task: "Verify all 12 gifts have complete content (data validation)"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

Both US1 and US2 are marked P1 and together form the core MVP:

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Navigation)
4. Complete Phase 4: User Story 2 (Content Display)
5. **STOP and VALIDATE**: Test US1 + US2 independently together
6. Deploy/demo if ready - users can click gifts and view content

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Basic navigation works
3. Add User Story 2 → Test independently → Content displays (MVP!)
4. Add User Story 3 → Test independently → Back navigation added
5. Add User Story 4 → Test independently → Images added
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Navigation + Spin)
   - Developer B: User Story 2 (Content Display)
   - Developer C: User Story 3 (Back Navigation)
   - Developer D: User Story 4 (Images)
3. Stories complete and integrate independently
4. Integration happens naturally as all stories modify App.jsx

### Sequential Strategy (Single Developer)

Recommended order for one developer:

1. Phase 1: Setup (30 min)
2. Phase 2: Foundational (2-3 hours - includes writing all content)
3. Phase 3: User Story 1 (1-2 hours including tests)
4. Phase 4: User Story 2 (1-2 hours including tests)
5. **MVP Complete** - Can stop here for initial release
6. Phase 5: User Story 3 (30-60 min including tests)
7. Phase 6: User Story 4 (30-60 min including tests)
8. Phase 7: Edge Cases (1 hour)
9. Phase 8: Polish (1-2 hours)

**Total Estimated Time**: 8-12 hours (depending on content writing speed)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD approach)
- Commit after each task with format: `[TASK-###] Description`
- Stop at any checkpoint to validate story independently
- T004 (content creation) is the longest task - budget 30-60 min per gift
- Constitution requires comprehensive test coverage - all test tasks are mandatory
- Performance targets: navigation <1s, page load <2s, 60fps animation
