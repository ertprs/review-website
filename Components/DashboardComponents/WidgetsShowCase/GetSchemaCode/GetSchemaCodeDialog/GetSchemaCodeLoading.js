import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grow from "@material-ui/core/Grow";
const GetSchemaCodeLoading = () => {
  return (
    <Grow in={true}>
      <div>
        <style jsx>
          {`
            .circularProgressContainer {
              text-align: center;
            }
            .header {
              margin-bottom: 25px;
              text-align: center;
            }
          `}
        </style>
        <div className="header">
          <h5>
            Please wait and do not close this dialog, while we fetch the schema
            code for you
          </h5>
        </div>
        <div className="circularProgressContainer">
          <CircularProgress size={40} />
        </div>
      </div>
    </Grow>
  );
};

export default GetSchemaCodeLoading;
