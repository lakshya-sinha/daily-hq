import bcryptjs from 'bcryptjs';
import User from '@/models/UserModel';
import {connect} from '@/db/config';
import { NextResponse, NextRequest } from 'next/server'; 

connect();

export async function POST(request: NextRequest){
   try {
    
        const reqBody = await request.json();
        const {fullName, mobileNo, email,  address, shopName, shopAddress, password, isOwner, petName} = reqBody;

        const user = await User.findOne({mobileNo});

        if(user){
            return NextResponse.json({error: 'user already exists', success: false, message: 'user cannot created'}, {status: 409});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            fullName, 
            mobileNo,
            email,
            address,
            shopName, 
            shopAddress,
            password: hashedPassword,
            isOwner,
            petName
        })

        const savedUser = await newUser.save();

 
        return NextResponse.json({success:true, message: 'user created successfully'}, {status: 201});

   } catch (error) {
       if(error instanceof Error){
        return NextResponse.json({error: error.message, success: false, message: 'user cannot created'}, {status: 500})  
       }
        return NextResponse.json({error: 'unknown error', success: false, message: 'user cannot created'}, {status: 500})  
   } 
}