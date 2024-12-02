import { Grid, Paper, Typography, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import tigerImg from '../../image//tiger2.png';
import axios from 'axios';
import Hosts from '../../../../config/Hosts';
import { useNavigate, useParams } from 'react-router-dom';


export default function CategoryService() {
const {id}=useParams();
    const host = Hosts.host;
    const navigate = useNavigate();
    const [dbPackageData, setDbPackageData] = useState([]);




    useEffect(() => {
        axios.get(`${host}/api/service/getcategoryService/${id}`)
            .then((res) => {
                if (res.data) {
                    setDbPackageData(res.data);
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const handleNavigate =(id)=>{
navigate(`/viewService/${id}`)
    }
    return (
        <div>
            <Grid container sx={{ p: 8,backgroundColor:'#fef9f4' }} spacing={2} >
                <Grid item xs={12} >
                    <Typography variant='h5' sx={{ color: '#000000', fontWeight: 700 }}>Best Services</Typography>
                </Grid>
                
                {dbPackageData.slice().reverse().map((i) => (
                    <Grid item xs={12} md={3} 
                    sx={{
                        mt: 2,
                        mb: 2,
                        cursor: 'pointer',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        //   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                      key={i._id} // Add a unique key prop
                      onClick={() => handleNavigate(i._id)} // Navigate to the view service page when clicked on a service card
                    >
                        <Box sx={{ borderRadius: '10px', p: 0, }}>

                            <Box>
                                <img src={`${host}/api/image/${i.image}`} alt="" style={{ width: '100%', height: '150px', borderRadius: '5px' }} />
                            </Box>
                            <Box sx={{ p: 0.5 }}>
                                <Typography variant='subtitle2' sx={{ color: 'gray',fontWeight: 600  }}>₹ {i.price}</Typography>
                                <Typography variant='body1' sx={{ fontWeight: 600 }}>{i.sname}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}


            </Grid>
        </div>
    )
}
