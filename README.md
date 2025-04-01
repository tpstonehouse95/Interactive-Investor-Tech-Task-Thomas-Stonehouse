SETUP:
Install Node.js and npm via: https://nodejs.org/en

Setup the project by installing the dependencies via the following terminal command from the root of the project; npm install

The playwright tests can then be executed by running the following command from the root of the project; npx playwright test
This will run headlessly on 3 different browsers (chromium, firefox and safari) in parallel by default but can instead be run on a gui via: npx playwright test --ui

A video of the test being visibly executed on the gui can be found in the 'video' folder in the root of the project

USER JOURNEYS:
Of the test cases listed on the website I deem the following to be the most important along with justifications for the top 4 journeys which have been automated:
1. Register User:

Validates the end-to-end user registration process to ensure a seamless onboarding experience. Confirms that new users can successfully create an account by verifying UI elements, form inputs, and database interactions. Covers multiple scenarios, including newsletter subscription and special offers opt-in. Ensures that the account creation process is fully functional by checking form validation, success messages, and automatic login post-registration. Additionally, tests account deletion functionality to confirm that user data is removed correctly.

2. Login User with correct email and password

Ensures that registered users can successfully log in and access their accounts. Validates UI elements, form input handling, and authentication mechanisms. Confirms that users are correctly identified post-login by verifying the displayed username. Tests session management and navigational flows, ensuring users can proceed with account-related actions. Additionally, includes account deletion verification to confirm that user data is properly removed from the system.

3. Search Product

Verifies that users can efficiently search for products and receive relevant results. Ensures the search functionality retrieves and displays the correct items based on user input. Confirms UI elements, such as the search bar and results section, are visible and functioning correctly. Validates navigation to the product listing page and ensures that all matching products are displayed as expected.


4. Add Products in Cart

Validates that users can successfully add  products to their cart and manage their selections. Ensures that cart functionality correctly displays added items with accurate product details, including price, quantity, and total cost. Confirms that users can continue shopping without losing previously added items. Verifies UI interactions such as hover actions, button clicks, and navigation between product pages and the cart.


5. Verify Product Quantity in Cart
6. Place Order: Login Before Checkout