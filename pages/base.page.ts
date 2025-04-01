import { expect, type Page } from '@playwright/test';
require('dotenv').config();

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToHomePage() {
        await this.page.goto(`${process.env.BASE_URL}`, { waitUntil: 'networkidle' });
        await expect(this.page.getByRole('heading', { name: 'Full-Fledged practice website' })).toBeVisible();
    }

    async openLink(linkName: string, isExact: string = 'not exact') {
        await this.page.getByRole('link', { name: linkName, exact: isExact === 'exact' ? true : false }).click();
    }

    async clickButton(buttonName: string, timeOut = 0) {
        await this.page.getByRole('button', { name: buttonName }).click({ timeout: timeOut });
    }

    async deselectCurrentElement() {
        await this.page.locator('body').click();
    }

    async giveConsent() {
        await this.page.getByRole('button', { name: 'Consent' }).click();
    }

    async assertVisibleHeading(headingName: string) {
        await expect(this.page.getByRole('heading', { name: `${headingName}` })).toBeVisible();
    }

    async assertVisibleText(textValue: string) {
        await expect(this.page.getByText(textValue)).toBeVisible();
    }

    async fillTextBox(textBoxName: string, textBoxValue: string, isExact: string = 'not exact') {
        await this.page.getByRole('textbox', { name: textBoxName, exact: isExact === 'exact' ? true : false }).fill(textBoxValue);
    }
}