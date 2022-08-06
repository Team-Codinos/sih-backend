const router = require("express").Router();

//ROUTE IMPORTS
const passFailRoute = require('./data/pass-fail');
const literacyRoute = require('./data/literacy');
const dropoutRoute = require('./data/dropouts_route');
const primaryEnrollmentRoute = require('./data/primary_enrollment');



//ASSIGNING APPROPRIATE ROUTES
router.use("/pass-fail", passFailRoute);
router.use("/literacy-rate", literacyRoute);
router.use("/dropouts", dropoutRoute);
router.use("/primary-enrollment", primaryEnrollmentRoute);


module.exports = router;
