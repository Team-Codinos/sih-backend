const router = require("express").Router();
const state_wise_drop_out = require("../../model/old/dropout/state_wise_drop_out");
const enrollment_rates = require("../../model/old/enrollment/enrollment_rates");
const state_wise_literacy_rate = require("../../model/old/literacy_rate/state_wise_literacy_rate");
const {
  gpi,
  enrollment,
  dropout,
  lit,
  BarDropout,
  enroll,
  literacy,
} = require("../constants");

// router.post("/dropout", async (req, res) => {
//   res.status(200).json(dropout);
// });

// router.post("/lit", async (req, res) => {
//   res.status(200).json(lit);
// });

// router.post("/enro", async (req, res) => {
//   console.log(enrollment.length);
//   res.status(200).json(enrollment);
// });
router.post("/gpi", async (req, res) => {
  res.status(200).json(gpi);
});

// router.post("/BarDropout", async (req, res) => {
//   res.status(200).json(BarDropout);
// });

// router.post("/enroll", async (req, res) => {
//   console.log(enroll.length);
//   res.status(200).json(enroll);
// });

// router.post("/literacy", async (req, res) => {
//   res.status(200).json(literacy);
// });

router.get("/dropout", async (req, res) => {
  const year = 2022;
  const standard = "tech";
  let resultList = [];

  try {
    const queryResults = await state_wise_drop_out.find({
      year: year,
      standard: standard,
    });
    queryResults.forEach((obj) => {
      resultList.push({
        State: getState[obj.state] || getState["Telangana"],
        val: (obj.boys + obj.girls) / 100,
      });
    });

    console.log(resultList.length);

    if (resultList.length > 0) res.json(resultList);
    else res.status(400).send({ error: "Result not found" });
  } catch (error) {
    console.log(error.toString());
    res.status(400).json({ error: "DB error " });
  }
});

router.get("/enro", async (req, res) => {
  const year = 2022;
  const standard = "tech";
  let resultList = [];

  try {
    const queryResults = await enrollment_rates.find({
      year: year,
      standard: standard,
    });
    queryResults.forEach((obj) => {
      resultList.push({
        State: getState[obj.state] || getState["Telangana"],
        val: (obj.boys + obj.girls) / 100,
      });
    });

    console.log(resultList.length);

    if (resultList.length > 0) res.json(resultList);
    else res.status(400).send({ error: "Result not found" });
  } catch (error) {
    console.log(error.toString());
    res.status(400).json({ error: "DB error " });
  }
});


router.get("/enroll", async (req, res) => {
  const fromYear = 2000;
  const toYear = 2022;
  const resultMap = {};
  for (let i = 2000; i <= 2022; i++) {
    resultMap[i] = {
      BOYS: 0,
      GIRLS: 0,
      Total: 0,
    };
  }

  try {
    const queryResult = await enrollment_rates.find({
      year: { $gte: fromYear, $lte: toYear },
    });
    queryResult.forEach((obj) => {
      resultMap[obj.year].BOYS += obj.boys / (23 * 7);
      resultMap[obj.year].GIRLS += obj.girls / (23 * 6);
      resultMap[obj.year].Total += (obj.girls + obj.boys) / (23 * 12);
    });

    const result3 = [];
    for (let i = 1; i < 24; i++) {
      result3.push({
        year: 0,
        BOYS: 0,
        GIRLS: 0,
        Total: 0,
      });
    }
    for (let i = 2000; i <= 2022; i++) {
      let j = i - 2000;
      result3[j].year = i;
      result3[j].BOYS = resultMap[i].BOYS;
      result3[j].GIRLS = resultMap[i].GIRLS;
      result3[j].Total = resultMap[i].Total;
    }

    console.log(result3.length);
    res.json(result3);
  } catch (error) {
    console.log(error.toString());
    res.status(400).json({ error: "DB error " });
  }
});

