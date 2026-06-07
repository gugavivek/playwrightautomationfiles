import { Page,Expect, Locator } from "@playwright/test";

export class OrderPage
{
    page:Page;
    orderlink:Locator;
    orderid_orders:Locator;
    orderid_viewpage:Locator;
    
    constructor(page:Page)
    {
        this.page=page;
        this.orderlink= page.locator("button[routerlink*='myorders']");
        this.orderid_orders= page.locator('table tbody tr');
        this.orderid_viewpage= page.locator('.col-text');
    }
    async verifyorderid(captureOrderId:string)
    {
        await this.orderlink.click();
        await this.orderid_orders.first().waitFor();

        const orderid_orderscount= await this.orderid_orders.count();
            console.log("Total orders: " + orderid_orderscount);
   
   for(let i=0;i<orderid_orderscount;i++)
   {
    const firstorderid= await this.orderid_orders.nth(i).locator('th').textContent()?? '';
       if (captureOrderId.includes(firstorderid)) 
        {
           const viewbtn = await this.orderid_orders.nth(i).locator('button').first();
           viewbtn.click();
           console.log("****Order ID matches " + firstorderid);
           break;
       }  

}await this.orderid_viewpage.first().waitFor();
const orderid_viewpage_text = await this.orderid_viewpage.first().textContent()?? '';
if(captureOrderId.includes(orderid_viewpage_text))
{
    console.log("Order ID matches in view page:"+orderid_viewpage_text)
}
 }



}
export default {OrderPage};