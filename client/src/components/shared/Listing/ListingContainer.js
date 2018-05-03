import React from "react";
import { connect } from "react-redux";
import { openDialog } from "actions";
import history from "config/history";
import Api from "api";
import Listing from "./Listing";

class ListingContainer extends React.Component {
  state = {
    currentUser: this.props.currentUser,
    listing: this.props.listing,
    anchorEl: null
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
    return (
      <Listing
        handleClick={this.handleClick}
        handleClose={this.handleClose}
        handlePath={this.handlePath}
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
