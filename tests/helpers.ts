import { expect, Page } from '@playwright/test';

export type Role = 'ADMIN' | 'AGENT';

export interface User {
  username: string;
  password: string;
  role: Role;
}

export const admin: User = { username: 'admin.qrius', password: 'Admin@123', role: 'ADMIN' };
export const agent: User = { username: 'agent.qrius', password: 'Agent@123', role: 'AGENT' };

export async function signIn(page: Page, user: User): Promise<void> {
  await page.goto('/login');
  await page.getByTestId('username').fill(user.username);
  await page.getByTestId('password').fill(user.password);
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/\/leads/);
}