const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

// Route imports
const authRoute = require('./routes/auth');
const dataRoute=require(`./routes/data`);

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

app.use('/data',dataRoute);



app.listen(parseInt(process.env.PORT), () => { console.log(`The server is listening on ${process.env.PORT}`); });