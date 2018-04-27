import React from "react";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";

class ProfileListings extends React.Component {
  render() {
    const { classes, currentUser } = this.props;
    const id = this.props.match.params.id;

    return (
      <div className={classes.root}>
        <Paper>
          ID: {id}
          and listings are ( to be done )
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

const styledProfileListings = withStyles(styles)(ProfileListings);

export default connect(mapStateToProps, mapDispatchToProps)(
  styledProfileListings
);
