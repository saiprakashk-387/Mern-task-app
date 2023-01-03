const mongoose = require("mongoose");

const register = mongoose.Schema({
  name:
   {
    type: String,
    require: true,
}
,
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  address:{
    type:String,
  },
  number :{   
    type:Number
      },
  otp:{
    type:String,
    require:false
},
  profile_url :{
    type:String 
   },
   login_Status :Array,
},{timestamps:true});

module.exports = mongoose.model('register',register)