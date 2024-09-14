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

// Registration Page
// const url = "https://rahulshettyacademy.com/client"
// const firstName = "Ahmed"
// const lastName = "Rashaad"
// const userEmail = "ahmed"+uniq+"@gmail.com"
// const userOldEmail = "ahmedrashaad10@hotmail.com"
// const userMobile = "9898989898"
// const occupation = "Student"
// const genderMale = "Male"
// const genderFemale = "Female"
// const userPassword = "Test@123"
// const confirmAge = "Yes"

// Orders Page
// const url = "https://rahulshettyacademy.com/client"
// const username = "ahmedrashaad3@gmail.com"
// const password = "Test@123"
// const orderNumberToView = "66e178cbae2afd4c0b70a47e"
// const orderNumberToDelete = "66e178f0ae2afd4c0b70a4c0"

// Login Page
// const url = "https://rahulshettyacademy.com/client"
// const username = "ahmedrashaad3@gmail.com"
// const invalidUsername = "ahmedrashaad"
// const invalidUsername1 = "ahmedrashaad@hotmail."
// const password = "Test@123"

// Forgot Password Page
// const url = "https://rahulshettyacademy.com/client"
// const username = "ahmedrashaad9@hotmail.com"
// const password = "Test@123"
// const invalidPassword = "Test@124"
// const invalidUsername = "ahmedrash@gmail.com"
// const invalidUsername1 = "ahmedrash"
// const invalidUsername2 = "ahmedrash."

// Dashboard Page
// const url = "https://rahulshettyacademy.com/client"
// const username = "ahmedrashaad3@gmail.com"
// const password = "Test@123"
// const invalidProductName = "IPHONE 13 PRO MAX"
// const productNameIphone = "IPHONE 13 PRO"
// const productNameZaraCoat = "ZARA COAT 3"
// const productNameAdidas = "ADIDAS ORIGINAL"
// const minPrice = "30000"
// const maxPrice = "40000"
// const invalidMinPrice = "300000"
// const InvalidMaxPrice = "500000"
// const multipleProducts = ["ZARA COAT 3", "IPHONE 13 PRO", "ADIDAS ORIGINAL"]
// const multipleSameProducts = ["ZARA COAT 3", "ZARA COAT 3"]

// Checkout Page
// const url = "https://rahulshettyacademy.com/client"
// const username = "ahmedrashaad3@gmail.com"
// const password = "Test@123"
// const multipleProducts = ["ZARA COAT 3", "IPHONE 13 PRO", "ADIDAS ORIGINAL"]
// const productNameIphone = "IPHONE 13 PRO"
// const productNameZaraCoat = "ZARA COAT 3"
// const productNameAdidas = "ADIDAS ORIGINAL"
// const creditCardNumber = "4542 9931 9292 2293"
// const creditCardExpiryMonth = "04"
// const creditCardExpiryYear = "29"
// const cvvCode = "354"
// const nameOnCard = "Ahmed Rashaad"
// const emailID = username
// const invalidEmail = "ahmedrashaad"
// const country = "India"
// const invalidCountry = "Indiaajfjdf"
// const coupon = "COUPON123"

// Cart Page
// const url = "https://rahulshettyacademy.com/client"
// const username = "ahmedrashaad3@gmail.com"
// const password = "Test@123"
// const multipleProducts = ["ZARA COAT 3", "IPHONE 13 PRO", "ADIDAS ORIGINAL"]
// const multipleProductsToDelete = ["IPHONE 13 PRO", "ADIDAS ORIGINAL"]
// const productNameIphone = "IPHONE 13 PRO"
// const productNameZaraCoat = "ZARA COAT 3"
// const productNameAdidas = "ADIDAS ORIGINAL"