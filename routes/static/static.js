const router = require('express').Router();
// require
const gpi = [{'State': 'an', 'val': 0.56}, {'State': 'ap', 'val': 0.57}, {'State': 'ar', 'val': 0.47}, {'State': 'as', 'val': 0.53}, {'State': 'br', 'val': 0.35}, {'State': 'ch', 'val': 0.37}, {'State': 'ct', 'val': 0.44}, {'State': 'dn', 'val': 0.44}, {'State': 'dd', 'val': 0.33}, {'State': 'dl', 'val': 0.42}, {'State': 'ga', 'val': 0.63}, {'State': 'gj', 'val': 
0.59}, {'State': 'hr', 'val': 0.35}, {'State': 'hp', 'val': 0.54}, {'State': 'jk', 'val': 0.47}, {'State': 'jh', 'val': 0.65}, {'State': 'ka', 'val': 0.47}, {'State': 'kl', 'val': 0.62}, {'State': 'ld', 'val': 0.53}, {'State': 'mp', 'val': 0.48}, {'State': 'mh', 'val': 0.64}, {'State': 'mn', 'val': 0.37}, {'State': 'ml', 'val': 0.58}, {'State': 'mz', 'val': 0.36}, {'State': 'nl', 'val': 0.37}, {'State': 'or', 'val': 0.37}, {'State': 'py', 'val': 0.47}, {'State': 'pb', 'val': 0.57}, {'State': 'rj', 'val': 0.4}, {'State': 'sk', 'val': 0.59}, {'State': 'tn', 'val': 0.39}, {'State': 'tg', 'val': 0.55}, {'State': 'tr', 'val': 0.53}, {'State': 'up', 'val': 0.56}, {'State': 'ut', 'val': 0.36}, {'State': 'wb', 'val': 0.49}]
const enrollment = [{'State': 'an', 'val': 0.58}, {'State': 'ap', 'val': 0.62}, {'State': 'ar', 'val': 0.44}, {'State': 'as', 'val': 0.61}, {'State': 'br', 'val': 0.57}, {'State': 'ch', 'val': 0.53}, {'State': 'ct', 'val': 0.42}, {'State': 'dn', 'val': 0.64}, {'State': 'dd', 'val': 0.36}, {'State': 'dl', 'val': 0.46}, {'State': 'ga', 'val': 0.65}, {'State': 'gj', 'val': 
0.44}, {'State': 'hr', 'val': 0.38}, {'State': 'hp', 'val': 0.36}, {'State': 'jk', 'val': 0.51}, {'State': 'jh', 'val': 0.44}, {'State': 'ka', 'val': 0.57}, {'State': 'kl', 'val': 0.36}, {'State': 'ld', 'val': 0.52}, {'State': 'mp', 'val': 0.41}, {'State': 'mh', 'val': 0.64}, {'State': 'mn', 'val': 0.58}, {'State': 'ml', 'val': 0.58}, {'State': 'mz', 'val': 0.51}, {'State': 'nl', 'val': 0.5}, {'State': 'or', 'val': 0.57}, {'State': 'py', 'val': 0.52}, {'State': 'pb', 'val': 0.45}, {'State': 'rj', 'val': 0.42}, {'State': 'sk', 'val': 0.42}, {'State': 'tn', 'val': 0.63}, {'State': 'tg', 'val': 0.45}, {'State': 'tr', 'val': 0.5}, {'State': 'up', 'val': 0.61}, {'State': 'ut', 'val': 0.43}, {'State': 'wb', 'val': 0.57}]
const lit = [{'State': 'an', 'val': 0.55}, {'State': 'ap', 'val': 0.62}, {'State': 'ar', 'val': 0.42}, {'State': 'as', 'val': 0.56}, {'State': 'br', 'val': 0.4}, {'State': 'ch', 'val': 0.61}, {'State': 'ct', 'val': 0.59}, {'State': 'dn', 'val': 0.37}, {'State': 'dd', 'val': 0.42}, {'State': 'dl', 'val': 0.46}, {'State': 'ga', 'val': 0.49}, {'State': 'gj', 'val': 0.34}, {'State': 'hr', 'val': 0.33}, {'State': 'hp', 'val': 0.64}, {'State': 'jk', 'val': 0.45}, {'State': 'jh', 'val': 0.4}, {'State': 'ka', 'val': 0.42}, {'State': 'kl', 'val': 0.4}, {'State': 'ld', 'val': 0.54}, {'State': 'mp', 'val': 0.6}, {'State': 'mh', 'val': 0.36}, {'State': 'mn', 'val': 0.47}, {'State': 'ml', 'val': 0.43}, {'State': 'mz', 'val': 0.64}, {'State': 'nl', 'val': 0.48}, {'State': 'or', 'val': 0.45}, {'State': 'py', 'val': 0.62}, {'State': 'pb', 'val': 0.62}, {'State': 'rj', 'val': 0.45}, {'State': 'sk', 'val': 0.66}, {'State': 'tn', 'val': 0.65}, {'State': 'tg', 'val': 0.64}, {'State': 'tr', 'val': 0.36}, {'State': 'up', 'val': 0.61}, {'State': 'ut', 'val': 0.59}, {'State': 'wb', 'val': 0.52}]
const droupout = [
    { State: "an", val: 0.34 },
    { State: "ap", val: 0.46 },
    { State: "ar", val: 0.53 },
    { State: "as", val: 0.49 },
    { State: "br", val: 0.55 },
    { State: "ch", val: 0.5 },
    { State: "ct", val: 0.54 },
    { State: "dn", val: 0.37 },
    { State: "dd", val: 0.36 },
    { State: "dl", val: 0.66 },
    { State: "ga", val: 0.36 },
    { State: "gj", val: 0.37 },
    { State: "hr", val: 0.35 },
    { State: "hp", val: 0.44 },
    { State: "jk", val: 0.58 },
    { State: "jh", val: 0.6 },
    { State: "ka", val: 0.57 },
    { State: "kl", val: 0.41 },
    { State: "ld", val: 0.42 },
    { State: "mp", val: 0.62 },
    { State: "mh", val: 0.56 },
    { State: "mn", val: 0.58 },
    { State: "ml", val: 0.56 },
    { State: "mz", val: 0.48 },
    { State: "nl", val: 0.64 },
    { State: "or", val: 0.54 },
    { State: "py", val: 0.35 },
    { State: "pb", val: 0.38 },
    { State: "rj", val: 0.36 },
    { State: "sk", val: 0.44 },
    { State: "tn", val: 0.49 },
    { State: "tg", val: 0.39 },
    { State: "tr", val: 0.4 },
    { State: "up", val: 0.4 },
    { State: "ut", val: 0.36 },
    { State: "wb", val: 0.51 },
  ];
router.post("/dropout", async (req, res) => {
    console.log("POST --> staticcc wise data");
    res.status(200).json(droupout);
});
router.post("/lit", async (req, res) => {
    console.log("POST --> staticcc wise data");
    res.status(200).json(lit);
});
router.post("/enro", async (req, res) => {
    console.log("POST --> staticcc wise data");
    res.status(200).json(enrollment);
});
router.post("/gpi", async (req, res) => {
    console.log("POST --> staticcc wise data");
    res.status(200).json(gpi);
});


module.exports = router;