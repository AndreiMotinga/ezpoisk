import React from "react";
import { CircularProgress } from "material-ui/Progress";
import { withStyles } from "material-ui/styles";

const CenteredProgress = ({ classes }) => (
  <div className={classes.container}>
    <CircularProgress className={classes.progress} />
  </div>
);

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh"
  }
};

const styled = withStyles(styles)(CenteredProgress);

export default styled;
