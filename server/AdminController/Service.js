const ServiceSchema = require("../Model/service");

const ServiceInsert = async (req, res) => {
  try {
    // console.log(req.body,'insert')
    const {
      category,
      sname,
      price,
      description,
    } = req.body;



    let image;
    req.files.map((i) => {
      // console.log("test",i);
      if (i.fieldname === "image") {
        image = i.filename;
      }
     
    });



    const ServiceInfo = new ServiceSchema({
      category,
      sname,
      image,
      price,
      description,
  
    });
    const ServiceInfoSaved = await ServiceInfo.save();
    res.send(ServiceInfoSaved);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};


const UpdateService =  async (req,res)=>{
  try{

    const {
      category,
      sname,
      price,
      description,
    } = req.body;

      const newService = {};
      if (sname) { newService.sname = sname };
      if (category) { newService.category = category };
      if (price) { newService.price = price };
      if (description) { newService.description = description };
      if (req.file) { newService.image = req.file.filename };
  
      let newData = await ServiceSchema.findById(req.params.id);
      if (!newData) {
          return res.status(404).send("Not Found");
      }


      newData = await ServiceSchema.findByIdAndUpdate(req.params.id,{
      $set: newService }, { new: true })
      res.json({ newData});

  }
  catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Some Error ouccured");
  }
}

const GetService = async (req, res) => {
  try {
    const ServiceInfo = await ServiceSchema.find().populate('category');
    console.log(ServiceInfo);
    res.send(ServiceInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurred");
  }
};
const GetSingleService = async (req, res) => {
  try {
    const ServiceInfo = await ServiceSchema.findById(req.params.id).populate('category');
    console.log(ServiceInfo);
    res.send(ServiceInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurred");
  }
};
const GetcategoryService = async (req, res) => {
  try {
    const ServiceInfo = await ServiceSchema.find({category:req.params.id}).populate('category');
    console.log(ServiceInfo);
    res.send(ServiceInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurred");
  }
};

const DeleteServiceInfo = async (req, res) => {
  try {
    let ServiceInfo = await ServiceSchema.findById(req.params.id);
    if (!ServiceInfo) {
      return res.status(404).send("Not Found");
    }
    ServiceInfo = await ServiceSchema.findByIdAndDelete(req.params.id);
    res.json({
      Success: "Category deleted successfully",
      GuideInfo: ServiceInfo,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Some Error ouccured");
  }
};

const UpdateGuide = async (req, res) => {
  try {
    const { name, phone, email, description } = req.body;

    // const img=req.file.filename;

    const newGuide = {};
    if (name) {
      newGuide.name = name;
    }
    if (phone) {
      newGuide.phone = phone;
    }
    if (email) {
      newGuide.email = email;
    }
    if (description) {
      newGuide.description = description;
    }
    if (req.file) {
      newGuide.image = req.file.filename;
    }

    let newData = await GuideSchema.findById(req.params.id);
    if (!newData) {
      return res.status(404).send("Not Found");
    }

    console.log(newGuide, "newGuide");

    newData = await GuideSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: newGuide,
      },
      { new: true }
    );
    res.json({ newData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Some Error ouccured");
  }
};

module.exports = { ServiceInsert, GetService, DeleteServiceInfo, UpdateGuide ,GetSingleService,GetcategoryService,UpdateService};
