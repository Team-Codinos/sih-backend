const router = require("express").Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validate=require('./validation');

const school_admin = require("../../model/SchoolAdmin/school_admin");
// const {loginvalidation,registervalidation} = require('../validation'); //like this as you can only take required ones from the exports
//  in order you want and the names you want


router.post("/", async (req, res) => {
  //validate beofre adding the user
  const { error } = validate.loginValidation(req.body); //left hand said is also called destruction btw

  if (error)
    return res.status(400).json({
      auth: false,
      id: null,
      errMsg: error.details[0].message
    });

  //once you make sure everything is valid check if the user exists
  const currentuser = await school_admin.findOne({ email: req.body.email });

  if (!currentuser)
    return res.status(404).json({
      auth: false,
      id: null,
      errMsg: "User not found!"
    });

  //check if password is corrent
  const pwdValid = await bcrypt.compare(req.body.password, currentuser.password);

  if (!pwdValid)
    return res.status(401).json({
      auth: false,
      id: null,
      errMsg: "Email or Password is Incorrect"
    });

  //create and assign a token
  const token = jwt.sign({ "id": currentuser._id,"school_id":currentuser.schoolid }, process.env.TOKEN_SECRET);

  res.status(200).header('auth-token', token).json({
    auth: true,
    id: currentuser._id,
    errMsg: null
  });
});

module.exports = router;