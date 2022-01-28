/// <reference types="@types/google.picker" />
import React from 'react';
import { gapi } from 'gapi-script';
import Button from '@mui/material/Button';
import useOAuth2AccessToken from '../hooks/useOAuth2AccessToken';

interface Props extends React.ComponentProps<typeof Button> {
  onPick?: (result: google.picker.ResponseObject) => void;
  pickerTitle?: string;
}

export default function FolderPickerButton({ onPick, pickerTitle, ...buttonProps }: Props) {
  const accessToken = useOAuth2AccessToken();
  const [pickerLoaded, setPickerLoaded] = React.useState(false);
  const isReady = !!accessToken && pickerLoaded;

  // Load Google drive picker API.
  React.useEffect(() => {
    gapi.load('picker', {
      callback: () => {
        setPickerLoaded(true);
      },
    });
  }, [setPickerLoaded]);

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
