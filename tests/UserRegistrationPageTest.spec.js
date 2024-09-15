const {test, expect} = require('@playwright/test')

const {UserRegistrationPage} = require('../pageObjects/UserRegistrationPage')
const {LoginPage} = require('../pageObjects/LoginPage')

const testData = require('../TestData/testData.json')

let userRegistrationPage
let loginPage

test.beforeEach(async ({page})=>{
    userRegistrationPage = new UserRegistrationPage(page)
    loginPage = new LoginPage(page)
    await userRegistrationPage.navigateToRegisterPage(testData.url)
})

test.describe("User Registration Test", ()=>{
    test("Register user with valid details", {tag:'@pom'}, async ()=>{
        await userRegistrationPage.registerUserPositiveScenario(testData.firstName, testData.lastName, await userRegistrationPage.getUniqUsername(testData.userEmail), testData.userMobile, testData.occupation, testData.genderMale, testData.userPassword, testData.confirmAge)
        await expect(userRegistrationPage.successMessage).toHaveText("Account Created Successfully")
    })
    test("Register without providing any values", {tag:'@pom'}, async ()=>{
        await userRegistrationPage.registerUserAllBlankValues()
        await expect(userRegistrationPage.requiredFields).toHaveCount(5)
        await expect(userRegistrationPage.confirmAgeRequiredField).toBeVisible()
    })
    test("Register by providing existing email id in User Email field", {tag:'@pom'}, async ()=>{
        await userRegistrationPage.registerUserPositiveScenario(testData.firstName, testData.lastName, testData.userOldEmail, testData.userMobile, testData.occupation, testData.genderMale, testData.userPassword, testData.confirmAge)
        await expect(userRegistrationPage.userAlreadyExistErrorMessage).toBeVisible()
        await expect(userRegistrationPage.userAlreadyExistErrorMessage).toHaveText("User already exisits with this Email Id!")
    })
    test("Register without providing value in Email field", {tag:'@pom'}, async ()=>{
        await userRegistrationPage.registerUserPositiveScenario(testData.firstName, testData.lastName, testData.invalidUsername5, testData.userMobile, testData.occupation, testData.genderFemale, testData.userPassword, testData.confirmAge)
        await expect(userRegistrationPage.requiredFields).toHaveCount(1)
        await expect(userRegistrationPage.requiredFields).toHaveText("*Email is required")
        await expect(userRegistrationPage.successMessage).not.toBeVisible()
    })
    test("Register without providing value in password and confirm password fields", {tag:'@pom'}, async ()=>{
        await userRegistrationPage.registerUserPositiveScenario(testData.firstName, testData.lastName, await userRegistrationPage.getUniqUsername(testData.userEmail), testData.userMobile, testData.occupation, testData.genderMale, testData.invalidPassword1, testData.confirmAge)
        await expect(userRegistrationPage.requiredFields).toHaveCount(2)
        await expect(userRegistrationPage.requiredFields.first()).toHaveText("*Password is required")
        await expect(userRegistrationPage.requiredFields.last()).toHaveText("Confirm Password is required")
    })
    test("Register without providing value in Phone Number field", {tag:'@pom'}, async ()=>{
        await userRegistrationPage.registerUserPositiveScenario(testData.firstName, testData.lastName, await userRegistrationPage.getUniqUsername(testData.userEmail), testData.blankValue, testData.occupation, testData.genderFemale, testData.userPassword, testData.confirmAge)
        await expect(userRegistrationPage.requiredFields).toHaveCount(1)
        await expect(userRegistrationPage.requiredFields).toHaveText("*Phone Number is required")
        await expect(userRegistrationPage.successMessage).not.toBeVisible()
    })
    test("Register without providing value in First Name field", {tag:'@pom'}, async ()=>{
        await userRegistrationPage.registerUserPositiveScenario(testData.blankValue, testData.lastName, await userRegistrationPage.getUniqUsername(testData.userEmail), testData.userMobile, testData.occupation, testData.genderMale, testData.userPassword, testData.confirmAge)
        await expect(userRegistrationPage.requiredFields).toHaveCount(1)
        await expect(userRegistrationPage.requiredFields).toHaveText("*First Name is required")
        await expect(userRegistrationPage.successMessage).not.toBeVisible()
    })
    test("Register without providing values for Last Name", {tag:'@pom'}, async ()=>{
        await userRegistrationPage.registerUserPositiveScenario(testData.firstName, testData.blankValue, await userRegistrationPage.getUniqUsername(testData.userEmail), testData.userMobile, testData.occupation, testData.genderFemale, testData.userPassword, testData.confirmAge)
        await expect(userRegistrationPage.lastNameRequiredMessage).toBeVisible()
        await expect(userRegistrationPage.lastNameRequiredMessage).toHaveText(" Last Name is required! ")
    })
    test("Register without checking 'I am 18 year or Older' checkbox", {tag:'@pom'}, async ()=>{
        await userRegistrationPage.registerUserPositiveScenario(testData.firstName, testData.lastName, await userRegistrationPage.getUniqUsername(testData.userEmail), testData.userMobile, testData.occupation, testData.genderFemale, testData.userPassword, testData.confirmAge1)
        await expect(userRegistrationPage.confirmAgeRequiredField).toBeVisible()
        await expect(userRegistrationPage.confirmAgeRequiredField).toHaveText("*Please check above checkbox")
        await expect(userRegistrationPage.successMessage).not.toBeVisible()
    })
    // Failing because error message is being displayed for Last Name field. Even though it not a mandatory field - Defect # 1
    test("Register without providing values for Last Name, Occupation and Gender", {tag:'@pom'}, async ()=>{
        await userRegistrationPage.registerUserPositiveScenario(testData.firstName, testData.blankValue, await userRegistrationPage.getUniqUsername(testData.userEmail), testData.userMobile, testData.blankValue, testData.blankValue, testData.userPassword, testData.confirmAge)
        await expect(userRegistrationPage.successMessage).toBeVisible()
        await expect(userRegistrationPage.successMessage).toHaveText("Account Created Successfully")
    })
    test("Register without providing values for Occupation and Gender", {tag:'@pom'}, async ()=>{
        await userRegistrationPage.registerUserPositiveScenario(testData.firstName, testData.lastName, await userRegistrationPage.getUniqUsername(testData.userEmail), testData.userMobile, testData.blankValue, testData.blankValue, testData.userPassword, testData.confirmAge)
        await expect(userRegistrationPage.successMessage).toBeVisible()
        await expect(userRegistrationPage.successMessage).toHaveText("Account Created Successfully")
    })
    test("Register with different values in password and confirm password fields", {tag:'@pom'}, async ()=>{
        await userRegistrationPage.registerUserPositiveScenario(testData.firstName, testData.lastName, await userRegistrationPage.getUniqUsername(testData.userEmail), testData.userMobile, testData.occupation, testData.genderMale, testData.invalidPassword2, testData.confirmAge)
        await expect(userRegistrationPage.requiredFields).toHaveCount(1)
        await expect(userRegistrationPage.requiredFields).toHaveText("Password and Confirm Password must match with each other.")
        await expect(userRegistrationPage.successMessage).not.toBeVisible()
    })
    test("Navigate to Login page from Register page using 'Already have an account? Login here' link", {tag:'@pom'}, async()=>{
        await userRegistrationPage.navigateToLoginPage()
        await expect(loginPage.userName).toBeVisible()
    })
})