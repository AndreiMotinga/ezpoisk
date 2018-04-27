import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Post from "components/shared/Post";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

class PostsShow extends React.Component {
  state = {
    post: {}
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/api/posts/${id}`)
      .then(res => {
        const post = res.data.data.attributes;
        this.setState({ post });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { post } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="display3" align="center" className={classes.title}>
          {post.title}
        </Typography>

        <div className={classes.content}>
          <Typography className={classes.body}>{post.body}</Typography>
        </div>

        {!!post.previous && (
          <div className={classes.previous}>
            <Grid container spacing={24}>
              {post.previous.data.map((prev_post, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Post post={prev_post} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

PostsShow.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const styles = {
  title: {
    marginTop: 50,
    marginBottom: 50
  },
  content: {
    margin: "0 auto 100px",
    maxWidth: 800
  },
  body: {
    fontSize: "1em",
    lineHeight: "1.5em"
  },
  previous: {
    margin: "0 auto 50px",
    maxWidth: 1200
  }
};

const styledPostsShow = withStyles(styles)(PostsShow);

export default styledPostsShow;
