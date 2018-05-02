import React from "react";
import { connect } from "react-redux";
// import Grid from "material-ui/Grid";
// import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Api from "api";
import Listing from "components/shared/Listing";

class MyListings extends React.Component {
  state = {
    listings: null
  };

  componentDidMount = () => {
    Api.getUserListings().then(this.addListingsToState);
  };

  addListingsToState = listings => {
    this.setState({ listings });
  };

  render() {
    const listings = this.state.listings;
    if (!listings) return null;

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {listings.map(listing => (
          <Listing key={listing.id} listing={listing} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

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

const styled = withStyles(styles)(MyListings);

export default connect(mapStateToProps, mapDispatchToProps)(styled);