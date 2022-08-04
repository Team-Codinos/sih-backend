const express = require('express');
const app=express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Route imports
const authRoute = require('./routes/auth');
// const postRoute= require('./routes/posts');

dotenv.config();

//mongo connect
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},()=>{console.log("Mongo Connection Success");});



//global middlewares

app.use(express.json());

//route middleware
app.use('/auth',authRoute);







app.listen(6905,()=>{console.log("The server is listening on 6905");});

