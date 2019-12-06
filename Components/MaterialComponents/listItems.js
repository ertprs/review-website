import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Home from "@material-ui/icons/Home";
import RateReview from "@material-ui/icons/RateReview";
import InsertInvitation from "@material-ui/icons/InsertInvitation";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import UserProfileIcon from "@material-ui/icons/AccountCircleSharp";
import WidgetsOutlined from "@material-ui/icons/WidgetsOutlined";
import AssignmentIcon from "@material-ui/icons/Assignment";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import HistoryIcon from "@material-ui/icons/History";
import Tooltip from "@material-ui/core/Tooltip";
import { CircularProgress } from "@material-ui/core";

export const MainListItems = ({
  stepToRender,
  menuItemDisabled,
  getStartedHide,
  homeDisabled,
  handleMainListItemClick,
  getStartedDisabled
}) => {
  return (
    <div>
      <style>
        {`
          .grayBg{
            background:#e1e1e1;
          }
        `}
      </style>
      {getStartedHide ? null : (
        <ListItem
          button
          onClick={() => {
            handleMainListItemClick(0);
          }}
          className={stepToRender === 0 ? "grayBg" : ""}
          disabled={getStartedDisabled}
        >
          <Tooltip title="Get Started" placement="right">
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Get started" />
        </ListItem>
      )}
      <ListItem
        button
        onClick={() => {
          handleMainListItemClick(1);
        }}
        className={stepToRender === 1 ? "grayBg" : ""}
        disabled={homeDisabled}
      >
        <Tooltip title="Home" placement="right">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleMainListItemClick(2);
        }}
        className={stepToRender === 2 ? "grayBg" : ""}
        disabled={menuItemDisabled}
      >
        <Tooltip title="Reviews" placement="right">
          <ListItemIcon>
            <RateReview />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Reviews" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleMainListItemClick(3);
        }}
        className={stepToRender === 3 ? "grayBg" : ""}
        disabled={menuItemDisabled}
      >
        <Tooltip title="Get Reviews" placement="right">
          <ListItemIcon>
            <InsertInvitation />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Get Reviews" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleMainListItemClick(4);
        }}
        className={stepToRender === 4 ? "grayBg" : ""}
        disabled={menuItemDisabled}
      >
        <Tooltip title="Invitation History" placement="right">
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Invitation History" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleMainListItemClick(5);
        }}
        disabled={menuItemDisabled}
        className={stepToRender === 5 ? "grayBg" : ""}
      >
        <Tooltip title="Widgets" placement="right">
          <ListItemIcon>
            <WidgetsOutlined />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Widgets" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleMainListItemClick(6);
        }}
        disabled={menuItemDisabled}
        className={stepToRender === 6 ? "grayBg" : ""}
      >
        <Tooltip title="User Profile" placement="right">
          <ListItemIcon>
            <UserProfileIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="User Profile" />
      </ListItem>
    </div>
  );
};

export const SecondaryListItems = ({
  subsriptionPlan,
  handleClick,
  isLoading
}) => {
  return (
    <div>
      <ListSubheader inset>Your plan: {subsriptionPlan}</ListSubheader>
      <ListItem />
      {/* <ListItem />
      <ListItem /> */}
      <ListItem
        button
        style={{
          background: "#303030",
          color: "#fff",
          justifyContent: isLoading ? "center" : ""
        }}
      >
        {isLoading ? (
          <CircularProgress size={30} color={"#f1f1f1"} />
        ) : (
          <>
            <ListItemIcon onClick={handleClick} style={{ color: "#fff" }}>
              <VerticalAlignTopIcon />
            </ListItemIcon>
            <ListItemText onClick={handleClick} primary="Click to upgrade" />
          </>
        )}
      </ListItem>
    </div>
  );
};

export const DashboardLogo = () => {
  return (
    <div className="imgContainer">
      <style jsx>{`
        .imgContainer {
          display: flex;
          justify-content: center;
          align-items: baseline;
          height: 40px;
          width: auto;
        }
        .imgStyle {
          max-width: 100%;
          height: auto;
        }
      `}</style>
      <img src="/static/images/logo_footer.png" className="imgStyle" />
    </div>
  );
};
