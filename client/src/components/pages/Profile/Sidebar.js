import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import InboxIcon from "material-ui-icons/Inbox";
import DraftsIcon from "material-ui-icons/Drafts";

const Sidebar = ({ classes, changeTab }) => {
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem
          button
          onClick={() => {
            changeTab(0);
          }}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Personal Info" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            changeTab(1);
          }}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Subscription" />
        </ListItem>
      </List>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360
    // backgroundColor: theme.palette.background.paper,
  }
});

export default withStyles(styles)(Sidebar);
