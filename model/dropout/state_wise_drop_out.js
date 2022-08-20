const mongoose = require("mongoose");
const state_wise_drop_out = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true
    },
    boys: {
      type: Number,
      required: true
    },
    girls: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    standard: {
      type: String,
      required: true
    }
  }
);

module.exports = mongoose.model("state_wise_drop_out", state_wise_drop_out, 'state_wise_dropout');