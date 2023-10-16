const express = require("express");
const router = express.Router();
const persons = require("./PersonSchema");
const register = require("./Schemas/RegisterScheme");
const session = require("./Schemas/SessionSchema");
const producted = require("./Routes/ProtectedRoute");

//post persons////
router.post("/createPerson", producted, async (req, res) => {
  try {
    const userInfo = await new persons({
      name: req.body.name,
      age: req.body.age,
      createdBy: req.user.email,
    });
    const saveUserInfo = await userInfo.save();
    res.status(200).json(saveUserInfo);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

///get persons//
router.get("/persons", producted, async (req, res) => {
  try {
    const getAllPersons = await persons.find({ createdBy: req.user.email });
    res.status(200).json({
      data: getAllPersons,
      message: "users fetched Successfully",
      status: 200,
    });
  } catch (err) {
    res.json({ err: err });
  }
});

//get person by id//
router.get("/person/:id", producted, async (req, res) => {
  try {
    const getPersonId = await persons.findById(req.params.id);
    res.status(200).json(getPersonId);
  } catch (err) {
    res.json({ err: err });
  }
});

//update person by id//
router.put("/updateperson/:id", producted, async (req, res) => {
  try {
    const updatePersonById = await persons.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatePersonById);
  } catch (err) {
    res.json({ err: err });
  }
});

//delete person//
router.delete("/deletepersons/:id", producted, async (req, res) => {
  try {
    const deletePersonById = await persons.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(deletePersonById);
  } catch (err) {
    res.json({ err: err });
  }
});

//admin//
//get all users//
router.get("/allusers", producted, async (req, res) => {
  if (res) {
    const data = await register.find({ role: "user" }).select(["-password"]);
    res.status(200).json(data);
  } else {
    res.status(403).json("unauthorised");
  }
});
module.exports = router;

//get profile info
router.get("/profile/:id", async (req, res) => {
  try {
    const profileInfo = await register.findById({ _id: req.params.id });
    res
      .status(200)
      .json({ message: "Profile details fetched", data: profileInfo });
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

//update profile admin/user
router.put("/profileUpdate/:id", producted, async (req, res) => {
  // {new:true},to get updated value frm db with no delay
  try {
    const adminprofile = await register.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(adminprofile);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

///delete users
router.delete("/deleteuser/:id", producted, async (req, res) => {
  try {
    const deleteUser = await register.findByIdAndDelete({
      _id: req.params.id,
    });
    res
      .status(200)
      .json({ message: "user Deleted Succcessfully", data: deleteUser });
  } catch (err) {
    res.status(400).json({ err: "Bad request" });
  }
});

///find user sub list //
router.post("/usersublist/:email", async (req, res) => {
  try {
    const listUnderUser = await persons.find({ createdBy: req.params.email });
    res
      .status(200)
      .json({ message: "user Fetched Succcessfully", data: listUnderUser });
  } catch (err) {
    res.status(400).json({ err: "Bad request" });
  }
});

////get attendence request ///
router.get("/getAllRequest", producted, async (req, res) => {
  if (res) {
    const data = await session.find({ approveStatus: "pending" });
    res.status(200).json(data);
  } else {
    res.status(403).json("Something Error occured");
  }
});
///approve attendence requests///
router.put("/reguarize-requestapproval", producted, async (req, res) => {
  try {
    if (req.body.approveStatus === "approved") {
      const updatePersonById = await session.findByIdAndUpdate(
        { _id: req.body._id },
        { $set: req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ data: updatePersonById, message: "Requested Approved" });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  } catch (err) {
    res.json({ err: err, message: "Something went wrong" });
  }
});
