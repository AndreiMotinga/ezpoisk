import React from "react";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Image from "./sea_narrow.png";
import Avatar from "./avatar.png";
import "./styles.css";
import CenteredProgress from "components/shared/CenteredProgress";
import Api from "api";
import Typography from "material-ui/Typography";
import Listing from "components/shared/Listing";

class Profile extends React.Component {
  state = {
    listings: null,
    isLoading: true
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    const params = { user_id: id };
    Api.getListings(params).then(listings => {
      this.setState({
        isLoading: false,
        listings
      });
    });
  };

  removeFromState = id => {
    const listings = this.state.listings.filter(listing => listing.id !== id);
    this.setState({ listings });
  };

  render() {
    const { listings, isLoading } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.headerContainer}>
          <Paper className="Header" />
          <Paper className={classes.avatarContainer}>
            <img src={Avatar} className={classes.avatar} />
          </Paper>
        </div>

        <br />
        {isLoading && <CenteredProgress />}
        {!isLoading && (
          <Grid item xs={12}>
            {listings.map(listing => (
              <Listing
                key={listing.id}
                listing={listing}
                onRemove={this.removeFromState}
              />
            ))}
          </Grid>
        )}
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
