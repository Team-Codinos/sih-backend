const mongoose = require("mongoose");

const total_literacy_rate = new mongoose.Schema(
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

module.exports = mongoose.model("total_literacy_rate",total_literacy_rate,'total_literacy_rate');
