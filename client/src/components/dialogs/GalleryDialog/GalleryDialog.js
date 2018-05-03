import React from "react";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import { connect } from "react-redux";
import { closeDialog } from "actions";
import Gallery from "components/shared/Gallery";

const GalleryDialog = ({ classes, isOpen, handleClose, images }) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <Gallery images={images} />
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  isOpen: state.activeDialog === "GalleryDialog",
  images: state.activeImages
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => {
    dispatch(closeDialog());
  }
});

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

const styled = withStyles(styles)(GalleryDialog);

export default connect(mapStateToProps, mapDispatchToProps)(styled);
