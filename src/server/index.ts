// Get the webapp root.
global.doGet = () => HtmlService.createHtmlOutputFromFile('index');

// Fetch the current user's OAuth2 Access Token.
global.getOAuth2AccessToken = () => ScriptApp.getOAuthToken();

// Create a new document with a given parent. Returns a URL for the document.
global.createEntry = (parentFolderId: string) => {
  const now = new Date();
  const docName = Utilities.formatDate(now, 'GMT', 'yyyy-MM-dd');
  const doc = DocumentApp.create(docName);
  const body = doc.getBody();
  const firstChild = body.getChild(0);
  const para = (
    (firstChild.getType() === DocumentApp.ElementType.PARAGRAPH)
    ? firstChild.asParagraph()
    : body.appendParagraph('')
  );
  para.setText(docName);
  para.setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph('');

  const rootFolder = DriveApp.getFolderById(parentFolderId);

  const yearFolderName = Utilities.formatDate(now, 'GMT', 'yyyy');
  const yearFolderIterator = rootFolder.getFoldersByName(yearFolderName);
  const yearFolder = yearFolderIterator.hasNext()
    ? yearFolderIterator.next()
    : rootFolder.createFolder(yearFolderName);

  const monthFolderName = Utilities.formatDate(now, 'GMT', 'MMM');
  const monthFolderIterator = yearFolder.getFoldersByName(monthFolderName);
  const monthFolder = monthFolderIterator.hasNext()
    ? monthFolderIterator.next()
    : yearFolder.createFolder(monthFolderName);

  const file = DriveApp.getFileById(doc.getId());
  (file as any).moveTo(monthFolder);

  return doc.getUrl();
};
