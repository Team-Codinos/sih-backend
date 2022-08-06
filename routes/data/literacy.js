const router = require("express").Router();
const state_wise_literacy_rate = require("../../model/literacy_rate/state_wise_literacy_rate");
const total_literacy_rate = require("../../model/literacy_rate/total_literacy_rate");


router.post("/", async (req, res) => {
    console.log("POST --> /pass-fail");
    //SET DEFAULTS
    req.body.from = req.body.from != null ? req.body.from : 2000;
    req.body.to = req.body.to != null ? req.body.to : 2022;
    req.body.standard = req.body.standard != null ? req.body.standard : "PRIM";
    //IF STATE IS NULL IT DEFAULTS TO NATIONAL LEVEL STATS
    let queryResult = null;
    if (req.body.state) {
      try {
        queryResult = await state_wise_literacy_rate.find({
          State: req.body.state,
          year: { $gte: req.body.from, $lte: req.body.to },
          STANDARD: req.body.standard,
        });
      } catch (error) {
        console.log(error);
        return res.send("DB error");
      }
    } else {
      try {
        queryResult = await total_literacy_rate.find({
          year: { $gte: req.body.from, $lte: req.body.to },
          STANDARD: req.body.standard,
        });
      } catch (error) {
        console.log(error);
        return res.send("DB error");
      }
    }
    if (queryResult) {
      let boys = [];
      let girls = [];
      queryResult.forEach((obj) => {
        boys.push(obj.BOYS);
        girls.push(obj.GIRLS);
      });
      
  
      return res.json({
        boys: boys,
        girls: girls,
      });
    } else {
      return res.send("Result not found");
    }
  });
  
module.exports=router;