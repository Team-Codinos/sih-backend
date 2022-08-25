const router=require('express').Router();
const loginRoute=require('./login');
const registerRoute = require('./register');

router.use('/login',loginRoute);
router.use('/register',registerRoute);




module.exports=router;