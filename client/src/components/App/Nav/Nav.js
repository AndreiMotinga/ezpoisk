import React from "react";
import { connect } from "react-redux";
import history from "config/history";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { openDialog } from "actions";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Button from "material-ui/Button";
import Hidden from "material-ui/Hidden";

import AuthDropdown from "./AuthDropdown";
import Drawer from "./Drawer";

const Nav = ({ classes, currentUser, openAuthDialog }) => {
  const sendToEdit = () => {
    if (currentUser) {
      history.push("/listings/new/edit");
    } else {
      openAuthDialog();
    }
  };

  return (
    <AppBar color="inherit" position="sticky">
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftMenu}>
          <Drawer currentUser={currentUser} />
          <Hidden xsDown>
            <Button
              variant="raised"
              color="primary"
              className={classes.button}
              onClick={sendToEdit}
            >
              Создать
            </Button>
          </Hidden>
        </div>

        <div className={classes.logoContainer}>
          <Link to="/" className={classes.logo}>
            <span className={classes.ez}>ez</span>poisk
          </Link>
        </div>

        <div className={classes.rightMenu}>
          <AuthDropdown />
        </div>
      </Toolbar>
    </AppBar>
  );
};

const styles = theme => ({
  toolbar: {
    display: "flex"
  },
  leftMenu: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start"
  },
  button: {
    boxShadow: "none",
    maxHeight: 36,
    alignSelf: "center"
  },
  logoContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    fontFamily: "'Josefin Sans', sans-serif;",
    textDecoration: "none",
    fontSize: 32,
    color: theme.palette.primary.main
  },
  ez: {
    color: theme.palette.secondary.main
  },
  rightMenu: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end"
  }
});

const styledNav = withStyles(styles)(Nav);

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  openAuthDialog: () => {
    dispatch(openDialog("AuthDialog"));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(styledNav);
