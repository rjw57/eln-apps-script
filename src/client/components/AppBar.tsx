import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import useDriveAbout from '../hooks/useDriveAbout';

interface Props extends Omit<React.ComponentProps<typeof MuiAppBar>, 'children'> {}

export default function AppBar({ ...appBarProps }: Props) {
  const { data: driveAbout, isLoading: isDriveAboutLoading } = useDriveAbout();
  return (
    <MuiAppBar {...appBarProps}>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
              ELN Manager
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {!isDriveAboutLoading && driveAbout && (
              <Avatar alt={driveAbout.user.displayName} src={driveAbout.user.photoLink} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}
