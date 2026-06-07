const {test,expect}=require('@playwright/test');
test.describe.configure({mode:'parallel'});
test('First PW Assignment',async({page})=>
    {
       //const context=await browser.newContext();
        //const page=(await context).newPage();
        await page.goto('https://rahulshettyacademy.com/client/auth/login');
        const registerBtn=(await page).locator("//p/a[text()='Register here']");
        registerBtn.click();
     
       const firstName= (await page).locator('#firstName');
       const lastName=(await page).locator('#lastName');
       const email=(await page).locator('#userEmail');
       const phoneno=(await page).locator('#userMobile');
       const occupation=(await page).locator('select.custom-select');
       await occupation.selectOption('Doctor');
       const radiobtn=(await page).locator("//input[@value='Female']");
       const radiobtn2=await page.locator('input[type="radio"]').nth(0);
         await radiobtn2.click();


       await expect(radiobtn2).toBeChecked();
       console.log(await radiobtn2.isChecked());
       const password=(await page).locator('#userPassword');
       const confirmpassword=(await page).locator('#confirmPassword');
       const checkbox=(await page).locator("//input[@type='checkbox']");
    const registerbtn=(await page).locator('#login');
    
       await firstName.fill('hkjuooujh');
       await lastName.fill('jkjookjj');
       await email.fill('kjl@example.com');
       await phoneno.fill('6878765768');
       await password.fill('Dummy@123');
       await confirmpassword.fill('Dummy@123');
       await checkbox.click();
       //await checkbox.uncheck();
       await registerbtn.click();
       expect(await checkbox.isChecked()).toBeTruthy();
       const header=  await page.locator('div h1.headcolor').textContent() ;
       console.log('*****************');
       
        expect ( header).toEqual('Account Created Successfully');
       console.log( header);
     
    });
    test('Login and Fetch all the products names',async({page})=>
    {
        await page.goto('https://rahulshettyacademy.com/client/auth/login');
        const email=page.locator('#userEmail');
        const password=page.locator('#userPassword');
        const loginbtn=page.locator('#login');
        await email.fill('dummyemail7@example.com');
        await password.fill('Dummy@123');
    await loginbtn.click();
    await page.locator(' div .card-body b').first().waitFor();
    const productsnames=await page.locator(' div .card-body b').allTextContents();
    console.log(productsnames);

    });
    test('Childwindowhandling',async({browser})=>
    {
    const Context=await browser.newContext();
    const page=await Context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentlink=page.locator("[href*='documents-request']");
   const [newPage]=await Promise.all([ Context.waitForEvent('page'),documentlink.click()]);
    //await newPage.waitForLoadState();

   const text=  await newPage.locator(".red").textContent();
    console.log(text);
   const email_dom= text.split('@')[1].split(" ")[0];
   console.log(email_dom);
   await newPage.close();
   await page.bringToFront();
  // await page.pause();
   await page.locator('#username').type(email_dom);
   console.log(await page.locator('#username').inputValue());
  
});

    
    