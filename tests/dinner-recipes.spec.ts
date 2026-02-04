import { test, expect } from '@playwright/test';

test.use({ 
  ignoreHTTPSErrors: true,
  channel: 'chrome',
  storageState: './auth.json',
});

test('dinner-recipes', async ({ page }) => {
  await page.goto('https://sana.ai/sH2q8WWvqreN', { waitUntil: 'networkidle' });
  
  await page.locator('[aria-label="Close"]').first().click().catch(() => {});
  
  const chatInput = page.locator('#simple-chat-input');
  await chatInput.fill('Give me dinner recipe ideas for 1 week with details like ingredients, measurement and instructions on how to cook');
  await chatInput.press('Enter');
  
  await expect(async () => {
    const content = (await page.textContent('body'))?.toLowerCase() ?? '';
    const keywords = ['ingredient', 'recipe', 'cook', 'dinner', 'instruction', 'day'];
    const matches = keywords.filter(k => content.includes(k));
    expect(matches.length).toBeGreaterThan(2);
  }).toPass({ timeout: 60000 });

  await page.screenshot({ path: 'test-results/dinner-recipes-result.png', fullPage: true });
});
