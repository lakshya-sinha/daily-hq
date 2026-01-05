import { connect } from "@/db/config";
import bcryptjs from 'bcryptjs';
import User from "@/models/UserModel";
import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest){
    try{
       console.log('req received')
        const reqBody = await request.json(); 
        const {email, password} = reqBody; 

        const user  = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "USER DOES NOT EXISTS", message: " FAILED TO LOG IN"}, {status: 404})
        }

        const validPassword = await bcryptjs.compare(password, user.password) ;

        if(!validPassword){
            return NextResponse.json({error: "INVALID PASSWORD", message: "FAILED TO LOG IN"}, {status: 401});
        }

         //!create token data 
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: "login successfull",
            success: true
        }, {status: 200});


        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;

    } catch(error: unknown){
        if(error instanceof Error){
            return NextResponse.json({error: error.message, message: "FAILED TO LOG IN"}, {status: 500})
        }
    }
}