const mongoose = require("mongoose");
const state_wise_drop_out = new mongoose.Schema(
  {
    year: {
      type: Number,
    },
    boys: {
      type: Number,
    },
    girls: {
      type: Number,
    },
    state:{
        type:String
    },
    standard:{
      type:String
    }
  }
);

module.exports = mongoose.model("state_wise_drop_out",state_wise_drop_out,'state_wise_dropout');