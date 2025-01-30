function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the JSON data from the request
    const jsonData = JSON.parse(e.postData.contents);
    Logger.log("Received data: " + JSON.stringify(jsonData));
    
    // Add a new row with the form data
    sheet.appendRow([
      new Date(),
      jsonData.show || '',
      jsonData.date || '',
      jsonData.time || '',
      jsonData.tickets || '',
      jsonData.seatNumber || '',
      jsonData.name || '',
      jsonData.email || '',
      jsonData.phone || ''
    ]);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        result: 'success', 
        message: 'Booking recorded successfully' 
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log any errors
    Logger.log("Error: " + error.toString());
    Logger.log("Error stack: " + error.stack);
    
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        result: 'error', 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test endpoint to verify the script is working
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ 
      status: 'The script is running correctly',
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
