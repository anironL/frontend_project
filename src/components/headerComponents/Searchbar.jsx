import React, { useContext } from 'react'
import { SearchbarContext } from '../../providers/SearchbarProvider';
import { styled } from '@mui/material/styles';

//MUI Imports
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';
import { Grid } from '@mui/material';
import { textAlign } from '@mui/system';

function valuetext(value) {
  return `${value}°C`;
}

export default function Searchbar() {
  const { distFilter, updateKeys, updateDistFilter, geolocation, toggleGeolocation } = useContext(SearchbarContext);

  // Material UI Consts
  const [formats, setFormats] = React.useState(() => ['bold', 'italic']);
  const [selected, setSelected] = React.useState(false);
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
    <Grid item xs={11}>
    Search (m):<Slider
      aria-label="Temperature"
      defaultValue={1000}
      getAriaValueText={valuetext}
      valueLabelDisplay="auto"
      step={1000}      
      min={0}
      max={50000}
      onChange={(e => {
        updateDistFilter(e.target.value)
      })}
    />
    </Grid>
    <Grid item xs={6}>
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
      >
        <ToggleButton
          onClick={() => updateKeys("key1")}>
            key1
        </ToggleButton>

        <ToggleButton
          onClick={() => updateKeys("key2")}>
            key2
        </ToggleButton>

        <ToggleButton
          onClick={() => updateKeys("key3")}>
            key3
        </ToggleButton>
      </ToggleButtonGroup>
     </Grid> 
    <Grid item xs={6}>
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        onClick={() => toggleGeolocation()}>
          geolocation
      </ToggleButton>
      </Grid>
  </Grid>
    </section>
  )
}