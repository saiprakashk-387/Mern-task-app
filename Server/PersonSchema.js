const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const PersonSchema = mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    age : {
        type : String,
        required : true
    },
    address:{
        type:String,
      },
      number :{
        type:Number
      },
      profile_url :{
        type:String 
       },
    createdBy:{
        type : String,
        ref: "register"
    }
},{timestamps:true})
module.exports = mongoose.model('persons',PersonSchema)