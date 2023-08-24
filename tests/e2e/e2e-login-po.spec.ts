import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.only('Login / logout flow', () => {
    
    let loginPage: LoginPage
    let homePage: HomePage
    
    // Before hook
    test.beforeEach( async ({ page}) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        await homePage.visit()
    })

    // Negative scenario
    test('Negative scenario for login', async ({ page }) => {
        homePage.clickOnSignIn()       
        loginPage.login('invalid username', 'invalid password')
        await loginPage.wait(3000) // from abstract class
        loginPage.assertErrorMessage()
    })

    // Positive scenario and logout
    test('Positive scenario for login', async ({ page }) => {
        homePage.clickOnSignIn()      
        loginPage.login('username', 'password')
        
        await page.goto('http://zero.webappsecurity.com/index.html')

        const homeMenu = await page.locator('#homeMenu')
        await expect(homeMenu).toBeVisible()
    })

})