const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const register = require("../Schemas/RegisterScheme");

router.post("/register", async (req, res) => {
  try {
    var emailExists = await register.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json("Email Already Exists");
    } else {
      var hash = await bcrypt.hash(req.body.password, 10);
      const newUser = await new register({
        name: req.body.name,
        email: req.body.email,
        role:req.body.role,
        address:req.body.address,
        number:req.body.number,
        password: hash,
        otp:req.body.otp,
        profile_url:req.body.profile_url,
      });
      const User = await newUser.save();
      res.status(200).json(User);
    }
  } catch (err) {
    res.json({ err: err });
  }
});

module.exports = router;
