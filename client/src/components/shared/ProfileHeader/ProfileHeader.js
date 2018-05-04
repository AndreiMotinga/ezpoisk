import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import "./styles.css";

const ProfileHeader = ({ classes, image }) => {
  return (
    <div className={classes.headerContainer}>
      <Paper className="Header">
        <Paper className={classes.avatarContainer}>
          {image && (
            <img src={image} alt="User Avatar" className={classes.avatar} />
          )}
        </Paper>
      </Paper>
    </div>
  );
};

const styles = {
  headerContainer: {
    marginTop: 20,
    position: "relative"
  },
  avatarContainer: {
    position: "absolute",
    left: "5%",
    top: "45%",
    height: 100,
    maxWidth: 100,
    borderRadius: "50%"
  },
  avatar: {
    width: "100%",
    height: "auto",
    borderRadius: "50%"
  }
};

export default withStyles(styles)(ProfileHeader);
