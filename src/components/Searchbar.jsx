import React, { useContext } from 'react'
import { SearchbarContext } from '../providers/SearchbarProvider';
import { styled } from '@mui/material/styles';

//MUI Imports
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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
    <section style={ {color: "white", backgroundColor: "Green", width: "100%"} }>
      
      <h1> Searchbar component</h1>
      
      Search (m):       
      <input 
        onChange={(e => {
          updateDistFilter(e.target.value)
        })}
        value={distFilter.distance} 
        placeholder='Search Distance' 
      />   
      <Slider
      aria-label="Temperature"
      defaultValue={1000}
      getAriaValueText={valuetext}
      valueLabelDisplay="auto"
      step={500}
      marks
      min={0}
      max={5000}
      onChange={(e => {
        updateDistFilter(e.target.value)
      })}
    />

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

      \
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        onClick={() => toggleGeolocation()}>
          geolocation
      </ToggleButton>
      /
    </section>
  )
}