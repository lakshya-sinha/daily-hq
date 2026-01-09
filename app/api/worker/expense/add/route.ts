import { NextRequest, NextResponse } from "next/server";
import Expense from "@/models/ExpenseModel";
import { connect } from "@/db/config";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, cost, why, worker } = body;

    if (!name || !cost || !why || !worker) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }

    const expense = await Expense.create({
      name,
      cost,
      why,
      worker,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Expense added successfully",
        data: expense,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to add expense" },
      { status: 500 }
    );
  }
}
