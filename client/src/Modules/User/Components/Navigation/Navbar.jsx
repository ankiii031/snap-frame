import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import BurstModeOutlinedIcon from '@mui/icons-material/BurstModeOutlined';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../../config/Hosts';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
// const pages = [
//     { title: 'Home', path: '/', icon: <HomeOutlinedIcon /> },
//     { title: 'Packages', path: '/service', icon: <AirplaneTicketOutlinedIcon /> },
//     // { title: 'Events', path: '', icon: <EventAvailableOutlinedIcon /> },
//     { title: 'My Booking', path: '/myBooking', icon: <BookOutlinedIcon /> },
//     // { title: 'About Us', path: '', icon: <DashboardOutlinedIcon /> },
//     { title: 'Portfolio', path: '/gallery', icon: <BurstModeOutlinedIcon /> },
//   \
// ];


const commonPages = [
    { title: 'Home', path: '/', icon: <HomeOutlinedIcon /> },
    { title: 'Services', path: '/service', icon: <CameraAltIcon /> },
    { title: 'Portfolio', path: '/gallery', icon: <BurstModeOutlinedIcon /> },
];

const authenticatedPages = [
    { title: 'My Booking', path: '/myBooking', icon: <BookOutlinedIcon /> },

];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar({ token,setCount,count }) {
    const nav = useNavigate();
    const host = config.host;

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState({});



    const pages = token ? [...commonPages, ...authenticatedPages] : commonPages;



    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setCount(!count);
        nav('/');
    }


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigate = (path) => {
        nav(path)
    }

    useEffect(() => {
        const tokensss = JSON.parse(localStorage.getItem('userToken'));

        axios.get(`${host}/api/user/get-single-user`, { headers: { 'auth-token': tokensss } })
            .then((res) => {
                console.log("Get all user response : " + JSON.stringify(res.data))
                setUser(res.data)
            })
            .catch((err) => {
                console.log("Error : " + err);
            })
    }, [])

    return (
        <AppBar elevation={0}
            position="fixed"
            className={scrolled ? 'navbar scrolled' : 'navbar'}
            sx={{
                backgroundColor: '#000000 !important',
                // borderBottomRightRadius: '23px',
                // borderBottomLeftRadius: '23px',
                // transition: 'all 0.3s ease',
                pl: 3, pr: 3, pb: 2

            }}

        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}


                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 0,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Agency FB',
                            fontWeight: 700,
                            // letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        SNAP FRAME 
                    </Typography>
                    <VideoCameraBackOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white', fontSize: '30px' }} />


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" >{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <CameraAltIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: { xs: '.1rem', md: '.3rem' },
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        SNAP FRAME
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        {/* {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', textTransform: 'lowercase', '&::first-letter': { textTransform: 'uppercase' } }}

                            >
                                {page}
                            </Button>
                        ))} */}
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '20px' } }}>
                    {pages?.map((page) => (
                        <Button
                            key={page.title}
                            onClick={() => handleNavigate(page.path)}
                            startIcon={page.icon}
                            // className='nav-item'
                            sx={{fontSize:'15px', color: 'white', textTransform: 'capitalize', '&::first-letter': { textTransform: 'uppercase' } }}

                        >
                            {page.title}
                        </Button>
                    ))}
                </Box>


                    <Box sx={{ flexGrow: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', gap: '15px' }}>
                            {token ?
                                <>
                                    <Typography variant='body1' sx={{ display: { xs: 'none', md: 'block' } }}>{user.name}  | </Typography>
                                    <Button variant='outlined' onClick={handleLogout} startIcon={<LogoutIcon />} sx={{ color: 'white', borderColor: 'white' }} size='small'>Logout</Button>


                                </>
                                :
                                <Link to={'/login'}>
                                    <Button variant='outlined' startIcon={<LoginOutlinedIcon />} sx={{ color: 'white', borderColor: 'white' }} size='small'>Log In</Button>
                                </Link>
                            }

                        </Box>
                    </Box>

                </Toolbar>
               
            </Container>
        </AppBar>
    );
}
export default Navbar;
