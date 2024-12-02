import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import img1 from '../../image/i1.jpg'
import img2 from '../../image/i2.jpg'
import img3 from '../../image/i3.jpg'
import img4 from '../../image/i4.jpg'
import img5 from '../../image/i5.jpg'
import img6 from '../../image/i6.jpg'
import StarIcon from '@mui/icons-material/Star';

function AboutUs() {
    return (
        <Box
            sx={{
                backgroundColor: '#f0f0f0',
                py: 8,
                px: 2,
            }}
        >
            <Container
                sx={{
                    maxWidth: 'lg',
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: 'white',
                    p: 4,
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: '#333',
                        mb: 3,
                        textAlign: 'center',
                    }}
                >
                    Welcome to Snap Frame Photography
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: '1.2rem',
                        fontFamily:'Bahnschrift Condensed',
                        color: '#666',
                        mb: 4,
                        textAlign: 'center',
                    }}
                >
                    Snap Frame Photography specializes in capturing life's most precious moments with creativity and passion. We provide high-quality photography services that tell stories and evoke emotions through every image.
                </Typography>

                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                boxShadow: 2,
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={img3}
                                alt="Portfolio Item 1"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: '1.8rem',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    mb: 3,
                                    textAlign: 'center',
                                }}
                            >
                                Why Choose Us?
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '1.2rem',
                                    color: '#666',
                                    fontFamily:'Bahnschrift Condensed',
                                    textAlign: 'center',
                                }}
                            >
Choosing Snap Frame Photography means selecting a partner who values your unique story. We are dedicated to capturing moments that resonate, crafting images that evoke emotion and preserve memories for a lifetime. Our personalized approach ensures that we not only meet but exceed your expectations, offering a seamless experience from consultation to final delivery.
                            </Typography>

                            <Box sx={{ mt: 6 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.8rem',
                                        fontWeight: 'bold',
                                        color: '#333',
                                        mb: 3,
                                        textAlign: 'center',
                                    }}
                                >
                                    Client Experience
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.2rem',
                                        color: '#666',
                                        textAlign: 'center',
                                        fontFamily:'Bahnschrift Condensed',
                                    }}
                                >
                                    Our dedication to exceptional client experience sets us apart. We prioritize open communication, attention to detail, and flexibility to ensure that every client feels valued and heard throughout their photography journey with us. From initial consultation to final delivery, we strive to exceed expectations and create lasting relationships built on trust, professionalism, and outstanding photography.
                                </Typography>
                            </Box>
                            
                            <Box sx={{ mt: 6 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.8rem',
                                        fontWeight: 'bold',
                                        color: '#333',
                                        mb: 3,
                                        textAlign: 'center',
                                    }}
                                >
                                    Our Approach
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.2rem',
                                        color: '#666',
                                        textAlign: 'center',
                                        fontFamily:'Bahnschrift Condensed',
                                    }}
                                >
                                At Snap Frame Photography, we blend technical expertise with creative vision to produce images that are not only visually stunning but also deeply meaningful. We collaborate closely with our clients to understand their unique stories and preferences, ensuring each photograph reflects their personality and captures the essence of the moment.              </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 6 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '1.8rem',
                            fontWeight: 'bold',
                            color: '#333',
                            mb: 3,
                            textAlign: 'center',
                        }}
                    >
                        Our Specialties
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    textAlign: 'center',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <StarIcon sx={{ fontSize: 60, color: '#f50057', mb: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    Creative Vision
                                </Typography>
                                <Typography variant="body1">
                                    We infuse creativity into every photograph, capturing moments with a unique perspective.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    textAlign: 'center',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <StarIcon sx={{ fontSize: 60, color: '#f50057', mb: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    Personalized Service
                                </Typography>
                                <Typography variant="body1">
                                    Tailored approach to meet your unique needs, ensuring a personalized experience.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    textAlign: 'center',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <StarIcon sx={{ fontSize: 60, color: '#f50057', mb: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    Emotive Storytelling
                                </Typography>
                                <Typography variant="body1">
                                    We capture emotions and narratives through our photographs, telling compelling stories.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mt: 6 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '1.8rem',
                            fontWeight: 'bold',
                            color: '#333',
                            mb: 3,
                            textAlign: 'center',
                        }}
                    >
                        Portfolio Highlights
                    </Typography>
                    <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={img6}
                                    alt="Portfolio Item 1"
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: 2,
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={img4}
                                    alt="Portfolio Item 1"
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: 2,
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={img5}
                                    alt="Portfolio Item 2"
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: 2,
                                    }}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mt: 6 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '1.8rem',
                            fontWeight: 'bold',
                            color: '#333',
                            mb: 3,
                            textAlign: 'center',
                        }}
                    >
                        Contact Us
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '1.2rem',
                            color: '#666',
                            fontFamily:'Bahnschrift Condensed',
                            textAlign: 'center',
                        }}
                    >
                        Ready to capture your special moments? Contact Snap Frame Photography today to discuss your photography needs and schedule a consultation.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default AboutUs;
