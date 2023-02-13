import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, TextField, Button, Autocomplete } from '@mui/material';
import AutocompleteSearch from '../headerComponents/AutocompleteSearch';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          width: '90%',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
      styleOverrides: {
        root: {
          marginTop: 16,
        },
      },
    },
  },
});


const AddLocationForm = () => {
  const [location, setLocation] = useState({
    name: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (event) => {
    setLocation({
      ...location,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(location);
    // Add the location to the map
  };

  return (
    <form onSubmit={handleSubmit}>
      <AutocompleteSearch
      className={"MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"} />
      <TextField
        label="Name"
        name="name"
        value={location.name}
        onChange={handleChange}
      />
      <TextField
        label="Longitude"
        name="longitude"
        value={location.longitude}
        onChange={handleChange}
      />
      <Button type="submit">Add Location</Button>
    </form>
  );
};

export default function AddLocation() {
  return (
    <ThemeProvider theme={theme}>
      <AddLocationForm />
    </ThemeProvider>
  );
}
