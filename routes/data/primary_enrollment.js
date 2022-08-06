const router = require("express").Router();
const primary_enrollment = require("../../model/enrollment/state_wise_primary_enrollment");

router.post('/', async (req, res) => {
    console.log("POST --> /pass-fail");

    const state = req.body.state;
    console.log(state);

    let queryResult = null;

    if (state) {
        // STATE-WISE DATA
        try {
            queryResult = await primary_enrollment.find({
                State: state
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Database error" });
        }
    }
    else {
        // NATION-WISE DATA
        try {
            queryResult = await primary_enrollment.find();

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Database error" });
        }
    }

    if (queryResult) {
        let boys = [];
        let girls = [];
        let totalResult = [];

        queryResult.forEach((object) => {
            boys.push(object.Boys);
            girls.push(object.Girls);
            totalResult.push(object.Total);
        });

        return res.status(200).json({
            boys: boys,
            girls: girls,
            total: totalResult
        });

    }
    else {
        return res.status(404).json({ error: "Result not found" });
    }
});

module.exports = router;