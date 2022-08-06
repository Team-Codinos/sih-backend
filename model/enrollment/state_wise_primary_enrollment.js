const mongoose = require('mongoose');

const state_wise_primary_enrollment=new mongoose.Schema({
    State:{
        type:String
    },
    Total:{
        type:Number
    },
    Boys:{
        type:Number
    },
    Girls:{
        type:Number
    }
},);

module.exports=mongoose.model('state_wise_primary_enrollment',state_wise_primary_enrollment,'state_wise_primary_enrollment');