// import { required } from 'joi';
import mongoose from 'mongoose';
const schema = mongoose.Schema;


// **************************User Schemaaa*************************************************
const UserSchema = new schema({
  name:{
    required:true,
    type:String
  },
   email:{
    required:true,
    type:String,
    unique:true
  },
    password:{
    required:true,
    type:String
  },
    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user", // only "user" is assigned by default
  }
})
 const userModel = mongoose.model('User', UserSchema);
// module.exports= userModel
export default userModel
