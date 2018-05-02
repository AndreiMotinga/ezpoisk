import React from "react";
import PropTypes from "prop-types";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = ({ images }) => {
  return <ImageGallery items={images} />;
};

Gallery.PropTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Gallery;
