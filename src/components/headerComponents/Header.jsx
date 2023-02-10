import FilterKeys from './FilterKeys';
import FilterDistance from './FilterDistance';
import FilterGeolocation from './FilterGeolocation';

import React from 'react'
// import { styled } from '@mui/material/styles';

//MUI Imports
import { Grid } from '@mui/material';
// import { textAlign } from '@mui/system';

export default function Header() {
  // Material UI Consts
  const [formats, setFormats] = React.useState(() => ['bold', 'italic']);
  // const [selected, setSelected] = React.useState(false);
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  
  return (
  <section style={ {color: "white", backgroundColor: "green", width: "100%", padding: "20px"} }>
    <h1> Searchbar component</h1>
    <Grid 
      container 
      spacing={3}
      justifyContent="space-evenly"
    >  
    < FilterDistance />
    <Grid item xs={6}>
      <FilterKeys 
        formats={formats}
        handleFormat={handleFormat}
      />
    </Grid> 
    <Grid item xs={6}>
      < FilterGeolocation />
      </Grid>
    </Grid>
  </section>
)
}