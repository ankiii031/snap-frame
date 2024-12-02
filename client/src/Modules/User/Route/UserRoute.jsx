import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Home from '../Components/Pages/Home';
import Navbar from '../Components/Navigation/Navbar';
import '../Components/Css/Style.css';
import Services from '../Components/Pages/Services';
import ViewService from '../Components/Pages/ViewService';
import Register from '../Components/Pages/Auth/Register';
import Login from '../Components/Pages/Auth/Login';
import MyBooking from '../Components/Pages/MyBooking';
import UploadGallery from '../Components/Pages/UploadGallery';
import OwnUploads from '../Components/Pages/OwnUploads';
import BottomNavBar from '../Components/Navigation/BottomNav';
import CategoryService from '../Components/Pages/CategoryService';
import Footer from '../Components/Footer/Footer';

export default function UserRoute() {
    const location = useLocation();
    const [token, setToken] = useState(false); // Initialize token state
    const [count, setCount] = useState(false);

    const currentRoute = location.pathname;

    useEffect(() => {
        // Check localStorage for user token
        const userToken = JSON.parse(localStorage.getItem('userToken'));
        if (userToken) {
            setToken(true);
        } else {
            setToken(false);
        }
    }, [count]);

    // Determine whether to display footer based on current route
    const shouldDisplayFooter = !currentRoute.includes('/login') && !currentRoute.includes('/register');

    // Determine whether to display BottomNavBar based on current route
    const shouldDisplayBottomNavBar = !currentRoute.includes('/login') && !currentRoute.includes('/register');

    return (
        <div>
            <CssBaseline />

            {currentRoute.includes('/login') || currentRoute.includes('/register') ? (
                <Box sx={{ backgroundColor: '#000000',pb:3 }}>
                    <Routes>
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<Login count={count} setCount={setCount} />} />
                    </Routes>
                </Box>
            ) : (
                <Navbar token={token} count={count} setCount={setCount} />
            )}

            {!currentRoute.includes('/login') && !currentRoute.includes('/register') && (
                <Box sx={{ backgroundColor: 'white', pt: 10 }}>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/service" element={<Services />} />
                        <Route exact path="/viewService/:id" element={<ViewService token={token}/>} />
                        <Route exact path="/myBooking" element={<MyBooking />} />
                        <Route exact path="/gallery" element={<UploadGallery token={token}/>} />
                        <Route exact path="/ownUploads" element={<OwnUploads />} />
                   
                        <Route exact path="/categoryService/:id" element={<CategoryService />} />
                    </Routes>

                    {shouldDisplayFooter && <Footer />}
                </Box>
            )}

            {shouldDisplayBottomNavBar && <BottomNavBar token={token}/>}
        </div>
    );
}
