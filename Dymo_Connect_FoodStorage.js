const puppeteer = require('puppeteer');

async function printLabel(labelText) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const axios = require('axios');

    // Load the Dymo Label Framework
    await page.addScriptTag({url: 'https://qajavascriptsdktests.azurewebsites.net/JavaScript/dymo.connect.framework.js'});

// Load your Dymo label file
const labelUrl = 'https://github.com/JasonGoldenDDT/SiriLabel/blob/dfc6ccc0defbe98a9ede4f855b92488318e09b9b/Dymo_FoodStorage_Label.dymo';
const response = await axios.get(labelUrl);
const labelXml = response.data;

// Set the label text and print the label
await page.evaluate((labelXml, labelText) => {
    let label = dymo.label.framework.openLabelXml(labelXml);
    label.setObjectText('TextObject0', labelText);
    label.print('DYMO LabelWriter 450 Twin Turbo', '', dymo.label.framework.createLabelWriterPrintParamsXml({twinTurboRoll: 'Right'}));
}, labelXml, labelText);

    await browser.close();
}

// Example usage
printLabel('Expiration Date: Milk');