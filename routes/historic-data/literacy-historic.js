const router = require("express").Router();
const state_wise_literacy_rate = require("../../model/literacy_rate/state_wise_literacy_rate");


router.post("/", async (req, res) => {
  console.log("POST --> /historic-data/literacy-rate");

  //SET DEFAULTS
  req.body.from = req.body.from != null ? req.body.from : 2000;
  req.body.to = req.body.to != null ? req.body.to : 2022;
  req.body.standard = req.body.standard != null ? req.body.standard : "prim";

  //IF STATE IS NULL IT DEFAULTS TO NATIONAL LEVEL STATS
  let queryResult = null;

  if (req.body.state) {
    try {
      queryResult = await state_wise_literacy_rate.find({
        state: req.body.state,
        year: { $gte: req.body.from, $lte: req.body.to },
        standard: req.body.standard,
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Database error" });
    }

  } else {
    try {

      queryResult = await state_wise_literacy_rate.find({
        state:"Telangana",
        year: 2022,
        standard: req.body.standard,
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Database error" });
    }
  }
  console.log(queryResult);
  if (queryResult) {
    let boys = [];
    let girls = [];

    queryResult.forEach((obj) => {
      boys.push(obj.boys);
      girls.push(obj.girls);
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