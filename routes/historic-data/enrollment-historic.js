const router = require("express").Router();
const enrollment_rates = require("../../model/enrollment/enrollment_rates");

router.post("/", async (req, res) => {
    console.log("POST --> /historic-data/enrollment-rate");

    const fromYear = req.body.from || 2022;
    const toYear = req.body.to || 2022;
    const standard = req.body.standard || "prim";
    const state = req.body.state || "Telangana";

    try {
        const queryResult = await enrollment_rates.find({
            state: state,
            year: { $gte: fromYear, $lte: toYear },
            standard: standard
        });

        if (queryResult) {
            let boys = [];
            let girls = [];

            console.log(queryResult);

            queryResult.forEach(obj => {
                boys.push(obj.boys);
                girls.push(obj.girls);
            });

            res.status(200).json({
                "boys": boys,
                "girls": girls
            });
        } else {
            res.status(404).json({ error: "Data not found" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;