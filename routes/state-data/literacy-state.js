const router = require("express").Router();
const state_wise_literacy = require("../../model/literacy_rate/state_wise_literacy_rate");

router.post('/', async (req, res) => {
    const year = req.body.year || 2000;

    try {
        const queryResult = await state_wise_literacy.find({ year: year });
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
        console.log(error);
        res.status(500).json({ error: "Database error" })
    }

});

module.exports = router;

function getNumber() {
    const min = 91.2644125782364158;
    const max = 99.8647952136484942;

    return (Math.random() * (max - min) + min);
}