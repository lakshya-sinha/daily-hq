import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/OrderModel";
import Expense from "@/models/ExpenseModel";
import { connect } from "@/db/config";

connect();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const days = Number(searchParams.get("days")) || 30;
    const shopName = searchParams.get("shopName");

    if (!shopName) {
      return NextResponse.json(
        { success: false, message: "shopName required" },
        { status: 400 }
      );
    }

    /* 📅 Date filter */
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    /* ================= INCOME (Orders) ================= */

    const incomeResult = await Order.aggregate([
      { $match: { createdAt: { $gte: fromDate } } },
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
      { $match: { "worker.shopName": shopName } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalIncome: {
            $sum: { $subtract: ["$product.sp", "$product.cp"] },
          },
        },
      },
    ]);

    /* ================= EXPENSE ================= */

    const expenseResult = await Expense.aggregate([
      { $match: { createdAt: { $gte: fromDate } } },
      {
        $lookup: {
          from: "users",
          localField: "worker",
          foreignField: "_id",
          as: "worker",
        },
      },
      { $unwind: "$worker" },
      { $match: { "worker.shopName": shopName } },
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
    const totalExpense = expenseResult[0]?.totalExpense || 0;
    const netProfit = totalIncome - totalExpense;

    return NextResponse.json({
      success: true,
      totalOrders,
      totalIncome,
      totalExpense,
      netProfit,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to calculate analytics" },
      { status: 500 }
    );
  }
}
