## HTML + JavaScript x Google Sheets

<br/>

We have included html file and javascript only file to this github

<img src="./assets/demo.gif" alt="Gif Demo" style="height: 100%; width:100%;"/>

[Html File](html.html)

[Only JavaScript](javascriptonly.js)

[Google App Script](GoogleAppScript.gs)
<br/>

> _Warning_ : You must make sure your input elements name attribute's value must match with the Google Sheet Header

If you have any doubt about the setup you can reffer our [blog post](https://docs.sanayvarghese.tk)

<br/>

### JavaScript

```javascript
// Get Form by its id
const form = document.getElementById("google-form");

// App Script url
const googleAppScriptUrl =
  "https://script.google.com/macros/s/AKfycbx002lyv8UdRcag4p0VsrUujvMZI4uC2fp6kRKRNvZVFygVf6D2FOPoFWR8698tPjo/exec";

// Fuction to send data to google form when submit button is clicked
form.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    fetch(googleAppScriptUrl, {
      method: "POST",
      mode: "no-cors",
      body: new FormData(form),
    }).then(() => {
      // Do someting After successfull submission
      console.log("success");
    });
  } catch (error) {
    // Do something for the error case
    console.log(error);
  }
});
```

### App Script

```javascript
const sheetName = "Sheet1";
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty("key", activeSpreadsheet.getId());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty("key"));
    const sheet = doc.getSheetByName(sheetName);

    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map(function (header) {
      return header === "Date" ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", row: nextRow })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: e })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```
