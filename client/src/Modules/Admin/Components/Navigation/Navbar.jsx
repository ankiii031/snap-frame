import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LogoutIcon from '@mui/icons-material/Logout';
import NavItems from './NavItems';
import { useNavigate } from 'react-router-dom';
import { Button, MenuList } from '@mui/material';
import { VideoCameraBackOutlined } from '@mui/icons-material';

function Navbar() {
    const nav = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        nav('/admin/login');
    };

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

    return (
        <>
            <AppBar position="static" elevation={0} sx={{
                backgroundColor: '#ffffff', color: '#474747', borderBottom: '2px solid #dee2e6', position: 'fixed', width: '100%', top: 0, zIndex: 1000
            }}>
                <Container maxWidth="xl" sx={{ borderBottom: '1px solid #dee2e6', backgroundColor: '#212529' }}>
                    <Toolbar disableGutters>

                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/admin/"
                            sx={{
                                mr: 0,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'Agency FB',
                                fontWeight: 700,
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            SNAP FRAME
                        </Typography>
                        <VideoCameraBackOutlined sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white' }} />

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuList />
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
                                <MenuItem>
                                    <Typography textAlign="center">Admin</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>

                        <TravelExploreIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/admin/"
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
                        
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {/* Additional items or menu options can be added here */}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                                <Typography variant='body1' sx={{ display: { xs: 'none', md: 'block' } }}>HELLO, Admin | </Typography>
                                <Button onClick={handleLogout} startIcon={<LogoutIcon />} sx={{ color: 'wheat' }}>Logout</Button>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* Assuming NavItems is styled as a sidebar, it should be placed here */}
            <NavItems />
        </>
    );
}

export default Navbar;
