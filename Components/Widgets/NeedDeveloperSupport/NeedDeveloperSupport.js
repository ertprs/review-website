import React, { Component } from "react";
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  paperContainer: {
    padding: "30px",
    paddingLeft: "35px"
  }
});

class NeedDeveloperSupport extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paperContainer}>
        <div className="nDSContainer">
          <style jsx>
            {`
              .nDSHeader {
                margin-bottom: 15px;
              }
              .nDSHeader h2 {
                font-weight: bolder;
              }
              .nDSSubheader {
                margin-bottom: 24px;
              }
              .nDSList ul {
                padding-inline-start: 20px;
                list-style-type: none;
                list-style-image: url("/static/images/check_circle.png");
              }
              .nDSList ul li {
                margin: 15px 0 15px 0px;
                font-size: 1.1rem;
              }
              .nDSLastListItem > div {
                display: flex;
                flex: 1;
              }
              // .nDSLastListItem > div > div {
              //   flex-basis: 50%;
              // }
              .nDSRequestBtnContainer {
                text-align: center;
              }
            `}
          </style>
          <div className="nDSHeader">
            <h3>Need Developer Support?</h3>
          </div>
          <div className="nDSSubheader">
            <h6>
              We have a team of developers to support any installation and
              custom developments.
            </h6>
          </div>
          <div className="nDSList">
            <ul>
              <li>Integration with your Ecommerce platform</li>
              <li>Design &amp; development of custom widgets</li>
              <li className="nDSLastListItem">
                <div>
                  <div>
                    Design of custom review templates which match your branding
                  </div>
                  {/* <div className="nDSRequestBtnContainer">
                    <Button variant="contained" color="primary" size="large">
                      Request Installation
                    </Button>
                  </div> */}
                </div>
              </li>
            </ul>
          </div>
          <div style={{textAlign:"right"}}>
            <Button variant="contained" color="primary" size="medium">
              Request Installation
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(NeedDeveloperSupport);
