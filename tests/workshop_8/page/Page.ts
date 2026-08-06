import {Page} from '@playwright/test';
import {AbstractPage} from './AbstractPage';
import {Input} from './Input';
import {Button} from './Button';


export class PageObject extends AbstractPage {
    private button: Button;
    private input: Input;
    readonly firstNameInputSelector: string = '#firstName';
    readonly ageSelector: string = '#age';
    readonly isStudentCheckboxSelector = '#isStudent';
    readonly applyDataButtonSelector = '#applyData';

    readonly displayFirstName = '#displayFirstName';
    readonly displayAge = '#displayAge';
    readonly displayIsStudent = '#displayIsStudent';


    constructor(page: Page) {
        super(page);
        this.button = new Button(page);
        this.input = new Input(page);
    }

    async openUrl(url: string): Promise<void> {
            await this.page.goto(url);
    }

    async applyData(): Promise<void> {
        await this.button.clickButton(this.applyDataButtonSelector);
    }

    async fillFirstName(value: string): Promise<void> {
        await this.input.setInputValue(this.firstNameInputSelector, value);
    }

    async fillAge(value: string): Promise<void> {
        await this.input.setInputValue(this.ageSelector, value);
    }

    async setIsStudent(): Promise<void> {
        await this.input.setInputValue(this.isStudentCheckboxSelector, 'true');
    }

    async checkIsStudent(): Promise<void> {
        await this.page.check(this.isStudentCheckboxSelector);
    }

    
async text(selector: string): Promise<string | null>{
        const textContent = await this.page.textContent(selector);
        return textContent ?? null

    }


}