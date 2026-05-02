import { test, expect } from '@playwright/test';

test.describe('Codegen login tests', () => {
    test('codegen test 1', { tag: '@codegen' }, async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByRole('heading', { name: 'Login Page' }).click();
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
        await page.getByRole('button', { name: ' Login' }).click();
        await page.getByText('You logged into a secure area').click();
        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
        await page.getByRole('heading', { name: 'Secure Area', exact: true }).click();
        await page.getByRole('link', { name: 'Logout' }).click();
    });

    test('Negative codegen test 1', { tag: '@codegen' }, async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByRole('heading', { name: 'Login Page' }).click();
        await expect(page.locator('h2')).toContainText('Login Page');
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('failed');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('failed');
        await page.getByRole('button', { name: ' Login' }).click();
        await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    });

    // test('Failing codegen test 1', { tag: '@codegen' }, async ({ page }) => {
    //     await page.goto('https://the-internet.herokuapp.com/login');
    //     await page.getByRole('heading', { name: 'Login Page' }).click();
    //     await expect(page.locator('h2')).toContainText('Login Page');
    //     await page.getByRole('textbox', { name: 'Username' }).click();
    //     await page.getByRole('textbox', { name: 'Username' }).fill('failed');
    //     await page.getByRole('textbox', { name: 'Password' }).click();
    //     await page.getByRole('textbox', { name: 'Password' }).fill('failed');
    //     await page.getByRole('button', { name: ' Login' }).click();
    //     await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    // });
});