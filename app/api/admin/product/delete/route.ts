import { NextResponse, NextRequest } from "next/server";
import { connect } from '@/db/config';
import Product from "@/models/ProductModel";


connect();

export async function DELETE(request: NextRequest){
    try {
        const {searchParams } = request.nextUrl;
        const productId = searchParams.get('productId');

        const res = await Product.findByIdAndDelete(productId);
        if(!res){
            return  NextResponse.json({success: true, message: 'cannot found product to delete'}, {status: 404})
        }
        return NextResponse.json({success: true, message: 'product deleted successfully'}, {status: 200})
    } catch (error: unknown) {
       if(error instanceof Error){
        return NextResponse.json({success: false, message: 'unable to delete product'}, {status: 500})
       } 
    }
}