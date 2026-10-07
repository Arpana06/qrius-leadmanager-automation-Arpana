import { test, expect } from '@playwright/test';
import { admin, signIn } from './helpers';

test.beforeEach(async ({ page }) => {
  await signIn(page, admin);
  await expect(page.getByTestId('lead-row')).toHaveCount(12);
});

  test('searching by lead name narrows the list', async ({ page }) => {
    await page.getByTestId('search-input').fill('Sita');
    await expect(page.getByTestId('lead-row')).toHaveCount(1);
    await expect(page.getByTestId('lead-row').first()).toContainText('Sita Sharma');
  });

     test('searching by company narrows the list', async ({ page }) => {
    await page.getByTestId('search-input').fill('HimalKart');
    await expect(page.getByTestId('lead-row')).toHaveCount(1);
    await expect(page.getByTestId('lead-row').first()).toContainText('HimalKart');
  });
  test('searching for something missing shows the empty state', async ({ page }) => {
    await page.getByTestId('search-input').fill('zzzzzz');
    await expect(page.getByTestId('lead-row')).toHaveCount(0);
    await expect(page.getByTestId('empty-state')).toBeVisible();
  });

  test('count text reflects the number of leads shown', async ({ page }) => {
    await page.getByTestId('search-input').fill('Sita');
    await expect(page.getByTestId('lead-row')).toHaveCount(1);
    await expect(page.getByTestId('lead-count')).toContainText('Showing 1 of 12');
  });