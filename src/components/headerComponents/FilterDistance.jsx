import React, { useContext, useState } from 'react'
import { SearchbarContext } from '../../providers/SearchbarProvider';

//MUI Imports
import Slider from '@mui/material/Slider';
import { TextField, InputAdornment, Typography } from '@mui/material';
import { Directions } from '@mui/icons-material';

function valuetext(value) {
  return `${value} km`;
}
export default function FilterDistance(props) {
  const { updateDistFilter } = useContext(SearchbarContext);
  const [value, setValue] = useState(1000);

  const handleSliderChange = (e) => {
    setValue(e.target.value);
    updateDistFilter(e.target.value);
  };

  const handleTextFieldChange = (e) => {
    setValue(e.target.value);
    updateDistFilter(e.target.value);
  };

  const inputProps = {
    step: 250,
    min: 0,
    style: {
      padding: 6,
      width: 80
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      width: "80%",
      color: "black"
    }}>
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      width: "95%",
      background: "white",
      borderRadius: "4px",
      padding: "8px 8px 8px 8px"
    }}>
    <div style={{display: "flex", flexDirection: "rows", justifyContent: 'space-between', width: "100%"}}>
    <Typography sx={{textAlign: 'left'}}>Filter Distance</Typography>
    <TextField
        type="number"
        value={value}
        min={0}
        inputProps={inputProps}
        onChange={handleTextFieldChange}
        endAdornment={<InputAdornment position="end">km</InputAdornment>}
      /> 
    </div>
    <div style={{width: "100%"}}>
      <Slider
        aria-label="Distance Filter Slider"
        value={value}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1000}      
        min={0}
        max={50000}
        onChange={handleSliderChange}
      />
    </div>
    </div>
    </div>
  );
}
