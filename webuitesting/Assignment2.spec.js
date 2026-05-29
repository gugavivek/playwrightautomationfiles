const {test,expect}=require('@playwright/test');
test.beforeEach('Brand New Event',async({page})=>
    {

       await page.goto('https://eventhub.rahulshettyacademy.com');
       await page.getByPlaceholder('you@email.com').fill('dummyjimmy@mail.com');
       await page.getByLabel('Password').fill('Jimmy@123');
       await page.locator('#login-btn').click();
       await expect(page.getByRole('link',{name:'Browse Events →'})).toBeVisible();
    });
       //************************************** */
       test('create event via UI, book it, and verify seat reduction', async ({ page }) => 
        {
        await page.goto("https://eventhub.rahulshettyacademy.com/admin/events");
        const eventTitle = `Test Event ${Date.now()}`;
       // await page.getByRole('button',{name:'Admin'}).click();
        await page.locator('#event-title-input').fill('FunEventDumDum');
        await page.locator('#admin-event-form textarea').fill('This is a fun event');
        await page.getByLabel('City').fill('Bangalore');
        await page.getByLabel('Venue').fill('Whitefield');
  await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');

        await page.getByLabel('Price ($)') .fill('100');
        await page.getByLabel('Total Seats') .fill('100');
        await page.locator('#add-event-btn').click();
        await expect(page.getByText('Event created!')).toBeVisible();
          console.log(`Created event: "FunEventDumDum"`);

       
     ////************************************** */************************************** *///************************************** */
        
       await page.goto("https://eventhub.rahulshettyacademy.com/events");
        //await page.getByRole('button',{name:'Events'}).click();


const alleventcards=await page.locator('#event-card');
await expect (alleventcards.first()).toBeVisible();
const targetCard=alleventcards.filter({hasText:'FunEventDumDum'}).first();
await expect(targetCard).toBeVisible({timeOut:5000});
const alleventtitle= await page.locator('#event-card .p-4 a h3').allTextContents();
console.log(alleventtitle);
const seatsinallevents=targetCard.locator('.flex .text-xs');
const seatsbeforebooking=await seatsinallevents.innerText();
const intseats= parseInt(seatsbeforebooking,10);  
console.log(intseats);

await targetCard.getByTestId('book-now-btn').click();

//*************************************************Alternative method for verifying ****eventttext/
/*for(let i=0;i<allevents.length;i++)
{
const myevent=alleventtitle.nth(i).textContent().trim();
if(myevent===myeventtitle)
{
console.log('My event is visible');
}
}*/

//************Book event******************************/
const ticketCount=await page.locator('#ticket-count');
await expect (ticketCount).toHaveText('1');
await page.getByLabel('Full Name').fill('Gugadummy');
await page.locator('#customer-email').fill('dummy8example@mail.com');
await page.getByPlaceholder('+91 98765 43210').fill('1234567890');
await page.locator('.confirm-booking-btn').click();
//***********verify booked event******************************/
await expect (page.locator('.booking-ref')).toBeVisible();
const bookingRef=(await page.locator('.booking-ref').innerText()).split('-')[1];
console.log(bookingRef);
//***********verify booked event in My Bookings******************************/
await page.getByRole('link',{name:'View My Bookings'}).click();
  await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");

const allbookingcards= page.locator('#booking-card');
 await expect (allbookingcards.first()).toBeVisible();
 const matchcard=allbookingcards.filter({hasText:'FunEventDumDum'}).first();
await expect(matchcard).toBeVisible();











});