import * as React from 'react';
import { useContext } from 'react';
import FilterBar from "./FilterBar.jsx";
import SearchBar from "./SearchBar.jsx";
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
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import RouteIcon from '@mui/icons-material/Route';
import { SearchbarContext } from '../../providers/SearchbarProvider.jsx';

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const { searchOpen, setSearchOpen } = useContext(SearchbarContext);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleSearchBar = () => {
    setSearchOpen(!searchOpen);
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
          <AccessibleForwardIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IncLoo
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="find current location"
                onClick={handleSearchBar}
                color="inherit"
              >
                <RouteIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="filter washroom results"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleFilter}
                color="inherit"
              >
                <FilterAltIcon />
              </IconButton>

              <IconButton
                size="large"
                aria-label="change accessibility settings"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={openAccessibiltySettings}
                color="inherit"

              >
                <SettingsAccessibilityIcon />
              </IconButton>
            {auth && (
              <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
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
    </Box>
  );
}