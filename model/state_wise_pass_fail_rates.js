const mongoose = require('mongoose');

const state_wise_pass_fail_rates=new mongoose.Schema({
    year:{
        type:Number,
    },
    State:{
        type:String
    },
    STANDARD:{
        type:String
    },
    BOYS:{
        type:Number
    },
    GIRLS:{
        type:Number
    }
},);

module.exports=mongoose.model('state_wise_pass_fail_rates',state_wise_pass_fail_rates,'state_wise_pass_fail_rates');