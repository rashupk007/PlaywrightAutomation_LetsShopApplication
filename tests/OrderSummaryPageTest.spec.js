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
const invalidEmail = "ahmedrashaad"
const country = "India"
const invalidCountry = "Indiaajfjdf"
const coupon = "COUPON123"

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