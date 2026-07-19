import { expect, test } from '@playwright/test';

test('shows platform and API health safety status', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Development Platform Bootstrap' })).toBeVisible();
  await expect(page.getByTestId('api-status')).toHaveText('healthy');
  await expect(page.getByRole('alert')).toHaveText('Live trading is disabled and not implemented.');
});
