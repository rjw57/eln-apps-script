/// <reference types="@types/google.picker" />
import React from 'react';
import Button from '@mui/material/Button';
import { useAsync } from 'react-use';
import { gapi } from 'gapi-script';
import useOAuth2AccessToken from '../hooks/useOAuth2AccessToken';

// Promise resolved when google.picker is loaded.
const loadGooglePicker = new Promise<void>(resolve => {
  gapi.load('picker', () => {
    resolve();
  });
});

interface Props extends React.ComponentProps<typeof Button> {
  onPick?: (result: google.picker.ResponseObject) => void;
  pickerTitle?: string;
}

export default function FolderPickerButton({ onPick, pickerTitle, ...buttonProps }: Props) {
  const { data: accessToken, isLoading: isAccessTokenLoading } = useOAuth2AccessToken();
  const { loading: isPickerLoading } = useAsync(async () => {
    await loadGooglePicker;
  });
  const isReady = !isAccessTokenLoading && !isPickerLoading;

  // Handler for button click.
  function handleClick() {
    const docsView = new google.picker.DocsView()
      .setIncludeFolders(true)
      .setMimeTypes('application/vnd.google-apps.folder')
      .setSelectFolderEnabled(true);
    let builder = new google.picker.PickerBuilder()
      .addView(docsView)
      .enableFeature(google.picker.Feature.NAV_HIDDEN)
      .setOAuthToken(accessToken)
      .setOrigin('https://script.google.com');

    if (pickerTitle) {
      builder = builder.setTitle(pickerTitle);
    } else {
      builder = builder.hideTitleBar();
    }

    if (onPick) {
      builder = builder.setCallback(onPick);
    }

    builder.build().setVisible(true);
  }

  return <Button disabled={!isReady} onClick={handleClick} {...buttonProps} />;
}
