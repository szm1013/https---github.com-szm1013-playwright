import {test, expect} from '@playwright/test';

test.skip('Handling Alerts', async ({page}) => {
    await page.goto('file:///D:/Playwright/tests/workshop_4/index.html');

let alertMessage = '';
    await page.waitForTimeout(1000);
    await page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('alert');
        await page.waitForTimeout(3000);
        await dialog.accept();
    })

await page.click('#show-alert');

expect(alertMessage).toBe('This is a simple alert');
});

test.skip('Confirm Alert', async ({page}) => {

    await page.goto('file:///D:/Playwright/tests/workshop_4/index.html');
    let alertMessage = '';
    await page.waitForTimeout(1000);
    page.on('dialog', async(dialog) => {
        alertMessage = dialog.message();
        await page.waitForTimeout(2000);
        await dialog.dismiss();
    });

    await page.click('#show-confirm');;
    expect(alertMessage).toBe('You clicked Cancel.');
    await page.waitForTimeout(2000);

});

test.skip ('Handling pop-ups', async ({page}) => {
    await page.goto('file:///D:/Playwright/tests/workshop_4/index.html');
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('#open-popup'),
    ]);

    await popup.waitForLoadState();
    await popup.waitForTimeout(2000);
    expect(await popup.title()).toBe('Example Domain');
    expect(await popup.url()).toBe('https://example.com/');
    expect(await popup.textContent('p')).toContain('This domain is for use in documentation examples without needing permission. Avoid use in operations.');
    await popup.waitForTimeout(2000);
    expect(await popup.locator('body > div > p:nth-child(3) > a').textContent()).toContain('Learn more');
    expect(await popup.locator('body > div > p:nth-child(3) > a').getAttribute('href')).toBe('https://iana.org/domains/example');
    await popup.click('body > div > p:nth-child(3) > a');
    await popup.waitForTimeout(30000);
    await popup.close();
});