const router = require("express").Router();
const { exists } = require("../model/User");
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../model/User");
const validate = require("../validation"); //your exports can be like this OR
// const {loginvalidation,registervalidation} =require('../validation'); //like this as you can only take required ones from the exports
//  in order you want and the names you want

router.post("/register", async (req, res) => {
  //validate beofre adding the user
  const { error } = validate.registerValidation(req.body); //left hand said is also called destruction btw
  if (error) return res.status(400).json(error.details[0].message);

  //once you make sure everything is valid check if the user already exists
  const emailExist =await User.findOne({email:req.body.email});
  if(emailExist) return res.status(400).send("Email Already exists");


    //hash the password before giving it to the db
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);


  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser._id);
  } catch (error) {
    console.log(error);
    res.status(401).send(error.toString());
  }
});

router.post("/login",async (req, res) => {
      //validate beofre adding the user
  const { error } = validate.loginValidation(req.body); //left hand said is also called destruction btw
  if (error) return res.status(400).json(error.details[0].message);

    //once you make sure everything is valid check if the user exists
    const currentuser =await User.findOne({email:req.body.email});
    if(!currentuser) return res.status(400).send("Email or Password is wrong pwd");

    //check if password is corrent
    const pwdValid=await bcrypt.compare(req.body.password,currentuser.password);
    if(!pwdValid) return res.status(400).send("Email or Password Incorrect");

    //create and assign a token
    const token =jwt.sign({"id":currentuser._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
    
    // res.send(200,"cool login");


});

module.exports = router;
