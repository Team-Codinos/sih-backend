const Student = require("../../model/Student/Student");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const requesti = require("../../model/Request/requesti");
const dropout = require("../../model/DropOuts/dropout");
const filerequest = require("../../model/FileRequest/filerequest");
const verifyJWT = require("../../verifyJWT");
const multer = require('multer');



router.post("/add-student", verifyJWT, async (req, res) => {
  let decoded = jwt.decode(req.headers["auth-token"], { complete: true });
  let payload = decoded.payload;

  if (!payload) res.send("nope");

  let from_id = payload["id"];

  let hehe = await dropout.find({ student_id: req.body.student_id });
  if (hehe) {
    await dropout.findOneAndDelete(
      { student_id: req.body.student_id },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted User : ", docs);
        }
      }
    );
  }

  try {
    const newstudent = new Student({
      past_marks: req.body.past_marks,
      school_id: req.body.school_id,
      standard: req.body.standard,
    });
    await newstudent.save();
    const request = new requesti({
      student_id: newstudent._id,
      from_id: from_id,
    });
    await request.save();
    res.json(newstudent);
  } catch (error) {
    res.json({ Error: `${error.toString()}` });
  }
});


module.exports = router;
