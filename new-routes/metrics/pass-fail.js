const Student = require('../../model/Student/Student');

const router=require('express').Router();


router.post('/pass-rate',async(req,res)=>{
    
    let p=0;
        let s=0;
        let t=0;
        let tot=0;
        
    try {
        let p=0;
        let s=0;
        let t=0;
        let tot=0;
        
        const queryResults=await Student.find();
        
        queryResults.forEach((obj)=>{
            if(obj.standard>1 && obj.standard<5)
                p=p+1;
            else if(obj.standard>6 && obj.standard<10)
                s=s+1;
            else
                t=t+1;
        });

        tot+=1;

    } catch (error) {
        res.status(400).json({ message: "nope" });

    }
    let results={
        "primary":(p/tot)*100,
        "secondary":(s/tot)*100,
        "teritiary":(t/tot)*100
    }
    return res.json(results);
});



module.exports=router;