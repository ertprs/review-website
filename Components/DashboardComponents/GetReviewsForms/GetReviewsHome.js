import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";
import DescriptionIcon from "@material-ui/icons/Description";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const inviteOptions = [
  // {
  //   id: 0,
  //   icon: <PublishIcon />,
  //   primaryText: "Upload a file",
  //   secondaryText: "Service reviews"
  // },
  {
    id: 1,
    icon: <DescriptionIcon />,
    primaryText: "Copy-paste customer data",
    secondaryText: "Service reviews"
  },
  {
    id: 2,
    icon: <PostAddIcon />,
    primaryText: "Enter data manually",
    secondaryText: "Service reviews"
  }
];

export default class GetReviewsHome extends Component {
  renderInviteOptionsList = () => {
    return inviteOptions.map((item, index) => {
      return (
        <>
          <style jsx>
            {`
              .renderInviteOptionsListContainer {
                -webkit-transition: all 0.4s; /* For Safari 3.1 to 6.0 */
                transition: all 0.4s;
                -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Safari */
                -khtml-user-select: none; /* Konqueror HTML */
                -moz-user-select: none; /* Old versions of Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
              }
              .renderInviteOptionsListContainer:hover {
                background-color: #f5f5f5;
                cursor: pointer;
              }
            `}
          </style>
          <div className="renderInviteOptionsListContainer">
            <List key={index} onClick={()=>{
                this.props.handleListItemClick(index+1)
            }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>{item.icon}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.primaryText}
                  secondary={item.secondaryText}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <ChevronRightIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </>
      );
    });
  };

  render() {
    return (
      <div>
        <p>Ask your customers to leave a review about their experience</p>
        <h5>Invite manually</h5>
        <div className="container">
          <div className="row">
            <div className="col-md-6">{this.renderInviteOptionsList()}</div>
          </div>
        </div>
      </div>
    );
  }
}
