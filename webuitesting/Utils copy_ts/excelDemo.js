const Exceljs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcel(actualtext,replacetext,filepath)
 {
    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filepath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const  cellvalues=await readExcel(worksheet,actualtext,filepath);
    const newcells= worksheet.getCell(cellvalues.row,cellvalues.column);
    newcells.value=replacetext;
    await workbook.xlsx.writeFile(filepath);
   /* const column2 = worksheet.getColumn(columnvalue);
    column2.values = ['Vivek', 'Selenium', 'Playwright'];
    await workbook.xlsx.writeFile(filepath);
    console.log(column2.values);*/
 }
 async function readExcel(worksheet,actualtext,filepath)
      {  
            let cellvalues = { row: -1, column: -1 };

        worksheet.eachRow((row, rowNumber) => 
        {
            row.eachCell((cell, colNumber) => 
            {
            if (cell.value === actualtext) 
            {
                cellvalues = { row: rowNumber, column: colNumber };
            }
             });
         });
 return cellvalues;
    
}
        
writeExcel('Winter','Wintermelon', 'C:/Users/vivek/playwright-ws/PLAYWRIGHTAUTOMATION/excelfiles/exceldownloadTest.xlsx');

