import React,{useEffect} from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Home from '../Components/Pages/Home/Home'
import Navbar from '../Components/Navigation/Navbar'
import ManageCategory from '../Components/Pages/Category/ManageCategory'
import AddCategory from '../Components/Pages/Category/AddCategory'
import ManageClient from '../Components/Pages/Client/ManageClient'
import UploadPortfolio from '../Components/Pages/Portfolio/AddPort'
import EditPortfolio from '../Components/Pages/Portfolio/EditPortfolio'
import ViewPort from '../Components/Pages/Portfolio/ViewPort'
import { Box } from '@mui/material'

import { CssBaseline } from '@mui/material'
import ManageService from '../Components/Pages/Services/ManageService'
import ViewService from '../Components/Pages/Services/ViewService'
import EditServiceForm from '../Components/Pages/Services/EditServiceForm'
import PendingRequest from '../Components/Pages/BookingRequest/PendingRequest'
import PaymentDetails from '../Components/Pages/BookingRequest/PaymentDetails'
import AcceptedRequest from '../Components/Pages/BookingRequest/AcceptedRequest'
import Gallery from '../Components/Pages/Services/Gallery'
import RejectedRequest from '../Components/Pages/BookingRequest/RejectedRequest'
import Feedback from '../Components/Pages/Services/Feedback'
import Login from '../Components/Auth/Login'


export default function AdminRoute() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentRoute = location.pathname;

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('adminToken')) == null) {
          navigate('/admin/login')
    
        }
    
      }, [])

    return (
        <div>
            <CssBaseline />
            {currentRoute.includes('/admin/login') ? (
                <Box >

                    <Routes>
                        <Route exact path="/login" element={<Login />} />
                    </Routes>
                </Box>
            )
                :
                (
                    <Navbar />
                )
            }


            {currentRoute.includes('/admin/login') ? '' :

                <Box sx={{ pt: { xs: 30, md: 20 }, px: 5, pb: 4, backgroundColor: '#eff1f3' }}>
                


                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/addcategory" element={<AddCategory />} />
                        <Route exact path="/category" element={<ManageCategory />} />
                        <Route exact path="/client" element={<ManageClient />} />
                        <Route exact path="/editPort/:id" element={<EditPortfolio />} />
                        <Route exact path="/addPort" element={<UploadPortfolio />} />
                        <Route exact path="/viewPort" element={<ViewPort />} />
                 
                        <Route exact path="/manageService" element={<ManageService />} />
                        <Route exact path="/viewService" element={<ViewService />} />
                        <Route exact path="/editService/:id" element={<EditServiceForm />} />
                        <Route exact path="/pendingRequest" element={<PendingRequest />} />
                        <Route exact path="/payment" element={<PaymentDetails />} />
                        <Route exact path="/acceptedRequest" element={<AcceptedRequest />} />
                        <Route exact path="/rejectedRequest" element={<RejectedRequest />} />
                        <Route exact path="/gallery" element={<Gallery />} />
                        <Route exact path="/feedback" element={<Feedback />} />
                    </Routes>
                </Box>
            }

            </div>
    )
}
