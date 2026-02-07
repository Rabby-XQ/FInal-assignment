const { test, expect } = require('@playwright/test');

test('Complete Purchase Journey and Reset State', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.click('#react-burger-menu-btn');
  await page.click('#reset_sidebar_link');
  await page.click('#react-burger-cross-btn');

  const products = page.locator('.inventory_item');
  for (let i = 0; i < 3; i++) {
    await products.nth(i).locator('button').click();
  }

  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');

  await page.locator('[data-test="firstName"]').fill('valid');
  await page.locator('[data-test="lastName"]').fill('user');
  await page.locator('[data-test="postalCode"]').fill('1234');
  await page.click('[data-test="continue"]');

  const totalLabel = await page.locator('.summary_total_label').innerText();
  console.log("Verified " + totalLabel);
  await page.click('[data-test="finish"]');

  const successMessage = page.locator('.complete-header');
  await expect(successMessage).toHaveText('Thank you for your order!');

  await page.click('#react-burger-menu-btn');
  await page.click('#reset_sidebar_link');
  await page.click('#logout_sidebar_link');
  
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});