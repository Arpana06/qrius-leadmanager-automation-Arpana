import { test, expect } from '@playwright/test';
import { admin, agent, signIn } from './helpers';

test.describe('Leads list', () => {
  test('shows 12 leads after sign in', async ({ page }) => {
    await signIn(page, admin);
    await expect(page.getByTestId('lead-row')).toHaveCount(12);
  });

  test('role badge shows ADMIN for the admin', async ({ page }) => {
    await signIn(page, admin);
    await expect(page.getByTestId('nav-role')).toHaveText(admin.role);
  });

  test('role badge shows AGENT for the agent', async ({ page }) => {
    await signIn(page, agent);
    await expect(page.getByTestId('nav-role')).toHaveText(agent.role);
  });
});