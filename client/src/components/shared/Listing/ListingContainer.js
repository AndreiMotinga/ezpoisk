import React from "react";
import { connect } from "react-redux";
import { openDialog } from "actions";
import Api from "api";
import Listing from "./Listing";
import { galleryImages } from "utils";

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
    const images = galleryImages(this.state.listing);
    this.props.openDialog(images);
  };

  render() {
    return (
      <Listing
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
