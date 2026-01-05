import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse}  from "next/server";
import User from "@/models/UserModel";
import { connect} from "@/db/config";


connect();

export async function GET(request: NextRequest){
    try {

        const userId = await getDataFromToken(request);
        const user = await User.findById(userId).select("-password -_id -__v -petName")

        return NextResponse.json(
            {message: "User Found", data: user},
            {status: 200}
        )
        
    } catch (error: unknown) {
        if(error instanceof Error) {
            throw new Error(error.message)
        }
    }
}