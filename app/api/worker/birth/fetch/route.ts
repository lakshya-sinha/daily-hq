import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
import Birth from "@/models/BirthModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const shopName = searchParams.get("shopName");
    const workerName = searchParams.get("workerName");

    if (!shopName) {
      return NextResponse.json(
        { success: false, message: "shopName is required" },
        { status: 400 }
      );
    }

    const births = await Birth.find({})
      .populate({
        path: "worker",
        match: {
          shopName,
          ...(workerName && {
            fullName: { $regex: workerName, $options: "i" },
          }),
        },
        select: "fullName mobileNo email shopName",
      })
      .sort({ createdAt: -1 })
      .exec();

    const filteredBirths = births.filter(b => b.worker);

    return NextResponse.json({
      success: true,
      data: filteredBirths,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "fetch failed" },
      { status: 500 }
    );
  }
}
