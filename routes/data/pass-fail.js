const router = require("express").Router();
const pass_fail_rates = require("../../model/pass-fail/pass_fail_rates");
const state_wise_pass_fail_rates = require("../../model/pass-fail/state_wise_pass_fail_rates");


router.post("/", async (req, res) => {
  console.log("POST --> /pass-fail");

  //SET DEFAULTS
  req.body.from = req.body.from != null ? req.body.from : 2000;
  req.body.to = req.body.to != null ? req.body.to : 2022;
  req.body.standard = req.body.standard != null ? req.body.standard : "PRIM";

  //IF STATE IS NULL IT DEFAULTS TO NATIONAL LEVEL STATS
  let queryResult = null;

  if (req.body.state) {
    // STATE-WISE DATA

    try {
      queryResult = await state_wise_pass_fail_rates.find({
        State: req.body.state,
        year: { $gte: req.body.from, $lte: req.body.to },
        STANDARD: req.body.standard,
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Database error" });
    }
  } else {
    // NATION-WISE DATA

    try {
      queryResult = await pass_fail_rates.find({
        year: { $gte: req.body.from, $lte: req.body.to },
        STANDARD: req.body.standard,
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
    return res.status(404).json({ error: "Result not found" });
  }
});

module.exports = router;
