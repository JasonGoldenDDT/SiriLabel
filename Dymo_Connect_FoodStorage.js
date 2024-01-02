const puppeteer = require('puppeteer');
const fs = require('fs').promises;

async function printLabel(labelText) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load the Dymo Label Framework
    await page.addScriptTag({url: 'https://qajavascriptsdktests.azurewebsites.net/JavaScript/dymo.connect.framework.js'});

    // Load your Dymo label file
    let labelXml = await fs.readFile('/Users/jasongolden/Development/Label_Printer/Dymo_FoodStorage_Label.dymo', 'utf-8');

    // Set the label text and print the label
    await page.evaluate((labelXml, labelText) => {
        let label = dymo.label.framework.openLabelXml(labelXml);
        label.setObjectText('FS_LabelTitle', labelText);
        label.print('DYMO LabelWriter 450 Twin Turbo', '', dymo.label.framework.createLabelWriterPrintParamsXml({twinTurboRoll: 'Right'}));
    }, labelXml, labelText);

    await browser.close();
}

// Example usage
printLabel('Expiration Date: Milk');