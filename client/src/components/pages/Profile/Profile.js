import React from "react";
import { connect } from "react-redux";
// import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Image from "./sea_narrow.png";
import Avatar from "./avatar.png";
import "./styles.css";

class Profile extends React.Component {
  render() {
    const { classes } = this.props;
    const id = this.props.match.params.id;

    return (
      <div className={classes.root}>
        <div className={classes.headerContainer}>
          <Paper className="Header" />
          <Paper className={classes.avatarContainer}>
            <img src={Avatar} className={classes.avatar} />
          </Paper>
        </div>
        {/* <Typography>{user.name}</Typography> */}
        User show page
        <ul>
          <li>user header</li>
          <li>users listings</li>
        </ul>
        ID: {id}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const styles = theme => ({
  root: {},
  headerContainer: {
    marginTop: 20,
    position: "relative"
  },
  avatarContainer: {
    position: "absolute",
    left: "5%",
    top: "45%",
    height: "100%",

    maxWidth: 250,
    borderRadius: "50%"
  },
  avatar: {
    width: "100%",
    height: "auto",
    borderRadius: "50%"
  }
});

const styledProfile = withStyles(styles)(Profile);

export default connect(mapStateToProps, mapDispatchToProps)(styledProfile);
