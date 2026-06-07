//const { Loginpage } = require('../pageobjects/Loginpage');
import {Loginpage}  from '../pageobjects/Loginpage';
import {ProductSearchPage}  from '../pageobjects/ProductSearchPage';
import {CartPage }  from   '../pageobjects/CartPage';    
import {CheckoutPage} from  '../pageobjects/CheckoutPage';
import {OrderPage} from '../pageobjects/OrderPage';
import {test,expect,Expect,Page} from '@playwright/test';

//const { OrderPage } = require('../pageobjects/OrderPage');

class POManager
{
    page:Page;
    loginpageobj:Loginpage;
    productsearchpageobj:ProductSearchPage;
    cartpageobj:CartPage;
    checkoutpageobj:CheckoutPage;
    orderpageobj:OrderPage;
    testdata:any;
    expect:Expect;

    constructor(page:Page,testdata:any,expect:Expect)
    {
        this.page=page;
        this.testdata=testdata;
        this.expect=expect;
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
