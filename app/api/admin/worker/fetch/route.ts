import { NextResponse, NextRequest } from "next/server";
import User from "@/models/UserModel";
import { connect } from '@/db/config';

connect();

export async function POST(request: NextRequest){
    try{

        const reqBody = await request.json();
        const {shopName} = reqBody;

        const data = await User.find({shopName});

        const freshData: any = [];

        data.forEach((e)=>{
            if(e.isOwner === true){
                
            } else {
                freshData.push(e)
            }
        })


        if(!data) {
            return NextResponse.json({success: false, message: 'worker not found'}, {status: 200});
        }

        return NextResponse.json({success: true, message: 'workers finded', data: freshData}, {status: 200});

    }catch(error: unknown){

        if(error instanceof Error){
            return NextResponse.json({success: false, error:error.message ,message: 'unable to find workers'}, {status: 404});
        }
        return NextResponse.json({success: false, message: 'unable to find workers', error: 'unknown error'}, {status: 500})

    }
}