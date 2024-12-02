import React, { useState,useEffect } from 'react'
import moment from 'moment';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography, Paper, Container, Grid, Link, styled, Modal, Button, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#212529',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
export default function ViewPort({token}) {
    const host = Hosts.host;
    const nav=useNavigate();

    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [editingPortfolio, setEditingPortfolio] = useState({}); // State to track editing category
    const [portfolioDetails, setPortfolioDetails] = useState({});
    const [deletedPortfolio, setDeletedPortfolio] = useState(false);
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

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this Portfolio',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${host}/api/admin/deletePortfolio/${id}`)
                    .then((response) => {
                        setDeletedPortfolio(!deletedPortfolio);
                        console.log("Insert Response : " + response.data.cname);
                    })
                    .catch((err) => {
                        console.log("Error : " + err);
                    });
                Swal.fire('Deleted!', 'Portfolio details has been deleted.', 'success');
                setdbPortfolioDetails(dbPortfolioDetails.filter(category => category._id !== id));
            }
        });
    };

    const handleEdit = (id) => {
        nav(`/admin/editPort/${id}`)   
    };



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
        <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
                <Typography variant='h5' gutterBottom sx={{ color: '#212529' }}> Portfolio Details</Typography>
            </Grid>
            
           
            
        </Grid>
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell >Location</StyledTableCell>
                            <StyledTableCell >Event Date</StyledTableCell>
                            <StyledTableCell >Description</StyledTableCell>
                            <StyledTableCell >Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { dbPortfolioDetails.length > 0 ?

                            dbPortfolioDetails?.map((post,index) => (
                                <>
                            <StyledTableRow key={post._id}>
                                <StyledTableCell style={{width:'320px'}} >
                                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper elevation={0.9} sx={{ p: 4, maxWidth: 400, margin: '0 auto', border: '1px solid #e7e7e7',borderRadius:'10px' }}>
                            
                            {post?.image?.length > 0 && (
                                <Carousel>
                                    {post.image.map((url, index) => (
                                        <Box key={index} component="img" src={`${host}/api/image/${url}`} alt={`slide-${index}`} width="100%" height="30vh" sx={{borderRadius:'10px'}}/>
                                    ))}
                                </Carousel>
                            )}
                            
                        </Paper>
                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell >{post?.title}</StyledTableCell>
                                <StyledTableCell >{post?.place}</StyledTableCell>
                                <StyledTableCell >{moment(post.event_date).format('DD/MM/YYYY')}</StyledTableCell>
                                <StyledTableCell >{post?.description}</StyledTableCell>
                             
                                <StyledTableCell >
                                     <IconButton onClick={() => handleEdit(post._id)}>
                                        <EditIcon  color='primary' />
                                    </IconButton> 
                                    <IconButton onClick={() => handleDelete(post._id)}>
                                        <DeleteOutlineIcon color='error' />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                            </>
                        ))
                        :
                        <StyledTableRow>
                        <StyledTableCell colSpan={10}>
                        <p style={{textAlign:'center',color:'red',fontSize:'15px',fontWeight:700}}>No Portfolio Data</p>
                        </StyledTableCell>
                        </StyledTableRow>
                        
                        
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
              {/* Edit Modal */}
              <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ fontWeight: 'bold', color: 'gray' }}>Portfolio Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit Portfolio Details.
                    </DialogContentText>
                    <Grid container spacing={2} sx={{ mt: 2 }}>                    
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
                </DialogContent>
                <DialogActions sx={{ px: 20, py: 2 }}>
                    <Button onClick={handleSubmit} color="primary" fullWidth variant='contained' size='small'>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            <Toaster position="top-center" reverseOrder={false} />

      
                   
    </Box>
    )
}
