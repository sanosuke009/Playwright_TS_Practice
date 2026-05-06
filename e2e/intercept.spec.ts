import { test, expect } from '@playwright/test';
import * as fs from 'fs';
const APIUNIQUETESTDATA = './api_test_data/product_two_mocked.json';

test.describe('Intercepting And Mocking API in tests', { tag: '@mock' }, () => {
    test.skip('', async ({ page }) => {
        const mockedData = JSON.parse(fs.readFileSync(APIUNIQUETESTDATA, 'utf-8'));
        await page.route('https://the-internet.herokuapp.com/authenticate', async route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedData)
            });
        });

        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByRole('heading', { name: 'Login Page' }).click();
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
        await page.getByRole('button', { name: ' Login' }).click();

    });
});