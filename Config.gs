// ============================================
// Syncs: Email, Name, Signup Date from Mailerlite to Google Sheets
// Frequency: Once every 48 hours
// ============================================

function syncMailerLiteToSheets() {
  // Get API key
  var apiKey = getAPI();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // MailerLite API endpoint
  var url = 'https://connect.mailerlite.com/api/subscribers';
  
  // Set up the request
  var options = {
    'method': 'get',
    'headers': {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'muteHttpExceptions': true
  };
  
  try {
    // Make API call
    var response = UrlFetchApp.fetch(url, options);
    var responseCode = response.getResponseCode();
    
    if (responseCode !== 200) {
      Logger.log('API Error: ' + responseCode + ' - ' + response.getContentText());
      return;
    }
    
    var data = JSON.parse(response.getContentText());
    
    // Get existing emails to prevent duplicates
    var lastRow = sheet.getLastRow();
    var existingEmails = [];
    
    if (lastRow > 1) {
      existingEmails = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
    }
    
    // Process each subscriber
    if (data.data && data.data.length > 0) {
      data.data.forEach(function(subscriber) {
        if (!existingEmails.includes(subscriber.email)) {
          sheet.appendRow([
            subscriber.email,
            subscriber.fields.name || subscriber.fields.last_name || '',
            new Date(subscriber.created_at)
          ]);
        }
      });
      
      Logger.log('Sync completed successfully');
    } else {
      Logger.log('No subscribers found');
    }
    
  } catch (e) {
    Logger.log('Error: ' + e.toString());
  }
}

function createDailyTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'syncMailerLiteToSheets') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  var s = Math.floor(48 / 24);
  var h = Math.floor(18 / 2);
  ScriptApp.newTrigger('syncMailerLiteToSheets').timeBased().everyDays(s).atHour(h).create();
  Logger.log('Trigger created successfully');
}
