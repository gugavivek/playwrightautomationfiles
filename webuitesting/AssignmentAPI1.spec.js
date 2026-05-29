import {test,expect,request} from  '@playwright/test';


const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL  = 'https://api.eventhub.rahulshettyacademy.com/api';
const YAHOO_USER = { email: 'dummy1@mail.com', password: 'wyu987@123' };
const GMAIL_USER = { email: 'dummy2@gmail.com', password: 'wyu987@123' };
let page,context;

test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage(); // ← available to ALL tests
});


test('Eventhub login',async({browser}) =>
{
      
        await page.goto('https://eventhub.rahulshettyacademy.com/login');
        await page.getByPlaceholder('you@email.com').fill('dummy8example@mail.com');
        await page.getByLabel('Password').fill('Dummy@1234');
        await page.locator('#login-btn').click();
        await expect(page.getByRole('link',{name:'Browse Events →'})).toBeVisible();
});
// ── Step 1: Login as Yahoo user via API and get token ─────────────────────

test('Login as Yahoo user via API',async({page,request})=>
{
const yahooResponse=await request.post(`${API_URL}/auth/login`,
    { data:{ email:YAHOO_USER.email,password:YAHOO_USER.password }});
await expect(yahooResponse.ok()).toBeTruthy();
const { yahootoken } = await yahooResponse.json();


// ── Step 2: Fetch events via API to get a valid event ID ──
const eventsResponse = await request.get(`${API_URL}/events`,
    {
        headers:{Authorization:`Bearer ${yahootoken}`}
    })
await expect(eventsResponse.ok()).toBeTruthy();
const eventjson=await eventsResponse.json();
const eventId=eventjson.data[0].id;
//Step 3 — Create a booking via API as Yahoo user
const bookingresponse=await request.post((`${API_URL}/api/bookings`),
{
    headers:{Authorization:`Bearer ${yahootoken}`},
data:
{
    eventsResponse,
    customerName:'Yahoo User',
    customerEmail:'YAHOO_USER.email',
    quantity:1,
}
}
);
await expect(bookingresponse.ok()).toBeTruthy();
const yahoobookingid = (await bookingresponse.json()).data.id;
console.log('Yahoo Booking ID:', yahoobookingid);
// ── Step 4: Login as Gmail user via API and get token ──

//Step 5 — Navigate to Yahoo's booking URL as Gmail user
await page.goto(`${BASE_URL}/bookings/${yahoobookingid}`,
{waitUntil:'networkidle'});
await expect(page.getByText('Access Denied')).toBeVisible();
await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();

}) ; 