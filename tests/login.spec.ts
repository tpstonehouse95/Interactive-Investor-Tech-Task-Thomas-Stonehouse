import { test } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { newCustomerType, newTestCustomer } from '../test-data/customer.testData';
import { expect } from '@playwright/test';
require('dotenv').config({ override: true });

test('Login', async ({ page, request }) => {
  const basePage = new BasePage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  let newCustomer: newCustomerType;
  newCustomer = await newTestCustomer();

  const response = await request.post(`${process.env.CREATE_ACCOUNT_URL}`, {
    headers: {
      Accept: "*/*",
      ContentType: "multipart/form-data",
    },
    multipart: {
      name: newCustomer.userName,
      email: newCustomer.email,
      password: newCustomer.password,
      title: newCustomer.title,
      birth_date: newCustomer.dateOfBirth.day,
      birth_month: newCustomer.dateOfBirth.month,
      birth_year: newCustomer.dateOfBirth.year,
      firstname: newCustomer.firstName,
      lastname: newCustomer.lastName,
      company: newCustomer.company,
      address1: newCustomer.address1,
      address2: newCustomer.address2,
      country: newCustomer.country,
      zipcode: newCustomer.zipCode,
      state: newCustomer.state,
      city: newCustomer.city,
      mobile_number: newCustomer.mobileNumber,
    },
  });
  expect(response.status()).toBe(200);

  await basePage.goToHomePage();
  await basePage.giveConsent();
  await homePage.openSignupOrLoginLink();
  await loginPage.assertVisibleHeading('Login to your account');
  await loginPage.fillInLoginCredentials(newCustomer.email, newCustomer.password);
  await loginPage.clickButton('Login');
  await homePage.assertVisibleText(`Logged in as ${newCustomer.userName}`);
  //Cleanup
  await homePage.openLink('Delete Account');
  await homePage.assertVisibleText('Account Deleted!');
});