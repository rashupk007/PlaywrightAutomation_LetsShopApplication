class UserRegistrationPage {

    constructor(page) {
        this.page = page
        this.loginPageRegisterButton = page.locator("//a[text()='Register']")
        this.firstName = page.locator("//input[@id='firstName']")
        this.lastName = page.locator("//input[@id='lastName']")
        this.userEmail = page.locator("//input[@id='userEmail']")
        this.userMobile = page.locator("//input[@id='userMobile']")
        this.occupation = page.locator("//select[@formcontrolname='occupation']")
        this.genderMaleRadioButton = page.locator("//input[@value='Male']")
        this.genderFemaleRadioButton = page.locator("//input[@value='Female']")
        this.password = page.locator("//input[@id='userPassword']")
        this.confirmPassword = page.locator("//input[@id='confirmPassword']")
        this.confirmAgeCheckBox = page.locator("//input[@type='checkbox']")
        this.registerButton = page.locator("//input[@value='Register']")
        this.successMessage = page.locator("//h1[text()='Account Created Successfully']")
        this.requiredFields = page.locator(".invalid-feedback")
        this.confirmAgeRequiredField = page.locator("//div[text()='*Please check above checkbox']")
        this.lastNameRequiredMessage = page.locator("//div[@aria-label='Last Name is required!']")
        this.AlreadyRegisteredLink = page.locator("//p[@class='login-wrapper-footer-text']")
        this.userAlreadyExistErrorMessage = page.locator("//div[@aria-label='User already exisits with this Email Id!']")
    }

    async navigateToRegisterPage(url) {
        await this.page.goto(url)
        await this.loginPageRegisterButton.click()
    }

    async navigateToLoginPage() {
        await this.AlreadyRegisteredLink.click()
    }

    async registerUserPositiveScenario(firstName, lastName, userEmail, userMobile, occupation, gender, userPassword, confirmAge) {
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.userEmail.fill(userEmail)
        await this.userMobile.fill(userMobile)
        if (occupation.length > 0) {
            await this.occupation.selectOption({label: occupation})
        }
        occupation
        if (gender == "Male") {
            await this.genderMaleRadioButton.check()
        } else if (gender == "Female") {
            await this.genderFemaleRadioButton.check()
        }
        if (userPassword === "Different") {
            await this.password.fill("Test@123")
            await this.confirmPassword.fill("Test@124")
        } else {
            await this.password.fill(userPassword)
            await this.confirmPassword.fill(userPassword)
        }
        if (confirmAge == "Yes") {
            await this.confirmAgeCheckBox.check()
        }
        await this.registerButton.click()
        // await this.successMessage.waitFor()
    }

    async registerUserAllBlankValues() {
        await this.registerButton.click()
        await this.confirmAgeRequiredField.waitFor()
    }

    async getUniqUsername(username) {
        //Making username unique with random number generation using date and time.
        const date = new Date()
        const uniq = date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate()+""+date.getHours()+""+date.getMinutes()+""+date.getSeconds()
        return await username.replace("<UNIQ>", uniq)
    }

}

module.exports = {UserRegistrationPage}