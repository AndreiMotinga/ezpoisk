import React from "react";
import { withStyles } from "material-ui/styles";
import Dropzone from "react-dropzone";
import Typography from "material-ui/Typography";
import Api from "api";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";

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
    Api.removePicture(e.currentTarget.id).then(this.removeImage);
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
        {listing.pictures.data.map(picture => (
          <div key={picture.id} className={classes.imageContainer}>
            <img
              className={classes.image}
              alt={listing.text}
              src={picture.attributes.variants.medium}
            />
            <div className={classes.actions}>
              <IconButton
                className={classes.deleteButton}
                aria-label="Delete"
                id={picture.id}
                onClick={this.removePicture}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const styles = theme => ({
  root: {},
  dropzone: {
    width: "100%",
    border: "1px solid #d9d9d9",
    margin: "40px 0 20px",
    padding: 20,
    borderRadius: 2,
    background: theme.palette.grey[50]
  },
  imageContainer: {
    position: "relative",
    display: "inline-block",
    margin: 5
  },
  actions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(250, 250, 250, 0.7)"
  },
  deleteButton: {
    display: "block",
    margin: "0 auto"
  }
});

const styled = withStyles(styles)(FormImages);

export default styled;
