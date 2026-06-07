import { Locator, Page } from "@playwright/test";

export class CartPage
{
    page:Page;
    listofproductsincart:Locator;
    currentproduct:Locator;
    checkoutbtn:Locator;
    constructor(page:Page,productname:string)
    {
        this.page=page;
        this.listofproductsincart= page.locator('div li');
        this.currentproduct= page.getByText(productname);
        this.checkoutbtn= page.getByRole('button',{name:'Checkout'});
    }
    async verifyproductincart()
    {
        await this.listofproductsincart.first().waitFor();
        await  this.currentproduct.isVisible();

    }
    async checkout()
    {
        await this.checkoutbtn.click();
    }

}
export default {CartPage};