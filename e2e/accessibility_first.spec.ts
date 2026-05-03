import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('Accesibility Tests', { tag: '@accessibility' }, () => {
    test.skip('Accessibility First test', async ({ page }) => {
        //Navigating to the heroku app page
        await page.goto('https://the-internet.herokuapp.com/login');
        // Create the axebuilder object and analyze
        const axeBuilder = await  new AxeBuilder({ page })
        .withTags(
            ['wcga2a', 'wcga2aa']
        )
        .withRules(
            [
                'color-contrast',
                'aria-label'
            ]
        );
        const accessibilityResults = await axeBuilder.analyze();
        // Log the accessibility analysis
        console.log(accessibilityResults.violations);
        //Assert if there are any accessibility violations
        expect(accessibilityResults.violations.length).toBe(0);
    });
});