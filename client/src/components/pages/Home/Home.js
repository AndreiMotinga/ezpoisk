import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Post from "components/shared/Post";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import { openDialog } from "actions";

const Home = ({ classes, isSignedIn, handleOpen, posts }) => {
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
          {posts.map(post => (
            <Grid item className={classes.listing}>
              <Post key={post.id} post={post.attributes} />
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
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({
  handleOpen: () => {
    dispatch(openDialog("AuthDialog"));
  }
});

const styledHome = withStyles(styles)(Home);

export default connect(mapStateToProps, mapDispatchToProps)(styledHome);
