const {test, expect} = require('@playwright/test')

const {LoginPage} = require('../pageObjects/LoginPage')
const {DashboardPage} = require('../pageObjects/DashboardPage')

const url = "https://rahulshettyacademy.com/client"
const username = "ahmedrashaad3@gmail.com"
const password = "Test@123"
const invalidProductName = "IPHONE 13 PRO MAX"
const productNameIphone = "IPHONE 13 PRO"
const productNameZaraCoat = "ZARA COAT 3"
const productNameAdidas = "ADIDAS ORIGINAL"
const minPrice = "30000"
const maxPrice = "40000"
const invalidMinPrice = "300000"
const InvalidMaxPrice = "500000"
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
    
    test("Validate Add to Cart", {tag:'@pom1'}, async()=>{
        await dashboardPage.searchProductAndAddToCart(productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    })

    test("Validate adding multiple products to cart", {tag:'@pom1'}, async()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(multipleProducts.length.toString())
    })

    test("Validate View Product", {tag:'@pom1'}, async()=>{
        await dashboardPage.searchProductAndViewDetails(productNameAdidas)
        await expect(dashboardPage.viewPageProductName).toHaveText(productNameAdidas)
    })

    test("Validate Filter Product using Search Product Text", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterUsingTextSearch(productNameIphone)
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(productNameIphone)
    })

    test("Validate Filter Product using Invalid Search Product Text", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterUsingTextSearch(invalidProductName)
        await expect(dashboardPage.noProductsFoundErrorFiltering).toHaveText("No Products Found")
        await expect(dashboardPage.products).toHaveCount(0)
    })

    test("Validate Filter Product using Min Price and Max Price", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterUsingPriceRangeMinAndMax(minPrice, maxPrice)
        await expect(dashboardPage.products).toHaveCount(2)
    })

    test("Validate Filter Product using Invalid Min Price and Max Price", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterUsingPriceRangeMinAndMax(invalidMinPrice, InvalidMaxPrice)
        await expect(dashboardPage.noProductsFoundErrorFiltering).toHaveText("No Products Found")
        await expect(dashboardPage.products).toHaveCount(0)
    })

    test("Validate Filter Product using Categories Checkbox 'Fashion'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterCategoriesFasion()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(productNameZaraCoat)
    })

    test("Validate Filter Product using Categories Checkbox 'Electronics'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterCategoriesElectronics()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(productNameIphone)
    })

    test("Validate Filter Product using Categories Checkbox 'Household'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterCategoriesHousehold()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(productNameAdidas)
    })

    test("Validate Filter Product using Sub Categories Checkbox 'T-Shirts'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterSubCategoriesTShirts()
        await expect(dashboardPage.noProductsFoundErrorFiltering).toHaveText("No Products Found")
        await expect(dashboardPage.products).toHaveCount(0)
    })

    test("Validate Filter Product using Sub Categories Checkbox 'Shirts'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterSubCategoriesShirts()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(productNameZaraCoat)
    })

    test("Validate Filter Product using Sub Categories Checkbox 'Shoes'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterSubCategoriesShoes()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(productNameAdidas)
    })

    test("Validate Filter Product using Sub Categories Checkbox 'Mobiles'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterSubCategoriesMobiles()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(productNameIphone)
    })

    test("Validate Filter Product using Sub Categories Checkbox 'Laptops'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterSubCategoriesLaptops()
        await expect(dashboardPage.noProductsFoundErrorFiltering).toHaveText("No Products Found")
        await expect(dashboardPage.products).toHaveCount(0)
    })

    test("Validate Filter Product using Search For Checkbox 'Men'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterSearchForMen()
        await expect(dashboardPage.products).toHaveCount(2)
    })

    test("Validate Filter Product using Search For Checkbox 'Women'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterSearchForWomen()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(productNameZaraCoat)
    })

    test("Validate Filter Product using Categories and Sub Categories Checkbox 'Fashion' and 'Shirts'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterCategoriesFasion()
        await dashboardPage.filterSubCategoriesShirts()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(productNameZaraCoat)
    })

    test("Validate Filter Product using Categories and Sub Categories Checkbox 'Electronics' and 'Laptops'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterCategoriesElectronics()
        await dashboardPage.filterSubCategoriesLaptops()
        await expect(dashboardPage.noProductsFoundErrorFiltering).toHaveText("No Products Found")
        await expect(dashboardPage.products).toHaveCount(0)
    })

    test("Validate Filter Product using Categories, Sub Categories and Search For Checkbox 'Household', 'Shoes' and 'Men'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterCategoriesHousehold()
        await dashboardPage.filterSubCategoriesShoes()
        await dashboardPage.filterSearchForMen()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(productNameAdidas)
    })

    test("Validate Filter Product using Categories, Sub Categories and Search For Checkbox 'Electronics', 'Mobiles' and 'Women'", {tag:'@pom1'}, async()=>{
        await dashboardPage.filterCategoriesElectronics()
        await dashboardPage.filterSubCategoriesMobiles()
        await dashboardPage.filterSearchForWomen()
        await expect(dashboardPage.noProductsFoundErrorFiltering).toHaveText("No Products Found")
        await expect(dashboardPage.products).toHaveCount(0)
    })

// })