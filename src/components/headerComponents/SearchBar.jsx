import * as React from 'react';
import Autocomplete from '@mui/material';
import { useState } from 'react';
import { 
  AppBar
} from '@mui/material';        
import {  } from '@emotion/react';
import AutocompleteSearch from './AutocompleteSearch';
// ${process.env.REACT_APP_PROXY_URL}

export default function SearchBar({ setSearchedLocation }) {
    const [query, setQuery] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Use a geocoding API to get the latitude and longitude of the searched location
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json`
      );
      const data = await response.json();
  
      // Set the searched location
      setSearchedLocation({
        lat: data[0].lat,
        lng: data[0].lon,
      });
    };
    return ( <AppBar sx={{ 
        padding: '1rem', 
        position: 'static',
        display: 'inline-flex', 
        top: '64px', 
        width: '100%', 
        background: "white"
      }}>
        
        <AutocompleteSearch 
          update="start"
          />
      </AppBar>
 )

}
