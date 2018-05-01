import React from "react";
import { connect } from "react-redux";
// import Grid from "material-ui/Grid";
import UserForm from "./UserForm";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";

class ProfileEdit extends React.Component {
  render() {
    const { classes, currentUser } = this.props;
    const id = this.props.match.params.id;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          current user edit page
          <UserForm currentUser={currentUser} />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({});

const styles = theme => ({
  root: {},
  paper: {
    marginTop: "20px",
    padding: "30px",
    minHeight: "400px",
    background: "white"
  }
});

const styledProfileEdit = withStyles(styles)(ProfileEdit);

export default connect(mapStateToProps, mapDispatchToProps)(styledProfileEdit);
