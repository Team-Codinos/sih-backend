const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const School = new Schema({
    
    students:{
        type:[String]
    },
    State:{
        type:String
    },
    name:{
        type:String
    }
});

module.exports = mongoose.model('School', Administrator ,'Schools');









