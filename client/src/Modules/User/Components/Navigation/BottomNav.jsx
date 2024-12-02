import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl, Divider, Modal, AppBar, Toolbar, Chip, useTheme } from '@mui/material';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import axios from 'axios';
import config from '../../../../config/Hosts';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';




export default function BottomNavBar({ token }) {
    const host = config.host;

    const theme = useTheme();
    const [open, setOpen] = useState(false);
  
    const [formErrors, setFormErrors] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <React.Fragment>
            

           
        </React.Fragment>
    );
}
