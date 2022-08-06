const router = require("express").Router();
const state_wise_literacy = require("../../model/literacy_rate/state_wise_literacy_rate");

router.post('/', async (req, res) => {
    const year = req.body.year || 2000;

    try {
        const queryResult = await state_wise_literacy.find({ year: year });
        const resultMap = {};

        queryResult.forEach((obj) => {
            resultMap[obj.State] = {
                boys: obj.BOYS,
                girls: obj.GIRLS
            };
        });

        return res.status(200).json(resultMap);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Database error" })
    }

});

module.exports = router;