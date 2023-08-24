import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Login page visual test', () => {

    let homepage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homepage.visit()
        await homepage.clickOnSignIn()
    })

    test('Login form',async ({ page }) => {
        await loginPage.snapshotLoginForm()
    })

    test('Login error form' , async ({ page }) => {
        await loginPage.snapshotErrorMessage()
    })
})