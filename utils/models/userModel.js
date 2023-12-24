import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String}
},{timestamps:true})

export const UserModel = mongoose.models.user || mongoose.model('user',UserSchema)