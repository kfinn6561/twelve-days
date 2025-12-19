# Data Model: Gift Detail Page

**Feature**: 002-gift-detail-page
**Date**: 2025-12-19
**Phase**: 1 - Design

## Overview

This document defines the data structures for gift detail content, routing state, and component props.

## Core Entities

### 1. Gift Detail Content

**Entity**: `GiftContent`

**Purpose**: Structured Wikipedia-style content for each of the twelve gifts

**Structure**:
```javascript
{
  id: Number,                    // 1-12, matches gift.id
  title: String,                 // Full gift name
  subtitle: String,              // Optional tagline
  sections: Array<ContentSection>,
  references: Array<Reference>   // Optional citations
}
```

**Example**:
```javascript
{
  id: 1,
  title: "A Partridge in a Pear Tree",
  subtitle: "The Foundation of the Twelve Days",
  sections: [
    {
      id: "overview",
      heading: "Overview",
      paragraphs: [
        "The partridge represents Christ in medieval Christian symbolism...",
        "The pear tree symbolizes the cross or the Tree of Life..."
      ],
      citations: [1, 2]
    },
    {
      id: "history",
      heading: "History",
      paragraphs: [
        "First documented in 1780 in a children's book..."
      ]
    },
    {
      id: "cultural",
      heading: "Cultural Significance",
      paragraphs: [
        "The phrase has entered popular culture..."
      ]
    },
    {
      id: "traditions",
      heading: "Related Traditions",
      paragraphs: [
        "Modern interpretations include..."
      ],
      list: [
        "Fun fact 1",
        "Fun fact 2"
      ]
    }
  ],
  references: [
    { id: 1, text: "Smith, J. (2020). Christmas Ornithology. Oxford Press." },
    { id: 2, text: "Johnson, M. (2018). 'Medieval Symbolism in Carols'. Journal of Musicology, 45(2)." }
  ]
}
```

**Validation Rules**:
- `id` must be integer 1-12
- `title` must be non-empty string
- `sections` must contain exactly 4 sections with IDs: "overview", "history", "cultural", "traditions"
- Each section must have `heading` and at least one `paragraphs` entry
- If `citations` present, referenced IDs must exist in `references` array
- `references` array optional (some gifts may not need citations)

**Storage Location**: `src/data/giftContent.js`

**Export Format**:
```javascript
export const giftContent = {
  1: { /* GiftContent for day 1 */ },
  2: { /* GiftContent for day 2 */ },
  // ... 3-12
};
```

---

### 2. Content Section

**Entity**: `ContentSection`

**Purpose**: Individual section within gift detail content (Overview, History, etc.)

**Structure**:
```javascript
{
  id: String,                    // "overview" | "history" | "cultural" | "traditions"
  heading: String,               // Display heading
  paragraphs: Array<String>,     // Main content paragraphs
  list?: Array<String>,          // Optional bullet list (for fun facts, etc.)
  citations?: Array<Number>      // Optional reference IDs
}
```

**Constraints**:
- `id` must be one of the four standard sections
- `paragraphs` must have at least 1 entry
- `list` is optional, typically used for "traditions" section
- `citations` reference IDs from parent `GiftContent.references`

---

### 3. Reference

**Entity**: `Reference`

**Purpose**: Citation/source for content facts

**Structure**:
```javascript
{
  id: Number,                    // Unique within gift content
  text: String                   // Full citation text
}
```

**Format Examples**:
- Book: "Smith, J. (2020). *Christmas Ornithology*. Oxford Press."
- Article: "Johnson, M. (2018). 'Medieval Symbolism'. *Journal of Musicology*, 45(2)."
- Web: "Historic UK. 'Twelve Days Origins'. Retrieved 2025."

---

### 4. Route

**Entity**: `Route`

**Purpose**: Parsed URL path identifying current page

**Structure**:
```javascript
{
  type: "home" | "detail" | "notfound",
  id?: Number                    // Present only when type === "detail"
}
```

**Examples**:
```javascript
// Home page
{ type: "home" }

// Detail page for gift 5
{ type: "detail", id: 5 }

// 404 page
{ type: "notfound" }
```

**Parsing Rules**:
- `/` or empty string → `{ type: "home" }`
- `/gift/1` through `/gift/12` → `{ type: "detail", id: N }`
- Any other path → `{ type: "notfound" }`

---

### 5. Extended Gift Data

**Entity**: `Gift` (extends existing `src/data/gifts.js`)

**Current Structure** (from existing codebase):
```javascript
{
  id: Number,                    // 1-12
  name: String,                  // "A partridge in a pear tree"
  shortName: String,             // "partridge"
  lyrics: String,                // "A partridge in a pear tree"
  imagePath: String,             // "/assets/images/day-1.png"
  audioPath: String,             // "/assets/audio/day-1.mp3"
  asciiArt: String,              // Fallback ASCII art
  position: { x: Number, y: Number }  // Percentage positioning
}
```

