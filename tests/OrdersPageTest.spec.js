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

test.describe("Orders Page Test", ()=>{
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
    test("Delete order from Orders Page based on Order Number", {tag:'@pom'}, async ()=>{
        await dashboardPage.navigateToOrdersPage()
        await expect(ordersPage.yourOrdersHeader).toBeVisible()
        const ordersCount = await ordersPage.orderRecordsInOrdersTable.count()
        const orderNumberToDelete = await ordersPage.getOrderNumberFromApplication()
        await ordersPage.deleteOrderByOrderNumber(orderNumberToDelete)
        await expect(ordersPage.orderRecordsInOrdersTable).toHaveCount(ordersCount-1)
    })
    test("View order from Orders Page based on Order Number", {tag:'@pom'}, async ()=>{
        await dashboardPage.navigateToOrdersPage()
        await expect(ordersPage.yourOrdersHeader).toBeVisible()
        const orderNumberToView = await ordersPage.getOrderNumberFromApplication()
        await ordersPage.viewOrderByOrderNumber(orderNumberToView)
        await expect(ordersPage.orderNumberInOrderSummaryPage).toHaveText(orderNumberToView)
    })
})