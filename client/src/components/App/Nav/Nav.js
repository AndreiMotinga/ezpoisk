import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";

import Logo from "./Logo";
import AuthDropdown from "./AuthDropdown";

class Nav extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <Logo />
            </Link>
            <div className={classes.spacer} />
            <AuthDropdown />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = {
  spacer: {
    flex: 1
  }
};

export default withStyles(styles)(Nav);
