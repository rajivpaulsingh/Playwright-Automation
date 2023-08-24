import { test, expect } from '@playwright/test'

test('Single basic test', async ({ page }) => {
    await page.goto('http://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test('clicking on elements', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text=Sign in')
    
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.skip('selectors', async ({ page }) => {
    // text
    await page.click('text=some text')

    // css selector
    await page.click('button')
    await page.click('h1')
    await page.click('#id')
    await page.click('.className')

    // only visible css selector
    await page.click('.submit-button:visible')

    // combinations
    await page.click('$username .first')

    // xpath
    await page.click('//button')
})

test.describe.parallel('Test suite @suiteTag', () => {
    test('working with inputs', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
    
        await page.type('#user_login', 'some username')
        await page.type('#user_password', 'some password')
        await page.click('text=Sign in')
    
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    
    test('assertions @suiteTag', async ({ page}) => {
        await page.goto('http://www.example.com')
        await expect(page).toHaveURL('http://www.example.com')
        await expect(page).toHaveTitle('Example Domain')
    
        const element = await page.locator('h1')
        await expect(element).toBeVisible()
        await expect(element).toHaveText('Example Domain')
        await expect(element).toHaveCount(1)
    
        const nonElement = await page.locator('h5')
        await expect(nonElement).not.toBeVisible()
    })
})

test('screenshots',async ({ page }) => {
    await page.goto('http://www.example.com')

    // screenshot
    await page.screenshot({ path: 'screenshot.png', fullPage: true})

    // single element screenshot
    const element = await page.$('h1')
    await element?.screenshot({ path: 'elementScreenshot.png'})
})