const router = require('express').Router();
const enrollment_rates = require("../../model/enrollment/enrollment_rates");

router.post("/", async (req, res) => {
    console.log("POST --> /state-data/enrollment-rate");

    const year = req.body.year || 2000;

    try {
        const queryResult = await enrollment_rates.find({ year: year });
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

        res.status(200).json(standardsMap);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

});

module.exports = router;