import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Grid, Chip, Modal, TextField } from '@mui/material';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Hosts from '../../../../config/Hosts';
import axios from 'axios';
import moment from 'moment';
import QrCode from '../../image/qrcode.png'
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import toast, { Toaster } from 'react-hot-toast';


const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 580,
    bgcolor: '#f6f5f3',
    //   border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const MyBooking = () => {


    const host = Hosts.host;
    const [bookingData, setBookingData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [payment, setPayment] = useState({});
    const [paymentStatus, setPaymentStatus] = useState(false);

    const handleOpen = (data) => {
        setOpen(true)
        setSelected(data)
    }

    console.log(selected, 909)
    const handleClose = () => setOpen(false);


    useEffect(() => {
        const tokensss = JSON.parse(localStorage.getItem('userToken'));

        axios.get(`${host}/api/user/getBookingDetails`, { headers: { 'auth-token': tokensss } })
            .then((res) => {
                if (res.data) {
                    setBookingData(res.data);
                    console.log("oakyyy",res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [paymentStatus]);



    const handlePayChange = (e) => {
        setPayment({ [e.target.name]: e.target.value });

        // setMenuForm({ ...menuForm, paid_amount: totalMenuPrice, [e.target.name]: e.target.value });
    }


    const handlePay = () => {
        const tokensss = JSON.parse(localStorage.getItem('userToken'));
        axios.put(`${host}/api/user/bookingPayment/${selected?._id}`, payment, { headers: { 'auth-token': tokensss } })
            .then((res) => {
                if (res.data) {
                    console.log('Payment Done Successfully');
                    setPaymentStatus(!paymentStatus)
                    setOpen(false)
                    setSelected(null)
                    toast.success('Payment Done Successfully');
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to make payment');
            });

    }

    return (
        <Box sx={{ minHeight: '100vh', p: { xs: 3, sm: 3, md: 10 } }}>
            <Paper elevation={0} sx={{ p: 3, pl: { xs: 0, md: 20 }, mx: 'auto', backgroundColor: '#a9ff0036', color: 'black', border: '1px solid #e7e7e7' }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#000000', fontSize: { xs: '20px', md: '22px' }, fontWeight: 700 }}>
                    Booking Status
                </Typography>
                <Typography gutterBottom>
                    Check all your booking request and status here.
                </Typography>


                {
                    bookingData.length > 0 ?
                        bookingData
                            ?.map((item, index) => ({ ...item, originalIndex: index }))  // Step 1
                            .slice().reverse()  // Step 2
                            .map((item, index) => (
                                <Box sx={{ my: 2, borderBottom: '1px solid #ccc', pb: 2, mt: 5 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={8}>
                                            <Box sx={{ pb: 2 }}>
                                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#000000', fontSize: { xs: '18px', md: '17px' } }}>* Service Booking {item.originalIndex + 1}
                                                </Typography>
                                                <Typography variant="h6" gutterBottom sx={{ fontSize: '15px', fontWeight: 600 }}>Client Information</Typography>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}><Typography variant='body1'>Full Name</Typography></Grid>
                                                    <Grid item xs={6}><Typography variant='body1' sx={{ color: 'grey' }}>{item.name} </Typography></Grid>
                                                    <Grid item xs={6}><Typography variant='body1'>Phone Number</Typography></Grid>
                                                    <Grid item xs={6}><Typography variant='body1' sx={{ color: 'grey' }}>{item.phone}</Typography></Grid>
                                                    <Grid item xs={6}><Typography variant='body1'>Email Address</Typography></Grid>
                                                    <Grid item xs={6}><Typography variant='body1' sx={{ color: 'grey' }}>{item.email}</Typography></Grid>

                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={4} sx={{ mt: { xs: 0, md: 7 } }}>
                                            <Box sx={{ borderRadius: 2, p: 2 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>Booking Status</Typography>
                                                {item.status == 'pending' &&
                                                    <Chip icon={<PendingOutlinedIcon />} label="Pending" size='small' color='warning' />
                                                }
                                                {item.status == 'confirmed' &&
                                                    <Chip icon={<CheckCircleOutlineOutlinedIcon />} label="Confirmed" size='small' color='success' />
                                                }
                                                {item.status == 'declined' &&
                                                    <Chip icon={<CancelOutlinedIcon />} label="Declined" size='small' color='error' />
                                                }



                                            </Box>
                                            {(item.paymentStatus == 'pending' && item.status == 'confirmed') &&
                                                <Button variant='outlined' onClick={() => handleOpen(item)} size='small' sx={{ fontSize: '12px', ml: 2, mt: -2 }} startIcon={<CurrencyRupeeIcon size="small" />}>Pay</Button>
                                            }
                                            {item.paymentStatus == 'paid' &&
                                                <Chip icon={<CheckCircleOutlineOutlinedIcon />} sx={{ fontSize: '12px', ml: 2, mt: -2 }} label="Paid" size='small' color='success' />

                                            }

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <Box sx={{ border: '1px solid #4a148c', borderRadius: 2, p: 2 }}>
                                                <Typography variant="body2">Shoot Date :</Typography>
                                                <Typography variant="body2" sx={{ color: 'grey' }}>{moment(item.b_date).format("MMM Do YYYY")}</Typography>
                                                <Typography variant="body2">Booking Date :</Typography>
                                                <Typography variant="body2" sx={{ color: 'grey' }}>{moment(item.createdAt).format("MMM Do YYYY")}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ border: '1px solid #4a148c', borderRadius: 2, p: 2 }}>
                                                <Typography variant="body2">Booked Service Information</Typography>
                                                <Typography variant="body2" sx={{ color: 'grey' }}>{item.s_id.sname}</Typography>
                                                <Typography variant="body2" >Message</Typography>
                                                <Typography variant="body2" sx={{ color: 'grey' }}>{item.message}</Typography>

                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))
                        :


                        <Grid item xs={12} sm={6} md={12} >

                            <Box sx={{ textAlign: 'center', marginTop: '50px', height: '100vh' }}>
                                <Typography variant="h6" gutterBottom>
                                    No Service Booking Found!
                                </Typography>
                                <BookOutlinedIcon sx={{ fontSize: '90px', color: '#000000' }} />
                                <Typography variant="body1">
                                    You have not booked any of the snap frame service.
                                </Typography>

                            </Box>
                        </Grid>

                }





                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style2}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' } }} >
                            {/* <PaymentIcon sx={{fontSize:'28px'}}/> */}

                            <Typography gutterBottom sx={{ fontSize: '1.6rem', color: '#000000', fontWeight: '900', marginTop: '-10px', marginBottom: '-4px' }}>Payment</Typography>
                        </Box>
                        <Typography gutterBottom sx={{ textAlign: { xs: 'center', md: 'start' } }}>Scan and Pay</Typography>
                        <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center' } }}>
                            <Box>
                                <img src={QrCode} alt="" width={200} height={200} />
                            </Box>
                            <Box sx={{ marginTop: '-15px' }}>
                                <p style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '-12px' }}>Service : {selected?.s_id?.sname}</p>
                                <p style={{ fontSize: '1.1rem', fontWeight: '500', }}>Total Amount : ₹ {selected?.s_id?.price} /-</p>
                                <TextField id="outlined-basic" name='transactionid' onChange={(e) => handlePayChange(e, selected?.s_id._id)} label="Transaction Id" variant="outlined" size='small' fullWidth sx={{ marginBottom: '10px' }} />
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Chip label="Submit" onClick={handlePay} sx={{ borderRadius: '8px', fontWeight: '900', color: '#000000', width: '200px' }} />

                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Modal>




            </Paper>

            <Toaster position="top-center" reverseOrder={false} />

        </Box>
    );
};

export default MyBooking;
