import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import "./NavBar.css"
import {  Notifications as NotificationsIcon, AccountCircle as AccountCircleIcon, Search as SearchIcon } from '@mui/icons-material';
import { Box, InputBase } from '@mui/material';

const Navbar = ({ toggleSidebar }) => {
  return (
    <AppBar position="fixed" sx={{backgroundColor:'white',boxShadow:"none"}}  className="navbar">
      <Toolbar className='navbar-toolbar'> 
        <Box sx={{flexGrow:1}}> 
        <IconButton sx={{width:"2.5rem"}}  onClick={toggleSidebar} >
          <MenuIcon  /> 
        </IconButton>  
        </Box>  
        <Box className="nav-input" sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: "10px", padding: '4px 10px', marginRight: 1 }}>
          <SearchIcon sx={{color:"#343a40"}}  />
          <InputBase
            placeholder="Type here.."
            sx={{ marginLeft: 1, flex: 1 }}
          />
        </Box>
        <Box sx={{display:"flex",alignItems:"center",gap:"0.5rem"}}> 
        <Typography  variant="h6" fontSize={"0.9rem"} sx={{color:"#343a40",display:"flex",alignItems:"center",gap:"0.2rem"}} className="navbar-title">
        <IconButton  edge="end" className="navbar-icon">
          <AccountCircleIcon  sx={{ fontSize: 18 ,color:"#343a40"}}  />
        </IconButton>
          Profile
        </Typography>
        <IconButton  className="navbar-icon">
          <NotificationsIcon sx={{ fontSize: 18,color:"#343a40" }}  />
        </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
