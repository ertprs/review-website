import React from "react";
import { googleLoginBtnStyles } from "./googleLoginBtnStyles";

const GoogleLoginBtn = props => {
  return (
    <div>
    <style jsx>{googleLoginBtnStyles}</style>
    <button
      className="loginBtn loginBtn--google"
    >
      {props.text}
    </button>
  </div>
  );
};
export default GoogleLoginBtn;
