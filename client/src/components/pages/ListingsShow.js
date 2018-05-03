import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Listing from "components/shared/Listing";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Gallery from "components/shared/Gallery";
import { galleryImages } from "utils";

class ListingsShow extends React.Component {
  state = {
    listing: null
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/api/listings/${id}`)
      .then(res => {
        const listing = res.data.data;
        this.setState({ listing });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { listing } = this.state;
    const { classes } = this.props;
    if (!listing) return null;
    const images = galleryImages(listing);

    return (
      <div>
        <Gallery images={images} />
        <Typography variant="display3" align="center" className={classes.title}>
          {listing.title}
        </Typography>

        <div className={classes.content}>
          <Typography className={classes.body}>{listing.text}</Typography>
        </div>

        {!!listing.previous && (
          <div className={classes.previous}>
            <Grid container spacing={24}>
              {listing.previous.data.map((prev_listing, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Listing listing={prev_listing} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

ListingsShow.propTypes = {
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

const styledListingsShow = withStyles(styles)(ListingsShow);

export default styledListingsShow;
