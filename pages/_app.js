import React from "react";
import App, { Container } from "next/app";
import Head from 'next/head';

import {layoutStyles} from '../style';
class MyApp extends App {
  static async getInitialProps({ req, Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <style jsx>{layoutStyles}</style>
        <Head>
          <title>The trust search engine</title>
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            type="text/css"
          />
        </Head>
        <Container>
        <Component {...pageProps} />
        </Container>
      </>
    );
  }
}

export default MyApp;
