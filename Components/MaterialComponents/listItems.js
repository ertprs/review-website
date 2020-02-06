import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Home from "@material-ui/icons/Home";
import RateReview from "@material-ui/icons/RateReview";
import InsertInvitation from "@material-ui/icons/InsertInvitation";
import PublicIcon from "@material-ui/icons/Public";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import UserProfileIcon from "@material-ui/icons/AccountCircleSharp";
import WidgetsOutlined from "@material-ui/icons/WidgetsOutlined";
import CampaignHistory from "@material-ui/icons/List";
import AssignmentIcon from "@material-ui/icons/Assignment";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import HistoryIcon from "@material-ui/icons/History";
import URLIcon from "@material-ui/icons/Link";
import Tooltip from "@material-ui/core/Tooltip";
import { CircularProgress } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import Link from "next/link";

export const MainListItems = ({
  stepToRender,
  menuItemDisabled,
  getStartedHide,
  homeDisabled,
  handleMainListItemClick,
  getStartedDisabled,
  domain
}) => {
  return (
    <div>
      <style>
        {`
          .grayBg{
            background:#e1e1e1;
          }
          .pb_0{
            padding-bottom:0px;
          }
        `}
      </style>
      {getStartedHide ? null : (
        <ListItem
          button
          onClick={() => {
            handleMainListItemClick(0);
          }}
          className={stepToRender === 0 ? "grayBg pb_0" : "pb_0"}
          disabled={getStartedDisabled}
          style={{ paddingBottom: "0px" }}
        >
          <Tooltip
            title={<span style={{ fontSize: "14px" }}>Get Started</span>}
            placement="right"
          >
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
        className={stepToRender === 1 ? "grayBg pb_0" : "pb_0"}
        disabled={homeDisabled}
      >
        <Tooltip
          title={<span style={{ fontSize: "14px" }}>Home</span>}
          placement="right"
        >
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
        className={stepToRender === 2 ? "grayBg pb_0" : "pb_0"}
        disabled={menuItemDisabled}
      >
        <Tooltip
          title={<span style={{ fontSize: "14px" }}>Reviews</span>}
          placement="right"
        >
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
        className={stepToRender === 3 ? "grayBg pb_0" : "pb_0"}
        disabled={menuItemDisabled}
      >
        <Tooltip
          title={<span style={{ fontSize: "14px" }}>Create Campaign</span>}
          placement="right"
        >
          <ListItemIcon>
            <InsertInvitation />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Create Campaign" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleMainListItemClick(4);
        }}
        className={stepToRender === 4 ? "grayBg pb_0" : "pb_0"}
        disabled={menuItemDisabled}
      >
        <Tooltip
          title={<span style={{ fontSize: "14px" }}>Campaign History</span>}
          placement="right"
        >
          <ListItemIcon>
            <CampaignHistory />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Campaign History" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleMainListItemClick(5);
        }}
        className={stepToRender === 5 ? "grayBg pb_0" : "pb_0"}
        disabled={menuItemDisabled}
      >
        <Tooltip
          title={<span style={{ fontSize: "14px" }}>Invitation History</span>}
          placement="right"
        >
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Invitation History" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleMainListItemClick(6);
        }}
        disabled={menuItemDisabled}
        className={stepToRender === 6 ? "grayBg pb_0" : "pb_0"}
      >
        <Tooltip
          title={<span style={{ fontSize: "14px" }}>Widgets</span>}
          placement="right"
        >
          <ListItemIcon>
            <WidgetsOutlined />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Widgets" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleMainListItemClick(7);
        }}
        disabled={menuItemDisabled}
        className={stepToRender === 7 ? "grayBg pb_0" : "pb_0"}
      >
        <Tooltip
          title={<span style={{ fontSize: "14px" }}>Review URL</span>}
          placement="right"
        >
          <ListItemIcon>
            <URLIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Review URL" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleMainListItemClick(8);
        }}
        disabled={menuItemDisabled}
        className={stepToRender === 8 ? "grayBg pb_0" : "pb_0"}
      >
        <Tooltip
          title={<span style={{ fontSize: "14px" }}>WhatsApp Invite</span>}
          placement="right"
        >
          <ListItemIcon>
            <WhatsAppIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="WhatsApp Invite" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleMainListItemClick(9);
        }}
        disabled={menuItemDisabled}
        className={stepToRender === 9 ? "grayBg pb_0" : "pb_0"}
      >
        <Tooltip
          title={<span style={{ fontSize: "14px" }}>My Profile</span>}
          placement="right"
        >
          <ListItemIcon>
            <UserProfileIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="User Profile" />
      </ListItem>
      <ListItem />
      <Divider />
      <ListItem button className="pb_0">
        <Tooltip
          title={<span style={{ fontSize: "14px" }}>Public Profile</span>}
          placement="right"
        >
          <ListItemIcon>
            <Link href={`/reviews/${domain}`}>
              <PublicIcon />
            </Link>
          </ListItemIcon>
        </Tooltip>
        <Link href={`/reviews/${domain}`}>
          <ListItemText primary="Public Profile" />
        </Link>
      </ListItem>
    </div>
  );
};

export const SecondaryListItems = ({
  subscriptionPlan,
  handleClick,
  isLoading,
  domain
}) => {
  return (
    <div>
      {/* <ListSubheader inset>Your plan: {subscriptionPlan}</ListSubheader>
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
            <Tooltip
              title={<span style={{ fontSize: "14px" }}>Click to Upgrade</span>}
              placement="right"
            >
              <ListItemIcon onClick={handleClick} style={{ color: "#fff" }}>
                <VerticalAlignTopIcon />
              </ListItemIcon>
            </Tooltip>
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
