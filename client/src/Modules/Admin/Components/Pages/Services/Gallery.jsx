import React, { useState,useEffect } from 'react'
import { Box, Typography, Paper, Container, Grid, Link, styled, Modal, Button, TextField, IconButton } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import axios from 'axios';
import Hosts from '../../../../../config/Hosts';




const ReadMore = ({ text, maxLength }) => {
    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    if (text.length <= maxLength) {
        return <Typography variant="body1">{text}</Typography>;
    }

    return (
        <Typography variant="body1">
            {showFullText ? text : `${text.substring(0, maxLength)}... `}
            <Link component="button" variant="body2" onClick={toggleText}>
                {showFullText ? 'Read Less' : 'Read More'}
            </Link>
        </Typography>
    );

};

const StyledTypography = styled(Typography)(({ theme }) => ({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    height: theme.spacing(6), // Adjust this value based on your design needs
    '&:hover': {
        overflow: 'visible',
        whiteSpace: 'normal',
        height: 'auto',
        zIndex: 9999,
        position: 'relative',
        maxWidth: '100%',
        width: 'auto',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Gallery() {
    const host = Hosts.host;

    const [dbPortfolioDetails, setdbPortfolioDetails] = useState([]);


    useEffect(()=>{
        axios.get(`${host}/api/user/getPortfolio`)
       .then((res) => {
        if(res.data){
            setdbPortfolioDetails(res.data)
            console.log(res.data)
        }
        })
        .catch((err) => {
             console.log(err)
         })

    },[])


    return (
        <div>

<Box sx={{ ml: 4, mt: 2, }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '25px', fontWeight: 600, color: '#212529' }}>
                    All users travel memories
                </Typography>
                {/* <Typography variant='body1'>
                    Upload your travel memories and share your experience here.
                </Typography> */}
            </Box>
            <Container sx={{ py: 4 }}>
                <Grid container spacing={2}>
                    {dbPortfolioDetails.map((portfolio, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper elevation={0.9} sx={{ p: 4, maxWidth: 400, margin: '0 auto', border: '1px solid #e7e7e7', borderRadius: '10px' }}>
                                <StyledTypography variant="body1" gutterBottom sx={{ fontSize: '16px', color: '#000000' }}>
                                    {portfolio.title}
                                </StyledTypography>
                                {portfolio.image.length > 0 && (
                                    <Carousel>
                                        {portfolio.image.map((url, index) => (
                                            <Box key={index} component="img" src={`${host}/api/image/${url}`} alt={`slide-${index}`} width="100%" height="30vh" sx={{ borderRadius: '10px' }} />
                                        ))}
                                    </Carousel>
                                )}
                                <Box mt={2}>
                                    <ReadMore text={portfolio.caption} maxLength={70} />
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}
