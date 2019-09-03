import React from "react";

const UniversalLoader = props => {
  return (
    <div style={{ ...props.styles }}>
      {props.status === "in-progress" ? (
        <div>{props.children[0]}</div>
      ) : props.status === "success" ? (
        <div>{props.children[1]}</div>
      ) : (
        <div>{props.children[2]}</div>
      )}
    </div>
  );
};

export default UniversalLoader;
