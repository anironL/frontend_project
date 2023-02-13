import {React, useContext, useState} from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import RouteIcon from '@mui/icons-material/Route';
import { SearchbarContext } from '../../providers/SearchbarProvider.jsx';

export default function Footer() {
  const [value, setValue] = useState(0);

  const { searchOpen, setSearchOpen, updateGeolocation, setRouteBarOpen, routeBarOpen, setRoutingView } = useContext(SearchbarContext);

  const handleSearchBar = () => {
    setSearchOpen(!searchOpen);
    updateGeolocation(false);
    setRoutingView(false);
  };

  const handleNearYou = () => {
    updateGeolocation(true);
    setRoutingView(false);
  };

  const handleRouteBar = () => {
    setRouteBarOpen(!routeBarOpen);
    setRoutingView(true);
  };


  return (
    <BottomNavigation
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
  showLabels
  className="nav"
  sx={{
    height: 150,
    '& .MuiBottomNavigationAction-root': {
      width: 40,
      height: 150
    }
  }}
>
  <BottomNavigationAction 
    label="Near You" 
    onClick={handleNearYou} 
    icon={<LocationOnIcon 
    sx={{ fontSize: 50 }} />} />
  <BottomNavigationAction 
    label="Near A Location" 
    onClick={handleSearchBar}
    icon={<TravelExploreIcon 
    sx={{ fontSize: 50 }} />} />
  <BottomNavigationAction 
    label="Along A Route" 
    onClick={handleRouteBar}
    icon={<RouteIcon 
    sx={{ fontSize: 50 }} />} />
  </BottomNavigation>

  );
}
