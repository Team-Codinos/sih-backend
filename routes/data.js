const router = require("express").Router();

//ROUTE IMPORTS
const passFailRoute = require('./data/pass-fail');
const literacyRoute=require('./data/literacy');



//ASSIGNING APPROPRIATE ROUTES
router.use("/pass-fail",passFailRoute);
router.use("/literacy-rate",literacyRoute);

module.exports = router;
