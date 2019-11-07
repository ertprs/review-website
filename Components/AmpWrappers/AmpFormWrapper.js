import React from "react";
import Head from "next/head";

// if it's an amp page, get the amp form scripts and change to AMP FORM else continue with react js as it is.

const renderAppropriateForm = props => {
  return props.isXHR ? (
    <form
      class="search-form"
      method={props.formMethod}
      action-xhr={props.submitURL}
      target={props.formTarget}
    >
      {props.children}
    </form>
  ) : (
    <form
      class="search-form"
      method={props.formMethod}
      action={props.submitURL}
      target={props.formTarget}
    >
      {props.children}
    </form>
  );
};

const returnAmpForm = props => {
  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-form"
          src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
        />
        <script
          async
          custom-template="amp-mustache"
          src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
        />
      </Head>
      {renderAppropriateForm(props)}
    </>
  );
};

const AmpFormWrapper = props => {
  return (
    <form onSubmit={props.onSubmit}>{props.children}</form>
  )
};

export default AmpFormWrapper;
