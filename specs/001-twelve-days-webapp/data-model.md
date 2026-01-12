# Data Model: Twelve Days of Christmas Interactive Web App

**Date**: 2025-12-19
**Feature**: 001-twelve-days-webapp

## Overview

This document defines the data structures for the Twelve Days of Christmas interactive web app. Since this is a static frontend application with no backend or database, all data is defined as JavaScript constants and imported where needed.

---

## Entities

### Gift

Represents one of the twelve gifts from "The Twelve Days of Christmas" carol.

**Properties**:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | number | Yes | Unique identifier (1-12) corresponding to the day number |
| `name` | string | Yes | Full gift name (e.g., "Two turtle doves") |
| `shortName` | string | Yes | Brief identifier (e.g., "turtle doves") |
| `lyrics` | string | Yes | The specific line from the song (e.g., "Two turtle doves") |
| `imagePath` | string | Yes | Relative path to gift image (e.g., "/assets/images/turtle-doves.png") |
| `audioPath` | string | Yes | Relative path to audio file (e.g., "/assets/audio/day-2.mp3") |
| `asciiArt` | string | Yes | ASCII art representation as fallback if image fails to load |
| `position` | object | Yes | Scattered position on screen `{ x: number, y: number }` |

**Validation Rules**:
- `id` must be between 1 and 12 (inclusive)
- `name` and `lyrics` should match the traditional carol wording
- `imagePath` and `audioPath` must point to existing assets
- `position.x` must be between 0 and 100 (percentage of viewport width)
- `position.y` must be between 0 and 100 (percentage of viewport height)
- `asciiArt` should be multi-line string representing the gift visually

**Example**:
```javascript
{
  id: 2,
  name: "Two turtle doves",
  shortName: "turtle doves",
  lyrics: "Two turtle doves",
  imagePath: "/assets/images/turtle-doves.png",
  audioPath: "/assets/audio/day-2.mp3",
  asciiArt: `
    >^)      (^<
     (\\____/)
      (_"--"_)
   Turtle Doves
  `,
  position: { x: 25, y: 30 }
}
```

---

### AppState (React State)

Application-level state managed in the root App component.

**Properties**:

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `currentLyrics` | string | Yes | `''` | Lyrics currently displayed at top of screen |
| `currentAudio` | number \| null | Yes | `null` | ID of gift whose audio is currently playing (null if none) |
| `audioAvailable` | boolean | Yes | `true` | Whether audio system is available (false if blocked by browser) |
| `audioError` | boolean | Yes | `false` | Whether to show audio unavailability indicator |

**State Transitions**:
- **Hover/Touch on Gift**:
  - `currentLyrics` → Set to gift's lyrics
  - `currentAudio` → Set to gift's id (stops previous audio if playing)
- **Hover/Touch Ends**:
  - `currentLyrics` → Reset to `''`
  - `currentAudio` → Set to `null`
- **Audio Load Failure**:
  - `audioAvailable` → Set to `false`
  - `audioError` → Set to `true`

---

### ImageLoadState (Per-Gift State)

Managed within the `useImageFallback` custom hook for each GiftCard component.

**Properties**:

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `loading` | boolean | Yes | `true` | Whether image is currently loading |
| `error` | boolean | Yes | `false` | Whether image failed to load |
| `src` | string | Yes | `imagePath` | Current source (original image or data URL for ASCII art) |

**State Transitions**:
- **Image Loading**: `{ loading: true, error: false, src: imagePath }`
- **Image Loaded**: `{ loading: false, error: false, src: imagePath }`
- **Image Failed**: `{ loading: false, error: true, src: asciiArtDataURL }`

---

## Data Files

### `src/data/gifts.js`

Export array of all 12 Gift objects in order.

```javascript
export const gifts = [
  {
    id: 1,
    name: "A partridge in a pear tree",
    shortName: "partridge",
    lyrics: "A partridge in a pear tree",
    imagePath: "/assets/images/partridge.png",
    audioPath: "/assets/audio/day-1.mp3",
    asciiArt: `
        🌳
       / \\
      🐦
    Partridge
    `,
    position: { x: 50, y: 50 }
  },
  {
    id: 2,
    name: "Two turtle doves",
    shortName: "turtle doves",
    lyrics: "Two turtle doves",
    imagePath: "/assets/images/turtle-doves.png",
    audioPath: "/assets/audio/day-2.mp3",
    asciiArt: `
      >^)      (^<
       (\\____/)
        (_"--"_)
     Turtle Doves
    `,
    position: { x: 25, y: 30 }
  },
  // ... 10 more gifts
];
```

### `src/data/asciiArt.js`

Optional: Separate file for ASCII art if gifts.js becomes too large.

```javascript
export const asciiArtMap = {
  1: `ASCII art for partridge`,
  2: `ASCII art for turtle doves`,
  // ... etc
};
```

---

## Relationships

**Gift → Audio**: One-to-one relationship. Each gift has exactly one audio file.

**Gift → Image**: One-to-one relationship. Each gift has exactly one primary image and one ASCII fallback.

**Gift → Lyrics**: One-to-one relationship. Each gift displays its specific line (not cumulative verses).

**AppState → Gift**: Many-to-one relationship. App state tracks which single gift is currently active (playing audio, showing lyrics).

---

## Data Flow

```
User Action (Hover/Touch)
    ↓
GiftCard Component Receives Event
    ↓
Calls onHover Handler from App
    ↓
App Updates State:
  - currentLyrics = gift.lyrics
  - currentAudio = gift.id
    ↓
State Change Triggers Re-renders:
  - LyricsDisplay shows new lyrics
  - AudioPlayer plays new audio (stops previous)
  - GiftCard applies animation CSS class
    ↓
User Action Ends (Unhover)
    ↓
App Resets State:
  - currentLyrics = ''
  - currentAudio = null
```

---

## Error Handling Data

### Audio Errors
When audio fails to load or is blocked:
- `audioAvailable` flag set to `false`
- `audioError` flag set to `true`
- AudioIndicator component renders visual notification
- GiftCard continues to work (animation + lyrics still function)

### Image Errors
When image fails to load:
- `useImageFallback` hook catches error event
- Converts `gift.asciiArt` to data URL image
- Updates `src` to ASCII art representation
- GiftCard renders ASCII art instead of original image
- All interactions continue to work normally

---

## Performance Considerations

**Data Size**:
- 12 gift objects × ~200 bytes each = ~2.4KB
- Negligible impact on bundle size
- All data can be loaded synchronously at app startup

**Asset Loading**:
- Images: Lazy load as needed (React img `loading="lazy"`)
- Audio: Preload critical assets (at least day 1-3) to reduce delay
- Total asset size estimate:
  - Images: 12 × ~100KB = ~1.2MB
  - Audio: 12 × ~200KB = ~2.4MB
  - Total: ~3.6MB (acceptable for modern broadband)

---

## Future Extensibility

**If adding features later**, data model could extend to:
- `gift.metadata.color` for theming
- `gift.animation.type` for varied animations per gift
- `gift.history.playCount` for usage tracking
- `lyrics.cumulative` for full verse display option
- `audioPath.alternatives` for multiple voice options

**Current design principle**: Keep it simple. Add fields only when requirements demand them (YAGNI).
