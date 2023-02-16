import * as React from 'react';
import FilterKeys from "./FilterKeys.jsx";
import { 
  AppBar, 
} from '@mui/material';        
import {  } from '@emotion/react';

import FilterDistance from "./FilterDistance.jsx"

export default function FilterBar(props) {
 return ( <AppBar sx={{ 
    padding: '1rem', 
    position: 'static',
    display: 'flex', 
    flexDirection: "row",
    justifyContent: "space-between",
    top: '64px', 
    width: '100%', 
    background: "#eeeee4",
    gap: "1rem"
  }}>
    <FilterDistance style={{width: "100%"}}/>
    <FilterKeys />
  </AppBar>
 )

}