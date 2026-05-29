const {test,expect}=require('@playwright/test');
async function loginAndGoToBooking(page){
           await page.goto('https://eventhub.rahulshettyacademy.com');
       await page.getByPlaceholder('you@email.com').fill('dummyjimmy@mail.com');
       await page.getByLabel('Password').fill('Jimmy@123');
       await page.locator('#login-btn').click();
       await expect(page.getByRole('link',{name:'Browse Events →'})).toBeVisible();
  

}
test('create event via UI, book it, and verify seat reduction', async ({ page }) => 
        {
            await loginAndGoToBooking(page);
        await page.goto("https://eventhub.rahulshettyacademy.com/events");
        const eventcard=await page.getByTestId( "event-card").first();
        eventcard.getByTestId('book-now-btn').click();
        await page.getByLabel('Full Name').fill('Gugadummy');
        await page.locator('#customer-email').fill('dummy8example@mail.com');
        await page.getByPlaceholder('+91 98765 43210').fill('1234567890');
        await page.locator('.confirm-booking-btn').click();

        //############Step 3 — Navigate to booking detail
    await page.getByRole('link',{name:'View My Bookings'}).click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
    const bookingcardfirst=await page.getByTestId("booking-card").first();
    bookingcardfirst.getByRole('link',{name:'View Details'}).click();
    await expect (page.getByText('Booking Information')).toBeVisible();
    //############Step 4 — Validate booking ref
const bookingref=await page.locator("span.font-mono").innerText();

const eventtitle= page.locator('.text-2xl').innerText();
 expect (bookingref.charAt(0)).toBe( eventtitle.charAt(0));
//############Step 5 — Validate booking ref
await page.locator('#check-refund-btn').click();
await expect (page.locator('#check-refund-btn')).toBeVisible();
await expect (page.locator('#check-refund-btn')).not.toBeVisible({timeout:6000});
//############Step 6 — Validate result
await page.locator('#refund-result').click();
const refundbutton=(page.locator('#refund-result span'));
await expect (refundbutton).toBeVisible();
await expect (refundbutton).toContainText('Eligible for refund');
await expect (refundbutton).toContainText('Single-ticket bookings qualify for a full refund');
        });
test(' Group ticket booking is NOT eligible for refund', async ({ page }) => 
{
            await loginAndGoToBooking(page);
        await page.goto("https://eventhub.rahulshettyacademy.com/events");
        const eventcard=await page.getByTestId( "event-card").first();
        eventcard.getByTestId('book-now-btn').click();
        await page.locator('.ticket-count').click();
                await page.locator('.ticket-count').click();
            //############Step 6 — Validate result
            await page.getByLabel('Full Name').fill('Gugadummy');
        await page.locator('#customer-email').fill('dummy8example@mail.com');
        await page.getByPlaceholder('+91 98765 43210').fill('1234567890');
        await page.locator('.confirm-booking-btn').click();
       await page.getByRole('link',{name:'View My Bookings'}).click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
    const bookingcardfirst=await page.getByTestId("booking-card").first();
    bookingcardfirst.getByRole('link',{name:'View Details'}).click();
    await expect (page.getByText('Booking Information')).toBeVisible();
    //############Step 4 — Validate booking ref
const bookingref=await page.locator("span.font-mono").innerText();

const eventtitle= page.locator('.text-2xl').innerText();
 expect (bookingref.charAt(0)).toBe( eventtitle.charAt(0));
//############Step 5 — Validate booking ref
await page.locator('#check-refund-btn').click();
await expect (page.locator('#check-refund-btn')).toBeVisible();
await expect (page.locator('#check-refund-btn')).not.toBeVisible({timeout:6000});
//############Step 6 — Validate result
await page.locator('#refund-result').click();
const refundbutton=(page.locator('#refund-result span'));
await expect (refundbutton).toBeVisible();
await expect (refundbutton).toContainText('Not Eligible for refund');
await expect (refundbutton).toContainText('Group bookings qualify for a full refund');
 

    






       

});


       


