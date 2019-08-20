import React from "react";
import Head from "next/head";
import { useAmp } from "next/amp";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// const data = [
//   {
//     name: "Facebook",
//     followers: 7277704
//   },
//   {
//     name: "Twitter",
//     followers: 884173
//   },
//   {
//     name: "Pinterest",
//     followers: 0
//   },
//   {
//     name: "YouTube",
//     followers: 0
//   },
//   {
//     name: "Medium",
//     followers: 0
//   },
//   {
//     name: "LinkedIn",
//     followers: 0
//   }
// ];

const icons = {
  1: { name: "facebook", color: "#3C5A99" },
  2: { name: "youtube", color: "#ff0000" },
  3: { name: "instagram", color: "#F77737" },
  4: { name: "qzone", color: "" },
  5: { name: "weibo", color: "#df2029" },
  6: { name: "twitter", color: "#38A1F3" },
  7: { name: "reddit", color: "#FF5700" },
  8: { name: "pinterest", color: "#c8232c" },
  9: { name: "ask.fm", color: "" },
  10: { name: "tumblr", color: "#34526f" },
  11: { name: "flickr", color: "#ff0084" },
  12: { name: "google-plus", color: "#CC3333" },
  13: { name: "linkedin", color: "#0077B5" },
  14: { name: "vk", color: "#4c75a3" },
  15: { name: "odnoklassniki", color: "#ed812b" },
  16: { name: "meetup", color: "#e51937" },
  17: { name: "medium", color: "#00ab6c" }
};

const getData = (socialData)=>{
  let data = [];
  for(let item in socialData){
    data = [...data, {name:icons[item].name, followers:socialData[item].followers}]
  }
  return data;
}

export default ({socialData}) => {
  console.log(socialData)
    if(Object.keys(socialData).length > 0){
      return(
        !useAmp() ? (
          <ResponsiveContainer height="100%" width="100%">
            <BarChart
              width={500}
              height={300}
              data={getData(socialData)}
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
              <Bar dataKey="followers" barSize={20} fill="#28b661" name="Followers" />
            </BarChart>
          </ResponsiveContainer>
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
              src={`http://localhost:8000/socialMediaChart?data=${JSON.stringify(
                getData(socialData)
              )}`}
              scrolling="no"
            />
          </>
      )
      )
    }
    else{
      return null;
    }
};
