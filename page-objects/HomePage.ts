import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    // Define selectors
    readonly page: Page
    readonly signInButton: Locator

    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator('#signin_button')
    }

    // Define page methods
    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/index.html')
    }

    async clickOnSignIn() {
        await this.signInButton.click()
    }
}