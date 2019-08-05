import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Mon",
    daily_unique_visitors: 425000
  },
  {
    name: "Tue",
    daily_unique_visitors: 400000
  },
  {
    name: "Wed",
    daily_unique_visitors: 375000
  },
  {
    name: "Thur",
    daily_unique_visitors: 402000
  },
  {
    name: "Fri",
    daily_unique_visitors: 225000
  },
  {
    name: "Sat",
    daily_unique_visitors: 500000
  },
  {
    name: "Sun",
    daily_unique_visitors: 400000
  }
];

export default () => {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="daily_unique_visitors"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
