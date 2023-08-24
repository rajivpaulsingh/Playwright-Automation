import { test, expect } from '@playwright/test'
import { loadHomePage, assertTitle } from '../helpers'

test('custom helpers', async ({ page }) => {
    await loadHomePage(page)
    // await page.pause()
    await assertTitle(page)
})