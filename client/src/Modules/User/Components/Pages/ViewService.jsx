import React, { useState, useEffect } from 'react'
import { Box, TextField, Button, Grid, Typography, Chip, Card, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import axios from 'axios';
import Hosts from '../../../../config/Hosts';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Divider from '@mui/material/Divider';
import { useNavigate, useParams, Link } from 'react-router-dom';
import tigerImg from '../../image//tiger2.png';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import Swal from 'sweetalert2';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { CameraAltOutlined } from '@mui/icons-material';



export default function ViewService({ token }) {
    const host = Hosts.host;
    const navigate = useNavigate();
    const { id } = useParams();
    const [dbServiceData, setDbServiceData] = useState({});
    const [dbcategory, setDbCategory] = useState([]);
    const [feedbackList, setFeedbackList] = useState([]);
    const [bookmarked, setBookmarked] = useState(false);
    const [bookmarkedStatus, setBookmarkedStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [feedback, setFeedback] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [feedbackFormErrors, setfeedbackFormErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [bookingRequest, setBookingRequest] = useState({
        name: '',
        email: '',
        phone: '',
        'shootDate': '',
        message: ''
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        phone: '',
        'shootDate': '',
        message: ''
    });


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
        axios.get(`${host}/api/user/getAllFeedback`)
            .then((res) => {
                if (res.data) {
                    setFeedbackList(res.data);
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get(`${host}/api/service/getSingleService/${id}`)
            .then((res) => {
                if (res.data) {
                    setDbServiceData(res.data);
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [bookmarkedStatus]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingRequest({ ...bookingRequest, [name]: value, serviceId: dbServiceData._id });

        // Validate the field and clear the error if valid
        switch (name) {
            case 'name':
                if (!value) {
                    setFormErrors((prevErrors) => ({ ...prevErrors, name: 'Full Name is required' }));
                } else {
                    setFormErrors((prevErrors) => ({ ...prevErrors, name: '' }));
                }
                break;
            case 'email':
                if (!value) {
                    setFormErrors((prevErrors) => ({ ...prevErrors, email: 'Email Address is required' }));
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    setFormErrors((prevErrors) => ({ ...prevErrors, email: 'Email Address is invalid' }));
                } else {
                    setFormErrors((prevErrors) => ({ ...prevErrors, email: '' }));
                }
                break;
            case 'phone':
                if (!value) {
                    setFormErrors((prevErrors) => ({ ...prevErrors, phone: 'Phone Number is required' }));
                } else if (!/^\d{10}$/.test(value)) {
                    setFormErrors((prevErrors) => ({ ...prevErrors, phone: 'Phone Number is invalid' }));
                } else {
                    setFormErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
                }
                break;
            case 'shootDate':
                if (!value) {
                    setFormErrors((prevErrors) => ({ ...prevErrors, 'shootDate': 'Shoot Date is required' }));
                } else {
                    setFormErrors((prevErrors) => ({ ...prevErrors, 'shootDate': '' }));
                }
                break;
            case 'message':
                if (!value) {
                    setFormErrors((prevErrors) => ({ ...prevErrors, message: 'Message is required' }));
                } else {
                    setFormErrors((prevErrors) => ({ ...prevErrors, message: '' }));
                }
                break;
            default:
                break;
        }
    };
    const handleFeedback = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value, serviceId: dbServiceData._id });

        // Validate the field and clear the error if valid
        switch (name) {
            case 'name':
                if (!value) {
                    setfeedbackFormErrors((prevErrors) => ({ ...prevErrors, name: 'Full Name is required' }));
                } else {
                    setfeedbackFormErrors((prevErrors) => ({ ...prevErrors, name: '' }));
                }
                break;
            case 'email':
                if (!value) {
                    setfeedbackFormErrors((prevErrors) => ({ ...prevErrors, email: 'Email Address is required' }));
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    setfeedbackFormErrors((prevErrors) => ({ ...prevErrors, email: 'Email Address is invalid' }));
                } else {
                    setfeedbackFormErrors((prevErrors) => ({ ...prevErrors, email: '' }));
                }
                break;

            case 'message':
                if (!value) {
                    setfeedbackFormErrors((prevErrors) => ({ ...prevErrors, message: 'Message is required' }));
                } else {
                    setfeedbackFormErrors((prevErrors) => ({ ...prevErrors, message: '' }));
                }
                break;
            default:
                break;
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const tokensss = JSON.parse(localStorage.getItem('userToken'));

            axios.post(`${host}/api/user/booking`, bookingRequest, { headers: { 'auth-token': tokensss } })
                .then((response) => {
                    console.log("Booking Request Submitted:", response.data);
                    // navigate('/booking/success');
                    if (response.data) {
                        Swal.fire({
                            title: "Booking Request Submitted",
                            text: "Thank you for your time,we will get back soon.",
                            icon: "success",
                            showCancelButton: true,
                            confirmButtonText: "OK",
                            cancelButtonText: "Status"
                        }).then((result) => {
                            // Check if the user clicked the "Status" button
                            if (result.dismiss === Swal.DismissReason.cancel) {
                                // Redirect to another status page
                                navigate('/myBooking');
                            }
                        });
                        setBookingRequest({
                            name: '',
                            email: '',
                            phone: '',
                            'shootDate': '',
                            message: ''
                        })
                        setOpen(false);
                    } else {
                        console.log("Some error occurred");
                    }
                })
                .catch((error) => {
                    console.error("Error submitting booking request:", error);
                });
        } else {
            console.log('Form has errors');
        }
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (feebackValidate()) {
            const tokensss = JSON.parse(localStorage.getItem('userToken'));

            axios.post(`${host}/api/user/feedback`, feedback, { headers: { 'auth-token': tokensss } })
                .then((response) => {
                    console.log(" Feedback:", response.data);
                    // navigate('/booking/success');
                    if (response.data) {
                        Swal.fire({
                            title: "Your Feedback has been Sent",
                            text: "Thank You For Your Response.",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonText: "OK",
                        })
                        setFeedback({
                            name: '',
                            email: '',
                            message: ''
                        })
                        // setOpen(false);
                    } else {
                        console.log("Some error occurred");
                    }
                })
                .catch((error) => {
                    console.error("Error submitting feedback:", error);
                });
        } else {
            console.log('Form has errors');
        }
    };

    const validate = () => {
        let isValid = true;
        const errors = {};

        if (!bookingRequest.name) {
            isValid = false;
            errors.name = 'Full Name is required';
        }

        if (!bookingRequest.email) {
            isValid = false;
            errors.email = 'Email Address is required';
        } else if (!/\S+@\S+\.\S+/.test(bookingRequest.email)) {
            isValid = false;
            errors.email = 'Email Address is invalid';
        }

        if (!bookingRequest.phone) {
            isValid = false;
            errors.phone = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(bookingRequest.phone)) {
            isValid = false;
            errors.phone = 'Phone Number is invalid';
        }

        if (!bookingRequest['shootDate']) {
            isValid = false;
            errors['shootDate'] = 'Shoot Date is required';
        }

        if (!bookingRequest.message) {
            isValid = false;
            errors.message = 'Message is required';
        }

        setFormErrors(errors);
        return isValid;
    };

    const feebackValidate = () => {
        let isValid = true;
        const errors = {};


        if (!feedback.name) {
            isValid = false;
            errors.name = 'Full Name is required';
        }

        if (!feedback.email) {
            isValid = false;
            errors.email = 'Email Address is required';
        } else if (!/\S+@\S+\.\S+/.test(feedback.email)) {
            isValid = false;
            errors.email = 'Email Address is invalid';
        }
        if (!feedback.message) {
            isValid = false;
            errors.message = 'Message is required';
        }

        setfeedbackFormErrors(errors);
        return isValid;
    };


    const handleBookmark = (id) => {
        const tokensss = JSON.parse(localStorage.getItem('userToken'));
        axios.post(`${host}/api/user/bookmark`, { serviceId: id }, { headers: { 'auth-token': tokensss } })
            .then((response) => {
                console.log("Bookmark Added:", response.data);
                if (response.data) {
                    setBookmarkedStatus(!bookmarkedStatus)
                    Swal.fire({
                        title: "Bookmark Added",
                        text: "You have successfully added this service to your bookmark list.",
                        icon: "success",
                        showConfirmButton: true,
                        confirmButtonText: "OK"
                    });
                } else {
                    console.log("Some error occurred");
                }
            })
            .catch((error) => {
                console.error("Error adding bookmark:", error);
            });
    }


    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const tokensss = JSON.parse(localStorage.getItem('userToken'));
                if (tokensss) {
                    const res = await axios.get(`${host}/api/user/getBookmark`, { headers: { 'auth-token': tokensss } });
                    if (res.data) {
                        const isBookmarked = res.data.some(i => i.service_id._id == id);
                        setBookmarked(isBookmarked);
                    } else {
                        setBookmarked(false);
                    }
                } else {
                    setBookmarked(false);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchBookmarks();
    }, [bookmarkedStatus]);

    console.log(bookmarked, 'bbb')
    return (
        <div>

            <Grid xs={12} sm={6} md={8} lg={12} key={dbServiceData.id} sx={{ px: 3, pt: 10 }}>
                <Card sx={{ m: 'auto', borderRadius: '1px', backgroundColor: '#fef9f4', }} elevation={0}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid dbServiceData xs={12} sm={6}>
                                <img
                                    src={`${host}/api/image/${dbServiceData.image}`}
                                    alt=""
                                    style={{ width: '100%', height: '300px', borderRadius: '1px' }}
                                />
                               
                            </Grid>
                            <Grid dbServiceData xs={12} sm={6} sx={{ p: 3 }}>
                                <div>
                                    <Typography variant='h6' sx={{ fontSize: '26px', fontWeight: 700, color: '#3b404b' }}>{dbServiceData.title}</Typography>
                                    <Typography variant='h6' sx={{ fontSize: '15px', fontWeight: 700, color: '#000000' }}>{dbServiceData.duration}</Typography>
                                    {/* <Chip label={dbServiceData.category.title} /> */}
                                    <Divider orientation="horizontal" flexItem sx={{ mt: 3, mb: 2, borderWidth: '1.4px' }} />

                                    <Typography variant='h6' sx={{ fontSize: '20px', fontWeight: 700, color: '#3b404b' }}>Details</Typography>

                                    <Grid container spacing={2} sx={{ mt: 1 }}>
                                        {dbServiceData?.ServiceIncludes?.map((i) => (
                                            <Grid item md={3}>
                                                <img src={`${host}/api/image/${i.image}`} alt="" style={{ width: '100px', height: '70px' }} />
                                                <Typography variant='h6' sx={{ fontSize: '12px', color: '#3b404b', fontWeight: 700 }} >{i.sname}</Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
    
                                    <Box sx={{ display: '', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant='body1' sx={{ textTransform: 'capitalize', color: 'black' }}>Service Price</Typography>
                                            <Typography variant='body1' sx={{ textTransform: 'uppercase', color: 'green' }}>₹ {dbServiceData.price}</Typography>
                                        </Box><br />
                                        <Box sx={{ backgroundColor: '#fef9f4', p: 3, border: '1px solid #e7e7e7', borderRadius: '5px' }}>
                            <Typography variant='h6' sx={{ fontSize: '19px', fontWeight: 700, color: '#3b404b' }}>Description</Typography>
                            <Typography variant='body1' sx={{ color: '#585c66', mt: 1 }}>
                                {dbServiceData.description}
                            </Typography>
                        </Box>
                                    </Box>
                                </div>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Grid>

            <Grid container sx={{ p: 3 }} spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={7.5}>
                <Box sx={{ backgroundColor: 'white', p: 3, border: '1px solid #e7e7e7', borderRadius: '5px' }}>
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <CameraAltOutlined sx={{ fontSize: '40px', color: '#3b404b' }} />
                            <Typography variant='h6' sx={{ fontSize: '19px', fontWeight: 700, color: '#3b404b' }}>Book a Service</Typography>
                        </Box>
                        <Grid container spacing={4} sx={{ mb: 2, p: 3 }}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={4} sx={{ mb: 2, pl: 3 }} justifyContent='center'>
                                    <Grid item xs={11}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            {/* Icon and TextField for Full Name */}
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField
                                                id="name"
                                                label="Full Name"
                                                name='name'
                                                variant="standard"
                                                fullWidth
                                                value={bookingRequest.name}
                                                onChange={handleChange}
                                                error={!!formErrors.name}
                                                helperText={formErrors.name}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            {/* Icon and TextField for Email Address */}
                                            <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField
                                                id="email"
                                                label="Email Address"
                                                name='email'
                                                variant="standard"
                                                fullWidth
                                                value={bookingRequest.email}
                                                onChange={handleChange}
                                                error={!!formErrors.email}
                                                helperText={formErrors.email}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            {/* Icon and TextField for Phone Number */}
                                            <CallOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField
                                                id="phone"
                                                label="Phone Number"
                                                name='phone'
                                                variant="standard"
                                                fullWidth
                                                value={bookingRequest.phone}
                                                onChange={handleChange}
                                                error={!!formErrors.phone}
                                                helperText={formErrors.phone}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            {/* Icon and TextField for Shoot Date */}
                                            <DateRangeOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField
                                                id="shootDate"
                                                label="Shoot Date"
                                                name='shootDate'
                                                type='date'
                                                variant="standard"
                                                fullWidth
                                                value={bookingRequest['shootDate']}
                                                onChange={handleChange}
                                                error={!!formErrors['shootDate']}
                                                helperText={formErrors['shootDate']}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    min: new Date().toISOString().split('T')[0] 
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            {/* Icon and TextField for Message */}
                                            <MessageOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField
                                                id="message"
                                                label="Message"
                                                name='message'
                                                multiline
                                                rows={2}
                                                variant="standard"
                                                fullWidth
                                                value={bookingRequest.message}
                                                onChange={handleChange}
                                                error={!!formErrors.message}
                                                helperText={formErrors.message}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {token ?
                                            <Button
                                                variant='contained'
                                                fullWidth
                                                size='small'
                                                sx={{ backgroundColor: '#000000' }}
                                                type='submit'
                                            >
                                                Send Request
                                            </Button>
                                            :
                                            <Link to={'/login'}>
                                                <Button
                                                    variant='contained'
                                                    fullWidth
                                                    size='small'
                                                    sx={{ backgroundColor: '#000000' }}
                                                >
                                                    Send Request
                                                </Button>
                                            </Link>
                                        }

                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item sm={12} md={4.5}  >
                <Box sx={{ backgroundColor: 'white', p: 3, border: '1px solid #e7e7e7', borderRadius: '5px' }}>
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <MessageOutlinedIcon sx={{ fontSize: '40px', color: '#3b404b' }} />
                            <Typography variant='h6' sx={{ fontSize: '19px', fontWeight: 700, color: '#3b404b' }}>Send Your Feedback</Typography>
                        </Box>
                        <Grid container spacing={4} sx={{ mb: 2, p: 3 }}>
                            <form onSubmit={handleFeedbackSubmit}>
                                <Grid container spacing={4} sx={{ mb: 2, pl: 3 }} justifyContent='center'>
                                    <Grid item xs={11}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField
                                                id="name"
                                                label="Full Name"
                                                name='name'
                                                variant="standard"
                                                fullWidth
                                                value={feedback.name}
                                                onChange={handleFeedback}
                                                error={!!feedbackFormErrors.name}
                                                helperText={feedbackFormErrors.name}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField
                                                id="email"
                                                label="Email Address"
                                                name='email'
                                                variant="standard"
                                                fullWidth
                                                value={feedback.email}
                                                onChange={handleFeedback}
                                                error={!!feedbackFormErrors.email}
                                                helperText={feedbackFormErrors.email}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <MessageOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField
                                                id="message"
                                                label="Message"
                                                name='message'
                                                multiline
                                                rows={2}
                                                variant="standard"
                                                fullWidth
                                                value={feedback.message}
                                                onChange={handleFeedback}
                                                error={!!feedbackFormErrors.message}
                                                helperText={feedbackFormErrors.message}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {token ?
                                            <Button
                                                variant='contained'
                                                fullWidth
                                                size='small'
                                                sx={{ backgroundColor: '#000000' }}
                                                type='submit'
                                            >
                                                Send Feedback
                                            </Button>
                                            :
                                            <Link to={'/login'}>
                                                <Button
                                                    variant='contained'
                                                    fullWidth
                                                    size='small'
                                                    sx={{ backgroundColor: '#000000' }}
                                                >
                                                    Send Feedback
                                                </Button>
                                            </Link>
                                        }

                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>

                        
                        
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={7.5}>
                <Box sx={{ backgroundColor: 'white', p: 3, border: '1px solid #e7e7e7', borderRadius: '5px' }}>
                <Box sx={{ mt: 3 }}>
                            <Typography variant='h6' sx={{ mb: 2, fontWeight: 700, color: '#3b404b' }}>Client Feedbacks</Typography>
                            <Grid container spacing={2} sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                                {feedbackList.map((item, index) => (
                                    <>
                                        <Grid item xs={12} key={index}>
                                            <Card sx={{ backgroundColor: '#a9ff0036', border: '1px solid #e7e7e7', borderRadius: '5px' }}>
                                                <CardContent>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{item.name}</Typography>
                                                    <Typography variant="body2" color="textSecondary">{item.email}</Typography>
                                                    <Typography variant="body1" sx={{ mt: 1 }}>{item.message}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>


                                    </>
                                ))}
                            </Grid>
                        </Box></Box>
                
            </Grid>
            </Grid>


        </div >
    )
}

