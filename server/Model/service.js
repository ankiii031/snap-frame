const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    sname: {
      type: String,
    },
    image: {
      type: String,
    },

    a_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin"
    },
   
    description: {
      type: String,
    },
    
    price: {
      type: Number,
    },
    
    status: {
      type: String,
    },
    
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("service", ServiceSchema);
