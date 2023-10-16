const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  inTime: {
    type: String,
    require: true,
  },
  outTime: {
    type: String,
    require: true,
  },
  regularizeType: {
    type: String,
    require: true,
  },
  status: {
    type: String,
  },
  approveStatus: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    ref: "register",
  },
});
module.exports = mongoose.model("session", sessionSchema);
