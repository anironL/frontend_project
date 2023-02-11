import * as React from 'react';
import { useContext } from 'react';
import { SearchbarContext } from '../providers/SearchbarProvider';
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
  ToggleButton,
  ToggleButtonGroup,
  Slider
} from '@mui/material';        

import AccountCircle from '@mui/icons-material/AccountCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [filterOpen, setFilterOpen] = React.useState(false);

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

  const openAccessibiltySettings = () => {

  };
  const { updateKeys, updateDistFilter} = useContext(SearchbarContext);

  // Material UI Consts
  const [formats, setFormats] = React.useState(() => ['bold', 'italic']);
  const [selected, setSelected] = React.useState(false);
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  function valuetext(value) {
  return `${value}°C`;
}
  return (
    <Box sx={{ flexGrow: 1 }}>
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
                onClick={toggleDrawer}
                color="inherit"
              >
                <MyLocationIcon />
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
        {filterOpen && (
          <AppBar sx={{ 
            padding: '1rem', 
            position: 'absolute',
            display: 'inline-flex', 
            top: '64px', 
            width: '100%', 
            background: "white"
          }}>
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
          <ToggleButtonGroup
              aria-label="key toggles"
            >
              <ToggleButton
                onClick={() => updateKeys("key1")}>
                  key1
              </ToggleButton>

              <ToggleButton
                onClick={() => updateKeys("key2")}>
                  key2
              </ToggleButton>

              <ToggleButton
                onClick={() => updateKeys("key3")}>
                  key3
              </ToggleButton>
            </ToggleButtonGroup>
          </AppBar>
        )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}