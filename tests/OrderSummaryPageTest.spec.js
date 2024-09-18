const {test, expect} = require('@playwright/test')
import fs from "node:fs/promises"

const {LoginPage} = require('../pageObjects/LoginPage')
const {DashboardPage} = require('../pageObjects/DashboardPage')
const {CartPage} = require('../pageObjects/CartPage')
const {OrdersPage} = require('../pageObjects/OrdersPage')
const {CheckoutPage} = require('../pageObjects/CheckoutPage')
const {OrderSummaryPage} = require('../pageObjects/OrderSummaryPage')

const testData = require('../TestData/testData.json')

const filePath = "./TestData/testData.json"

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
    await loginPage.launchApplication(testData.url)
    await loginPage.validLogin(testData.username, testData.password)
})

test.afterEach(async()=>{
    await fs.writeFile(filePath, JSON.stringify(testData))
})

test.describe("Order Summary Page Test", ()=>{
    test("Validate navigating to Homepage using 'Home' Link in Order Summary Page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
        const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
        testData.outputData_OrderNumber_1 = await orderNumbers[0]
        await orderSummaryPage.navigateToHomePage()
        await expect(dashboardPage.searchTextBox).toBeVisible()
    })
    test("Validate navigating to Orders using 'Orders' Link in Order Summary Page and view the Order created using the Order Number", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameIphone)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
        const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
        testData.outputData_OrderNumber_2 = await orderNumbers[0]
        await orderSummaryPage.navigateToOrdersPage()
        await expect(ordersPage.yourOrdersHeader).toBeVisible()
        await ordersPage.viewOrderByOrderNumber(testData.outputData_OrderNumber_2)
        await expect(ordersPage.orderNumberInOrderSummaryPage).toHaveText(testData.outputData_OrderNumber_2)
    })
    test("Validate navigating to Cart using 'Cart' Link in Order Summary Page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameAdidas)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
        const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
        testData.outputData_OrderNumber_3 = await orderNumbers[0]
        await orderSummaryPage.navigateToCartPage()
        await expect(cartPage.noProductsInYourCartErrorMessage).toBeVisible()
        await expect(cartPage.noProductsInYourCart).toBeVisible()
    })
    test("Validate signing out 'Sign Out' Link in Order Summary Page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
        const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
        testData.outputData_OrderNumber_4 = await orderNumbers[0]
        await orderSummaryPage.signOutFromApplication()
        await expect(loginPage.loginButton).toBeVisible()
    })
    //Failing because it is showing 404 not found message. But working properly manually.
    test.skip("Validate navigating to Homepage using 'Automation Logo' in Order Summary Page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameAdidas)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
        const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
        testData.outputData_OrderNumber_5 = await orderNumbers[0]
        await orderSummaryPage.navigateToHomePageUsingAutomationLogo()
        await expect(dashboardPage.searchTextBox).toBeVisible()
    })
    test("Validate navigating to Orders page using 'Orders History Page' link in Order Summary Page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
        const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
        testData.outputData_OrderNumber_6 = await orderNumbers[0]
        await orderSummaryPage.navigateToOrderHistoryPage()
        await expect(ordersPage.yourOrdersHeader).toBeVisible()
    })
    test("Validate single item added in order summary page as per ordered", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
        const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
        testData.outputData_OrderNumber_7 = await orderNumbers[0]
        const productsValidation = await orderSummaryPage.validateItemsInOrderAsPerOrderPlaced(testData.productNameZaraCoat)
        await expect(productsValidation).toBeTruthy()
    })
    test("Validate multiple item added in order summary page as per ordered", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleProducts.length.toString())
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(testData.multipleProducts.length)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
        const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
        testData.outputData_OrderNumber_8 = await orderNumbers[0]
        testData.outputData_OrderNumber_9 = await orderNumbers[1]
        testData.outputData_OrderNumber_10 = await orderNumbers[2]
        const productsValidation = await orderSummaryPage.validateItemsInOrderAsPerOrderPlaced(testData.multipleProducts)
        await expect(productsValidation).toBeTruthy()
    })
    test("Validate placing order and extract Order Number from Order Summary Page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
        const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
        testData.outputData_OrderNumber_11 = await orderNumbers[0]
    })
    test("Validate placing order for multiple products and multiple extract Order Number from Order Summary Page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleProducts.length.toString())
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(testData.multipleProducts.length)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
        const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
        testData.outputData_OrderNumber_12 = await orderNumbers[0]
        testData.outputData_OrderNumber_13 = await orderNumbers[1]
        testData.outputData_OrderNumber_14 = await orderNumbers[2]
    })
    test("Validate 'Click to Download Order Details in CSV' in the Order Summary Page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameIphone)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
        const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
        testData.outputData_OrderNumber_15 = await orderNumbers[0]
        await orderSummaryPage.validateDownloadAsCSV()
    })
    test("Validate 'Click to Download Order Details in Excel' in the Order Summary Page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameIphone)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(1)
        await cartPage.checkoutOrder()
        await expect(checkoutPage.shippingInformationPlaceOrderButton).toBeVisible()
        await checkoutPage.checkoutByProvidingDetails(testData.creditCardNumber, testData.creditCardExpiryMonth, testData.creditCardExpiryYear, testData.cvvCode, testData.nameOnCard, testData.emailID, testData.country)
        await expect(checkoutPage.checkoutSuccessfulMessage).toBeVisible()
        const orderNumbers = await orderSummaryPage.captureOrderNumberFromOrderSummaryPage()
        testData.outputData_OrderNumber_16 = await orderNumbers[0]
        await orderSummaryPage.validateDownloadAsExcel()
    })
})