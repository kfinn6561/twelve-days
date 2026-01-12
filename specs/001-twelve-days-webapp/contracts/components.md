# Component Contracts

**Date**: 2025-12-19
**Feature**: 001-twelve-days-webapp

This document defines the interface contracts for all React components in the Twelve Days of Christmas web app. Since this is a frontend-only application, these are component prop interfaces rather than API contracts.

---

## App Component

**Purpose**: Root component managing global state and layout

**Props**: None (root component)

**State**:
```javascript
{
  currentLyrics: string,        // Currently displayed lyrics ('' when none)
  currentAudio: number | null,  // ID of playing gift (null when none)
  audioAvailable: boolean,      // Whether audio system is functional
  audioError: boolean           // Whether to show audio error indicator
}
```

**Children**:
- `<LyricsDisplay lyrics={currentLyrics} />`
- `<AudioIndicator show={audioError} />`
- `<GiftCard />` × 12 (one for each gift)

**Contract**:
- MUST render LyricsDisplay at top of viewport
- MUST render all 12 GiftCard components with scattered positioning
- MUST manage state for current lyrics and audio playback
- MUST handle gift hover/touch events from children
- MUST stop previous audio when new gift is activated

---

## GiftCard Component

**Purpose**: Individual interactive gift element

**Props**:
```javascript
{
  gift: {
    id: number,
    name: string,
    shortName: string,
    lyrics: string,
    imagePath: string,
    audioPath: string,
    asciiArt: string,
    position: { x: number, y: number }
  },
  onHover: (gift) => void,      // Called when hover/touch starts
  onUnhover: () => void,         // Called when hover/touch ends
  isPlaying: boolean             // Whether this gift's audio is currently playing
}
```

**State**:
```javascript
{
  isHovered: boolean,            // Whether currently being hovered
  imageSrc: string,              // Current image source (original or ASCII fallback)
  imageError: boolean            // Whether image loading failed
}
```

**Contract**:
- MUST display image (or ASCII fallback if image fails)
- MUST apply animation CSS class on hover/touch
- MUST call `onHover(gift)` when mouse enters or touch begins
- MUST call `onUnhover()` when mouse leaves or touch ends
- MUST be positioned absolutely at `gift.position` coordinates
- MUST handle image loading errors gracefully with ASCII fallback
- MUST provide visual feedback that element is interactive (cursor: pointer)

**Events**:
- `onMouseEnter` → Set `isHovered = true`, call `onHover(gift)`
- `onMouseLeave` → Set `isHovered = false`, call `onUnhover()`
- `onTouchStart` → Set `isHovered = true`, call `onHover(gift)`
- `onTouchEnd` → Set `isHovered = false`, call `onUnhover()`
- `onError` (img element) → Set `imageSrc` to ASCII art fallback

---

## LyricsDisplay Component

**Purpose**: Display current lyrics at top of screen

**Props**:
```javascript
{
  lyrics: string                 // Lyrics to display (empty string for no lyrics)
}
```

**State**: None (stateless presentational component)

**Contract**:
- MUST render provided lyrics text at top of viewport
- MUST handle empty string by rendering empty/placeholder state
- MUST be visible and readable (high contrast, appropriate font size)
- MUST have smooth transition when lyrics change
- MUST be fixed position at top of screen
- MUST not obstruct gift interactions

**CSS Requirements**:
- Position: fixed, top: 0
- Width: 100%
- Text align: center
- Min height to prevent layout shift
- Smooth opacity/transform transition (0.2s)

---

## AudioPlayer Component

**Purpose**: Manage audio playback for gifts

**Props**:
```javascript
{
  audioPath: string | null,      // Path to audio file (null = no audio)
  isPlaying: boolean,            // Whether audio should be playing
  onError: (error) => void,      // Called when audio fails to load/play
  onEnded: () => void            // Called when audio finishes playing
}
```

**State**:
```javascript
{
  audio: HTMLAudioElement | null,  // Audio element instance
  loading: boolean,                 // Whether audio is loading
  error: boolean                    // Whether audio failed
}
```

**Contract**:
- MUST create new Audio instance when `audioPath` changes
- MUST call `audio.play()` when `isPlaying` becomes true
- MUST call `audio.pause()` and reset when `isPlaying` becomes false
- MUST call `onError()` if audio fails to load or autoplay is blocked
- MUST call `onEnded()` when audio playback completes
- MUST handle browser autoplay policies gracefully
- MUST stop previous audio before playing new audio
- MUST NOT render any visual elements (purely functional)

**Error Handling**:
- Catch `play()` promise rejections (autoplay blocked)
- Catch `error` events on Audio element
- Call `onError(error)` for all failures

---

## AudioIndicator Component

**Purpose**: Visual indicator when audio is unavailable

**Props**:
```javascript
{
  show: boolean                  // Whether to display the indicator
}
```

**State**: None (stateless presentational component)

**Contract**:
- MUST be visible when `show === true`
- MUST be hidden when `show === false`
- MUST communicate that audio is unavailable (icon + text)
- MUST not obstruct gift interactions
- MUST be dismissible or auto-hide after 5 seconds (optional)

