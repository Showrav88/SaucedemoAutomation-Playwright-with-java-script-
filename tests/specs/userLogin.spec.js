import { test, expect } from '@playwright/test';
import Login from '../pages/login';
import testData from '../../resource/testData.json';
import AddToCart from '../pages/addToCart';
test.describe('Valid User Login Tests and add to cart a product', () => {
      let login,addToCart;
  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    addToCart = new AddToCart(page);
    await page.goto('https://www.saucedemo.com/');
  });
    test('Valid User Login and add to cart a product', async ({ page }) => {

await login.clickUsernameField();
await login.enterUsernameField(testData.username);
await login.clickPasswordField();
await login.enterPasswordField(testData.password);
await login.clickLoginButton();
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  console.log('User is able to login with valid username and password');

// Get all product names & Add to Cart buttons
const productNames = await page.$$('.inventory_item_name');
const buttons = await page.$$('button.btn_inventory');

// Choose a random product
const randomIndex = Math.floor(Math.random() * productNames.length);
const selectedName = await productNames[randomIndex].innerText();

console.log(` Randomly selected product: ${selectedName}`);

//  Add that product to cart
await buttons[randomIndex].click();

// Verify cart badge = 1
await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
console.log(' Product successfully added to cart');

// Go to Cart
await addToCart.clickshoppingCartButton();
await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

//  Validate product name in CART
const cartName = await page.locator('.inventory_item_name').innerText();
expect(cartName).toBe(selectedName);
console.log(` Product name validated in Cart: ${cartName}`);

// Checkout Step 1
await addToCart.clickCheckoutButton();
await addToCart.enterFirstnameField(testData.firstname);
await addToCart.enterLastnameField(testData.lastname);
await addToCart.enterZipCodeField(testData.zipcode);
await addToCart.clickContinueButton();
await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

//  Validate product name in CHECKOUT STEP TWO
const checkoutName = await page.locator('.inventory_item_name').innerText();
expect(checkoutName).toBe(selectedName);
console.log(`✔ Product name validated at Checkout Step Two: ${checkoutName}`);

// Finish order
await addToCart.clickFinishButton();
await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
await expect(page.locator('.complete-header')).toHaveText(/Thank you/i);
console.log(' Order completed successfully');

// Back home
await addToCart.clickBackHomeButton();
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

// Logout
 await addToCart.clickHumburgerMenu();
await addToCart.clickLogoutButton();
await expect(page).toHaveURL('https://www.saucedemo.com/');
console.log(' User logged out successfully');




  });
}); 

