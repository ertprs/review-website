import React, { PureComponent } from 'react';
import Head from 'next/head';
import {useAmp} from 'next/amp';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  {
    name: 'Facebook', followers: 7277704,
  },
  {
    name: 'Twitter', followers: 884173,
  },
  {
    name: 'Pinterest', followers: 0,
  },
  {
    name: 'YouTube', followers: 0,
  },
  {
    name: 'Medium', followers: 0,
  },
  {
    name: 'LinkedIn', followers: 0,
  }
];


export default ()=> {

    return !useAmp() ? (
    <ResponsiveContainer height="100%" width="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip/>
        <Legend />
        <Bar dataKey="followers" barSize={20} fill="#28b661" name="Followers"/>
      </BarChart>
      </ResponsiveContainer>
    ) :
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
        src={`http://localhost:8000/socialMediaChart?data=${JSON.stringify(data)}`}
        scrolling="no"
      />
    </>
}
