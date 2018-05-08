import React from "react";
import { connect } from "react-redux";
import Api from "api";
import Listing from "./Listing";
import { galleryImages } from "utils";
import Gallery from "components/shared/Gallery";

class ListingContainer extends React.Component {
  state = {
    currentUser: this.props.currentUser,
    listing: this.props.listing,
    isGalleryOpen: false
  };

  handleDestroy = event => {
    const id = event.currentTarget.getAttribute("data-id");
    Api.removeListing(id).then(() => {
      this.props.onRemove(id);
    });
  };

  markAsSpam = event => {
    const attrs = this.state.listing.attributes;
    attrs.kind = "spam";
    Api.saveListing(attrs).then(res => {
      this.props.onRemove(res.data.id.toString());
    });
  };

  toggleGallery = () => {
    const open = !this.state.isGalleryOpen;
    this.setState({ isGalleryOpen: open });
  };

  render() {
    const images = galleryImages(this.state.listing);

    return (
      <div>
        <Listing
          handleDestroy={this.handleDestroy}
          markAsSpam={this.markAsSpam}
          toggleGallery={this.toggleGallery}
          {...this.state}
        />

        <Gallery
          images={images}
          isOpen={this.state.isGalleryOpen}
          toggle={this.toggleGallery}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListingContainer);
