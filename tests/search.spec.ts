// 
import { test, expect } from '@playwright/test';
import { admin, signIn } from './helpers';
import { LeadsPage } from './pages/LeadsPage';

test.describe('Search', () => {
  let leads: LeadsPage;

  test.beforeEach(async ({ page }) => {
    leads = await signIn(page, admin);
    await expect(leads.rows.first()).toBeVisible();
  });

  test('searching by lead name narrows the list', async () => {
    await leads.search('Sita');
    await expect(leads.rows).toHaveCount(1);
    await expect(leads.rows.first()).toContainText('Sita Sharma');
  });

  test('searching by company narrows the list', async () => {
    await leads.search('HimalKart');
    await expect(leads.rows).toHaveCount(1);
    await expect(leads.rows.first()).toContainText('HimalKart');
  });

  test('searching for something missing shows the empty state', async () => {
    await leads.search('zzzzzz');
    await expect(leads.rows).toHaveCount(0);
    await expect(leads.emptyState).toBeVisible();
  });

  test('count text reflects the number of leads shown', async () => {
    await leads.search('Sita');
    await expect(leads.rows).toHaveCount(1);
    await expect(leads.count).toContainText(/Showing 1 of \d+ leads/);
  });
});