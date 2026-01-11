import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/OrderModel";
import Expense from "@/models/ExpenseModel";
import { connect } from "@/db/config";

connect();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const type = searchParams.get("type"); // date | days
    const date = searchParams.get("date");
    const days = searchParams.get("days");
    const shopName = searchParams.get("shopName");

    const workerName = searchParams.get("workerName"); // optional

    if (!shopName) {
      return NextResponse.json(
        { success: false, message: "shopName required" },
        { status: 400 }
      );
    }

    /* ================= DATE FILTER ================= */

    let dateFilter: any = {};

    if (type === "date" && date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      dateFilter = { $gte: start, $lte: end };
    }

    if (type === "days" && days) {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - Number(days));
      dateFilter = { $gte: fromDate };
    }

    /* ================= INCOME (ORDERS) ================= */

    const incomeResult = await Order.aggregate([
      ...(Object.keys(dateFilter).length
        ? [{ $match: { createdAt: dateFilter } }]
        : []),

      // ...(status && ["success", "pending"].includes(status)
      //   ? [{ $match: { status } }]
      //   : []),

      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },

      {
        $lookup: {
          from: "users",
          localField: "worker",
          foreignField: "_id",
          as: "worker",
        },
      },
      { $unwind: "$worker" },

      {
        $match: {
          "worker.shopName": shopName,
          ...(workerName && {
            "worker.fullName": { $regex: workerName, $options: "i" },
          }),
        },
      },

      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalIncome: { $sum: "$product.sp" },
          netIncome: {
            $sum: { $subtract: ["$product.sp", "$product.cp"] },
          },
        },
      },
    ]);

    /* ================= EXPENSE ================= */

    const expenseResult = await Expense.aggregate([
      ...(Object.keys(dateFilter).length
        ? [{ $match: { createdAt: dateFilter } }]
        : []),

      {
        $lookup: {
          from: "users",
          localField: "worker",
          foreignField: "_id",
          as: "worker",
        },
      },
      { $unwind: "$worker" },

      {
        $match: {
          "worker.shopName": shopName,
          ...(workerName && {
            "worker.fullName": { $regex: workerName, $options: "i" },
          }),
        },
      },

      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$cost" },
        },
      },
    ]);

    /* ================= FINAL VALUES ================= */

    const totalOrders = incomeResult[0]?.totalOrders || 0;
    const totalIncome = incomeResult[0]?.totalIncome || 0;
    const netIncome = incomeResult[0]?.netIncome || 0;
    const totalExpense = expenseResult[0]?.totalExpense || 0;
    const netProfit = netIncome - totalExpense;

    return NextResponse.json({
      success: true,
      totalOrders,
      totalIncome,
      netIncome,
      totalExpense,
      netProfit,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to calculate analytics" },
      { status: 500 }
    );
  }
}
