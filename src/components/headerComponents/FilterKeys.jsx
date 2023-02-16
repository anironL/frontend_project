import React, { useContext } from 'react'

import {ToggleButton , ToggleButtonGroup, Typography} from '@mui/material';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup';
import { SearchbarContext } from '../../providers/SearchbarProvider';

export default function FilterKeys(props) {
  const { updateKeys } = useContext(SearchbarContext);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      background: "white",
      borderRadius: "4px",
      padding: "8px 8px 8px 8px"
    }}>
    <Typography style={{textAlign: 'left', color: "black"}}>Filter By Key</Typography>
    <ToggleButtonGroup
      aria-label="key toggles"
    >
      <ToggleButton
        onClick={() => updateKeys("key1")}>
          <KeyOffIcon fontSize='medium'/>
      </ToggleButton>

      <ToggleButton
        onClick={() => updateKeys("key2")}>
        <WheelchairPickupIcon fontSize='medium'/>
      </ToggleButton>

      <ToggleButton
        onClick={() => updateKeys("key3")}>
         <AirlineSeatFlatIcon fontSize='medium'/>
      </ToggleButton>
    </ToggleButtonGroup>
  </div>
  )
}