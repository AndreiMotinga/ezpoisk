import React from "react";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import { openDialog } from "actions";
import history from "config/history";
import Api from "api";
import Listing from "./Listing";

class ListingContainer extends React.Component {
  state = {
    anchorEl: null,
    listing: this.props.listing
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePath = event => {
    history.push(event.target.attributes.path.value);
  };

  handleDestroy = event => {
    const id = event.target.id;
    Api.removeListing(id).then(() => {
      this.props.onRemove(id);
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  openImageGallery = e => {
    // TODO duplicated with ListingsShow.js
    const listing = this.state.listing;
    const data = listing.attributes.pictures.data;
    const variants = data.map(d => d.attributes.variants);
    const images = variants.map(v => ({
      original: v.large,
      thumbnail: v.thumb
    }));
    this.props.openDialog(images);
  };

  render() {
    const { classes, currentUser } = this.props;
    const { listing, anchorEl } = this.state;

    return (
      <Listing
        currentUser={currentUser}
        listing={listing}
        anchorEl={anchorEl}
        handleClick={this.handleClick}
        handleClose={this.handleClose}
        handlePath={this.handlePath}
        handleDestroy={this.handleDestroy}
        openImageGallery={this.openImageGallery}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  openDialog: images => {
    dispatch(openDialog("FullScreenDialog", images));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingContainer);
