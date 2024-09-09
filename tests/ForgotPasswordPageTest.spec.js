const {test, expect} = require('@playwright/test')

const {ForgotPasswordPage} = require('../pageObjects/ForgotPasswordPage')
const {LoginPage} = require('../pageObjects/LoginPage')
const {UserRegistrationPage} = require('../pageObjects/UserRegistrationPage')

const url = "https://rahulshettyacademy.com/client"
const username = "ahmedrashaad9@hotmail.com"
const password = "Test@123"
const invalidPassword = "Test@124"
const invalidUsername = "ahmedrash@gmail.com"
const invalidUsername1 = "ahmedrash"
const invalidUsername2 = "ahmedrash."

let loginPage;
let userRegistrationPage
let forgotPasswordPage

test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page)
    userRegistrationPage = new UserRegistrationPage(page)
    forgotPasswordPage = new ForgotPasswordPage(page)
    await loginPage.navigateToForgotPasswordPage(url)
})

test.describe("Forgot Password Test", ()=>{
    test("Change password with valid details", {tag:'@pom'}, async()=>{
        await forgotPasswordPage.changePasswordValid(username, password, password)
        await expect(forgotPasswordPage.passwordChangeSuccessMessage).toBeVisible()
        await expect(forgotPasswordPage.passwordChangeSuccessMessage).toHaveText("Password Changed Successfully")
    })

    test("Change password with all blank values", {tag:'@pom'}, async()=>{
        await forgotPasswordPage.changePasswordValid("", "", "")
        await expect(forgotPasswordPage.requiredFields).toHaveCount(3)
    })

    test("Change password with invalid user email", {tag:'@pom'}, async()=>{
        await forgotPasswordPage.changePasswordValid(invalidUsername, password, password)
        await expect(forgotPasswordPage.userNotFoundErrorMessage).toBeVisible()
        await expect(forgotPasswordPage.userNotFoundErrorMessage).toHaveText("User Not found.")
    })

    test("Change password with blank password field", {tag:'@pom'}, async()=>{
        await forgotPasswordPage.changePasswordValid(username, "", "")
        await expect(forgotPasswordPage.requiredFields).toHaveCount(2)
        await expect(forgotPasswordPage.requiredFields.first()).toHaveText("*Password is required")
        await expect(forgotPasswordPage.requiredFields.last()).toHaveText("*Confirm Password is required")
    })

    test("Change password with different values in password and confirm password", {tag:'@pom'}, async()=>{
        await forgotPasswordPage.changePasswordValid(username, password, invalidPassword)
        await expect(forgotPasswordPage.requiredFields).toHaveCount(1)
        await expect(forgotPasswordPage.requiredFields.last()).toHaveText("Password and Confirm Password must match with each other.")
    })

    test("Change password with data in email field without '@gmail.com'", {tag:'@pom'}, async()=>{
        await forgotPasswordPage.changePasswordValid(invalidUsername1, password, password)
        await expect(forgotPasswordPage.requiredFields).toHaveCount(1)
        await expect(forgotPasswordPage.requiredFields.last()).toHaveText("*Enter Valid Email")
    })

    test("Change password with data in email field without 'com' suffix", {tag:'@pom'}, async()=>{
        await forgotPasswordPage.changePasswordValid(invalidUsername1, password, password)
        await expect(forgotPasswordPage.requiredFields).toHaveCount(1)
        await expect(forgotPasswordPage.requiredFields.last()).toHaveText("*Enter Valid Email")
    })

    test("Validate navigating to Login page from Forgot Password page", {tag:'@pom'}, async()=>{
        await forgotPasswordPage.navigateToLoginPage()
        await expect(loginPage.userName).toBeVisible()
    })

    test("Validate navigating to Register page from Forgot Password page", {tag:'@pom'}, async()=>{
        await forgotPasswordPage.navigateToRegisterPage()
        await expect(userRegistrationPage.firstName).toBeVisible()
    })
})