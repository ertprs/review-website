import React from "react";
import { useAmp } from "next/amp";
import * as Amp from "react-amphtml";
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
  return !useAmp() ? (
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
  ) : (
    <>
      <Head>
        <script
          async
          custom-element="amp-iframe"
          src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
        />
      </Head>
      <amp-iframe
        width="730"
        height="250"
        title="Unique monthly visitors graph"
        layout="responsive"
        sandbox="allow-scripts allow-same-origin allow-popups"
        frameborder="0"
        src={`http://localhost:8000/index?data=${JSON.stringify(data)}`}
        scrolling="no"
      />
    </>
  );
};
