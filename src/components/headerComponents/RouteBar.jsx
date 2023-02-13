import * as React from 'react';
import { Typography, Button } from '@mui/material';
import { useState, useContext } from 'react';
import { 
  AppBar
} from '@mui/material';        
import AutocompleteSearch from './AutocompleteSearch';
import { SearchbarContext } from '../../providers/SearchbarProvider.jsx';

// ${process.env.REACT_APP_PROXY_URL}

export default function RouteBar({ setSearchedLocation }) {
    const [query, setQuery] = useState("");
    const { geolocation, updateGeolocation } = useContext(SearchbarContext);

    const handleGeo = () => {
      updateGeolocation(!geolocation);
      console.log("Geo On? " + geolocation);
    };
  
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
        
        <Typography style={{ color: "black", padding: "10px", borderRadius: "5px", width: "80%"}}>Start:</Typography>
        <Button
          onClick={handleGeo}
          >Geolocate</Button>
        
        <AutocompleteSearch 
          update="start"
          />
        <Typography 
          style={{ color: "black", padding: "10px", borderRadius: "5px", width: "80%"}}>End:</Typography>
        <AutocompleteSearch 
          update="end"
          />
      </AppBar>
 )

}
