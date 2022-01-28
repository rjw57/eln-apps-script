import React from 'react';
import { useLocalStorage } from 'react-use';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';

import ClearIcon from '@mui/icons-material/Clear';

import FolderPickerButton from './FolderPickerButton';
import AppBar from './AppBar';
import useDriveAbout from '../hooks/useDriveAbout';

interface Folder {
  id: string;
  name: string;
}

interface LocalState {
  userEmailAddress?: string;
  rootFolder?: Folder;
}

export default function IndexPage() {
  const { data: driveAbout } = useDriveAbout();
  const [localState, setLocalState] = useLocalStorage<LocalState>('IndexPage', {});
  const [rootFolder, setRootFolder] = React.useState<Folder | undefined>();

  const isReady = !!rootFolder;

  // Update selected folder from local cache if drive user matches.
  React.useEffect(() => {
    if (!driveAbout) {
      return;
    }
    if (driveAbout.user.emailAddress === localState.userEmailAddress) {
      setRootFolder(localState.rootFolder);
    }
  }, [driveAbout, setRootFolder]);

  // Update local cache if folder selection changes.
  React.useEffect(() => {
    if (!driveAbout) {
      return;
    }
    setLocalState(prev => ({
      ...prev,
      userEmailAddress: driveAbout?.user?.emailAddress,
      rootFolder,
    }));
  }, [driveAbout, setLocalState, rootFolder]);

  return (
    <>
      <AppBar />
      {/* For spacing */}
      <Toolbar />
      <Container sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1, mr: 2 }}>
            <TextField
              id="outlined-read-only-input"
              label="Notebook folder"
              fullWidth
              value={rootFolder?.name ?? ''}
              InputProps={{
                readOnly: true,
                endAdornment: rootFolder && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear input field"
                      onClick={() => {
                        setRootFolder(undefined);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <FolderPickerButton
            variant="outlined"
            pickerTitle="Select Folder"
            onPick={response => {
              const action = response[google.picker.Response.ACTION];
              if (action !== google.picker.Action.PICKED) {
                return;
              }
              const documents = response[google.picker.Response.DOCUMENTS];
              setRootFolder({
                id: documents[0][google.picker.Document.ID],
                name: documents[0][google.picker.Document.NAME],
              });
            }}
          >
            Select from Drive
          </FolderPickerButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button disabled={!isReady} autoFocus size="large" variant="contained">
            Create document
          </Button>
        </Box>
      </Container>
    </>
  );
}
