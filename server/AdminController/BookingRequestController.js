const BookingSchema=require('../Model/BookingModel')


const UpdateBookingRequest =  async (req,res)=>{
    try{

        const {status}=req.body;

        // const img=req.file.filename;

        const newBooking = {};
        if (status) { newBooking.status = status };
        
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
        res.status(500).send("Internal Some Error ouccured");
    }
}

module.exports={UpdateBookingRequest}