import { Typography, Button, Grid, Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../../../config/Hosts';
import toast, { Toaster } from 'react-hot-toast';
import HomeIcon from '@mui/icons-material/Home';

export default function Register() {
    const host = config.host;
const nav=useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        address: ''
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        address:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

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
            case 'password':
                if (!value) {
                    setFormErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
                } else if (value.length < 6) {
                    setFormErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 6 characters' }));
                } else {
                    setFormErrors((prevErrors) => ({ ...prevErrors, password: '' }));
                }
                break;
            default:
                break;
        }
    };

    console.log(formValues)

    const validate = () => {
        let isValid = true;
        const errors = {};

        if (!formValues.name) {
            isValid = false;
            errors.name = 'Full Name is required';
        }

        if (!formValues.email) {
            isValid = false;
            errors.email = 'Email Address is required';
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            isValid = false;
            errors.email = 'Email Address is invalid';
        }

        if (!formValues.phone) {
            isValid = false;
            errors.phone = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formValues.phone)) {
            isValid = false;
            errors.phone = 'Phone Number is invalid';
        }

        if (!formValues.password) {
            isValid = false;
            errors.password = 'Password is required';
        } else if (formValues.password.length < 6) {
            isValid = false;
            errors.password = 'Password must be at least 6 characters';
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.post(`${host}/api/user/user-register`, formValues)
                .then((response) => {
                    console.log("Insert Response : " + response.data.cname);
                    if (response.data) {
                        toast.success('Registered Successfully');
                        setTimeout(()=>{
                            nav("/login/");
                        },1000)

                    } else {
                        console.log("Some error occurred");
                    }
                })
                .catch((err) => {
                    console.log("Error : " + err);
                });
            console.log('Form submitted successfully');
            // Proceed with form submission (e.g., API call)
        } else {
            console.log('Form has errors');
        }
    };

    return (
        <div>
            <Grid container spacing={3} sx={{ p: 3, backgroundColor: '#000000' }} justifyContent='center'>
                
                <Grid item sm={12} md={4.5}>
                    <Box sx={{ backgroundColor: '#fef9f4', p: 3, border: '1px solid #e7e7e7', borderRadius: '5px' }}>
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <AccountCircleOutlinedIcon sx={{ fontSize: '40px', color: '#3b404b' }} />
                            <Typography variant='h6' sx={{ fontSize: '19px', fontWeight: 700, color: '#3b404b' }}>User Registration</Typography>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={4} sx={{ mb: 2, p: 3 }}>
                                <Grid item xs={11}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            id="full-name"
                                            label="Full Name"
                                            name='name'
                                            variant="standard"
                                            fullWidth
                                            value={formValues.name}
                                            onChange={handleChange}
                                            error={!!formErrors.name}
                                            helperText={formErrors.name}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={11}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            id="email-address"
                                            label="Email Address"
                                            name='email'
                                            variant="standard"
                                            fullWidth
                                            value={formValues.email}
                                            onChange={handleChange}
                                            error={!!formErrors.email}
                                            helperText={formErrors.email}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={11}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <CallOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            id="phone-number"
                                            label="Phone Number"
                                            name='phone'
                                            variant="standard"
                                            fullWidth
                                            value={formValues.phone}
                                            onChange={handleChange}
                                            error={!!formErrors.phone}
                                            helperText={formErrors.phone}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={11}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <HttpsOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            type='password'
                                            id="password"
                                            label="Password"
                                            name='password'
                                            variant="standard"
                                            fullWidth
                                            value={formValues.password}
                                            onChange={handleChange}
                                            error={!!formErrors.password}
                                            helperText={formErrors.password}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={11}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <HomeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            type='address'
                                            id="address"
                                            label="Address"
                                            name='address'
                                            variant="standard"
                                            fullWidth
                                            value={formValues.address}
                                            onChange={handleChange}
                                            error={!!formErrors.address}
                                            helperText={formErrors.address}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={11}>
                                    <Button variant='contained' fullWidth size='small' sx={{ backgroundColor: '#000000' }} type='submit'>
                                        Register
                                    </Button>
                                </Grid>
                                <Grid item xs={11}>
                                    <Box display='flex' justifyContent='center' alignItems='center' mt={1}>
                                        <Typography sx={{ fontSize: '14px', color: '#3b404b' }}>
                                            Already have an account? <Link to={'/login'}>Login</Link>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
            <Toaster position="top-center" reverseOrder={false} />

        </div>

    );
}
