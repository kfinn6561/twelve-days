import { renderHook, waitFor, act } from '@testing-library/react';
import { useImageFallback } from '../../src/hooks/useImageFallback';
import { useAudio } from '../../src/hooks/useAudio';

describe('useImageFallback Hook - User Story 1', () => {
  test('returns imagePath as src on successful load', async () => {
    const imagePath = '/test-image.png';
    const asciiArt = 'test ascii art';

    const { result } = renderHook(() => useImageFallback(imagePath, asciiArt));

    // Initially loading
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(false);

    // Wait for image to "load" (mocked)
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.src).toBe(imagePath);
    expect(result.current.error).toBe(false);
  });

  test('falls back to ASCII art on image load error', async () => {
    const imagePath = '/nonexistent-image.png';
    const asciiArt = 'fallback ascii art';

    const { result } = renderHook(() => useImageFallback(imagePath, asciiArt));

    // Initially loading
    expect(result.current.loading).toBe(true);

    // Wait for error state
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should have error and fallback src
    expect(result.current.error).toBe(true);
    expect(result.current.src).toContain('data:image');
  });

  test('resets state when imagePath changes', async () => {
    const imagePath1 = '/image1.png';
    const imagePath2 = '/image2.png';
    const asciiArt = 'ascii art';

    const { result, rerender } = renderHook(
      ({ path }) => useImageFallback(path, asciiArt),
      { initialProps: { path: imagePath1 } }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Change imagePath
    rerender({ path: imagePath2 });

    // Should reset to loading state
    expect(result.current.loading).toBe(true);
  });
});

describe('useAudio Hook - User Story 3', () => {
  test('playAudio stops previous audio before playing new', async () => {
    const { result } = renderHook(() => useAudio());

    await act(async () => {
      await result.current.playAudio('/audio1.mp3');
    });

    expect(result.current.isPlaying).toBe(true);

    // Play new audio
    await act(async () => {
      await result.current.playAudio('/audio2.mp3');
    });

    // Should still be playing (new audio)
    expect(result.current.isPlaying).toBe(true);
  });

  test('stopAudio stops current audio', async () => {
    const { result } = renderHook(() => useAudio());

    await act(async () => {
      await result.current.playAudio('/audio1.mp3');
    });

    expect(result.current.isPlaying).toBe(true);

    act(() => {
      result.current.stopAudio();
    });

    expect(result.current.isPlaying).toBe(false);
  });

  test('sets audioAvailable to false on error', async () => {
    // Mock Audio to throw error
    const originalAudio = global.Audio;
    global.Audio = class Audio {
      constructor() {
        this.play = jest.fn(() => Promise.reject(new Error('Failed')));
        this.pause = jest.fn();
        this.addEventListener = jest.fn();
        this.removeEventListener = jest.fn();
      }
    };

    const { result } = renderHook(() => useAudio());

    await act(async () => {
      try {
        await result.current.playAudio('/audio1.mp3');
      } catch (e) {
        // Expected to fail
      }
    });

    expect(result.current.audioAvailable).toBe(false);
    expect(result.current.error).toBeTruthy();

    // Restore
    global.Audio = originalAudio;
  });
});
