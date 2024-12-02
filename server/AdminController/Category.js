const CategorySchema=require('../Model/categoryModel')



const CategoryInsert=async(req,res)=>{
    try{
        console.log(req.body,'insert')
        const {title,subtitle}=req.body;

        const img=req.file.filename;

        const CategoryInfo=new CategorySchema({title,subtitle,image:img});
        const CategorySaved=await CategoryInfo.save();
        res.send(CategorySaved);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal some error occured");
    }
}

const GetCategory = async (req, res) => {
    try {
        const CategoryInfo= await CategorySchema.find();
        console.log(CategoryInfo)
        res.send(CategoryInfo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}



const DeleteCategory =  async (req, res)=> {
    try{
        let CategoryInfo = await CategorySchema.findById(req.params.id);
        if (!CategoryInfo) {
            return res.status(404).send("Not Found");
        }
        CategoryInfo = await CategorySchema.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Category deleted successfully", Category : Category });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}


const UpdateCategory =  async (req,res)=>{
    try{

        const {title,subtitle}=req.body;
        // const img=req.file.filename;

        const newCategory = {};
        if (title) { newCategory.title = title };
        if (subtitle) { newCategory.subtitle = subtitle };
        if (req.file) { newCategory.image = req.file.filename };
    
        let newData = await CategorySchema.findById(req.params.id);
        if (!newData) {
            return res.status(404).send("Not Found");
        }

        console.log(newCategory,'newCategory')

        newData = await CategorySchema.findByIdAndUpdate(req.params.id,{
        $set: newCategory }, { new: true })
        res.json({ newData});

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}




module.exports={CategoryInsert,GetCategory,DeleteCategory,UpdateCategory};