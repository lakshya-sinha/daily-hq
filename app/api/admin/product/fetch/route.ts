import { NextResponse, NextRequest   } from "next/server";
import  Product from '@/models/ProductModel';
import {connect} from '@/db/config';

connect();

export async function GET(request: NextRequest){
    try {
       
        const products = await Product.find({});

        if(!products){
            return NextResponse.json({success: true, message: "no products found",  }, {status: 200});
        }


        return NextResponse.json({success: true, message: "product found", data: products}, {status: 200});



    } catch (error:unknown) {
       if(error instanceof Error){
            return NextResponse.json({success: false, message: "unable to fetch product" , error: error.message}, {status: 500})
       } 
       return NextResponse.json({success: false, message: 'unable to fetched product', error: 'unkonwn error happen'}, {status: 500})
    }
}