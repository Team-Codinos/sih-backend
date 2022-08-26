const router = require("express").Router();
const bcrypt = require('bcryptjs');
const school_admin = require("../../model/SchoolAdmin/school_admin");
const validate=require('./validation');


router.post("/", async (req, res) => {
    //validate beofre adding the user
    const { error } = validate.registerValidation(req.body); //left hand said is also called destruction btw
  
    if (error)
      return res.status(400).json({
        auth: false,
        id: null,
        errMsg: error.details[0].message
      });
  
    //once you make sure everything is valid check if the user already exists
    const emailExist = await school_admin.findOne({ email: req.body.email });
  
    if (emailExist)
      return res.status(403).json({
        auth: false,
        id: null,
        errMsg: "E-mail already exists"
      });
  
  
    //hash the password before giving it to the db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  
    const user = new school_admin({
      schoolid: req.body.schoolid,
      email: req.body.email,
      password: hashedPassword,
    });
  
    try {
      const savedUser = await user.save();
      res.status(200).json({
        auth: true,
        id: savedUser._id,
        errMsg: null
      });
  
    } catch (error) {
      console.log(error);
  
      res.status(401).json({
        auth: false,
        id: null,
        errMsg: error.toString()
      });
    }
  });

  module.exports=router;