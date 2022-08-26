const router=require('express').Router();
const loginRoute=require('./login');
const registerRoute = require('./register');
const create_school_admin=require('./create_school_admin');
const get_requests=require('./get_requests');

router.use('/login',loginRoute);
router.use('/register',registerRoute);
router.use('/create-school-admin',create_school_admin);
router.use('/get-requests',get_requests);


module.exports=router;