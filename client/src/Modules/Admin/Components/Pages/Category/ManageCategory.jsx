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

export default function ManageCategory() {
    const host = Hosts.host;
    const [isAlive, setIsAlive] = useState(true);
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
                setDbCategory(dbcategory.filter(category => category._id !== id));
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
        <Box sx={{marginTop:'-140px' ,marginLeft: '240px', padding: '' ,height:'645px'}}>
<br />
<br />
            <Typography variant='body1' gutterBottom>View Category Details</Typography>
            <br />
            <br />
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Category Image</StyledTableCell>
                                <StyledTableCell >Category Title</StyledTableCell>
                                <StyledTableCell >Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dbcategory.map((row) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell >
                                        <img src={`http://localhost:5000/api/image/${row?.image}`} alt="" width={110} height={110} style={{ borderRadius: '10px' }} />
                                    </StyledTableCell>
                                    <StyledTableCell >{row.title}</StyledTableCell>
                                    <StyledTableCell >
                                        <IconButton onClick={() => handleEdit(row)}>
                                            <EditIcon  color='primary' />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(row._id)}>
                                            <DeleteOutlineIcon color='error' />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Edit Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontWeight: 'bold', color: 'gray' }}>Edit Category</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Please edit the details of the category.
                    </DialogContentText>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={6}>
                            <TextField variant='outlined' size='small' onChange={handleChange} name='title' label="Category Title" fullWidth value={categoryData.title} />
                        </Grid>
                       
                        <Grid item xs={12} md={12}>
                            <TextField type='file' variant='outlined' onChange={handleImage} name='image' size='small' label="Category Image" fullWidth InputLabelProps={{ shrink: 'none' }} inputRef={fileInputRef} />
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
