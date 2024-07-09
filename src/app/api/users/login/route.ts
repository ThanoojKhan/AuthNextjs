import { connect } from "@/db/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const{email,password}=reqBody
        const user= await User.findOne({email})
        if(user){
            const validPassword=await bcryptjs.compare(password,user.password)
            if(!validPassword){
                return NextResponse.json({error:"invalid credentials"},{status:400})
            }else{
                const tokenData={
                    userId:user._id,
                    username:user.username,
                    email:user.email
                }
                const token=await jwt.sign(tokenData,
                    process.env.TOKEN_SECRET!,
                    {expiresIn:'1d'})
                const response= NextResponse.json({
                    message:"Login Success",
                    success:true
                })
            response.cookies.set("token",token,{
                httpOnly:true,
                path:'/'
            })
            return response

            }

        }else{
            return NextResponse.json({error:"invalid credentials"},{status:400})
        }
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}

