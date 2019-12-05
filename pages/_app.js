import React from "react";
import App, { Container } from "next/app";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import Router from "next/router";
import NProgress from "nprogress";
import Head from "next/head";
import { layoutStyles } from "../style";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", url => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ req, Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    console.warn = console.error = () => {};
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <>
        <style jsx>{layoutStyles}</style>
        <Head>
          <title>The trustsearch engine</title>
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/css/nprogress.css"
          />
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />

          <script src="/static/polyfills/polyfill.min.js"></script>

          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0yD1Nm-2HeTnWMZUSXN8CzvzejmGKEXk&libraries=places"></script>

          {process.env.NODE_ENV === "production" ? (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5KPH988');`
              }}
            />
          ) : (
            <script></script>
          )}
        </Head>
        <Container>
          {process.env.NODE_ENV === "production" ? (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5KPH988"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`
              }}
            />
          ) : (
            <noscript />
          )}
          <Provider store={reduxStore}>
            <PersistGate
              loading={<Component {...pageProps} />}
              persistor={this.persistor}
            >
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </Container>
      </>
    );
  }
}

export default withReduxStore(MyApp);
