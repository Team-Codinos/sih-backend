const Student = require("../../model/Student/Student");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const jwt = require("../../verifyJWT");
const requesti = require("../../model/Request/requesti");
const dropout = require("../../model/DropOuts/dropout");

function verifyObj(obj) {
  if (
    obj["past_marks"] &&
    obj["school_id"] &&
    obj["standard"] &&
    onj["approval"]
  )
    return true;
  else return false;
}
let fileName = "";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    fileName = file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

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
    const request = new requesti({
      student_id: newstudent._id,
      from_id: from_id,
    });
    await newstudent.save();
    await request.save();
    res.json(newstudent);
  } catch (error) {
    res.json({ Error: `${error.toString()}` });
  }
});

router.post("/add-student-csv", upload.single("file"), async (req, res) => {
  if (!req.file.filename.endsWith(".json")) {
    deleteFile(); // To delete the CSV-file that was received from client

    return res.status(401).json({ error: "file type unsupported" });
  }

  //get the model for the given route
  const modell = Student;

  //convert that csv to json
  let csvdata = await csvtojson().fromFile(req.file.path);
  console.log(csvdata);

  //verify the csv structure by verifying one instance of that json
  if (!verifyObj(csvdata[0])) {
    deleteFile(); // To delete the CSV-file that was received from client

    return res.status(401).json({ error: "invald headers" });
  }

  csvdata.forEach(async (obj) => {
    const a = new modell({
      past_marks: obj.year,
      school_id: obj.state,
      standard: obj.boys,
    });
    try {
      const result = await a.save();
    } catch (error) {
      return res
        .status(500)
        .json({ error: `DB Insert fail ${error.toString()}` });
    }
  });

  // To delete the CSV-file that was received from client
  deleteFile();

  return res.json({
    message: `Inserted ${csvdata.length} rows in ${req.params.route} collection`,
  });
});

module.exports = router;