router.get("/literacy", async (req, res) => {
  const fromYear = 2000;
  const toYear = 2022;
  const resultMap = {};
  for (let i = 2000; i <= 2022; i++) {
    resultMap[i] = {
      BOYS: 0,
      GIRLS: 0,
      Total: 0,
    };
  }

  try {
    const queryResult = await state_wise_literacy_rate.find({
      year: { $gte: fromYear, $lte: toYear },
    });
    queryResult.forEach((obj) => {
      resultMap[obj.year].BOYS += obj.boys / (23 * 7);
      resultMap[obj.year].GIRLS += obj.girls / (23 * 6);
      resultMap[obj.year].Total += (obj.girls + obj.boys) / (23 * 12);
    });

    const result3 = [];
    for (let i = 1; i < 24; i++) {
      result3.push({
        year: 0,
        BOYS: 0,
        GIRLS: 0,
        Total: 0,
      });
    }
    for (let i = 2000; i <= 2022; i++) {
      let j = i - 2000;
      result3[j].year = i;
      result3[j].BOYS = parseInt(resultMap[i].BOYS);
      result3[j].GIRLS = parseInt(resultMap[i].GIRLS);
      result3[j].Total = parseInt(resultMap[i].Total);
    }

    console.log(result3.length);
    res.json(result3);
  } catch (error) {
    console.log(error.toString());
    res.status(400).json({ error: "DB error " });
  }
});

router.get("/BarDropout", async (req, res) => {
  const fromYear = 2000;
  const toYear = 2022;
  const resultMap = {};
  for (let i = 2000; i <= 2022; i++) {
    resultMap[i] = {
      BOYS: 0,
      GIRLS: 0,
      Total: 0,
    };
  }

  try {
    const queryResult = await state_wise_drop_out.find({
      year: { $gte: fromYear, $lte: toYear },
    });
    queryResult.forEach((obj) => {
      resultMap[obj.year].BOYS += obj.boys / (23 * 7);
      resultMap[obj.year].GIRLS += obj.girls / (23 * 6);
      resultMap[obj.year].Total += (obj.girls + obj.boys) / (23 * 12);
    });

    const result3 = [];
    for (let i = 1; i < 24; i++) {
      result3.push({
        year: 0,
        BOYS: 0,
        GIRLS: 0,
        Total: 0,
      });
    }
    for (let i = 2000; i <= 2022; i++) {
      let j = i - 2000;
      result3[j].year = i;
      result3[j].BOYS = parseInt(resultMap[i].BOYS);
      result3[j].GIRLS = parseInt(resultMap[i].GIRLS);
      result3[j].Total = parseInt(resultMap[i].Total);
    }

    console.log(result3.length);
    res.json(result3);
  } catch (error) {
    console.log(error.toString());
    res.status(400).json({ error: "DB error " });
  }
});


router.get('/lit',async(req,res)=>{
  const year = 2022;
  const standard = "tech";
  let resultList = [];

  try {
    const queryResults = await state_wise_literacy_rate.find({
      year: year,
      standard: standard,
    });
    queryResults.forEach((obj) => {
      resultList.push({
        State: getState[obj.state] || getState["Telangana"],
        val:(obj.boys + obj.girls) / 300,
      });
    });

    console.log(resultList.length);

    if (resultList.length > 0) res.json(resultList);
    else res.status(400).send({ error: "Result not found" });
  } catch (error) {
    console.log(error.toString());
    res.status(400).json({ error: "DB error " });
}});





const getState = {
  "Andaman and Nicobar Islands": "an",
  "Andhra Pradesh": "ap",
  "Arunachal Pradesh": "ar",
  Assam: "as",
  Bihar: "br",
  Chandigarh: "ch",
  Chhattisgarh: "ct",
  "Dadra and Nagar Haveli": "dn",
  "Daman and Diu": "dd",
  Delhi: "dl",
  Goa: "ga",
  Gujrat: "gj",
  Haryana: "hr",
  "Himachal Pradesh": "hp",
  "Jammu and Kashmir": "jk",
  Jharkhand: "jh",
  Karnataka: "ka",
  Kerala: "kl",
  Lakshadweep: "ld",
  "Madhya Pradesh": "mp",
  Maharashtra: "mh",
  Meghalaya: "ml",
  Mizoram: "mz",
  Nagaland: "nl",
  Odisha: "or",
  Puducherry: "py",
  Punjab: "pb",
  Rajasthan: "rj",
  Sikkim: "sk",
  "Tamil Nadu": "tn",
  Telangana: "tg",
  Tripura: "tr",
  Uttarakhand: "ut",
  "Uttar Pradesh": "up",
  "West Bengal": "wb",
};

module.exports = router;
