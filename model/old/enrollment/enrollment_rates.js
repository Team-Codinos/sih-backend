const mongoose = require('mongoose');

const enrollment_rates = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
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
    standard: {
        type: String,
        required: true
    }
},);

module.exports = mongoose.model('enrollment_rates', enrollment_rates, 'enrollment_rates');