const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: Number,
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
    b_date: {
      type: Date,
    },
    message: {
      type: String,
    },
    paid_amount:{
        type:Number,
    },
    transactionid:{
        type:String,
    },
    status: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", BookingSchema);
