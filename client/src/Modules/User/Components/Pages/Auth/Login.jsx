import React, { useState } from 'react';
import { Typography, Button, Grid, Box, TextField } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../../../config/Hosts';
import toast, { Toaster } from 'react-hot-toast';

export default function Login({count,setCount}) {
    const host = config.host;
    const nav=useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear validation error when user starts typing
        setFormErrors({
            ...formErrors,
            [name]: '',
        });
    };

    const validateForm = () => {
        let valid = true;
        const errors = {
            email: '',
            password: '',
        };

        // Email validation
        if (!formData.email) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
            valid = false;
        }

        // Password validation
        if (!formData.password) {
            errors.password = 'Password is required';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Process login logic here
            axios.post(`${host}/api/user/user-login`, formData)
            .then((response) => {
              if (response.data.success === true) {
                localStorage.setItem("userToken", JSON.stringify(response.data.token));
                setCount(!count);
                toast.success('Login Successfully');

                setTimeout(async()=>{
                    await nav("/");
                     
                },1000)
              } else {
                // setOpen2(true);
                toast.error('Please Enter Valid Details');

              }
            })
            .catch((err) => {
              console.log("Error : " + err);
            });
            // Reset form data after submission
            setFormData({
                email: '',
                password: '',
            });
        } else {
            console.log('Form validation failed.');
        }
    };

    return (
        <div>
            <Grid container spacing={3} sx={{ pt: { xs: 5, sm: 2, md: 10 }, justifyContent: 'center', height: '100vh' }}>
               
                <Grid item sm={12} md={4.5}>
                    <Box sx={{ backgroundColor: '#fef9f4', p: 3, border: '1px solid #e7e7e7', borderRadius: '5px' }}>
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            {/* Your icon */}
                            <Typography variant='h6' sx={{ fontSize: '19px', fontWeight: 700, color: '#3b404b' }}>User Login</Typography>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={4} sx={{ mb: 2, p: 3 }}>
                                <Grid item xs={11}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email Address"
                                            variant="standard"
                                            fullWidth
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            error={!!formErrors.email}
                                            helperText={formErrors.email}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={11}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <HttpsOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            id="password"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            variant="standard"
                                            fullWidth
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            error={!!formErrors.password}
                                            helperText={formErrors.password}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={11}>
                                    <Button type="submit"  variant='contained' fullWidth size='small' sx={{ backgroundColor: '#000000' }}>Login</Button>
                                </Grid>
                                <Grid item xs={11}>
                                    <Box display='flex' justifyContent='center' alignItems='center' mt={1}>
                                        <Typography variant='p' sx={{ fontSize: '14px', color: '#3b404b' }}>
                                            New user? <Link to={'/register'}>Register</Link>
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
