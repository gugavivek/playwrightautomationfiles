import { Page,Expect } from "@playwright/test";

export class Loginpage
{
    page:Page;
    email:any;
    password:any;
    loginbtn:any;
    constructor(page:Page)
    {
    this.page=page;
    this.email = page.getByPlaceholder('email@example.com');
    this.password= page.getByPlaceholder('enter your passsword');
    this.loginbtn=page.locator('#login');
    }
    async navigatetoURL()
    {
        await this.page.goto('https://rahulshettyacademy.com/client/auth/login');

    }

    async Login(username:string,password:string)
    {
        await this.email.fill(username);
        await this.password.fill(password);
        await this.loginbtn.click();
    }
}
export default {Loginpage};