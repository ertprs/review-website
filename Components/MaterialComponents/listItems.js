import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Home from '@material-ui/icons/Home';
import AllInbox from '@material-ui/icons/AllInbox';
import FormatQuote from '@material-ui/icons/FormatQuote';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AllInbox />
      </ListItemIcon>
      <ListItemText primary="Reviews" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FormatQuote />
      </ListItemIcon>
      <ListItemText primary="Get Reviews" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Get started" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Widgets" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Your plan: Free</ListSubheader>
    <ListItem /><ListItem /><ListItem />
    <ListItem button style={{background:"#3F51B5", color:"#fff"}}>
      <ListItemIcon style={{color:"#fff"}}>
        <VerticalAlignTopIcon />
      </ListItemIcon>
      <ListItemText primary="Click to upgrade" />
    </ListItem>
  </div>
);