const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(
  cors({
    origin:"*",
    exposedHeaders: ["auth-token"],
  })
);

// Route imports
const authRoute = require("./routes/auth");
const historicDataRoute = require(`./routes/historic-data/historic_data`);
const stateDataRoute = require("./routes/state-data/state_data");
const uploadcsvRoute=require('./routes/upload_csv/upload_csv');
const staticRoute = require('./routes/static/static');

dotenv.config();

//mongo connect
mongoose.connect("mongodb+srv://sahil:shashi@123@hack.4lz7k.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true }, () => {
  console.log("Mongo Connection Success");
});

// Global middlewares
app.use(express.json());

// Route middleware
app.use("/auth", authRoute);
app.use("/historic-data", historicDataRoute);
app.use("/state-data", stateDataRoute);
app.use("/upload-csv",uploadcsvRoute)
app.use("/static",staticRoute)


app.get("/", (req, res) => {
  res.send("Hoiiii");
});

app.listen(parseInt(process.env.PORT), () => {
  console.log(`The server is listening on ${process.env.PORT}`);
});


app.get('/*',(req,res)=>{});