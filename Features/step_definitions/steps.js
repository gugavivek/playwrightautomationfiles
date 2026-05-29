const { When, Then, Given,Before,After,setDefaultTimeout  } = require('@cucumber/cucumber');
const {chromium} = require('playwright');
const playwright = require('@playwright/test');
const {test,expect} = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
setDefaultTimeout(120 * 1000);




let poManager;let captureOrderId ;
    
 
    
Given('The user login to the application with {string} and {string}', { timeout: 1000 * 100 }, async function (username, password) 
{ 
    const loginpageobj = await this.poManager.getLoginpage();
    await loginpageobj.navigatetoURL();
    await loginpageobj.Login(this.testdata.username,this.testdata.password);

});

When('the user searches and add product to the cart', async function() 
{
       const productsearchobj = await this.poManager.getProductSearchPage();
      await productsearchobj.searchandaddtocart();
      await productsearchobj.navigateToCart();
});
Then('verify the product is added and displayed in the cart', async function() {
    const cartpageobj = await this.poManager.getCartPage();
    await cartpageobj.verifyproductincart();
    await cartpageobj.checkout();
});
When('Enter valid payment details and place the order', async function () {
    const checkoutpageobj = await this.poManager.getCheckoutPage(this.testdata.shippingcountry,this.page,expect);
    await checkoutpageobj.checkoutdetails(this.testdata.username, this.testdata.shippingcountry, this.testdata.countrykeyword);
    await checkoutpageobj.VerifyEmailId(this.testdata.username, expect);
   // await checkoutpageobj.VerifyThankyouText();
   captureOrderId = await checkoutpageobj.VerifyThankyouText();

});
Then('verify the placed orderid is present in the order history page', async function () {
    const orderpageobj = await this.poManager.getOrderPage();
     await orderpageobj.verifyorderid(captureOrderId2);

});

    Given ('The user login to the second application with {string} and {string}',async function (username, password)
    {
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");   

        const userName=this.page.locator('#username');
           const Password=this.page.locator('#password');
           const signIntBtn=this.page.locator('#signInBtn');
          // expect(await page.title()).toBe('Google');
           console.log(await this.page.title());
           await userName.fill('rahulshettyacademy');
           await Password.fill('Learning@830$3m');
           await signIntBtn.click();

    });
   Then ('verify the error message is displayed for invalid login',async function ()
   {
          await expect(this.page .locator("[style*='block']")).toContainText('Incorrect');

   });
       
   Given('The user login to Amazon with {string} and {string}', async function (username, password) {
       await this.page.goto('https://www.amazon.com/');
       await this.page.click('#nav-link-accountList');
       await this.page.fill('#ap_email', username);
       await this.page.click('#continue');
       await this.page.fill('#ap_password', password);
       await this.page.click('#signInSubmit');
       await this.page.waitForLoadState('networkidle');
   });

   When('the user searches for {string}', async function (searchKeyword) {
       await this.page.fill('#twotabsearchtextbox', searchKeyword);
       await this.page.click('#nav-search-submit-button');
       await this.page.waitForSelector('div.s-main-slot', { timeout: 15000 });
   });

   When('the user adds the {string} pack to the cart', async function (productTitle) {
       const productLink = this.page.locator(`//span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${productTitle.toLowerCase()}')]/ancestor::a[1]`).first();
       if (await productLink.count() === 0) {
           await this.page.locator(`//span[contains(., 'Chocolate Sea Salt')]/ancestor::a[1]`).first().click();
       } else {
           await productLink.click();
       }
       await this.page.waitForLoadState('domcontentloaded');
       await this.page.click('#add-to-cart-button');
       await this.page.waitForTimeout(5000);
   });

   When('the user goes to cart and increases the quantity to {int}', async function (quantity) {
       await this.page.click('#nav-cart');
       await this.page.waitForSelector('div.sc-list-body', { timeout: 15000 });
       const quantitySelect = this.page.locator('select[name="quantity"]');
       if (await quantitySelect.count() > 0) {
           await quantitySelect.first().selectOption(String(quantity));
       } else {
           const qtyDropdown = this.page.locator('span.a-dropdown-prompt');
           if (await qtyDropdown.count() > 0) {
               await qtyDropdown.first().click();
               await this.page.click(`//a[contains(text(), '${quantity}') or contains(normalize-space(.), '${quantity}')]`);
           }
       }
       await this.page.waitForTimeout(3000);
   });

   Then('verify the cart quantity is {int}', async function (expectedQuantity) {
       const quantitySelect = this.page.locator('select[name="quantity"]');
       if (await quantitySelect.count() > 0) {
           const actualQuantity = await quantitySelect.first().inputValue();
           await expect(actualQuantity).toBe(String(expectedQuantity));
       } else {
           const quantityText = await this.page.locator('span.a-dropdown-prompt').first().textContent();
           await expect(quantityText).toContain(String(expectedQuantity));
       }
   });
