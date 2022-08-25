const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolAdmin = new Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    schoolid:{
        type:String
    },
});

module.exports = mongoose.model('SchoolAdmin', SchoolAdmin,'SchoolAdmins' );









