import React from "react";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import CenteredProgress from "components/shared/CenteredProgress";
import Api from "api";
import Listing from "components/shared/Listing";
import ProfileHeader from "components/shared/ProfileHeader";
import NothingHere from "components/shared/NothingHere";

class Profile extends React.Component {
  state = {
    listings: null,
    isLoading: true
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    const params = { user_id: id };
    Api.getListings(params).then(data => {
      this.setState({
        isLoading: false,
        listings: data.data
      });
    });
  };

  removeFromState = id => {
    const listings = this.state.listings.filter(listing => listing.id !== id);
    this.setState({ listings });
  };

  render() {
    const { listings, isLoading } = this.state;

    let image;
    if (!isLoading) {
      const first_listing = listings[0];
      image = first_listing && first_listing.attributes.user.avatar;
    }

    return (
      <div>
        <ProfileHeader image={image} />
        <br />
        {isLoading && <CenteredProgress />}

        {!isLoading && listings.length === 0 && <NothingHere />}

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
