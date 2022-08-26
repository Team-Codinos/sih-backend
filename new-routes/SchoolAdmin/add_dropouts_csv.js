const verifyJWT = require("../../verifyJWT");
const multer = require("multer");
const path = require("path");
const filerequest = require("../../model/FileRequest/filerequest");
const jwt = require("jsonwebtoken");
const csvtojson = require("csvtojson");
const fs = require("fs");
const Student = require("../../model/Student/Student");
const dropout = require("../../model/DropOuts/dropout");

const router = require("express").Router();

let fileName = "";

function deleteFile() {
  const fileLocation = path.join(__dirname, `uploads/${fileName}`);

  fs.unlink(fileLocation, (err) => {
    if (err) throw err;

    console.log(`Deleted ${fileName} from uploads`);
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    fileName = file.originalname;
    cb(null, fileName);
  },
});

function verifyObj(obj) {
  if (obj["student_id"] && obj["year"]) return true;
  else return false;
}

const upload = multer({ storage });

router.options("/", (req, res) => {
  res.send("hehe");
});

router.post("/", verifyJWT, upload.single("file"), async (req, res) => {
  console.log(req.file.originalname);
  if (!req.file && !req.file.originalname) {
    return res.status(400).json({ error: "file not found" });
  }

  if (!req.file.originalname.endsWith(".csv")) {
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
    deleteFile(); // To delete the CSV-file that was received from client

    return res.status(401).json({ error: "invald headers" });
  }

  csvdata.forEach(async (obj) => {
    console.log(obj);
    const a = new dropout({
      student_id:obj.student_id,
      // _id:obj._id,
      year:obj.year
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
    message: `Inserted ${csvdata.length} rows in dropouts collection `,
  });
});

module.exports = router;
