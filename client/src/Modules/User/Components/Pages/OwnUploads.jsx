import React, { useState, useEffect } from 'react'
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
import CollectionsIcon from '@mui/icons-material/Collections';



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
    overflowY: 'auto',
    maxHeight: '80vh',
};
export default function OwnUploads() {
    const host = Hosts.host;
    const tokensss = JSON.parse(localStorage.getItem('userToken'));

    const [open, setOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);
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


    useEffect(() => {
        axios.get(`${host}/api/user/getUserPortfolio`, { headers: { 'auth-token': tokensss } })
            .then((res) => {
                if (res.data) {
                    setdbPortfolioDetails(res.data)
                    console.log(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }, [portfolioDetails,deleted])


    const handleClick = (data) => {
        if (data.name === 'Upload a Portfolio') {
            handleOpen()
        }

        if (data.name === 'Your Uploads') {

        }
    }


    const handleDeletePortfolio = (id) => {
        axios.delete(`${host}/api/user/deletePortfolio/${id}`, { headers: { 'auth-token': tokensss } })
            .then((res) => {
                if (res.data) {
                    console.log(res)
                    setDeleted(!deleted)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Box sx={{ padding: { xs: '10px', sm: '70px', md: '50px' }, backgroundColor: '#fef9f4' }}>

            <Box sx={{ ml: 4, mt: 2, }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '25px', fontWeight: 600, color: '#000000' }}>
                    Your Shared Travel Memories
                </Typography>
                <Typography variant='body1'>
                    View all your uploaded portfolio here.
                </Typography>
            </Box>
            <Container sx={{ py: 4 }}>
                <Grid container spacing={2}>
                    {
                        dbPortfolioDetails.length > 0 ?
                            dbPortfolioDetails.map((portfolio, index) => (
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
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                                <IconButton onClick={() => handleDeletePortfolio(portfolio._id)}>
                                                    <DeleteIcon sx={{ color: 'red' }} />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))
                            :
                            <Grid item xs={12} sm={6} md={12} >

                                <Box sx={{ textAlign: 'center', marginTop: '50px', height: '100vh' }}>
                                    <Typography variant="h6" gutterBottom>
                                        No Portfolio Found!
                                    </Typography>
                                    <CollectionsIcon sx={{ fontSize: '90px', color: '#000000' }} />
                                    <Typography variant="body1">
                                        You have not uploaded any portfolio yet. Upload some memories to share with others.
                                    </Typography>

                                </Box>
                            </Grid>
                    }
                </Grid>
            </Container>
            {/* <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}> */}
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}

            >
                {actions.map((action) => (
                    <SpeedDialAction
                        onClick={() => handleClick(action)}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
            {/* </Box> */}


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                        Upload a Portfolio
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <TextField
                                required
                                fullWidth
                                id="title"
                                onChange={handleChange}
                                label="Title"
                                name="title"
                                size="small"
                                autoComplete="title"
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <TextField
                                multiline
                                rows={3}
                                required
                                onChange={handleChange}
                                fullWidth
                                id="caption"
                                label="Caption"
                                name="caption"
                                autoComplete="caption"
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <input
                                accept="image/*"
                                type="file"
                                id="upload"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="upload">
                                <Button variant="outlined" component="span" size="small">
                                    Upload Images
                                </Button>
                            </label>
                            {images.length > 0 && (
                                <div style={{ marginTop: '10px' }}>
                                    {images.map((image, index) => (
                                        <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="body1" style={{ marginRight: '10px' }}>{image.name}</Typography>
                                            <IconButton
                                                aria-label="delete"
                                                size="small"
                                                onClick={() => handleRemoveImage(index)}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                <DeleteIcon fontSize="small" color='error' />
                                            </IconButton>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <Button variant='outlined' startIcon={<SendIcon />} onClick={handleSubmit}>Upload</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
    )
}
