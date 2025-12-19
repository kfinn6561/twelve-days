# Quickstart Guide: Twelve Days of Christmas Interactive Web App

**Date**: 2025-12-19
**Feature**: 001-twelve-days-webapp

This guide will help you set up, develop, test, and run the Twelve Days of Christmas interactive web application.

---

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, or Safari (latest version)

---

## Initial Setup

### 1. Create the React Application

```bash
# Navigate to project root
cd /Users/kieranfinn/speckit-test/test-project

# Create React app with Vite (fast, modern)
npm create vite@latest frontend -- --template react

# Or use Create React App (more stable, conventional)
# npx create-react-app frontend

# Navigate into frontend directory
cd frontend
```

### 2. Install Dependencies

```bash
# Install core dependencies (already included with Vite/CRA)
# React 18+ is included by default

# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev jest jest-environment-jsdom

# Install Playwright for E2E testing
npm install --save-dev @playwright/test

# Install Playwright browsers
npx playwright install
```

### 3. Project Structure Setup

```bash
# Create directory structure
mkdir -p src/components
mkdir -p src/hooks
mkdir -p src/data
mkdir -p src/assets/images
mkdir -p src/assets/audio
mkdir -p src/styles
mkdir -p tests/unit
mkdir -p tests/integration
mkdir -p tests/__mocks__
```

---

## Development Workflow

### Running the Development Server

```bash
# Start Vite dev server (hot reload enabled)
npm run dev

# App will be available at http://localhost:5173
```

###Testing While Developing

```bash
# Run unit tests in watch mode
npm run test -- --watch

# Run specific test file
npm run test -- GiftCard.test.jsx

# Run tests with coverage
npm run test -- --coverage
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## Testing Guide

### Unit Testing (Jest + React Testing Library)

**Test individual components:**

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run with coverage report
npm run test -- --coverage
```

**Example test file** (`tests/unit/GiftCard.test.jsx`):

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import GiftCard from '../../src/components/GiftCard';

const mockGift = {
  id: 1,
  name: "A partridge in a pear tree",
  lyrics: "A partridge in a pear tree",
  imagePath: "/assets/images/partridge.png",
  audioPath: "/assets/audio/day-1.mp3",
  asciiArt: "ASCII art here",
  position: { x: 50, y: 50 }
};

test('calls onHover when mouse enters', () => {
  const handleHover = jest.fn();
  render(<GiftCard gift={mockGift} onHover={handleHover} onUnhover={() => {}} />);

  const card = screen.getByAltText(mockGift.name);
  fireEvent.mouseEnter(card);

  expect(handleHover).toHaveBeenCalledWith(mockGift);
});
```

### E2E Testing (Playwright)

**Run end-to-end tests:**

```bash
# Run all E2E tests
npx playwright test

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test tests/e2e/gift-interaction.spec.js

# Debug mode (opens inspector)
npx playwright test --debug
```

**Example E2E test** (`tests/e2e/gift-interaction.spec.js`):

```javascript
import { test, expect } from '@playwright/test';

test('hovering gift plays audio and shows lyrics', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Hover on first gift
  await page.hover('[data-testid="gift-1"]');

  // Check animation applied
  await expect(page.locator('[data-testid="gift-1"]')).toHaveClass(/hovering/);

  // Verify lyrics displayed
  await expect(page.locator('[data-testid="lyrics"]'))
    .toHaveText('A partridge in a pear tree');

  // Verify no errors
  await expect(page.locator('[data-testid="error"]')).not.toBeVisible();
});
```

---

## Asset Management

### Adding Gift Images

1. Place images in `frontend/src/assets/images/`
2. Name them consistently: `day-1.png`, `day-2.png`, etc.
3. Recommended size: 200×200px to 400×400px
4. Format: PNG with transparency or JPG
5. Optimize images before adding (use tools like TinyPNG)

### Adding Audio Files

1. Place audio files in `frontend/src/assets/audio/`
2. Name them consistently: `day-1.mp3`, `day-2.mp3`, etc.
3. Recommended format: MP3 (best browser compatibility)
4. Keep files small: aim for <200KB per file
5. Ensure audio is clear and volume-normalized

### Updating Gift Data

Edit `frontend/src/data/gifts.js`:

```javascript
export const gifts = [
  {
    id: 1,
    name: "A partridge in a pear tree",
    shortName: "partridge",
    lyrics: "A partridge in a pear tree",
    imagePath: "/assets/images/day-1.png",
    audioPath: "/assets/audio/day-1.mp3",
    asciiArt: `ASCII art for partridge`,
    position: { x: 50, y: 50 }
  },
  // ... 11 more gifts
];
```

---

## Development Tips

### Hot Reload

Vite automatically reloads when you save files:
- Component changes → Fast refresh (preserves state)
- Style changes → Instant update
- Config changes → Full reload

### Debugging

**Browser DevTools:**
```bash
# Open Chrome DevTools
# Mac: Cmd + Option + I
# Windows/Linux: F12 or Ctrl + Shift + I
```

**React DevTools:**
```bash
# Install React DevTools browser extension
# Chrome: https://chrome.google.com/webstore (search "React Developer Tools")
# Firefox: https://addons.mozilla.org/en-US/firefox/addon/react-devtools/
```

**Console Logging:**
```javascript
// In components
console.log('Gift hovered:', gift);

