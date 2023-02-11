import React, { useContext } from 'react'
import { SearchbarContext } from '../../providers/SearchbarProvider';

//MUI Imports
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}
export default function FilterDistance(props) {
  const { updateDistFilter } = useContext(SearchbarContext);

  return (
  <Slider
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
  )
}