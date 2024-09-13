const {test, expect} = require('@playwright/test')

const {LoginPage} = require('../pageObjects/LoginPage')
const {DashboardPage} = require('../pageObjects/DashboardPage')
const {CartPage} = require('../pageObjects/CartPage')
const {OrdersPage} = require('../pageObjects/OrdersPage')

const url = "https://rahulshettyacademy.com/client"
const username = "ahmedrashaad3@gmail.com"
const password = "Test@123"
const orderNumberToView = "66e178cbae2afd4c0b70a47e"
const orderNumberToDelete = "66e178f0ae2afd4c0b70a4c0"

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

test("Navigate to the Shopping Page using 'Go Back to Shop' button", {tag:'@pom'}, async ()=>{
    await dashboardPage.navigateToOrdersPage()
    await expect(ordersPage.yourOrdersHeader).toBeVisible()
    await ordersPage.navigateToShoppingPage()
    await expect(dashboardPage.searchTextBox).toBeVisible()
})

test("Navigate to the Cart Page using 'Go Back to Cart' button", {tag:'@pom'}, async ()=>{
    await dashboardPage.navigateToOrdersPage()
    await expect(ordersPage.yourOrdersHeader).toBeVisible()
    await ordersPage.navigateToCartPage()
    await expect(cartPage.cartPageHeader).toBeVisible()
})

test("View first order from Orders Page", {tag:'@pom'}, async ()=>{
    await dashboardPage.navigateToOrdersPage()
    await expect(ordersPage.yourOrdersHeader).toBeVisible()
    const orderNumber = await ordersPage.orderRecordsInOrdersTable.first().locator("th").textContent()
    await ordersPage.viewFirstOrder()
    await expect(ordersPage.orderNumberInOrderSummaryPage).toHaveText(orderNumber)
})

test("Delete first order from Orders Page", {tag:'@pom'}, async ()=>{
    await dashboardPage.navigateToOrdersPage()
    await expect(ordersPage.yourOrdersHeader).toBeVisible()
    const ordersCount = await ordersPage.orderRecordsInOrdersTable.count()
    await ordersPage.deleteFirstOrder()
    await expect(ordersPage.orderRecordsInOrdersTable).toHaveCount(ordersCount-1)
})

test("View order from Orders Page based on Order Number", {tag:'@pom'}, async ()=>{
    await dashboardPage.navigateToOrdersPage()
    await expect(ordersPage.yourOrdersHeader).toBeVisible()
    await ordersPage.viewOrderByOrderNumber(orderNumberToView)
    await expect(ordersPage.orderNumberInOrderSummaryPage).toHaveText(orderNumberToView)
})

test("Delete order from Orders Page based on Order Number", {tag:'@pom'}, async ()=>{
    await dashboardPage.navigateToOrdersPage()
    await expect(ordersPage.yourOrdersHeader).toBeVisible()
    const ordersCount = await ordersPage.orderRecordsInOrdersTable.count()
    await ordersPage.deleteOrderByOrderNumber(orderNumberToDelete)
    await expect(ordersPage.orderRecordsInOrdersTable).toHaveCount(ordersCount-1)
})