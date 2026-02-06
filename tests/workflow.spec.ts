import { test, expect } from '@playwright/test';

// Use saved authentication state
test.use({ 
  ignoreHTTPSErrors: true,
  channel: 'chrome',
  storageState: './auth.json',
});

test('create new workflow', async ({ page }) => {

    await page.goto('https://sana.ai/sH2q8WWvqreN', { waitUntil: 'networkidle' });
    await page.locator('[aria-label="Close"]').first().click().catch(() => {});
    await page.getByText('Workflows').click();
    await page.getByText('Create workflow').click();
    await page.locator('[aria-label="Select trigger type"]').click();
    await page.getByText('Run manually').click();
    await page.getByText('Add step').click();

});
