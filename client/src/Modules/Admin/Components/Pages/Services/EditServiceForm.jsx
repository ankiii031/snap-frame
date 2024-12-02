import { Box, TextField, Grid, Typography, Button, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect, useRef } from 'react';
import Hosts from '../../../../../config/Hosts';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import TitleIcon from '@mui/icons-material/Title';
import TodayIcon from '@mui/icons-material/Today';
import CommuteIcon from '@mui/icons-material/Commute';
import StartIcon from '@mui/icons-material/Start';
import EjectIcon from '@mui/icons-material/Eject';
import ImageIcon from '@mui/icons-material/Image';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import NotesIcon from '@mui/icons-material/Notes';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

export default function EditServiceForm() {
    const host = Hosts.host;
    const navigate = useNavigate();
    
    const { id } = useParams(); // Get the service ID from the route parameters
    const [dbCategory, setDbCategory] = useState([]);
    const [guideData, setGuideData] = useState({});
    const [ServiceData, setServiceData] = useState({});
    const [image, setImage] = useState({});
    const [ServiceIncludes, setServiceIncludes] = useState([{ title: '', image: '' }]);
    const [itinerary, setItinerary] = useState([{ title: '', benefit1: '', benefit2: '', description: '' }]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch the existing service details using the ID
        axios.get(`${host}/api/service/getSingleService/${id}`)
            .then((res) => {
                if (res.data) {
                    const serviceData = res.data;
                    setServiceData(serviceData);
                    setServiceIncludes(serviceData.ServiceIncludes);
                    setItinerary(serviceData.itinerary);
                    // Set images separately if needed
                    setImage({
                        thumbnail: serviceData.thumbnail,
                        image1: serviceData.image1,
                        image2: serviceData.image2,
                        image3: serviceData.image3,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

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

    const handleImage = (e) => {
        setImage({ ...image, [e.target.name]: e.target.files[0] });
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: ""
        }));
    };

    const handleChange = (e) => {
        setServiceData({ ...ServiceData, [e.target.name]: e.target.value });
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: ""
        }));
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

    const handleItineraryChange = (index, field, value) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary[index][field] = value;
        setItinerary(updatedItinerary);
        setErrors((prev) => ({
            ...prev,
            [`itinerary_${index}_${field}`]: ""
        }));
    };

    const handleAddServiceInclude = () => {
        setServiceIncludes([...ServiceIncludes, { title: '', image: '' }]);
    };

    const handleRemoveServiceInclude = (index) => {
        const updatedIncludes = [...ServiceIncludes];
        updatedIncludes.splice(index, 1);
        setServiceIncludes(updatedIncludes);
    };

    const handleAddItinerary = () => {
        setItinerary([...itinerary, { title: '', benefit1: '', benefit2: '', description: '' }]);
    };

    const handleRemoveItinerary = (index) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary.splice(index, 1);
        setItinerary(updatedItinerary);
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!ServiceData.title) {
            newErrors.title = 'Title is required';
            isValid = false;
        }
        if (!ServiceData.category) {
            newErrors.category = 'Category is required';
            isValid = false;
        }
        if (!ServiceData.duration) {
            newErrors.duration = 'Duration is required';
            isValid = false;
        }
        if (!ServiceData.startCity) {
            newErrors.startCity = 'Start city is required';
            isValid = false;
        }
        if (!ServiceData.endCity) {
            newErrors.endCity = 'End city is required';
            isValid = false;
        }
        if (!image.thumbnail) {
            newErrors.thumbnail = 'Thumbnail is required';
            isValid = false;
        }
        if (!image.image1) {
            newErrors.image1 = 'Image 1 is required';
            isValid = false;
        }
        if (!ServiceData.description) {
            newErrors.description = 'Description is required';
            isValid = false;
        }

        ServiceIncludes.forEach((service,index) => {
            if (!service.title) {
                newErrors[`ServiceIncludes_${index}_title`] = 'Title is required';
                isValid = false;
            }
            if (!service.image) {
                newErrors[`ServiceIncludes_${index}_image`] = 'Image is required';
                isValid = false;
            }
        });

        itinerary.forEach((itiner, index) => {
            if (!itiner.title) {
                newErrors[`itinerary_${index}_title`] = 'Title is required';
                isValid = false;
            }
            if (!itiner.description) {
                newErrors[`itinerary_${index}_description`] = 'Description is required';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            toast.error('Insert all the fields');
            return;
        }
        const Data = new FormData();
        Data.append('category', ServiceData.category);
        Data.append('title', ServiceData.title);
        Data.append('duration', ServiceData.duration);
        Data.append('typeOfTrip', ServiceData.typeOfTrip);
        Data.append('startCity', ServiceData.startCity);
        Data.append('endCity', ServiceData.endCity);
        Data.append('thumbnail', image.thumbnail);
        Data.append('image1', image.image1);
        Data.append('image2', image.image2);
        Data.append('image3', image.image3);
        Data.append('description', ServiceData.description);
        ServiceIncludes.forEach((item, index) => {
            Data.append(`ServiceIncludes[${index}][title]`, item.title);
            Data.append(`ServiceIncludes[${index}][image]`, item.image);
        });
        Data.append('itinerary', JSON.stringify(itinerary));

        axios.put(`${host}/api/service/updateService/${id}`, Data)
            .then((res) => {
                if (res.data) {
                    toast.success('Service Details Updated Successfully');
                    // navigate('/admin/viewService'); // Navigate to the view page
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to update service details');
            });
    };

    return (
        <Box sx={{ mt: { xs: '4' } }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                    <h2 style={{ color: '#212529' }}>Manage  Service</h2>
                    <Typography variant='body1' gutterBottom>Insert  Service Details</Typography>
                </Grid>
                <Grid item xs={12} md={3} sx={{ mt: 2 }}>
                    <Link to='/admin/viewService' style={{ textDecoration: 'none' }}>
                        <Button variant='outlined' startIcon={<FollowTheSignsIcon />} color='secondary'>
                            Back
                        </Button>
                    </Link>
                </Grid>
            </Grid>
            <Divider />
            <Box component={Paper} sx={{ p: 2, mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                label='Category'
                                name='category'
                                value={ServiceData.category || ''}
                                onChange={handleChange}
                                error={!!errors.category}
                                helperText={errors.category}
                            >
                                {dbCategory.map((category, index) => (
                                    <MenuItem key={index} value={category.title}>
                                        {category.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label='Title'
                            sx={{ mt: 2 }}
                            name='title'
                            value={ServiceData.title || ''}
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <TitleIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label='Duration'
                            sx={{ mt: 2 }}
                            name='duration'
                            value={ServiceData.duration || ''}
                            onChange={handleChange}
                            error={!!errors.duration}
                            helperText={errors.duration}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <TodayIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label='Type Of Trip'
                            sx={{ mt: 2 }}
                            name='typeOfTrip'
                            value={ServiceData.typeOfTrip || ''}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <CommuteIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label='Start City'
                            sx={{ mt: 2 }}
                            name='startCity'
                            value={ServiceData.startCity || ''}
                            onChange={handleChange}
                            error={!!errors.startCity}
                            helperText={errors.startCity}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <StartIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label='End City'
                            sx={{ mt: 2 }}
                            name='endCity'
                            value={ServiceData.endCity || ''}
                            onChange={handleChange}
                            error={!!errors.endCity}
                            helperText={errors.endCity}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <EjectIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Typography variant='body1' gutterBottom sx={{ mt: 2 }}>
                            Insert  Service Image
                        </Typography>
                        <Box>
                            <TextField
                                fullWidth
                                label='Thumbnail'
                                sx={{ mt: 2 }}
                                name='thumbnail'
                                type='file'
                                InputLabelProps={{ shrink: true }}
                                onChange={handleImage}
                                error={!!errors.thumbnail}
                                helperText={errors.thumbnail}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <ImageIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label='Image 1'
                                sx={{ mt: 2 }}
                                name='image1'
                                type='file'
                                InputLabelProps={{ shrink: true }}
                                onChange={handleImage}
                                error={!!errors.image1}
                                helperText={errors.image1}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <DriveFolderUploadIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label='Image 2'
                                sx={{ mt: 2 }}
                                name='image2'
                                type='file'
                                InputLabelProps={{ shrink: true }}
                                onChange={handleImage}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <DriveFolderUploadIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label='Image 3'
                                sx={{ mt: 2 }}
                                name='image3'
                                type='file'
                                InputLabelProps={{ shrink: true }}
                                onChange={handleImage}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <DriveFolderUploadIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={5}
                            label='Description'
                            sx={{ mt: 2 }}
                            name='description'
                            value={ServiceData.description || ''}
                            onChange={handleChange}
                            error={!!errors.description}
                            helperText={errors.description}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <FormatAlignJustifyIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box>
                            <Typography variant='body1' gutterBottom sx={{ mt: 2 }}>
                                Add  Service Includes
                            </Typography>
                            {ServiceIncludes.map((include, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        label='Title'
                                        name={`title_${index}`}
                                        value={include.title}
                                        onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                                        error={!!errors[`ServiceIncludes_${index}_title`]}
                                        helperText={errors[`ServiceIncludes_${index}_title`]}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <TitleIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label='Image'
                                        name={`image_${index}`}
                                        type='file'
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => handleServiceChange(index, 'image', e.target.files[0])}
                                        error={!!errors[`ServiceIncludes_${index}_image`]}
                                        helperText={errors[`ServiceIncludes_${index}_image`]}
                                        sx={{ ml: 2 }}
                                    />
                                    <IconButton onClick={() => handleRemoveServiceInclude(index)} sx={{ ml: 2 }}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Box>
                            ))}
                            <Button
                                variant='outlined'
                                startIcon={<AddIcon />}
                                onClick={handleAddServiceInclude}
                                sx={{ mt: 2 }}
                            >
                                Add Include
                            </Button>
                        </Box>
                        <Box>
                            <Typography variant='body1' gutterBottom sx={{ mt: 2 }}>
                                Add Itinerary
                            </Typography>
                            {itinerary.map((item, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        label='Title'
                                        name={`title_${index}`}
                                        value={item.title}
                                        onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                                        error={!!errors[`itinerary_${index}_title`]}
                                        helperText={errors[`itinerary_${index}_title`]}
                                        sx={{ mt: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label='Benefit 1'
                                        name={`benefit1_${index}`}
                                        value={item.benefit1}
                                        onChange={(e) => handleItineraryChange(index, 'benefit1', e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label='Benefit 2'
                                        name={`benefit2_${index}`}
                                        value={item.benefit2}
                                        onChange={(e) => handleItineraryChange(index, 'benefit2', e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        label='Description'
                                        name={`description_${index}`}
                                        value={item.description}
                                        onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                                        error={!!errors[`itinerary_${index}_description`]}
                                        helperText={errors[`itinerary_${index}_description`]}
                                        sx={{ mt: 2 }}
                                    />
                                    <IconButton onClick={() => handleRemoveItinerary(index)} sx={{ mt: 2 }}>
                                        <RemoveIcon />
                                    </IconButton>
                                </Box>
                            ))}
                            <Button
                                variant='outlined'
                                startIcon={<AddIcon />}
                                onClick={handleAddItinerary}
                                sx={{ mt: 2 }}
                            >
                                Add Itinerary
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ textAlign: 'center', mt: 4 }}>
                        <Button variant='contained' onClick={handleSubmit} >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

