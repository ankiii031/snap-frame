import { Grid, Paper, Typography, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hosts from '../../../../config/Hosts';
import { Link,useNavigate } from 'react-router-dom';

export default function ServiceCategory() {
    const host = Hosts.host;
const nav = useNavigate();
    const [dbCategory, setDbCategory] = useState([]);
    const [dbServiceData, setDbServiceData] = useState([]);

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
    }, []);

    console.log(dbServiceData, 'dbServiceData');

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

    // Function to get the number of services for a given category
    const getServiceCountForCategory = (categoryId) => {
        return dbServiceData.filter(item => item.category._id === categoryId).length;
    };


    const handleCategoryNavigate =(id)=>{
nav(`/categoryService/${id}`)
    }

    return (
        <div>
            <Grid container sx={{ p: 8 }} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' sx={{ color: '#1a1a1a', fontWeight: 700 }}>Service Categories</Typography>
                </Grid>
             
                {dbCategory.map((category) => (
                    <Grid key={category._id} item xs={12} md={3} sx={{ mt: 2, mb: 2, cursor: 'pointer' }}>
                        <Box onClick={()=>(handleCategoryNavigate(category._id))} sx={{ boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)', borderRadius: '10px', p: 0, background: 'white', height: '200px' }}>
                            <Box sx={{ p: 2 }}>
                                <Typography variant='body1' sx={{ fontWeight: 600 }}>{category.title}</Typography>
                                {/* <Typography variant='subtitle2' sx={{ color: 'gray' }}>{getServiceCountForCategory(category._id)} services</Typography> */}
                            </Box>
                            <Box>
                                <img src={`${host}/api/image/${category.image}`} alt="" style={{ width: '100%', height: '150px', borderRadius: '5px' }} />
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
