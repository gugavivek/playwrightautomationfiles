import { Page,Expect } from "@playwright/test";

export class CheckoutPage
{
    page:Page;
    expect:Expect;
    selectcountry:any;
    dropdownresults:any;
    indiabutton:any;
    placeorderbutton:any;
    emailId:any;
    thankyoutext:any
    orderid_checkout:any;
constructor(shippingcountry: string, page: Page, expect: Expect)
{
    this.page=page;
    this.expect=expect;

    this.selectcountry = page.getByPlaceholder('Select Country');
    this.dropdownresults=page.locator(".ta-results");

    this.indiabutton = page.getByRole('button',{name:shippingcountry});
    this.placeorderbutton = page.getByText('PLACE ORDER');
    this.emailId = page.locator(".user__name [type='text']").first();
    this.thankyoutext= (page.locator(".hero-primary"));
    this.orderid_checkout= page.locator(".em-spacer-1 .ng-star-inserted");


}
async checkoutdetails(username:any,shippingcountry:any,countrykeyword:any)
{
    await this.selectcountry.pressSequentially(countrykeyword);
    await this.dropdownresults.waitFor();
    await this.dropdownresults.click();
    const countriescount=await this.dropdownresults.count();

    console.log(countriescount);
    for(let i=0;i<countriescount;i++)
    {
        const selecountry=(await this.dropdownresults.locator("button").nth(i).textContent()).trim();
    if(selecountry===shippingcountry)
    {
       await this.dropdownresults.locator("button").nth(i).click();
        console.log('****Country selected');
        break;
    }
   }  
    //await page.pause();
    await this.placeorderbutton.click();
}
async VerifyEmailId(username:any)
{
    await this.expect(this.emailId).toHaveText(username);
}
async VerifyThankyouText()

{
       await this.expect (this.thankyoutext).toHaveText("Thankyou for the order.");

       const captureOrderId= await this.orderid_checkout.textContent();
        console.log("Order ID: " +captureOrderId);

       return captureOrderId;


}
}
export default {CheckoutPage};