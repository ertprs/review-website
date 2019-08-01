import React, { useState } from "react";
import NavBar from "../Widgets/NavBar/NavBar";
import { useAmp } from "next/amp";
import Head from "next/head";
import * as Amp from 'react-amphtml';
import headerStyles from "./headerStyles";

export const config = { amp: "hybrid" };

const handleMenuBtnClick = (showSideNav, setShowSideNav) => {
  setShowSideNav(!showSideNav);
};

const Header = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-bind"
          src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
        />
      </Head>
      <style jsx>{headerStyles}</style>
      <header className="headerContainer">
        <Amp.AmpState specName="amp-state" id="showSideNav">
          {{show:true}}
        </Amp.AmpState>
        <div className="">
          <NavBar
            showSideNav={showSideNav}
            handleMenuBtnClick={() =>
              handleMenuBtnClick(showSideNav, setShowSideNav)
            }
          />
        </div>
      </header>
    </>
  );
};
export default Header;
