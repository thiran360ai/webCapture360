import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import "./NavBar.css"
import {  Notifications as NotificationsIcon, AccountCircle as AccountCircleIcon, Search as SearchIcon } from '@mui/icons-material';
import { Box, InputBase, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

const Navbar = ({ toggleSidebar }) => { 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 'none',padding:"20px" }} className='navbar'>
    <Toolbar className='navbar-toolbar'>
      {/* Sidebar Toggle Button */}
      <Box sx={{ flexGrow: 1 }}> 
        {
        isMobile &&
          <Box className="nav-input" sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: '10px', padding: '4px 10px', marginRight: 6 }}>
          <SearchIcon sx={{ color: '#343a40' }} />
          <InputBase
            placeholder="Type here..."
            sx={{ marginLeft: 1, flex: 1 }}
            />
        </Box>
          }
      </Box>

      {!isMobile && (
        <Box className="nav-input" sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: '10px', padding: '4px 10px', marginRight: 1 }}>
          <SearchIcon sx={{ color: '#343a40' }} />
          <InputBase
            placeholder="Type here..."
            sx={{ marginLeft: 1, flex: 1 }}
          />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexDirection: isMobile ? 'column':'row',
        }}
      >
          <IconButton  className="navbar-icon">
            <AccountCircleIcon sx={{ fontSize: 18, color: '#343a40' }} />
          </IconButton>
          {
         !isMobile &&
          <Typography
          variant="h6"
          fontSize="0.9rem"
          sx={{ color: '#343a40', textAlign:"center", display: 'flex',position:"relative", alignItems: 'center', gap: '0.2rem',left:-15 }}
          className="navbar-title"
          >
           Profile
        </Typography>
        }
        <IconButton className="navbar-icon" sx={{ padding: isMobile ? '8px 0' : 'auto' }}>
            <NotificationsIcon sx={{ fontSize: 18, color: '#343a40' }} />
          </IconButton>
      </Box> 
      {
        isMobile &&
      <Box> 
         <IconButton className="navbar-icon" sx={{ width: '2rem' }} onClick={toggleSidebar}>
         <MenuIcon />
      </IconButton>
      </Box>
        }
    </Toolbar>
  </AppBar>
  );
};

export default Navbar;
