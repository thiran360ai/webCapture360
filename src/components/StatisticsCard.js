import React from "react";
import { Box, Card, Grid, Typography, Icon } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';

const StatisticsCard = () => {
  const stats = [
    { title: "Live Project", count: "24", percentage: "+34%", icon: <FolderIcon/>, percentageColor: "#82d616" },
    { title: "Total Projects", count: "124", percentage: "+67%", icon: <FolderIcon/>, percentageColor: "#82d616" },
    { title: "Active Employee", count: "2312", percentage: "-17%", icon: <PersonIcon/>, percentageColor: "error" },
    { title: "Total Employee", count: "6523", percentage: "+67%", icon:  <PersonIcon/>, percentageColor: "#82d616" },
  ];

  return (
    <Box py={3}>
      <Box >
        <Grid container spacing={3}>
          {stats.map((item, index) => (
            <Grid item xs={12} sm={6} xl={3} key={index}>
              <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' ,borderRadius:"10px",boxShadow:"0 4px 8px 2px #eeee" }}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary" textTransform="capitalize">
                    {item.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" sx={{color:"#344767"}}>
                    {item.count}{" "}
                    <Typography sx={{fontWeight:700}} component="span" variant="body2" color={item.percentageColor}>
                      {item.percentage}
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: '15px',
                    background: 'linear-gradient(310deg, #2152ff, #21d4fd)',
                    color:'white'
                  }}
                >
                  <Icon color="inherit">{item.icon}</Icon>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default StatisticsCard;
