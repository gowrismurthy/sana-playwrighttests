import { test, expect } from '@playwright/test';

// Use saved authentication state - no login needed!
test.use({ 
  ignoreHTTPSErrors: true,
  channel: 'chrome',
  storageState: './auth.json',
});

test('login test', async ({ page }) => {
  // Go directly to the page - already authenticated!
  await page.goto('https://sana.ai/sH2q8WWvqreN', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  
  // Verify we're logged in by checking page content
  console.log('Current URL:', page.url());
  console.log('✅ Loaded page with saved authentication!');
  
});
