const dropout = require("../../model/DropOuts/dropout");

const router = require("express").Router();

router.post("/", async (req, res) => {
    let results = {};
    let d=0;
  try {
    const DropOuts = await dropout.find();
    DropOuts.forEach((obj) => {
      d=d+1;
      if (results[obj.year]) {
        results[obj.year].push(obj.student_id);
      } else {
        results[obj.year] = [obj.student_id];
      }
    });
  } catch (error) {
    res.status(400).json({ message: "nope" });
  }
  res["count"]=d;
  res.status(200).json(results);
});

router.post('/drop',async(req,res)=>{

  try {
    const drop_items=await new dropout({
      student_id:req.body.student_id,
      year:req.body.year
    }).save();

  } catch (error) {
    res.status(400).json({ message: "nope" });

  }

  res.status(200).json({"message":"hehe dropped"});

});

module.exports = router;
