import {test, expect} from '@playwright/test';
import fs from 'fs';

test.describe.only('Intercept Requests with Playwright', () => {

    //1. Mock a successful API response to GET a user with local JSON file
    test.only('Mock a successful API response to GET a user with local JSON file', async ({page}) => {

const mockData = JSON.parse(fs.readFileSync('tests/workshop_12_intercept_requests/test-data/user_two_mock.json'));

        await page.route('**/api/users/2', async (route) => {
    //        const json = await route.fetch();
    //        const data = await json.json();
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockData)
            });
        });

        await page.goto('https://app.reqres.in/playground');
        await page.getByPlaceholder('free_user_xxxxx').fill('reqres_1b583684f1cf4c04b9a192d37eff843e');
        await page.getByText('Single User').click();
        await page.getByRole('button', {name: 'Send request'}).click();
  
    });
})