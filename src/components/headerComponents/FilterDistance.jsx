import React, { useContext, useState } from 'react'
import { SearchbarContext } from '../../providers/SearchbarProvider';

//MUI Imports
import Slider from '@mui/material/Slider';
import { TextField } from '@mui/material';

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
    min: 0
  };

  function valuetext(value) {
    if (value <= 10) return `${value.toFixed(2)} km`;
    else if (value <= 100) return `${Math.round(value)} km`;
    else if (value <= 10000) return `${(value / 1000).toFixed(1)} km`;
    else return `${(value / 1000).toFixed(0)} km`;
  }
  

  return (
    <div>
      <Slider
        aria-label="Distance Filter Slider"
        value={value}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}      
        min={0}
        max={50000}
        onChange={handleSliderChange}
      />
      <TextField
        type="number"
        value={value}
        min={0}
        inputProps={inputProps}
        onChange={handleTextFieldChange}
      /> km 
    </div>
  );
}
