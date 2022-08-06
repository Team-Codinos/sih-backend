const mongoose = require("mongoose");

const total_drop_out = new mongoose.Schema(
  {
    YEAR: {
      type: Number,
    },
    BOYS: {
      type: Number,
    },
    GIRLS: {
      type: Number,
    },
  }
);

module.exports = mongoose.model("total_drop_out",total_drop_out,'total_drop_out');
