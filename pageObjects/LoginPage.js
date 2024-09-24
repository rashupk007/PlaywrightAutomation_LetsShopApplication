class LoginPage {
    
    constructor(page) {
        this.page = page
        this.userName = page.getByPlaceholder("email@example.com")
        this.passWord = page.locator("#userPassword")
        this.loginButton = page.getByRole('button', {name: 'Login'})
        this.homePageIdentifier = page.getByRole('button', {name:'Home'})
        this.errorMessage = page.locator("#toast-container")
        this.registerButton = page.locator("//a[text()='Register']")
        this.firstNameTextBox = page.locator("//input[@id='firstName']")
        this.dontHaveAnAccountRegisterHereLink = page.locator("//p[@class='login-wrapper-footer-text']")
        this.forgotPasswordLink = page.locator("//a[@class='forgot-password-link']")
        this.enterNewPasswordHeader = page.locator("//h3[text()='Enter New Password']")
        this.requiredFields = page.locator(".invalid-feedback")
    }

    async launchApplication(url) {
        await this.page.goto(url)
        await this.loginButton.waitFor()
    }

    async validLogin(username, password) {
        await this.userName.fill(username)
        await this.passWord.fill(password)
        await this.loginButton.click()
        // await this.homePageIdentifier.waitFor()
    }

    async invalidLogin(username, password) {
        await this.userName.fill(username)
        await this.passWord.fill(password)
        await this.loginButton.click()
        await this.errorMessage.waitFor()
    }

    async navigateToRegisterPageUsingDontHaveAccountRegisterHereLink() {
        await this.dontHaveAnAccountRegisterHereLink.click()
    }

    async navigateToForgotPasswordPage() {
        await this.forgotPasswordLink.click()
        await this.enterNewPasswordHeader.waitFor()
    }

}

module.exports = {LoginPage}