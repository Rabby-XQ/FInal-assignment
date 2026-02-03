const { test, expect } = require('@playwright/test');

test('Verify a user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const errorElement = page.locator('[data-test="error"]');
  
  await expect(errorElement).toBeVisible();
  
  const errorMessage = await errorElement.innerText();
  console.log("Captured Error: " + errorMessage);

  await expect(errorElement).toContainText('Epic sadface: Sorry, this user has been locked out.');
});