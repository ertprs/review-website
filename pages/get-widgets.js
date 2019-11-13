import React, { Component } from "react";
import GetWidgetCode from "../Components/Widgets/GetWidgetsCode";
import Layout from "../hoc/layout/layout";
import Paper from "@material-ui/core/Paper/Paper";
import Title from "../Components/MaterialComponents/Title";
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
import Router from "next/router";

const widgetsObj = [
  {
    id: 1,
    title: "Trust carousel",
    tagLine: "Boost customer confidence with an honest TrustBox",
    minHeight: 238,
    imgURL: "/static/images/carouselWidget.png",
    listItems: [
      "Show off your 15 latest reviews",
      "Focuses on overall trust score"
    ],
    description:
      "In short, the TrustBoxes are great starters that communicate You can trust us.",
    suggestedPlacement: ["Header or footer"],
    support: [
      "Responsive (max. 100% x 24)",
      "Suggested placement min-height: 238px"
    ],
    dataTempID: "TextReviews"
  },
  {
    id: 2,
    title: "Trust card",
    tagLine: "Boost customer confidence with an honest TrustBox",
    imgURL: "/static/images/onlyScoreWidget.png",
    minHeight: 290,
    listItems: ["Show off your total number of reviews"],
    description:
      "In short, the TrustBoxes are great starters that communicate You can trust us.",
    suggestedPlacement: [
      "Header or footer",
      "Small enough to place almost anywhere"
    ],
    support: [
      "Responsive (max. 100% x 24)",
      "Mobile, tablet and desktop ready",
      "Suggested placement min-width: 285px",
      "Suggested placement min-height: 290px"
    ],
    dataTempID: "OnlyScoreWidget"
  },
  {
    id: 3,
    title: "Trust card with reviews",
    tagLine: "Boost customer confidence with an honest TrustBox",
    imgURL: "/static/images/textReviewsWithScores.png",
    minHeight: 360,
    listItems: ["Show off your total number of reviews"],
    description:
      "In short, the TrustBoxes are great starters that communicate You can trust us.",
    suggestedPlacement: [
      "Header or footer",
      "Suggested placement min-width: 380px",
      "Suggested placement min-height : 360px"
    ],
    support: ["Responsive (max. 100% x 24)"],
    dataTempID: "TextReviewsWithScores"
  }
];

class GetWidgets extends Component {
  state = {
    getWidget: false,
    selectedWidgetIndex: 0
  };
  renderWidgetBox = (item, index) => {
    return (
      <div
        className={item.id === 1 ? "col-md-12" : "col-md-6"}
        style={{ alignSelf: "stretch" }}
      >
        <style jsx>
          {`
            .widgetBox {
              padding: 15px;
            }
            .widgetImgContainer {
              width: 80%;
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
            <Title>{item.title}</Title>
            <p>{item.tagLine}</p>
            <div
              className={`${
                item.id === 1 ? "widgetImgContainer" : "widgetImgContainerSm"
              }`}
            >
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
            <div className={item.id === 2 ? "mt" : ""}>
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
                Get widget code
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    );
  };

  componentDidMount() {
    const { domainName } = this.props;
    // if (!domainName) {
    //   Router.push("/");
    // }
    window.scrollTo(0, 0);
  }

  render() {
    const { getWidget, selectedWidgetIndex } = this.state;
    const { domainName } = this.props;
    let parsed_domain_name = domainName.replace(/https:\/\//gim, "");
    parsed_domain_name = parsed_domain_name.replace(/www\./gim, "");
    return (
      <Layout>
        <div
          className="container"
          style={{ marginTop: "50px", marginBottom: "100px" }}
        >
          {!getWidget ? (
            <>
              <h4 style={{ marginBottom: "1.5rem" }}>Choose your widget</h4>
              <div className="row" style={{ alignItems: "stretch" }}>
                {widgetsObj.map((item, index) => {
                  return this.renderWidgetBox(item, index);
                })}
              </div>
            </>
          ) : (
            <GetWidgetCode
              domainName={parsed_domain_name || ""}
              widget={widgetsObj[selectedWidgetIndex]}
              getMoreWidgets={() => {
                this.setState({ getWidget: false });
              }}
            />
          )}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { profileData } = state;
  const domainName = _get(profileData, "domain", "");
  return { domainName };
};

export default connect(mapStateToProps)(GetWidgets);
