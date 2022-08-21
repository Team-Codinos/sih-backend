const router = require('express').Router();
const {gpi , enrollment , dropout , lit,BarDropout ,enroll ,literacy} = require("../constants")


router.post("/dropout", async (req, res) => {
    res.status(200).json(dropout);
});
router.post("/lit", async (req, res) => {
    res.status(200).json(lit);
});
router.post("/enro", async (req, res) => {
    res.status(200).json(enrollment);
});
router.post("/gpi", async (req, res) => {
    res.status(200).json(gpi);
});
router.post("/BarDropout", async (req, res) => {
    res.status(200).json(BarDropout);
});
router.post("/enroll", async (req, res) => {
    res.status(200).json(enroll);
});
router.post("/literacy", async (req, res) => {
    res.status(200).json(literacy);
});

module.exports = router;