const verifyJWT = require("../../verifyJWT");
const multer = require('multer');
const path = require('path');
const filerequest = require("../../model/FileRequest/filerequest");
const jwt=require('jsonwebtoken');
const csvtojson = require("csvtojson");
const fs = require("fs");
const Student = require("../../model/Student/Student");

const router = require("express").Router();

let fileName = "";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    fileName = file.originalname;
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

function verifyObj(obj) {
    if (
      obj["past_marks"] &&
      obj["school_id"] &&
      obj["standard"] &&
      obj["name"]
    )
      return true;
    else return false;
  }
  

const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
    console.log(req);
    if(!req.file && !req.file.filename)
        return res.status(400).json({"error":"file not found"});

  if (!req.file.filename.endsWith(".csv")) {
    // deleteFile(); // To delete the CSV-file that was received from client

    return res.status(401).json({ error: "file type unsupported" });
  }

  let decoded = jwt.decode(req.headers["auth-token"], { complete: true });
  let payload = decoded.payload;

  if (!payload) return res.send("nope");

  let from_id = payload["id"];

  //convert that csv to json
  let csvdata = await csvtojson().fromFile(req.file.path);
  console.log(csvdata);

  //verify the csv structure by verifying one instance of that json
  if (!verifyObj(csvdata[0])) {
    // deleteFile(); // To delete the CSV-file that was received from client

    return res.status(401).json({ error: "invald headers" });
  }

  csvdata.forEach(async (obj) => {
    console.log(obj);
    const a = new Student({
      name: obj.name,
      past_marks: obj.past_marks,
      school_ids: [obj.school_id],
      standard: obj.standard,
      approval: false,
    });
    try {
      const result = await a.save();
    } catch (error) {
      return res
        .status(500)
        .json({ error: `DB Insert fail ${error.toString()}` });
    }
  });

  const FileRequest = new filerequest({
    file_path: req.file.path,
    from_id: from_id,
  });

  await FileRequest.save();

  return res.json({
    message: `Inserted ${csvdata.length} rows in collection`,
  });
});

module.exports = router;
