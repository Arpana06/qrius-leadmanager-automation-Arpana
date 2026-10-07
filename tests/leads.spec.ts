import { test, expect } from '@playwright/test';
import { admin, agent, signIn } from './helpers';

test.describe('Leads list', () => {
  test('shows 12 leads after sign in', async ({ page }) => {
    const leads = await signIn(page, admin);
    await expect(leads.rows).toHaveCount(12);
  });

  test('role badge shows ADMIN for the admin', async ({ page }) => {
    const leads = await signIn(page, admin);
    await expect(leads.roleBadge).toHaveText(admin.role);
  });

  test('role badge shows AGENT for the agent', async ({ page }) => {
    const leads = await signIn(page, agent);
    await expect(leads.roleBadge).toHaveText(agent.role);
  });
});