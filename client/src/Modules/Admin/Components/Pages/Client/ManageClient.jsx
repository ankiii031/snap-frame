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

export default function ManageClient() {
    const host = Hosts.host;
    const [clientData, setClientData] = useState({ title: '', subtitle: '' });
    const [dbclient, setDbClient] = useState([]);
    const [deletedClient, setDeleteClient] = useState(false);
    const [open, setOpen] = useState(false); // State to handle modal open/close
    const fileInputRef = useRef(null);




    useEffect(() => {
        axios.get(`${host}/api/user/get-user`)
            .then((res) => {
                if (res.data) {
                    setDbClient(res.data);
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [deletedClient]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this client',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${host}/api/user/deleteUser/${id}`)
                    .then((response) => {
                        setDeleteClient(!deletedClient);
                        console.log("Insert Response : " + response.data.cname);
                    })
                    .catch((err) => {
                        console.log("Error : " + err);
                    })
                Swal.fire('Deleted!', 'Client has been deleted successfully.', 'success');
                setDbClient(dbclient.filter(client => client._id !== id));

            }
        });
    };

  
    const handleClose = () => {
        setOpen(false); // Close the modal
       
    };

    return (
        <Box sx={{marginTop:'-80px' ,marginLeft: '240px', padding: '' ,height:'auto'}}>
            <h2 style={{ color: '#212529' }}>Manage Client</h2>

    
            <Typography variant='body1' gutterBottom>View Client Details</Typography>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell >Email</StyledTableCell>
                                <StyledTableCell >Phone</StyledTableCell>
                                <StyledTableCell >Address</StyledTableCell>
                                <StyledTableCell >Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dbclient.map((row) => (
                                <StyledTableRow key={row._id}>
                                    
                                    <StyledTableCell >{row.name}</StyledTableCell>
                                    <StyledTableCell >{row.email}</StyledTableCell>
                                    <StyledTableCell >{row.ph_no}</StyledTableCell>
                                    <StyledTableCell >{row.address}</StyledTableCell>
                                    <StyledTableCell >
                                      
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
            <Toaster position="top-center" reverseOrder={false} />
        </Box>
    )
}
