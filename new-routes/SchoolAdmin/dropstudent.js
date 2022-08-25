const dropout = require('../../model/DropOuts/dropout');
const dropout = require('../../model/DropOuts/dropout');
const dropout = require('../../model/DropOuts/dropout');
const Student = require('../../model/Student/Student');

const router=require('express').Router();



router.delete('/drop-out-student', async (req,res)=>{
    // Send year and student_id

    try {
        let id=re.body.id;
        let student=await Student.findById(id);
        student.approval=false;

        let dropout=new dropout({
            student_id:student._id,
            year:req.body.year
        });
        res.json({"message":"done"});
    } catch (error) {
        res.status(400).json({"message":"nope"});

    }
});







module.exports=router;