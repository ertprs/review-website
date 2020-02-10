import React from "react";
import Grow from "@material-ui/core/Grow";
const GetSchemaCodeFailure = () => {
  return (
    <Grow in={true}>
      <div>
        <style jsx>
          {`
            .headerContainer {
              text-align: center;
            }
          `}
        </style>
        <div className="headerContainer">
          <h4>
            Sorry, some error ocurred while fetching your schema data, please
            try again later!
          </h4>
        </div>
      </div>
    </Grow>
  );
};

export default GetSchemaCodeFailure;
