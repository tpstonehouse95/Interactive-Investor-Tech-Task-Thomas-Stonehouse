import { test } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { SignupPage } from '../pages/signup.page';
import { newCustomerType, newTestCustomer } from '../test-data/customer.testData';
require('dotenv').config({ override: true });

test('Signup', async ({ page }) => {
  const basePage = new BasePage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const signupPage = new SignupPage(page);
  let newCustomer: newCustomerType;
  newCustomer = await newTestCustomer();

  await basePage.goToHomePage();
  await basePage.giveConsent();
  await homePage.openSignupOrLoginLink();
  await loginPage.assertVisibleHeading('New User Signup!');
  await loginPage.fillNewUserCredentials(newCustomer.userName, newCustomer.email);
  await loginPage.clickButton('Signup');
  await loginPage.assertVisibleText('Enter Account Information');
  await signupPage.enterAccountInformation(newCustomer);
  await signupPage.enterAddressInformation(newCustomer);
  await signupPage.clickButton('Create Account');
  await signupPage.assertVisibleText('Account Created!');
  await signupPage.openLink('Continue');
  await homePage.assertVisibleText(`Logged in as ${newCustomer.userName}`);
  //Cleanup
  await homePage.openLink('Delete Account');
  await homePage.assertVisibleText('Account Deleted!');
});