import React from "react";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import CenteredProgress from "components/shared/CenteredProgress";
import Api from "api";
import Listing from "components/shared/Listing";
import ProfileHeader from "components/shared/ProfileHeader";

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
      <div>
        <ProfileHeader />
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

const styles = theme => ({});

const styledProfile = withStyles(styles)(Profile);

export default connect(mapStateToProps, mapDispatchToProps)(styledProfile);
