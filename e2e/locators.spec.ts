import { test, expect } from '@playwright/test';

test('Different types of locators', { tag: '@locators'}, async({ page }) => {

    //Navigating to the heroku app page
    await page.goto('https://the-internet.herokuapp.com/login');

    // Get by role
    const loginButton = page.getByRole('button', { name: 'Login'});
    // get by text
    const loginHeaderPage = page.getByText('Login Page');
    // get by label
    const usernameInput = page.getByLabel('Username');
    // get by css selectors
    const passwordInput = page.locator('#password');
    // get by xpath
    const homePageText = page.locator("//div[contains(text(), 'You logged into a secure area!')]");

    // using the stored locators in the test
    await expect(loginHeaderPage).toBeVisible();
    await usernameInput.fill('tomsmith');
    await passwordInput.fill('SuperSecretPassword!');
    await loginButton.click();
    await expect(homePageText).toBeVisible();
});