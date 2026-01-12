# Quick Start Guide: Gift Detail Pages

**Feature**: 002-gift-detail-page
**For**: Developers implementing this feature
**Date**: 2025-12-19

## Overview

This guide provides a step-by-step walkthrough for implementing clickable gift detail pages with Wikipedia-style content.

## Prerequisites

- React 19.2 application (already set up)
- Existing `gifts.js` data file
- Vite build configuration
- Jest + React Testing Library (for tests)

## Implementation Steps

### Step 1: Create Gift Content Data (Est: 30-60 min per gift)

Create `/Users/kieranfinn/speckit-test/test-project/src/data/giftContent.js`:

```javascript
export const giftContent = {
  1: {
    title: "A Partridge in a Pear Tree",
    subtitle: "The Foundation of the Twelve Days",
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          "The partridge represents Christ in medieval Christian symbolism, while the pear tree symbolizes the cross or the Tree of Life.",
          "This gift appears in all twelve verses of the carol, making it the most frequently mentioned."
        ],
        citations: [1]
      },
      {
        id: "history",
        heading: "History",
        paragraphs: [
          "The partridge was first documented as part of this carol in 1780 in a children's book.",
          "The French version 'Une Perdrix' predates the English version by several decades."
        ]
      },
      {
        id: "cultural",
        heading: "Cultural Significance",
        paragraphs: [
          "The phrase 'a partridge in a pear tree' has entered popular culture as a symbol of Christmas giving.",
          "Modern interpretations often focus on the absurdity of the gift, as partridges don't actually nest in pear trees."
        ]
      },
      {
        id: "traditions",
        heading: "Related Traditions",
        paragraphs: [
          "Various interpretations of the symbolism exist across different Christian traditions."
        ],
        list: [
          "Some scholars argue 'pear tree' is a corruption of French 'perdrix' (partridge)",
          "The gift appears in children's counting games",
          "Modern parodies often focus on the impracticality of the gift"
        ]
      }
    ],
    references: [
      { id: 1, text: "Smith, J. (2020). Christmas Ornithology. Oxford University Press." }
    ]
  },
  // Repeat for gifts 2-12
};
```

**Content Writing Tips**:
- Keep paragraphs concise (2-4 sentences)
- Include 2-3 paragraphs per section
- Add citations for factual claims
- Use bullet lists for fun facts in "traditions" section
- Target 2-4 KB per gift

**Research Resources**:
- Wikipedia articles on each gift
- Historical carol references
- Cultural significance of medieval symbols

### Step 2: Create Routing Hook (Est: 15 min)

Create `/Users/kieranfinn/speckit-test/test-project/src/hooks/useRouter.js`:

```javascript
import { useState, useEffect } from 'react';

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

### Step 3: Create Content Loader Hook (Est: 10 min)

Create `/Users/kieranfinn/speckit-test/test-project/src/hooks/useContentLoader.js`:

```javascript
import { giftContent } from '../data/giftContent';

export function useContentLoader(giftId) {
  const content = giftContent[giftId] || null;
  const error = content === null;
  const loading = false;  // Instant for bundled content

  return { content, error, loading };
}
```

### Step 4: Add Spin Animation (Est: 10 min)

Extend `/Users/kieranfinn/speckit-test/test-project/src/styles/animations.css`:

```css
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

### Step 5: Modify GiftCard Component (Est: 15 min)

Update `/Users/kieranfinn/speckit-test/test-project/src/components/GiftCard.jsx`:

```javascript
import { useState, useEffect, useRef } from 'react';

function GiftCard({ gift, onNavigate }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { currentlyPlaying, play, stop } = useAudio();
  const timeoutRef = useRef(null);

  // Existing hover/audio logic...

  const handleClick = (e) => {
    e.preventDefault();

    // Stop any playing audio
    stop();

    // Start spin animation
    setIsSpinning(true);

    // Navigate after animation
    timeoutRef.current = setTimeout(() => {
      onNavigate(gift.id);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const className = `gift ${isAnimating ? 'gift--animating' : ''} ${isSpinning ? 'gift--spinning' : ''}`;

  return (
    <div
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        left: `${gift.position.x}%`,
        top: `${gift.position.y}%`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer'
      }}
    >
      {/* Existing gift content */}
    </div>
  );
}
```

### Step 6: Create BackButton Component (Est: 10 min)

Create `/Users/kieranfinn/speckit-test/test-project/src/components/BackButton.jsx`:

```javascript
function BackButton({ onClick }) {
  return (
    <button
      className="back-button"
      onClick={onClick}
      aria-label="Return to main page"
    >
      ← Back
    </button>
  );
}

export default BackButton;
```

