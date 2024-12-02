import { Box, TextField, Grid, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Chip } from '@mui/material'
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
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import moment from 'moment';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


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

export default function RejectedRequest() {
    const host = Hosts.host;
    const [categoryData, setCategoryData] = useState({ title: '', subtitle: '' });
    const [bookingDetails, setBookingDetails] = useState([]);
    const [updateRequested, setUpdateRequested] = useState(false);



    useEffect(() => {
        axios.get(`${host}/api/user/getAllBookingDetails`)
            .then((res) => {
                if (res.data) {
                    const pendingData = res.data.filter((i) => i.status == 'declined')
                    setBookingDetails(pendingData);
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [updateRequested]);



    const handleRequest = (id,status) => {

        axios.put(`${host}/api/admin/updateRequest/${id}`, { status: status })
            .then((res) => {
                if (res.data.status == 'confirmed') {

                    toast.success('Booking Request Accepted');
                    setUpdateRequested(!updateRequested)
                }else{
                    toast.success('Booking Request Rejected');
                    setUpdateRequested(!updateRequested)
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to accept booking request');
            });

    }




    return (
        <Box sx={{marginTop:'-80px' ,marginLeft: '240px', padding: '' ,height:'auto'}}>
            {bookingDetails.length > 0 &&

                <h2 style={{ color: '#212529' }}>All Declined Booking Request</h2>
            }
            {/* <Typography variant='body1' gutterBottom>Insert Category Details</Typography> */}


            <Box>
                {bookingDetails.length > 0 ?

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>User Info</StyledTableCell>
                                    <StyledTableCell >Service Details</StyledTableCell>
                                    <StyledTableCell >Message</StyledTableCell>
                                    <StyledTableCell >Shoot Date</StyledTableCell>
                                    <StyledTableCell >Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>


                                {bookingDetails.slice().reverse().map((row) => (
                                    <StyledTableRow key={row._id}>
                                        <StyledTableCell >
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', gap: '2px' }} ><span><PersonOutlineOutlinedIcon sx={{ fontSize: '20px' }} /></span> <span>{row?.name}</span></Typography>
                                                <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', gap: '2px' }} ><span><LocalPhoneOutlinedIcon sx={{ fontSize: '20px' }} /></span> <span>{row?.phone}</span></Typography>
                                                <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', gap: '2px' }} ><span><EmailOutlinedIcon sx={{ fontSize: '20px' }} /></span> <span>{row?.email}</span></Typography>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell >
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', gap: '2px' }} >{row?.s_id.sname}</Typography>
                                                <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', gap: '2px' }} >{row?.s_id.category.title}</Typography>
                                                {/* <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', gap: '2px' }} >{row?.s_id.duration}</Typography> */}
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell >
                                            <Box sx={{ width: '300px', maxHeight: '160px', overflowY: 'auto' }}>
                                                {row.message}
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell >
                                            {moment(row.departureDate).format("MMM Do YYYY")}
                                        </StyledTableCell>
                                        <StyledTableCell >
                                        <Chip icon={<CheckCircleOutlineOutlinedIcon />} label="Declined" color='error'/>

                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))



                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <Box sx={{ display: 'flex', justifyContent: 'center', height: '50vh', mt: 13 }}>

                        <Grid item xs={12} lg={12} justifyContent="center" alignItems="center">
                            <FollowTheSignsIcon sx={{ fontSize: '150px', color: 'gray' }} />
                            <Typography variant='body1' gutterBottom sx={{ color: 'blue' }}>No Declined Request Found!</Typography>
                        </Grid>
                    </Box>
                }
            </Box>


            <Toaster position="top-center" reverseOrder={false} />
        </Box>
    )
}
