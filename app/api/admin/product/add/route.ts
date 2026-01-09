import { NextResponse, NextRequest } from "next/server";
import {connect } from '@/db/config';
import Product from '@/models/ProductModel';

connect();

export async function POST(request: NextRequest){
    try {
        
      const reqBody = await request.json();
      const {name, cp, sp, mv, user}   = reqBody;

      const Isproduct = await Product.findOne({name});

      console.log(Isproduct);

      if(Isproduct){
        return NextResponse.json({success: false, message: 'product already added', error: 'product already listed'}, {status: 200});
      }

      const newProduct = new Product({
        name, 
        cp, 
        sp, 
        mv,
        user
      })

      const savedProduct = await newProduct.save();

      return NextResponse.json({success: true, message: 'product added successfully', error: 'no errors'}, {status: 200});

    } catch (error: unknown) {
       if(error instanceof Error){
         return NextResponse.json({success: false, message: 'product cannot added', error: error.message}, {status: 500})
       } 
       return NextResponse.json({success: false, message: 'product cannot added', error: "unknown error happen"}, {status: 500})
    }
}