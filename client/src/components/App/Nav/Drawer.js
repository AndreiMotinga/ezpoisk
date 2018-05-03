import React from "react";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import InboxIcon from "material-ui-icons/Inbox";
import DraftsIcon from "material-ui-icons/Drafts";

class NavDrawer extends React.Component {
  state = { open: false };

  toggleDrawer = () => {
    const open = !this.state.open;
    this.setState({ open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={this.toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        <Drawer open={this.state.open} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <div className={classes.list}>
              <List component="nav">
                <ListItem button>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </List>
              <Divider />
              <List component="nav">
                <ListItem button>
                  <ListItemText primary="Trash" />
                </ListItem>
                <ListItem button component="a" href="#simple-list">
                  <ListItemText primary="Spam" />
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

export default withStyles(styles)(NavDrawer);
