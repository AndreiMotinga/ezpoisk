import React from "react";
import { withStyles } from "material-ui/styles";
import Dropzone from "react-dropzone";
import Typography from "material-ui/Typography";
import Api from "api";

class FormImages extends React.Component {
  state = {
    listing: this.props.listing
  };

  handleDrop = acceptedFiles => {
    const listing = this.state.listing;
    acceptedFiles.forEach(file => {
      const data = new FormData();
      data.append("picture[listing_id]", listing.id);
      data.append("picture[image]", file);
      Api.savePicture(data).then(res => {
        const picture = res.data.data;
        const pictures = listing.pictures;
        pictures.data.unshift(picture);
        listing.pictures = pictures;
        this.setState({ listing });
      });
    });
  };

  removeImage = res => {
    const id = res.data.id;
    const listing = this.state.listing;
    const data = listing.pictures.data.filter(
      item => item.id.toString() !== id.toString()
    );
    listing.pictures.data = data;
    this.setState({ listing });
  };

  removePicture = e => {
    Api.removePicture(e.target.id).then(this.removeImage);
  };

  render() {
    const { listing } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Dropzone onDrop={this.handleDrop} className={classes.dropzone}>
          <Typography align="center">
            Перетяните сюда фотографии
            <br />
            либо
            <br />
            нажмите чтобы загрузить
          </Typography>
        </Dropzone>
        <div className={classes.imagesContainer}>
          <div className={classes.images}>
            {listing.pictures.data.map(picture => (
              <img
                key={picture.id}
                alt={listing.text}
                id={picture.id}
                src={picture.attributes.variants.medium}
                onClick={this.removePicture}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {},
  dropzone: {
    width: "100%",
    border: "1px solid #d9d9d9",
    margin: "40px 0",
    padding: 20,
    borderRadius: 2,
    background: theme.palette.grey[50]
  },
  imagesContainer: {},
  images: {}
});

const styled = withStyles(styles)(FormImages);

export default styled;
