# Research: Gift Detail Page Implementation

**Feature**: 002-gift-detail-page
**Date**: 2025-12-19
**Phase**: 0 - Research & Technology Decisions

## Overview

This document consolidates research findings for implementing clickable gift detail pages with Wikipedia-style content, client-side routing, and spin animations.

## Research Questions & Decisions

### 1. Client-Side Routing Solution

**Question**: Which routing approach should be used for 1 main page + 12 detail pages with direct URL access and browser back button support?

**Decision**: Use Browser History API directly (no routing library)

**Rationale**:
- **Minimal bundle impact**: 0 KB added (vs 13-25 KB for routing libraries)
- **Simple requirements**: Only 13 static routes with no data loading, nested layouts, or complex state
- **Full control**: ~50-100 lines of custom code, easy to understand and modify
- **Constitution alignment**: YAGNI principle - routing libraries would add unused features
- **Perfect fit**: Direct URL access and browser back button work natively with History API

**Alternatives Considered**:
- **React Router v6/v7**: Industry standard, excellent docs, but adds ~13-15 KB for features not needed (nested routing, data loaders, form handling)
- **TanStack Router**: Best-in-class TypeScript support, but largest bundle (~20-25 KB) and designed for complex URL state management

**Implementation Approach**:
```javascript
// Custom hook: useRouter.js
export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return { currentPath, navigate };
}

// Route matching
export function matchRoute(path) {
  if (path === '/' || path === '') return { type: 'home' };

  const detailMatch = path.match(/^\/gift\/(\d+)$/);
  if (detailMatch) {
    const id = parseInt(detailMatch[1], 10);
    if (id >= 1 && id <= 12) return { type: 'detail', id };
  }

  return { type: 'notfound' };
}
```

**Route Structure**:
- Home: `/`
- Detail pages: `/gift/1` through `/gift/12`
- 404: Any other path

---

### 2. Static Content Bundling & Loading

**Question**: How should Wikipedia-style content (12 files, ~2-4 KB each) be stored and loaded for instant display (<2s)?

**Decision**: Embed content as JavaScript objects (Approach C)

**Rationale**:
- **Zero network requests**: Content bundled with app = instant display, no loading states
- **Optimal bundle size**: +12-24 KB gzipped (total ~75-87 KB gzipped, well under budget)
- **Maximum simplicity**: No Vite plugins, no markdown parsers, no runtime fetching
- **Constitution alignment**: YAGNI, matches existing `gifts.js` pattern
- **Flexible structure**: JavaScript objects enable Wikipedia-style sections with flexible rendering
- **Built-in error handling**: Missing content = build-time error, not runtime surprise
- **Easy testing**: Simple object validation with Jest

**Alternatives Considered**:
- **Vite Markdown plugin**: Adds ~150 KB dependencies (plugin + parser), requires build config, violates YAGNI
- **HTML in public/ with fetch**: 12 separate network requests, loading states, cache complexity, harder testing

**Implementation Structure**:
```javascript
// src/data/giftContent.js
export const giftContent = {
  1: {
    title: "A Partridge in a Pear Tree",
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: ["The partridge represents...", "..."]
      },
      {
        id: "history",
        heading: "History",
        paragraphs: ["First documented in 1780..."]
      },
      {
        id: "cultural",
        heading: "Cultural Significance",
        paragraphs: ["The phrase has entered..."]
      },
      {
        id: "traditions",
        heading: "Related Traditions",
        paragraphs: ["Modern interpretations..."]
      }
    ],
    references: [
      { id: 1, text: "Smith, J. (2020). Christmas Ornithology." }
    ]
  },
  // 2-12 follow same pattern
};
```

**Content Sections** (per clarification):
1. Overview
2. History
3. Cultural Significance
4. Related Traditions

**Vite Configuration**: None required (works with existing config)

**Performance Estimate**:
- Current: 63 KB gzipped JS
- With content: 75-87 KB gzipped JS
- Network requests: 1 (unchanged)
- Time to interactive: <1s (unchanged)

---

### 3. CSS Spin Animation

**Question**: How to implement spin animation that triggers on click, works on mobile/desktop, and can be interrupted for fast navigation?

**Decision**: CSS keyframes with React state class toggling

**Rationale**:
- **GPU acceleration**: `transform: rotate()` is hardware-accelerated on all devices
- **Smooth performance**: Creates composite layer, animation runs off main thread
- **Keyframes over transitions**: Better for 360° rotations with precise control
- **Naturally interruptible**: Remove class to stop animation mid-flight
- **Mobile optimized**: No JavaScript animation calculations that cause jank
- **Constitution alignment**: Simple, no animation libraries needed

**Alternatives Considered**:
- **CSS transitions**: Less control, hard to reset cleanly, visual jump when resetting rotation to 0°
- **JavaScript requestAnimationFrame**: More complex, main thread blocking, harder to interrupt
- **Animation libraries (Framer Motion)**: 30-50 KB bundle increase for single animation, violates YAGNI
- **Web Animations API**: More verbose than CSS, unnecessary for simple spin

**Implementation**:
```css
/* src/styles/animations.css (extend existing file) */
@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.gift--spinning {
  animation: spin 0.5s ease-out forwards;
  will-change: transform;
}
```

```jsx
// src/components/GiftCard.jsx (modify existing)
function GiftCard({ gift, onNavigate }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const timeoutRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    setIsSpinning(true);

    timeoutRef.current = setTimeout(() => {
      onNavigate(gift.id);
    }, 500); // Match animation duration
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const className = `gift ${isSpinning ? 'gift--spinning' : ''}`;

  return <div className={className} onClick={handleClick}>{...}</div>;
}
```

**Animation Parameters**:
- **Duration**: 500ms (0.5s) - responsive feel, not sluggish
- **Easing**: `ease-out` - natural deceleration
- **Rotation**: 360° single rotation
- **Performance**: `will-change: transform` applied only during animation

---

## Technology Stack Summary

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Routing | Browser History API | 0 KB, simple 13-route structure |
| Content Storage | JavaScript objects | Instant loading, 0 network requests |
| Content Format | Structured JS objects | Flexible rendering, easy testing |
| Navigation Animation | CSS keyframes | GPU-accelerated, mobile-optimized |
| State Management | React useState/useEffect | Built-in, sufficient for simple needs |

## Dependencies Required

**None!** All solutions use native browser APIs and existing React capabilities.

## Bundle Size Impact

| Current | With Feature | Delta |
|---------|--------------|-------|
| 199 KB JS (63 KB gz) | 223 KB JS (75-87 KB gz) | +12-24 KB gz |
| 1 network request | 1 network request | 0 |

**Result**: Well within performance budget (<2s load time)

## Next Steps

Proceed to **Phase 1: Design & Contracts** to create:
1. Data model for gift content structure
2. Component contracts (props, behavior)
3. Integration quickstart guide
