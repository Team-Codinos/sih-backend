const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DropOutSchema = new Schema({
    student_id:{
        type:String
    },
    year:{
        type:Number,
    },
    
});

module.exports = mongoose.model('DropOuts', DropOutSchema,'dropouts' );









