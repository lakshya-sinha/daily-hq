'use client';
import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const ProfitSparkline = ({ data, stroke = "rgba(103, 232, 249, 0.9)" }: { data: Array<{ value: number }>, stroke?: string }) => {
  return (
    <div
      className="w-full h-full rounded-xl p-3"
      style={{
        background: "",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={3}
            dot={false}
            style={{
              filter: `drop-shadow(0 0 3px ${stroke})`,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitSparkline;
