const router = require("express").Router();

//ROUTE IMPORTS
const passFailRoute = require('./data/pass-fail');
const literacyRoute = require('./data/literacy');
const dropoutRouter = require('./data/dropouts_route');
const primaryEnrollmentRouter = require('./data/primary_enrollment');



//ASSIGNING APPROPRIATE ROUTES
router.use("/pass-fail", passFailRoute);
router.use("/literacy-rate", literacyRoute);
router.use("/dropouts", dropoutRouter);
router.use("/primary-enrollment", primaryEnrollmentRouter);


module.exports = router;
