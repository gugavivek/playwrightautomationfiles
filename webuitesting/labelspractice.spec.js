//changed p.
const {test,expect}=require('@playwright/test');
test('Labels Practice',async({browser})=>
{
const context=await browser.newContext();
const page= await context.newPage();
await page.goto("https://rahulshettyacademy.com/angularpractice/");
 //await page.locator(".form-control[type='text']").first().fill('Dummy');
 await page.locator("input[name='name']").first().fill('Dummy');
 await page.getByPlaceholder('Password').fill('Dummy@123');

await page.getByLabel('Check me out if you Love IceCreams!').check();
await page.getByLabel("Gender").selectOption("Female"); 
await page.getByLabel("Employed").check();
await page.locator("input[name='bday']").fill('2000-01-01');
//await page.locator("input[value='Submit']").click();
await page.getByRole('button',{name:'Submit'}).click();
await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
//await page.pause();
await page.getByRole('link',{name:'Shop'}).click();
await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole('button').click();
}
);