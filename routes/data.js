const router = require("express").Router();

//ROUTE IMPORTS
const passFailRoute = require('./data/pass-fail');
const literacyRoute = require('./data/literacy');
const dropoutRoute = require('./data/dropouts_route');
const primaryEnrollmentRoute = require('./data/primary_enrollment');



//ASSIGNING APPROPRIATE ROUTES
router.use("/pass-fail-rate", passFailRoute);
router.use("/literacy-rate", literacyRoute);
router.use("/dropout-rate", dropoutRoute);
router.use("/primary-enrollment-rate", primaryEnrollmentRoute);


module.exports = router;