// Check audio status
console.log('Audio element:', audioElement, 'Can play:', audioElement?.paused);
```

### Performance Monitoring

```javascript
// React DevTools Profiler
// Open React DevTools → Profiler tab → Record interaction
// Analyze component render times

// Browser Performance
// DevTools → Performance tab → Record page load
// Look for long tasks, layout shifts
```

---

## Common Issues & Solutions

### Issue: Audio doesn't play on hover

**Cause**: Browser autoplay policy blocking audio

**Solution**:
1. Interact with page first (click anywhere)
2. Implement user-initiated audio unlock
3. Show AudioIndicator to inform user

```javascript
// Add to App.jsx
useEffect(() => {
  const unlockAudio = () => {
    const audio = new Audio();
    audio.play().catch(() => {});
    document.removeEventListener('click', unlockAudio);
  };
  document.addEventListener('click', unlockAudio);
}, []);
```

### Issue: Images not loading

**Cause**: Incorrect path or missing files

**Solution**:
1. Verify images exist in `src/assets/images/`
2. Check import paths in `gifts.js`
3. Ensure Vite is configured to serve static assets

```javascript
// Correct path (Vite)
imagePath: "/assets/images/day-1.png"

// Or with import
import day1 from './assets/images/day-1.png';
const gifts = [{ imagePath: day1, ... }];
```

### Issue: Tests fail with "Audio is not defined"

**Cause**: jsdom doesn't support Audio API

**Solution**: Mock Audio in `tests/__mocks__/audio.js`

```javascript
// tests/__mocks__/audio.js
global.Audio = class Audio {
  constructor() {
    this.play = jest.fn(() => Promise.resolve());
    this.pause = jest.fn();
    this.addEventListener = jest.fn();
  }
};
```

### Issue: Scattered layout overlaps on mobile

**Cause**: Fixed positions don't account for screen size

**Solution**: Use responsive positioning

```css
/* styles/layout.css */
@media (max-width: 768px) {
  .gift {
    position: relative !important;
    display: inline-block;
    margin: 1rem;
  }
}
```

---

## Code Quality Checks

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Formatting

```bash
# Install Prettier (optional)
npm install --save-dev prettier

# Format code
npx prettier --write "src/**/*.{js,jsx,css}"
```

### Type Checking (if using JSDoc)

```bash
# Add to package.json scripts:
# "check-types": "tsc --noEmit --allowJs --checkJs src/**/*.js"

npm run check-types
```

---

## Deployment

### Build for Production

```bash
# Create optimized build
npm run build

# Output will be in frontend/dist/
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json:
# "homepage": "https://yourusername.github.io/twelve-days",
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

---

## Configuration Files

### `package.json` Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest",
    "test:e2e": "playwright test",
    "lint": "eslint src"
  }
}
```

### `jest.config.js`

```javascript
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/tests/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
};
```

### `playwright.config.js`

```javascript
export default {
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  webServer: {
    command: 'npm run dev',
    port: 5173
  }
};
```

---

## Next Steps

1. **Implement components**: Start with GiftCard, then LyricsDisplay, AudioPlayer
2. **Add test coverage**: Write tests alongside each component
3. **Gather assets**: Create or source 12 gift images and audio files
4. **Style the app**: Add CSS animations and scattered layout
5. **Run E2E tests**: Verify full user flow works
6. **Deploy**: Ship to production hosting

---

## Support & Resources

- **React Documentation**: https://react.dev
- **Vite Documentation**: https://vitejs.dev
- **Testing Library**: https://testing-library.com/react
- **Playwright**: https://playwright.dev
- **Project Spec**: `/specs/001-twelve-days-webapp/spec.md`
- **Data Model**: `/specs/001-twelve-days-webapp/data-model.md`
- **Component Contracts**: `/specs/001-twelve-days-webapp/contracts/components.md`
