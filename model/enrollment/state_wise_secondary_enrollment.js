const mongoose = require('mongoose');

const state_wise_secondary_enrollment=new mongoose.Schema({
    state:{
        type:String
    },
    total:{
        type:Number
    },
    boys:{
        type:Number
    },
    girls:{
        type:Number
    }
},);

module.exports=mongoose.model('state_wise_secondary_enrollment',state_wise_secondary_enrollment,'state_wise_secondary_enrollment');