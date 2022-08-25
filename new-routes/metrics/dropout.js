const dropout = require("../../model/DropOuts/dropout");

const router = require("express").Router();

router.post("/drop-out", async (req, res) => {
    let results = {};
  try {
    const DropOuts = await dropout.find();
    DropOuts.forEach((obj) => {
      if (results[obj.year]) {
        results[obj.year].push(student_id);
      } else {
        results[obj.year] = [obj.student_id];
      }
    });
  } catch (error) {
    res.status(400).json({ message: "nope" });
  }
  res.status(200).json(results);
});

module.exports = router;
