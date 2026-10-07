import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { LeadsPage } from './pages/LeadsPage';
import { admin, agent } from './helpers';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login page has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Qrius Lead Manager');
  });

  test('admin signs in and reaches the Leads page', async ({ page }) => {
    await loginPage.login(admin.username, admin.password);
    await loginPage.expectOnLeadsPage();
    await expect(new LeadsPage(page).roleBadge).toHaveText(admin.role);
  });

  test('agent signs in and sees the AGENT role', async ({ page }) => {
    await loginPage.login(agent.username, agent.password);
    await loginPage.expectOnLeadsPage();
    await expect(new LeadsPage(page).roleBadge).toHaveText(agent.role);
  });

  test('wrong password shows an error and stays on login', async ({ page }) => {
    await loginPage.login(admin.username, 'WrongPassword');
    await expect(loginPage.error).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test('sign in button is visible on the login page', async () => {
    await expect(loginPage.signInButtonByRole).toBeVisible();
  });
});