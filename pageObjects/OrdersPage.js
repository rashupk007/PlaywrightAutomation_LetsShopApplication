class OrdersPage {
    constructor(page) {
        this.page = page
        this.yourOrdersHeader = page.locator("//h1[text()='Your Orders']")
        this.ordersLink = page.locator("//button[@routerlink='/dashboard/myorders']")
        this.goBackToShopButton = page.locator("//button[@routerlink='/dashboard']")
        this.goBackToCartButton = page.getByRole('button', { name: 'Go Back to Cart' })
        this.orderRecordsInOrdersTable = page.locator("//tr[@class='ng-star-inserted']")
        // The below element will be moved to Order Summary Page in future. For time being it is placed below.
        this.orderNumberInOrderSummaryPage = page.locator("//div[@class='col-text -main']")
    }
    async navigateToShoppingPage() {
        await this.goBackToShopButton.click()
    }
    async navigateToCartPage() {
        await this.goBackToCartButton.click()
    }
    async viewFirstOrder() {
        await this.orderRecordsInOrdersTable.first().getByRole('button', {name: "View"}).click()
    }
    async deleteFirstOrder() {
        await this.orderRecordsInOrdersTable.first().getByRole('button', {name: "Delete"}).click()
    }
    async viewOrderByOrderNumber(orderNumberToView) {
        const countOfTheProducts = await this.orderRecordsInOrdersTable.count()
        for (let i=0;i<countOfTheProducts;i++) {
            const productText = await this.orderRecordsInOrdersTable.nth(i).locator("th").textContent()
            if (productText === orderNumberToView) {
                await this.orderRecordsInOrdersTable.nth(i).getByRole('button', {name: "View"}).click()
                break;
            }
        }
    }
    async deleteOrderByOrderNumber(orderNumberToDelete) {
        const countOfTheProducts = await this.orderRecordsInOrdersTable.count()
        for (let i=0;i<countOfTheProducts;i++) {
            const productText = await this.orderRecordsInOrdersTable.nth(i).locator("th").textContent()
            if (productText === orderNumberToDelete) {
                await this.orderRecordsInOrdersTable.nth(i).getByRole('button', {name: "Delete"}).click()
                break;
            }
        }
    }
    async getOrderNumberFromApplication() {
        const count = await this.orderRecordsInOrdersTable.count()
        const orderNumber = await this.orderRecordsInOrdersTable.nth(count-2).locator("th").textContent()
        return orderNumber
    }
}

module.exports = {OrdersPage}