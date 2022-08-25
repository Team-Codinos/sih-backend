const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CasteSchema = new Schema({
    state: {
        type: String
    },
    year: {
        type: Number
    },
    oc: {
        type: Number
    },
    obc: {
        type: Number
    },
    'sc/st': {
        type: Number
    },
    standard: {
        type: String
    }
});

module.exports = mongoose.model('caste_wise_data', CasteSchema, 'caste_wise_data');









