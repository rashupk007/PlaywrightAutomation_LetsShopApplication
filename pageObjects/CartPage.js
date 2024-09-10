class CartPage {
    constructor(page) {
        this.page = page
        this.continueShoppingButton = page.locator("//button[@routerlink='/dashboard']")
        this.noProductsInYourCartErrorMessage = page.locator("//div[@aria-label='No Product in Your Cart']")
        this.checkoutButton = page.locator("//button[text()='Checkout']")
        this.homeButton = page.locator("//button[text()=' HOME ']")
        this.signOutButton = page.locator("//button[text()=' Sign Out ']")
        this.ordersButton = page.locator("//button[@routerlink='/dashboard/myorders']")
        this.productsInCart = page.locator("//div[@class='infoWrap']")
        this.noItemsInCart = page.locator("//h1[text()='No Products in Your Cart !']")
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
    async buyNowCheckOutSingleItemFromCart() {
        this.productsInCart.first().getByRole('button', {name: "Buy Now"}).click()
    }
    async deleteItemInACart() {
        this.productsInCart.first().locator("i").click()
    }
}

module.exports = {CartPage}