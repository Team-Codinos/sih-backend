const filerequest = require('../../model/FileRequest/filerequest');
const csvtojson = require('csvtojson');
const Student = require('../../model/Student/Student');
const router=require('express').Router();

router.post('/approve-request',async(req,res)=>{

    const req_ids=req.body.ids;
    

    req_ids.forEach(id => {
        try {
            const result=await filerequest.findById(id);
            result.approved=true;

            let fileResults = await csvtojson().fromFile(result.file_path);
            fileResults.forEach((student)=>{
                const currentstudent=Student.findById(student.id);
                currentstudent.approved=true;
            })

          

        } catch (error) {
            
        }
    });



});





module.exports=router;