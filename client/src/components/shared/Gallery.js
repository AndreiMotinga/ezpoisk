import React from "react";
import Lightbox from "react-images";

class Gallery extends React.Component {
  state = {
    currentImage: 0
  };

  gotoNext = () => {
    const i = this.state.currentImage + 1;
    this.setState({ currentImage: i });
  };

  gotoPrev = () => {
    const i = this.state.currentImage - 1;
    this.setState({ currentImage: i });
  };

  render() {
    const { images, isOpen, toggle } = this.props;
    const { currentImage } = this.state;

    return (
      <Lightbox
        images={images}
        isOpen={isOpen}
        backdropClosesModal={true}
        currentImage={currentImage}
        onClickNext={this.gotoNext}
        onClickPrev={this.gotoPrev}
        onClose={toggle}
      />
    );
  }
}

export default Gallery;
