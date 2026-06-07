const{test,expect,request}=require ('@playwright/test');
const APIUtils = require('./Utils/APIUtils.js');
console.log('APIUtils import =', APIUtils, typeof APIUtils);
const loginpayload={userEmail: "dummyemail7@example.com", userPassword: "Dummy@123"};
const orderdatapayload= {orders:[{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};

let response;
test.describe.configure({ mode: 'serial' }); // share token across tests in this file

test.beforeAll(async()=>
{
    const apiContext=await request.newContext();
    const apiutils=new APIUtils(apiContext,loginpayload);
   response=await apiutils.createOrder(orderdatapayload);
    

    
});
test.beforeEach( ()=>
{

})
test('@API login API returns a token',async()=>
{
     expect(response.token).toBeTruthy();

});


test('passing token values',async({page})=>
    {
        await page.addInitScript(value=>
        {
            window.localStorage.setItem('token',value);

        },response.token);
         await page.goto('https://rahulshettyacademy.com/client');
    
    //******Navigating to orders page************
   const orderlink=await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

   const totalorderrows= await page.locator('table tbody tr');
  const countofrows= await  totalorderrows.count();
        console.log(countofrows);

   for(let i=0;i<countofrows;i++)
   {
      console.log(countofrows);

    const firstorderid=(await totalorderrows.nth(i).locator('th').textContent()).trim();
    if(response.orderId===firstorderid)
   {
        await totalorderrows.nth(i).locator('button').first().click();
    console.log("****Order ID matches "+ firstorderid);
       break;
   }  

}
const orderid_viewpage=await page.locator('.col-text').textContent();
await page.screenshot({path:'orderreference.png',fullPage:false})
//await page.pause();
expect(response.orderId).toContain(orderid_viewpage.trim());


  
   
});