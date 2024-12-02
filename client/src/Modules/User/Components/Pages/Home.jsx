import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ServiceCategory from './ServiceCategory';
import AboutUs from './AboutUs';
import Carousel from 'react-material-ui-carousel';
// import 'react-material-ui-carousel/lib/styles.css'; // Import carousel styles
import Vdo from '../../image/vdo1.mp4';

// Define your images and host URL for image sources
const images = [
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'image2.jpg',
    'image3.jpg',
];

export default function Home() {
    return (
        <>
            <Grid
                container
                spacing={3}
                sx={{
                    pt: { xs: 6, md: 20 },
                    px: 5,
                    pb: 15,
                    backgroundColor: "#000000",
                    position: 'relative', // Ensure the container can hold absolute positioned carousel
                }}
            >
            

                {/* Image Section */}
                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            position: 'relative',
                            minHeight: '400px', // Adjust minimum height as needed
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1, // Ensure content is above carousel
                        }}
                    >
                        {/* <CameraAltIcon sx={{ fontSize: '180px', color: '#FAFFAF' }} /> */}
                    </Box>
                </Grid>

                {/* Carousel Section (Background) */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0,
                    }}
                >
                  <video
                            autoPlay
                            loop
                            muted
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        >
                            <source src={Vdo} type="video/mp4" />
                        </video>
                </Box>
            </Grid>

            {/* Additional Sections */}
            <ServiceCategory />
            <AboutUs />
        </>
    );
}
