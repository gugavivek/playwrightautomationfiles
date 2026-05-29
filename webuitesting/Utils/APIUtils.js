const{test,expect,request}=require ('@playwright/test');
class APIUtils

{
constructor(apiContext,loginpayload)
{
this.apiContext=apiContext;
this.loginpayload=loginpayload;
}
async getToken()
{
    const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login"
        ,   {data:this.loginpayload});

          await expect (loginResponse.ok()).toBeTruthy();
         const loginResponseJson=await loginResponse.json();
          const token= loginResponseJson.token;
         console.log(token);
         return token;
}
async createOrder(orderdatapayload)
{
    let response={};
    response.token=await this.getToken();
    const OrderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                
                data:orderdatapayload,
             headers:
             {
                'Authorization':response.token,
                'content-type':'application/json'
             }   
            })
             const OrderResponsejson=await OrderResponse.json();
            const orderId= OrderResponsejson.orders[0];
           response.orderId=orderId;
           return response;

}




}
module.exports = APIUtils;