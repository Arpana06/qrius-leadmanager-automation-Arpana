import { Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { LeadsPage } from './pages/LeadsPage';

export type Role = 'ADMIN' | 'AGENT';

export interface User {
  username: string;
  password: string;
  role: Role;
}

export const admin: User = { username: 'admin.qrius', password: 'Admin@123', role: 'ADMIN' };
export const agent: User = { username: 'agent.qrius', password: 'Agent@123', role: 'AGENT' };

export async function signIn(page: Page, user: User): Promise<LeadsPage> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(user.username, user.password);
  await loginPage.expectOnLeadsPage();
  return new LeadsPage(page);
}