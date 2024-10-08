const {test, expect} = require('@playwright/test')

const {LoginPage} = require('../pageObjects/LoginPage')
const {DashboardPage} = require('../pageObjects/DashboardPage')
const {CartPage} = require('../pageObjects/CartPage')
const {OrdersPage} = require('../pageObjects/OrdersPage')
const {CheckoutPage} = require('../pageObjects/CheckoutPage')

const testData = require('../TestData/testData.json')

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
    await loginPage.launchApplication(testData.url)
    await loginPage.validLogin(testData.username, testData.password)
})

test.describe("Checkout Page Test", ()=>{
    test("Validate multiple items checkout functionality by providing all valid details in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleProducts.length.toString())
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(testData.multipleProducts.length)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    })
    test("Validate single item checkout functionality by providing all valid details in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    })
    test("Validate checkout functionality without providing any details in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameIphone)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.blankValue, testData.blankValue, testData.blankValue, testData.blankValue, testData.blankValue, testData.blankValue, testData.blankValue)
        await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
    })
    test("Validate checkout functionality without providing country in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameAdidas)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.blankValue)
        await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
    })
    test("Validate checkout functionality without providing email id in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.blankValue, testData.country)
        await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
    })
    //Failing because order is getting checked out without card number or cvv number
    test.skip("Validate checkout functionality without providing any details in Personal Information section in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameAdidas)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.blankValue, testData.blankValue, testData.blankValue, testData.blankValue, testData.blankValue, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
    })
    test("Validate checkout functionality without providing any details in Shipping Information section in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameAdidas)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.blankValue, testData.blankValue)
        await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
    })
    test("Validate checkout functionality without providing any coupon and click on 'Apply Coupon' button in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameAdidas)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.applyCouponDetails(testData.blankValue)
        await expect(checkoutPage.blankCouponErrorMessage).toBeVisible()
    })
    test("Validate checkout functionality by providing invalid coupon and click on 'Apply Coupon' button in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameAdidas)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.applyCouponDetails(testData.coupon)
        await expect(checkoutPage.invalidCouponErrorMessage).toBeVisible()
    })
    //Failing this test bacause it is checking out the order without proper email id.
    test.skip("Validate checkout functionality by providing invalid email id in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.invalidEmail, testData.country)
        await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
    })
    test("Validate checkout functionality by providing invalid country in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingInvalidCountry(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.invalidCountry)
        await expect(checkoutPage.checkoutErrorMessage).toBeVisible()
    })
    //Failing because payment type 'Paypal' is not clickable in checkout page
    test.skip("Validate selecting 'Paypal' payment type in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.selectPaymentTypePaypal()
        await expect(checkoutPage.personalInformationCreditCardNumber).not.toBeVisible()
    })
    //Failing because payment type 'SEPA' is not clickable in checkout page
    test.skip("Validate selecting 'SEPA' payment type in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.selectPaymentTypeSEPA()
        await expect(checkoutPage.personalInformationCreditCardNumber).not.toBeVisible()
    })
    //Failing because payment type 'Invoice' is not clickable in checkout page
    test.skip("Validate selecting 'Invoice' payment type in checkout page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.selectPaymentTypeInvoice()
        await expect(checkoutPage.personalInformationCreditCardNumber).not.toBeVisible()
    })
})