const mongoose = require("mongoose");

const state_wise_literacy_rate = new mongoose.Schema(
  {
    year: {
      type: Number,
    },
    BOYS: {
      type: Number,
    },
    GIRLS: {
      type: Number,
    },
    State:{
        type:String
    }
  }
);

module.exports = mongoose.model("state_wise_literacy_rate",state_wise_literacy_rate,'state_wise_literacy_rate');
