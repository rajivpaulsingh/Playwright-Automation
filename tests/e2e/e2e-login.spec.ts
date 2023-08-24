import { test, expect } from '@playwright/test'

test.describe('Login / logout flow', () => {
    
    // Before hook
    test.beforeEach( async ({ page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
    })

    // Negative scenario
    test('Negative scenario for login', async ({ page }) => {
        await page.click('#signin_button')
        await page.type('#user_login', 'some username')
        await page.type('#user_password', 'some password')
        await page.click('text=Sign in')

        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })

    // Positive scenario and logout
    test('Positive scenario for login', async ({ page }) => {
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign in')

        await page.goto('http://zero.webappsecurity.com/index.html')

        const homeMenu = await page.locator('#homeMenu')
        await expect(homeMenu).toBeVisible()
    })

})