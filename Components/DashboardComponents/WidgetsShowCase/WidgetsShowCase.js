import React, { Component } from "react";
import GetWidget from "../WidgetsShowCase/GetWidget";
import Paper from "@material-ui/core/Paper/Paper";
import Title from "../../MaterialComponents/Title";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import CheckBox from "@material-ui/icons/CheckBox";
import Button from "@material-ui/core/Button/Button";
import ArrowRight from "@material-ui/icons/ArrowForward";
import uuid from "uuid/v1";
import { connect } from "react-redux";
import _get from "lodash/get";

const widgetsObj = [
  {
    title: "Trust card",
    tagLine: "Boost customer confidence with an honest TrustBox",
    imgURL: "/static/images/onlyScoreWidget.png",
    minHeight: 400,
    listItems: ["Show off your total number of reviews"],
    description:
      "In short, the TrustBoxes are great starters that communicate You can trust us.",
    suggestedPlacement: [
      "Header or footer",
      "Small enough to place almost anywhere",
      "Complement larger TrustBoxes on your website"
    ],
    support: [
      "Responsive (max. 100% x 24)",
      "Mobile, tablet and desktop ready"
    ],
    dataTempID: "OnlyScoreWidget"
  },
  {
    title: "Trust card with reviews",
    tagLine: "Boost customer confidence with an honest TrustBox",
    imgURL: "/static/images/textReviewsWithScores.png",
    minHeight: 400,
    listItems: ["Show off your total number of reviews"],
    description:
      "In short, the TrustBoxes are great starters that communicate You can trust us.",
    suggestedPlacement: ["Header or footer"],
    support: ["Responsive (max. 100% x 24)"],
    dataTempID: "TextReviewsWithScores"
  },
  {
    title: "Trust carousel",
    tagLine: "Boost customer confidence with an honest TrustBox",
    minHeight: 400,
    imgURL: "/static/images/textReviews.png",
    listItems: [
      "Show off your 15 latest reviews",
      "Focuses on overall trust score"
    ],
    description:
      "In short, the TrustBoxes are great starters that communicate You can trust us.",
    suggestedPlacement: ["Header or footer"],
    support: ["Responsive (max. 100% x 24)"],
    dataTempID: "TextReviews"
  }
];

class WidgetsShowCase extends Component {
  state = {
    getWidget: false,
    selectedWidgetIndex: 0
  };
  renderWidgetBox = (item, index) => {
    return (
      <div className="col-md-4" style={{ alignSelf: "stretch" }}>
        <style jsx>
          {`
            .widgetBox {
              padding: 15px;
            }
            .widgetImgContainer {
              width: 60%;
              height: auto;
              margin: 0 auto;
            }
            .widgetImgContainer img {
              max-width: 100%;
              height: auto;
            }
          `}
        </style>
        <div>
          <Paper style={{ padding: "15px", height: "425px" }}>
            <Title>{item.title}</Title>
            <p>{item.tagLine}</p>
            <div className="widgetImgContainer">
              <img src={item.imgURL} />
            </div>
            <List>
              {item.listItems.map(item => {
                return (
                  <ListItem key={uuid()}>
                    <ListItemIcon>
                      <CheckBox />
                    </ListItemIcon>
                    <ListItemText>
                      <div style={{ fontSize: "0.9rem" }}>{item}</div>
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
            <div>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowRight />}
                size="small"
                onClick={() => {
                  this.setState({
                    getWidget: true,
                    selectedWidgetIndex: index
                  });
                }}
              >
                Learn more
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    );
  };

  render() {
    const { getWidget, selectedWidgetIndex } = this.state;
    return (
      <div className="container">
        {!getWidget ? (
          <div className="row" style={{ alignItems: "stretch" }}>
            {widgetsObj.map((item, index) => {
              return this.renderWidgetBox(item, index);
            })}
          </div>
        ) : (
          <GetWidget
            domainName={_get(this.props, "domainName", "")}
            widget={widgetsObj[selectedWidgetIndex]}
            getMoreWidgets={() => {
              this.setState({ getWidget: false });
            }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  const domainName = _get(
    auth,
    "logIn.userProfile.business_profile.domain",
    ""
  );
  return { domainName };
};

export default connect(mapStateToProps)(WidgetsShowCase);