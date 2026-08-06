import {test, expect} from '@playwright/test';

    const selectors = {
        firstName: '#firstName',
        age: '#age',
        isStudent: '#isStudent'
    }
test.describe('Variable Declarations and Types', () => {
    test.skip('Declarations and Types', async ({page}) => {
    let firstname: string = 'John';
    let age: number = 30;
    let isStudent: boolean = false;

    await page.goto('file:///D:/Playwright/tests/workshop_7/index.html');
      await page.waitForTimeout(1000);
      await page.fill(selectors.firstName, firstname);
      await page.fill(selectors.age, age.toString());
      await page.check('#isStudent');
      await page.click('#applyData');

      expect(await page.textContent('#displayFirstName')).toContain(firstname);
      expect(await page.textContent('#displayAge')).toContain(age.toString());
      expect(await page.isChecked('#isStudent')).toBe(true);
      await page.waitForTimeout(1000);
    })
    });



test.describe('Type Definitions and Interfaces', () => {
    type User = {
            firstName: string,
            age: number,
            isStudent: boolean
        }

    let user: User = {
            firstName: 'Alice',
            age: 25,
            isStudent: true
        }

    test.skip('Type Definitions and Interfaces', async ({page}) => {
        await page.goto('file:///D:/Playwright/tests/workshop_7/index.html');
        await page.waitForTimeout(1000);
        await page.fill(selectors.firstName, user.firstName);
        await page.fill(selectors.age, user.age.toString());
        await page.click('#applyData');

    expect(await page.textContent('#displayFirstName')).toBe(user.firstName)
    expect(await page.textContent('#displayAge')).toContain(user.age.toString())
    expect(await page.isChecked('#isStudent')).not.toBe(user.isStudent);
    await page.waitForTimeout(1000);
})

})