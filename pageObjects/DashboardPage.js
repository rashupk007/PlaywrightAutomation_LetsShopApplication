class DashboardPage {
    constructor(page) {
        this.page = page
        this.products = page.locator("div.card-body")
        this.addToCartSuccessMessage = page.locator("#toast-container")
        this.viewPageProductName = page.locator("div h2")
        this.homeLink = page.locator("//button[@routerlink='/dashboard/']")
        this.ordersLink = page.locator("//button[@routerlink='/dashboard/myorders']")
        this.cartLink = page.locator("//button[@routerlink='/dashboard/cart']")
        this.signOutLink = page.locator("//button[text()=' Sign Out ']")
        this.multipleItemsAddedToCard = page.locator("//button[@routerlink='/dashboard/cart']/label")
        this.searchTextBox = page.locator("//div[@class='py-2 border-bottom ml-3']//input[@name='search']")
        this.minPriceFilterText = page.locator("//div[@class='py-2 border-bottom ml-3']/div//input[@name='minPrice']")
        this.maxPriceFilterText = page.locator("//div[@class='py-2 border-bottom ml-3']/div//input[@name='maxPrice']")
        this.categoryFashionFilterCheckBox = page.locator("//div[@class='py-2 border-bottom ml-3']/div/label[text()='fashion']/../input")
        this.categoryElectronicsFilterCheckBox = page.locator("//div[@class='py-2 border-bottom ml-3']/div/label[text()='electronics']/../input")
        this.categoryHouseholdFilterCheckBox = page.locator("//div[@class='py-2 border-bottom ml-3']/div/label[text()='household']/../input")
        this.subCategoryTShirtsFilterCheckBox = page.locator("//div[@class='py-2 border-bottom ml-3']/div/label[text()='t-shirts']/../input")
        this.subCategoryShirtsFilterCheckBox = page.locator("//div[@class='py-2 border-bottom ml-3']/div/label[text()='shirts']/../input")
        this.subCategoryShoesFilterCheckBox = page.locator("//div[@class='py-2 border-bottom ml-3']/div/label[text()='shoes']/../input")
        this.subCategoryMobilesFilterCheckBox = page.locator("//div[@class='py-2 border-bottom ml-3']/div/label[text()='mobiles']/../input")
        this.subCategoryLaptopsFilterCheckBox = page.locator("//div[@class='py-2 border-bottom ml-3']/div/label[text()='laptops']/../input")
        this.searchForMenFilterCheckBox = page.locator("//div[@class='py-2 ml-3']/div/label[text()='men']/../input")
        this.searchForWomenFilterCheckBox = page.locator("//div[@class='py-2 ml-3']/div/label[text()='women']/../input")
        this.noProductsFoundErrorFiltering = page.locator("//div[@aria-label='No Products Found']")
    }

    async searchProductAndAddToCart(productName) {

        await this.products.first().waitFor()
        const countOfTheProducts = await this.products.count()
        for (let i=0;i<countOfTheProducts;i++) {
            const productText = await this.products.nth(i).locator("b").textContent()
            if (productText === productName) {
                await this.products.nth(i).getByRole('button', {name: " Add To Cart"}).click()
                break;
            }
        }
        await this.addToCartSuccessMessage.waitFor()

    }

    async searchAndAddMultipleProductsToCart(multipleProducts) {

        for (let product of multipleProducts) {
            await this.products.first().waitFor()
            const countOfTheProducts = await this.products.count()
            for (let i=0;i<countOfTheProducts;i++) {
                const productText = await this.products.nth(i).locator("b").textContent()
                if (productText === product) {
                    await this.products.nth(i).getByRole('button', {name: " Add To Cart"}).click()
                    break;
                }
            }
            await this.addToCartSuccessMessage.waitFor()
            await this.page.waitForTimeout(2000)
        }

    }

    async searchProductAndViewDetails(productName) {

        await this.products.first().waitFor()
        const countOfTheProducts = await this.products.count()
        for (let i=0;i<countOfTheProducts;i++) {
            const productText = await this.products.nth(i).locator("b").textContent()
            if (productText === productName) {
                await this.products.nth(i).getByRole('button', {name: " View"}).click()
                break;
            }
        }
        await this.viewPageProductName.waitFor()

    }

    async filterCategoriesFasion() {
        await this.categoryFashionFilterCheckBox.check()
    }

    async filterCategoriesElectronics() {
        await this.categoryElectronicsFilterCheckBox.check()
    }

    async filterCategoriesHousehold() {
        await this.categoryHouseholdFilterCheckBox.check()
    }

    async filterSubCategoriesTShirts() {
        await this.subCategoryTShirtsFilterCheckBox.check()
    }

    async filterSubCategoriesShirts() {
        await this.subCategoryShirtsFilterCheckBox.check()
    }

    async filterSubCategoriesShoes() {
        await this.subCategoryShoesFilterCheckBox.check()
    }

    async filterSubCategoriesMobiles() {
        await this.subCategoryMobilesFilterCheckBox.check()
    }

    async filterSubCategoriesLaptops() {
        await this.subCategoryLaptopsFilterCheckBox.check()
    }

    async filterSearchForMen() {
        await this.searchForMenFilterCheckBox.check()
    }

    async filterSearchForWomen() {
        await this.searchForWomenFilterCheckBox.check()
    }

    async filterUsingTextSearch(productName) {
        await this.searchTextBox.fill(productName)
        await this.searchTextBox.press('Enter')
    }

    async filterUsingPriceRangeMinAndMax(minPrice, maxPrice) {
        await this.minPriceFilterText.fill(minPrice)
        await this.maxPriceFilterText.fill(maxPrice)
        await this.maxPriceFilterText.press('Enter')
    }

}

module.exports = {DashboardPage}