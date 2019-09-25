import React from "react";

const WebStats = ({ header, caption }) => {
  return (
    <div className="text-justify">
      <style jsx>
        {`
          .caption {
            font-weight: lighter;
            font-size: 1.1rem;
          }
        `}
      </style>
      <div>
        <h3>{header}</h3>
      </div>
      <div className="caption">{caption}</div>
    </div>
  );
};

export default WebStats;
