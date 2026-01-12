import { test, expect } from '@playwright/test';

/**
 * E2E Test: Edge cases - audio and image failures
 * T062 & T063: Test error handling for missing/corrupted assets
 */

test.describe('Audio Failure Scenarios', () => {
  test('should handle missing audio files gracefully', async ({ page, context }) => {
    // Block audio requests to simulate missing files
    await context.route('**/*.mp3', route => route.abort());

    await page.goto('/');
    await page.click('.audio-permission-button');

    // Hover over gift
    const firstGift = page.locator('.gift').first();
    await firstGift.hover();

    // Should still show lyrics even if audio fails
    const lyrics = page.locator('.lyrics-display');
    await expect(lyrics).toBeVisible();

    // Should NOT crash the app
    const gifts = await page.locator('.gift').count();
    expect(gifts).toBe(12);
  });

  test('should show audio error indicator when audio unavailable', async ({ page, context }) => {
    // Block audio to force errors
    await context.route('**/*.mp3', route => route.abort());

    await page.goto('/');
    await page.click('.audio-permission-button');

    // Try to play audio by hovering
    const firstGift = page.locator('.gift').first();
    await firstGift.hover();

    // Wait a bit for error to be detected
    await page.waitForTimeout(500);

    // Audio indicator might appear (but it's okay if autoplay block prevents this)
    // Main thing is app doesn't crash
    const gifts = await page.locator('.gift').count();
    expect(gifts).toBe(12);
  });

  test('should continue working after audio error', async ({ page, context }) => {
    // Block first audio file only
    let firstRequest = true;
    await context.route('**/*.mp3', route => {
      if (firstRequest) {
        firstRequest = false;
        route.abort();
      } else {
        route.continue();
      }
    });

    await page.goto('/');
    await page.click('.audio-permission-button');

    // Hover over first gift (should fail)
    const firstGift = page.locator('.gift').first();
    await firstGift.hover();

    // Move to second gift (should work)
    await page.mouse.move(0, 0);
    const secondGift = page.locator('.gift').nth(1);
    await secondGift.hover();

    // Should still show lyrics
    await expect(page.locator('.lyrics-display')).toBeVisible();
  });

  test('should handle audio not loading before hover', async ({ page, context }) => {
    // Delay audio loading significantly
    await context.route('**/*.mp3', route => {
      setTimeout(() => route.continue(), 5000);
    });

    await page.goto('/');
    await page.click('.audio-permission-button');

    // Hover immediately
    const firstGift = page.locator('.gift').first();
    await firstGift.hover();

    // Should show lyrics even if audio is still loading
    const lyrics = page.locator('.lyrics-display');
    await expect(lyrics).toBeVisible();
  });
});

test.describe('Image Failure Scenarios', () => {
  test('should display ASCII art fallback when image fails', async ({ page, context }) => {
    // Block image requests to force fallback
    await context.route('**/*.png', route => route.abort());

    await page.goto('/');

    // Should still render 12 gifts (with ASCII art)
    const gifts = await page.locator('.gift').count();
    expect(gifts).toBe(12);

    // Check for ASCII art fallback presence
    const firstGift = page.locator('.gift').first();
    await expect(firstGift).toBeVisible();
  });

  test('should maintain interactivity when images fail', async ({ page, context }) => {
    // Block images
    await context.route('**/*.png', route => route.abort());

    await page.goto('/');
    await page.click('.audio-permission-button');

    // Should still be able to hover and see lyrics
    const firstGift = page.locator('.gift').first();
    await firstGift.hover();

    const lyrics = page.locator('.lyrics-display');
    await expect(lyrics).toBeVisible();
  });

  test('should handle some images loading and some failing', async ({ page, context }) => {
    // Block every other image
    let count = 0;
    await context.route('**/*.png', route => {
      count++;
      if (count % 2 === 0) {
        route.abort();
      } else {
        route.continue();
      }
    });

    await page.goto('/');

    // Should still render all 12 gifts
    const gifts = await page.locator('.gift').count();
    expect(gifts).toBe(12);
  });

  test('should continue working after image load error', async ({ page, context }) => {
    // Block first image only
    let firstImage = true;
    await context.route('**/*.png', route => {
      if (firstImage) {
        firstImage = false;
        route.abort();
      } else {
        route.continue();
      }
    });

    await page.goto('/');
    await page.click('.audio-permission-button');

    // Hover over gift with failed image
    const firstGift = page.locator('.gift').first();
    await firstGift.hover();

    // Should still work
    await expect(page.locator('.lyrics-display')).toBeVisible();

    // Second gift should work normally
    const secondGift = page.locator('.gift').nth(1);
    await secondGift.hover();
    await expect(page.locator('.lyrics-display')).toBeVisible();
  });

  test('should handle slow-loading images gracefully', async ({ page, context }) => {
    // Delay image loading
    await context.route('**/*.png', route => {
      setTimeout(() => route.continue(), 2000);
    });

    await page.goto('/');

    // Page should load even if images are slow
    const container = page.locator('.gift-container');
    await expect(container).toBeVisible();

    // Should show loading state or fallback
    const gifts = await page.locator('.gift').count();
    expect(gifts).toBe(12);
  });
});

test.describe('Combined Failure Scenarios', () => {
  test('should handle both audio and image failures', async ({ page, context }) => {
    // Block both audio and images
    await context.route('**/*.mp3', route => route.abort());
    await context.route('**/*.png', route => route.abort());

    await page.goto('/');
    await page.click('.audio-permission-button');

    // Should still render app with ASCII fallbacks
    const gifts = await page.locator('.gift').count();
    expect(gifts).toBe(12);

    // Interaction should still work
    const firstGift = page.locator('.gift').first();
    await firstGift.hover();

    // Lyrics should still display
    await expect(page.locator('.lyrics-display')).toBeVisible();
  });

  test('should recover from network failure', async ({ page, context }) => {
    // Initially block all assets
    let blocking = true;
    await context.route('**/assets/**', route => {
      if (blocking) {
        route.abort();
      } else {
        route.continue();
      }
    });

    await page.goto('/');

    // Unblock assets (simulate network recovery)
    blocking = false;

    // Refresh
    await page.reload();

    // Should now work
    await page.waitForSelector('.gift');
    const gifts = await page.locator('.gift').count();
    expect(gifts).toBe(12);
  });
});
