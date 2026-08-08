import {test, expect} from '@playwright/test';

test('Automating Form Submissions @githubAction', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const newTodo = await page.getByPlaceholder('What needs to be done?');
    await newTodo.fill('John Doe');
    await newTodo.press('Enter');
    await newTodo.fill('JJ Doe');
    await newTodo.press('Enter');


    const firstTodo = await page.getByTestId('todo-item').nth(0);
    await firstTodo.getByRole('checkbox').check();
    
    const secondTodo = await page.getByTestId('todo-item').nth(1);
    //await secondTodo.getByRole('checkbox').check();

    await expect(firstTodo).toHaveClass('completed');
    await expect(secondTodo).not.toHaveClass('completed');
})


test('Handling Form @githubAction', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.fill('[placeholder="What needs to be done?"]', 'John Doe');
    await page.locator('[placeholder="What needs to be done?"]').press('Enter');

    const checkBox = await page.locator('.toggle');
    await checkBox.check();
})