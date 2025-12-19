import { test, expect, devices } from '@playwright/test';

/**
 * E2E Test: Mobile user flow
 * T061: Full mobile interaction flow with touch events
 */

test.use({
  ...devices['iPhone 12'],
});

test.describe('Mobile User Flow', () => {
  test('should display all 12 gifts on mobile', async ({ page }) => {
    await page.goto('/');

    // Wait for app to load
    await page.waitForSelector('.gift-container');

    // Should see 12 gifts
    const gifts = await page.locator('.gift').count();
    expect(gifts).toBe(12);
  });

  test('should show audio permission prompt on mobile', async ({ page }) => {
    await page.goto('/');

    // Should see audio permission prompt
    const prompt = page.locator('.audio-permission-overlay');
    await expect(prompt).toBeVisible();
  });

  test('should dismiss audio prompt on tap', async ({ page }) => {
    await page.goto('/');

    // Tap enable audio button
    await page.tap('.audio-permission-button');

    // Prompt should disappear
    const prompt = page.locator('.audio-permission-overlay');
    await expect(prompt).not.toBeVisible();
  });

  test('should display lyrics when tapping gift', async ({ page }) => {
    await page.goto('/');
    await page.tap('.audio-permission-button');

    // Tap first gift
    const firstGift = page.locator('.gift').first();
    await firstGift.tap();

    // Should see lyrics
    const lyrics = page.locator('.lyrics-display');
    await expect(lyrics).toBeVisible();
  });

  test('should handle touch events (touchStart/touchEnd)', async ({ page }) => {
    await page.goto('/');
    await page.tap('.audio-permission-button');

    const firstGift = page.locator('.gift').first();

    // Tap and hold briefly
    await firstGift.tap();

    // Should show lyrics
    await expect(page.locator('.lyrics-display')).toBeVisible();
  });

  test('should scale gifts appropriately for mobile viewport', async ({ page }) => {
    await page.goto('/');

    // Check that gifts are smaller on mobile
    const firstGift = page.locator('.gift img').first();
    const box = await firstGift.boundingBox();

    // Mobile gifts should be smaller (60px or less)
    expect(box.width).toBeLessThanOrEqual(80);
    expect(box.height).toBeLessThanOrEqual(80);
  });

  test('should not overflow viewport on mobile', async ({ page }) => {
    await page.goto('/');

    const viewportSize = page.viewportSize();
    const gifts = await page.locator('.gift').all();

    for (const gift of gifts) {
      const box = await gift.boundingBox();
      if (box) {
        expect(box.x).toBeGreaterThanOrEqual(-50); // Some tolerance
        expect(box.x).toBeLessThan(viewportSize.width + 50);
      }
    }
  });

  test('should handle rapid tapping between gifts', async ({ page }) => {
    await page.goto('/');
    await page.tap('.audio-permission-button');

    // Rapidly tap multiple gifts
    for (let i = 0; i < 5; i++) {
      const gift = page.locator('.gift').nth(i);
      await gift.tap();
      await page.waitForTimeout(100);
    }

    // Should still show lyrics
    const lyrics = page.locator('.lyrics-display');
    await expect(lyrics).toBeVisible();
  });

  test('should work in portrait orientation', async ({ page }) => {
    await page.goto('/');

    const gifts = await page.locator('.gift').count();
    expect(gifts).toBe(12);

    // All gifts should be accessible
    const firstGift = page.locator('.gift').first();
    await expect(firstGift).toBeVisible();
  });

  test('should maintain functionality after orientation change', async ({ page }) => {
    await page.goto('/');
    await page.tap('.audio-permission-button');

    // Simulate landscape (Playwright doesn't support real rotation, but we can test responsiveness)
    await page.setViewportSize({ width: 844, height: 390 });

    // Should still work
    const firstGift = page.locator('.gift').first();
    await firstGift.tap();

    await expect(page.locator('.lyrics-display')).toBeVisible();
  });
});
