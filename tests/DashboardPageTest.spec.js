const {test, expect} = require('@playwright/test')

const {LoginPage} = require('../pageObjects/LoginPage')
const {DashboardPage} = require('../pageObjects/DashboardPage')

const url = "https://rahulshettyacademy.com/client"
const username = "ahmedrashaad3@gmail.com"
const password = "Test@123"
const productName = "IPHONE 13 PRO"
const multipleProducts = ["ZARA COAT 3", "IPHONE 13 PRO", "ADIDAS ORIGINAL"]

let loginPage;
let dashboardPage;

// test.describe.configure({mode:'serial'})
// test.describe.configure({retries:5})
// test.describe.configure({mode:'serial', retries:5, timeout:20_000})

test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    await loginPage.launchApplication(url)
    await loginPage.validLogin(username, password)
})

// test.describe("Dashboard Test", ()=>{
    test("Validate Add to Cart", {tag:'@pom'}, async()=>{
        await dashboardPage.searchProductAndAddToCart(productName)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    })

    test.only("Validate adding multiple products to cart", {tag:'@pom'}, async()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(multipleProducts.length.toString())
    })

    test("Validate View Product", {tag:'@pom'}, async()=>{
        await dashboardPage.searchProductAndViewDetails(productName)
        await expect(dashboardPage.viewPageProductName).toHaveText(productName)
    })
// })