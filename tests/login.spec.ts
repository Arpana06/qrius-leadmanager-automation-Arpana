import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('login page has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Qrius Lead Manager');
  });

  test('admin signs in and reaches the Leads page', async ({ page }) => {
    await page.getByTestId('username').fill('admin.qrius');
    await page.getByTestId('password').fill('Admin@123');
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL(/\/leads/);
    await expect(page.getByTestId('nav-role')).toHaveText('ADMIN');
  });

  test('agent signs in and sees the AGENT role', async ({ page }) => {
    await page.getByTestId('username').fill('agent.qrius');
    await page.getByTestId('password').fill('Agent@123');
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL(/\/leads/);
    await expect(page.getByTestId('nav-role')).toHaveText('AGENT');
  });

  test('wrong password shows an error and stays on login', async ({ page }) => {
    await page.getByTestId('username').fill('admin.qrius');
    await page.getByTestId('password').fill('WrongPassword');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('login-error')).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
   test('sign in button is visible on the login', async ({ page }) => {
    await expect(page.getByRole('button', { name: /sign in|log in|login/i })).toBeVisible();
  });
});