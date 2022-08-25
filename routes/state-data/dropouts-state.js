const router = require("express").Router();
const state_wise_dropout = require("../../model/old/dropout/state_wise_drop_out");

router.post("/", async (req, res) => {
    console.log("POST -->/state-data/dropout");

    // SET DEFAULTS
    const year = req.body.year || 2000;

    try {
        const queryResult = await state_wise_dropout.find({ year: year });
        const standardsMap = {};

        standardsMap["prim"] = {};
        standardsMap["second"] = {};
        standardsMap["tech"] = {};

        queryResult.forEach((obj) => {
            standardsMap[obj.standard][obj.state] = {
                boys: obj.boys,
                girls: obj.girls,
                year: obj.year
            };
        });

        return res.status(200).json(standardsMap);

    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router; 