**Suggested Content**:
- Icon: 🔇 or speaker-with-X icon
- Text: "Audio unavailable - animations and lyrics still work!"
- Position: Top-right corner or banner below lyrics

---

## Custom Hooks

### useAudio Hook

**Purpose**: Manage audio playback with error handling

**Interface**:
```javascript
function useAudio() {
  return {
    playAudio: (audioPath: string) => Promise<void>,
    stopAudio: () => void,
    isPlaying: boolean,
    audioAvailable: boolean,
    error: Error | null
  }
}
```

**Contract**:
- `playAudio(path)` MUST stop any currently playing audio first
- `playAudio(path)` MUST return promise that resolves when playing or rejects on error
- `stopAudio()` MUST stop current audio and reset state
- `isPlaying` MUST be true only when audio is actively playing
- `audioAvailable` MUST be false if audio system is blocked or failed
- `error` MUST contain error details if playback fails

---

### useImageFallback Hook

**Purpose**: Handle image loading with ASCII art fallback

**Interface**:
```javascript
function useImageFallback(imagePath: string, asciiArt: string) {
  return {
    src: string,                 // Current source (image or ASCII data URL)
    loading: boolean,            // Whether image is loading
    error: boolean               // Whether image loading failed
  }
}
```

**Contract**:
- MUST attempt to load `imagePath` first
- MUST set `loading = true` during load
- MUST set `src = imagePath` and `loading = false` on success
- MUST set `src = asciiArtDataURL` and `error = true` on failure
- MUST convert `asciiArt` string to canvas/data URL for display
- MUST maintain same dimensions regardless of image or ASCII art

---

## Data Flow Contracts

### User Hovers on Gift (Happy Path)

1. **GiftCard** receives `onMouseEnter` event
2. **GiftCard** calls `onHover(gift)` passed from App
3. **App** updates state:
   ```javascript
   setCurrentLyrics(gift.lyrics)
   setCurrentAudio(gift.id)
   ```
4. **LyricsDisplay** receives new `lyrics` prop, displays text
5. **AudioPlayer** receives new `audioPath` prop, plays audio
6. **GiftCard** applies animation CSS class (`.gift--hovering`)

### User Unhovers (Happy Path)

1. **GiftCard** receives `onMouseLeave` event
2. **GiftCard** calls `onUnhover()` passed from App
3. **App** updates state:
   ```javascript
   setCurrentLyrics('')
   setCurrentAudio(null)
   ```
4. **LyricsDisplay** receives empty string, clears display
5. **AudioPlayer** stops audio playback
6. **GiftCard** removes animation CSS class

### Audio Fails (Error Path)

1. **AudioPlayer** receives `audioPath` prop
2. **AudioPlayer** attempts `audio.play()`
3. Browser rejects promise (autoplay blocked)
4. **AudioPlayer** calls `onError(error)`
5. **App** updates state:
   ```javascript
   setAudioError(true)
   setAudioAvailable(false)
   ```
6. **AudioIndicator** receives `show=true`, displays warning
7. **GiftCard** continues to work (animation + lyrics)

### Image Fails (Error Path)

1. **GiftCard** renders `<img src={gift.imagePath} />`
2. Image fails to load, triggers `onError` event
3. **useImageFallback** hook catches error
4. Hook converts `gift.asciiArt` to canvas data URL
5. Hook updates state: `{ src: asciiDataURL, error: true }`
6. **GiftCard** re-renders with ASCII art image
7. All interactions continue to work normally

---

## Testing Contracts

Each component contract MUST have corresponding tests:

### GiftCard Tests
- ✅ Renders gift image correctly
- ✅ Falls back to ASCII art on image error
- ✅ Calls `onHover` on mouse enter
- ✅ Calls `onUnhover` on mouse leave
- ✅ Applies animation class when hovered
- ✅ Handles touch events on mobile

### LyricsDisplay Tests
- ✅ Displays provided lyrics
- ✅ Handles empty string gracefully
- ✅ Transitions smoothly on lyrics change

### AudioPlayer Tests
- ✅ Plays audio when `isPlaying=true`
- ✅ Stops audio when `isPlaying=false`
- ✅ Calls `onError` when audio fails
- ✅ Handles autoplay policy rejection
- ✅ Calls `onEnded` when audio completes

### Integration Tests
- ✅ Hover → Animation + Audio + Lyrics
- ✅ Rapid hover across multiple gifts
- ✅ Touch interaction works on mobile
- ✅ Audio failure doesn't break app
- ✅ Image failure doesn't break app

---

## API Surface Summary

```javascript
// App.jsx
export default function App()

// GiftCard.jsx
export default function GiftCard({ gift, onHover, onUnhover, isPlaying })

// LyricsDisplay.jsx
export default function LyricsDisplay({ lyrics })

// AudioPlayer.jsx
export default function AudioPlayer({ audioPath, isPlaying, onError, onEnded })

// AudioIndicator.jsx
export default function AudioIndicator({ show })

// hooks/useAudio.js
export function useAudio()

// hooks/useImageFallback.js
export function useImageFallback(imagePath, asciiArt)

// data/gifts.js
export const gifts = [...]
```

All components follow React functional component conventions with hooks for state management.
