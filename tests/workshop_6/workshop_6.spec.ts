import {test, expect} from '@playwright/test';

const testData = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    number: '555-1234',
}

test.skip('User registration Tests', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('file:///D:/Playwright/tests/workshop_6/index.html');
    });

    test.skip('Register with valid data', async ({page}) => {
        //await page.goto('file:///D:/Playwright/tests/workshop_6/index.html');

        await page.fill('#firstName', testData.firstName);
        await page.fill('#lastName', testData.lastName);
        await page.fill('#address', testData.address);
        await page.fill('#number', testData.number);
        await page.click('#register');
        await page.waitForTimeout(3000);

        const firstNameText = await page.locator('#displayFirstName').textContent();
        const lastNameText = await page.locator('#displayLastName').textContent();
        const addressText = await page.locator('#displayAddress').textContent();
        const numberText = await page.locator('#displayNumber').textContent();

        await expect(firstNameText).toEqual(testData.firstName);
        await expect(lastNameText).toEqual(testData.lastName);
        await expect(addressText).toEqual(testData.address);
        await expect(numberText).toEqual(testData.number);
    });

    test.skip('Register with empty fields', async ({page}) => {
       //await page.goto('file:///D:/Playwright/tests/workshop_6/index.html');
        await page.fill('#firstName', testData.firstName);
        await page.fill('#lastName', testData.lastName);
        await page.click('#register');
        await page.waitForTimeout(3000);
        const error = await page.locator('#error p').textContent();

        await expect(error).toBe('Please fill in all fields.');
    })

    test.skip('Register with all empty fields', async ({page})=>{
        await page.click('#register');
        const error = await page.locator('#error p').textContent()
        expect(error).toBe('Please fill in all fields.')
        await page.waitForTimeout(3000);
    });

});