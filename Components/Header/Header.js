import React, {useState} from "react";
import NavBar from "../Widgets/NavBar/NavBar";
import AmpHeader from './AmpHeader';
import { useAmp } from 'next/amp';
import Head from 'next/head';
import headerStyles from './headerStyles';

export const config = { amp: 'hybrid' }

const handleMenuBtnClick = (showSideNav, setShowSideNav)=>{
  setShowSideNav(!showSideNav)
}

const Header = ()=>{

  const [showSideNav, setShowSideNav] = useState(false);
  // useAmp() ? <AmpHeader/> : 
  return(
    <>
    <style jsx>
      {headerStyles}
    </style>
    <header className="headerContainer">
      <div className="">
        <NavBar showSideNav={showSideNav} handleMenuBtnClick={()=> handleMenuBtnClick(showSideNav, setShowSideNav)}/>
      </div>
    </header>
    </>
  );


}
export default Header;

