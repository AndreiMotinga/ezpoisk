import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Listing from "components/shared/Listing";
import Grid from "material-ui/Grid";
// import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import { openDialog } from "actions";

const Home = ({ classes, isSignedIn, handleOpen, listings }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        filters here{" "}
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          spacing={24}
          direction="column"
          alignContent="center"
          justify="center"
        >
          {listings.map(post => (
            <Grid item key={post.id} className={classes.listing}>
              <Listing post={post.attributes} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  main: {
    paddingTop: 15,
    paddingBottom: 15
  },

  listing: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 700
  }
});

const mapStateToProps = state => ({
  isSignedIn: Boolean(state.currentUser),
  listings: state.listings
});

const mapDispatchToProps = dispatch => ({
  handleOpen: () => {
    dispatch(openDialog("AuthDialog"));
  }
});

const styledHome = withStyles(styles)(Home);

export default connect(mapStateToProps, mapDispatchToProps)(styledHome);