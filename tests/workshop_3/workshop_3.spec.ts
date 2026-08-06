import {test, expect} from '@playwright/test';

test.skip('Advanced Interactions', async ({page}) => {
    await page.goto('file:///D:/Playwright/e2e/workshop_3/index.html');
    //await page.waitForTimeout(1000);
    await page.hover('button#hover-me');
    expect(await page.textContent('button#hover-me')).toContain('Text Changed!');
    await page.waitForTimeout(1000);

    await page.click('button#context-menu', {button: 'right'});
    expect(await page.getByText('Context Menu Appears!').textContent()).toContain('Context Menu Appears!');
    await page.waitForTimeout(1000);

    await page.dblclick('button#double-click');
    //expect(await page.locator('img)').isVisible()).toBeTruthy();
    expect(await page.locator('img').count()).toBe(1);
    await page.waitForTimeout(1000);

});

test.skip('Drag and Drop', async ({page}) => {
    await page.goto('file:///D:/Playwright/tests/workshop_3/index.html');
    await page.dragAndDrop('.drag-source', '.drop-target');
    expect(await page.textContent('.drop-target')).toContain('Success');
    await page.waitForTimeout(2000);



});

test.skip('Drag and Drop 2', async ({page}) => {
    await page.goto('file:///D:/Playwright/tests/workshop_3/index.html');
    await page.locator('.drag-source').hover();
    await page.mouse.down();
    await page.locator('.drop-target').hover();
    await page.mouse.up();
    expect(await page.textContent('.drop-target')).toContain('Success');
    await page.waitForTimeout(2000);
});

test.skip('Handling iframe', async ({page}) => {
    await page.goto('file:///D:/Playwright/tests/workshop_3/index.html');
    const iframeElement = await page.frame({name: 'iframeName'});
    const inputSelector = '#iframe-input';

    if (iframeElement) {
    await iframeElement.type(inputSelector, 'Hello from Playwright!');
    expect (await iframeElement.locator(inputSelector).inputValue()).toContain('Hello from Playwright!');
    }
    else {
    console.error('Iframe not found');
    }
    await page.waitForTimeout(2000);
});