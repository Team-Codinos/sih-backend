const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Administrator = new Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    
});

module.exports = mongoose.model('Administrator', Administrator ,'Administrator');









