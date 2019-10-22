import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Home from "@material-ui/icons/Home";
import AllInbox from "@material-ui/icons/AllInbox";
import FormatQuote from "@material-ui/icons/FormatQuote";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import HistoryIcon from "@material-ui/icons/History";

export const MainListItems = ({
  stepToRender,
  menuItemDisabled,
  getStartedHide,
  homeDisabled,
  handleMainListItemClick
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
        >
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
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
        <ListItemIcon>
          <Home />
        </ListItemIcon>
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
        <ListItemIcon>
          <AllInbox />
        </ListItemIcon>
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
        <ListItemIcon>
          <FormatQuote />
        </ListItemIcon>
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
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
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
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Widgets" />
      </ListItem>
    </div>
  );
};

export const SecondaryListItems = ({ subsriptionPlan }) => {
  return (
    <div>
      <ListSubheader inset>Your plan: {subsriptionPlan}</ListSubheader>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem button style={{ background: "#303030", color: "#fff" }}>
        <ListItemIcon style={{ color: "#fff" }}>
          <VerticalAlignTopIcon />
        </ListItemIcon>
        <ListItemText primary="Click to upgrade" />
      </ListItem>
    </div>
  );
};

export const DashboardLogo = () => {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: baseline;
          height: 50px;
          width: auto;
          margin-top: 120px;
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
