class CheckoutPage {
    constructor(page) {
        this.page = page
        this.paymentTypeCreditCard = page.locator("//div[text()='Credit Card']")
        this.paymentTypePaypal = page.locator("//div[text()='Paypal']")
        this.paymentTypeSEPA = page.locator("//div[text()='SEPA']")
        this.paymentTypeInvoice = page.locator("//div[text()='Invoice']")
        this.personalInformationCreditCardNumber = page.locator("//div[@class='form__cc']//input[@class='input txt text-validated']")
        this.personalInformationExpiryMonth = page.locator("//select[@class='input ddl']").first()
        this.personalInformationExpiryYear = page.locator("//select[@class='input ddl']").last()
        this.personalInformationCVVCode = page.locator("//input[@class='input txt']").first()
        this.personalInformationNameOnCard = page.locator("//input[@class='input txt']").last()
        this.personalInformationApplyCouponText = page.locator("//input[@name='coupon']")
        this.personalInformationApplyCouponButton = page.locator("//button[text()='Apply Coupon']")
        this.shippingInformationEmailID = page.locator("//input[@class='input txt text-validated ng-untouched ng-pristine ng-valid']")
        this.shippingInformationSelectCountry = page.getByPlaceholder("Select Country")
        this.shippingInformationCountryDynamicDropDown = page.locator("//button[@class='ta-item list-group-item ng-star-inserted']")
        this.shippingInformationPlaceOrderButton = page.getByText("Place Order ")
        this.checkoutItemsDetails = page.locator("//div[@class='item__details']")
        this.checkoutErrorMessage = page.locator("//div[@aria-label='Please Enter Full Shipping Information']")
        this.checkoutSuccessfulMessage = page.locator("//div[@aria-label='Order Placed Successfully']")
        this.invalidCouponErrorMessage = page.locator("//p[text()='* Invalid Coupon']")
        this.blankCouponErrorMessage = page.locator("//div[@aria-label='Please Enter Coupon']")

    }
    async checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country) {
        if (creditCardNumber.length > 0) {
            await this.personalInformationCreditCardNumber.fill(creditCardNumber)
        } else {
            await this.personalInformationCreditCardNumber.fill("")
        }
        if (creditCardExpiryMonth.length > 0) {
            await this.personalInformationExpiryMonth.selectOption({label: creditCardExpiryMonth})
        }
        if (creditCardExpiryYear.length > 0) {
            await this.personalInformationExpiryYear.selectOption({label: creditCardExpiryYear})
        }
        if (cvvCode.length > 0) {
            await this.personalInformationCVVCode.fill(cvvCode)
        } else {
            await this.personalInformationCVVCode.fill("")
        }
        if (nameOnCard.length > 0) {
            await this.personalInformationNameOnCard.fill(nameOnCard)
        } else {
            await this.personalInformationNameOnCard.fill("")
        }
        if (emailID.length > 0) {
            await this.shippingInformationEmailID.fill(emailID)
        } else {
            await this.shippingInformationEmailID.fill("")
        }
        if(country.length > 0) {
            await this.shippingInformationSelectCountry.pressSequentially(country)
            await this.shippingInformationCountryDynamicDropDown.first().waitFor()
            await this.page.waitForTimeout(500)
            const countOfDropDownValues = await this.shippingInformationCountryDynamicDropDown.count()
            for (let i=0; i<countOfDropDownValues;i++) {
                const countryText = await this.shippingInformationCountryDynamicDropDown.nth(i).textContent()
                if (countryText === " "+country) {
                    await this.shippingInformationCountryDynamicDropDown.nth(i).click()
                    break;
                }
            }
        }
        await this.shippingInformationPlaceOrderButton.click()
    }
    async checkoutByProvidingInvalidCountry(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, invalidCountry) {
        
        await this.personalInformationCreditCardNumber.fill(creditCardNumber)
        await this.personalInformationExpiryMonth.selectOption({label: creditCardExpiryMonth})
        await this.personalInformationExpiryYear.selectOption({label: creditCardExpiryYear})
        await this.personalInformationCVVCode.fill(cvvCode)
        await this.personalInformationNameOnCard.fill(nameOnCard)
        await this.shippingInformationEmailID.fill(emailID)
        await this.shippingInformationSelectCountry.fill(invalidCountry)
        await this.shippingInformationPlaceOrderButton.click()
    }
    async applyCouponDetails(coupon) {
        await this.personalInformationApplyCouponText.fill(coupon)
        await this.personalInformationApplyCouponButton.click()
    }
    async selectPaymentTypePaypal() {
        await this.paymentTypePaypal.click()
    }
    async selectPaymentTypeSEPA() {
        await this.paymentTypeSEPA.click()
    }
    async selectPaymentTypeInvoice() {
        await this.paymentTypeInvoice.click()
    }
}

module.exports = {CheckoutPage}