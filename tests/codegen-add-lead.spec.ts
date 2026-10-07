import { test, expect } from '@playwright/test';
import { admin, signIn } from './helpers';
import { LeadsPage } from './pages/LeadsPage';

const PREFIX = 'Codegen';

test.describe('Codegen flow: add a lead', () => {
  let leads: LeadsPage;

  test.beforeEach(async ({ page }) => {
    leads = await signIn(page, admin);
  });

  test.afterEach(async () => {
    await leads.cleanup(PREFIX);
  });

  test('admin adds a lead and sees it in the list', async ({ page }) => {
    const name = `${PREFIX} Lead ${Date.now()}`;

    await page.getByTestId('add-lead-button').click();
    await page.getByTestId('name').fill(name);
    await page.getByTestId('email').fill('codegen.lead@example.com');
    await page.getByTestId('company').fill('CodegenCorp');
    await page.getByTestId('save-button').click();

    await expect(leads.rowFor(name)).toBeVisible();
    await expect(leads.rowFor(name)).toContainText('CodegenCorp');
  });
});