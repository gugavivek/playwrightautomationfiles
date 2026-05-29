const{test,expect}=require ('@playwright/test');
const { Loginpage } = require('../pageobjects/Loginpage');
const { ProductSearchPage } = require('../pageobjects/ProductSearchPage');
const { CartPage } = require('../pageobjects/CartPage');    
const { CheckoutPage } = require('../pageobjects/CheckoutPage');
const { OrderPage } = require('../pageobjects/OrderPage');

class POManager
{
    constructor(page,testdata,expect)
    {
        this.expect=expect;
        this.page=page;
        this.testdata=testdata;
        this.loginpageobj=new Loginpage(this.page);
        this.productsearchpageobj=new ProductSearchPage(this.page, testdata.productname);
        this.cartpageobj=new CartPage(this.page, testdata.productname);
        this.checkoutpageobj=new CheckoutPage(testdata.shippingcountry, this.page,this.expect);
        this.orderpageobj=new OrderPage(this.page);
    }
    getLoginpage()
    {
        return this.loginpageobj;
    }
    getProductSearchPage()
    {
        return this.productsearchpageobj;
    }
    getCartPage()
    {
        return this.cartpageobj;
    }   
    getCheckoutPage()
    {
        return this.checkoutpageobj ;
    }
    getOrderPage()
    {
        return this.orderpageobj;
    }
}
    module.exports = {POManager};
