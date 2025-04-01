import { BasePage } from './base.page';
require('dotenv').config();

export class HomePage extends BasePage {
    async openSignupOrLoginLink() {
        await this.openLink('Signup / Login');
    }
}