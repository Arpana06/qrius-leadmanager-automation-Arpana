import { test, expect, Page } from '@playwright/test';
import { admin, agent, signIn } from './helpers';

function uniqueName(label: string): string {
  return `AutoTest ${label} ${Date.now()}`;
}

async function addLead(page: Page, name: string, status?: string): Promise<void> {
  await page.getByTestId('add-lead-button').click();
  await expect(page.getByTestId('lead-modal')).toBeVisible();
  await page.getByTestId('name').fill(name);
  await page.getByTestId('email').fill('auto.test@example.com');
  await page.getByTestId('company').fill('AutoCorp');
  if (status) {
    await page.getByTestId('status').selectOption(status);
  }
  await page.getByTestId('save-button').click();
  await expect(page.getByTestId('lead-modal')).toBeHidden();
}

test.describe('admin', () => {
      test.afterEach(async ({ page }) => {
    await page.reload(); // closes any form that is still open
    await expect(page.getByTestId('lead-row').first()).toBeVisible();

    const leftovers = page.getByTestId('lead-row').filter({ hasText: 'AutoTest' });
    let remaining = await leftovers.count();
    while (remaining > 0) {
      await leftovers.first().getByTestId('delete-button').click();
      await expect(leftovers).toHaveCount(remaining - 1);
      remaining -= 1;
    }
  });
  test.beforeEach(async ({ page }) => {
    await signIn(page, admin);
    await expect(page.getByTestId('lead-row').first()).toBeVisible();
  });

  test('adding a lead saves it with the chosen status', async ({ page }) => {
    const name = uniqueName('Status');
    await addLead(page, name, 'Qualified');

    const row = page.getByTestId('lead-row').filter({ hasText: name });
    await expect(row).toBeVisible();
    await expect(row.getByTestId('lead-status')).toHaveText('Qualified');
  });

  test('the new lead appears in the list', async ({ page }) => {
    const name = uniqueName('Appears');
    await addLead(page, name);

    await expect(
      page.getByTestId('lead-row').filter({ hasText: name })
    ).toHaveCount(1);
  });

  test('editing a lead status and updating', async ({ page }) => {
    const name = uniqueName('Edit');
    await addLead(page, name);

    const row = page.getByTestId('lead-row').filter({ hasText: name });
    await row.getByTestId('edit-button').click();
    await expect(page.getByTestId('lead-modal')).toBeVisible();
    await page.getByTestId('status').selectOption('Contacted');
    await page.getByTestId('save-button').click();
    await expect(page.getByTestId('lead-modal')).toBeHidden();

    await expect(row.getByTestId('lead-status')).toHaveText('Contacted');
  });

  test('admin can delete a lead and the row disappears', async ({ page }) => {
    const name = uniqueName('Delete');
    await addLead(page, name);

    const row = page.getByTestId('lead-row').filter({ hasText: name });
    await row.getByTestId('delete-button').click();

    await expect(row).toHaveCount(0);
  });
});

test('agent does not see a delete button', async ({ page }) => {
  await signIn(page, agent);
  await expect(page.getByTestId('lead-row').first()).toBeVisible();
  await expect(page.getByTestId('delete-button')).toHaveCount(0);
});