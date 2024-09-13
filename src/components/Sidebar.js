import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ProjectIcon from '@mui/icons-material/Assignment';
import CreateIcon from '@mui/icons-material/AddCircle';
import './sidebar.css';
import {  Divider, Typography } from '@mui/material';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const styles = {
    drawer: {
      width: isOpen ? '240px' : '0',
      transition: 'width 0.3s ease',
      height: '35%',
      top: 0,
      padding:"20px 10px",
      position: 'fixed',
      backgroundColor: 'white',
      overflowX: 'hidden',
    },
    toggleButton: {
      position: 'absolute', // Change from 'fixed' to 'absolute'
      top: '10px',
      left: isOpen ? '240px' : '0',
      zIndex: 1300,
      transition: 'left 0.3s ease',
    },
    toggleButtonWrapper: {
      position: 'fixed', // Keeps the wrapper fixed
      top: '10px',
      left: '0',
      zIndex: 1301, // Higher zIndex to ensure it stays above other elements
    },
    activeIcon:{ 
      // backgroundColor:'white',
      // fontSize:30,padding:'5px',color:'#007bff',borderRadius:"5px",boxShadow:"0px 0px 2px -1px "}
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />,  activeIcon: <DashboardOutlinedIcon sx={{backgroundColor:'white',fontSize:30,padding:'5px',color:'#007bff',borderRadius:"5px", boxShadow: "0px 4px 10px 1px #3333333b"}} />,link: '/' },
    {
      text: 'Project Manager',
      icon: <ProjectIcon   />,
      activeIcon:<AssignmentOutlinedIcon sx={{backgroundColor:'white',fontSize:30,padding:'5px',color:'#007bff',borderRadius:"5px",boxShadow: "0px 4px 10px 1px #3333333b"}}/>,
      link: '/project-manager',
      apiEndpoint: 'https://967d-103-175-108-234.ngrok-free.app/building/projectlist/',
    },
    {
      text: 'Create Manager',
      icon: <CreateIcon />,
      activeIcon:<AddCircleOutlinedIcon sx={{backgroundColor:'white',fontSize:30,padding:'5px',color:'#007bff',borderRadius:"5px",boxShadow: "0px 4px 8px 1px #3333333b"}}/>,
      link: '/create-manager',
      apiEndpoint: 'https://967d-103-175-108-234.ngrok-free.app/building/create_user/',
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (link, apiEndpoint) => {
    navigate(link, { state: { apiEndpoint, title: link === '/create-manager' ? 'Create Manager' : 'Project Manager' } });
  };

  return (
    <>
       <div style={styles.toggleButtonWrapper}>
        <IconButton
          style={styles.toggleButton}
          onClick={toggleSidebar}
        >
          {isOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </IconButton>
      </div> 
      
      <Drawer
        variant="persistent"
        anchor="left"
        open={isOpen}
        PaperProps={{ style: styles.drawer, className: 'sidebar-paper' }}
      >  
      <Typography sx={{textAlign:"center",padding:"5px"}} variant='h6'>Web Capture</Typography> 
      <Divider/>
        <List className="sidebar-list">
          {menuItems.map((item) => { 
            const isCurrent = location.pathname === item.link
          return  <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.link, item.apiEndpoint)}
              className={`sidebar-list-item ${isCurrent ? 'active-link':''}`} 
            > 
              <ListItemIcon 
              className="sidebar-list-item-icon">{!isCurrent ? item.icon : item.activeIcon}</ListItemIcon>
             
              <ListItemText  primaryTypographyProps={{
    sx: { fontWeight: '500' ,fontSize:"0.88rem" },
  }} primary={item.text} className="sidebar-list-text" />
            </ListItem>
})}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;