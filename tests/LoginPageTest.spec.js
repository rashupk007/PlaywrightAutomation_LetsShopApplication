const {test, expect} = require('@playwright/test')

const {LoginPage} = require('../pageObjects/LoginPage')
const {UserRegistrationPage} = require('../pageObjects/UserRegistrationPage')

const url = "https://rahulshettyacademy.com/client"
const username = "ahmedrashaad3@gmail.com"
const invalidUsername = "ahmedrashaad"
const invalidUsername1 = "ahmedrashaad@hotmail."
const password = "Test@123"

let loginPage;
let userRegistrationPage

test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page)
    userRegistrationPage = new UserRegistrationPage(page)
    await loginPage.launchApplication(url)
})

test.describe("Login Test",()=>{
    test("Check the login with valid credentials", {tag:'@pom'}, async ({})=>{
        await loginPage.validLogin(username, password)
        await expect(loginPage.homePageIdentifier).toBeVisible()
    })

    test("Check the login with invalid credentials", {tag:'@pom'}, async ({})=>{
        await loginPage.invalidLogin(username, "password")
        await expect(loginPage.errorMessage).toHaveText("Incorrect email or password.")
    })

    test("Check the login with blank values", {tag:'@pom'}, async ({})=>{
        await loginPage.validLogin("", "")
        await expect(loginPage.requiredFields).toHaveCount(2)
        await expect(loginPage.requiredFields.first()).toHaveText("*Email is required")
        await expect(loginPage.requiredFields.last()).toHaveText("*Password is required")
    })

    test("Check the login with blank password", {tag:'@pom'}, async ({})=>{
        await loginPage.validLogin(username, "")
        await expect(loginPage.requiredFields).toHaveCount(1)
        await expect(loginPage.requiredFields.last()).toHaveText("*Password is required")
    })

    test("Check the login with data in email field without '@gmail.com'", {tag:'@pom'}, async ({})=>{
        await loginPage.validLogin(invalidUsername, password)
        await expect(loginPage.requiredFields).toHaveCount(1)
        await expect(loginPage.requiredFields.last()).toHaveText("*Enter Valid Email")
    })

    test("Check the login with data in email field without 'com'", {tag:'@pom'}, async ({})=>{
        await loginPage.validLogin(invalidUsername1, password)
        await expect(loginPage.requiredFields).toHaveCount(1)
        await expect(loginPage.requiredFields.last()).toHaveText("*Enter Valid Email")
    })

    test("Navigate to Register page using 'Don't have an account? Register here' link", {tag:'@pom'}, async()=>{
        await loginPage.navigateToRegisterPageUsingDontHaveAccountRegisterHereLink()
        await expect(userRegistrationPage.registerButton).toBeVisible()
    })

    test("Navigate to Forgot Password page using 'Forgot password?' link", {tag:'@pom'}, async()=>{
        await loginPage.navigateToForgotPasswordPage(url)
        await expect(loginPage.enterNewPasswordHeader).toBeVisible()
    })

})