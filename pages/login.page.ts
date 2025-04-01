import { BasePage } from './base.page';
require('dotenv').config();

export class LoginPage extends BasePage {
    async fillNewUserCredentials(username: string, email: string) {
        await this.fillTextBox('Name', username);
        await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email)
    }

    async fillInLoginCredentials(email: string, password: string) {
        await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email)
        await this.fillTextBox('Password', password);
    }
}