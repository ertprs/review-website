import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Head from "next/head";
import { layoutStyles } from "../../style";

export default props => {
  
    return (
      <>
        <style jsx>{layoutStyles}</style>
        <Head>
          <title>The trustsearch engine</title>
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            type="text/css"
          />
        </Head>
        <Header />
        {props.children}
        <Footer />
      </>
    );
  };
