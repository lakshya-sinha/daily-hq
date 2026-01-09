import { NextRequest, NextResponse } from "next/server";
import Expense from "@/models/ExpenseModel";
import { connect } from "@/db/config";

connect();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const shopName = searchParams.get("shopName");
    const date = searchParams.get("date");
    const days = searchParams.get("days");

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    if (!shopName) {
      return NextResponse.json(
        { success: false, message: "shopName is required" },
        { status: 400 }
      );
    }

    let filter: any = {};

    // 📅 single date
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.createdAt = { $gte: start, $lte: end };
    }

    // 📆 last N days
    if (days) {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - Number(days));
      filter.createdAt = { $gte: fromDate };
    }

    const expenses = await Expense.find(filter)
      .populate({
        path: "worker",
        match: { shopName },
        select: "fullName email shopName",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // remove unmatched workers
    const filteredExpenses = expenses.filter(
      (expense) => expense.worker !== null
    );

    return NextResponse.json({
      success: true,
      data: filteredExpenses,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}
