import React from 'react';
import { Container, Typography, Box, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: '#000000',
        color: '#fff',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
            Snap Frame Photography specializes in capturing life's most precious moments with creativity and passion. We provide high-quality photography services that tell stories and evoke emotions through every image.            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Our Links
            </Typography>
            <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              Home
            </Link>
            <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              About Us
            </Link>
            <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              Services
            </Link>
            
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="#" color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Contact us at: bookinfo@snapframe.com
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Snap Frame. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
