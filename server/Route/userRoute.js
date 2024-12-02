

const express=require('express');
const router=express.Router();
const middleware = require('../Middleware/middleware'); // Adjust the path as necessary
const upload = require('../Middleware/upload'); // Adjust the path as necessary



const {UserRegister,UserLogin,GetOneUser,GetUser,DeleteUser} =require('../UserController/RegisterLogin');
const {BookingInsert,GetBookingDetails,bookingPayment,GetAllBookingDetails}=require('../UserController/BookingRequest')
// const {PortfolioInsert,GetPortfolioDetails,GetUserPortfolioDetails,DeleteUserPortfolioDetails}=require('../UserController/PortfolioController')
const {FeedbackInsert,GetAllFeedbackDetails}=require('../UserController/Feedback')

//user register/Login
router.post('/user-register', UserRegister);
router.post('/user-login', UserLogin);
router.get('/get-single-user',middleware,GetOneUser);
router.get('/get-user',GetUser);
router.delete('/deleteUser/:id', DeleteUser);



//Booking
router.post('/booking',middleware,BookingInsert);
router.get('/getAllBookingDetails',GetAllBookingDetails);
router.get('/getBookingDetails',middleware,GetBookingDetails);
router.put('/bookingPayment/:id',middleware,bookingPayment);


//Feedback
router.post('/feedback',middleware,FeedbackInsert);
router.get('/getAllFeedback',GetAllFeedbackDetails);







module.exports=router;
