const FavoriteSchema = require('../Model/BookmarkModel')



const AddBookmark=async(req,res)=>{
    try{
        console.log(req.body,'insert')
        const {packageId}=req.body;

        const BookingInfo=new FavoriteSchema({s_id:packageId,user_id:req.user});
        const BookingInfoSaved=await BookingInfo.save();
        res.send(BookingInfoSaved);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal some error occured");
    }
}


const GetBookmark = async (req, res) => {
    try {
        const PostInfo= await FavoriteSchema.find({user_id:req.user}).populate('s_id');
        console.log(PostInfo)
        res.send(PostInfo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}


const DeleteBookmark =  async (req, res)=> {
    try{
        let PostInfo = await FavoriteSchema.findById(req.params.id);
        if (!PostInfo) {
            return res.status(404).send("Not Found");
        }
        PostInfo = await FavoriteSchema.findByIdAndDelete(req.params.id)
        res.json({ "Success": "PostInfo deleted successfully", PostInfo : PostInfo });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}

module.exports={AddBookmark,GetBookmark,DeleteBookmark};