const router = require("express").Router();

//ROUTE IMPORTS
const passFailRoute = require('./data/pass-fail');
const literacyRoute=require('./data/literacy');
const dropoutRouter = require('./data/dropouts_route');



//ASSIGNING APPROPRIATE ROUTES
router.use("/pass-fail",passFailRoute);
router.use("/literacy-rate",literacyRoute);
router.use("/dropouts",dropoutRouter);


module.exports = router;
