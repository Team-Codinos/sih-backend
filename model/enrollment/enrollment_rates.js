const mongoose = require('mongoose');

const enrollment_rates = new mongoose.Schema({
    state: {
        type: String
    },
    year: {
        type: Number
    },
    boys: {
        type: Number
    },
    girls: {
        type: Number
    },
    standard: {
        type: String
    }
},);

module.exports = mongoose.model('enrollment_rates', enrollment_rates, 'enrollment_rates');