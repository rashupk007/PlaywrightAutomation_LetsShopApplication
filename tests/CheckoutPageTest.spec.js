const {test, expect} = require('@playwright/test')

const {LoginPage} = require('../pageObjects/LoginPage')
const {DashboardPage} = require('../pageObjects/DashboardPage')
const {CartPage} = require('../pageObjects/CartPage')
const {OrdersPage} = require('../pageObjects/OrdersPage')
const {CheckoutPage} = require('../pageObjects/CheckoutPage')

const url = "https://rahulshettyacademy.com/client"
const username = "ahmedrashaad3@gmail.com"
const password = "Test@123"
const multipleProducts = ["ZARA COAT 3", "IPHONE 13 PRO", "ADIDAS ORIGINAL"]
const productNameIphone = "IPHONE 13 PRO"
const productNameZaraCoat = "ZARA COAT 3"
const productNameAdidas = "ADIDAS ORIGINAL"
const creditCardNumber = "4542 9931 9292 2293"
const creditCardExpiryMonth = "04"
const creditCardExpiryYear = "29"
const cvvCode = "354"
const nameOnCard = "Ahmed Rashaad"
const emailID = username
const invalidEmail = "ahmedrashaad"
const country = "India"
const invalidCountry = "Indiaajfjdf"
const coupon = "COUPON123"

let loginPage
let dashboardPage
let cartPage
let ordersPage
let checkoutPage

test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    cartPage = new CartPage(page)
    ordersPage = new OrdersPage(page)
    checkoutPage = new CheckoutPage(page)
    await loginPage.launchApplication(url)
    await loginPage.validLogin(username, password)
})

test("Validate multiple items checkout functionality by providing all valid details in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchAndAddMultipleProductsToCart(multipleProducts)
    await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(multipleProducts.length.toString())
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(multipleProducts.length)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
})

test("Validate single item checkout functionality by providing all valid details in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameZaraCoat)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
})

test("Validate checkout functionality without providing any details in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameIphone)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails("", "", "", "", "", "", "")
    await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
})

test("Validate checkout functionality without providing country in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameAdidas)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, "")
    await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
})

test("Validate checkout functionality without providing email id in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameZaraCoat)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, "", country)
    await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
})

//Failing because order is getting checked out without card number or cvv number
test("Validate checkout functionality without providing any details in Personal Information section in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameAdidas)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails("", "", "", "", "", emailID, country)
    await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
})

test("Validate checkout functionality without providing any details in Shipping Information section in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameAdidas)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, "", "")
    await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
})

test("Validate checkout functionality without providing any coupon and click on 'Apply Coupon' button in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameAdidas)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.applyCouponDetails("")
    await expect(checkoutPage.blankCouponErrorMessage).toBeVisible()
})

test("Validate checkout functionality by providing invalid coupon and click on 'Apply Coupon' button in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameAdidas)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.applyCouponDetails(coupon)
    await expect(checkoutPage.invalidCouponErrorMessage).toBeVisible()
})

//Failing this test bacause it is checking out the order without proper email id.
test("Validate checkout functionality by providing invalid email id in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameZaraCoat)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, invalidEmail, country)
    await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
})

test("Validate checkout functionality by providing invalid country in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameZaraCoat)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingInvalidCountry(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, invalidEmail, invalidCountry)
    await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
})

//Failing because payment type 'Paypal' is not clickable in checkout page
test("Validate selecting 'Paypal' payment type in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameZaraCoat)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.selectPaymentTypePaypal()
    await expect(checkoutPage.personalInformationCreditCardNumber).not.toBeVisible()
})

//Failing because payment type 'SEPA' is not clickable in checkout page
test("Validate selecting 'SEPA' payment type in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameZaraCoat)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.selectPaymentTypeSEPA()
    await expect(checkoutPage.personalInformationCreditCardNumber).not.toBeVisible()
})

//Failing because payment type 'Invoice' is not clickable in checkout page
test("Validate selecting 'Invoice' payment type in checkout page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameZaraCoat)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.selectPaymentTypeInvoice()
    await expect(checkoutPage.personalInformationCreditCardNumber).not.toBeVisible()
})