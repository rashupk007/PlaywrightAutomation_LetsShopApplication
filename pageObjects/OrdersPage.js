class OrdersPage {
    constructor(page) {
        this.page = page
        this.ordersLink = page.locator("//button[@routerlink='/dashboard/myorders']")
        this.goBackToShopButton = page.locator("//button[@routerlink='/dashboard']")
        this.goBackToCartButton = page.locator("//button[@routerlink='/dashboard']")
        this.orderRecordsInOrdersTable = page.locator("//tr[@class='ng-star-inserted']")
    }
}

module.exports = {OrdersPage}