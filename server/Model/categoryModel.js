const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", CategorySchema);
