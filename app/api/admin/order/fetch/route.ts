import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
import Order from "@/models/OrderModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const type = searchParams.get("type");            // "date" | "days"
    const shopName = searchParams.get("shopName");
    const date = searchParams.get("date");
    const days = searchParams.get("days");

    const workerName = searchParams.get("workerName"); // 🔥 NEW
    const status = searchParams.get("status");         // 🔥 success | pending

    const limit = Number(searchParams.get("limit")) || 10;
    const page = Number(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;

    if (!shopName) {
      return NextResponse.json(
        { success: false, message: "shopName is required" },
        { status: 400 }
      );
    }

    let filter: any = {};

    /* ================= DATE FILTER ================= */

    if (type === "date" && date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.createdAt = { $gte: start, $lte: end };
    }

    if (type === "days" && days) {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - Number(days));

      filter.createdAt = { $gte: fromDate };
    }

    /* ================= STATUS FILTER ================= */

    if (status && ["success", "pending"].includes(status)) {
      filter.status = status;
    }

    /* ================= FETCH ORDERS ================= */

    const orders = await Order.find(filter)
      .populate("product", "name cp sp mv")
      .populate({
        path: "worker",
        match: {
          shopName,
          ...(workerName && {
            fullName: { $regex: workerName, $options: "i" }, // 🔥 name filter
          }),
        },
        select: "fullName mobileNo email shopName",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // remove orders where worker didn't match filters
    const filteredOrders = orders.filter(
      (order) => order.worker !== null
    );

    return NextResponse.json({
      success: true,
      data: filteredOrders,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "fetch failed" },
      { status: 500 }
    );
  }
}
