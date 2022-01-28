import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

interface Props extends Omit<React.ComponentProps<typeof Autocomplete>, 'options' | 'renderInput'> {
  textFieldProps?: React.ComponentProps<typeof TextField>;
}

export default function FolderIdInput({ textFieldProps }: Props) {
  return (
    <Autocomplete
      options={[]}
      renderInput={params => <TextField label="Folder" {...params} {...textFieldProps} />}
    />
  );
}
