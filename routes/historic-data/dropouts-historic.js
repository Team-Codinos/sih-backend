const router = require("express").Router();
const state_wise_dropout = require("../../model/dropout/state_wise_drop_out");

router.post("/", async (req, res) => {
    console.log("POST -->/histroic-data/dropout");

    //SET DEFAULTS
    const fromYear = req.body.from || 2000;
    const toYear = req.body.to || 2022;
    const state = req.body.state;

    let queryResult = null;

    if (state) {
        // STATE-WISE DATA
        try {
            queryResult = await state_wise_dropout.find({
                state: state,
                year: { $gte: fromYear, $lte: toYear }
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Databse error" });
        }
    }
    else {
        // NATION-WISE DATA
        try {
            queryResult = await state_wise_dropout.find({
                state:"Telangana",
                year: 2022
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Databse error" });
        }
    }

    if (queryResult) {
        let boys = [];
        let girls = [];

        queryResult.forEach((object) => {
            boys.push(object.boys);
            girls.push(object.girls);
        });

        return res.status(200).json({
            boys: boys,
            girls: girls
        });
    }
    else {
        return res.status(404).json({ error: "Result not found" });
    }

});

module.exports = router; 