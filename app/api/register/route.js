import { UserModel } from "@/utils/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDb } from "@/utils/config/dbConfig";

connectDb() //connecting to database

export async function POST(req){
    try {
        const reqBody = await req.json()
        const {name,email,password} = reqBody
        const user = await UserModel.findOne({email})
        if(user){
            return NextResponse.json({error:'User already exists'},{status:400})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = await UserModel({...reqBody,password:hashedPassword})
        const savedUser = await newUser.save()
        return NextResponse.json({message:'User saved',savedUser},{status:200}) 
    } catch (error) {
        return NextResponse.json({ error: error})
    }
}