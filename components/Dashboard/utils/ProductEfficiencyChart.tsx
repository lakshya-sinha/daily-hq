'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProductEfficiencyChartProps {
  data: {
    name: string;
    efficiency: number;
  }[];
}

const ProductEfficiencyChart = ({ data }: ProductEfficiencyChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          tick={{ fill: "#6dfe6bff", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            backgroundColor: "#020617",
            borderRadius: "5px",
            border: "1px solid #22C55E",
          }}
        />
        <Bar
          dataKey="efficiency"
          radius={[50, 50, 5, 5]}
          fill="#22C55E"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProductEfficiencyChart;
