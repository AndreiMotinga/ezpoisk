import React from "react";
import { connect } from "react-redux";
import { openDialog } from "actions";
import history from "config/history";
import Api from "api";
import Listing from "./Listing";

class ListingContainer extends React.Component {
  state = {
    currentUser: this.props.currentUser,
    listing: this.props.listing
  };

  handleDestroy = event => {
    const id = event.target.id;
    Api.removeListing(id).then(() => {
      this.props.onRemove(id);
    });
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
    return (
      <Listing
        redirect={this.redirect}
        handleDestroy={this.handleDestroy}
        openImageGallery={this.openImageGallery}
        {...this.state}
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
