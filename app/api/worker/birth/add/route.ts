import { NextResponse, NextRequest } from "next/server";
import Birth from '@/models/BirthModel';
import { connect } from '@/db/config';

connect();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()

        const { worker,
             name, 
             gender, 
             dob, 
             dobInWords, 
             placeOfBirth, 
             fatherName, 
             motherName, 
             fatherAadhar, 
             motherAadhar, 
             childAddress, 
             parentAddress } = reqBody;

        const newBirth = new Birth({
            worker, 
            name, 
            gender, 
            dob, 
            dobInWords, 
            placeOfBirth, 
            fatherName, 
            motherName, 
            fatherAadhar, 
            motherAadhar, 
            childAddress, 
            parentAddress
        })

        const savedBirth = await newBirth.save();

        console.log(savedBirth);

        return NextResponse.json({success: true, message: 'birth added successfully'}, {status: 200})



    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 })
        }
        return NextResponse.json({ success: false, message: 'unable to add birthdata' }, { status: 500 })
    }
}

