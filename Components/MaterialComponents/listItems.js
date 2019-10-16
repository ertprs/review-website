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

export const MainListItems = props => {
  const stepToRender = props.stepToRender;
  return (
    <div>
      <style>
        {`
          .grayBg{
            background:#e1e1e1;
          }
        `}
      </style>
      <ListItem
        button
        onClick={() => {
          props.handleMainListItemClick(0);
        }}
        className={stepToRender === 0 ? "grayBg" : ""}
      >
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.handleMainListItemClick(1);
        }}
        className={stepToRender === 1 ? "grayBg" : ""}
      >
        <ListItemIcon>
          <AllInbox />
        </ListItemIcon>
        <ListItemText primary="Reviews" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.handleMainListItemClick(2);
        }}
        className={stepToRender === 2 ? "grayBg" : ""}
      >
        <ListItemIcon>
          <FormatQuote />
        </ListItemIcon>
        <ListItemText primary="Get Reviews" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.handleMainListItemClick(3);
        }}
        className={stepToRender === 3 ? "grayBg" : ""}
      >
        <ListItemIcon>
          <FormatQuote />
        </ListItemIcon>
        <ListItemText primary="Invitation History" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.handleMainListItemClick(4);
        }}
        className={stepToRender === 3 ? "grayBg" : ""}
      >
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Get started" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          props.handleMainListItemClick(5);
        }}
        className={stepToRender === 4 ? "grayBg" : ""}
      >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Widgets" />
      </ListItem>
    </div>
  );
};

export const SecondaryListItems = () => {
  return (
    <div>
      <ListSubheader inset>Your plan: Free</ListSubheader>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem button style={{ background: "#3F51B5", color: "#fff" }}>
        <ListItemIcon style={{ color: "#fff" }}>
          <VerticalAlignTopIcon />
        </ListItemIcon>
        <ListItemText primary="Click to upgrade" />
      </ListItem>
    </div>
  );
};
