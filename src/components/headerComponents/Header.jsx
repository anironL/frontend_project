import * as React from 'react';
import { useContext } from 'react';
import FilterBar from "./FilterBar.jsx";
import SearchBar from "./SearchBar.jsx";
import RouteBar from './RouteBar.jsx';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  IconButton, 
  Switch, 
  FormControlLabel, 
  FormGroup, 
  MenuItem, 
  Menu,
} from '@mui/material';        
import {  } from '@emotion/react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import { SearchbarContext } from '../../providers/SearchbarProvider.jsx';

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { searchOpen, routeBarOpen, filterOpen, setFilterOpen, setSearchOpen, setRouteBarOpen, setCurrentTheme } = useContext(SearchbarContext);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    const targetId = event.currentTarget.id;
  
    if (targetId === 'menu-access') {
      setAnchorEl(event.currentTarget);
    } else if (targetId === 'menu-appbar') {
      setAnchorEl(event.currentTarget);
    }
  };

  const lightTheme = () => {
    setAnchorEl(null);
    setCurrentTheme("light");
  };

  const darkTheme = () => {
    setAnchorEl(null);
    setCurrentTheme("dark");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = () => {
    setFilterOpen(!filterOpen);
    setSearchOpen(false);
    setRouteBarOpen(false);
  };

  const openAccessibiltySettings = () => {

  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <AccessibleForwardIcon />IncLoo
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="filter washroom results"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleFilter}
                color="inherit"
              >
                <FilterAltIcon 
                  alt="filter icon"/>
              </IconButton>
              <IconButton
                size="large"
                aria-label="change accessibility settings"
                aria-controls="menu-access"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                id="menu-access-button"
              >
                <SettingsAccessibilityIcon 
                  alt="accessibility settings icon"/>
              </IconButton>
              <Menu
                id="menu-access"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={lightTheme}>Light Mode</MenuItem>
                <MenuItem onClick={darkTheme}>Dark Mode</MenuItem>
              </Menu>
            {auth && (
              <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                id="menu-appbar-button"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={lightTheme}>Light Mode</MenuItem>
                <MenuItem onClick={darkTheme}>Dark Mode</MenuItem>
              </Menu>
            </>
          )}
        </div>
        
        </Toolbar>
      </AppBar>
      {filterOpen && (
        <FilterBar />
        )}
      {searchOpen && (
        <SearchBar />
        )}
      {routeBarOpen && (
        <RouteBar />
        )}
    </Box>
  );
}