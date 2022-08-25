const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name:{
        type:String
    },
    past_marks: {
        type: Number
    }, 
    school_id: {
        type: String
    },
    standard: {
        type: Number,
    },
    approval:{
        type:Boolean,
        default:false    
    }

});

module.exports = mongoose.model('Student', StudentSchema ,'Students');









