import {Page} from '@playwright/test';

export abstract class AbstractPage {
    protected page: Page

    constructor(page: Page) {
        this.page = page
}

abstract openUrl(url: string): Promise<void>


}