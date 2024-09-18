class CartPage {
    constructor(page) {
        this.page = page
        this.cartPageHeader = page.locator("//h1[text()='My Cart']")
        this.continueShoppingButton = page.locator("//button[text()='Continue Shopping']")
        this.noProductsInYourCartErrorMessage = page.locator("//div[@aria-label='No Product in Your Cart']")
        this.checkoutButton = page.locator("//button[text()='Checkout']")
        this.homeButton = page.locator("//button[text()=' HOME ']")
        this.signOutButton = page.locator("//button[text()=' Sign Out ']")
        this.ordersButton = page.locator("//button[@routerlink='/dashboard/myorders']")
        this.productsInCart = page.locator("//div[@class='infoWrap']")
        this.noProductsInYourCart = page.locator("//h1[text()='No Products in Your Cart !']")
        this.productNamesInCart = page.locator("//div[@class='cartSection']")
        //The below element will move to CheckoutPage.js in future. For time being it is placed here.
        this.checkOutPageElementToBeDeleted = page.locator("//a[text()='Place Order ']")
    }
    async navigateToHomePage() {
        this.homeButton.click()
    }
    async navigateToOrdersPage() {
        this.ordersButton.click()
    }
    async navigateToContinueShopping() {
        this.continueShoppingButton.click()
    }
    async checkoutOrder() {
        this.checkoutButton.click()
    }
    // productNameToCheckout
    async buyNowFirstItemFromCart() {
        this.productsInCart.first().getByRole('button', {name: "Buy Now"}).click()
    }
    async deleteFirstItemInACart() {
        this.productsInCart.first().locator("i").click()
    }
    async buyNowSingleItemBySearchingProductName(productNameToBuyNowCheckout) {
        const countOfTheProducts = await this.productsInCart.count()
        for (let i=0;i<countOfTheProducts;i++) {
            const productText = await this.productsInCart.nth(i).locator("h3").textContent()
            if (productText === productNameToBuyNowCheckout) {
                await this.productsInCart.nth(i).getByRole('button', {name: "Buy Now"}).click()
                break;
            }
        }
    }
    async deleteSingleItemBySearchingProductName(productNameToDelete) {
        const countOfTheProducts = await this.productsInCart.count()
        for (let i=0;i<countOfTheProducts;i++) {
            const productText = await this.productsInCart.nth(i).locator("h3").textContent()
            if (productText === productNameToDelete) {
                await this.productsInCart.nth(i).locator("i").click()
                break;
            }
        }
    }
    async deleteMultipleItemsBySearchingProductName(multipleProductNameToDelete) {
        for (let productToDelete of multipleProductNameToDelete) {
            const countOfTheProducts = await this.productsInCart.count()
            for (let i=0;i<countOfTheProducts;i++) {
                const productText = await this.productsInCart.nth(i).locator("h3").textContent()
                if (productText === productToDelete) {
                    await this.productsInCart.nth(i).locator("i").click()
                    await this.page.waitForTimeout(500)
                    break;
                }
            }
        }
    }
    async deleteAllItemsFromCart() {
        const countOfTheProducts = await this.productsInCart.count()
        for (let i=0;i<countOfTheProducts;i++) {
            await this.productsInCart.nth(0).locator("i").click()
            await this.page.waitForTimeout(500)
        }
        await this.noProductsInYourCart.waitFor()
    }
    async validateProductsInCartAsPerAddedItemsInDashboard(productsToValidate) {
        let allItemsFound = false
        let itemsFoundCount = 0
        for (let productToValidate of productsToValidate) {
            const countOfTheProducts = await this.productNamesInCart.count()
            for (let i=0;i<countOfTheProducts;i++) {
                const productText = await this.productNamesInCart.nth(i).locator("h3").textContent()
                if (productText === productToValidate) {
                    itemsFoundCount++
                    break;
                }
            }
        }
        if (itemsFoundCount === productsToValidate.length) {
            allItemsFound = true
        }
        return allItemsFound
    }
}

module.exports = {CartPage}