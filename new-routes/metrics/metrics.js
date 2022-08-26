const router=require('express').Router();
const dropoutRoute=require('./dropout');
const passRateRoute = require('./pass-fail');



router.use('/drop-out',dropoutRoute);
router.use('/pass-rate',passRateRoute);



module.exports=router;