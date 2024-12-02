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
import Hosts from '../../../../../config/Hosts';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';



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
export default function UploadPortfolio({token}) {
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
        Data.append('place', portfolioDetails.place);
        Data.append('event_date', portfolioDetails.event_date);
        Data.append('description', portfolioDetails.description);
        // Data.append('images', images);
        images.forEach((image, index) => {
            Data.append(`image`, image);
        });


        axios.post(`${host}/api/admin/uploadPortfolio`, Data)
            .then((res) => {
                console.log(res)

                if (res.data) {
                 
                    setImages([])
                    setPortfolioDetails({})
                    setTimeout(() => {
                        nav('/admin/viewPort');
                    }, 2000)
                    toast.success('Portfolio Added Successfully');

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
          <Box sx={{marginTop:'-80px' ,marginLeft: '240px', padding: '' ,height:'auto'}}>
            <h2 style={{ color: '#212529' }}>Manage Portfolio</h2>
            <Typography variant='body1' gutterBottom>Add Portfolio Details</Typography>

            <Box component={Paper} elevation={0} sx={{
                p: 2, boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.3)', borderRadius: '10px', mb: 3
            }} >
                <Grid container spacing={2} >
                    <Grid item xs={12} md={3}>
                    <TextField
                                required
                                fullWidth
                                id="title"
                                onChange={handleChange}
                                label="Title"
                                name="title"
                                value={portfolioDetails.title || ''}
                                size="small"
                                autoComplete="title"
                            />                    

                            </Grid>
                          
                            <Grid item xs={12} md={3}>
                    <TextField
                                required
                                fullWidth
                                id="place"
                                onChange={handleChange}
                                label="Place"
                                value={portfolioDetails.place || ''}
                                name="place"
                                size="small"
                                autoComplete="place"
                            />                    

                            </Grid>
                            <Grid item xs={12} md={3}>
                    <TextField
                                required
                                fullWidth
                                type="date"
                                id="event_date"
                                onChange={handleChange}
                                name="event_date"
                                size="small"
                                value={portfolioDetails.event_date || ''}
                                autoComplete="event_date"
                                aria-label='Event Date'
                            />                    

                            </Grid>
                   
                    <Grid item xs={12} md={4}>
                       <TextField
                                multiline
                                rows={3}
                                required
                                onChange={handleChange}
                                fullWidth
                                id="description"
                                label="Description"
                                value={portfolioDetails.description || ''}
                                name="description"
                                autoComplete="description"
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
                    <Grid item xs={12} md={1}>
                        <Button variant="contained" fullWidth onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
     

      
            <Toaster position="top-center" reverseOrder={false} />
        </Box>
    )
}
