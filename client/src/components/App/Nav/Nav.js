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

import Logo from "./Logo";
import AuthDropdown from "./AuthDropdown";

const Nav = ({ classes, currentUser, openAuthDialog }) => {
  const sendToEdit = () => {
    if (currentUser) {
      history.push("/listings/new/edit");
    } else {
      openAuthDialog();
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={sendToEdit}>Создать</Button>

          <Link to="/">
            <Logo />
          </Link>
          <div className={classes.spacer} />
          <AuthDropdown />
        </Toolbar>
      </AppBar>
    </div>
  );
};

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  openAuthDialog: PropTypes.func.isRequired
};

const styles = {
  spacer: {
    flex: 1
  }
};

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
