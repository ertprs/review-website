import React, { useState } from "react";
import { reviewListStyles } from "./myReviewsStyles";
import RatingIndicators from "../RatingIndicators/RatingIndicators";
import _get from "lodash/get";
import ReplyBox from "./ReplyBox";
import { withStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShareIcon from "@material-ui/icons/Share";
import ReplyIcon from "@material-ui/icons/Reply";
import SearchIcon from "@material-ui/icons/Search";
import FlagIcon from "@material-ui/icons/Flag";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    padding: 0,
    fontSize: "0.8rem",
    minWidth: "25px"
  },
  primary: {
    fontSize: "0.8rem"
  },
  button: {
    root: {
      padding: 0
    }
  }
});

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const ReviewCardBusiness = ({ review }) => {
  const [showReply, setShowReply] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { name, text, rating } = review;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderBottomBoxResponsive = () => {
    const classes = useStyles();

    return (
      <div>
        {" "}
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        {/* <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem>
            <ListItemIcon classes={{
                root: classes.root,
                primary: classes.primary
              }}>
              <ReplyIcon fontSize="small" classes={{
                root: classes.root,
                primary: classes.primary
              }}/>
            </ListItemIcon>
            <ListItemText
              primary="Reply"
              classes={{
                root: classes.root,
                primary: classes.primary
              }}
            />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon classes={{
                root: classes.root,
                primary: classes.primary
              }}>
              <ShareIcon
                fontSize="small"
                classes={{
                  root: classes.root,
                  primary: classes.primary
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Share"
              classes={{
                root: classes.root,
                primary: classes.primary
              }}
            />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon classes={{
                root: classes.root,
                primary: classes.primary
              }}>
              <SearchIcon
                fontSize="small"
                classes={{
                  root: classes.root,
                  primary: classes.primary
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Search"
              classes={{
                root: classes.root,
                primary: classes.primary
              }}
            />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon classes={{
                root: classes.root,
                primary: classes.primary
              }}>
              <FlagIcon
                fontSize="small"
                classes={{
                  root: classes.root,
                  primary: classes.primary
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Flag"
              classes={{
                root: classes.root,
                primary: classes.primary
              }}
            />
          </StyledMenuItem>
        </StyledMenu> */}
      </div>
    );
  };
  return (
    <div className="reviewCard">
      <style jsx> {reviewListStyles}</style>
      <div className="row topBox">
        <div className="col-md-3 ratingBox">
          <div>
            <RatingIndicators
              rating={Number(rating) || 0}
              typeOfWidget="star"
              widgetRatedColors="#21bc61"
              widgetDimensions="24px"
              widgetSpacings="2px"
            />
            <p className="userName">{name || ""}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <div>
              {/* <span className="cardLink">This will be any link!!</span>
              <br /> */}
              <span className="reviewText">{text || ""}</span>
            </div>
          </div>
        </div>
        {/* <div className="col-md-2 dateContainer">
          <p className="date">Aug 16, 2019</p>
        </div> */}
      </div>
      {/* <div className="row bottomBox">
        <div className="col-md-2"></div>
        <div className="col-md-9">
          <div className="bottomBoxInner">
            <div
              className="footerLinks"
              onClick={() => setShowReply(!showReply)}
            >
              <p>
                <i className="fa fa-share icons"></i>Reply
              </p>
            </div>
            <div className="footerLinks">
              <p>
                <i className="fa fa-share-alt icons"></i>Share
              </p>
            </div>
            <div className="footerLinks">
              <p>
                <i className="fa fa-search icons"></i>Find Reviewer
              </p>
            </div>
            <div className="footerLinks">
              <p>
                <i className="fa fa-flag icons"></i>Report
              </p>
            </div>
          </div>
          <div className="bottomBoxResponsive">
            {renderBottomBoxResponsive()}
          </div>
        </div>
        <div className="col-md-1"></div>
      </div> */}
      {/* {showReply ? <ReplyBox /> : ""} */}
    </div>
  );
};

export default ReviewCardBusiness;
