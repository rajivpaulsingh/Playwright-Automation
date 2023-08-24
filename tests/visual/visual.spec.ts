import { test, expect } from '@playwright/test'

test.describe('Visual Regression Testing ', () => {
    test('Full page snapshot', async ({ page }) => {
        await page.goto('https://www.example.com')
        expect(await page.screenshot()).toMatchSnapshot('homepage.png')
    })

    test('Single element page snapshot', async ({ page }) => {
        await page.goto('https://www.example.com')
        const singleElement = await page.locator('h1')

        expect(await singleElement.screenshot()).toMatchSnapshot('page-title.png')
    })
})