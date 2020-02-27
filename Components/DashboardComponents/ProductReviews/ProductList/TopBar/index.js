import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const TopBar = props => {
  const { setActiveComponent } = props;
  return (
    <div className="btnContainer">
      <style jsx>{`
        .btnContainer {
          text-align: right;
          margin: 30px 0px 30px 0px;
        }
      `}</style>
      <Button
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setActiveComponent("add")}
      >
        Add a new product
      </Button>
    </div>
  );
};

export default TopBar;
