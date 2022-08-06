const mongoose = require("mongoose");

const pass_fail_rates = new mongoose.Schema(
  {
    YEAR: {
      type: Number,
    },
    STANDARD: {
      type: String,
    },
    BOYS: {
      type: Number,
    },
    GIRLS: {
      type: Number,
    },
  }
);

module.exports = mongoose.model("pass_fail_rates",pass_fail_rates,'pass_fail_rates');