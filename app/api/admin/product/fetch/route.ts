import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/ProductModel";
import Order from "@/models/OrderModel";
import { connect } from "@/db/config";

connect();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const centerName = searchParams.get("centerName");
    const days = Number(searchParams.get("days")) || 30;

    if (!centerName) {
      return NextResponse.json(
        { success: false, message: "centerName is required" },
        { status: 400 }
      );
    }

    /* 1️⃣ Fetch products of this shop */
    const products = await Product.find()
      .populate({
        path: "user",
        match: { shopName: centerName },
        select: "shopName",
      });

    const filteredProducts = products.filter(p => p.user !== null);
    const productIds = filteredProducts.map(p => p._id);

    /* 2️⃣ Date filter */
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    /* 3️⃣ Calculate efficiency from orders */
    const efficiencyData = await Order.aggregate([
      {
        $match: {
          product: { $in: productIds },
          createdAt: { $gte: fromDate }
        }
      },
      {
        $group: {
          _id: "$product",
          efficiency: { $sum: 1 } // 🔥 1 order = 1 efficiency
        }
      }
    ]);

    /* 4️⃣ Convert to map */
    const efficiencyMap = new Map(
      efficiencyData.map(item => [
        item._id.toString(),
        item.efficiency
      ])
    );

    /* 5️⃣ Attach efficiency */
    const finalProducts = filteredProducts.map(product => ({
      ...product.toObject(),
      efficiency: efficiencyMap.get(product._id.toString()) || 0
    }));

    /* 6️⃣ Sort by efficiency */
    finalProducts.sort((a, b) => b.efficiency - a.efficiency);

    return NextResponse.json({
      success: true,
      data: finalProducts
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to fetch products" },
      { status: 500 }
    );
  }
}
