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
        this.searchTextBox = page.getByPlaceholder("search")
        this.minPriceFilterText = page.getByPlaceholder("Min Price")
        this.maxPriceFilterText = page.getByPlaceholder("Max Price")
        this.categoryFashionFilterCheckBox
        this.categoryElectronicsFilterCheckBox
        this.categoryHouseholdFilterCheckBox
        this.subCategoryTShirtsFilterCheckBox
        this.subCategoryShirtsFilterCheckBox
        this.subCategoryShoesFilterCheckBox
        this.subCategoryMobilesFilterCheckBox
        this.subCategoryLaptopsFilterCheckBox
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

    // // for(varibale of iterable) {
    // //  Code to be executed
    // //}
    // console.log("***********************************")
    // const array = [10,20,30,"Tom",false,4.5]
    // // console.log(array[0])
    // for(value of array) {
    //     console.log(value)
    // }

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

}

module.exports = {DashboardPage}