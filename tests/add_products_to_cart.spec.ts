import { test } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { HomePage } from '../pages/home.page';
import { newCustomerType, newTestCustomer } from '../test-data/customer.testData';
import { expect } from '@playwright/test';
import { ProductPage } from '../pages/product.page';

require('dotenv').config({ override: true });

test('Add product to cart', async ({ page }) => {
  const basePage = new BasePage(page);
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  let newCustomer: newCustomerType;
  newCustomer = await newTestCustomer();

  await basePage.goToHomePage();
  await basePage.giveConsent();
  await homePage.openSignupOrLoginLink();
  await basePage.openLink('Products');
  await expect(page).toHaveURL(`${process.env.PRODUCT_PAGE_URL}`);
  const firstItemDetails = await productPage.nthItemDetails(0);
  await productPage.addNthItemToCart(0);
  await productPage.continueShopping();
  const secondItemDetails = await productPage.nthItemDetails(1);
  await productPage.addNthItemToCart(1);
  await productPage.continueShopping();
  await productPage.addNthItemToCart(1);
  await productPage.continueShopping();
  await productPage.openLink('Cart');
  await productPage.assertCartContents(firstItemDetails, 1, 1);
  await productPage.assertCartContents(secondItemDetails, 2, 2);
});