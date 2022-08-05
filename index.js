const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Route imports
const authRoute = require('./routes/auth');

dotenv.config();

//mongo connect
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => { console.log("Mongo Connection Success"); });


// Global middlewares
app.use(express.json());

// Route middleware
app.use('/auth', authRoute);

app.get('/', (req, res) => {
    res.send("Hoiiii")
});


app.listen(parseInt(process.env.PORT), () => { console.log(`The server is listening on ${process.env.PORT}`); });