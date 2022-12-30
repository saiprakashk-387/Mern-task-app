const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = require("../Schemas/RegisterScheme");
const key = require('../Constants/Index');

router.post("/login", async (req, res) => {

  var emailExists = await register.findOne({ email: req.body.email });
   if (!emailExists) {
    return res.status(400).json({message:"Email Not Exists"});
  }
  var pwd = await bcrypt.compare(req.body.password, emailExists.password);
  if (!pwd) {
    return res.status(400).json({message:"Password Not Exists"});
  }
  var userToken = await jwt.sign({ email: emailExists.email }, key.key);
  const {email,name,role,_id,address,number,profile_url} = emailExists

  res.header("auth", userToken).json({"token":userToken,data:{email,name,role,_id,address,number,profile_url},message:"Login Successull"});
});

module.exports = router;
