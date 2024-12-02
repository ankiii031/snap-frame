const express=require('express');
const router=express.Router();
// const multer = require('multer')
const upload = require('../Middleware/upload'); // Adjust the path as necessary
const middleware = require('../Middleware/middleware'); // Adjust the path as necessary



const {CategoryInsert,GetCategory,DeleteCategory,UpdateCategory}=require('../AdminController/Category');
const {UpdateBookingRequest}=require('../AdminController/BookingRequestController');
const {AdminLogin}=require('../AdminController/LoginController');
const GetAllDashboardDetails=require('../AdminController/DashboardController')
const {PortfolioInsert,GetPortfolioDetails,GetUserPortfolioDetails,DeleteUserPortfolioDetails,PortfolioUpdate}=require('../AdminController/PortfolioController');


//login
router.post('/logins', AdminLogin);


//Category
router.post('/insertcategory', upload.single('image'),CategoryInsert);
router.get('/getcategory', GetCategory);
router.delete('/deleteCategory/:id', DeleteCategory);
router.put('/updateCategory/:id', upload.single('image'),UpdateCategory);



//BookingRequest
router.put('/updateRequest/:id',UpdateBookingRequest);


router.get('/getAllDashboardDetails',GetAllDashboardDetails);

//Upload Portfolio
router.post('/uploadPortfolio',upload.any(),PortfolioInsert);
router.get('/getPortfolio',GetPortfolioDetails);
router.get('/getUserPortfolio',GetUserPortfolioDetails);
router.delete('/deletePortfolio/:id',DeleteUserPortfolioDetails);
router.put('/updatePortfolio',upload.any(),PortfolioUpdate);


module.exports=router;
