import React from "react";

const Loader = (props) => {
  return (
    <>
      <style jsx>
        {`
          .loader{
            text-align:center;
          }
          .l1,.l2,.l3 {
              animation-name:fade;
              animation-itertion-count:infinite;
              animation-duration: 0.4s;
          }

          @keyframes fade {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

        `}
      </style>
      <div className="loader" style={{...props.styles}}>
        <span className="l1">.</span> <span className="l2">.</span> <span className="l2">.</span>
      </div>
    </>
  );
};

export default Loader;
