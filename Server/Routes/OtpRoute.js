const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const register = require("../Schemas/RegisterScheme");
const otpGenerator = require("otp-generator");
const jsonwebtoken = require("jsonwebtoken");
const key = require("../Constants/Index");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/sendotp", async (req, res) => {
  try {
    const checkNumber = await register.findOne({ number: req.body.number });
    if (!checkNumber) {
      return res.status(400).json({ message: "Number dosen't exists" });
    }
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });
    var otphash = await bcrypt.hash(otp, 10);

    const newUser = await register.findOneAndUpdate(
      { number: req.body.number },
      { otp: otphash } ///ading otp value to existing values in schema
    );
    console.log("newUser",newUser);
    if (newUser?.otp) {
      client.messages
        .create({
          body: `${otp}`,
          from: process.env.MY_TWILIO_PHOMNE_NUMBER,
          to: "+917981129978",
        })
        .then((message) => console.log(message.sid));
    }
    res.status(200).json({ message: "Opt Sent To your Number" });
  } catch (err) {
    console.log({ err: err });
  }
});


router.post("/verifyotp", async (req, res) => {
  try {
    const checkOtp = await register.findOne({ number: req.body.number });
    const verify = await bcrypt.compare(req.body.otp, checkOtp.otp);
    if (!verify) {
      return res.status(400).json({ message: "Otp is Incorrect" });
    }
    const token = await jsonwebtoken.sign({ email: checkOtp.email }, key.key);
    console.log("checkOtp",checkOtp);
    const { name, email, number ,role} = checkOtp;
    res
      .header("auth", token)
      .json({
        token: token,
        data: { name, email, number,role },
        message: "login successfull",
      })
      .status(200);
  } catch (err) {
    console.log({ err: err });
  }
});


module.exports = router;