Create `/Users/kieranfinn/speckit-test/test-project/src/styles/backButton.css`:

```css
.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  z-index: 1000;
  transition: background 0.2s;
}

.back-button:hover {
  background: #fff;
}

.back-button:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
```

### Step 7: Create GiftDetailContent Component (Est: 20 min)

Create `/Users/kieranfinn/speckit-test/test-project/src/components/GiftDetailContent.jsx`:

```javascript
function GiftDetailContent({ content }) {
  return (
    <article className="detail-content">
      <h1 className="detail-content__title">{content.title}</h1>
      {content.subtitle && (
        <h2 className="detail-content__subtitle">{content.subtitle}</h2>
      )}

      {content.sections.map(section => (
        <section key={section.id} className="detail-content__section">
          <h3 className="detail-content__heading">{section.heading}</h3>

          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="detail-content__paragraph">
              {paragraph}
              {section.citations && (
                <sup className="citations">
                  {section.citations.map(citeId => (
                    <a key={citeId} href={`#ref-${citeId}`}>
                      [{citeId}]
                    </a>
                  ))}
                </sup>
              )}
            </p>
          ))}

          {section.list && (
            <ul className="detail-content__list">
              {section.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {content.references && content.references.length > 0 && (
        <footer className="detail-content__references">
          <h4>References</h4>
          <ol>
            {content.references.map(ref => (
              <li key={ref.id} id={`ref-${ref.id}`}>
                {ref.text}
              </li>
            ))}
          </ol>
        </footer>
      )}
    </article>
  );
}

export default GiftDetailContent;
```

### Step 8: Create GiftDetailPage Component (Est: 20 min)

Create `/Users/kieranfinn/speckit-test/test-project/src/components/GiftDetailPage.jsx`:

```javascript
import { useContentLoader } from '../hooks/useContentLoader';
import { gifts } from '../data/gifts';
import BackButton from './BackButton';
import GiftDetailContent from './GiftDetailContent';
import { useImageFallback } from '../hooks/useImageFallback';

function GiftDetailPage({ giftId, onBack }) {
  const gift = gifts.find(g => g.id === giftId);
  const { content, error } = useContentLoader(giftId);
  const { imageSrc, isError } = useImageFallback(gift?.imagePath, gift?.asciiArt);

  if (error || !content || !gift) {
    return (
      <div className="error-fallback">
        <BackButton onClick={onBack} />
        <div className="error-fallback__content">
          <p className="error-fallback__message">
            Content unavailable for this gift
          </p>
          <button onClick={onBack} className="error-fallback__button">
            Return to Main Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <BackButton onClick={onBack} />

      <div className="detail-page__hero">
        {isError ? (
          <pre className="detail-page__ascii">{gift.asciiArt}</pre>
        ) : (
          <img
            className="detail-page__image"
            src={imageSrc}
            alt={gift.name}
          />
        )}
      </div>

      <GiftDetailContent content={content} />
    </div>
  );
}

export default GiftDetailPage;
```

### Step 9: Update App Component (Est: 15 min)

Modify `/Users/kieranfinn/speckit-test/test-project/src/components/App.jsx`:

```javascript
import { useRouter, matchRoute } from '../hooks/useRouter';
import { gifts } from '../data/gifts';
import GiftCard from './GiftCard';
import GiftDetailPage from './GiftDetailPage';
import LyricsDisplay from './LyricsDisplay';
import AudioIndicator from './AudioIndicator';
import './App.css';

function App() {
  const { currentPath, navigate } = useRouter();
  const route = matchRoute(currentPath);

  // Detail page view
  if (route.type === 'detail') {
    return (
      <GiftDetailPage
        giftId={route.id}
        onBack={() => navigate('/')}
      />
    );
  }

  // 404 page view
  if (route.type === 'notfound') {
    return (
      <div className="not-found">
        <h1>Page Not Found</h1>
        <button onClick={() => navigate('/')}>
          Return to Main Page
        </button>
      </div>
    );
  }

  // Home page view (existing code with modification)
  return (
    <div className="app">
      <LyricsDisplay lyrics={currentLyrics} />
      <AudioIndicator />

      <div className="gifts-container">
        {gifts.map(gift => (
          <GiftCard
            key={gift.id}
            gift={gift}
            onNavigate={(id) => navigate(`/gift/${id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
```

### Step 10: Add Detail Page Styles (Est: 30 min)

Create `/Users/kieranfinn/speckit-test/test-project/src/styles/detailPage.css`:

```css
/* Detail Page Container */
.detail-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px 40px;
  background: #fff;
  min-height: 100vh;
}

/* Hero Image */
.detail-page__hero {
  text-align: center;
  margin-bottom: 40px;
}

.detail-page__image {
  max-width: 100%;
  height: auto;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.detail-page__ascii {
  font-size: 24px;
  line-height: 1.2;
  margin: 0;
}

/* Content Styles (Wikipedia-like) */
.detail-content {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.6;
  color: #202122;
}

.detail-content__title {
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 4px;
  border-bottom: 1px solid #a2a9b1;
  padding-bottom: 8px;
}

.detail-content__subtitle {
  font-size: 18px;
  color: #54595d;
  margin-top: 0;
  margin-bottom: 24px;
  font-weight: 400;
}

.detail-content__section {
  margin-bottom: 32px;
}

.detail-content__heading {
  font-size: 24px;
  font-weight: 400;
  margin-top: 24px;
  margin-bottom: 12px;
  border-bottom: 1px solid #a2a9b1;
}

.detail-content__paragraph {
  margin-bottom: 16px;
  text-align: justify;
}

.detail-content__list {
  margin-left: 24px;
  margin-bottom: 16px;
}

.detail-content__list li {
  margin-bottom: 8px;
}

/* Citations */
.citations {
  font-size: 12px;
  margin-left: 2px;
}

.citations a {
  color: #0645ad;
  text-decoration: none;
}

.citations a:hover {
  text-decoration: underline;
}

/* References Section */
.detail-content__references {
  margin-top: 48px;
  padding-top: 16px;
  border-top: 1px solid #a2a9b1;
  font-size: 14px;
}

.detail-content__references h4 {
  font-size: 18px;
  margin-bottom: 12px;
}

.detail-content__references ol {
  margin-left: 24px;
}

.detail-content__references li {
  margin-bottom: 8px;
}

/* Error Fallback */
.error-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
}

.error-fallback__message {
  font-size: 20px;
  margin-bottom: 20px;
  color: #721c24;
}

.error-fallback__button {
  padding: 10px 20px;
  font-size: 16px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-fallback__button:hover {
  background: #0056b3;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .detail-page {
    padding: 60px 16px 24px;
  }

  .detail-content__title {
    font-size: 24px;
  }

  .detail-content__heading {
    font-size: 20px;
  }

  .detail-page__image {
    max-height: 250px;
  }
}
```

Import in `App.jsx`:
```javascript
import '../styles/detailPage.css';
import '../styles/backButton.css';
```

### Step 11: Write Tests (Est: 1-2 hours)

See `contracts/components.md` for test examples. Key tests:

```javascript
// tests/unit/useRouter.test.js
// tests/unit/useContentLoader.test.js
// tests/unit/GiftDetailPage.test.jsx
// tests/integration/navigation.test.jsx
// tests/e2e/giftDetailJourney.spec.js
```

### Step 12: Manual Testing Checklist

- [ ] Click each gift → spins → navigates to detail page
- [ ] Detail page shows correct content for each gift
- [ ] "← Back" button returns to main page
- [ ] Browser back button works
- [ ] Direct URL access works (`/gift/5`)
- [ ] Invalid URLs show 404
- [ ] Mobile responsive (320px - 1920px)
- [ ] All 4 sections render correctly
- [ ] References render correctly
- [ ] Error fallback shows for missing content

## Common Issues & Solutions

### Issue: Spin animation doesn't work
**Solution**: Ensure `transform` property in base `.gift` class includes `translate(-50%, -50%)` so animation keyframe can override it.

### Issue: Browser back button doesn't work
**Solution**: Verify `popstate` event listener is attached in `useRouter` hook.

### Issue: Content appears as `[object Object]`
**Solution**: Check that you're rendering `paragraph` string, not the section object.

### Issue: References don't link correctly
**Solution**: Ensure reference `id` in citations matches the `id` attribute in the `<li>`.

## Performance Optimization

After implementation, verify:
- Bundle size <90 KB gzipped
- Navigation <1s
- Page load <2s
- 60 fps animation
- No console errors

## Next Steps

After implementation:
1. Run full test suite: `npm test`
2. Run e2e tests: `npm run test:e2e`
3. Run linter: `npm run lint`
4. Build production: `npm run build`
5. Manual QA on multiple devices
6. Create git commit with `[TASK-###]` format

## Resources

- [React Router patterns](https://reactrouter.com) (for comparison)
- [CSS animations guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [History API docs](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- Wikipedia style guide (for content writing)
