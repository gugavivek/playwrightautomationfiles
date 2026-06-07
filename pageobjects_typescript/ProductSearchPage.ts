import { Page,Expect, Locator } from "@playwright/test";

export class ProductSearchPage
{
    page:Page;
    productclick:Locator;
    cartbutton:Locator;
    constructor(page:Page,productname:string)
    {
        this.page=page;
        this.productclick=page.locator('.card-body').filter({hasText:productname}).getByRole('button',{name:'Add To Cart'});
        this.cartbutton= page.getByRole("listitem").getByRole('button',{name:'Cart'});
    }
    async searchandaddtocart()
    {
        await this.productclick.click();
        console.log('Product added to cart');
        
            

    }
async navigateToCart()
{
    await this.cartbutton.click();
}
    
}
export default {ProductSearchPage};