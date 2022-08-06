const router = require("express").Router();
const verifyJWT = require("../verifyJWT");
const state_wise_pass_fail_rates = require("../model/pass-fail/state_wise_pass_fail_rates");
const pass_fail_rates = require("../model/pass-fail/pass_fail_rates");

router.get("/pass-fail", async (req, res) => {
  console.log("GET --> /pass-fail");
  //SET DEFAULTS
  req.body.from = req.body.from != null ? req.body.from : 2000;
  req.body.to = req.body.to != null ? req.body.to : 2022;
  req.body.standard = req.body.standard != null ? req.body.standard : "PRIM";
  //IF STATE IS NULL IT DEFAULTS TO NATIONAL LEVEL STATS
  let queryResult = null;
  if (req.body.state) {
    try {
      queryResult = await state_wise_pass_fail_rates.find({
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
      queryResult = await pass_fail_rates.find({
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

module.exports = router;
