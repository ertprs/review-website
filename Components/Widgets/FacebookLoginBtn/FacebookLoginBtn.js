import React from "react";
import {faceBookLoginBtnStyles} from './faceBookLoginBtnStyles';

const FacebookLoginBtn = (props) => {
  return (
    <div>
      <style jsx>{faceBookLoginBtnStyles}</style>
      <button
        className="loginBtn loginBtn--facebook"
      >
        {props.text}
      </button>
    </div>
  );
};
export default FacebookLoginBtn;
