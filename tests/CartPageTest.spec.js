const {test, expect} = require('@playwright/test')

const {LoginPage} = require('../pageObjects/LoginPage')
const {DashboardPage} = require('../pageObjects/DashboardPage')
const {CartPage} = require('../pageObjects/CartPage')
const {OrdersPage} = require('../pageObjects/OrdersPage')

const url = "https://rahulshettyacademy.com/client"
const username = "ahmedrashaad3@gmail.com"
const password = "Test@123"
const multipleProducts = ["ZARA COAT 3", "IPHONE 13 PRO", "ADIDAS ORIGINAL"]
const multipleProductsToDelete = ["IPHONE 13 PRO", "ADIDAS ORIGINAL"]
const productNameIphone = "IPHONE 13 PRO"
const productNameZaraCoat = "ZARA COAT 3"
const productNameAdidas = "ADIDAS ORIGINAL"

let loginPage;
let dashboardPage;
let cartPage;
let ordersPage;

test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    cartPage = new CartPage(page)
    ordersPage = new OrdersPage(page)
    await loginPage.launchApplication(url)
    await loginPage.validLogin(username, password)
})

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
    await dashboardPage.searchAndAddMultipleProductsToCart(multipleProducts)
    await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(multipleProducts.length.toString())
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(multipleProducts.length)
    await cartPage.checkoutOrder()
    await expect(cartPage.checkOutPageElementToBeDeleted).toBeVisible()
})

test("Navigate to Products Page by clicking Continue Shopping", {tag:'@pom'}, async ()=>{
    await dashboardPage.navigateToCartPage()
    await cartPage.navigateToContinueShopping()
    await expect(dashboardPage.searchTextBox).toBeVisible()
})

test("Checkout first item from cart", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchAndAddMultipleProductsToCart(multipleProducts)
    await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(multipleProducts.length.toString())
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(multipleProducts.length)
    await cartPage.buyNowFirstItemFromCart()
    await expect(cartPage.checkOutPageElementToBeDeleted).toBeVisible()
})

test("Delete first item from the cart", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchAndAddMultipleProductsToCart(multipleProducts)
    await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(multipleProducts.length.toString())
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(multipleProducts.length)
    await cartPage.deleteFirstItemInACart()
    await expect(cartPage.productsInCart).toHaveCount((multipleProducts.length)-1)
})

test("Checkout any 1 item from cart by providing product name", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchAndAddMultipleProductsToCart(multipleProducts)
    await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(multipleProducts.length.toString())
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(multipleProducts.length)
    await cartPage.buyNowSingleItemBySearchingProductName(productNameAdidas)
    await expect(cartPage.checkOutPageElementToBeDeleted).toBeVisible()
})

test("Delete any 1 item from cart by providing product name", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchAndAddMultipleProductsToCart(multipleProducts)
    await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(multipleProducts.length.toString())
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(multipleProducts.length)
    await cartPage.deleteSingleItemBySearchingProductName(productNameIphone)
    await expect(cartPage.productsInCart).toHaveCount((multipleProducts.length)-1)
})

test("Delete multiple items from cart by providing product name", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchAndAddMultipleProductsToCart(multipleProducts)
    await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(multipleProducts.length.toString())
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(multipleProducts.length)
    await cartPage.deleteMultipleItemsBySearchingProductName(multipleProductsToDelete)
    await expect(cartPage.productsInCart).toHaveCount((multipleProducts.length)-(multipleProductsToDelete.length))
})

test("Delete all items from cart and validate 'No Products in your Cart' is displayed", {tag:'@pom'}, async ()=>{
    await dashboardPage.searchAndAddMultipleProductsToCart(multipleProducts)
    await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(multipleProducts.length.toString())
    await dashboardPage.navigateToCartPage()
    await expect(cartPage.productsInCart).toHaveCount(multipleProducts.length)
    await cartPage.deleteAllItemsFromCart()
    await expect(cartPage.noProductsInYourCartErrorMessage).toBeVisible()
    await expect(cartPage.noProductsInYourCart).toBeVisible()
})