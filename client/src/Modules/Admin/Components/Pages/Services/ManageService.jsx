import { Box, TextField, Grid, Typography, Button, Paper, Divider, TextArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState,useEffect, useRef } from 'react';
import Hosts from '../../../../../config/Hosts';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import { Link, useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TodayIcon from '@mui/icons-material/Today';
import CommuteIcon from '@mui/icons-material/Commute';
import StartIcon from '@mui/icons-material/Start';
import EjectIcon from '@mui/icons-material/Eject';
import ImageIcon from '@mui/icons-material/Image';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import NotesIcon from '@mui/icons-material/Notes';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';



export default function ManageService() {
    const host = Hosts.host;
    const navigate = useNavigate();
    const [dbCategory, setDbCategory] = useState([]);
    const [guideData, setGuideData] = useState({});
    const [ServiceData, setServiceData] = useState({});
    const [image, setImage] = useState({});
    const [ServiceIncludes, setServiceIncludes] = useState([{ sname: '', image: '' }]);
    const [itinerary, setItinerary] = useState([{ sname: '', benefit1: '', benefit2: '', description: '' }]);
    const [errors, setErrors] = useState({});



    const handleImage = (e) => {
        setImage({...image,[e.target.name]: e.target.files[0] });
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: ""
        }));
    };

    console.log(image,'image')

    const handleChange = (e) => {
        setServiceData({ ...ServiceData, [e.target.name]: e.target.value });
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: ""
        }));
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            toast.error('Insert all the fields');

            return;
        }
        const Data = new FormData();
        Data.append('category', ServiceData.category);
        Data.append('sname', ServiceData.sname);
        Data.append('image', image.image);
        Data.append('price', ServiceData.price);
        Data.append('description', ServiceData.description);
     
      
       

        axios.post(`${host}/api/service/insertService`, Data)
            .then((res) => {
                if (res.data) {

                    setTimeout(() => {
                        navigate('/admin/viewService');
                    }, 2000)
                    toast.success('Service Details Added Successfully');

                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to add details');
            });
    };

    const handleServiceChange = (index, field, value) => {
        const updatedIncludes = [...ServiceIncludes];
        updatedIncludes[index][field] = value;
        setServiceIncludes(updatedIncludes);
        setErrors((prev) => ({
            ...prev,
            [`ServiceIncludes_${index}_${field}`]: ""
        }));
    };


    console.log(ServiceIncludes,'ServiceIncludes')


    const handleAddServiceInclude = () => {
        setServiceIncludes([...ServiceIncludes, { sname: '', image: '' }]);
    };

    const handleRemoveServiceInclude = (index) => {
        const updatedIncludes = [...ServiceIncludes];
        updatedIncludes.splice(index, 1);
        setServiceIncludes(updatedIncludes);
    };

    const handleAddItinerary = () => {
        setItinerary([...itinerary, { sname: '', benefit1: '', benefit2: '', description: '' }]);
    };

    const handleRemoveItinerary = (index) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary.splice(index, 1);
        setItinerary(updatedItinerary);
    };

    const handleItineraryChange = (index, field, value,event) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary[index][field] = value;
        setItinerary(updatedItinerary);

        setErrors((prev) => ({
            ...prev,
            [`itinerary_${index}_${field}`]: ""
        }));
    };

    console.log(itinerary)

    useEffect(() => {

        axios.get(`${host}/api/admin/getcategory`)
            .then((res) => {
                if (res.data) {
                    setDbCategory(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!ServiceData.sname) {
            newErrors.sname = 'Service name is required';
            isValid = false;
        }
        if (!ServiceData.category) {
            newErrors.category = 'Category is required';
            isValid = false;
        }
      
        
        if (!ServiceData.price) {
            newErrors.price = 'Price is required';
            isValid = false;
        }
        
        if (!image.image) {
            newErrors.image = 'Image is required';
            isValid = false;
        }
        if (!ServiceData.description) {
            newErrors.description = 'Description is required';
            isValid = false;
        }
       
        
      
        setErrors(newErrors);
        return isValid;
    };



    return (
        <Box sx={{marginTop:'-80px' ,marginLeft: '240px', padding: '' ,height:'auto'}}>

            <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                    <h2 style={{ color: '#212529' }}>Manage Services</h2>
                    <Typography variant='body1' gutterBottom>Add Service Details</Typography>
                </Grid>
               
            </Grid>

            <Box component={Paper} elevation={0} sx={{
                p: 3, boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.3)', borderRadius: '10px', mb: 3
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        {/* <TextField variant='outlined' size='small' onChange={handleChange} name='name' label="Guide Name" fullWidth sx={{ borderRadius: '20px' }} value={guideData.name} /> */}
                        <FormControl fullWidth size='small'> 
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //   value={age}
                                fullWidth
                                label="Select Category"
                                name='category'
                                onChange={handleChange}
                                error={!!errors.category}
                                helperText={errors.category}
                            >
                                {dbCategory?.map((i)=>(
                                    
                                    <MenuItem key={i._id} value={i._id}>{i.title}</MenuItem>
                                ))}
                                
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Service Name"
                            onChange={handleChange}
                            name='sname'
                            fullWidth
                           
                            variant="outlined"
                            size='small'
                            error={!!errors.sname}
                                helperText={errors.sname}
                        />
                    </Grid>
                 
                
                   
                 
                    <Grid item xs={12} md={3}>
                        <TextField
                            id="input-with-icon-textfield"
                            onChange={handleImage}
                            name='image'
                            fullWidth
                            type='file'
                           
                            variant="outlined"
                            size='small'
                            error={!!errors.image}
                                helperText={errors.image}
                        />
                    </Grid>
               
                    <Grid item xs={12} md={3}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Service Price"
                            onChange={handleChange}
                            name='price'
                            fullWidth
                          type='number'
                          inputProps={{ min: 1 }}
                            variant="outlined"
                            size='small'
                            error={!!errors.price}
                                helperText={errors.price}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <TextField
                            id="input-with-icon-textfield"
                            label="Description"
                            onChange={handleChange}
                            name='description'
                            fullWidth
                            multiline
                            rows={3}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NotesIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            size='small'
                            error={!!errors.description}
                                helperText={errors.description}
                        />
                    </Grid>
             
                    <Grid item xs={12} md={12}>
                        <Box display="flex" justifyContent="center" width="100%">
                            <Button variant="contained" onClick={handleSubmit} sx={{ width: { xs: '100%', md: '50%' } }}>
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

            </Box>

            <Toaster position="top-center" reverseOrder={false} />
        </Box>
    );
}
