import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import { openDialog } from "actions";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Button from "material-ui/Button";
import history from "config/history";

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
        <Drawer currentUser={currentUser} />
        <Button
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={sendToEdit}
        >
          Создать
        </Button>

        <div className={classes.logoContainer}>
          <Link to="/" className={classes.logo}>
            <span className={classes.ez}>ez</span>poisk
          </Link>
        </div>
        <div className={classes.spacer} />
        <AuthDropdown />
      </Toolbar>
    </AppBar>
  );
};

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  openAuthDialog: PropTypes.func.isRequired
};

const styles = theme => ({
  spacer: {
    flex: 1
  },
  toolbar: {
    position: "relative"
  },
  logoContainer: {
    position: "absolute",
    left: "45%"
  },
  logo: {
    fontFamily: "'Josefin Sans', sans-serif;",
    textDecoration: "none",
    fontSize: 28,
    color: theme.palette.primary.main
  },
  ez: {
    color: theme.palette.secondary.main
  },
  button: {
    boxShadow: "none"
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