**No Changes Required**: Gift data structure remains unchanged. Content is stored separately in `giftContent` and linked by `id`.

**Relationship**: `Gift.id` === `GiftContent.id` (1:1 mapping)

---

## Data Relationships

```
Gift (existing)
  ├── id: 1-12
  └── [other properties unchanged]

GiftContent (new)
  ├── id: 1-12 (matches Gift.id)
  ├── title
  ├── sections[4]
  │   ├── [0] overview
  │   ├── [1] history
  │   ├── [2] cultural
  │   └── [3] traditions
  └── references[] (optional)

Route (derived from URL)
  ├── type: "home" | "detail" | "notfound"
  └── id?: Number (when type === "detail")
```

**Lookup Pattern**:
```javascript
// User clicks gift #5
const gift = gifts.find(g => g.id === 5);
const content = giftContent[5];
const route = { type: "detail", id: 5 };

// Render detail page with:
// - gift.imagePath for image
// - gift.name for breadcrumb
// - content.title, content.sections for article
```

---

## State Management

### Router State

**Location**: `src/hooks/useRouter.js`

**State**:
```javascript
{
  currentPath: String           // window.location.pathname
}
```

**Methods**:
```javascript
navigate(path: String) => void  // Updates URL and state
```

**Derived**:
```javascript
route: Route                    // Parsed from currentPath
```

---

### Content Loader State

**Location**: `src/hooks/useContentLoader.js`

**State**:
```javascript
{
  content: GiftContent | null,
  error: Boolean,
  loading: Boolean              // Always false for bundled content
}
```

**Methods**:
```javascript
loadContent(id: Number) => void // Loads content by gift ID
```

**Implementation Note**: For bundled JavaScript objects, `loading` is always false and content is instantly available. Error is true only if content missing from bundle.

---

### Animation State

**Location**: Component local state (GiftCard)

**State**:
```javascript
{
  isSpinning: Boolean           // CSS class toggle
}
```

**Lifecycle**:
1. User clicks → `setIsSpinning(true)`
2. CSS animation starts (500ms)
3. setTimeout fires → navigate to detail page
4. Cleanup: clear timeout on unmount

---

## File Organization

```
src/
  data/
    gifts.js                    # Existing (unchanged)
    giftContent.js              # NEW: All 12 gift contents

  hooks/
    useRouter.js                # NEW: Routing hook
    useContentLoader.js         # NEW: Content loading hook

  components/
    GiftCard.jsx                # MODIFIED: Add onClick navigation
    GiftDetailPage.jsx          # NEW: Detail page wrapper
    GiftDetailContent.jsx       # NEW: Content display
    BackButton.jsx              # NEW: Navigation button
```

---

## Validation & Testing

### Content Validation

```javascript
// Test: All 12 gifts have content
for (let i = 1; i <= 12; i++) {
  expect(giftContent[i]).toBeDefined();
}

// Test: Each content has required structure
Object.values(giftContent).forEach(content => {
  expect(content).toHaveProperty('title');
  expect(content).toHaveProperty('sections');
  expect(content.sections).toHaveLength(4);
  expect(content.sections.map(s => s.id)).toEqual([
    'overview', 'history', 'cultural', 'traditions'
  ]);
});

// Test: Citations reference valid IDs
Object.values(giftContent).forEach(content => {
  const refIds = content.references?.map(r => r.id) || [];
  content.sections.forEach(section => {
    section.citations?.forEach(citeId => {
      expect(refIds).toContain(citeId);
    });
  });
});
```

### Route Parsing Validation

```javascript
// Test: Route matching
expect(matchRoute('/')).toEqual({ type: 'home' });
expect(matchRoute('/gift/1')).toEqual({ type: 'detail', id: 1 });
expect(matchRoute('/gift/12')).toEqual({ type: 'detail', id: 12 });
expect(matchRoute('/gift/13')).toEqual({ type: 'notfound' });
expect(matchRoute('/invalid')).toEqual({ type: 'notfound' });
```

---

## Performance Considerations

**Bundle Size**:
- 12 contents × ~2-4 KB = 24-48 KB uncompressed
- Estimated 12-24 KB gzipped
- Total bundle: ~75-87 KB gzipped (within budget)

**Memory**:
- All content loaded on initial bundle parse
- No dynamic fetching = no memory churn
- Single content object in memory (~50 KB)

**Rendering**:
- Content pre-parsed (no runtime markdown parsing)
- Simple React component tree
- Standard DOM operations, no virtualization needed

---

## Future Extensibility

**If content grows beyond 500 KB total**:
1. Move to `public/content/` with runtime fetch
2. Implement code-splitting per gift
3. Add loading states to `useContentLoader`

**If content becomes dynamic**:
1. Add CMS integration to `contentService.js`
2. Implement caching layer
3. Add content versioning

**Current scope**: Static bundled content sufficient for 12 gifts with fixed encyclopedia-style content.
