import { test, expect } from '@playwright/test';

/**
 * E2E Test: Desktop user flow
 * T060: Full desktop interaction flow
 */

test.describe('Desktop User Flow', () => {
  test('should display all 12 gifts on page load', async ({ page }) => {
    await page.goto('/');

    // Wait for app to load
    await page.waitForSelector('.gift-container');

    // Should see 12 gift images
    const gifts = await page.locator('.gift').count();
    expect(gifts).toBe(12);
  });

  test('should show audio permission prompt on first load', async ({ page }) => {
    await page.goto('/');

    // Should see audio permission prompt
    const prompt = page.locator('.audio-permission-overlay');
    await expect(prompt).toBeVisible();

    // Should have enable button
    const button = page.locator('.audio-permission-button');
    await expect(button).toBeVisible();
  });

  test('should dismiss audio prompt on click', async ({ page }) => {
    await page.goto('/');

    // Click enable audio button
    await page.click('.audio-permission-button');

    // Prompt should disappear
    const prompt = page.locator('.audio-permission-overlay');
    await expect(prompt).not.toBeVisible();
  });

  test('should display lyrics when hovering over gift', async ({ page }) => {
    await page.goto('/');

    // Dismiss audio prompt
    await page.click('.audio-permission-button');

    // Wait a moment for state to settle
    await page.waitForTimeout(200);

    // Hover over first gift using mouse move instead of hover()
    const firstGift = page.locator('.gift').first();
    const box = await firstGift.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

    // Should see lyrics display
    const lyrics = page.locator('.lyrics-display');
    await expect(lyrics).toBeVisible({ timeout: 5000 });

    // Lyrics should contain text
    const lyricsText = await lyrics.textContent();
    expect(lyricsText).toBeTruthy();
    expect(lyricsText.length).toBeGreaterThan(0);
  });

  test('should clear lyrics when hover ends', async ({ page }) => {
    await page.goto('/');
    await page.click('.audio-permission-button');

    // Hover over gift
    const firstGift = page.locator('.gift').first();
    await firstGift.hover();

    // Wait for lyrics to appear
    await page.waitForSelector('.lyrics-display');

    // Move away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);

    // Lyrics should be gone
    const lyrics = page.locator('.lyrics-display');
    await expect(lyrics).not.toBeVisible();
  });

  test('should apply animation class on hover', async ({ page }) => {
    await page.goto('/');
    await page.click('.audio-permission-button');

    const firstGift = page.locator('.gift').first();

    // Check animation class appears on hover
    await firstGift.hover();
    await expect(firstGift).toHaveClass(/gift--animating/);
  });

  test('should switch between different gifts', async ({ page }) => {
    await page.goto('/');
    await page.click('.audio-permission-button');

    // Hover over first gift
    const firstGift = page.locator('.gift').nth(0);
    await firstGift.hover();
    const firstLyrics = await page.locator('.lyrics-display').textContent();

    // Hover over second gift
    const secondGift = page.locator('.gift').nth(1);
    await secondGift.hover();
    const secondLyrics = await page.locator('.lyrics-display').textContent();

    // Lyrics should be different
    expect(firstLyrics).not.toBe(secondLyrics);
  });

  test('should handle rapid hovering between gifts', async ({ page }) => {
    await page.goto('/');
    await page.click('.audio-permission-button');

    // Rapidly hover over multiple gifts
    for (let i = 0; i < 5; i++) {
      const gift = page.locator('.gift').nth(i);
      await gift.hover();
      await page.waitForTimeout(50); // Brief pause
    }

    // Should still show lyrics for last hovered gift
    const lyrics = page.locator('.lyrics-display');
    await expect(lyrics).toBeVisible();
  });

  test('should have all gifts positioned on screen', async ({ page }) => {
    await page.goto('/');

    // Check that all gifts are within viewport
    const gifts = await page.locator('.gift').all();

    for (const gift of gifts) {
      const box = await gift.boundingBox();
      expect(box).not.toBeNull();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
    }
  });
});
