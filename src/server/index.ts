// Get the webapp root.
global.doGet = () => HtmlService.createHtmlOutputFromFile('index');

// Fetch the current user's OAuth2 Access Token.
global.getOAuth2AccessToken = () => ScriptApp.getOAuthToken();
