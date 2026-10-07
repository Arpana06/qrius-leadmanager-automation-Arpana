import { test, expect } from '@playwright/test';
import { admin, agent, signIn } from './helpers';
import { LeadsPage } from './pages/LeadsPage';

const PREFIX = 'AutoTest';

function uniqueName(label: string): string {
  return `${PREFIX} ${label} ${Date.now()}`;
}

test.describe('Add, edit and delete (admin)', () => {
  let leads: LeadsPage;

  test.beforeEach(async ({ page }) => {
    leads = await signIn(page, admin);
    await expect(leads.rows.first()).toBeVisible();
  });

  test.afterEach(async () => {
    await leads.cleanup(PREFIX);
  });

  test('adding a lead saves it with the chosen status', async () => {
    const name = uniqueName('Status');
    await leads.addLead(name, 'Qualified');
    await expect(leads.rowFor(name)).toBeVisible();
    await expect(leads.statusOf(name)).toHaveText('Qualified');
  });

  test('the new lead appears in the list', async () => {
    const name = uniqueName('Appears');
    await leads.addLead(name);
    await expect(leads.rowFor(name)).toHaveCount(1);
  });

  test('editing a lead status updates it in the list', async () => {
    const name = uniqueName('Edit');
    await leads.addLead(name);
    await leads.editStatus(name, 'Contacted');
    await expect(leads.statusOf(name)).toHaveText('Contacted');
  });

  test('admin can delete a lead and the row disappears', async () => {
    const name = uniqueName('Delete');
    await leads.addLead(name);
    await leads.deleteLead(name);
    await expect(leads.rowFor(name)).toHaveCount(0);
  });
});

test('agent does not see a delete button', async ({ page }) => {
  const leads = await signIn(page, agent);
  await expect(leads.rows.first()).toBeVisible();
  await expect(leads.deleteButtons).toHaveCount(0);
});
// import { test, expect } from '@playwright/test';
// import { admin, agent, signIn } from './helpers';
// import { LeadsPage } from './pages/LeadsPage';

// function uniqueName(label: string): string {
//   return `AutoTest ${label} ${Date.now()}`;
// }

// test.describe('Add, edit and delete (admin)', () => {
//   let leads: LeadsPage;

//   test.beforeEach(async ({ page }) => {
//     leads = await signIn(page, admin);
//     await expect(leads.rows.first()).toBeVisible();
//   });

//   test('adding a lead saves it with the chosen status', async () => {
//     const name = uniqueName('Status');
//     await leads.addLead(name, 'Qualified');
//     await expect(leads.rowFor(name)).toBeVisible();
//     await expect(leads.statusOf(name)).toHaveText('Qualified');
//   });

//   test('the new lead appears in the list', async () => {
//     const name = uniqueName('Appears');
//     await leads.addLead(name);
//     await expect(leads.rowFor(name)).toHaveCount(1);
//   });

//   test('editing a lead status updates it in the list', async () => {
//     const name = uniqueName('Edit');
//     await leads.addLead(name);
//     await leads.editStatus(name, 'Contacted');
//     await expect(leads.statusOf(name)).toHaveText('Contacted');
//   });

//   test('admin can delete a lead and the row disappears', async () => {
//     const name = uniqueName('Delete');
//     await leads.addLead(name);
//     await leads.deleteLead(name);
//     await expect(leads.rowFor(name)).toHaveCount(0);
//   });
// });

// test('agent does not see a delete button', async ({ page }) => {
//   const leads = await signIn(page, agent);
//   await expect(leads.rows.first()).toBeVisible();
//   await expect(leads.deleteButtons).toHaveCount(0);
// });