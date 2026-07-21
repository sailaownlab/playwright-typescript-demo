import { test, expect } from '@playwright/test';

test('Playwright website has the correct title and Get started link', async ({
  page,
}) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/abc/);

  const getStartedLink = page.getByRole('link', {
    name: 'Get started',
  });

  await expect(getStartedLink).toBeVisible();
});