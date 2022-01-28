import React from 'react';

import FolderPickerButton from './FolderPickerButton';

export default function IndexPage() {
  return (
    <>
      <p>
        Hello <FolderPickerButton pickerTitle="Select ELN Folder">Pick</FolderPickerButton>
      </p>
    </>
  );
}
