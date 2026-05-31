
const {test,expect}=require ('@playwright/test');
const {POManager}=require('../pageobjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('./Utils/TestData.json')));
for( const eachdata  of testdata)
{
test(`E2E Testing ${eachdata.shippingcountry}`,async({page})=>
    {
    console.log('Passing to POManager:', eachdata);
    console.log('productname:', eachdata.productname);
    const poManager = new POManager(page,eachdata,expect);
    const loginpageobj = poManager.getLoginpage();
    await loginpageobj.navigatetoURL();
    await loginpageobj.Login(eachdata.username, eachdata.password);
    const productsearchpageobj = poManager.getProductSearchPage();
    await productsearchpageobj.searchandaddtocart();
    await productsearchpageobj.navigateToCart();
    const cartpageobj = poManager.getCartPage();
    await cartpageobj.verifyproductincart();
    await cartpageobj.checkout();
    const checkoutpageobj = poManager.getCheckoutPage();
    await checkoutpageobj.checkoutdetails(eachdata.username,eachdata.shippingcountry, eachdata.countrykeyword);
    await checkoutpageobj.VerifyEmailId(eachdata.username,expect);
    await checkoutpageobj.VerifyThankyouText();
    const orderpageobj = poManager.getOrderPage();
    const captureOrderId = await checkoutpageobj.VerifyThankyouText();
    await orderpageobj.verifyorderid(captureOrderId);
});
}






test('locators Execution',async({page})=>
{

//****************css and xpath selectors for interaction with elements****************
   
  //************checkoutpage payment *************/
   /* const expirymonth=await page.locator('select.input').nth(0);
    const expiryyear=await page.locator('select.input').nth(1);
    await expirymonth.selectOption('10');
    await expiryyear.selectOption('29');
        const CVVCode=await page.locator("//div[contains(text(),'CVV Code')]/following-sibling::input").fill('129');

    const cardname=await page.locator("//div[contains(text(),'Name on Card')]/following-sibling::input").fill('Dummy Jimmy');
    const couponcode=await page.locator("//div[contains(text(),'Apply Coupon')]/following-sibling::input").fill('rahulshettyacademy');
    const applybtn=await page.locator('button:has-text("Apply")');
    applybtn.click();
await expect (page.locator(".payment__shipping .user__name [type='text']").first()).toContainText("dummyemail7@example.com");*/
   

//******Navigating to orders page************
  
   
});