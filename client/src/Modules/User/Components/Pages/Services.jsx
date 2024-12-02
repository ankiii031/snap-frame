import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import flightImg from '../../image/air-plane.png';
import ModeOfTravelOutlinedIcon from '@mui/icons-material/ModeOfTravelOutlined';
import AirlineStopsOutlinedIcon from '@mui/icons-material/AirlineStopsOutlined';
import ServiceCategory from './ServiceCategory';
import Imgg from '../../image/i8.jpg';
import Servicess from './AService';


export default function Services() {
    return (
        <>
            <Grid container spacing={3} sx={{
                pt:{xs:10,md:17}, px: 5, pb: 15, backgroundColor: "#000000",display:{xs:'flex',lg:'flex'},flexDirection:{xs:'column-reverse',lg:'row'}
            }}>
                {/* Content Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            backgroundColor: "#000000",
                            color: 'white',
                            p: 2, // Adjust padding as needed
                            height: '100%', // Ensure content stretches vertically
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant='h1' sx={{ fontSize: {xs:'1.3rem',md:'2.9rem'}, fontWeight: 'bolder' }}>
                            Snap Frame

                        </Typography>
                      
                        <Typography variant='body1' sx={{ mt: 2, fontSize: {xs:'.90rem',md:'1rem'} }}>
                        Choosing Snap Frame Photography means selecting a partner who values your unique story. We are dedicated to capturing moments that resonate, crafting images that evoke emotion and preserve memories for a lifetime. Our personalized approach ensures that we not only meet but exceed your expectations, offering a seamless experience from consultation to final delivery.
                        </Typography>
                    </Box>
                </Grid>

                {/* Image Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src={Imgg} 
                        
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: {xs:'10px',md:'100px'},
                            // border:'2px solid #FAFFAF'
                        }}
                    />
                </Grid>

            </Grid>
            <Servicess />
        </>
    );
}
