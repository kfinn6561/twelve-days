# Twelve Days of Christmas - Interactive Web App

An interactive web application that brings the classic "Twelve Days of Christmas" carol to life with beautiful visuals, animations, and audio.

## Features

- 🎁 **12 Interactive Gifts**: Hover over or tap any gift to experience it
- 🎵 **Audio Playback**: Each gift plays its corresponding verse from the carol
- 📝 **Lyrics Display**: See the lyrics appear at the top when interacting with gifts
- ✨ **Smooth Animations**: Gifts bounce and float when hovered
- 📱 **Mobile Responsive**: Works beautifully on desktop, tablet, and mobile
- 🎨 **ASCII Art Fallbacks**: Graceful degradation if images fail to load
- 🔇 **Audio Error Handling**: App continues working even if audio is unavailable

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

## How to Use

1. **Enable Audio**: When you first load the page, click the "Click to Enable Audio" button
   - This is required by browsers before audio can play automatically

2. **Explore Gifts**: Hover over (desktop) or tap (mobile) any of the 12 gifts

3. **Experience the Carol**:
   - 🎵 Audio of that verse plays
   - 📝 Lyrics appear at the top
   - ✨ Gift animates with a bounce effect

## Desktop vs Mobile Behavior

The app adapts its behavior based on your device:

### Desktop (Mouse)
- **Interaction**: Hover your mouse over gifts
- **Audio**: Plays while hovering, stops immediately when you move away
- **Animation**: Continuous bounce loop while hovering
- **Layout**: Gifts scattered across full viewport

### Mobile (Touch)
- **Interaction**: Tap on gifts
- **Audio**: Plays the full verse even after you lift your finger
- **Animation**: Continues bouncing until the audio finishes
- **Layout**: Gifts scaled down to fit smaller screens

## Browser Support

Tested and working in:
- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

## Technology Stack

- **React 18+**: UI framework
- **Vite**: Build tool and dev server
- **HTML5 Audio API**: Audio playback
- **CSS3 Animations**: Smooth gift animations
- **Jest + React Testing Library**: Unit testing
- **Playwright**: E2E testing

## Project Structure

```
├── src/
│   ├── components/       # React components
│   │   ├── App.jsx               # Main app component
│   │   ├── GiftCard.jsx          # Individual gift component
│   │   ├── LyricsDisplay.jsx     # Lyrics display component
│   │   ├── AudioPermissionPrompt.jsx  # Audio enable prompt
│   │   └── AudioIndicator.jsx    # Audio error indicator
│   ├── data/             # Static data
│   │   └── gifts.js              # Gift data (images, audio, lyrics)
│   ├── hooks/            # Custom React hooks
│   │   ├── useImageFallback.js   # Image loading with fallback
│   │   └── useAudio.js           # Audio state management
│   ├── services/         # Business logic
│   │   └── platformDetection.js # Detect desktop vs mobile
│   ├── styles/           # CSS files
│   │   ├── App.css               # Base styles
│   │   ├── animations.css        # Animation keyframes
│   │   ├── layout.css            # Layout and positioning
│   │   └── lyrics.css            # Lyrics display styles
│   └── main.jsx          # App entry point
├── public/
│   └── assets/
│       ├── images/       # Gift images (day-1.png through day-12.png)
│       └── audio/        # Audio files (day-1.mp3 through day-12.mp3)
└── tests/
    ├── unit/             # Unit tests
    └── e2e/              # End-to-end tests
```

## Testing

### Run Unit Tests

```bash
npm test
```

### Run E2E Tests

```bash
npx playwright test
```

### Run E2E Tests in Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Performance

- ⚡ **Page Load**: < 3 seconds on standard broadband
- 🖱️ **Hover Response**: < 100ms
- 🎵 **Audio Start**: < 200ms after interaction

## Troubleshooting

### Audio Not Playing

1. Make sure you clicked "Enable Audio" when prompted
2. Check browser console for errors
3. Try refreshing the page
4. Ensure your browser supports HTML5 Audio

### Images Not Loading

- The app will automatically fall back to ASCII art if images fail
- Check that files exist in `public/assets/images/`
- Check browser console for 404 errors

### App Not Loading

1. Ensure dev server is running (`npm run dev`)
2. Check that port 5173 is not in use
3. Try clearing browser cache
4. Check browser console for errors

## License

This project was created as an educational demonstration.

## Credits

- Audio: "The Twelve Days of Christmas" (Public Domain)
- Images: Various sources (Unsplash, Pixabay, etc.)
- Built with ❤️ using React and Vite
