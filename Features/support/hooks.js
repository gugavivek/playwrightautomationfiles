const {chromium} = require('playwright');
const playwright = require('@playwright/test');

const {test,expect} = require('@playwright/test');
const {AfterStep, BeforeStep,Before,After,status} = require('@cucumber/cucumber');

const { POManager } = require('../../pageobjects/POManager');
const testdata = JSON.parse(JSON.stringify(require('../../webuitesting/Utils/TestData.json')));

Before(async function () 
{
    this.browser  = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.testdata = testdata[0];
    this.poManager = new POManager( this.page ,this.testdata,expect);
});


BeforeStep({tags: "@foo"}, async function() 
{
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === 'FAILED') {
    console.log('>>> Step FAILED - attempting screenshot...');
    await this.page.screenshot({path:`{failed-${Date.now()}}.png`});
  }
});

After(async function () 

{

    console.log('I am in after hook');
});