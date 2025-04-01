import { expect } from '@playwright/test';
import { BasePage } from './base.page';
require('dotenv').config();

export class ProductPage extends BasePage {
    async searchProduct(productName: string) {
        await this.fillTextBox('Search product', productName);
    }
    async addNthItemToCart(itemNumber: number) {
        await this.page.locator('.single-products').nth(itemNumber).hover();
        await this.page.locator('.productinfo > .btn').nth(itemNumber).click();
    }

    async nthItemDetails(itemNumber: number) {
        const price = Number((await (this.page.locator('.single-products').nth(itemNumber).getByText('Rs.')).first().innerText()).split('Rs.')[1]);
        const itemName = (await (this.page.locator('.single-products').nth(itemNumber).locator('p')).first().innerText());
        return { price, itemName }
    }
    async continueShopping() {
        await this.clickButton('Continue Shopping');
    }

    async assertMatchingSearchResults(productName: string) {
        const products = await this.page.locator('.single-products').all();

        for (const product of products) {
            const text = await product.textContent();
            expect(text?.toLowerCase()).toContain(productName.toLowerCase());
        }
    }

    async assertCartContents(expectedProductDetails: { price: number, itemName: string }, cartItemNumber: number, expectedQuantity: number) {
        await expect(this.page.locator(`#product-${cartItemNumber}`).locator('.cart_description')).toContainText(expectedProductDetails.itemName);
        await expect(this.page.locator(`#product-${cartItemNumber}`).locator('.cart_price')).toContainText(expectedProductDetails.price.toString());
        await expect(this.page.locator(`#product-${cartItemNumber}`).locator('.cart_quantity')).toContainText(expectedQuantity.toString());
        await expect(this.page.locator(`#product-${cartItemNumber}`).locator('.cart_total')).toContainText(`Rs. ${expectedProductDetails.price * expectedQuantity}`);
    }
}