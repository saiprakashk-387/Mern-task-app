const express = require("express");
const router = express.Router();
const register = require("../Schemas/RegisterScheme");
const Token = require("../Schemas/Tokenschema");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendEmail = require("../Routes/RouteConig");

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "kudimiprakash@gmail.com",
    pass: "ntqznvhkgdnqureo",
  },
  secure: true,
});

router.post("/requestpasswordreset", async (req, res) => {
    try {
      const user = await register.findOne({ email: req.body.email });
      if (!user)
        return res.status(400).send("user with given email doesn't exist");
  
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }
  
      const link = `${process.env.BASE_URL}/forgetpassword/${user._id}/${token.token}`;
      await sendEmail(user.email, "Password reset", link);
  
      res.status(200).send({message:"password reset link sent to your email account", pasword_reset_link:link});
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  });
  
  router.post("/resetpassword/:userId/:token", async (req, res) => {
    try {
      const user = await register.findById(req.params.userId);
      if (!user) return res.status(400).send("invalid link or expired");
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link or expired");
      var hash = await bcrypt.hash(req.body.password, 10);
      user.password = hash;
      await user.save();
      await token.delete();
  
      res.send("password reset sucessfully.");
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  });
  module.exports = router