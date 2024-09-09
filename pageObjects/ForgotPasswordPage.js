class ForgotPasswordPage {
    constructor(page) {
        this.page = page
        this.userEmail = page.getByPlaceholder("Enter your email address")
        this.userPassword = page.locator("#userPassword")
        this.confirmPassword = page.locator("#confirmPassword")
        this.saveNewPasswordButton = page.locator("//button[@type='submit']")
        this.loginLink = page.locator("//a[text()='Login']")
        this.registerLink = page.locator("//a[text()='Register']")
        this.passwordChangeSuccessMessage = page.locator("//div[@aria-label='Password Changed Successfully']")
        this.userNotFoundErrorMessage = page.locator("//div[@aria-label='User Not found.']")
        this.requiredFields = page.locator(".invalid-feedback")
    }

    async navigateToLoginPage() {
        await this.loginLink.click()
    }

    async navigateToRegisterPage() {
        await this.registerLink.click()
    }

    async changePasswordValid(userEmail, userPassword, userConfirmPassword) {
        await this.userEmail.fill(userEmail)
        await this.userPassword.fill(userPassword)
        await this.confirmPassword.fill(userConfirmPassword)
        await this.saveNewPasswordButton.click()
    }

    async changePasswordWithoutAnyValues() {
        await this.saveNewPasswordButton.click()
    }
}

module.exports = {ForgotPasswordPage}