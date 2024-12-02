const PortfolioSchema=require('../Model/PortfolioModel')



const PortfolioInsert=async(req,res)=>{
    try{
        console.log(req.body,'insert')
        const {title,place,description,event_date}=req.body;

        const img=req.files.map((i)=>i.filename)

        console.log(img,8888)

        const BookingInfo=new PortfolioSchema({title,place,description,event_date,image:img});
        const BookingInfoSaved=await BookingInfo.save();
        res.send(BookingInfoSaved);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal some error occured");
    }
}
const PortfolioUpdate = async (req, res) => {
    try {
        const { _id, title, place, description, event_date } = req.body;
        let img = [];
      

        // Check if new files are uploaded
        if (req.files && req.files.length > 0) {
            img = req.files.map((file) => file.filename);
        }else{
            img = req.body.image;
        }

        // Update the portfolio document
        const updatedPortfolio = await PortfolioSchema.findOneAndUpdate(
            { _id },
            { title, place, description, event_date, image: img },
            { new: true }
        );

        if (!updatedPortfolio) {
            return res.status(404).send("Portfolio not found");
        }

        res.send(updatedPortfolio);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
};




const GetPortfolioDetails = async (req, res) => {
    try {
        const PortfolioInfo= await PortfolioSchema.find();
        console.log(PortfolioInfo)
        res.send(PortfolioInfo);
    } catch (error) {   
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}
const GetUserPortfolioDetails = async (req, res) => {
    try {
        const PortfolioInfo= await PortfolioSchema.find({user_id:req.user});
        console.log(PortfolioInfo)
        res.send(PortfolioInfo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}



const DeleteUserPortfolioDetails =  async (req, res)=> {
    try{
        let PortfolioInfo = await PortfolioSchema.findById(req.params.id);
        if (!PortfolioInfo) {
            return res.status(404).send("Not Found");
        }
        PortfolioInfo = await PortfolioSchema.findByIdAndDelete(req.params.id)
        res.json({ "Success": "PortfolioInfo deleted successfully", PortfolioInfo : PortfolioInfo });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}


const bookingPayment =  async (req,res)=>{
    try{

        const {transactionid}=req.body;

        // const img=req.file.filename;

        const newBooking = {};
        if (transactionid) { newBooking.transactionid = transactionid };
        if (transactionid) { newBooking.paymentStatus = 'paid' };
        
        let newData = await PortfolioSchema.findById(req.params.id);
        if (!newData) {
            return res.status(404).send("Not Found");
        }

        console.log(newBooking,'newGuide')

        newData = await PortfolioSchema.findByIdAndUpdate(req.params.id,{
        $set: newBooking }, { new: true })
        res.json({ newData});

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}







module.exports={PortfolioInsert,GetPortfolioDetails,GetUserPortfolioDetails,DeleteUserPortfolioDetails,bookingPayment,PortfolioUpdate};