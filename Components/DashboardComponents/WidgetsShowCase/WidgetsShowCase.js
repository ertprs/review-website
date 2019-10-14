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

const widgetsObj = [
  {
    title: "Trust card",
    tagLine: "Boost customer confidence with an honest TrustBox",
    imgURL: "/static/images/onlyScoreWidget.png",
    listItems: ["Show off your total number of reviews"]
  },
  {
    title: "Trust card with reviews",
    tagLine: "Boost customer confidence with an honest TrustBox",
    imgURL: "/static/images/textReviewsWithScores.png",
    listItems: ["Show off your total number of reviews"]
  },
  {
    title: "Trust carousel",
    tagLine: "Boost customer confidence with an honest TrustBox",
    imgURL: "/static/images/onlyScoreWidget.png",
    listItems: ["Show off your total number of reviews"]
  }
];

export default class WidgetsShowCase extends Component {
  state={
      getWidget:false
  }
  renderWidgetBox = (item) => {
    return (
      <div className="col-md-4" style={{alignSelf:"stretch"}}>
        <style jsx>
          {`
            .widgetBox {
              padding: 15px;
            }
            .widgetImgContainer {
              width: 60%;
              height: 100%;
              margin: 0 auto;
            }
            .widgetImgContainer img {
              max-width: 100%;
              height: auto;
            }
          `}
        </style>
        <div>
          <Paper style={{ padding: "15px"}}>
            <Title>{item.title}</Title>
            <p>{item.tagLine}</p>
            <div className="widgetImgContainer">
              <img src={item.imgURL} />
            </div>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckBox />
                </ListItemIcon>
                <ListItemText>
                    <div style={{fontSize:"0.9rem"}}>{item.listItems[0]}</div>
                </ListItemText>
              </ListItem>
            </List>
            <div>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowRight />}
                size="small"
                onClick={()=>{
                    this.setState({getWidget:true})
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
      const {getWidget} = this.state;
    return (
      <div className="container">
        {!getWidget ? <div className="row" style={{alignItems:"stretch"}}>
          {widgetsObj.map(item => {
            return this.renderWidgetBox(item);
          })}
        </div> : <GetWidget widget={widgetsObj[0]}/>}
      </div>
    );
  }
}
