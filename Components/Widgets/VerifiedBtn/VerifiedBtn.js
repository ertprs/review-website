import React from "react";
const VerifiedBtn = ({ verified }) => {
  return (
    <div className="verifiedBtnContainer">
      <style jsx>
        {`
          .verifiedBtnContainer {
            display: flex;
            padding: 1% 2% 1% 2%;
            justify-content: center;
          }
          .icon-container {
            background: ${verified ? '#38b653' : '#ffae42'};
            color: #fff;
            width: 30%;
            border-right: 0.2px solid #f8f8f8;
          }
          .text-container {
            background: ${verified ? '#38b653' : '#ffae42'};
            width: 70%;
            color: #fff;
          }

          .icon-container,
          .text-container {
            padding: 1%;
            font-size: 0.8rem;
            text-align: center;
          }
        `}
      </style>
      <div className="icon-container">
        <i className={`fa ${verified ? "fa-check" : "fa-warning"}`}></i>
      </div>
      <div className="text-container">
        {verified ? "Verified" : "Unverified"}
      </div>
    </div>
  );
};

export default VerifiedBtn;
