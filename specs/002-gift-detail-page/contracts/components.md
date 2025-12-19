# Component Contracts

**Feature**: 002-gift-detail-page
**Date**: 2025-12-19

## Overview

This document defines the contracts (props, behavior, events) for all components involved in the gift detail page feature.

---

## 1. GiftCard (Modified Existing Component)

**Location**: `src/components/GiftCard.jsx`

**Purpose**: Display gift on main page with click navigation to detail page

**Props**:
```typescript
interface GiftCardProps {
  gift: Gift;                    // Gift data from gifts.js
  onNavigate: (giftId: number) => void;  // Navigation callback
}
```

**New Behavior**:
- On click: Start spin animation
- After 500ms: Call `onNavigate(gift.id)`
- Cleanup: Clear timeout on unmount

**State**:
```typescript
{
  isSpinning: boolean           // Controls CSS animation class
}
```

**CSS Classes**:
- Base: `gift`
- Spinning: `gift gift--spinning`

**Events**:
- `onClick`: Start spin animation and navigation
- `onAnimationEnd`: (optional) Alternative to setTimeout

**Contract**:
```javascript
// Usage
<GiftCard
  gift={gifts[0]}
  onNavigate={(id) => navigate(`/gift/${id}`)}
/>

// Behavior
1. User clicks → isSpinning = true → CSS animation starts
2. After 500ms → onNavigate(gift.id) called
3. If unmounted during animation → timeout cleared
```

---

## 2. GiftDetailPage (New Component)

**Location**: `src/components/GiftDetailPage.jsx`

**Purpose**: Container for detail page with image, content, and navigation

**Props**:
```typescript
interface GiftDetailPageProps {
  giftId: number;                // 1-12
  onBack: () => void;            // Navigate back to home
}
```

**Responsibilities**:
- Load gift data by ID
- Load gift content by ID
- Render BackButton
- Render gift image
- Render GiftDetailContent
- Handle missing content error state

**State**:
```typescript
{
  content: GiftContent | null,
  error: boolean
}
```

**Rendering Logic**:
```javascript
if (error || !content) {
  return (
    <ErrorFallback
      message="Content unavailable for this gift"
      onBack={onBack}
    />
  );
}

return (
  <div className="detail-page">
    <BackButton onClick={onBack} />
    <img src={gift.imagePath} alt={gift.name} />
    <GiftDetailContent content={content} />
  </div>
);
```

**Contract**:
```javascript
// Usage
<GiftDetailPage
  giftId={5}
  onBack={() => navigate('/')}
/>

// Behavior
1. Loads content for gift #5
2. If content exists → renders detail view
3. If content missing → renders error fallback
4. Back button → calls onBack()
```

---

## 3. GiftDetailContent (New Component)

**Location**: `src/components/GiftDetailContent.jsx`

**Purpose**: Render Wikipedia-style article content

**Props**:
```typescript
interface GiftDetailContentProps {
  content: GiftContent;
}
```

**Rendering**:
- Article title
- Subtitle (if present)
- All 4 sections with headings
- Paragraphs within each section
- Optional lists (bullet points)
- References section at bottom (if present)

**CSS Classes**:
- Container: `detail-content`
- Title: `detail-content__title`
- Section: `detail-content__section`
- Heading: `detail-content__heading`
- Paragraph: `detail-content__paragraph`
- References: `detail-content__references`

**Contract**:
```javascript
// Usage
<GiftDetailContent content={giftContent[1]} />

// Renders
<article className="detail-content">
  <h1>{content.title}</h1>
  <h2>{content.subtitle}</h2>

  {content.sections.map(section => (
    <section key={section.id}>
      <h3>{section.heading}</h3>
      {section.paragraphs.map(p => <p>{p}</p>)}
      {section.list && <ul>{section.list.map(item => <li>{item}</li>)}</ul>}
    </section>
  ))}

  {content.references && (
    <footer>
      <h4>References</h4>
      <ol>{content.references.map(ref => <li>{ref.text}</li>)}</ol>
    </footer>
  )}
</article>
```

