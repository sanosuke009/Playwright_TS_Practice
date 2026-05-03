import { test, expect } from '@playwright/test';

test.skip('Visual testing using Playwright', { tag: '@visual' }, () => {
    test('First Test to capture baseline screenshots', async ({ page }) => {
        //Navigating to the heroku app page
        await page.goto('https://the-internet.herokuapp.com/login');
        // get by text
        const loginHeaderPage = page.getByText('Login Page');

        // using the stored locators in the test
        await expect(loginHeaderPage).toBeVisible();
        await expect(loginHeaderPage).toHaveScreenshot();
        console.log('Baseline screenshot of Login element captured successfully.');

    });
    test('Full page screenshot', async ({ page }) => {

        //Navigating to the heroku app page
        await page.goto('https://the-internet.herokuapp.com/login');
        // get by text
        const loginHeaderPage = page.getByText('Login Page');

        // using the stored locators in the test
        await expect(loginHeaderPage).toBeVisible();
        await expect(page).toHaveScreenshot({ fullPage: true });
        console.log('Baseline screenshot of Login page captured successfully.');
    });

    test('Masking sensitive data on screen', async ({ page }) => {

        //Navigating to the heroku app page
        await page.goto('https://the-internet.herokuapp.com/login');

        // Get by role
        const loginButton = page.getByRole('button', { name: 'Login' });
        // get by text
        const loginHeaderPage = page.getByText('Login Page');
        // get by label
        const usernameInput = page.getByLabel('Username');
        // get by css selectors
        const passwordInput = page.locator('#password');
        // get by xpath
        const homePageText = page.locator("//div[contains(text(), 'You logged into a secure area!')]");

        // using the stored locators in the test
        await expect.soft(loginHeaderPage).toBeVisible();
        const headerText = await loginHeaderPage.textContent();
        expect(page).toHaveScreenshot();
        expect.soft(headerText).toBe('Login Page');
        await usernameInput.fill('tomsmith');
        await passwordInput.fill('SuperSecretPassword!');
        expect(page).toHaveScreenshot('Masked_Login_Page_Screenshot_After_Filling_Creds.png', {
            mask:[ 
                usernameInput,
                passwordInput
            ]
        });
        await expect.soft(loginButton).toBeVisible();
        await loginButton.click();
        await expect.soft(homePageText).toBeVisible();

        // Getting the errors from the soft assertions
        const errors = test.info().errors
        expect(errors.length, `There are ${errors.length} errors in this assertions test.`).toBe(0);
    });
});