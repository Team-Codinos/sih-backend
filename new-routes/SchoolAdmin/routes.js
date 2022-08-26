const router=require('express').Router();
const loginRoute=require('./login');
const AddStudentRoute =require('./add_student');
const dropStudentRouteCSV=require('./add_dropouts_csv');
const AddStudentCSVRoute=require('./add_student_csv');

router.use('/login',loginRoute);
router.use('/add-student',AddStudentRoute);
router.use('/drop-student-csv',dropStudentRouteCSV);
router.use('/add-student-csv',AddStudentCSVRoute);


module.exports=router;