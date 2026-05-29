class CartPage
{
    constructor(page,productname)
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
module.exports={CartPage};