import { Page, Locator, expect } from '@playwright/test';

export class LeadsPage {
  readonly page: Page;
  readonly rows: Locator;
  readonly searchInput: Locator;
  readonly count: Locator;
  readonly emptyState: Locator;
  readonly roleBadge: Locator;
  readonly deleteButtons: Locator;
  readonly addButton: Locator;
  readonly modal: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly companyField: Locator;
  readonly statusField: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rows = page.getByTestId('lead-row');
    this.searchInput = page.getByTestId('search-input');
    this.count = page.getByTestId('lead-count');
    this.emptyState = page.getByTestId('empty-state');
    this.roleBadge = page.getByTestId('nav-role');
    this.deleteButtons = page.getByTestId('delete-button');
    this.addButton = page.getByTestId('add-lead-button');
    this.modal = page.getByTestId('lead-modal');
    this.nameField = page.getByTestId('name');
    this.emailField = page.getByTestId('email');
    this.companyField = page.getByTestId('company');
    this.statusField = page.getByTestId('status');
    this.saveButton = page.getByTestId('save-button');
    this.cancelButton = page.getByTestId('cancel-button');
  }

  rowFor(text: string): Locator {
    return this.rows.filter({ hasText: text });
  }

  statusOf(text: string): Locator {
    return this.rowFor(text).getByTestId('lead-status');
  }

  async search(text: string): Promise<void> {
    await this.searchInput.fill(text);
  }

  async addLead(name: string, status?: string): Promise<void> {
    await this.addButton.click();
    await expect(this.modal).toBeVisible();
    await this.nameField.fill(name);
    await this.emailField.fill('auto.test@example.com');
    await this.companyField.fill('AutoCorp');
    if (status) {
      await this.statusField.selectOption(status);
    }
    await this.saveButton.click();
    await expect(this.modal).toBeHidden();
  }

  async editStatus(name: string, status: string): Promise<void> {
    await this.rowFor(name).getByTestId('edit-button').click();
    await expect(this.modal).toBeVisible();
    await this.statusField.selectOption(status);
    await this.saveButton.click();
    await expect(this.modal).toBeHidden();
  }

  async deleteLead(name: string): Promise<void> {
    await this.rowFor(name).getByTestId('delete-button').click();
  }

  // Removes every lead whose text contains the prefix, so tests leave no data behind
  async cleanup(prefix: string): Promise<void> {
    if (await this.modal.isVisible()) {
      await this.cancelButton.click();
      await expect(this.modal).toBeHidden();
    }
    let remaining = await this.rowFor(prefix).count();
    while (remaining > 0) {
      await this.rowFor(prefix).first().getByTestId('delete-button').click();
      await expect(this.rowFor(prefix)).toHaveCount(remaining - 1);
      remaining -= 1;
    }
  }
}