---

## 4. BackButton (New Component)

**Location**: `src/components/BackButton.jsx`

**Purpose**: Navigation button to return to main page

**Props**:
```typescript
interface BackButtonProps {
  onClick: () => void;
}
```

**Rendering**:
```html
<button className="back-button" onClick={onClick}>
  ← Back
</button>
```

**Position**: Top of page (fixed or absolute positioning)

**Accessibility**:
- `aria-label="Return to main page"`
- Keyboard accessible (native button)
- Visible focus indicator

**Contract**:
```javascript
// Usage
<BackButton onClick={() => navigate('/')} />

// Behavior
User clicks/presses Enter → onClick() called → navigation occurs
```

---

## 5. App (Modified Existing Component)

**Location**: `src/components/App.jsx`

**Purpose**: Root component with routing logic

**New Responsibilities**:
- Use `useRouter()` hook for navigation
- Parse current route
- Render appropriate page based on route

**Routing Logic**:
```javascript
function App() {
  const { currentPath, navigate } = useRouter();
  const route = matchRoute(currentPath);

  if (route.type === 'home') {
    return (
      <div className="main-page">
        {gifts.map(gift => (
          <GiftCard
            key={gift.id}
            gift={gift}
            onNavigate={(id) => navigate(`/gift/${id}`)}
          />
        ))}
      </div>
    );
  }

  if (route.type === 'detail') {
    return (
      <GiftDetailPage
        giftId={route.id}
        onBack={() => navigate('/')}
      />
    );
  }

  return (
    <NotFound onBack={() => navigate('/')} />
  );
}
```

**Contract**:
- URL changes → route updates → appropriate page renders
- User navigates → `navigate()` called → URL + route update
- Browser back/forward → route updates automatically

---

## 6. ErrorFallback (New Component)

**Location**: `src/components/ErrorFallback.jsx` (or inline in GiftDetailPage)

**Purpose**: Display error message when content unavailable

**Props**:
```typescript
interface ErrorFallbackProps {
  message: string;
  onBack: () => void;
}
```

**Rendering**:
```html
<div className="error-fallback">
  <p className="error-fallback__message">{message}</p>
  <BackButton onClick={onBack} />
</div>
```

**Contract**:
```javascript
// Usage
<ErrorFallback
  message="Content unavailable for this gift"
  onBack={() => navigate('/')}
/>
```

---

## Hooks

### useRouter

**Location**: `src/hooks/useRouter.js`

**Purpose**: Manage browser navigation state

**Returns**:
```typescript
{
  currentPath: string;
  navigate: (path: string) => void;
}
```

**Implementation**:
```javascript
export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return { currentPath, navigate };
}
```

**Contract**:
- Initial state: Current browser URL
- `navigate('/path')`: Updates URL without reload, triggers re-render
- Browser back/forward: Automatically updates currentPath
- Cleanup: Removes event listener on unmount

---

### useContentLoader

**Location**: `src/hooks/useContentLoader.js`

**Purpose**: Load gift content by ID

**Signature**:
```typescript
function useContentLoader(giftId: number): {
  content: GiftContent | null;
  error: boolean;
  loading: boolean;  // Always false for bundled content
}
```

**Implementation**:
```javascript
import { giftContent } from '../data/giftContent';

export function useContentLoader(giftId) {
  const content = giftContent[giftId] || null;
  const error = content === null;
  const loading = false;  // Instant for bundled content

  return { content, error, loading };
}
```

**Contract**:
- Valid ID (1-12): Returns content, error=false
- Invalid ID: Returns null, error=true
- Loading: Always false (synchronous lookup)

---

## Utilities

### matchRoute

**Location**: `src/utils/routing.js` or inline in `useRouter.js`

**Purpose**: Parse URL path into Route object

