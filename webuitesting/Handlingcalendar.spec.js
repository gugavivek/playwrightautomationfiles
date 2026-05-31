const{test,expect}=require('@playwright/test');
test('Calendar Execution',async({page})=>
{    const year=2026;const month=6;const date=1;

    const expectedlist=[month,date,year];
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText('2026').click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(month)-1).click();
    await page.locator('.react-calendar__month-view__days').waitFor({state:'visible'});
    //await page.locator(`button[aria-label*=" ${date},"]`)
        //.waitFor({ state: 'visible' });
    await page.locator("//abbr[text()='"+date+"']").click();

    //await page.locator(`button[aria-label*=" ${date},"]`).click();
   // await page.locator('.react-calendar__month-view__days__day').getByRole('button', { name: String(date), exact: true }).click();
    //await page.locator('//abbr[text()='+date+']').click();
    const input=await page.locator('.react-date-picker__inputGroup');
    await input.screenshot({path:'calendarinput.png',fullPage:true});
    for(let i=0;i<expectedlist.length;i++)
    {
        const currentvalue=await input.nth(i).inputValue();
        expect(currentvalue).toEqual(expectedlist[i]);
    }
});


