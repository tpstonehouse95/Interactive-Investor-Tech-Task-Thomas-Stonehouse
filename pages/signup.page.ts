import { BasePage } from './base.page';
import { newCustomerType } from '../test-data/customer.testData';
import { expect } from '@playwright/test';
require('dotenv').config();

export class SignupPage extends BasePage {
    async enterAccountInformation(newCustomer: newCustomerType) {
        await this.page.waitForTimeout(2000);
        if (newCustomer.title === 'Mr.') {
            await this.page.getByRole('radio', { name: 'Mr.' }).check();
        }
        else {
            await this.page.getByRole('radio', { name: 'Mrs.' }).check();
        }
        await this.fillTextBox('Name *', newCustomer.userName, 'exact');
        await expect(this.page.getByRole('textbox', { name: 'Email *' })).toHaveValue(newCustomer.email);
        await this.fillTextBox('Password *', newCustomer.password);
        await this.page.locator('#days').selectOption(newCustomer.dateOfBirth.day);
        await this.page.locator('#months').selectOption(newCustomer.dateOfBirth.month);
        await this.page.locator('#years').selectOption(newCustomer.dateOfBirth.year);
        await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
        await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
    }

    async enterAddressInformation(newCustomer: newCustomerType) {
        await this.fillTextBox('First name *', newCustomer.firstName);
        await this.fillTextBox('Last Name *', newCustomer.lastName);
        await this.fillTextBox('Company', newCustomer.company, 'exact');
        await this.fillTextBox('Address * (Street address', newCustomer.address1);
        await this.fillTextBox('Address 2', newCustomer.address2);
        await this.page.getByLabel('Country *').selectOption(newCustomer.country);
        await this.fillTextBox('State *', newCustomer.state);
        await this.fillTextBox('City *', newCustomer.city);
        await this.page.locator('#zipcode').fill(newCustomer.zipCode);
        await this.fillTextBox('Mobile Number *', newCustomer.mobileNumber);
    }
}