import React, { useState,useEffect } from 'react'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography, Paper, Container, Grid, Link, styled, Modal, Button, TextField, IconButton } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Hosts from '../../../../config/Hosts';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';


const actions = [
    { icon: <FileCopyIcon />, name: 'Your Uploads' },
    { icon: <SaveIcon />, name: 'Upload a Portfolio' },

];

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 300, md: 700 },
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    overflowY:'auto',
    maxHeight: '80vh',
};
export default function UploadGallery({token}) {
    const host = Hosts.host;
    const nav=useNavigate();

    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [portfolioDetails, setPortfolioDetails] = useState({});
    const [dbPortfolioDetails, setdbPortfolioDetails] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const newImages = Array.from(fileList);
        setImages([...images, ...newImages]);
    };

    console.log(images)

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleChange = (e) => {
        setPortfolioDetails({ ...portfolioDetails, [e.target.name]: e.target.value })
    }

    console.log(portfolioDetails)


    const handleSubmit = () => {
        const Data = new FormData();
        Data.append('title', portfolioDetails.title);
        Data.append('caption', portfolioDetails.caption);
        // Data.append('images', images);
        images.forEach((image, index) => {
            Data.append(`image`, image);
        });

        const tokensss = JSON.parse(localStorage.getItem('userToken'));

        axios.portfolio(`${host}/api/user/uploadPortfolio`, Data, { headers: { 'auth-token': tokensss } })
            .then((res) => {
                console.log(res)

                if (res.data) {
                    handleClose()
                    setImages([])
                    setPortfolioDetails({})
                }
            })
            .catch((err) => {
                console.log(err)
            })



    }


    useEffect(()=>{
        axios.get(`${host}/api/admin/getPortfolio`)
       .then((res) => {
        if(res.data){
            setdbPortfolioDetails(res.data)
            console.log(res.data)
        }
        })
        .catch((err) => {
             console.log(err)
         })

    },[portfolioDetails])
  

    const handleClick = (data) => {
        if (data.name === 'Upload a Portfolio') {
            handleOpen()
        }

        if (data.name === 'Your Uploads') {
            nav('/ownUploads')
        }
    }
    return (
        <Box sx={{ padding: { xs: '10px', sm: '30px', md: '50px' }, backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
    <Box sx={{ ml: { xs: 2, md: 4 }, mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '24px', md: '36px' }, fontWeight: 700, color: '#333333', textAlign: 'center' }}>
            Explore Our Captured Moments
        </Typography>
        <Typography variant='body1' sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#666666', textAlign: 'center', mt: 2 }}>
            Welcome to our gallery of captured moments! Browse through a collection of stunning photographs that showcase the beauty of travel and adventure. Each image tells a unique story, capturing the essence of different landscapes, cultures, and experiences around the world.
        </Typography>
    </Box>
    <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
            {dbPortfolioDetails.map((portfolio, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper elevation={3} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '10px', minHeight: '100%' }}>
                        <Box sx={{ height: '100%' }}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: '18px', fontWeight: 600, color: '#333333' }}>
                                    {portfolio.title}
                                </Typography>
                                {portfolio?.image?.length > 0 && (
                                    <Carousel>
                                        {portfolio.image.map((url, index) => (
                                            <Box key={index} component="img" src={`${host}/api/image/${url}`} alt={`slide-${index}`} width="100%" sx={{ borderRadius: '10px', maxHeight: '300px' }} />
                                        ))}
                                    </Carousel>
                                )}
                                <Box mt={2}>
                                    <Typography variant="body2" sx={{ fontSize: '14px', color: '#666666' }}>
                                        <ReadMore text={portfolio.description} maxLength={120} />
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    </Container>
</Box>

    )
}
