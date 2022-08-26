const router=require('express').Router();
const loginRoute=require('./login');
const registerRoute = require('./register');
const AddStudentRoute =require('./add_student');
const dropStudentRoute=require('./dropstudent');
const AddStudentCSVRoute=require('./add_student_csv');

router.use('/login',loginRoute);
router.use('/register',registerRoute);
router.use('/add-student',AddStudentRoute);
router.use('/drop-student',dropStudentRoute);
router.use('/add-student-csv',AddStudentCSVRoute);

module.exports=router;