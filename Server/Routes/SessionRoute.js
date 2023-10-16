const express = require("express");
const router = express.Router();
const session = require("../Schemas/SessionSchema");
const producted = require("../Routes/ProtectedRoute");

router.get("/myattendence/:email", producted, async (req, res) => {
  try {
    const listUnderUser = await session.find({ user: req.params.email });
    res.status(200).json({
      message: "Attendence Log Fetched Succcessfully",
      data: listUnderUser,
    });
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

router.post("/clock-in", producted, async (req, res) => {
  try {
    const userInfo = await new session({
      inTime: req.body.inTime,
      outTime: req.body.outTime,
      user: req.user.email,
    });
    const saveUserInfo = await userInfo.save();
    res.status(200).json(saveUserInfo);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

router.put("/clock-out/:id", producted, async (req, res) => {
  try {
    const updatePersonById = await session.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatePersonById);
  } catch (err) {
    res.json({ err: err });
  }
});

router.put("/reguarize-request", producted, async (req, res) => {
  try {
    const updatePersonById = await session.findByIdAndUpdate(
      { _id: req.body._id },
      {
        regularizeType: req.body.type ? req.body.type : null,
        approveStatus: "pending",
      },
      { new: true }
    );
    res.status(200).json(updatePersonById);
  } catch (err) {
    res.json({ err: err });
  }
});
module.exports = router;
