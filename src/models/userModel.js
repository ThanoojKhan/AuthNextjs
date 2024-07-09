import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        trim:true,
        minLength:3
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        trim:true,
        minLength:6
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        trim:true,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User= mongoose.models.users || mongoose.model('users',userSchema)
export default User

