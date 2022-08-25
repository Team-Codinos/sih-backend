const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const csvtojson = require("csvtojson");
const fs = require("fs");

const state_wise_drop_out = require("../../model/old/dropout/state_wise_drop_out");
const enrollment_rates = require("../../model/old/enrollment/enrollment_rates");
const state_wise_literacy_rate = require("../../model/old/literacy_rate/state_wise_literacy_rate");
const state_wise_pass_fail_rates = require("../../model/old/pass-fail/state_wise_pass_fail_rates");

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

router.post("/:route", upload.single("abc"), async (req, res) => {
  if (!req.file.filename.endsWith(".csv")) {
    deleteFile(); // To delete the CSV-file that was received from client

    return res.status(401).json({ error: "file type unsupported" });
  }

  //get the model for the given route
  const modell = selectModel(req.params.route);
  if (!modell) {
    deleteFile(); // To delete the CSV-file that was received from client

    return res.status(404).json({ error: "route does not exist" });
  }

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
      year: obj.year,
      state: obj.state,
      boys: obj.boys,
      girls: obj.girls,
      standard: obj.standard,
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

function verifyObj(obj) {
  return (
    obj["year"] &&
    obj["state"] &&
    obj["boys"] &&
    obj["girls"] &&
    obj["standard"]
  );
}

function selectModel(routeName) {
  switch (routeName) {
    case "state_wise_drop_out": {
      return state_wise_drop_out;
    }
    case "enrollment_rate": {
      return enrollment_rates;
    }
    case "literacy_rate": {
      return state_wise_literacy_rate;
    }
    case "pass-fail-rate": {
      return state_wise_pass_fail_rates;
    }
    default: {
      return null;
    }
  }
}

function deleteFile() {
  const fileLocation = path.join(__dirname, `uploads/${fileName}`);

  fs.unlink(fileLocation, (err) => {
    if (err) throw err;

    console.log(`Deleted ${fileName} from uploads`);
  });
}

module.exports = router;
