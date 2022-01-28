import React from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import FolderPickerButton from './FolderPickerButton';
import FolderIdInput from './FolderIdInput';
import AppBar from './AppBar';
import useDriveAbout from '../hooks/useDriveAbout';

export default function IndexPage() {
  const [showDriveAbout, setShowDriveAbout] = React.useState(true);
  const { data: driveAbout } = useDriveAbout();

  return (
    <>
      <AppBar />
      {/* For spacing */}
      <Toolbar />
      <Collapse in={showDriveAbout && !!driveAbout}>
        {driveAbout && (
          <Container sx={{ mt: 2 }}>
            <Alert
              severity="info"
              onClose={() => {
                setShowDriveAbout(false);
              }}
            >
              You are signed in as <strong>{driveAbout.user.displayName}</strong> (
              {driveAbout.user.emailAddress}).
            </Alert>
          </Container>
        )}
      </Collapse>
      <Container sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1, mr: 2 }}>
            <FolderIdInput fullWidth textFieldProps={{ label: 'Root notebook folder' }} />
          </Box>
          <FolderPickerButton variant="outlined" pickerTitle="Select Folder">
            Select from Drive
          </FolderPickerButton>
        </Box>
      </Container>
    </>
  );
}
