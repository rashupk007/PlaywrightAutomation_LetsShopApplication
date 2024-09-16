const {test, expect} = require('@playwright/test')

const {LoginPage} = require('../pageObjects/LoginPage')
const {DashboardPage} = require('../pageObjects/DashboardPage')

const testData = require('../TestData/testData.json')

let loginPage;
let dashboardPage;

// test.describe.configure({mode:'serial'})
// test.describe.configure({retries:5})
// test.describe.configure({mode:'serial', retries:5, timeout:20_000})

test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    await loginPage.launchApplication(testData.url)
    await loginPage.validLogin(testData.username, testData.password)
})

test.describe("Dashboard Test", ()=>{
    test("Validate Add to Cart", {tag:'@pom'}, async()=>{
        await dashboardPage.searchProductAndAddToCart(testData.productNameZaraCoat)
        await expect(dashboardPage.addToCartSuccessMessage).toHaveText("Product Added To Cart")
    })
    test("Validate adding multiple products to cart", {tag:'@pom'}, async()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleProducts.length.toString())
    })
    //Failing because product is not getting added to the cart if we add same product again to the cart
    test.skip("Validate adding same products multiple times to cart", {tag:'@pom'}, async()=>{
        await dashboardPage.searchAndAddMultipleProductsToCart(testData.multipleSameProducts)
        await expect(dashboardPage.multipleItemsAddedToCard).toHaveText(testData.multipleSameProducts.length.toString())
    })
    test("Validate View Product", {tag:'@pom'}, async()=>{
        await dashboardPage.searchProductAndViewDetails(testData.productNameAdidas)
        await expect(dashboardPage.viewPageProductName).toHaveText(testData.productNameAdidas)
    })
    test("Validate Filter Product using Search Product Text", {tag:'@pom'}, async()=>{
        await dashboardPage.filterUsingTextSearch(testData.productNameIphone)
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(testData.productNameIphone)
    })
    test("Validate Filter Product using Invalid Search Product Text", {tag:'@pom'}, async()=>{
        await dashboardPage.filterUsingTextSearch(testData.invalidProductName)
        await expect(dashboardPage.noProductsFoundErrorFiltering).toHaveText("No Products Found")
        await expect(dashboardPage.products).toHaveCount(0)
    })
    test("Validate Filter Product using Min Price and Max Price", {tag:'@pom'}, async()=>{
        await dashboardPage.filterUsingPriceRangeMinAndMax(testData.minPrice, testData.maxPrice)
        await expect(dashboardPage.products).toHaveCount(2)
    })
    test("Validate Filter Product using Invalid Min Price and Max Price", {tag:'@pom'}, async()=>{
        await dashboardPage.filterUsingPriceRangeMinAndMax(testData.invalidMinPrice, testData.invalidMaxPrice)
        await expect(dashboardPage.noProductsFoundErrorFiltering).toHaveText("No Products Found")
        await expect(dashboardPage.products).toHaveCount(0)
    })
    test("Validate Filter Product using Categories Checkbox 'Fashion'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterCategoriesFasion()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(testData.productNameZaraCoat)
    })
    test("Validate Filter Product using Categories Checkbox 'Electronics'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterCategoriesElectronics()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(testData.productNameIphone)
    })
    test("Validate Filter Product using Categories Checkbox 'Household'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterCategoriesHousehold()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(testData.productNameAdidas)
    })
    test("Validate Filter Product using Sub Categories Checkbox 'T-Shirts'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterSubCategoriesTShirts()
        await expect(dashboardPage.noProductsFoundErrorFiltering).toHaveText("No Products Found")
        await expect(dashboardPage.products).toHaveCount(0)
    })
    test("Validate Filter Product using Sub Categories Checkbox 'Shirts'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterSubCategoriesShirts()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(testData.productNameZaraCoat)
    })
    test("Validate Filter Product using Sub Categories Checkbox 'Shoes'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterSubCategoriesShoes()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(testData.productNameAdidas)
    })
    test("Validate Filter Product using Sub Categories Checkbox 'Mobiles'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterSubCategoriesMobiles()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(testData.productNameIphone)
    })
    test("Validate Filter Product using Sub Categories Checkbox 'Laptops'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterSubCategoriesLaptops()
        await expect(dashboardPage.noProductsFoundErrorFiltering).toHaveText("No Products Found")
        await expect(dashboardPage.products).toHaveCount(0)
    })
    test("Validate Filter Product using Search For Checkbox 'Men'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterSearchForMen()
        await expect(dashboardPage.products).toHaveCount(2)
    })
    test("Validate Filter Product using Search For Checkbox 'Women'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterSearchForWomen()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(testData.productNameZaraCoat)
    })
    test("Validate Filter Product using Categories and Sub Categories Checkbox 'Fashion' and 'Shirts'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterCategoriesFasion()
        await dashboardPage.filterSubCategoriesShirts()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(testData.productNameZaraCoat)
    })
    test("Validate Filter Product using Categories and Sub Categories Checkbox 'Electronics' and 'Laptops'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterCategoriesElectronics()
        await dashboardPage.filterSubCategoriesLaptops()
        await expect(dashboardPage.noProductsFoundErrorFiltering).toHaveText("No Products Found")
        await expect(dashboardPage.products).toHaveCount(0)
    })
    test("Validate Filter Product using Categories, Sub Categories and Search For Checkbox 'Household', 'Shoes' and 'Men'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterCategoriesHousehold()
        await dashboardPage.filterSubCategoriesShoes()
        await dashboardPage.filterSearchForMen()
        await expect(dashboardPage.products).toHaveCount(1)
        await expect(dashboardPage.products).toContainText(testData.productNameAdidas)
    })
    test("Validate Filter Product using Categories, Sub Categories and Search For Checkbox 'Electronics', 'Mobiles' and 'Women'", {tag:'@pom'}, async()=>{
        await dashboardPage.filterCategoriesElectronics()
        await dashboardPage.filterSubCategoriesMobiles()
        await dashboardPage.filterSearchForWomen()
        await expect(dashboardPage.noProductsFoundErrorFiltering).toHaveText("No Products Found")
        await expect(dashboardPage.products).toHaveCount(0)
    })
    test("Sign Out from Application", {tag:'@pom'}, async ()=>{
        await dashboardPage.signOutFromApplication()
        await expect(loginPage.loginButton).toBeVisible()
    })
})