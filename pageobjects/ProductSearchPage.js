class ProductSearchPage
{
    constructor(page,productname)
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
module.exports={ProductSearchPage};