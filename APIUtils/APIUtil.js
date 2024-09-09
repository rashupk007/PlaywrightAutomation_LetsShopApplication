class APIUtil {

    constructor(apiContext, payLoad, orderPayLoad) {
        this.apiContext = apiContext;
        this.payLoad = payLoad;
        this.orderPayLoad = orderPayLoad;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data:this.payLoad
        })
        const loginResponseJson = await loginResponse.json()
        const token = await loginResponseJson.token
        // console.log(token)
        return token
    }

    async orderProduct() {
        let response = {}
        response.token = await this.getToken()
        console.log(response)
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data: this.orderPayLoad,
            headers: {
                "authorization": response.token
            }
        })
        const orderResponseJson = await orderResponse.json()
        const orderID = await orderResponseJson.orders[0]
        response.orderID = orderID
        console.log(response)
        return response
    }

}

module.exports = {APIUtil}