import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import _get from "lodash/get";
import ProductsTable from "../ProductsTable/index";
import ProductManagementTopBar from "../ProductManagementTopBar";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductManagementDialog = props => {
  const classes = useStyles();
  const { open, handleClose } = props;
  const renderComponentByEvent = () => {
    let event = "";
    switch (event) {
      default:
        return <ProductsTable />;
    }
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Product management
            </Typography>
            {
              <Button autoFocus color="inherit" onClick={handleClose}>
                Close
              </Button>
            }
          </Toolbar>
        </AppBar>
        <Container>
          <div style={{ margin: "15px 0 15px 0" }}>
            <ProductManagementTopBar />
          </div>
          {renderComponentByEvent()}
        </Container>
      </Dialog>
    </div>
  );
};

export default ProductManagementDialog;
