import { test, expect } from '@playwright/test';

async function signIn(page, username: string, password: string) {
  await page.goto('/login');
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/\/leads/);
}

test.describe('Leads list', () => {
  test('shows the correct number of leads after sign in', async ({ page }) => {
    await signIn(page, 'admin.qrius', 'Admin@123');
   await expect(page.getByTestId('lead-row')).toHaveCount(13);  });

  test('role badge shows ADMIN for the admin', async ({ page }) => {
    await signIn(page, 'admin.qrius', 'Admin@123');
    await expect(page.getByTestId('nav-role')).toHaveText('ADMIN');
  });

  test('role badge shows AGENT for the agent', async ({ page }) => {
    await signIn(page, 'agent.qrius', 'Agent@123');
    await expect(page.getByTestId('nav-role')).toHaveText('AGENT');
  });
});