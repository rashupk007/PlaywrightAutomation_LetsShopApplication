class OrderSummaryPage {
    constructor(page) {
        this.page = page
        this.orderNumber = page.locator("//label[@class='ng-star-inserted']")
        this.orderedItemDetails = page.locator("//td[@class='line-item product-info-column m-3']/div[1]")
        this.clickToDownloadOrderDetailsInCSV = page.locator("//button[text()='Click To Download Order Details in CSV']")
        this.clickToDownloadOrderDetailsInExcel = page.locator("//button[text()='Click To Download Order Details in Excel']")
        this.homePageLink = page.locator("//button[@routerlink='/dashboard/']")
        this.ordersPageLink = page.locator("//button[@routerlink='/dashboard/myorders']")
        this.cartPageLink = page.locator("//button[@routerlink='/dashboard/cart']")
        this.signOutLink = page.locator("//button[text()=' Sign Out ']")
        this.automationPracticeLogo = page.locator("//label[@class='logo']")
        this.ordersHistoryPageLink = page.locator("//label[text()=' Orders History Page ']")
    }
    async navigateToHomePage() {
        await this.homePageLink.click()
    }
    async navigateToOrdersPage() {
        await this.ordersPageLink.click()
    }
    async navigateToCartPage() {
        await this.cartPageLink.click()
    }
    async signOutFromApplication() {
        await this.signOutLink.click()
    }
    async navigateToHomePageUsingAutomationLogo() {
        await this.automationPracticeLogo.click()
    }
    async navigateToOrderHistoryPage() {
        await this.ordersHistoryPageLink.click()
    }
    async validateItemsInOrderAsPerOrderPlaced(productsDetails) {
        let blnValidationOfItems = false
        let countOfValidations = 0
        if (Array.isArray(productsDetails)) {
            for(let product of productsDetails) {
                const countOfProducts = await this.orderedItemDetails.count()
                for (let i=0;i<countOfProducts;i++) {
                    const productNameInOrderSummaryPage = await this.orderedItemDetails.nth(i).textContent()
                    if (productNameInOrderSummaryPage === product) {
                        countOfValidations++
                        break;
                    }
                }
            }
            if (countOfValidations === productsDetails.length) {
                blnValidationOfItems = true
            }
        } else {
            const productNameInOrderSummaryPage = await this.orderedItemDetails.textContent()
            if (productNameInOrderSummaryPage === productsDetails) {
                blnValidationOfItems = true
            }
        }
        return blnValidationOfItems
    }
    async validateDownloadAsCSV() {
        const downloadPromise = this.page.waitForEvent('download');
        await this.clickToDownloadOrderDetailsInCSV.click()
        const download = await downloadPromise;
        await download.saveAs('./Downloads/' + download.suggestedFilename());
    }
    async validateDownloadAsExcel() {
        const downloadPromise = this.page.waitForEvent('download');
        await this.clickToDownloadOrderDetailsInExcel.click()
        const download = await downloadPromise;
        await download.saveAs('./Downloads/' + download.suggestedFilename());
    }
    async captureOrderNumberFromOrderSummaryPage() {
        let orderNumberOutput = []
        const countOfOrders = await this.orderNumber.count()
        if (countOfOrders > 0) {
            for (let i=0;i<countOfOrders;i++) {
                const orderNumberOutputText = await this.orderNumber.nth(i).textContent()
                await orderNumberOutput.push(orderNumberOutputText.slice(3,orderNumberOutputText.length-3))
            }
        } else {
            const orderNumberOutputText = await this.orderNumber.textContent()
            await orderNumberOutput.push(orderNumberOutputText.slice(3,orderNumberOutputText.length-3))
        }
        return orderNumberOutput
    }
}

module.exports = {OrderSummaryPage}