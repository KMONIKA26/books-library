const {Schema, model}=require("mongoose")

const UserSchema= new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:true})


const userModel= model("User", UserSchema)

module.exports=userModel