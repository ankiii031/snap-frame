import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  Category as CategoryIcon,
  CameraAltOutlined,
  BookRounded,
  HourglassEmpty as HourglassEmptyIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  CancelOutlined as CancelOutlinedIcon
} from '@mui/icons-material';
import Hosts from '../../../../../config/Hosts';
import axios from 'axios';

const Home = () => {
  const host = Hosts.host;
  const [allData, setAllData] = useState({});

  useEffect(() => {
    axios.get(`${host}/api/admin/getAllDashboardDetails`)
      .then((res) => {
        console.log(res.data);
        setAllData(...res.data); // Removed spread operator here
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ marginLeft: '240px', padding: '20px' ,height:'445px'}}> {/* Adjust margin-left to match sidebar width */}
      <Grid container spacing={3} sx={{ height: 'auto' }}>
        <Grid item xs={12} sm={6} md={12}>
          <Typography variant='h5'>
            Dashboard | <span style={{ fontSize: '19px', color: 'gray' }}>Summary</span>
          </Typography>
        </Grid>

        {/* Total Categories */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', borderRadius: '15px' }}>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1.2rem' }} gutterBottom>Total Categories</Typography>
              <Typography variant="body1" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>{allData.Category}</Typography>
            </Box>
            <CategoryIcon sx={{ fontSize: 50, color: '#3f51b5' }} />
          </Paper>
        </Grid>

        {/* Total Services */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', borderRadius: '15px' }}>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1.2rem' }} gutterBottom>Total Services</Typography>
              <Typography variant="body1" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>{allData.Service}</Typography>
            </Box>
            <CameraAltOutlined sx={{ fontSize: 50, color: '#f50057' }} />
          </Paper>
        </Grid>

        {/* Total Bookings */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', borderRadius: '15px' }}>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1.2rem' }} gutterBottom>Total Bookings</Typography>
              <Typography variant="body1" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>{allData.Booking}</Typography>
            </Box>
            <BookRounded sx={{ fontSize: 50, color: 'orange' }} />
          </Paper>
        </Grid>

        {/* Total Pending Booking Requests */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', borderRadius: '15px' }}>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1.2rem' }} gutterBottom>Pending Service Bookings</Typography>
              <Typography variant="body1" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>{allData.pendingBooking}</Typography>
            </Box>
            <HourglassEmptyIcon sx={{ fontSize: 50, color: '#ffc107' }} />
          </Paper>
        </Grid>

        {/* Total Accepted Booking Requests */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', borderRadius: '15px' }}>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1.2rem' }} gutterBottom>Accepted Service Bookings</Typography>
              <Typography variant="body1" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>{allData.confirmedBooking}</Typography>
            </Box>
            <CheckCircleOutlineIcon sx={{ fontSize: 50, color: '#4caf50' }} />
          </Paper>
        </Grid>

        {/* Total Rejected Booking Requests */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', borderRadius: '15px' }}>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1.2rem' }} gutterBottom>Rejected Service Bookings</Typography>
              <Typography variant="body1" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>{allData.declinedBooking}</Typography>
            </Box>
            <CancelOutlinedIcon sx={{ fontSize: 50, color: '#f44336' }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
