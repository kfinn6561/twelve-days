# Audio Sourcing Guide for "Twelve Days of Christmas"

This guide provides instructions for finding, downloading, and splitting a complete "The Twelve Days of Christmas" recording into 12 individual verse segments.

## Overview

You need to:
1. Find a public domain recording of the complete song
2. Download the audio file
3. Split it into 12 separate files (one per verse/day)
4. Export as MP3 files with proper naming

---

## Step 1: Find a Public Domain Recording

### Recommended Sources for Free Music

**[Free Music Archive](https://freemusicarchive.org/)**
- Search: "Twelve Days of Christmas"
- Filter by: Creative Commons licenses
- [Direct search link](https://freemusicarchive.org/search?quicksearch=twelve+days+of+christmas)

**[Musopen](https://musopen.org/)**
- Classical music in public domain
- Search: "Twelve Days Christmas"
- [Musopen search](https://musopen.org/music/)

**[Internet Archive Audio](https://archive.org/details/audio)**
- Massive collection of public domain audio
- Search: "Twelve Days of Christmas"
- [Direct search link](https://archive.org/details/audio?query=twelve+days+of+christmas)

**[ccMixter](https://ccmixter.org/)**
- Creative Commons licensed music
- Search: "Twelve Days of Christmas"
- [ccMixter search](https://ccmixter.org/search?searchp=twelve+days+of+christmas)

**[Wikimedia Commons Audio](https://commons.wikimedia.org/)**
- Public domain audio files
- Search: "Twelve Days of Christmas"
- [Wikimedia Commons search](https://commons.wikimedia.org/w/index.php?search=twelve+days+of+christmas&title=Special:MediaSearch&type=audio)

**YouTube Audio Library (if accessible)**
- Free music for creators
- Search for public domain Christmas carols

### What to Look For

- ✅ **Complete recording** - All 12 verses sung in sequence
- ✅ **Clear audio quality** - Easy to hear the words
- ✅ **Public domain or Creative Commons Zero (CC0)** license
- ✅ **Consistent tempo** - Not too fast, not too slow
- ✅ **MP3, WAV, or OGG format** - Common audio formats

---

## Step 2: Download the Recording

1. Once you find a suitable recording, download it to your computer
2. Save it somewhere accessible (e.g., `~/Downloads/twelve-days-christmas-full.mp3`)
3. Note the file format (MP3, WAV, OGG, etc.)

---

## Step 3: Install Audio Editing Software

You'll need software to split the audio file. Choose one:

### Option A: Audacity (Recommended - Free & User-Friendly)

**Download:** [https://www.audacityteam.org/download/](https://www.audacityteam.org/download/)

**Installation:**
```bash
# macOS (using Homebrew)
brew install --cask audacity

# Or download from the website and install manually
```

**Why Audacity?**
- Free and open-source
- Visual waveform makes it easy to identify verse boundaries
- Simple export process
- Cross-platform (macOS, Windows, Linux)

### Option B: FFmpeg (Command-Line - For Advanced Users)

**Installation:**
```bash
# macOS
brew install ffmpeg

# Linux (Ubuntu/Debian)
sudo apt-get install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
```

**Why FFmpeg?**
- Powerful command-line tool
- Can automate splitting with a script
- No GUI needed
- Faster for batch processing

---

## Step 4: Split the Audio into 12 Segments

### Method A: Using Audacity (Easiest)

#### 4.1 Open the File
1. Launch Audacity
2. Go to **File → Open**
3. Select your downloaded recording

#### 4.2 Identify Verse Boundaries
1. Play through the song and listen for where each verse starts
2. Look at the waveform - you'll see pauses between verses
3. The song structure typically goes:
   - Verse 1: "A partridge in a pear tree"
   - Verse 2: "Two turtle doves, and a partridge in a pear tree"
   - Verse 3: "Three French hens, two turtle doves..."
   - ... and so on

#### 4.3 Mark and Export Each Verse
1. Use **Edit → Select → Region** or click and drag to select just one verse
2. Go to **File → Export → Export Audio**
3. Choose format: **MP3** (or OGG if you prefer)
4. Name the file: `day-1.mp3`
5. Set quality: **128-192 kbps** (good balance of quality and file size)
6. Click **Export**
7. Repeat for all 12 verses

**Time-saving tip:** Use **Labels**
1. Play through and add a label (Ctrl+B / Cmd+B) at the start of each verse
2. Name each label: "Day 1", "Day 2", etc.
3. Use **File → Export → Export Multiple** to export all at once based on labels

### Method B: Using FFmpeg (Advanced)

If you know the exact timestamps for each verse, you can use FFmpeg:

```bash
# Example: Extract verse 1 (0:00 to 0:15)
ffmpeg -i twelve-days-full.mp3 -ss 00:00:00 -to 00:00:15 -c copy day-1.mp3

# Extract verse 2 (0:15 to 0:30)
ffmpeg -i twelve-days-full.mp3 -ss 00:00:15 -to 00:00:30 -c copy day-2.mp3

# Continue for all 12 verses...
```

**Note:** You'll need to listen to find the exact timestamps first.

---

## Step 5: Verify the Audio Files

After splitting, verify each file:

1. Listen to each `day-X.mp3` file to ensure it contains the correct verse
2. Check file sizes - they should be between 50KB - 500KB each (depending on length and quality)
3. Ensure all 12 files are present: `day-1.mp3` through `day-12.mp3`

---

## Step 6: Move Files to Project

Copy all 12 audio files to the project directory:

```bash
# Navigate to your project
cd /Users/kieranfinn/speckit-test/test-project

# Copy the files to the audio assets folder
cp ~/Downloads/day-*.mp3 public/assets/audio/

# Or use Finder to drag and drop the files
```

**Target location:**
```
public/assets/audio/
├── day-1.mp3
├── day-2.mp3
├── day-3.mp3
├── day-4.mp3
├── day-5.mp3
├── day-6.mp3
├── day-7.mp3
├── day-8.mp3
├── day-9.mp3
├── day-10.mp3
├── day-11.mp3
└── day-12.mp3
```

---

## Audio Requirements

- **Format:** MP3 (preferred) or OGG
- **Quality:** 128-192 kbps (good balance)
- **Sample Rate:** 44.1 kHz (standard)
- **Length per file:** 5-20 seconds typically (depends on verse)
- **File size:** 50KB - 500KB per file is reasonable

---

## Verse Content Reference

For reference, here's what each verse should contain:

1. **Day 1:** "A partridge in a pear tree"
2. **Day 2:** "Two turtle doves, and a partridge in a pear tree"
3. **Day 3:** "Three French hens, two turtle doves, and a partridge in a pear tree"
4. **Day 4:** "Four calling birds, three French hens, two turtle doves, and a partridge in a pear tree"
5. **Day 5:** "Five golden rings, four calling birds, three French hens, two turtle doves, and a partridge in a pear tree"
6. **Day 6:** "Six geese a-laying..." (continues with all previous gifts)
7. **Day 7:** "Seven swans a-swimming..." (continues cumulative)
8. **Day 8:** "Eight maids a-milking..." (continues cumulative)
9. **Day 9:** "Nine ladies dancing..." (continues cumulative)
10. **Day 10:** "Ten lords a-leaping..." (continues cumulative)
11. **Day 11:** "Eleven pipers piping..." (continues cumulative)
12. **Day 12:** "Twelve drummers drumming..." (entire song - longest verse!)

**Note:** Each verse includes all previous gifts cumulatively, so later verses are longer.

---

## Troubleshooting

### "I can't find a good recording"
- Try searching for "public domain twelve days of christmas instrumental"
- Look for recordings marked "royalty-free" or "Creative Commons"
- Check multiple sources - Internet Archive often has older recordings in public domain

### "The audio quality is poor"
- Download a higher quality version (320 kbps MP3 or WAV)
- Try a different recording
- Use Audacity's noise reduction: **Effect → Noise Reduction**

### "I can't tell where verses start and end"
- Look for visual gaps in the waveform (pauses between verses)
- Play at slower speed in Audacity: **Effect → Change Tempo**
- Listen multiple times to identify patterns
- Some versions have instrumental breaks between verses - include those

### "My exported files are too large"
- Re-export with lower bitrate (128 kbps is fine for voice)
- Use MP3 instead of WAV
- Trim any silence at beginning and end

---

## Current Status

Replace the placeholder files currently located in:
```
public/assets/audio/
├── day-1.mp3   (0 bytes - empty placeholder)
├── day-2.mp3   (0 bytes - empty placeholder)
├── day-3.mp3   (0 bytes - empty placeholder)
├── day-4.mp3   (0 bytes - empty placeholder)
├── day-5.mp3   (0 bytes - empty placeholder)
├── day-6.mp3   (0 bytes - empty placeholder)
├── day-7.mp3   (0 bytes - empty placeholder)
├── day-8.mp3   (0 bytes - empty placeholder)
├── day-9.mp3   (0 bytes - empty placeholder)
├── day-10.mp3  (0 bytes - empty placeholder)
├── day-11.mp3  (0 bytes - empty placeholder)
└── day-12.mp3  (0 bytes - empty placeholder)
```

Once all audio files are replaced with real recordings, **T009** will be complete!

---

## Alternative: Generate Audio with AI (If Available)

If you have access to AI voice generation tools, you could generate the verses:

### ElevenLabs / Similar TTS Services
1. Sign up for a text-to-speech service
2. Input the lyrics for each verse
3. Generate and download each as MP3
4. Rename to day-1.mp3 through day-12.mp3

### macOS Built-in Text-to-Speech (Basic Option)
```bash
# Generate audio from text using macOS say command
say -v "Samantha" -o day-1.mp3 --data-format=LEF32@22050 "A partridge in a pear tree"
```

**Note:** Built-in TTS won't sound like singing, but could work for a prototype.

---

## Need Help?

- **Audacity Tutorials:** [https://manual.audacityteam.org/](https://manual.audacityteam.org/)
- **FFmpeg Documentation:** [https://ffmpeg.org/documentation.html](https://ffmpeg.org/documentation.html)
- **Audio Editing Basics:** Search YouTube for "how to split audio file audacity"
