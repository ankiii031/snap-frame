import { Box, TextField, Grid, Typography, IconButton, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Avatar, Container, Card, CardContent, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Hosts from '../../../../../config/Hosts';
import axios from 'axios';
import EditIcon  from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import AddIcon from '@mui/icons-material/Add';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import { Link, useNavigate } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';

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
export default function ViewService() {
    const host = Hosts.host;
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState({});
    const [dbServiceData, setDbServiceData] = useState([]);
    const [image, setImage] = useState({});

    const [searchInput, setSearchInput] = useState(""); // State for search input

    const [dbcategory, setDbCategory] = useState([]);
    const [deletedService, setDeletedService] = useState(false);
    const [updatedService, setUpdatedService] = useState(false);
    const [editingService, setEditingService] = useState({}); // State to track editing category
    const [open, setOpen] = useState(false); // State to handle modal open/close
    const [expand, setExpand] = useState(false); // State to handle modal open/close
    const fileInputRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category


    const toggleExpanded = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleImage = (e) => {
        setImage({ ...image, [e.target.name]: e.target.files[0] });
    };

    console.log(image, 'ddd');

    const handleChange = (e) => {
        setEditingService({ ...editingService, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {

        const Data = new FormData();
        Data.append('sname', editingService.sname);
        Data.append('category', editingService.category._id);
        Data.append('price', editingService.price);
        Data.append('description', editingService.description);
        Data.append('image', image.image);


        axios.put(`${host}/api/service/updateService/${editingService._id}`, Data)
            .then((res) => {
                if (res.data) {
                    console.log('Service Updated Successfully');
                    setUpdatedService(!updatedService);
                    toast.success('Service Details Updated Successfully');
                    handleClose();
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to update Service details');
            });

    };

    useEffect(() => {
        axios.get(`${host}/api/admin/getcategory`)
            .then((res) => {
                if (res.data) {
                    setDbCategory(res.data);
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get(`${host}/api/service/getService`)
            .then((res) => {
                if (res.data) {
                    setDbServiceData(res.data);
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [deletedService, updatedService]);


    console.log(dbServiceData, 'pack')


    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this Service',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${host}/api/service/deleteService/${id}`)
                    .then((response) => {
                        setDeletedService(!deletedService);
                        console.log("Insert Response : " + response.data.cname);
                    })
                    .catch((err) => {
                        console.log("Error : " + err);
                    });
                Swal.fire('Deleted!', 'Service details has been deleted.', 'success');
            }
        });
    };

    const handleEdit = (item) => {
        setEditingService(item);
        setCategoryData({ sname: item.sname,price: item.price,category: item.category,description: item.description});
        setImage({ image: item.image });
        setOpen(true); // Open the modal        
    };

    const handleClose = () => {
        setOpen(false); // Close the modal
        setEditingService(null);
    };


    const filteredServices = selectedCategory
        ? dbServiceData.filter(pkg => pkg.category._id === selectedCategory)
        : dbServiceData;


    return (
        <Box sx={{marginTop:'-80px' ,marginLeft: '240px', padding: '' ,height:'auto'}}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                    <Typography variant='h5' gutterBottom sx={{ color: '#212529' }}> Service Details</Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ mt: 1 ,ml:{xs:1,md:3}}}>
                    <FormControl fullWidth size='small'>
                        <InputLabel>Filter by Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            label="Filter by Category"
                        >
                            <MenuItem value="">
                                <em>All Categories</em>
                            </MenuItem>
                            {dbcategory.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
               
                
            </Grid>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Image</StyledTableCell>
                                <StyledTableCell >Category Name</StyledTableCell>
                                <StyledTableCell >Service Name</StyledTableCell>
                                <StyledTableCell >Price</StyledTableCell>
                                <StyledTableCell >Description</StyledTableCell>
                                <StyledTableCell >Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { filteredServices.length > 0 ?

                                filteredServices?.slice().reverse().map((item) => (
                                    <>
                                <StyledTableRow key={item._id}>
                                    <StyledTableCell >
                                        <img src={`${host}/api/image/${item.image}`} alt="" width={110} height={110} style={{ borderRadius: '10px' }} />
                                    </StyledTableCell>
                                    <StyledTableCell >{item?.category?.title}</StyledTableCell>
                                    <StyledTableCell >{item.sname}</StyledTableCell>
                                    <StyledTableCell >{item.price}</StyledTableCell>
                                    <StyledTableCell >{item.description}</StyledTableCell>
                                    <StyledTableCell >
                                         <IconButton onClick={() => handleEdit(item)}>
                                            <EditIcon  color='primary' />
                                        </IconButton> 
                                        <IconButton onClick={() => handleDelete(item._id)}>
                                            <DeleteOutlineIcon color='error' />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                                </>
                            ))
                            :
                            <StyledTableRow>
                            <StyledTableCell colSpan={10}>
                            <p style={{textAlign:'center',color:'red',fontSize:'15px',fontWeight:700}}>No Service Data</p>
                            </StyledTableCell>
                            </StyledTableRow>
                            
                            
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Edit Modal */}
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ fontWeight: 'bold', color: 'gray' }}>Service Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit Service Details.
                    </DialogContentText>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={6}>
                        <FormControl fullWidth size='small'> 
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={editingService?.category?._id || editingService?.category}
                                fullWidth
                                label="Select Category"
                                name='category'
                                onChange={handleChange}
                            >
                                {dbcategory?.map((i)=>(
                                    
                                    <MenuItem key={i._id} value={i._id}>{i.title}</MenuItem>
                                ))}
                                
                            </Select>
                        </FormControl>                        </Grid>
                        {/* {console.log("editingService",editingService)} */}
                        <Grid item xs={12} md={6}>
                            <TextField variant='outlined' size='small' onChange={handleChange} name='sname' label="Service Name" fullWidth value={editingService?.sname} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField variant='outlined' size='small' onChange={handleChange} name='price' label="Service Price" fullWidth value={editingService?.price} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField type='file' variant='outlined' onChange={handleImage} name='image' size='small' label="Service Image" fullWidth InputLabelProps={{ shrink: 'none' }} inputRef={fileInputRef} />
                        </Grid>
            
                        <Grid item xs={12} md={12}>
                            <TextField multiline rows={3} variant='outlined' onChange={handleChange} name='description' size='small' label="Description..." fullWidth value={editingService?.description} />
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
    );
}
