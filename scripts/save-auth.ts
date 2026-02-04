import { chromium } from '@playwright/test';

async function saveAuth() {
  // Launch real Chrome with persistent profile - appears as regular browser
  const browser = await chromium.launchPersistentContext('./chrome-profile', {
    headless: false,
    channel: 'chrome', // Use real Chrome
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-infobars',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-default-browser-check',
    ],
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto('https://sana.ai/sH2q8WWvqreN');

  console.log('');
  console.log('='.repeat(60));
  console.log('MANUAL LOGIN REQUIRED');
  console.log('='.repeat(60));
  console.log('1. Complete the Google login in the browser');
  console.log('2. Once fully logged in, press ENTER here to save session');
  console.log('='.repeat(60));
  console.log('');

  // Wait for user input
  await new Promise(resolve => {
    process.stdin.once('data', resolve);
  });

  // Save storage state
  await browser.storageState({ path: './auth.json' });
  console.log('✅ Session saved to auth.json');
  
  await browser.close();
}

saveAuth().catch(console.error);
