const express=require('express');
const router=express.Router();
// const multer = require('multer')
const upload = require('../Middleware/upload'); // Adjust the path as necessary


const {ServiceInsert,GetService,DeleteServiceInfo,UpdateCategory,GetSingleService,GetcategoryService,UpdateService}=require('../AdminController/Service');


//Category
router.post('/insertService', upload.any(),ServiceInsert);
router.get('/getService',GetService);
router.get('/getcategoryService/:id',GetcategoryService);
router.get('/getSingleService/:id',GetSingleService);
router.delete('/deleteService/:id',DeleteServiceInfo);
router.put('/updateService/:id', upload.single('image'),UpdateService);




module.exports=router;
