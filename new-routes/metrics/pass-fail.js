const dropout = require("../../model/DropOuts/dropout");
const Student = require("../../model/Student/Student");

const router = require("express").Router();

router.post("/", async (req, res) => {
  let p = 0;
  let s = 0;
  let t = 0;

  let tot = 0;

  try {
    const queryResults = await Student.find();
    const dResults = await dropout.find();

    if (queryResults && dResults) {
      //remove the illegal entries
      for (let i = 0; i < dResults.length; i++) {
        for (let j = 0; j < queryResults.length; j++) {
          // console.log(dResults[i].student_id);
          if (dResults[i].student_id == queryResults[j]._id) {
            queryResults.pop(j);
          }
        }
      }
    } else {
      return res.json({ message: "somegthing was null oof" });
    }

    queryResults.forEach((obj) => {
      if (obj.standard > 1 && obj.standard < 5 && obj.past_marks > 35)
        p = p + 1;
      else if (obj.standard > 6 && obj.standard < 12 && obj.past_marks > 35)
        s = s + 1;
      else if (obj.standard >= 13 && obj.past_marks > 35) t = t + 1;

      tot += 1;
    });
  } catch (error) {
    console.log(error.toString());
    return res.status(400).json({ message: "nope" });
  } 
  let results = {
    primary: (p / tot) * 100,
    secondary: (s / tot) * 100,
    techinical: (t / tot) * 100,
  };
  return res.json(results);
});

module.exports = router;
