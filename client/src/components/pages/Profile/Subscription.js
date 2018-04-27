import React from "react";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";

const Subscription = ({ classes, currentUser }) => {
  return <div>Listings here</div>;
};

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({});

const styles = {};

const styledSubscription = withStyles(styles)(Subscription);

export default connect(mapStateToProps, mapDispatchToProps)(styledSubscription);
