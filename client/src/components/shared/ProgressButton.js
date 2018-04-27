import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";
import green from "material-ui/colors/green";
import Button from "material-ui/Button";

class ProgressButton extends React.Component {
  render() {
    const {
      children,
      classes,
      success,
      loading,
      type,
      variant,
      color
    } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            type={type}
            variant={variant}
            color={color}
            disabled={loading}
            className={buttonClassname}
          >
            {children}
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
    );
  }
}

ProgressButton.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    position: "relative",
    margin: "30px auto 0"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

export default withStyles(styles)(ProgressButton);
