const mongoose = require('mongoose');

const state_wise_pass_fail_rates = new mongoose.Schema({
    year: {
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
    },
    boys: {
        type: Number,
        required: true
    },
    girls: {
        type: Number,
        required: true
    }
},);

module.exports = mongoose.model('state_wise_pass_fail_rates', state_wise_pass_fail_rates, 'state_wise_pass_fail_rates');