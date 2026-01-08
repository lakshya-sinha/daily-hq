import { NextRequest, NextResponse } from "next/server";
import {connect } from '@/db/config';
import Order from "@/models/OrderModel";

connect();

export async function GET( request: NextRequest){
    try {
        console.log('request received')
        const orders = await Order.find()
            .populate({
                path: "product",
                select: "name cp sp mv"
            })
            .populate({
                path: "worker",
                select: "fullName mobileNo email"
            });

        
        if(!orders){
            return NextResponse.json({success: true, message: 'no order found' }, {status: 404});
        }

        return NextResponse.json({success: true, message: 'order found', data: orders}, {status: 200});


    } catch (error:unknown) {
        if(error instanceof Error){
            return NextResponse.json({success: false, message: 'cannot fetch order', error: error.message}, {status: 500})
        } 
        return NextResponse.json({success: false, message: 'cannot fetch order', error: 'unknown error'}, {status: 500})
    }
}