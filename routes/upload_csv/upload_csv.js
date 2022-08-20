const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const csvtojson = require("csvtojson");
const state_wise_drop_out = require("../../model/dropout/state_wise_drop_out");
const enrollment_rates = require("../../model/enrollment/enrollment_rates");
const state_wise_literacy_rate = require("../../model/literacy_rate/state_wise_literacy_rate");
const state_wise_pass_fail_rates = require("../../model/pass-fail/state_wise_pass_fail_rates");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname);
  },
});

const upload = multer({ storage });

router.post("/:route", upload.single("abc"), async (req, res) => {
  if (!req.file.filename.endsWith(".csv"))
    return res.status(401).json({ message: "file type unsupported" });

  //get the model for the given route
  const modell = selectModel(req.params.route);
  if (!modell) {
    return res.status(404).json({ error: "route does not exist" });
  }

  //convert that csv to json
  let csvdata = await csvtojson().fromFile(req.file.path);
  console.log(csvdata);

  //verify the csv structure by verifying one instance of that json
  if (!verifyObj(csvdata[0]))
    return res.status(401).json({ error: "invald headers" });

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
      return res.status(500).json({ error: `DB Insert fail ${error.toString()}` });
    }
  });

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
      break;
    }
    case "enrollment_rates": {
      return enrollment_rates;
      break;
    }
    case "literacy_rate": {
      return state_wise_literacy_rate;
      break;
    }
    case "pass-fail-rate": {
      return state_wise_pass_fail_rates;
      break;
    }
    default: {
      return null;
      break;
    }
  }
}

module.exports = router;
