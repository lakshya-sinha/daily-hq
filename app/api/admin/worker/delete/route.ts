import { NextRequest, NextResponse } from "next/server";    
import {connect } from '@/db/config';
import User from "@/models/UserModel";

connect();

export async function DELETE(request: NextRequest) {
    try {
       const {searchParams } = request.nextUrl;
       const UserId = searchParams.get('UserId');
       const queryData = await User.findByIdAndDelete(UserId);
       if(!queryData){
        return NextResponse.json({success: true, message: 'unable to find user '}, {status: 404});
       }

        return NextResponse.json({success: true, message: 'user deleted successfully', }, {status: 200});
        
       console.log(UserId);
    } catch (error: unknown) {
       if(error instanceof Error){
        return NextResponse.json({success: false, message: 'unable to delete user', error: error.message}, {status: 500});
       } 
        return NextResponse.json({success: false, message: 'unable to delete user', error: 'unable to delete user '}, {status: 500});
    }
}
