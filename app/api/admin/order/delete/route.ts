import { NextResponse, NextRequest } from "next/server";
import Order from "@/models/OrderModel";
import {connect } from "@/db/config";

connect()

export async function DELETE( request: NextRequest ){
    try {
       const {searchParams } = request.nextUrl;
       const OrderId= searchParams.get('OrderId');
       const queryResult = await Order.findByIdAndDelete(OrderId);
       if(!queryResult){
        return NextResponse.json({success: true, message: 'cannot found order'}, {status: 404});
       }
       return NextResponse.json({success: true, message: 'order deleted successfully'}, {status: 200});
    } catch (error: unknown) {
        if(error instanceof Error){
            return NextResponse.json({success: false, message: 'unable to delete order', error: error.message}, {status: 500});
        } 
        return NextResponse.json({success: false, message: 'unable to delete order', }, {status: 500})
    }
}