import React from "react";

const Loader = () => {
  return (
    <>
      <style jsx>
        {`
          .l1 {
              animation-name:fade;
              animation-itertion-count:infinite;
          }
          .l2 {
            animation-name:fade;
            animation-itertion-count:infinite;
        }
        .l3 {
            animation-name:fade;
            animation-itertion-count:infinite;
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
      <div className="loader">
        <span className="l1">.</span> <span className="l2">.</span> <span className="l2">.</span>
      </div>
    </>
  );
};

export default Loader;
