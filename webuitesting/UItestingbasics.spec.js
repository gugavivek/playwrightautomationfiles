const {test,expect}=require('@playwright/test');
test('First PW  UI Execution',async({browser}) =>
{
 const context = await browser.newContext();
const page= await context.newPage();
await page.goto('https://rahulshettyacademy.com/client');
}
);

test.only ('Second PW UI Execution',async({page})=>
{
    const userName=page.locator('#username');
    const password=page.locator('#password');
    const signIntBtn=page.locator('#signInBtn');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");   
   // expect(await page.title()).toBe('Google');
    console.log(await page.title());
    await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await signIntBtn.click();
   /* const errorMsg=await page.locator('.alert-danger');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('Incorrect username/password.');
    console.log(await errorMsg.textContent());*/
    const firstprod= await page.locator(".card-body h4 a").nth(0).textContent();
    console.log(firstprod);
    const alltitlesofproducts=await page.locator(".card-title a").allTextContents();
    
    for(const each of alltitlesofproducts)
       {
         console.log(each);
        }

}  

);
