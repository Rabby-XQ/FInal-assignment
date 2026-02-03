const { test, expect } = require('@playwright/test');

test('Filter and purchase with performance_glitch_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('performance_glitch_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.click('[data-test="login-button"]');

  await page.click('#react-burger-menu-btn');
  await page.click('#reset_sidebar_link');
  await page.click('#react-burger-cross-btn');

  await page.selectOption('.product_sort_container', 'za');

  await page.locator('.inventory_item').first().locator('button').click();

  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');

  await page.locator('[data-test="firstName"]').fill('Ostad');
  await page.locator('[data-test="lastName"]').fill('Bd');
  await page.locator('[data-test="postalCode"]').fill('1234');
  await page.click('[data-test="continue"]');

  const productName = await page.locator('.inventory_item_name').innerText();
  const totalPrice = await page.locator('.summary_total_label').innerText();
  console.log(`Product: ${productName}, Total: ${totalPrice}`);

  await page.click('[data-test="finish"]');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

  await page.click('#react-burger-menu-btn');
  await page.click('#reset_sidebar_link');
  await page.click('#logout_sidebar_link');
});