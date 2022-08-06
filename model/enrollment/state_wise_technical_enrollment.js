const mongoose = require('mongoose');

const state_wise_technical_enrollment=new mongoose.Schema({
    state:{
        type:String
    },
    total:{
        type:Number
    },
    Boys:{
        type:Number
    },
    girls:{
        type:Number
    }
},);

module.exports=mongoose.model('state_wise_technical_enrollment',state_wise_technical_enrollment,'state_wise_technical_enrollment');