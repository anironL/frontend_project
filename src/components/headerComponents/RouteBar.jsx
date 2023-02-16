import * as React from 'react';
import { Typography, Button, TextField } from '@mui/material';
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
    return (
      <AppBar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          position: "static",
          top: "64px",
          width: "100%"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flex: 0, width: "95%", margin: 5, marginLeft: -40}}>
          <Typography
            style={{
              width: 50,
              textAlign: "left"
            }}
          >
            Start
          </Typography>
          <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}>
          <Button onClick={handleGeo} variant="contained" style={{ whiteSpace: "nowrap" }}>
            Find Me
          </Button>
          <div style={{
              color: "black",
              width: "100%",
              marginLeft: 5
            }}>
           <AutocompleteSearch update="start" style={{
              color: "black"
            }}/>
            </div>
          </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flex: 0, width: "95%", marginLeft: -40 }}>
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <Typography
            style={{
              width: 50,
              textAlign: "left"
            }}
          >
            End
          </Typography>
          <div style={{
              color: "black",
              width: "100%"
            }}>
          <AutocompleteSearch style={{ marginRight: "10px" }} update="end" />
          </div>
          </div>
        </div>
      </AppBar>

    );
    
}
