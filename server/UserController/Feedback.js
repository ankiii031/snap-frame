const FeedbackSchema=require('../Model/FeedbackModel')



const FeedbackInsert=async(req,res)=>{
    try{
        console.log(req.body,'insert')
        const {serviceId,name,email,message}=req.body;


        const FeedbackInfo=new FeedbackSchema({s_id:serviceId,name,email,message,user_id:req.user});
        const FeedbackInfoSaved=await FeedbackInfo.save();
        res.send(FeedbackInfoSaved);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal some error occured");
    }
}


const GetAllFeedbackDetails = async (req, res) => {
    try {
        const FeedbackInfo= await FeedbackSchema.find().populate('user_id').populate('s_id').populate({
            path: 's_id',
            populate: { path: 'category' }
        });
        console.log(FeedbackInfo)
        res.send(FeedbackInfo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}

module.exports={FeedbackInsert,GetAllFeedbackDetails}