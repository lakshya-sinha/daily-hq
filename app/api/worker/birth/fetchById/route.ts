import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
import Birth from "@/models/BirthModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "id is required" },
        { status: 400 }
      );
    }

    const birth = await Birth.findById(id)
      .populate({
        path: "worker",
        select: "fullName mobileNo email shopName",
      })
      .exec();

    if (!birth) {
      return NextResponse.json(
        { success: false, message: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: birth,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "fetch failed" },
      { status: 500 }
    );
  }
}
