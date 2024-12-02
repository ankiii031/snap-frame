const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema(
  {
    
    a_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"admin"
  },
    title: {
      type: String,
    },

    description: {
      type: String,
    },

    place: {
      type: String,
    },

    event_date: {
      type: Date,
    },

    status: {
      type: String,
    },
    image: []
    
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("portfolio", PortfolioSchema);
