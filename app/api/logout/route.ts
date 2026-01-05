import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response= NextResponse.json(
            {
                message: "Logout successfull",
                success: true
            },
            {status: 200}
        )

        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)})

        return response;

    } catch (error:unknown) {
       if(error instanceof Error){
        NextResponse.json({error: error.message}, {status: 500})
       } 
    }
}