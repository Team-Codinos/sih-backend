const router = require('express').Router();
const caste_wise = require("../../model/castewise/caste");

router.post("/", async (req, res) => {
    console.log("POST --> caste wise data");

    const year = req.body.year || 2000;

    try {
        const queryResult = await caste_wise.find({ year: year });
        const standardsMap = {};

        standardsMap["primary"] = {};
        standardsMap["secondary"] = {};
        standardsMap["technical"] = {};

        queryResult.forEach((obj) => {
            standardsMap[obj.standard][obj.state] = {
                OC: obj.oc,
                OBC: obj.obc,
                'SC/ST': obj['sc/st'],
                YEAR: obj.year
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