import { Box, TextField, Grid, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles';
import React, { useState, useEffect, useRef } from 'react'
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Hosts from '../../../../../config/Hosts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon  from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

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

export default function AddCategory() {
    const host = Hosts.host;
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState({ title: '' });
    const [dbcategory, setDbCategory] = useState([]);
    const [image, setImage] = useState('');
    const [deletedCategory, setDeleteCategory] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null); // State to track editing category
    const [open, setOpen] = useState(false); // State to handle modal open/close
    const fileInputRef = useRef(null);

    const handleImage = (e) => {
        setImage({ ...image, [e.target.name]: e.target.files[0] });
    };

    console.log(image, 'ddd')

    const handleChange = (e) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
        const Data = new FormData();
        Data.append('title', categoryData.title);
        Data.append('image', image.image);

        if (editingCategory) {
            // Update category
            axios.put(`${host}/api/admin/updateCategory/${editingCategory._id}`, Data)
                .then((res) => {
                    if (res.data) {
                        console.log('Category Updated Successfully');
                        setCategoryData({ title: '' });
                        setImage('');
                        setEditingCategory(null);
                        fileInputRef.current.value = '';
                        setDeleteCategory(!deletedCategory);
                        toast.success('Category Updated Successfully');
                        handleClose();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Failed to update category');
                });
        } else {
            // Add new category
            axios.post(`${host}/api/admin/insertcategory`, Data)
                .then((res) => {
                    if (res.data) {
                        console.log('Category Added Successfully');
                        setCategoryData({ title: '' });
                        setImage('');
                        fileInputRef.current.value = '';
                        setDeleteCategory(!deletedCategory);
                        setTimeout(() => {
                            navigate('/admin/category');
                        }, 2000)
                        toast.success('Category Added Successfully');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Failed to add category');
                });
        }
    }

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
    }, [deletedCategory]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this category',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${host}/api/admin/deleteCategory/${id}`)
                    .then((response) => {
                        setDeleteCategory(!deletedCategory);
                        console.log("Insert Response : " + response.data.cname);
                    })
                    .catch((err) => {
                        console.log("Error : " + err);
                    })
                Swal.fire('Deleted!', 'Category has been deleted.', 'success');
            }
        });
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setCategoryData({ title: category.title});
        setImage({ image: category.image });
        setOpen(true); // Open the modal
    };

    const handleClose = () => {
        setOpen(false); // Close the modal
        setEditingCategory(null);
        setCategoryData({ title: ''});
        setImage('');
    };

    return (
<Box sx={{marginTop:'-80px' ,marginLeft: '240px', padding: '' ,height:'500px'}}>
            <h2 style={{ color: '#212529' }}>Manage Categories</h2>
            <Typography variant='body1' gutterBottom>Add Category Details</Typography>

            <Box component={Paper} elevation={0}  style={{width:'400px'}} sx={{
                p: 2, boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.3)', borderRadius: '10px', mb: 3
            }} >
                <Grid  spacing={2} style={{width:'auto'}}>
                    <Grid item xs={12} md={3}>
                        <TextField variant='outlined' size='small' onChange={handleChange} name='title' label="Category Title" fullWidth sx={{ borderRadius: '20px' }} value={categoryData.title} />
                    </Grid>
                   <br />
                    <Grid item xs={12} md={4}>
                        <TextField type='file' variant='outlined' onChange={handleImage} name='image' size='small' label="Category Image" fullWidth InputLabelProps={{ shrink: 'none' }} inputRef={fileInputRef}
                        />
                    </Grid>
                    <br />
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
