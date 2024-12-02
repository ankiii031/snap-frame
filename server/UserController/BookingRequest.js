const BookingSchema=require('../Model/BookingModel')



const BookingInsert=async(req,res)=>{
    try{
        console.log(req.body,'insert')
        const {serviceId,name,phone,email,shootDate,message}=req.body;


        const BookingInfo=new BookingSchema({s_id:serviceId,name,phone,email,b_date:shootDate,message,status:'pending',paymentStatus:'pending',user_id:req.user,transactionid:''});
        const BookingInfoSaved=await BookingInfo.save();
        res.send(BookingInfoSaved);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal some error occured");
    }
}



const GetBookingDetails = async (req, res) => {
    try {
        const BookingInfo= await BookingSchema.find({user_id:req.user}).populate('user_id').populate('s_id').populate({
            path: 's_id',
            populate: { path: 'category' }
        });
        console.log(BookingInfo)
        res.send(BookingInfo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}

const GetAllBookingDetails = async (req, res) => {
    try {
        const BookingInfo= await BookingSchema.find().populate('user_id').populate('s_id').populate({
            path: 's_id',
            populate: { path: 'category' }
        });
        console.log(BookingInfo)
        res.send(BookingInfo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}



const bookingPayment =  async (req,res)=>{
    try{

        const {transactionid}=req.body;

        // const img=req.file.filename;

        const newBooking = {};
        if (transactionid) { newBooking.transactionid = transactionid };
        if (transactionid) { newBooking.paymentStatus = 'paid' };
        
        let newData = await BookingSchema.findById(req.params.id);
        if (!newData) {
            return res.status(404).send("Not Found");
        }

        console.log(newBooking,'newGuide')

        newData = await BookingSchema.findByIdAndUpdate(req.params.id,{
        $set: newBooking }, { new: true })
        res.json({ newData});

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error occured");
    }
}







module.exports={BookingInsert,GetBookingDetails,bookingPayment,GetAllBookingDetails};