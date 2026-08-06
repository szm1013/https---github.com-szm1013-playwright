 import {test, expect} from '@playwright/test';
 import {PageObject} from './page/Page';



test.describe('Sample test', () => {
    let pageObject: PageObject;
   

 test.beforeEach(async ({ browser }) => {
    const page = await browser.newPage()
    pageObject = new PageObject(page);
    await pageObject.openUrl('file:///D:/Playwright/tests/workshop_8/index.html');
 })

 test.skip('test1 - Fill all inputs', async () => {
    await pageObject.fillFirstName('John');
    await pageObject.fillAge('25');
    await pageObject.checkIsStudent();
    await pageObject.applyData();

    expect(await pageObject.text(pageObject.displayFirstName)).toBe('John');
    expect(await pageObject.text(pageObject.displayAge)).toBe('25');
    expect(await pageObject.text(pageObject.displayIsStudent)).toBe('Yes');
    })



    
})