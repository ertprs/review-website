import React, { Component } from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Title from "../../../MaterialComponents/Title";
import Button from "@material-ui/core/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";
import GetSchemaCodeDialog from "./GetSchemaCodeDialog";

class GetSchemaCode extends Component {
  state = {
    showSchemaCodeDialog: false
  };

  handleGetSchemaCodeDialogClose = () => {
    this.setState({ showSchemaCodeDialog: false });
  };

  render() {
    const { showSchemaCodeDialog } = this.state;
    return (
      <div>
        <style jsx>
          {`
            .widgetBox {
              padding: 15px;
            }
            .widgetImgContainer {
              max-width: 360px;
              height: auto;
              margin: 0 auto;
            }
            .widgetImgContainerSm {
              width: 40%;
              height: auto;
              margin: 0 auto;
            }
            .widgetImgContainer img,
            .widgetImgContainerSm img {
              max-width: 100%;
              height: auto;
            }
            .mt {
              margin-top: 20.5px;
            }
          `}
        </style>
        <div>
          <Paper style={{ padding: "15px", marginBottom: "50px" }}>
            <Title>Schema Code</Title>
            <p>
              Get the schema code for your website to display information about
              a product, it's reviews and ratings available on TrustSearch
              platform, in google search results.
            </p>
            <div className="widgetImgContainer">
              <img src="/static/images/schemaorg.png" />
            </div>
            <div className="mt">
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowRight />}
                size="small"
                onClick={() => {
                  this.setState({ showSchemaCodeDialog: true });
                }}
              >
                Get schema code
              </Button>
            </div>
          </Paper>
        </div>
        {showSchemaCodeDialog ? (
          <GetSchemaCodeDialog
            open={showSchemaCodeDialog}
            handleClose={this.handleGetSchemaCodeDialogClose}
          />
        ) : null}
      </div>
    );
  }
}

export default GetSchemaCode;
