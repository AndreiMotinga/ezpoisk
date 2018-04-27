import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import BottomNavigation, {
  BottomNavigationAction
} from "material-ui/BottomNavigation";
import RestoreIcon from "material-ui-icons/Restore";
import FavoriteIcon from "material-ui-icons/Favorite";
import LocationOnIcon from "material-ui-icons/LocationOn";

import { Link } from "react-router-dom";

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="FAQ"
          icon={<RestoreIcon />}
          component={Link}
          to="/faq"
        />
        <BottomNavigationAction
          label="ToS"
          icon={<FavoriteIcon />}
          component={Link}
          to="/tos"
        />
        <BottomNavigationAction
          label="PP"
          icon={<LocationOnIcon />}
          component={Link}
          to="/pp"
        />
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3
  }
});

export default withStyles(styles)(SimpleBottomNavigation);
