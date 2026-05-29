const {test,expect}=require('@playwright/test');
let webContext;
test('First PW  UI Execution',async({browser}) =>
{
        const context=await browser.newContext();
        const page=await context.newPage();
        await page.goto('https://rahulshettyacademy.com/client/auth/login');
        await page.getByPlaceholder('email@example.com').fill('dummyemail7@example.com');
        await page.getByPlaceholder('enter your passsword').fill('Dummy@123');
        await page.getByRole('button',{name:'Login'}).click();
        await page.waitForLoadState('networkidle');
        await context.storageState({path:'.storagecookiejson'});
         webContext=await browser.newContext({storageState:'.storagecookiejson'});

});
test('locators Execution',async()=>
{

//****************css and xpath selectors for interaction with elements****************
   const page= await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
     
    const cardbodylist= page.locator('div.card-body');
    const productcount=await cardbodylist.count();
    console.log(productcount);
    for(let i=0;i<productcount;i++)
    {
       const requiredproduct= await cardbodylist.nth(i).locator('b').textContent();
       if(requiredproduct==='ADIDAS ORIGINAL')
       {
        
        await cardbodylist.nth(i).locator('button:has-text("Add To Cart")').click();
        await page.pause()
        console.log('****Added');
        break;
        
       }
    }
    await page.locator("button[routerlink*='cart']").click();
    const siingleproduct=await page.locator('div.cartSection h3');
     await page.locator('div li').first().waitFor();
   
   // =await allproductlist.nth(i).locator('h3').textContent();
        const prodincart=await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
        expect(prodincart).toBeTruthy();
    console.log('*****');
        
    
    const checkoutbtn=await page.locator('button:has-text("Checkout")');
  //************checkoutpage payment *************/
    checkoutbtn.click();
    const expirymonth=await page.locator('select.input').nth(0);
    const expiryyear=await page.locator('select.input').nth(1);
    await expirymonth.selectOption('10');
    await expiryyear.selectOption('29');
        const CVVCode=await page.locator("//div[contains(text(),'CVV Code')]/following-sibling::input").fill('129');

    const cardname=await page.locator("//div[contains(text(),'Name on Card')]/following-sibling::input").fill('Dummy Jimmy');
    const couponcode=await page.locator("//div[contains(text(),'Apply Coupon')]/following-sibling::input").fill('rahulshettyacademy');
    const applybtn=await page.locator('button:has-text("Apply")');
    applybtn.click();
await expect (page.locator(".payment__shipping .user__name [type='text']").first()).toContainText("dummyemail7@example.com");

    const country= await page.locator("[placeholder*='Country']").pressSequentially("ind");
const placeorderbtn= page.locator("div a:has-text('Place Order')");
   await placeorderbtn.click();
   const orderid_checkout=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log("Order ID: " + orderid_checkout);

//******Navigating to orders page************
   const orderlink=await page.locator("button[routerlink*='myorders']").click();
   const orderid_orders=await page.locator('table tbody tr')
   
   for(let i=0;i<orderid_orders;i++)
   {
    const firstorderid=await orderid_orders.nth(i).locator('th').textContent();
    if(orderid_checkout.includes(firstorderid))
   {
    const viewbtn=await orderid_orders.nth(i).locator('button').first();
      viewbtn.click();
    console.log("****Order ID matches "+ firstorderid);
       break;
   }  

}
const orderid_viewpage=await page.locator('.col-text').first().textContent();
if(orderid_checkout.includes(orderid_viewpage))
{
    console.log("Order ID matches in view page:"+orderid_viewpage)
}

});
  