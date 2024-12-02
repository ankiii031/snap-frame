const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    
  
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    s_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"service"
    },
    message: {
      type: String,
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", FeedbackSchema);
