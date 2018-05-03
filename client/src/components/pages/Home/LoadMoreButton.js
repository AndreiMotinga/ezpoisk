import React from "react";
import Button from "material-ui/Button";
import KeyboardArrowDownIcon from "material-ui-icons/KeyboardArrowDown";
import { CircularProgress } from "material-ui/Progress";
import { withStyles } from "material-ui/styles";
import green from "material-ui/colors/green";

const LoadMoreButton = ({ isLoadingMore, loadMore, classes }) => {
  const color = isLoadingMore ? "default" : "secondary";
  return (
    <Button
      variant="fab"
      color={color}
      aria-label="more"
      className={classes.more}
      onClick={loadMore}
    >
      {isLoadingMore && (
        <CircularProgress size={24} className={classes.progress} />
      )}
      {!isLoadingMore && <KeyboardArrowDownIcon />}
    </Button>
  );
};

const styles = {
  more: {
    margin: "50px auto"
  },
  progress: {
    color: green[500]
  }
};

export default withStyles(styles)(LoadMoreButton);
