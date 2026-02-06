import * as path from 'path';
import { test, expect } from '@playwright/test';

test.use({ 
  ignoreHTTPSErrors: true,
  channel: 'chrome',
  storageState: './auth.json',
});

test('product-info-agent-prd-generation', async ({ page }) => {
  await page.goto('https://sana.ai/sH2q8WWvqreN', { waitUntil: 'networkidle' });
  
  await page.locator('[aria-label="Close"]').first().click().catch(() => {});
  
  await page.locator('[data-intercom-target="sidebar-more-button"]').click();
  await page.getByText('Agents').click();
  await page.getByText('Product information agent').click();
  await page.getByText('Sources').click();

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('p.text-sm.block.truncate.text-left', { hasText: 'Upload files' }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join('/Users/gowrimurthy/Downloads/IMG_0014.PNG'));
  await page.waitForTimeout(2000);

  const chatInput = page.locator('#simple-chat-input');
  await chatInput.click({ force: true });
  await chatInput.fill('Based on this screen, create a PRD within 500 words and also suggest some upcoming features.');
  await chatInput.press('Enter');

  await expect(async () => {
    const content = (await page.textContent('body'))?.toLowerCase() ?? '';
    const keywords = ['prd', 'product', 'feature', 'requirement', 'upcoming', 'description', 'overview'];
    const matches = keywords.filter(k => content.includes(k));
    expect(matches.length).toBeGreaterThan(2);
  }).toPass({ timeout: 120000 });

  await page.screenshot({ path: 'test-results/product-info-agent-result.png', fullPage: true });
});
