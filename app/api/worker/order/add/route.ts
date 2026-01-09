import { NextResponse, NextRequest } from "next/server";
import Order from '@/models/OrderModel';
import {connect} from '@/db/config';

connect();

export async function POST(request: NextRequest){
    try {
        
        const reqBody =  await request.json();

        const {product, worker, status, name} = reqBody;

        const newOrder = new Order({
            product, 
            worker, 
            name,
            status
        })

        const savedOrder = await newOrder.save();

        return NextResponse.json({success: true, message: 'order added successfully'}, {status: 200})


    } catch (error: unknown) {
       if(error instanceof Error){
        return NextResponse.json({success: false, message: 'cannot add order', error: error.message}, {status: 500})
       } 
       return NextResponse.json({success: false, message: 'cannot add order', error: 'unknown error happen'}, {status: 500})
    }
}