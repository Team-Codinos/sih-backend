const router = require("express").Router();
const state_wise_dropout = require("../../model/dropout/state_wise_drop_out");

router.post("/", async (req, res) => {
    console.log("POST -->/state-data/dropout");

    // SET DEFAULTS
    const year = req.body.year || 2000;

    try {
        const queryResult = await state_wise_dropout.find({ year: year });
        const resultMap = {};

        queryResult.forEach((obj) => {
            resultMap[obj.State] = {
                boys: obj.BOYS,
                girls: obj.GIRLS
            };
        });

        if (resultMap)
            return res.status(200).json(resultMap);
        else
            return res.status(404).json({ error: "data not found" });

    } catch (error) {
        return res.status(500).json({ error: "database error" });
    }
});

module.exports = router; 