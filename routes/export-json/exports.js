const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const state_wise_drop_out = require("../../model/old/dropout/state_wise_drop_out");
const enrollment_rates = require("../../model/old/enrollment/enrollment_rates");
const state_wise_literacy_rate = require("../../model/old/literacy_rate/state_wise_literacy_rate");
const state_wise_pass_fail_rates = require("../../model/old/pass-fail/state_wise_pass_fail_rates");
const { parse } = require("json2csv");

router.get("/:route/:fileType", async (req, res) => {
  const model = selectModel(req.params.route);
  if (!model) return res.status(404).json({ error: "route does not exist" });

  let results = null;
  try {
    results = await model.find();
  } catch (error) {
    console.log(error.toString());
    return res.status(400).json({ error: "DB Error " });
  }

  if (!results || results.length == 0)
    return res.status(400).json({ error: "no records exist" });

  if (req.params.fileType == "JSON") {
    //write results to json file
    const str = JSON.stringify(results);
    const filepath = path.join(__dirname, "/exports/file.json");
    fs.writeFileSync(filepath, str, "utf8", () => {});

    res.download(filepath, (err) => {
      if (err) {
        console.log(err.toString());
      }
      deleteFile(filepath);
    });
  } else {
    const fields = ["year", "state", "boys", "girls", "standard"];
    const opts = { fields };
    try {
      const csv = parse(results, opts);
     
      const filepath = path.join(__dirname, "/exports/file.csv");
      fs.writeFileSync(filepath, csv, "utf8", () => {});
      res.download(filepath, (err) => {
        if (err) {
          console.log("1" + err.toString());
        }
        deleteFile(filepath);
      });
    } catch (err) {
      console.error("2"+ err);
    }
  }
});

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

function deleteFile(fileLocation) {
    fs.unlink(fileLocation, (err) => {
      if (err) throw err;
      console.log(`Deleted file from uploads`);
    });
}

module.exports = router;
