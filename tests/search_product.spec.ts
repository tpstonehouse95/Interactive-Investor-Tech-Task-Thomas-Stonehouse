import { expect, test } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { ProductPage } from '../pages/product.page';
require('dotenv').config({ override: true });

test('Product search', async ({ page }) => {
  const basePage = new BasePage(page);
  const productPage = new ProductPage(page);
  const productName = 'Blue';

  await basePage.goToHomePage();
  await basePage.giveConsent();
  await basePage.openLink('Products');
  await expect(page).toHaveURL(`${process.env.PRODUCT_PAGE_URL}`);
  await productPage.searchProduct(productName);
  await page.locator('#submit_search').click();
  await productPage.assertVisibleHeading('Searched Products');
  await productPage.assertMatchingSearchResults(productName.toLowerCase());
});