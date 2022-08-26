const filerequest = require("../../model/FileRequest/filerequest");
const requesti = require("../../model/Request/requesti");

const router = require("express").Router();

router.get("/", async (req, res) => {
  let queryResults = null;
  try {
    queryResults = await filerequest.find({ approved: false });
  } catch (error) {
    return res.status(401).json({ error: "not found" });
  }

  return res.json(queryResults);
});

module.exports = router;
