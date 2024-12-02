import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CollectionsIcon from '@mui/icons-material/Collections';
import PendingIcon from '@mui/icons-material/Pending';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import TourIcon from '@mui/icons-material/Tour';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { Add, CameraAltOutlined, Group, Route, Visibility } from '@mui/icons-material';

export default function NavItems() {
    const nav = useNavigate();
    const [dropdownItems, setDropdownItems] = useState([]);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    const handleMouseEnter = (event, items) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setDropdownPosition({
            top: rect.bottom, // Position below the item
            left: rect.left
        });
        setDropdownItems(items || []);
    };

    const handleMouseLeave = () => {
        setDropdownItems([]);
    };

    const handleNavigate = (path) => {
        nav(path);
        handleMouseLeave();
    };

    const items = [
        { title: 'Dashboard', path: '/admin/', icon: <DashboardIcon sx={{ color: '#474747' }} />, barColor: '#9EDDFF' },
        { title: 'Client', path: '/admin/client', icon: <Group sx={{ color: '#474747' }} />, barColor: '#9EDDFF' },
        {
            title: 'Category', icon: <CategoryIcon sx={{ color: '#474747' }} />, expandIcon: <ExpandMoreIcon />, Items: [
                { title: 'Add', path: '/admin/addcategory', icon: <Add sx={{ color: '#474747', fontSize: '19px' }} /> },
                { title: 'View', path: '/admin/category', icon: <Visibility sx={{ color: '#474747', fontSize: '19px' }} /> },
            ], barColor: '#9EDDFF'
        },
        {
            title: 'Service', icon: <CameraAltOutlined sx={{ color: '#474747' }} />, expandIcon: <ExpandMoreIcon />, Items: [
                { title: 'Add', path: '/admin/manageService', icon: <Add sx={{ color: '#474747', fontSize: '19px' }} /> },
                { title: 'View', path: '/admin/viewService', icon: <Visibility sx={{ color: '#474747', fontSize: '19px' }} /> },
            ], barColor: '#9EDDFF'
        },
        {
            title: 'Portfolio', icon: <Route sx={{ color: '#474747' }} />, expandIcon: <ExpandMoreIcon />, Items: [
                { title: 'Add', path: '/admin/addPort', icon: <Add sx={{ color: '#474747', fontSize: '19px' }} /> },
                { title: 'View', path: '/admin/viewPort', icon: <Visibility sx={{ color: '#474747', fontSize: '19px' }} /> },
            ], barColor: '#9EDDFF'
        },
        {
            title: 'Bookings', icon: <BookOnlineIcon sx={{ color: '#474747' }} />,
            Items: [
                { title: 'Pending Request', path: '/admin/pendingRequest', icon: <PendingIcon sx={{ color: '#474747', fontSize: '19px' }} /> },
                { title: 'Accepted Request', path: '/admin/acceptedRequest', icon: <TaskAltIcon sx={{ color: '#474747', fontSize: '19px' }} /> },
                { title: 'Rejected Request', path: '/admin/rejectedRequest', icon: <CancelScheduleSendIcon sx={{ color: '#474747', fontSize: '19px' }} /> },
            ],
            expandIcon: <ExpandMoreIcon />, barColor: '#9EDDFF'
        },
        { title: 'Feedback', path: '/admin/feedback', icon: <RateReviewIcon sx={{ color: '#474747' }} />, barColor: '#9EDDFF' },
        { title: 'Payment', path: '/admin/payment', icon: <CollectionsIcon sx={{ color: '#474747' }} />, barColor: '#9EDDFF' },
    ];

    const SidebarContainer = styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        width: '250px',
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        position: 'fixed',
        top: 0,
        left: 0,
        paddingTop: theme.spacing(8),
        overflowY: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '200px',
        },
    }));

    const SidebarItem = styled(Paper)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        cursor: 'pointer',
        borderRadius: '5px',
        border: '1px solid #dee2e6',
        position: 'relative', // Important for positioning dropdown relative to this item
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
    }));

    const DropdownMenu = styled(Box)(({ theme }) => ({
        position: 'absolute',
        top: 0,
        left: '100%', // Position to the right of the parent
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        borderRadius: theme.shape.borderRadius,
        zIndex: 1,
        minWidth: '160px',
        [theme.breakpoints.down('sm')]: {
            left: '0%', // Adjust for smaller screens
            width: '100%',
        },
    }));

    return (
        <SidebarContainer onMouseLeave={handleMouseLeave}>
            {items.map((i, index) => (
                <SidebarItem key={index} elevation={0} onClick={() => handleNavigate(i.path)} onMouseEnter={(event) => handleMouseEnter(event, i.Items)}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {i.icon}
                            <Typography variant='body1' sx={{ color: '#474747' }}>{i.title}</Typography>
                        </Box>
                        {i.expandIcon && (
                            <Box>
                                {i.expandIcon}
                            </Box>
                        )}
                    </Box>
                </SidebarItem>
            ))}

            {dropdownItems.length > 0 && (
                <DropdownMenu sx={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
                    {dropdownItems.map((item, idx) => (
                        <Box key={idx} sx={{ p: 1, cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }} onClick={() => handleNavigate(item.path)}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {item.icon}
                                <Typography variant='body2'>{item.title}</Typography>
                            </Box>
                        </Box>
                    ))}
                </DropdownMenu>
            )}
        </SidebarContainer>
    );
}
