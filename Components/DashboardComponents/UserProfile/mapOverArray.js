import React from "react";
import styles from "./userProfileStyles";

const mapOverArray = array => {
  return array.map(data => {
    if (data.value || "") {
      return (
        <>
          <div className="col-md-3 textBold">
            <style jsx>{styles}</style>
            <p>{data.key}</p>
          </div>
          <div className="col-md-3">
            <p className="value">{data.value}</p>
          </div>
        </>
      );
    } else {
      return null;
    }
  });
};

export default mapOverArray;
