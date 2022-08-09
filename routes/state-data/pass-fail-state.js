const router = require("express").Router();
const state_wise_pass_fail = require("../../model/pass-fail/state_wise_pass_fail_rates");

router.post('/', async (req, res) => {
    const year = req.body.year || 2000;

    try {
        const queryResult = await state_wise_pass_fail.find({ year: year });
        const resultMap = {};

        queryResult.forEach((obj) => {
            resultMap[obj.state] = {
                boys: obj.boys,
                girls: obj.girls
            };
        });

        return res.status(200).json(resultMap);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Database error" })
    }
});

module.exports = router;