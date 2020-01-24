const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productname: {
      type: String
    },

    productprice: {
      type: String
    },

    productspecification: {
      type: String
    },

    productratings: {
      type: String
    },

    productimage: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
