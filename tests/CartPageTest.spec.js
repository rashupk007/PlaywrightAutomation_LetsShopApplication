const {test, expect} = require('@playwright/test')

const {LoginPage} = require('../pageObjects/LoginPage')
const {DashboardPage} = require('../pageObjects/DashboardPage')
const {CartPage} = require('../pageObjects/CartPage')
const {OrdersPage} = require('../pageObjects/OrdersPage')

const testData = require('../TestData/testData.json')

let loginPage;
let dashboardPage;
let cartPage;
let ordersPage;

test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    cartPage = new CartPage(page)
    ordersPage = new OrdersPage(page)
    await loginPage.launchApplication(testData.url)
    await loginPage.validLogin(testData.username, testData.password)
})

test.describe("Cart Page Test", ()=>{
    test("Navigate to Home Page", {tag:'@pom'}, async ()=>{
        await cartPage.navigateToHomePage()
        await expect(dashboardPage.searchTextBox).toBeVisible()
    })
    test("Navigate to Orders Page", {tag:'@pom'}, async ()=>{
        await cartPage.navigateToOrdersPage()
        await expect(ordersPage.goBackToCartButton).toBeVisible()
    })
    test("Validating 'No Products in your Cart' is displayed when there nothing added to cart", {tag:'@pom'}, async ()=>{
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.noProductsInYourCartErrorMessage).toBeVisible()
        await expect(cartPage.noProductsInYourCart).toBeVisible()
    })
    test("Checkout all the added items to the cart by clicking 'Checkout' button", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleProducts.length.toString())
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(testData.multipleProducts.length)
        await cartPage.checkoutOrder()
        await expect(cartPage.checkOutPageElementToBeDeleted).toBeVisible()
    })
    test("Validate items added in the cart is as per the items added from the Dashboard page", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleProducts.length.toString())
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(testData.multipleProducts.length)
        const validationOfItems = await cartPage.validateProductsInCartAsPerAddedItemsInDashboard(testData.multipleProducts)
        await expect(validationOfItems).toBeTruthy()
    })
    test("Navigate to Products Page by clicking Continue Shopping", {tag:'@pom'}, async ()=>{
        await dashboardPage.navigateToCartPage()
        await cartPage.navigateToContinueShopping()
        await expect(dashboardPage.searchTextBox).toBeVisible()
    })
    test("Checkout first item from cart", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleProducts.length.toString())
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(testData.multipleProducts.length)
        await cartPage.buyNowFirstItemFromCart()
        await expect(cartPage.checkOutPageElementToBeDeleted).toBeVisible()
    })
    test("Delete first item from the cart", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleProducts.length.toString())
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(testData.multipleProducts.length)
        await cartPage.deleteFirstItemInACart()
        await expect(cartPage.productsInCart).toHaveCount((testData.multipleProducts.length)-1)
    })
    test("Checkout any 1 item from cart by providing product name", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleProducts.length.toString())
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(testData.multipleProducts.length)
        await cartPage.buyNowSingleItemBySearchingProductName(testData.productNameAdidas)
        await expect(cartPage.checkOutPageElementToBeDeleted).toBeVisible()
    })
    test("Delete any 1 item from cart by providing product name", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleProducts.length.toString())
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(testData.multipleProducts.length)
        await cartPage.deleteSingleItemBySearchingProductName(testData.productNameIphone)
        await expect(cartPage.productsInCart).toHaveCount((testData.multipleProducts.length)-1)
    })
    test("Delete multiple items from cart by providing product name", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleProducts.length.toString())
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(testData.multipleProducts.length)
        await cartPage.deleteMultipleItemsBySearchingProductName(testData.multipleProductsToDelete)
        await expect(cartPage.productsInCart).toHaveCount((testData.multipleProducts.length)-(testData.multipleProductsToDelete.length))
    })
    test("Delete all items from cart and validate 'No Products in your Cart' is displayed", {tag:'@pom'}, async ()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleProducts.length.toString())
        await dashboardPage.navigateToCartPage()
        await expect(cartPage.productsInCart).toHaveCount(testData.multipleProducts.length)
        await cartPage.deleteAllItemsFromCart()
        await expect(cartPage.noProductsInYourCartErrorMessage).toBeVisible()
        await expect(cartPage.noProductsInYourCart).toBeVisible()
    })
})