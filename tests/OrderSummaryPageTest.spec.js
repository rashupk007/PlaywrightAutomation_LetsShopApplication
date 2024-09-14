const {test, expect} = require('@playwright/test')

const {LoginPage} = require('../pageObjects/LoginPage')
const {DashboardPage} = require('../pageObjects/DashboardPage')
const {CartPage} = require('../pageObjects/CartPage')
const {OrdersPage} = require('../pageObjects/OrdersPage')
const {CheckoutPage} = require('../pageObjects/CheckoutPage')
const {OrderSummaryPage} = require('../pageObjects/OrderSummaryPage')

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
const country = "India"

let loginPage
let dashboardPage
let cartPage
let ordersPage
let checkoutPage
let orderSummaryPage

test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    cartPage = new CartPage(page)
    ordersPage = new OrdersPage(page)
    checkoutPage = new CheckoutPage(page)
    orderSummaryPage = new OrderSummaryPage(page)
    await loginPage.launchApplication(url)
    await loginPage.validLogin(username, password)
})

test("Validate navigating to Homepage using 'Home' Link in Order Summary Page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameZaraCoat)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    await orderSummaryPage.navigateToHomePage()
    await expect(dashboardPage.searchTextBox).toBeVisible()
})

test("Validate navigating to Orders using 'Orders' Link in Order Summary Page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameIphone)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    await orderSummaryPage.navigateToOrdersPage()
    await expect(ordersPage.yourOrdersHeader).toBeVisible()
})

test("Validate navigating to Cart using 'Cart' Link in Order Summary Page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameAdidas)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    await orderSummaryPage.navigateToCartPage()
    await expect(cartPage.noProductsInYourCartErrorMessage).toBeVisible()
    await expect(cartPage.noProductsInYourCart).toBeVisible()
})

test("Validate signing out 'Sign Out' Link in Order Summary Page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameZaraCoat)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    await orderSummaryPage.signOutFromApplication()
    await expect(loginPage.loginButton).toBeVisible()
})

//Failing because it is showing 404 not found message. But working properly manually.
test("Validate navigating to Homepage using 'Automation Logo' in Order Summary Page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameAdidas)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    await orderSummaryPage.navigateToHomePageUsingAutomationLogo()
    await expect(dashboardPage.searchTextBox).toBeVisible()
})

test("Validate navigating to Orders page using 'Orders History Page' link in Order Summary Page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameZaraCoat)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    await orderSummaryPage.navigateToOrderHistoryPage()
    await expect(ordersPage.yourOrdersHeader).toBeVisible()
})

test("Validate single item added in order summary page as per ordered", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameIphone)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    const productsValidation = await orderSummaryPage.validateItemsInOrderAsPerOrderPlaced(productNameAdidas)
    await expect(productsValidation).toBeTruthy()
})

test("Validate multiple item added in order summary page as per ordered", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchAndAddMultipleProductsToCart(multipleProducts)
    await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(multipleProducts.length.toString())
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(multipleProducts.length)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    const productsValidation = await orderSummaryPage.validateItemsInOrderAsPerOrderPlaced(multipleProducts)
    await expect(productsValidation).toBeTruthy()
})

test("Validate placing order and extract Order Number from Order Summary Page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameZaraCoat)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
    console.log(orderNumbers)
})

test("Validate placing order for multiple products and multiple extract Order Number from Order Summary Page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchAndAddMultipleProductsToCart(multipleProducts)
    await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(multipleProducts.length.toString())
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(multipleProducts.length)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
    console.log(orderNumbers)
})

test("Validate 'Click to Download Order Details in CSV' in the Order Summary Page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameIphone)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    await orderSummaryPage.validateDownloadAsCSV()
})

test("Validate 'Click to Download Order Details in Excel' in the Order Summary Page", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchProductAndAddToCart(productNameIphone)
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(1)
    await cartPage.checkoutOrder()
    await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
    await checkoutPage.checkoutByProvidingDetails(creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, cvvCode, nameOnCard, emailID, country)
    await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
    await orderSummaryPage.validateDownloadAsExcel()
})

// Start waiting for download before clicking. Note no await.

// Wait for the download process to complete and save the downloaded file somewhere.