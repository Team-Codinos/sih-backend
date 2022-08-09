const mongoose = require('mongoose');

const state_wise_pass_fail_rates=new mongoose.Schema({
    year:{
        type:Number,
    },
    state:{
        type:String
    },
    standard:{
        type:String
    },
    boys:{
        type:Number
    },
    girls:{
        type:Number
    }
},);

module.exports=mongoose.model('state_wise_pass_fail_rates',state_wise_pass_fail_rates,'state_wise_pass_fail_rates');