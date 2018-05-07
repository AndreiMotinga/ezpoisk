import React from "react";

import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import InboxIcon from "material-ui-icons/Inbox";
import { redirect } from "utils";

class NavDrawer extends React.Component {
  state = { open: false };

  toggleDrawer = () => {
    const open = !this.state.open;
    this.setState({ open });
  };

  render() {
    const { classes, currentUser } = this.props;

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
              {currentUser && (
                <List component="nav">
                  <ListItem>
                    <ListItemText
                      primary={currentUser.name || currentUser.email}
                    />
                  </ListItem>

                  <Divider />

                  <ListItem button>
                    <ListItemText
                      primary="Создать Объявление"
                      data-path="/listings/new/edit"
                      onClick={redirect}
                    />
                  </ListItem>

                  <ListItem button>
                    <ListItemText
                      primary="Мой профаил"
                      data-path="/my-profile"
                      onClick={redirect}
                    />
                  </ListItem>

                  <ListItem button>
                    <ListItemText
                      primary="Мои объявления"
                      data-path={`/profile/${currentUser.id}`}
                      onClick={redirect}
                    />
                  </ListItem>
                  <Divider />
                </List>
              )}
              <List component="nav">
                {!currentUser && (
                  <ListItem button>
                    <ListItemText
                      primary="Создать Объявление"
                      data-path="/listings/new/edit"
                      onClick={redirect}
                    />
                  </ListItem>
                )}
                <ListItem button>
                  <ListItemText
                    primary="FAQ"
                    data-path="/faq"
                    onClick={redirect}
                  />
                </ListItem>
              </List>

              <List component="nav">
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="ezpoiskbot@gmail.com" />
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
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  icon: {
    marginRight: 0
  }
};

export default withStyles(styles)(NavDrawer);
