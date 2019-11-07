import React from "react";
import Head from "next/head";
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

export default (props) => {
  return (
    <>
      <ResponsiveContainer height="100%" width="100%">
        <LineChart
          width={500}
          height={300}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 40,
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
            name={`Daily unique visitors (${new Date().getFullYear()})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
};
