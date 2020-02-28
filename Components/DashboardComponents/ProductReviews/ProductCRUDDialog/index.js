import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";
import _get from "lodash/get";
import ProductList from "../ProductList";
import AddProduct from "../AddEditProduct/AddProduct";
import EditProduct from "../AddEditProduct/EditProduct";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const components = {
  list: {
    name: "ProductList",
    text: "Product List"
  },
  add: {
    name: "AddProduct",
    text: "Add Product"
  },
  update: {
    name: "UpdateProduct",
    text: "Update Product"
  }
};

class ProductCRUDDialog extends Component {
  state = {
    activeComponent: "list",
    productToEdit: {}
  };

  setActiveComponent = (componentName = null) => {
    this.setState({ activeComponent: componentName });
  };

  renderActiveComponent = () => {
    const { activeComponent, productToEdit } = this.state;
    const componentName = (components[activeComponent] || {}).name;
    switch (componentName) {
      case "ProductList":
        return (
          <ProductList
            setActiveComponent={this.setActiveComponent}
            handleProductToEdit={productToEdit => {
              this.setState({
                productToEdit: { ...productToEdit },
                activeComponent: "update"
              });
            }}
          />
        );
      case "AddProduct":
        return <AddProduct setActiveComponent={this.setActiveComponent} />;
      case "UpdateProduct":
        return (
          <EditProduct
            setActiveComponent={this.setActiveComponent}
            productToEdit={productToEdit}
          />
        );
      default:
        null;
    }
  };

  render() {
    const { classes, open, handleClose } = this.props;
    const { activeComponent } = this.state;
    const appBarText = (components[activeComponent] || {}).text;

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
                {appBarText}
              </Typography>
              {
                <Button autoFocus color="inherit" onClick={handleClose}>
                  Close
                </Button>
              }
            </Toolbar>
          </AppBar>
          <Container>{this.renderActiveComponent()}</Container>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ProductCRUDDialog);
