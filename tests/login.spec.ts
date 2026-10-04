import { test, expect } from '@playwright/test';

test('admin signs in and reaches the Leads page', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('username').fill('admin.qrius');
  await page.getByTestId('password').fill('Admin@123');
  await page.getByTestId('login-button').click();

  await expect(page).toHaveURL(/\/leads/);
  await expect(page.getByTestId('nav-role')).toHaveText('ADMIN');
});