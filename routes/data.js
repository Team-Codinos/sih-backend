const router = require("express").Router();
const verifyJWT = require("../verifyJWT");
const state_wise_pass_fail_rates = require("../model/state_wise_pass_fail_rates");
const pass_fail_rates = require("../model/pass_fail_rates");

router.get("/pass-fail", async (req, res) => {
  console.log("GET --> /pass-fail");

  // SET DEFAULTS
  req.query.from = req.query.from != null ? req.query.from : 2000;
  req.query.to = req.query.to != null ? req.query.to : 2022;
  req.query.standard = req.query.standard != null ? req.query.standard : "PRIM";

  // IF STATE IS NULL IT DEFAULTS TO NATIONAL LEVEL STATS
  let queryResult = null;

  if (req.query.state) {
    // STATE-WISE DATA
    try {
      queryResult = await state_wise_pass_fail_rates.find({
        State: req.query.state,
        year: { $gte: req.query.from, $lte: req.query.to },
        STANDARD: req.query.standard,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error: "Database error" });
    }

  } else {
    // NATION-WISE DATA
    try {
      queryResult = await pass_fail_rates.find({
        year: { $gte: req.query.from, $lte: req.query.to },
        STANDARD: req.query.standard,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error: "Database error" });
    }
  }

  if (queryResult) {
    let boys = [];
    let girls = [];

    queryResult.forEach((obj) => {
      boys.push(obj.BOYS);
      girls.push(obj.GIRLS);
    });

    return res.status(200).json({
      boys: boys,
      girls: girls,
    });

  } else {
    return res.status(404).json({ error: "Data not found" });
  }
});

module.exports = router;