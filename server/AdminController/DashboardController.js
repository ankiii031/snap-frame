const BookingSchema=require('../Model/BookingModel')
const CategorySchema=require('../Model/categoryModel')
const ServiceSchema = require("../Model/service");




const GetAllDashboardDetails = async (req, res) => {
    try {
        const BookingInfo= await BookingSchema.find();
        const CategoryInfoInfo= await CategorySchema.find();
        const ServiceInfo= await ServiceSchema.find();


        const pendingBooking = BookingInfo.filter((i)=>i.status === 'pending');
        const confirmedBooking = BookingInfo.filter((i)=>i.status === 'confirmed');
        const declinedBooking = BookingInfo.filter((i)=>i.status === 'declined');


        const allData = [
            {
                Booking: BookingInfo.length,
                Category: CategoryInfoInfo.length,
                Service: ServiceInfo.length,
                pendingBooking:pendingBooking.length,
                confirmedBooking: confirmedBooking.length,
                declinedBooking: declinedBooking.length,
            },
         
        ]

        
        console.log(declinedBooking,909)
        // console.log(CategoryInfoInfo)
        // console.log(GuideInfo)
        // console.log(BookingInfo)
        res.send(allData);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}

module.exports=GetAllDashboardDetails