**Signature**:
```typescript
function matchRoute(path: string): Route
```

**Implementation**:
```javascript
export function matchRoute(path) {
  if (path === '/' || path === '') {
    return { type: 'home' };
  }

  const detailMatch = path.match(/^\/gift\/(\d+)$/);
  if (detailMatch) {
    const id = parseInt(detailMatch[1], 10);
    if (id >= 1 && id <= 12) {
      return { type: 'detail', id };
    }
  }

  return { type: 'notfound' };
}
```

**Contract**:
| Input | Output |
|-------|--------|
| `/` | `{ type: 'home' }` |
| `/gift/1` | `{ type: 'detail', id: 1 }` |
| `/gift/12` | `{ type: 'detail', id: 12 }` |
| `/gift/13` | `{ type: 'notfound' }` |
| `/invalid` | `{ type: 'notfound' }` |

---

## Event Flow Diagrams

### Navigation Flow

```
User clicks gift image
  ↓
GiftCard.onClick()
  ↓
setIsSpinning(true) → CSS animation starts
  ↓
setTimeout(500ms)
  ↓
onNavigate(giftId)
  ↓
navigate(`/gift/${id}`)
  ↓
history.pushState() → URL updates
  ↓
useRouter detects change → currentPath updates
  ↓
App re-renders → route.type === 'detail'
  ↓
GiftDetailPage renders
  ↓
useContentLoader fetches content
  ↓
GiftDetailContent displays article
```

### Back Navigation Flow

```
User clicks "← Back"
  ↓
BackButton.onClick()
  ↓
onBack()
  ↓
navigate('/')
  ↓
history.pushState() → URL updates
  ↓
useRouter detects change → currentPath updates
  ↓
App re-renders → route.type === 'home'
  ↓
Main page with all gifts renders
```

### Browser Back Button Flow

```
User clicks browser back button
  ↓
Browser 'popstate' event fires
  ↓
useRouter handlePopState()
  ↓
setCurrentPath(window.location.pathname)
  ↓
App re-renders with new route
  ↓
Appropriate page renders
```

---

## Testing Contracts

### Component Tests

```javascript
// GiftCard
test('starts spin animation on click', () => {
  const onNavigate = jest.fn();
  render(<GiftCard gift={gifts[0]} onNavigate={onNavigate} />);

  fireEvent.click(screen.getByRole('button'));

  expect(screen.getByRole('button')).toHaveClass('gift--spinning');
});

test('calls onNavigate after animation', async () => {
  jest.useFakeTimers();
  const onNavigate = jest.fn();
  render(<GiftCard gift={gifts[0]} onNavigate={onNavigate} />);

  fireEvent.click(screen.getByRole('button'));
  jest.advanceTimersByTime(500);

  expect(onNavigate).toHaveBeenCalledWith(1);
});

// GiftDetailPage
test('renders content for valid gift ID', () => {
  render(<GiftDetailPage giftId={1} onBack={jest.fn()} />);

  expect(screen.getByText(/partridge/i)).toBeInTheDocument();
});

test('renders error for missing content', () => {
  render(<GiftDetailPage giftId={99} onBack={jest.fn()} />);

  expect(screen.getByText(/content unavailable/i)).toBeInTheDocument();
});

// useRouter
test('updates on navigate call', () => {
  const { result } = renderHook(() => useRouter());

  act(() => {
    result.current.navigate('/gift/5');
  });

  expect(result.current.currentPath).toBe('/gift/5');
  expect(window.location.pathname).toBe('/gift/5');
});
```

---

## Performance Requirements

| Component | Metric | Target |
|-----------|--------|--------|
| GiftCard spin | Animation FPS | 60 fps |
| Route change | Navigation time | <1s |
| Detail page load | Time to interactive | <2s |
| Content rendering | Initial paint | <100ms |
| Back button | Response time | <500ms |

All contracts designed to meet spec requirements: navigation <1s, page load <2s.
