import {test, expect} from '@playwright/test';

test.skip('Automation Form Submissions', async ({page}) => {

    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const newTodo = await page.getByPlaceholder('What needs to be done?');
    await newTodo.fill('John Doe');
    await newTodo.press('Enter');
    await newTodo.fill('JJ Doe');
    await newTodo.press('Enter');
    await page.waitForTimeout(1000);

    const firstTodo = await page.getByTestId('todo-item').nth(0);
    await firstTodo.getByRole('checkbox').check();
    await page.waitForTimeout(1000);

    const secondTodo = await page.getByTestId('todo-item').nth(1);
    await secondTodo.getByRole('checkbox').check();
    await page.waitForTimeout(1000);
    
    await expect(secondTodo).not.toHaveClass('completed');
    await expect(firstTodo).toHaveClass('completed');
})


test.skip('Handling Form', async ({page}) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  const placeholder = '[placeholder="What needs to be done?"]'
  await page.fill(placeholder, 'John Doe');
  await page.locator('[placeholder="What needs to be done?"]').press('Enter');
  await page.waitForTimeout(2000);

  const checkbox = await page.locator('.toggle');
  await checkbox.check();
 // await expect(page.locator('text=0 items left')).toBeVisible();
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await page.waitForTimeout(2000);

})
