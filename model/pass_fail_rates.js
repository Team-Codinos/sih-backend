const mongoose = require("mongoose");
const { collection } = require("./User");

const pass_fail_rates = new mongoose.Schema(
  {
    year: {
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
